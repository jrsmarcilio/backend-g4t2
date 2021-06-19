"use strict";"use strict";

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("prontuario_historico", "data", {
      type: Sequelize.DATEONLY,
      allowNull: false,
    });
    await queryInterface.changeColumn("prontuario_historico", "hora", {
      type: DataTypes.TIME,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("prontuario_historico", "data", {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.changeColumn("prontuario_historico", "hora", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
