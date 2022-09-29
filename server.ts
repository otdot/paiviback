import { MONGODB_URI } from "./utils/config";
import { validateEnv } from "./utils/validateEnv";
import * as mongoose from "mongoose";

validateEnv();

export const runServer = async () => {
  try {
    if (MONGODB_URI) await mongoose.connect(MONGODB_URI);
    else console.log("MONGODB_URI undefined");
  } catch (err: unknown) {
    console.log("could not connect to MONGODB: ", err);
  }
};
