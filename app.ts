import express from "express";
import morgan from "morgan";
import middleware from "./utils/middleware";
import pingRouter from "./controllers/ping";
import productRouter from "./controllers/product";
import cors from "cors";

import { runServer } from "./server";
import userRouter from "./controllers/user";
import marketRouter from "./controllers/market";
import loginRouter from "./controllers/login";
import storageProductRouter from "./controllers/storageProduct";
runServer().catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/ping", pingRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/market", marketRouter);
app.use("/login", loginRouter);
app.use("/storageproducts", storageProductRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

export default app;
