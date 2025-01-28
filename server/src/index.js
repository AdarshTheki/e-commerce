import connectDB from "./connectDB.js";
import { app } from "./app.js";

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`running port url - http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err?.message, "mongodb failed on index"));
