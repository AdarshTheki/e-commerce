import mongoose from "mongoose";
import { DB_NAME } from "./constant.js";

const connectDB = async () => {
    try {
        const response = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        );
        console.log(`MongoDB Connected: ${response.connection.host}`);
        console.log(`Database Name: ${response.connection.name}`);
    } catch (error) {
        console.log("MongoDB Connection Failed !! ", error?.message);
    }
};

export default connectDB;
