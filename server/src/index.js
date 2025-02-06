import connectDB from "./connectDB.js";
import { app } from "./app.js";

const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

connectDB()
  .then(() => {
    app.listen(port, host, () => {
      console.log(`running port url - http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err?.message, "mongodb failed on index"));
