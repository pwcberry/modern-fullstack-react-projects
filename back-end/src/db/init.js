import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL;

export async function initDatabase() {
  mongoose.connection.on("open", () => {
    console.info("Connected to database:", DATABASE_URL);
  });

  return mongoose.connect(DATABASE_URL);
}
