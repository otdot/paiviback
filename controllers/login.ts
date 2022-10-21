import express from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import { UserForToken, UserType } from "../services/types/interface";
import jwt from "jsonwebtoken";
import { SECRET } from "../utils/config";
const loginRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
loginRouter.post("/", async (req, res): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, password }: { name: string; password: string } = req.body;

  const user: UserType | null = await User.findOne({ name });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    res.status(401).json({ error: "invalid username or password" });
  }

  const userForToken: UserForToken = {
    name: user?.name,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    id: user?._id,
  };
  const token = jwt.sign(userForToken, SECRET as string, {
    expiresIn: 60 * 60 * 24,
  });
  res.status(200).json({ token, name: userForToken.name, id: userForToken.id });
});

export default loginRouter;
