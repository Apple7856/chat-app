import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected!");
  } catch (error) {
    console.log("Connection error", error);
  }
}
