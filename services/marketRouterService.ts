import Market from "../models/market";
import StorageProduct from "../models/storageProduct";
import Product from "../models/product";
import { Request, Response } from "express";
import {
  NewStorageProductType,
  toNewProduct,
  toNewProductPlacement,
  toNewStorageProductType,
} from "./validate";
import {
  MarketType,
  ProductPlacement,
  ProductType,
  StorageProductType,
} from "./types/interface";

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

const saveOrders = (
  order: NewStorageProductType,
  productNames: string[]
): NewStorageProductType => {
  const storageproduct = new StorageProduct(toNewStorageProductType(order));
  console.log(storageproduct.name);
  if (!productNames.includes(order.name)) {
    const product = new Product(toNewProduct({ ...order }));
    console.log(product);
    product
      .save()
      .then(() => console.log("product saved"))
      .catch((err) => console.log(err));
  }
  storageproduct
    .save()
    .then(() => console.log("storageproduct saved"))
    .catch((err) => console.log(err));
  return storageproduct;
};

export const handleOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products: ProductType[] = await Product.find();
    const productNames: string[] = products.map((p: ProductType) => p.name);
    const market = await Market.findById(req.params.id);
    if (market) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const newOrders: StorageProductType[] = req.body.orders.map(
        (order: NewStorageProductType) => saveOrders(order, productNames)
      );
      market.storage = market.storage?.concat(newOrders);
      try {
        await market.save();
        res.status(200).json(market);
      } catch (err: unknown) {
        res.status(400).json(`Error while saving market. Error: ${err}`);
      }
    } else {
      res.status(400).json("Couldn't find market");
    }
  } catch (err: unknown) {
    res.status(404).json(`Couldn't find products or market. ${err}`);
  }
};

const newDivisions = (placement: ProductPlacement, market: MarketType) => {
  const newPlacement = toNewProductPlacement(placement);
  const excistingDivision = market.productPlacements.find(
    (placement) => placement.division === newPlacement.division
  );
  if (excistingDivision) {
    market.productPlacements = market.productPlacements.filter(
      (placement) => placement.division !== excistingDivision.division
    );
  }
  return newPlacement;
};

export const updateDivisions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const market = await Market.findById(req.params.id);
    if (market) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const productPlacements: ProductPlacement[] =
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        req.body.productPlacements.map((placement: ProductPlacement) =>
          newDivisions(placement, market)
        );

      market.productPlacements =
        market.productPlacements.concat(productPlacements);
      try {
        await market.save();
        res.status(200).json(market);
      } catch (err) {
        res
          .status(400)
          .send(`Couldn't update market productplacements. Error: ${err}`);
      }
    }
  } catch (err) {
    res.status(404).send(`market not found. Error ${err}`);
  }
};
