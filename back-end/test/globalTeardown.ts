export default async function globalTeardown(): Promise<void> {
  await (global as any).__MONGOINSTANCE.stop();
}

