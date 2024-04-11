import db from "../config/databaseConfig";
import { DataTypes, Model } from "sequelize";


export interface DataAtrributes {
  id: string;
  productName:string;
  description: string;
  price:number;
  imageUrl: string; 
  userId?:string;
}

export class ProductInstance extends Model<DataAtrributes> {}

ProductInstance.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      productName: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING, // Assuming you'll store the image URL as a string
        allowNull: true, // Allow null initially until image is uploaded
      },
      userId:{
        type: DataTypes.UUID,
      }
},
{sequelize: db, tableName: "products"}
)


