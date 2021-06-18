import Sequelize, { Model } from "sequelize";

class Atendimento extends Model {
  static init(sequelize) {
    super.init(
      {
        data_agendamento: Sequelize.DATE,
        data_atendimento: Sequelize.DATE,
        hora_atendimento: Sequelize.DATE,
        valor: Sequelize.INTEGER,
        paciente_id: Sequelize.INTEGER,
        especialista_id: Sequelize.INTEGER,
        status: Sequelize.DataTypes.ENUM("AGENDADO", "REALIZADO", "CANCELADO"),
      },
      {
        tableName: "atendimentos",
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Paciente, { foreignKey: "paciente_id" }),
      this.belongsTo(models.Especialista, { foreignKey: "especialista_id" });
  }
}

export default Atendimento;
