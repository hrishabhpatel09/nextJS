import mongoose from "mongoose";
import { any } from "zod";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

const dbConnect = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log("Already Connected to database");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "");
    connection.isConnected = db.connections[0].readyState
    console.log("DB connected Successfully")
  } catch (error) {
    console.log("Database COnnection Failed",error)
    process.exit(1)
  }
};
