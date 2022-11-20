import express from "express";
import Product from "../models/product";
import { toNewProduct } from "../services/validate";
import { deleteProduct, updateProduct } from "../services/productRouterService";

const productRouter = express.Router();

productRouter.get("/", (_req, res) => {
  Product.find()
    .then((product) => res.status(200).json({ product }))
    .catch((error: unknown) => res.status(500).json({ error }));
});

productRouter.post("/", (req, res) => {
  const product = toNewProduct(req.body);

  Product.findOne({ name: product.name })
    .then((productresponse) => {
      if (productresponse) {
        res.status(400).end();
      } else {
        console.log("Product name ok");
        const newProduct = new Product({
          name: product.name,
          division: product.division,
          supplier: product.supplier,
        });

        newProduct
          .save()
          .then(() => res.status(200).json(newProduct))
          .catch((err: unknown) =>
            res
              .status(400)
              .send(`Something went wrong(productRouter.post: /): ${err}`)
          );
      }
    })
    .catch((err) =>
      res
        .status(400)
        .send(
          `Couldn't find products. Something went wrong(productRouter.post: /): ${err}`
        )
    );
});

productRouter.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.status(200).json({ product }))
    .catch((error: unknown) => res.status(500).json({ error }));
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
productRouter.patch("/:id", updateProduct);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
productRouter.delete("/:id", deleteProduct);

export default productRouter;
