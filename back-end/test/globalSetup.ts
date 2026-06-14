import { MongoMemoryServer } from "mongodb-memory-server";

export default async function globalSetup(): Promise<void> {
  const instance = await MongoMemoryServer.create({
    binary: {
      version: "7.0.12",
    },
  });

  (global as any).__MONGOINSTANCE = instance;
  process.env.DATABASE_URL = instance.getUri();
}

