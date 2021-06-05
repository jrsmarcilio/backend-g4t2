import Sequelize, { Model } from "sequelize";

class Especialista extends Model {
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
    this.belongsTo(models.Prontuario, { foreignKey: "id" });
  }
  static associate(models) {
    this.belongsTo(models.Especialista, { foreignKey: "id" });
  }
}

export default Especialista;
