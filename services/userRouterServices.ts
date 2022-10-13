import Market from "../models/market";
import User from "../models/user";
import { Request, Response } from "express";
import { toNewUser } from "./validate";
import bcrypt from "bcrypt";
import { UserType } from "./types/interface";

export const createUser = (req: Request, res: Response) => {
  const user = toNewUser(req.body);
  User.findOne({ name: user.name })
    .then((response: UserType | null) => {
      //this return below might cause an error, because its not returning something in every possible case.
      if (response) {
        res.status(400).json({ error: "name must be unique" });
        return;
      }
      console.log("Username OK");
    })
    .catch((err) => {
      //later add next func here
      console.log(`Something went wrong(userRouter.post: /): ${err}`);
    });

  bcrypt
    .hash(user.passwordHash, 10)
    .then((hashedpass) => {
      const newUser = new User({
        name: user.name,
        passwordHash: hashedpass,
        position: user.position,
      });

      newUser
        .save()
        .then(() => {
          console.log(`new user ${newUser.name} created`);
          res.status(200).json(newUser);
        })
        .catch((err: unknown) =>
          console.log(`Something went wrong(userRouter.post: /): ${err}`)
        );
    })
    .catch((err) => res.status(400).send(`couldnt save user ${err}`));
};

export const updateWorkingPlace = (req: Request, res: Response) => {
  Market.findById(req.body.id)
    .then((market) => {
      const foundmarket = market;
      User.findById(req.params.id)
        .then((user) => {
          if (user) {
            user.market = foundmarket;
            user
              .save()
              .then(() => res.status(200).json(user))
              .catch((err: unknown) =>
                res
                  .status(400)
                  .send(`Something went wrong(userRouter.post: /): ${err}`)
              );
          }
        })
        .catch((err) => {
          console.log("couldnt find user: ", err);
        });
    })
    .catch((err) => {
      console.log("couldnt find market: ", err);
    });
};
