import mongoose from "mongoose";
import { ProductType } from "../services/types/interface";

const productSchema = new mongoose.Schema<ProductType>({
  name: { type: String, required: true },
  division: { type: String, required: true },
  supplier: { type: String, required: true },
});

productSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

export default mongoose.model<ProductType>("Product", productSchema);
