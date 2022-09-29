import { RequestHandler, Request, Response, NextFunction } from "express";

const requestLogger: RequestHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.log(`M:${req.method}, P: ${req.path}, B: ${req.body}`);
  console.log("---");
  next();
};

export default { requestLogger };
