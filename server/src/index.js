import connectDB from "./connectDB.js";
import { app } from "./app.js";

const port = 4000;
const host = "0.0.0.0";

connectDB()
  .then(() => {
    app.listen(port, host, () => {
      console.log(`running port url : http://localhost:${port}`);
    });
  })
  .catch((err) => console.error(err?.message, "mongodb failed on index"));
