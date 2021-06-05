import Sequelize, { Model } from "sequelize";

class Atendimento extends Model {
  static init(sequelize) {
    super.init(
      {
        cliente_id: Sequelize.INTEGER,
        data_abertura: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Cliente, { foreignKey: "id" });
  }
}

export default Atendimento;
