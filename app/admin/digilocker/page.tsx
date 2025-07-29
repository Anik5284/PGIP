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

export default function AdminDocumentViewer() {
  const [documents, setDocuments] = useState<DocumentEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/admin/digitallocker");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch documents");

        // Transform the API response to flat DocumentEntry[]
        // Assuming each locker is { userId, documents: { [key]: { name, url, uploadedAt } } }
        const allDocs: DocumentEntry[] = [];
        (data.lockers || []).forEach((locker: any) => {
          Object.entries(locker.documents || {}).forEach(([docType, docMeta]: any) => {
            if (docMeta) {
              allDocs.push({
                _id: locker._id + "_" + docType,
                userId: locker.userId,
                documentType: docType,
                fileUrl: docMeta.url || "",
                uploadedAt: docMeta.uploadedAt || locker.updatedAt || locker.createdAt || "",
              });
            }
          });
        });

        setDocuments(allDocs);
      } catch (err: any) {
        setError(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
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
                        className="w-full h-40 object-contain border roundedmb-2"
                      /> 
                    ) : (
                      <p className="text-sm text-blue-600 truncate">{doc.fileUrl}</p>
                    )}

                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={doc.fileUrl.split("/").pop() || "document"}
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
