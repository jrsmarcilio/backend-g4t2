import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class Recepcionista extends Model {
  static init(sequelize) {
    super.init(
      {
        login: Sequelize.STRING,
        senha: Sequelize.VIRTUAL,
        senha_hash: Sequelize.STRING,
        nome: Sequelize.STRING,
        especialista_id: Sequelize.INTEGER,
      },
      {
        tableName: "recepcionistas",
        sequelize,
      }
    );

    this.addHook("beforeSave", async (usuario) => {
      if (usuario.senha) {
        usuario.senha_hash = await bcrypt.hash(usuario.senha, 10);
      }
    });

    return this;
  }

  checkSenha(senha) {
    return bcrypt.compare(senha, this.senha_hash);
  }

  static associate(models) {
    this.belongsTo(models.Especialista, { foreignKey: "especialista_id" });
  }
}

export default Recepcionista;
