import express, { Request, Response, NextFunction } from "express";


import { auth } from "../middlewares/auth";
import { createProduct, getProducts, getSingleProduct } from "../controller/productController";

const router = express.Router();

/* GET home page. */
router.post("/create_products", auth, createProduct);
router.get("/get_products", auth, getProducts);
router.get("/get_Single_Products/:id", auth, getSingleProduct);
// router.patch("/update_todo/:id", auth, upDateTodo);
// router.delete("/delete_todo/:id", auth, deleteTodo);

export default router;
