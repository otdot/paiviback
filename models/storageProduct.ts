import mongoose from "mongoose";
import { StorageProductType } from "../services/types/interface";

const storageProductSchema = new mongoose.Schema<StorageProductType>({
  name: { type: String, required: true },
  division: { type: String, required: true },
  supplier: { type: String, required: true },
  amount: { type: Number, required: true },
  unit: { type: String, required: true },
  lotnum: { type: String, required: true },
  bestbefore: { type: String, required: true },
});

export default mongoose.model<StorageProductType>(
  "StorageProduct",
  storageProductSchema
);
