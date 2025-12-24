import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    mongoose.set("strictQuery", true);

    if (isConnected) {
        return; // Re-use the existing connection
    }

    try {
        const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
        if (!mongoUri) throw new Error("MONGO_URI is missing");

        const db = await mongoose.connect(mongoUri);
        isConnected = db.connections[0].readyState;
        console.log("Connected to MongoDB Atlas");
    } catch (err) {
        console.error("MongoDB Error:", err.message);
        // Do NOT use process.exit(1) here on Vercel
        throw err; 
    }
}
export default connectDB;