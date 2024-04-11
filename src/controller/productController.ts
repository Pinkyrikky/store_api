import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { CreateProductSchema, UpdateProductSchema, option } from "../utils/utils";
import { ProductInstance } from "../model/productModel";

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
        msg: "Products succesffully fetched",
        count: getAllProducts.count,
        product: getAllProducts.rows,
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
          error: "cannot find Product"
        })
      }
  
      return res.status(200).json({
        msg: 'The Product has been found',
        product:getOneProduct,
      })
    }catch (error) {
      console.log(error);
    }
  }

  export const upDateProduct = async (req: Request, res: Response) => {
    try {
      //Extract parameter from the req.body
  
      const {productName, description, price } = req.body;
  
      const { id } = req.params;
  
      //VALIDATE WITH JOI
      const validateResult = UpdateProductSchema.validate(req.body, option);
  
      if (validateResult.error) {
        res.status(400).json({ Error: validateResult.error.details[0].message });
      }
  
      const upDateProduct = await ProductInstance.findOne({ where: { id: id } });
  
      if(!upDateProduct){
        return res.status(400).json({
          error: "cannot find product"
        })
      }
  
      const updateRecord = await  upDateProduct.update({productName, description,price});
      return res.status(200).json({
        msg:"product has been updated successfully",
        upDateProduct
      })
    } catch (error) {
      console.log(error);
    }
  };
  
  
  export const deleteProduct = async(req:Request,res:Response)=>{
    try{
      const {id} = req.params;
  
      const record = await ProductInstance.findOne({where:{id: id}})
      if (!record) {
        return res.status(400).json({
          error:'The provided ID does not exist.'
        })
      }
      const deleteRecord = await record.destroy();
      res.status(200).json({
        message : 'Deleted Successfully',
        deleteRecord
      })
      
      // const foundItem=await TodoInstance.destroy({where:{id}});
    
     
    }catch (error) {
      console.log(error);
    }
  }
  