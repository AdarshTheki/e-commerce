import mongoose from "mongoose";
import server from "./app.js";

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "0.0.0.0";

async function connectDB() {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);
    const { host, name } = connection;
    console.log(`Mongodb Connected On >> ${host} - ${name}`);
  } catch (error) {
    console.error(`Mongodb Failed On >> ${error.message}`);
    process.exit(1);
  }
}

connectDB()
  .then(() => {
    server.listen(PORT, HOST, () => {
      console.log(`Running PORT >> http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(`Server Failed On >> ${err.message}`));
