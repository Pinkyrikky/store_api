import db from "../config/databaseConfig";
import { DataTypes, Model } from "sequelize";
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'pinkyrikky', 
  api_key: '685231324552174', 
  api_secret: '7v5sNWG0CpJNEAvfS1BqfBuDHis' 
});

export interface DataAtrributes {
  id: string;
  productName:string;
  description: string;
  price:string;
  imageUrl: string; 
}

export class ProductInstance extends Model<DataAtrributes> {}

ProductInstance.init({
    id: {
        type: DataTypes.UUIDV4,
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
      }
},
{sequelize: db, tableName: "products"}
)


