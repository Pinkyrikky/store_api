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
exports.getSingleProduct = exports.getProducts = exports.createProduct = exports.uploadImageAndSaveToDatabase = void 0;
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const productModel_1 = require("../model/productModel");
const cloudinary_1 = require("cloudinary");
// Configure Cloudinary with your credentials
cloudinary_1.v2.config({
    cloud_name: 'pinkyrikky',
    api_key: '685231324552174',
    api_secret: '685231324552174'
});
// Function to upload an image
function uploadImage(file) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield cloudinary_1.v2.uploader.upload(file);
            console.log(result);
            return result;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
}
uploadImage('./')
    .then(result => {
    console.log('Image uploaded successfully:', result.url);
})
    .catch(error => {
    console.error('Error uploading image:', error);
});
function uploadImageAndSaveToDatabase(file, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield cloudinary_1.v2.uploader.upload(file.path); // Upload image to Cloudinary
            const imageUrl = result.secure_url; // Get the secure URL of the uploaded image
            yield productModel_1.ProductInstance.update({ imageUrl }, { where: { id: productId } }); // Update imageUrl attribute in database
            return imageUrl; // Return the image URL
        }
        catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            throw error;
        }
    });
}
exports.uploadImageAndSaveToDatabase = uploadImageAndSaveToDatabase;
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
            msg: "Todos succesffully fetched",
            count: getAllProducts.count,
            todo: getAllProducts.rows,
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
                error: "cannot find todo"
            });
        }
        return res.status(200).json({
            msg: 'The todo has been found',
            product: getOneProduct,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getSingleProduct = getSingleProduct;
