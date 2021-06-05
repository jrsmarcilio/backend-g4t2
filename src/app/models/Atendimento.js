import Sequelize, { Model } from "sequelize";

class Atendimento extends Model {
  static init(sequelize) {
    super.init(
      {
        data_agendamento: Sequelize.DATE,
        data_atendimento: Sequelize.DATE,
        hora_atendimento: Sequelize.DATE,
        valor: Sequelize.INTEGER,
        especialista_id: Sequelize.INTEGER,
        atendimento_status: Sequelize.DataTypes.ENUM(
          "AGENDADO",
          "REALIZADO",
          "CANCELADO"
        ),
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Especialista, { foreignKey: "id" });
  }
}

export default Atendimento;
