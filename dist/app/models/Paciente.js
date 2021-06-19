"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Paciente extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome: _sequelize2.default.STRING,
        cpf: _sequelize2.default.STRING,
        telefone: _sequelize2.default.STRING,
        celular: _sequelize2.default.STRING,
        email: _sequelize2.default.STRING,
        endereco_id: _sequelize2.default.INTEGER,
        tipo_sanguineo: _sequelize2.default.DataTypes.ENUM(
          "A+",
          "A-",
          "B+",
          "B-",
          "O+",
          "O-",
          "AB+",
          "AB-"
        ),
      },
      {
        tableName: "pacientes",
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Endereco, { foreignKey: "endereco_id" }),
      this.hasOne(models.Prontuario);
  }
}

exports. default = Paciente;
