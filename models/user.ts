import mongoose from "mongoose";
import { UserType } from "../services/types/interface";

const userSchema = new mongoose.Schema<UserType>({
  name: { type: String, required: true },
  passwordHash: String,
  market: { type: mongoose.Schema.Types.ObjectId, ref: "Market" },
  position: String,
});

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model<UserType>("User", userSchema);
