import app from "./app.ts";
import { initDatabase } from "./db/init.ts";

const PORT: number = Number(process.env.PORT ?? 3000);

async function main(): Promise<void> {
  await initDatabase();

  app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
  });
}

await main();



