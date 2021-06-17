"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("atendimentos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      data_agendamento: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      data_atendimento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      hora_atendimento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      valor: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      paciente_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "pacientes",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          allowNull: false,
        },
      },
      especialista_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "especialistas",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          allowNull: false,
        },
      },
      status: {
        type: Sequelize.ENUM,
        defaultValue: "AGENDADO",
        values: ["AGENDADO", "REALIZADO", "CANCELADO"],
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("atendimentos");
  },
};
