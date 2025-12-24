    import mongoose from "mongoose";

    const connectDB = async () => {
        try{
            const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGO_URL;
            if (!mongoUri) {
                console.error("Error: MONGO_URI is not set. Ensure you have a .env file with MONGO_URI or set the environment variable.");
                process.exit(1);
            }
            await mongoose.connect(mongoUri);
            console.log("MongoDB connected");
        }
        catch(err){
            console.error("MongoDB connection error:", err.message);
            process.exit(1);
        }
    }
    export default connectDB;