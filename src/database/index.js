require("dotenv/config");

import Sequelize from "sequelize";

import Atendimento from "../app/models/Atendimento";
import Cliente from "../app/models/Cliente";
import Endereco from "../app/models/Endereco";
import Especialista from "../app/models/Especialistas";
import Profissao from "../app/models/Profissao";
import Prontuario from "../app/models/Prontuario";
import ProntuarioHistorico from "../app/models/ProntuarioHistorico";
import Usuario from "../app/models/Usuario";

import databaseconfig from "../config/database";

const models = [
  Atendimento,
  Cliente,
  Endereco,
  Especialista,
  Profissao,
  Prontuario,
  ProntuarioHistorico,
  Usuario,
];

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
