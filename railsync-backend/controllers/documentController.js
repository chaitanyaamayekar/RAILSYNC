import Document from "../models/Document.js";
import Application from "../models/Application.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";
import logger from "../utils/logger.js";
import Notification from "../models/Notification.js";

// Upload document
export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { documentType, applicationId } = req.body;
    const userId = req.user._id;

    const validTypes = [
      "id_proof",
      "address_proof",
      "bonafide_certificate",
      "photo",
      "other"
    ];

    if (!validTypes.includes(documentType)) {
      return res.status(400).json({ message: "Invalid document type" });
    }

    const cloudinaryResult = await uploadToCloudinary(
      req.file.buffer,
      "railsync-documents"
    );

    const document = await Document.create({
      student: userId,
      application: applicationId,
      documentType,
      fileName: cloudinaryResult.original_filename,
      originalName: req.file.originalname,
      fileUrl: cloudinaryResult.secure_url,
      publicId: cloudinaryResult.public_id,
      mimeType: req.file.mimetype,
      size: req.file.size
    });

    if (applicationId) {
      const application = await Application.findById(applicationId);
      if (application) {
        application.documents[documentType] = {
          url: cloudinaryResult.secure_url,
          publicId: cloudinaryResult.public_id,
          verified: false
        };
        await application.save();
      }
    }

    logger.applicationLog("DOCUMENT_UPLOAD", applicationId, userId, {
      documentType
    });

    res.status(201).json({ document });
  } catch (error) {
    logger.errorLog(error, req);
    res.status(500).json({ message: "Document upload failed" });
  }
};

// Get document
export const getDocument = async (req, res) => {
  const document = await Document.findById(req.params.id);
  if (!document) return res.status(404).json({ message: "Not found" });
  res.json(document);
};

// Delete document
export const deleteDocument = async (req, res) => {
  const document = await Document.findById(req.params.id);
  if (!document) return res.status(404).json({ message: "Not found" });

  await deleteFromCloudinary(document.publicId);
  await Document.findByIdAndDelete(req.params.id);

  res.json({ message: "Document deleted" });
};

// Get documents by application
export const getDocumentsByApplication = async (req, res) => {
  const docs = await Document.find({ application: req.params.applicationId });
  res.json(docs);
};

// Get documents by student (Admin)
export const getDocumentsByStudent = async (req, res) => {
  const docs = await Document.find({ student: req.params.studentId });
  res.json(docs);
};

// Verify document
export const updateDocumentVerification = async (req, res) => {
  const document = await Document.findById(req.params.id);
  if (!document) return res.status(404).json({ message: "Not found" });

  document.verificationStatus = req.body.verificationStatus;
  await document.save();

  await Notification.create({
    recipient: document.student,
    title: "Document Verification Updated",
    message: `Document ${req.body.verificationStatus}`
  });

  res.json(document);
};

// Pending documents
export const getPendingDocuments = async (req, res) => {
  const docs = await Document.find({ verificationStatus: "pending" });
  res.json(docs);
};
