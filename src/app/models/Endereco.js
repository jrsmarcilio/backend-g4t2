import Sequelize, { Model } from "sequelize";

class Endereco extends Model {
  static init(sequelize) {
    super.init(
      {
        cep: Sequelize.STRING,
        logradouro: Sequelize.STRING,
        numero: Sequelize.STRING,
        bairro: Sequelize.STRING,
        cidade: Sequelize.STRING,
        estado: Sequelize.STRING,
        cliente_id: Sequelize.INTEGER,
        especialista_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Endereco;
