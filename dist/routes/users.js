"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
const router = express_1.default.Router();
/* post user information. */
router.post('/register', UserController_1.registerUser);
router.post('/login', UserController_1.loginUser);
exports.default = router;
