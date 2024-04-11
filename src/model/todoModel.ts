import db from "../config/databaseConfig";
import { DataType, DataTypes, Model } from "sequelize";

export interface DataAtrributes {
  id: string;
  description: string;
  completed: boolean;
  userId?:string
}

export class TodoInstance extends Model<DataAtrributes> {}

TodoInstance.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId:{
    type:DataTypes.UUID,
  },
},
  {sequelize: db, tableName: "todo"}
);
