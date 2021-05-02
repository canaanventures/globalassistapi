import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";

let CROS_OPTIONS = {
  origin: ["http://localhost:4200", "http://globalassistadmin.padahjobs.com", "https://globalassistadmin.padahjobs.com"],
  allowedHeaders: [
    "Content-Type",
    "Access-Control-Allow-Origin",
    "Authorization",
    "ud",
    "X-Requested-With",
    "Access-Control-Allow-Credentials",
    "Access-Control-Max-Age",
    "Access-Control"
  ],
  EXPOSEDHEADERS: ["Authorization"],
  ALLOWEDMETHODS: ["GET,POST"],
  credentials: true,
}

//Connects to the Database -> then starts the express
createConnection()
  .then(async connection => {
    // Create a new express application instance
    const app = express();

    // Call midlewares
    app.use(cors(CROS_OPTIONS));
    app.use(helmet());
    app.use(bodyParser.json());

    //Set all routes from routes folder
    app.use("/", routes);
    let port = process.env.PORT || 3004;
    app.listen(port, () => {
      console.log("Global Assist Admin API listening on port " + port + "!");
    });
  })
  .catch(error => console.log(error));
