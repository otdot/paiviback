import express from "express";
import Product from "../models/product";
import { toNewProduct } from "../services/validate";

const productRouter = express.Router();

productRouter.get("/", (_req, res) => {
  Product.find()
    .then((product) => res.status(200).json({ product }))
    .catch((error: unknown) => res.status(500).json({ error }));
});

productRouter.post("/", (req, res) => {
  const product = toNewProduct(req.body);

  const newProduct = new Product({
    name: product.name,
    division: product.division,
    supplier: product.supplier,
  });

  newProduct
    .save()
    .then(() => res.json(newProduct))
    .catch((err: unknown) =>
      console.log(`Something went wrong(productRouter.post: /): ${err}`)
    );
});

productRouter.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.status(200).json({ product }))
    .catch((error: unknown) => res.status(500).json({ error }));
});

export default productRouter;
