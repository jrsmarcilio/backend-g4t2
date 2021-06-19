"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

class Recepcionista extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        login: _sequelize2.default.STRING,
        senha: _sequelize2.default.VIRTUAL,
        senha_hash: _sequelize2.default.STRING,
        nome: _sequelize2.default.STRING,
        especialista_id: _sequelize2.default.INTEGER,
      },
      {
        tableName: "recepcionistas",
        sequelize,
      }
    );

    this.addHook("beforeSave", async (usuario) => {
      if (usuario.senha) {
        usuario.senha_hash = await _bcryptjs2.default.hash(usuario.senha, 10);
      }
    });

    return this;
  }

  checkSenha(senha) {
    return _bcryptjs2.default.compare(senha, this.senha_hash);
  }

  static associate(models) {
    this.belongsTo(models.Especialista, { foreignKey: "especialista_id" });
  }
}

exports. default = Recepcionista;
