import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/documents/");
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `${file.fieldname}-${uuidv4()}${ext}`);
//   }
// });

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "application/pdf"];
  allowed.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Invalid file type"), false);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

export const uploadSingle = (field) => upload.single(field);

export const handleUploadError = (err, req, res, next) => {
  if (err) return res.status(400).json({ message: err.message });
  next();
};
