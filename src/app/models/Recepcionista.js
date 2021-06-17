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
      },
      {
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
}

export default Recepcionista;
