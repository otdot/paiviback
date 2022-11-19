import Market from "../models/market";
import User from "../models/user";
import { NextFunction, Request, Response } from "express";
import { toNewUser } from "./validate";
import bcrypt from "bcrypt";
import { IRequest, UserType } from "./types/interface";

export const createUser = (req: Request, res: Response, next: NextFunction) => {
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
        .catch((err: unknown) => {
          console.log(`Something went wrong(userRouter.post: /): ${err}`);
          next();
        });
    })
    .catch((err) => res.status(400).send(`couldnt save user ${err}`));
};

export const updateWorkingPlace = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Market.findById(req.body.id)
    .then((market) => {
      User.findById(req.params.id)
        .then((user) => {
          if (user) {
            user.market = market;
            user
              .save()
              .then(() => {
                if (market) {
                  market.personnel = market.personnel?.concat(user);
                  market
                    .save()
                    .then(() => res.status(200).json({ user, market }))
                    .catch((err: unknown) =>
                      res
                        .status(400)
                        .send(
                          `Something went wrong(userRouter.patch: /): ${err}`
                        )
                    );
                }
              })
              .catch((err: unknown) =>
                res
                  .status(400)
                  .send(`Something went wrong(userRouter.patch: /): ${err}`)
              );
          }
        })
        .catch((err) => {
          console.log("couldnt find user: ", err);
          next();
        });
    })
    .catch((err) => {
      console.log("couldnt find market: ", err);
      next();
    });
};

export const getUserMarket = async (req: IRequest, res: Response) => {
  const user = await User.findById(req.user.id);
  if (user) {
    const market = await Market.findById(user.market)
      .populate("storage")
      .populate("personnel", { name: 1, position: 1, id: 1 });
    return res.status(200).json(market);
  }
  return res.status(400).json({
    error:
      "could not find market, user might not be assigned to any workplace yet.",
  });
};
