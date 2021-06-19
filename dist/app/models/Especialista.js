"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

class Especialista extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome: _sequelize2.default.STRING,
        registro: _sequelize2.default.STRING,
        profissao: _sequelize2.default.STRING,
        email: _sequelize2.default.STRING,
        telefone: _sequelize2.default.STRING,
        celular: _sequelize2.default.STRING,
        senha: _sequelize2.default.VIRTUAL,
        senha_hash: _sequelize2.default.STRING,
        endereco_id: _sequelize2.default.INTEGER,
      },
      {
        tableName: "especialistas",
        sequelize,
      }
    );

    this.addHook("beforeSave", async (especialista) => {
      if (especialista.senha) {
        especialista.senha_hash = await _bcryptjs2.default.hash(especialista.senha, 10);
      }
    });

    return this;
  }
  checkSenha(senha) {
    return _bcryptjs2.default.compare(senha, this.senha_hash);
  }

  static associate(models) {
    this.belongsTo(models.Endereco, { foreignKey: "endereco_id" }),
      this.hasMany(models.Recepcionista, { foreignKey: "especialista_id" }),
      this.hasMany(models.Paciente, { foreignKey: "especialista_id" });
  }
}

exports. default = Especialista;
