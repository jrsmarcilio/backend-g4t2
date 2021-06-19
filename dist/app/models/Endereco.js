"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Endereco extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        cep: _sequelize2.default.STRING,
        logradouro: _sequelize2.default.STRING,
        numero: _sequelize2.default.STRING,
        bairro: _sequelize2.default.STRING,
        cidade: _sequelize2.default.STRING,
        estado: _sequelize2.default.STRING,
      },
      {
        tableName: "enderecos",
        sequelize,
      }
    );

    return this;
  }
}

exports. default = Endereco;
