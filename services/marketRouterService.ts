import Market from "../models/market";
import StorageProduct from "../models/storageProduct";
import { Request, Response } from "express";
import { NewStorageProductType, toNewStorageProductType } from "./validate";
import { StorageProductType } from "./types/interface";

export const handleGetMarket = (req: Request, res: Response) => {
  Market.findById(req.params.id)
    .then((market) => {
      if (market) {
        res.status(200).json(market);
      }
    })
    .catch((err: unknown) =>
      res.status(400).send(`Couldn't find market: ${err}`)
    );
};

export const handleOrder = (req: Request, res: Response) => {
  Market.findById(req.params.id)
    .then((market) => {
      if (market) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const newOrders: StorageProductType[] = req.body.orders.map(
          (order: NewStorageProductType) => {
            const product = new StorageProduct(toNewStorageProductType(order));
            product
              .save()
              .then(() => console.log("product saved"))
              .catch((err) => console.log(err));
            return product;
          }
        );

        market.storage = market.storage?.concat(newOrders);
        market
          .save()
          .then(() => res.status(200).json(market))
          .catch((err: unknown) => res.status(400).send(err));
      } else {
        res.status(400).send("Couldn't find market.");
      }
    })
    .catch((err) => {
      console.log("couldnt find market: ", err);
    });
};
