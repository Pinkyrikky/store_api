import express, {Request, Response, NextFunction} from 'express';
import { RegisterSchema, loginSchema, option } from '../utils/utils';
import { UserInstance } from '../model/userModel';
import {v4 as uuidv4} from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const jwtsecret = process.env.JWT_SECRET as string;


export const registerUser = async function(req:Request, res:Response, next:NextFunction) {
    const {firstName, lastName, email, phoneNumber,address, password, confirm_Password}= req.body;

    const iduuid= uuidv4();

    //validation with joi

    const validateResult = RegisterSchema.validate(req.body, option);
   try{
    if(validateResult.error){
        res.status(400).json({Error: validateResult.error.details[0].message})
    }
    // console.log(validateResult);

        //hashpassword
        const passwordHash = await bcrypt.hash(password, await bcrypt.genSalt(12));

        //check if user exists
        const user= await UserInstance.findOne( {where:{email: email}});
        if(!user){
            const newUser = await UserInstance.create({
                id: iduuid,
                firstName, 
                lastName,  
                email,  
                phoneNumber, 
                address,
                password: passwordHash
            });
            res.status(201).json({message: "Registration  Successful!", data: newUser});
        }

    res.status(400).json("Email is already in use");
    
}catch (err) {
    console.log(err);
    }
}

export const loginUser = async function(req:Request, res:Response) {
    const {email, phoneNumber, password}= req.body;
    const iduuid= uuidv4();

    const validateResult =loginSchema.validate(req.body, option);


    try{
        if(validateResult.error){
            res.status(400).json({Error: validateResult.error.details[0].message})
        }

        //get user info before generating token
        const User = await UserInstance.findOne({
            where:{email:email}
        }) as unknown as {[key: string]: string}

        const {id}= User;
        const token = jwt.sign({id}, jwtsecret, {expiresIn: "30d"})


        //compare password with the one in database
        const validateUser = await bcrypt .compare(password, User.password)
        
        if(validateUser) {
            res.status(200).json({
                message:"Login successful!",
                User,
                token
            })
        }

        res.status(401).json({error: 'Invalid email or password'});

    }catch(err){
        console.log(err)
    }
}

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