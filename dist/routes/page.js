"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
const router = express_1.default.Router();
// Route for rendering the registration form
router.get('/register', (req, res) => {
    res.render("register");
});
// Route for handling user registration
router.post('/register', UserController_1.registerUser);
// Route for rendering the login form
router.get('/login', (req, res) => {
    res.render("login");
});
// Route for handling user login
router.post('/login', UserController_1.loginUser);
exports.default = router;
