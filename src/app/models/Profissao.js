import Sequelize, { Model } from "sequelize";

class Profissao extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Especialista, { foreignKey: "especialista_id" });
    }
}

export default Profissao;
