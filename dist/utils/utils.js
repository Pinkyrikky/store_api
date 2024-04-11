"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTodoSchema = exports.CreateTodoSchema = exports.UpdateProductSchema = exports.CreateProductSchema = exports.option = exports.loginSchema = exports.RegisterSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.RegisterSchema = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string().required().trim().email(),
    phoneNumber: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    password: joi_1.default.string().required().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirm_Password: joi_1.default.string().valid(joi_1.default.ref('password')).required().label("confirm password").messages({ "any.only": "{{#label}} does not match" }), //
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().required().trim().email(),
    password: joi_1.default.string().required().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});
exports.option = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
};
exports.CreateProductSchema = joi_1.default.object({
    productName: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
});
exports.UpdateProductSchema = joi_1.default.object({
    productName: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
});
exports.CreateTodoSchema = joi_1.default.object({
    description: joi_1.default.string().required(),
    completed: joi_1.default.boolean().required(),
});
exports.UpdateTodoSchema = joi_1.default.object({
    description: joi_1.default.string().required(),
    completed: joi_1.default.boolean().required(),
});
