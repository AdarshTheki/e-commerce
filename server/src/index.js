import connectDB from "./connectDB.js";
import { app } from "./app.js";
import { port } from "./constant.js";

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Running http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err?.message, "MongoDB Connection Error!"));
