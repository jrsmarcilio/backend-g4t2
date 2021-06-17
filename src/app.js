import express from "express";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "./swagger.json";
import "./database";

class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
    this.server.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  middleware() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
