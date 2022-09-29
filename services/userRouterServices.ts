import Market from "../models/market";
import User from "../models/user";
import { Request, Response } from "express";

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
