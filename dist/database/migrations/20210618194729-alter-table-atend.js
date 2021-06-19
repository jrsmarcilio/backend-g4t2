"use strict";"use strict";

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("atendimentos", "valor", {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    });

    await queryInterface.changeColumn("atendimentos", "data_agendamento", {
      type: Sequelize.DATEONLY,
      allowNull: false,
    });

    await queryInterface.changeColumn("atendimentos", "data_atendimento", {
      type: Sequelize.DATEONLY,
      allowNull: false,
    });

    await queryInterface.changeColumn("atendimentos", "hora_atendimento", {
      type: DataTypes.TIME,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("atendimentos", "valor", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn("atendimentos", "data_agendamento", {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.changeColumn("atendimentos", "data_atendimento", {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.changeColumn("atendimentos", "hora_atendimento", {
      type: DataTypes.DATE,
      allowNull: false,
    });
  },
};
