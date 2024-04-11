import express, { Request, Response, NextFunction } from "express";
import { auth } from "../middlewares/auth";
import { createProduct, deleteProduct, getProducts, getSingleProduct, upDateProduct } from "../controller/productController";

const router = express.Router();

/* GET home page. */
router.post("/create_products", auth, createProduct);
router.get("/get_products", auth, getProducts);
router.get("/get_Single_Products/:id", auth, getSingleProduct);
router.patch("/update_Product/:id", auth, upDateProduct);
router.delete("/delete_Product/:id", auth, deleteProduct);

export default router;
