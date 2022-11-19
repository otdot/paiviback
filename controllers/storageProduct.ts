import express from "express";
import {
  getStorageProducts,
  deleteStorageProducts,
} from "../services/storageProductService";

const storageProductRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
storageProductRouter.get("/", getStorageProducts);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
storageProductRouter.delete("/:id", deleteStorageProducts);

export default storageProductRouter;
