import mongoose from "mongoose";

export async function initDatabase(mongoUri = process.env.DATABASE_URL): Promise<typeof mongoose> {
  mongoose.connection.on("open", () => {
    console.info("Connected to database:", mongoUri);
  });

  return mongoose.connect(mongoUri as string);
}
