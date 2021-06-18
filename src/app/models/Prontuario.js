import Sequelize, { Model } from "sequelize";

class Prontuario extends Model {
  static init(sequelize) {
    super.init(
      {
        paciente_id: Sequelize.INTEGER,
        data_abertura: Sequelize.DATE,
      },
      {
        tableName: "prontuarios",
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Paciente, { foreignKey: "paciente_id" }),
      this.belongsToMany(models.ProntuarioHistorico, {
        foreignKey: "id",
        through: "ProntsHistorico",
      });
  }
}

export default Prontuario;
