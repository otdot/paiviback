import { Response } from "express";
import StorageProduct from "../models/storageProduct";
import { IRequest } from "./types/interface";
import { NewStorageProductType } from "./validate";

export const getStorageProducts = async (
  _req: IRequest,
  res: Response
): Promise<void> => {
  try {
    const storageProducts: NewStorageProductType[] =
      await StorageProduct.find();
    res.status(200).json(storageProducts);
  } catch (err) {
    res.status(400).send(`Could not get storageproducts. Error: ${err}`);
  }
};
