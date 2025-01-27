import mongoose from "mongoose";
import { db_name, mongodb_uri } from "./constant.js";

const connectDB = async () => {
  try {
    const response = await mongoose.connect(`${mongodb_uri}/${db_name}`);
    console.log(
      `mongodb connect: ${response.connection.host} - ${response.connection.name}`
    );
  } catch (error) {
    console.log("mongodb failed on db", error?.message);
  }
};

export default connectDB;
