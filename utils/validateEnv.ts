import { cleanEnv, str, port } from "envalid";

export const validateEnv = () => {
  cleanEnv(process.env, {
    MONGODB_URI: str(),
    PORT: port(),
  });
};
