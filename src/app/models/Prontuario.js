import Sequelize, { Model } from "sequelize";

class Prontuario extends Model {
  static init(sequelize) {
    super.init(
      {
        paciente_id: Sequelize.INTEGER,
        data_abertura: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Cliente, { foreignKey: "paciente_id" }),
      this.belongsToMany(models.ProntuarioHistorico, { foreignKey: "id" });
  }
}

export default Prontuario;
