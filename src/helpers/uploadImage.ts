import {v2 as cloudinary} from "cloudinary";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import UserRequest from "../types/UserRequest"
import multer from "multer";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  const storage = new CloudinaryStorage({
      // Options directly passed to `uploader.upload`
  cloudinary :cloudinary,
  params: async (
    req: UserRequest,
    res:Response,
    file: Express.Multer.File
  )=>{
    return {
        folder: "image_uploads",
    }
  }
    })

    export const upload = multer({storage:storage});