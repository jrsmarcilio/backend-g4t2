"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require("dotenv/config");

var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _Atendimento = require('../app/models/Atendimento'); var _Atendimento2 = _interopRequireDefault(_Atendimento);
var _Paciente = require('../app/models/Paciente'); var _Paciente2 = _interopRequireDefault(_Paciente);
var _Endereco = require('../app/models/Endereco'); var _Endereco2 = _interopRequireDefault(_Endereco);
var _Especialista = require('../app/models/Especialista'); var _Especialista2 = _interopRequireDefault(_Especialista);
var _Prontuario = require('../app/models/Prontuario'); var _Prontuario2 = _interopRequireDefault(_Prontuario);
var _ProntuarioHistorico = require('../app/models/ProntuarioHistorico'); var _ProntuarioHistorico2 = _interopRequireDefault(_ProntuarioHistorico);
var _Recepcionista = require('../app/models/Recepcionista'); var _Recepcionista2 = _interopRequireDefault(_Recepcionista);

var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

const models = [
  _Atendimento2.default,
  _Paciente2.default,
  _Endereco2.default,
  _Especialista2.default,
  _Prontuario2.default,
  _ProntuarioHistorico2.default,
  _Recepcionista2.default,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new (0, _sequelize2.default)(_database2.default);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

exports. default = new Database();
