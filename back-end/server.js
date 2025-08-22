import app from "./src/app.js";
import { initDatabase } from "./src/db/init.js";

const PORT = process.env.PORT ?? 3000;

async function main() {
  await initDatabase();

  app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
  });
}

await main();
