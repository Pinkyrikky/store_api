"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.upDateProduct = exports.getSingleProduct = exports.getProducts = exports.createProduct = void 0;
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const productModel_1 = require("../model/productModel");
const createProduct = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const verified = req.user;
            const iduuid = (0, uuid_1.v4)();
            //validation with joi
            const validateResult = utils_1.CreateProductSchema.validate(req.body, utils_1.option);
            if (validateResult.error) {
                res.status(400).json({ Error: validateResult.error.details[0].message });
            }
            const productRecord = yield productModel_1.ProductInstance.create(Object.assign(Object.assign({ id: iduuid }, req.body), { userId: verified.id }));
            return res.status(201).json({
                msg: "Product successfully added",
                productRecord,
            });
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = req.query.limit;
        const offset = req.query.offset;
        const getAllProducts = yield productModel_1.ProductInstance.findAndCountAll({
            limit: limit,
            offset: offset,
        });
        return res.status(200).json({
            msg: "Products succesffully fetched",
            count: getAllProducts.count,
            product: getAllProducts.rows,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getProducts = getProducts;
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const getOneProduct = yield productModel_1.ProductInstance.findOne({ where: { id: id } });
        if (!getOneProduct) {
            return res.status(400).json({
                error: "cannot find Product"
            });
        }
        return res.status(200).json({
            msg: 'The Product has been found',
            product: getOneProduct,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getSingleProduct = getSingleProduct;
const upDateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Extract parameter from the req.body
        const { productName, description, price } = req.body;
        const { id } = req.params;
        //VALIDATE WITH JOI
        const validateResult = utils_1.UpdateProductSchema.validate(req.body, utils_1.option);
        if (validateResult.error) {
            res.status(400).json({ Error: validateResult.error.details[0].message });
        }
        const upDateProduct = yield productModel_1.ProductInstance.findOne({ where: { id: id } });
        if (!upDateProduct) {
            return res.status(400).json({
                error: "cannot find product"
            });
        }
        const updateRecord = yield upDateProduct.update({ productName, description, price });
        return res.status(200).json({
            msg: "product has been updated successfully",
            upDateProduct
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.upDateProduct = upDateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const record = yield productModel_1.ProductInstance.findOne({ where: { id: id } });
        if (!record) {
            return res.status(400).json({
                error: 'The provided ID does not exist.'
            });
        }
        const deleteRecord = yield record.destroy();
        res.status(200).json({
            message: 'Deleted Successfully',
            deleteRecord
        });
        // const foundItem=await TodoInstance.destroy({where:{id}});
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteProduct = deleteProduct;
