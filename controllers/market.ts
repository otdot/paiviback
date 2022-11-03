import express from "express";
import Market from "../models/market";
import { handleOrder, handleGetMarket } from "../services/marketRouterService";
import { toNewMarket } from "../services/validate";

const marketRouter = express.Router();

marketRouter.get("/", (_req, res) => {
  Market.find({})
    .populate("storage")
    .then((market) => res.status(200).json(market))
    .catch((err) => console.log(err));
});

marketRouter.post("/", (req, res) => {
  const market = toNewMarket(req.body);

  const newMarket = new Market({
    name: market.name,
    productPlacements: market.productPlacements,
  });

  newMarket
    .save()
    .then(() => res.json(newMarket))
    .catch((err: unknown) =>
      console.log(`Something went wrong(userRouter.post: /): ${err}`)
    );
});

marketRouter.get("/:id", handleGetMarket);
marketRouter.patch("/:id", handleOrder);

export default marketRouter;
