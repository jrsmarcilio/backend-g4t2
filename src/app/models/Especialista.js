import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class Especialista extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        registro: Sequelize.STRING,
        profissao: Sequelize.STRING,
        email: Sequelize.STRING,
        telefone: Sequelize.STRING,
        celular: Sequelize.STRING,
        senha: Sequelize.VIRTUAL,
        senha_hash: Sequelize.STRING,
        endereco_id: Sequelize.INTEGER,
      },
      {
        tableName: "especialistas",
        sequelize,
      }
    );

    this.addHook("beforeSave", async (especialista) => {
      if (especialista.senha) {
        especialista.senha_hash = await bcrypt.hash(especialista.senha, 10);
      }
    });

    return this;
  }
  checkSenha(senha) {
    return bcrypt.compare(senha, this.senha_hash);
  }

  static associate(models) {
    this.belongsTo(models.Endereco, { foreignKey: "endereco_id" }),
      this.hasMany(models.Recepcionista, { foreignKey: "especialista_id" }),
      this.hasMany(models.Paciente, { foreignKey: "especialista_id" });
  }
}

export default Especialista;
