"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    storage: 'localhost',
    dialect: "postgres",
    logging: false
});
exports.default = db;
