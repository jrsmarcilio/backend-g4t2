import Sequelize, { Model } from "sequelize";

class ProntuarioHistorico extends Model {
  static init(sequelize) {
    super.init(
      {
        prontuario_id: Sequelize.INTEGER,
        especialista_id: Sequelize.INTEGER,
        data: Sequelize.DATE,
        hora: Sequelize.DATE,
        descricao: Sequelize.STRING,
      },
      {
        tableName: "prontuario_historico",
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Prontuario, { foreignKey: "prontuario_id" }),
      this.belongsTo(models.Especialista, { foreignKey: "especialista_id" });
  }
}

export default ProntuarioHistorico;
