import app from "./app";
import { PORT } from "./utils/config";

const APPPORT = PORT || 3001;

app.listen(APPPORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
