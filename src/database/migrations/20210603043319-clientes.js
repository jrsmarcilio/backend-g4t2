"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("clientes", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      cpf: {
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
      tipo_sanguineo: {
        type: Sequelize.ENUM,
        values: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
        allowNull: false,
      },
      endereco_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "enderecos",
          key: "id",
          onUpdate: "CASCADE",
          onUpdate: "SET NULL",
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
    return queryInterface.dropTable("clientes");
  },
};