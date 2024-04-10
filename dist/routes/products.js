"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const productController_1 = require("../controller/productController");
const router = express_1.default.Router();
/* GET home page. */
router.post("/create_products", auth_1.auth, productController_1.createProduct);
router.get("/get_products", auth_1.auth, productController_1.getProducts);
router.get("/get_Single_Products/:id", auth_1.auth, productController_1.getSingleProduct);
// router.patch("/update_todo/:id", auth, upDateTodo);
// router.delete("/delete_todo/:id", auth, deleteTodo);
exports.default = router;
