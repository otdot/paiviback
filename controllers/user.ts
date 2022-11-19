import express from "express";
import User from "../models/user";
import {
  createUser,
  getUserMarket,
  updateWorkingPlace,
} from "../services/userRouterServices";
import middleware from "../utils/middleware";
const userRouter = express.Router();

userRouter.get("/", (_req, res) => {
  User.find()
    .then((response) => res.status(200).json(response))
    .catch((err: unknown) =>
      console.log(`An unexpected error occurred: ${err}`)
    );
});
userRouter.post("/", createUser);
userRouter.patch("/:id", updateWorkingPlace);

userRouter.get(
  "/market",
  [middleware.userExtractor, middleware.authUser],
  getUserMarket
);

export default userRouter;
