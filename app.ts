import express from "express";
import morgan from "morgan";
import middleware from "./utils/middleware";
import pingRouter from "./controllers/ping";
import productRouter from "./controllers/product";

import { runServer } from "./server";
import userRouter from "./controllers/user";
import marketRouter from "./controllers/market";
runServer().catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(middleware.requestLogger);
app.use("/ping", pingRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/market", marketRouter);

export default app;
