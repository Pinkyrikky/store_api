import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { CreateProductSchema, option } from "../utils/utils";
import { ProductInstance } from "../model/productModel";
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'pinkyrikky',
  api_key: '685231324552174',
  api_secret: '685231324552174'
});

// Function to upload an image
async function uploadImage(file: string) {
  try {
    const result = await cloudinary.uploader.upload(file);
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

uploadImage('./')
  .then(result => {
    console.log('Image uploaded successfully:', result.url);
  })
  .catch(error => {
    console.error('Error uploading image:', error);
  });

export async function uploadImageAndSaveToDatabase(file: Express.Multer.File, productId: string) {
    try {
      const result = await cloudinary.uploader.upload(file.path); // Upload image to Cloudinary
      const imageUrl = result.secure_url; // Get the secure URL of the uploaded image
      await ProductInstance.update({ imageUrl }, { where: { id: productId } }); // Update imageUrl attribute in database
      return imageUrl; // Return the image URL
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw error;
    }
  }

export const createProduct = async function (req: Request | any, res: Response) {
    try {
      const verified = req.user;
      const iduuid = uuidv4();
  
      //validation with joi
      const validateResult = CreateProductSchema.validate(req.body, option);
  
      if (validateResult.error) {
        res.status(400).json({ Error: validateResult.error.details[0].message });
      }
  
      const productRecord = await ProductInstance.create({
        id: iduuid,
        ...req.body,
        userId: verified.id,
      });
      return res.status(201).json({
        msg: "Product successfully added",
        productRecord,
      });
    } catch (error) {
      console.log(error);
    }
  };

  export const getProducts = async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit as number | undefined;
      const offset = req.query.offset as number | undefined;
  
      const getAllProducts = await ProductInstance.findAndCountAll({
        limit: limit,
        offset: offset,
      });
      return res.status(200).json({
        msg: "Todos succesffully fetched",
        count: getAllProducts.count,
        todo: getAllProducts.rows,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getSingleProduct = async (req: Request, res: Response) => {
    try{
      const {id} = req.params;
      const getOneProduct = await ProductInstance.findOne({where:{id:id}});
  
      if(!getOneProduct){
        return res.status(400).json({
          error: "cannot find todo"
        })
      }
  
      return res.status(200).json({
        msg: 'The todo has been found',
        product:getOneProduct,
      })
    }catch (error) {
      console.log(error);
    }
  }