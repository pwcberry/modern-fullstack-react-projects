import { createServer } from "node:http";
import {MongoClient} from "mongodb";

async function main() {
  const databaseClient = new MongoClient("mongodb://localhost:10000");

  try {
    await databaseClient.connect();
    console.log("Database Connected!");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }

  const server = createServer(
    async(req, res) => {
      const db = databaseClient.db("ch02");
      const users = db.collection("users");

      const usersList = await users.find().toArray();

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(usersList));
    }
  );

  server.listen(8080, "localhost", () => {
    console.log("Server listening on port 8080");
  });
}

await main();
