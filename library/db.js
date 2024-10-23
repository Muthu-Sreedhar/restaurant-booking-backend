import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config(); // It will be configue the .env file


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected");
    }
    catch(error) {
        console.error(error.message);
        process.exit(1);   //It will be through some error means process.exit() terminated by the process
    }
}

export default connectDB;