import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUpload, FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import API from "../../services/api";
 // your axios instance

const UploadDocuments = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const [documents, setDocuments] = useState({
    idProof: null,
    addressProof: null,
    previousPass: null,
  });

  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setDocuments((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!documents.idProof || !documents.addressProof || !documents.previousPass) {
      toast.error("Please upload all required documents");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("idProof", documents.idProof);
      formData.append("addressProof", documents.addressProof);
      formData.append("previousPass", documents.previousPass);

      await API.post(
        `/documents/upload/${applicationId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Documents uploaded successfully!");
      navigate("/student/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Document upload failed");
    } finally {
      setLoading(false);
    }
  };

  const docList = [
    {
      key: "idProof",
      label: "ID Proof",
      desc: "College ID / Aadhar Card",
    },
    {
      key: "addressProof",
      label: "Address Proof",
      desc: "Aadhar Card / Utility Bill",
    },
    {
      key: "Previous Pass",
      label: "Previous Pass",
      desc: "Issued by Railway Department",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="railway-card">
          <h2 className="text-2xl font-bold mb-2 flex items-center">
            <FaUpload className="mr-3 text-railway-blue" />
            Upload Documents
          </h2>

          <p className="text-gray-600 mb-6">
            Application ID: <span className="font-medium">{applicationId}</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {docList.map((doc) => (
              <div key={doc.key} className="border rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <div>
                    <div className="font-medium">{doc.label}</div>
                    <div className="text-sm text-gray-500">{doc.desc}</div>
                  </div>

                  {documents[doc.key] && (
                    <FaCheckCircle className="text-green-600 text-xl" />
                  )}
                </div>

                <input
                  type="file"
                  name={doc.key}
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-600"
                />
              </div>
            ))}

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="railway-btn-primary"
              >
                {loading ? "Uploading..." : "Submit Documents"}
              </button>
            </div>
          </form>
        </div>

        <div className="railway-card mt-6 bg-blue-50 border-blue-200">
          <h4 className="font-bold text-blue-800 mb-2">Important Notes</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Documents must be clear and readable</li>
            <li>• PDF/JPG/PNG formats only</li>
            <li>• Max size per file: 2MB</li>
            <li>• Incorrect documents may lead to rejection</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;
