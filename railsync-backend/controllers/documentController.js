import Document from "../models/Document.js";
import Application from "../models/Application.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";
import logger from "../utils/logger.js";
import Notification from "../models/Notification.js";

// Upload document
export const uploadDocuments = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const { applicationId } = req.params;
    const userId = req.user._id;

    const typeMap = {
      idProof: "id_proof",
      addressProof: "address_proof",
      bonafideCertificate: "bonafide_certificate",
    };

    const uploadedDocs = [];

    for (const field in req.files) {
      const file = req.files[field][0];
      const documentType = typeMap[field];

      const cloudinaryResult = await uploadToCloudinary(
        file.buffer,
        "railsync-documents"
      );

      const document = await Document.create({
        student: userId,
        application: applicationId,
        documentType,
        fileName: cloudinaryResult.original_filename,
        originalName: file.originalname,
        fileUrl: cloudinaryResult.secure_url,
        publicId: cloudinaryResult.public_id,
        mimeType: file.mimetype,
        size: file.size,
      });

      uploadedDocs.push(document);

      await Application.findByIdAndUpdate(applicationId, {
        $set: {
          [`documents.${documentType}`]: {
            url: cloudinaryResult.secure_url,
            publicId: cloudinaryResult.public_id,
            verified: false,
          },
        },
      });
    }

    res.status(201).json({
      message: "Documents uploaded successfully",
      documents: uploadedDocs,
    });
  } catch (error) {
    console.error(error);
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
