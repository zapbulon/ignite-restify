const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy;

module.exports = {
  "type": "postgres",
  "host": process.env.DB_HOST,
  "port": process.env.DB_PORT,
  "username": process.env.DB_USER,
  "password": process.env.DB_PASS,
  "database": process.env.DB_NAME,
  "synchronize": false,
  "logging": false,
  "entities": ["./src/models/**/*.ts"],
  "migrations": ["./src/migrations/**/*.ts"],
  "subscribers": ["./src/subscribers/**/*.ts"],
  "cli": {
    "entitiesDir": "./src/models",
    "migrationsDir": "./src/migrations",
    "subscribersDir": "./src/subscribers"
  },
  "namingStrategy": new SnakeNamingStrategy()
};