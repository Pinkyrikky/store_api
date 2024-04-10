import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserInstance } from "../model/userModel";

const jwtsecret = process.env.JWT_SECRET as string;

export async function auth(req: Request | any, res: Response, next: NextFunction) {
  try{
    const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(400).json({
      error: "kindly sign in as a user",
    });
  }

  const token = authorization.slice(7, authorization.length); // The 'Bearer' part of the header is 6 characters long

  let verified = jwt.verify(token, jwtsecret);

  if (!verified) {
    return res
      .status(400)
      .json({ error: "invalid token, you cant't access this route" });
  }

  const { id } = verified as { [key: string]: string };
  const user = await UserInstance.findOne({ where: { id } });

  if (!user) {
    res.status(401).json({ error: "Unauthorized, kindly sign i  as a User" });
  }

  req.user= verified;
  next()

  }catch(err){
    console.log(err)
  }
}
