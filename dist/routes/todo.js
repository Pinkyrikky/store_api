"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controller/todoController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
/* GET home page. */
router.post("/create_todo", auth_1.auth, todoController_1.createTodo);
router.get("/get_todo", auth_1.auth, todoController_1.getTodos);
router.get("/get_Single_todo/:id", auth_1.auth, todoController_1.getSingleTodo);
router.patch("/update_todo/:id", auth_1.auth, todoController_1.upDateTodo);
router.delete("/delete_todo/:id", auth_1.auth, todoController_1.deleteTodo);
exports.default = router;
