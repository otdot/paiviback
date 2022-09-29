import mongoose from "mongoose";
import { MarketType } from "../services/types/interface";

const marketSchema = new mongoose.Schema<MarketType>({
  name: { type: String, required: true },
  personnel: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  productPlacements: [{ division: String, aisle: Number }],
  storage: [{ type: mongoose.Schema.Types.ObjectId, ref: "StorageProduct" }],
});

marketSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

export default mongoose.model<MarketType>("Market", marketSchema);
