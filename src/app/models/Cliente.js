import Sequelize, { Model } from "sequelize";

class Cliente extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
         type: Sequelize.INTEGER,
          defaultValue
        } ,
        nome: Sequelize.STRING,
        cpf: Sequelize.STRING,
        telefone: Sequelize.STRING,
        celular: Sequelize.STRING,
        email: Sequelize.STRING,
        tipo_sanguineo: Sequelize.DataTypes.ENUM(
          "A+",
          "A-",
          "B+",
          "B-",
          "O+",
          "O-",
          "AB+",
          "AB-"
        ),
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Endereco, { foreignKey: "id" });
  }
}

export default Cliente;
