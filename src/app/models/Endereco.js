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
      },
      {
        sequelize,
      }
    );

    return this;
  }
  
}

export default Endereco;
