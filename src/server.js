import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import path from "path";

import { isProduction } from "./utils/config";
import api from "./routes/routing.api";
import admin from "./routes/routing.admin";

const root = path.join.bind(this, __dirname);
const app = express();

app.set("view engine", "ejs");

app
  .use(cors())
  .use(compression())
  .use(helmet())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }));
  
app.use(express.static(root("public")));

app.use("/api", api);
app.use("/admin", admin);

if (isProduction) {
  app.use("/", express.static(root("../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

export default app;
