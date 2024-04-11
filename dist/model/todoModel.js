"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoInstance = void 0;
const databaseConfig_1 = __importDefault(require("../config/databaseConfig"));
const sequelize_1 = require("sequelize");
class TodoInstance extends sequelize_1.Model {
}
exports.TodoInstance = TodoInstance;
TodoInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    completed: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
    },
}, { sequelize: databaseConfig_1.default, tableName: "todo" });
