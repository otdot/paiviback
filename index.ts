import app from "./app";
import { PORT } from "./utils/config";

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
