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
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Prontuario, { foreignKey: "prontuario_id" }),
      this.belongsTo(models.Especialistas, { foreignKey: "especialista_id" });
  }
}

export default ProntuarioHistorico;
