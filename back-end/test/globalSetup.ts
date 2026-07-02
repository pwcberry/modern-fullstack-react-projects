import type { TestProject } from "vitest/node";
import { MongoMemoryServer } from "mongodb-memory-server";

declare module "vitest" {
  export interface ProvidedContext {
    MONGO_URI: string;
  }
}

export default async function setup({ provide }: TestProject) {
  const instance = await MongoMemoryServer.create();
  const uri = instance.getUri();

  provide("MONGO_URI", uri);

  // (global as unknown as TestGlobals).__MONGOINSTANCE = instance;
  // process.env.DATABASE_URL = instance.getUri();
  return async () => {
    await instance.stop();
  };
}
