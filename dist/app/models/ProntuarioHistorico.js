"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class ProntuarioHistorico extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        prontuario_id: _sequelize2.default.INTEGER,
        especialista_id: _sequelize2.default.INTEGER,
        data: _sequelize2.default.DATE,
        hora: _sequelize2.default.DATE,
        descricao: _sequelize2.default.STRING,
      },
      {
        tableName: "prontuario_historico",
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Prontuario, { foreignKey: "prontuario_id" }),
      this.belongsTo(models.Especialista, { foreignKey: "especialista_id" });
  }
}

exports. default = ProntuarioHistorico;
