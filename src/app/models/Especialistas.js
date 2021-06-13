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
        endereco_id: Sequelize.INTEGER,
        profissao_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
  static associate(models) {
    this.belongsTo(models.Endereco, { foreignKey: "endereco_id" }),
      this.belongsTo(models.Profissao, { foreignKey: "profissao_id" });
  }
}

export default Especialistas;
