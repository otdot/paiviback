import { Request, Response } from "express";
import Product from "../models/product";
import { ProductType } from "./types/interface";
import { parseDivision } from "./validate";

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product: ProductType | null = await Product.findById(req.params.id);
    if (product) {
      const newDivision = parseDivision(req.body.division);
      product.division = newDivision;
      await product.save();
      res.status(200).json(product);
    }
  } catch (err: unknown) {
    const msg = `Couldn't update products division ${err}`;
    res.status(400).json(msg);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (err: unknown) {
    const msg = `Couldn't delete product division ${err}`;
    res.status(400).json(msg);
  }
};
