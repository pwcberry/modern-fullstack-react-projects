import mongoose from "mongoose";
import { beforeAll, afterAll } from "vitest";
import { initDatabase } from "../src/db/init";

beforeAll(async () => {
  await initDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
});



