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
}

export default Profissao;
