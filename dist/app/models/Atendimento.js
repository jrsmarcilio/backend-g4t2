"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Atendimento extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        data_agendamento: _sequelize2.default.DATE,
        data_atendimento: _sequelize2.default.DATE,
        hora_atendimento: _sequelize2.default.DATE,
        valor: _sequelize2.default.INTEGER,
        paciente_id: _sequelize2.default.INTEGER,
        especialista_id: _sequelize2.default.INTEGER,
        status: _sequelize2.default.DataTypes.ENUM("AGENDADO", "REALIZADO", "CANCELADO"),
      },
      {
        tableName: "atendimentos",
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Paciente, { foreignKey: "paciente_id" }),
      this.belongsTo(models.Especialista, { foreignKey: "especialista_id" });
  }
}

exports. default = Atendimento;
