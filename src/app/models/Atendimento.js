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
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Cliente, { foreignKey: "paciente_id" });
  }
  static associate(models) {
    this.belongsTo(models.Especialistas, { foreignKey: "especialista_id" });
  }
}

export default Atendimento;
