import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Get the current directory for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const isProduction = process.env.NODE_ENV === "production";

const uploadPath = isProduction ? path.join('/tmp', "/uploads") : path.join(__dirname, '/uploads');

const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     if(!fs.existsSync()) {
    //         fs.mkdirSync(uploadPath, { recursive: true});
    //     }

    //     cb(null, uploadPath)
    // },
    filename: (req, file, cb) => {
        cb(null, (+new Date * Math.random()).toString(36).substring(0, 10));
    },
})

const fileFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname).toLocaleLowerCase();
    if(!(extension === ".jpg" || extension === ".jpeg" || extension === ".png")) {
        const error = {
            code: "INVALID_FILE_TYPE",
            message: "Wrong format | Please upload an image with one of the following formats: .jpg, .jpeg, or .png.",
          };
          cb(new Error(error.message));
    return;
    }

    cb(null, true);
}


const upload = multer({
    storage,
    fileFilter,
  });
  
  export default upload;