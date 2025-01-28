import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const response = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log(
      `mongodb connect: ${response.connection.host} - ${response.connection.name}`
    );
  } catch (error) {
    console.log("mongodb failed on db", error?.message);
  }
};

export default connectDB;
