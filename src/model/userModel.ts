import db from "../config/databaseConfig";
import { DataType, DataTypes, Model } from "sequelize";
import { TodoInstance } from "./todoModel";
import { ProductInstance } from "./productModel";

export interface DataAtrributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address:string;
  password: string;
}

export class UserInstance extends Model<DataAtrributes> {}

UserInstance.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  address:{
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
},
  {sequelize: db, tableName: "users"}
);

UserInstance.hasMany(ProductInstance, {foreignKey: "userId", as : "products"})
TodoInstance.belongsTo(UserInstance, {foreignKey: "userId", as : "users"});
ProductInstance.belongsTo(UserInstance, {foreignKey: "userId", as : "users"});
