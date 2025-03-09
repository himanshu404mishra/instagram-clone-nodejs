import mongoose from "mongoose";

function connectMongoDB() {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("MongoDB connected successfully");
        })
        .catch((err) => {
            console.log("MongoDB connection failed", err);
        });
}

export default connectMongoDB;