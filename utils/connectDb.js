import mongoose from "mongoose";

// Connect to MongoDB
export default async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to Mongo DB")
  } catch (err) {
    throw new Error(err.message);
  }

  mongoose.connection.on('disconnected', () => {
    console.log("Mongodb disconnected")
  })


};
