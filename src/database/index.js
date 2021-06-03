require("dotenv/config");

import Sequelize from "sequelize";

import Usuario from "../app/models/Usuario";
import Cliente from "../app/models/Cliente";
import Endereco from "../app/models/Endereco";

import databaseconfig from "../config/database";

const models = [Usuario, Cliente, Endereco];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseconfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
