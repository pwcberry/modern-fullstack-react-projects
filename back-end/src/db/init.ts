import mongoose from "mongoose";

const DATABASE_URL: string | undefined = process.env.DATABASE_URL;

export async function initDatabase(): Promise<typeof mongoose> {
  mongoose.connection.on("open", () => {
    console.info("Connected to database:", DATABASE_URL);
  });

  return mongoose.connect(DATABASE_URL as string);
}

