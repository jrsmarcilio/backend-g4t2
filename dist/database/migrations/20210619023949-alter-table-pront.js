"use strict";"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("prontuarios", "data_abertura", {
      type: Sequelize.DATEONLY,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("prontuarios", "data_abertura", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
