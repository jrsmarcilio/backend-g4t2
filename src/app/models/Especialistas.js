import Sequelize, { Model } from "sequelize";

class Especialistas extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        registro: Sequelize.STRING,
        telefone: Sequelize.STRING,
        celular: Sequelize.STRING,
        email: Sequelize.STRING,
        senha: Sequelize.VIRTUAL,
        senha_hash: Sequelize.STRING,
        endereco_id: Sequelize.INTEGER,
        profissao_id: Sequelize.INTEGER,
      },
      {
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
      this.belongsTo(models.Profissao, { foreignKey: "profissao_id" });
  }
}

export default Especialistas;
