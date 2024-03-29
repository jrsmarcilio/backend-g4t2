require("dotenv/config");

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
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  };
} else {
  module.exports = {
    dialect: "postgres",
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
    sslmode: "required",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  };
}
