import express from "express";
import User from "../models/user";
import { updateWorkingPlace } from "../services/userRouterServices";
import { toNewUser } from "../services/validate";

const userRouter = express.Router();

userRouter.get("/", (_req, res) => {
  User.find()
    .then((response) => res.status(200).json(response))
    .catch((err: unknown) =>
      console.log(`An unexpected error occurred: ${err}`)
    );
});

userRouter.post("/", (req, res) => {
  const user = toNewUser(req.body);

  const newUser = new User({
    name: user.name,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    market: user.market,
    position: user.position,
  });

  newUser
    .save()
    .then(() => res.json(newUser))
    .catch((err: unknown) =>
      console.log(`Something went wrong(userRouter.post: /): ${err}`)
    );
});

userRouter.patch("/:id", updateWorkingPlace);

export default userRouter;
