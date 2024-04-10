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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const utils_1 = require("../utils/utils");
const userModel_1 = require("../model/userModel");
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtsecret = process.env.JWT_SECRET;
const registerUser = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { firstName, lastName, email, phoneNumber, address, password, confirm_Password } = req.body;
        const iduuid = (0, uuid_1.v4)();
        //validation with joi
        const validateResult = utils_1.RegisterSchema.validate(req.body, utils_1.option);
        try {
            if (validateResult.error) {
                res.status(400).json({ Error: validateResult.error.details[0].message });
            }
            // console.log(validateResult);
            //hashpassword
            const passwordHash = yield bcryptjs_1.default.hash(password, yield bcryptjs_1.default.genSalt(12));
            //check if user exists
            const user = yield userModel_1.UserInstance.findOne({ where: { email: email } });
            if (!user) {
                const newUser = yield userModel_1.UserInstance.create({
                    id: iduuid,
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    address,
                    password: passwordHash
                });
                res.status(201).json({ message: "Registration  Successful!", data: newUser });
            }
            res.status(400).json("Email is already in use");
        }
        catch (err) {
            console.log(err);
        }
    });
};
exports.registerUser = registerUser;
const loginUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, phoneNumber, password } = req.body;
        const iduuid = (0, uuid_1.v4)();
        const validateResult = utils_1.loginSchema.validate(req.body, utils_1.option);
        try {
            if (validateResult.error) {
                res.status(400).json({ Error: validateResult.error.details[0].message });
            }
            //get user info before generating token
            const User = yield userModel_1.UserInstance.findOne({
                where: { email: email }
            });
            const { id } = User;
            const token = jsonwebtoken_1.default.sign({ id }, jwtsecret, { expiresIn: "30d" });
            //compare password with the one in database
            const validateUser = yield bcryptjs_1.default.compare(password, User.password);
            if (validateUser) {
                res.status(200).json({
                    message: "Login successful!",
                    User,
                    token
                });
            }
            res.status(401).json({ error: 'Invalid email or password' });
        }
        catch (err) {
            console.log(err);
        }
    });
};
exports.loginUser = loginUser;
//=======================for EJs===============================
// const jwtsecret = process.env.JWT_SECRET as string;
// export const registerUser = async function(req:Request, res:Response, next:NextFunction) {
//     const {firstName, lastName, email, phoneNumber, password, confirm_Password}= req.body;
//     const iduuid= uuidv4();
//     //validation with joi
//     const validateResult = RegisterSchema.validate(req.body, option);
//    try{
//     if(validateResult.error){
//       return  res.render("register", {error: validateResult.error.details[0].message})
//     }
//     // console.log(validateResult);
//         //hashpassword
//         const passwordHash = await bcrypt.hash(password, await bcrypt.genSalt(12));
//         //check if user exists
//         const user= await UserInstance.findOne( {where:{email: email}});
//         if(!user){
//             const newUser = await UserInstance.create({
//                 id: iduuid,
//                 firstName, 
//                 lastName,  
//                 email,  
//                 phoneNumber, 
//                 password: passwordHash
//             });
//             return res.redirect('/login');
//         }
//    return res.render("Register", {error:"Email is already in use"});
// }catch (err) {
//     console.log(err);
//     }
// }
// export const loginUser = async function(req:Request, res:Response) {
//     const {email, phoneNumber, password}= req.body;
//     const iduuid= uuidv4();
//     const validateResult =loginSchema.validate(req.body, option);
//     try{
//         if(validateResult.error){
//           return  res.render("login", {error: validateResult.error.details[0].message} )
//         }
//         //get user info before generating token
//         const User = await UserInstance.findOne({
//             where:{email:email}
//         }) as unknown as {[key: string]: string}
//         const {id}= User;
//         const token = jwt.sign({id}, jwtsecret, {expiresIn: "30d"})
//         //compare password with the one in database
//         const validateUser = await bcrypt .compare(password, User.password)
//         if(validateUser) {
//             res.redirect("/")
//         }
//        return res.render("login", {error: "Invalid email or password"})
//     }catch(err){
//         console.log(err)
//     }
// }
