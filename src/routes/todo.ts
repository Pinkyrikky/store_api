import express, { Request, Response, NextFunction } from "express";
import { createTodo, deleteTodo, getSingleTodo, getTodos, upDateTodo } from "../controller/todoController";
import { auth } from "../middlewares/auth";

const router = express.Router();

/* GET home page. */
router.post("/create_todo", auth, createTodo);
router.get("/get_todo", auth, getTodos);
router.get("/get_Single_todo/:id", auth, getSingleTodo);
router.patch("/update_todo/:id", auth, upDateTodo);
router.delete("/delete_todo/:id", auth, deleteTodo);

export default router;
