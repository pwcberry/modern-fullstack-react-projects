import mongoose from "mongoose";
import { beforeAll, afterAll } from "vitest";
import globalSetup from "./globalSetup.ts";
import globalTeardown from "./globalTeardown.ts";
import { initDatabase } from "../src/db/init.ts";

beforeAll(async () => {
  await globalSetup();
  await initDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
  await globalTeardown();
});
