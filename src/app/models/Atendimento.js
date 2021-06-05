import Sequelize, { Model } from "sequelize";

class Cliente extends Model {
    static init(sequelize) {
        super.init(
            {
                id: Sequelize.INTEGER,
                dataAgendamento: Sequelize.DATE,
                dataAtendimento: Sequelize.DATE,
                horaAtendimento: Sequelize.DATE,
                valor: Sequelize.INTEGER,
                tipo_sanguineo: Sequelize.DataTypes.ENUM(
                    "AGENDADO",
                    "REALIZADO",
                    "CANCELADO"
                ),
                atendimento_id: Sequelize.INTEGER,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Atendimento, { foreignKey: "atendimento_id" });
    }
}

export default Cliente;
