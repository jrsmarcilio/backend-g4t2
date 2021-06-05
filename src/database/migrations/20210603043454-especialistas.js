"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("especialistas", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      registro: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      celular: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profissao_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "profissoes",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          allowNull: false,
        },
      },
      endereco_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "enderecos",
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
    return queryInterface.dropTable("especialistas");
  },
};