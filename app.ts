import express from "express";
import morgan from "morgan";
import path from 'path';
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

app.use(express.static("build"));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/ping", pingRouter);
app.use("/markets", marketRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/storageproducts", storageProductRouter);

// The wildcard (*) lets all paths bypass Express 
// in favor of React handling client-side routing.
app.get("/*", (_, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

export default app;
