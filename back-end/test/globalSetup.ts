import { MongoMemoryServer } from "mongodb-memory-server";
import type { TestGlobals } from "./types.ts";

export default async function globalSetup(): Promise<void> {
  const instance = await MongoMemoryServer.create({
    binary: {
      version: "7.0.12",
    },
  });

  (global as unknown as TestGlobals).__MONGOINSTANCE = instance;
  process.env.DATABASE_URL = instance.getUri();
}
