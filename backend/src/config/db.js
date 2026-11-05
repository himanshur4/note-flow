import mongoose from "mongoose";

const RETRY_DELAY_MS=5000;

// Keeps retrying instead of exiting, so the server stays up and recovers by itself
// when the database comes back.
const connectDB=async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI,{serverSelectionTimeoutMS:10000});
        console.log(`Database connected successfully!`);
    } catch (error) {
        console.error(`Database connection failed, retrying in ${RETRY_DELAY_MS/1000}s:`,error.message);
        setTimeout(connectDB,RETRY_DELAY_MS);
    }
}

export default connectDB;
