import db from "../config/databaseConfig";
import { DataType, DataTypes, Model } from "sequelize";
import { TodoInstance } from "./todoModel";
import { ProductInstance } from "./productModel";

export interface DataAtrributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  address:string;
  password: string;
}

export class UserInstance extends Model<DataAtrributes> {}

UserInstance.init({
  id: {
    type: DataTypes.UUIDV4,
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
    type: DataTypes.INTEGER,
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
  {sequelize: db, tableName: "user"}
);

UserInstance.hasMany(ProductInstance, {foreignKey: "userId", as : "products"})
TodoInstance.belongsTo(UserInstance, {foreignKey: "userId", as : "user"});
ProductInstance.belongsTo(UserInstance, {foreignKey: "userId", as : "user"});
