import express from "express";
import bodyParser from "body-parser";
import * as Posts from "./routes/posts.js";

const app = express();
app.use(bodyParser.json());

Posts.mountRoutes(app);

app.get("/", (req, res) => {
  res.send("<html lang='en'><title>Hello</title><body><h1>Hello From Express!</h1></body></html>");
});

export default app;
