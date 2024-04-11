"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const databaseConfig_1 = __importDefault(require("../config/databaseConfig"));
const sequelize_1 = require("sequelize");
const todoModel_1 = require("./todoModel");
const productModel_1 = require("./productModel");
class UserInstance extends sequelize_1.Model {
}
exports.UserInstance = UserInstance;
UserInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
}, { sequelize: databaseConfig_1.default, tableName: "users" });
UserInstance.hasMany(productModel_1.ProductInstance, { foreignKey: "userId", as: "products" });
todoModel_1.TodoInstance.belongsTo(UserInstance, { foreignKey: "userId", as: "users" });
productModel_1.ProductInstance.belongsTo(UserInstance, { foreignKey: "userId", as: "users" });
