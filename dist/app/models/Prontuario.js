"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Prontuario extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        paciente_id: _sequelize2.default.INTEGER,
        data_abertura: _sequelize2.default.DATE,
      },
      {
        tableName: "prontuarios",
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Paciente, { foreignKey: "paciente_id" }),
      this.belongsToMany(models.ProntuarioHistorico, {
        foreignKey: "id",
        through: "ProntsHistorico",
      });
  }
}

exports. default = Prontuario;
