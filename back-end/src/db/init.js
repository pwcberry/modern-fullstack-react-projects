import mongoose from "mongoose";

const DATABASE_URL = "mongodb://localhost:10000/blog";

export async function initDatabase() {
  mongoose.connection.on("open", () => {
    console.info("Connected to database:",  DATABASE_URL);
  });

  return mongoose.connect(DATABASE_URL);
}
