import { RequestHandler, Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { IRequest } from "../services/types/interface";
import { parseString } from "../services/validate";
import { SECRET } from "./config";

const tokenExtractor = (req: IRequest, _res: Response, next: NextFunction) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  }
  next();
};

const userExtractor = (req: IRequest, _res: Response, next: NextFunction) => {
  const token = parseString(req.token);
  const thisuser = jwt.verify(token, SECRET as Secret);
  if (thisuser) {
    req.user = thisuser;
  }
  next();
};

const requestLogger: RequestHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.log(`M:${req.method}, P: ${req.path}, B: ${req.body}`);
  console.log("---");
  next();
};

const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return res.status(400).send({ error: err.message });
  } else if (err.name === "JsonWebTokenError") {
    return res.status(400).send({ error: "invalid or missing token" });
  } else {
    return next(err);
  }
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor,
  tokenExtractor,
};
