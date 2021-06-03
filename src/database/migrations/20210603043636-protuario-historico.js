"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("prontuario_historico", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      prontuario_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "prontuarios",
          key: "id",
          onUpdate: "CASCADE",
          onUpdate: "SET NULL",
          allowNull: false,
        },
      },
      especialista_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "especialistas",
          key: "id",
          onUpdate: "CASCADE",
          onUpdate: "SET NULL",
          allowNull: false,
        },
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      hora: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable("prontuario_historico");
  },
};