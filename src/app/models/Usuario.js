import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        login: Sequelize.STRING,
        senha: Sequelize.VIRTUAL,
        senha_hash: Sequelize.STRING,
        nome: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook("beforeSave", async (usuario) => {
      if (usuario.senha) {
        usuario.senha_hash = await bcrypt.hash(usuario.senha, 15);
      }
    });

    return this;
  }
}

export default Usuario;
