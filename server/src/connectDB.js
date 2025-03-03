import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);
    const { host, name } = connection;
    console.log(`mongodb connected: ${host} - ${name}`);
  } catch (error) {
    console.error("mongodb failed on db", error?.message);
  }
};

export default connectDB;
