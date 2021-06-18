import Sequelize, { Model } from "sequelize";

class Paciente extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        cpf: Sequelize.STRING,
        telefone: Sequelize.STRING,
        celular: Sequelize.STRING,
        email: Sequelize.STRING,
        endereco_id: Sequelize.INTEGER,
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
        tableName: "pacientes",
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Endereco, { foreignKey: "endereco_id" });
  }
}

export default Paciente;
