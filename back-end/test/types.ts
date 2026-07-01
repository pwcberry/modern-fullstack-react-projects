import { MongoMemoryServer } from "mongodb-memory-server";

export interface TestGlobals {
  __MONGOINSTANCE: MongoMemoryServer;
}
