import fs from "fs";
import path from "path";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import config from "../../config";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (file: Express.Multer.File) => {
  // Configuration
  cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret,
  });

  try {
    // Upload file to cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      public_id: file.filename,
    });

    // Delete file from local upload folder
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error("Failed to delete local file: ", err);
      } else {
        console.log("Local file delete: ", file.path);
      }
    });

    return uploadResult;
  } catch (error) {
    console.log("Cloudinary Upload Failed: ", error);
    throw error;
  }
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
