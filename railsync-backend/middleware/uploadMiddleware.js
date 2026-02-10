import multer from "multer";

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

// ⭐ ADD THIS
export const uploadApplicationDocuments = upload.fields([
  { name: "previousPass", maxCount: 1 },
  { name: "idCard", maxCount: 1 },
  { name: "photo", maxCount: 1 }
]);

export const handleUploadError = (err, req, res, next) => {
  if (err) return res.status(400).json({ message: err.message });
  next();
};
