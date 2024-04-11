"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductInstance = void 0;
const databaseConfig_1 = __importDefault(require("../config/databaseConfig"));
const sequelize_1 = require("sequelize");
class ProductInstance extends sequelize_1.Model {
}
exports.ProductInstance = ProductInstance;
ProductInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    productName: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING, // Assuming you'll store the image URL as a string
        allowNull: true, // Allow null initially until image is uploaded
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
    }
}, { sequelize: databaseConfig_1.default, tableName: "products" });
