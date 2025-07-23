"use client";

import React, { useEffect, useState } from "react";

interface DocumentEntry {
  _id: string;
  userId: string;
  documentType: string;
  fileUrl: string;
  uploadedAt: string;
}

// Predefined 15 document types and labels
const documentOrder: Record<string, string> = {
  photo: "Passport Size Photo",
  signature: "Signature",
  aadhaar: "Aadhaar Card",
  pan: "PAN Card",
  passport: "Passport",
  voterId: "Voter ID Card",
  drivingLicense: "Driving License",
  tenthMarksheet: "10th Marksheet",
  tenthCertificate: "10th Certificate",
  twelfthMarksheet: "12th Marksheet",
  twelfthCertificate: "12th Certificate",
  gradMarksheet: "Graduation Marksheet",
  gradCertificate: "Graduation Certificate",
  sc_st_obc: "SC/ST/OBC Certificate",
  disabilityCertificate: "Disability Certificate",
};

// Static mock data (replace or extend with real backend data later)
const mockDocuments: DocumentEntry[] = [
  {
    _id: "1",
    userId: "user123",
    documentType: "photo",
    fileUrl: "/docs/photo.jpg",
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: "2",
    userId: "user123",
    documentType: "aadhaar",
    fileUrl: "/docs/aadhaar.pdf",
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: "3",
    userId: "user456",
    documentType: "signature",
    fileUrl: "/docs/signature.png",
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: "4",
    userId: "user123",
    documentType: "pan",
    fileUrl: "/docs/pan.pdf",
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: "5",
    userId: "user123",
    documentType: "passport",
    fileUrl: "/docs/passport.pdf",
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: "6",
    userId: "user456",
    documentType: "voterId",
    fileUrl: "/docs/voter.png",
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: "7",
    userId: "user789",
    documentType: "drivingLicense",
    fileUrl: "/docs/license.pdf",
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: "8",
    userId: "user123",
    documentType: "tenthMarksheet",
    fileUrl: "/docs/10marksheet.pdf",
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: "9",
    userId: "user123",
    documentType: "tenthCertificate",
    fileUrl: "/docs/10certificate.pdf",
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: "10",
    userId: "user123",
    documentType: "twelfthMarksheet",
    fileUrl: "/docs/12marksheet.pdf",
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: "11",
    userId: "user123",
    documentType: "twelfthCertificate",
    fileUrl: "/docs/12certificate.pdf",
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: "12",
    userId: "user123",
    documentType: "gradMarksheet",
    fileUrl: "/docs/gradmarksheet.pdf",
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: "13",
    userId: "user123",
    documentType: "gradCertificate",
    fileUrl: "/docs/gradcertificate.pdf",
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: "14",
    userId: "user789",
    documentType: "sc_st_obc",
    fileUrl: "/docs/caste.pdf",
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: "15",
    userId: "user789",
    documentType: "disabilityCertificate",
    fileUrl: "/docs/disability.pdf",
    uploadedAt: new Date().toISOString(),
  },
];

export default function AdminDocumentViewer() {
  const [documents, setDocuments] = useState<DocumentEntry[]>([]);

  useEffect(() => {
    setDocuments(mockDocuments); // Use static mock data
  }, []);

  // Group by documentType
  const grouped = documents.reduce((acc, doc) => {
    if (!acc[doc.documentType]) acc[doc.documentType] = [];
    acc[doc.documentType].push(doc);
    return acc;
  }, {} as Record<string, DocumentEntry[]>);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">📁 Admin Document Viewer</h1>

      {Object.keys(documentOrder).map((typeKey) => {
        const docs = grouped[typeKey] || [];

        return (
          <div key={typeKey} className="mb-10">
            <h2 className="text-xl font-semibold text-indigo-700 mb-4 border-b pb-1">
              {documentOrder[typeKey]}
            </h2>

            {docs.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No documents uploaded.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {docs.map((doc) => (
                  <div
                    key={doc._id}
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                  >
                    <p className="text-sm font-medium text-gray-700 mb-1">User: {doc.userId}</p>
                    <p className="text-xs text-gray-400 mb-2">
                      Uploaded: {new Date(doc.uploadedAt).toLocaleString()}
                    </p>

                    {doc.fileUrl.match(/\.(jpg|jpeg|png|webp)$/i) ? (
                      <img
                        src={doc.fileUrl}
                        alt={doc.documentType}
                        className="w-full h-40 object-contain border rounded mb-2"
                      />
                    ) : (
                      <p className="text-sm text-blue-600 truncate">{doc.fileUrl}</p>
                    )}

                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-3 text-center bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500 text-sm font-medium"
                    >
                      View / Download
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
