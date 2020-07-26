import http from "http";
import chalk from "chalk";
import morgan from "morgan";
import mongoose from "mongoose"

import app from "./src/server";
import { port, isDevelopment, mongo_uri } from "./src/utils/config";

if (isDevelopment) { 
  app.use(morgan("dev"))
}

(async () => {
  await mongoose.connect(mongo_uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  
  http.createServer(app).listen(port, () => {
    console.log(chalk.black.bgGreen(`Server has been started on port: ${port}`));
  });
})();