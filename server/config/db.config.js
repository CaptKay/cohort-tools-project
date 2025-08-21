import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const dbConn = await mongoose.connect(
      "mongodb://localhost:27017/cohort-tools-api"
    );
    console.log(`connected to database: ${dbConn.connections[0].name}`);
  } catch (error) {
    console.error("Error connecting to the DataBase", error);
  }
}
