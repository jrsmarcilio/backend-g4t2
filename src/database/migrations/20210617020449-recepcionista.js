"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("recepcionistas", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      login: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      senha_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
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
    return queryInterface.dropTable("recepcionistas");
  },
};
