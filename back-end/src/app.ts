import express from "express";
import type { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as Posts from "./routes/posts.ts";

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());

Posts.mountRoutes(app);

app.get("/", (_: Request, res: Response) => {
  res.send("<html lang='en'><title>Hello</title><body><h1>Hello From Express!</h1></body></html>");
});

export default app;
