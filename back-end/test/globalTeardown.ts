import type { TestGlobals } from "./types.ts";

export default async function globalTeardown(): Promise<void> {
  await (global as unknown as TestGlobals).__MONGOINSTANCE.stop();
}
