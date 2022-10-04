import express from "express";
import User from "../models/user";
import { createUser, updateWorkingPlace } from "../services/userRouterServices";

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

export default userRouter;
