"use strict";require("dotenv/config");

if (process.env.NODE_ENV === "test") {
  module.exports = {
    dialect: "postgres",
    host: process.env.TEST_DATABASE_HOST,
    username: process.env.TEST_DATABASE_USER,
    password: process.env.TEST_DATABASE_PASSWORD,
    database: process.env.TEST_DATABASE,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  };
} else {
  module.exports = {
    dialect: "postgres",
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
    dialectOptions: {
      ssl: true,
    },
  };
}
