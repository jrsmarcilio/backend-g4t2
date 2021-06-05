import Sequelize, { Model } from "sequelize";

class Especialista extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
                registro: Sequelize.STRING,
                telefone: Sequelize.STRING,
                celular: Sequelize.STRING,
                email: Sequelize.STRING,
                profissao_id: Sequelize.INTEGER,
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
    static associate(models) {
        this.belongsTo(models.Profissao, { foreignKey: "id" });
    }
}

export default Especialista;
