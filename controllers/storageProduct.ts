import express from "express";
import { getStorageProducts } from "../services/storageProductService";

const storageProductRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
storageProductRouter.get("/", getStorageProducts);

export default storageProductRouter;
