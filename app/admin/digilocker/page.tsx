"use client";

import React, { useEffect, useState } from "react";

//=========== TYPE DEFINITION ===========//
interface DocumentEntry {
  _id: string;
  userId: string;
  documentType: string;
  fileUrl: string;
  uploadedAt: string;
}

//=========== REUSABLE COMPONENTS ===========//

/**
 * A reusable, accessible Icon component
 */
const Icon = ({ path, className = "" }: { path: string; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
    className={`w-5 h-5 shrink-0 ${className}`}
  >
    <path fillRule="evenodd" d={path} clipRule="evenodd" />
  </svg>
);

/**
 * A skeleton loader component for a better loading experience
 */
const SkeletonCard = () => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 animate-pulse">
    <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-slate-200 rounded w-1/2 mb-3"></div>
    <div className="w-full h-40 bg-slate-200 rounded mb-3"></div>
    <div className="h-10 bg-slate-200 rounded"></div>
  </div>
);

//=========== CONSTANTS ===========//

/**
 * Predefined document types and their display labels
 */
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


//=========== MAIN PAGE COMPONENT ===========//

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

        const allDocs: DocumentEntry[] = (data.lockers || []).flatMap((locker: any) =>
          Object.entries(locker.documents || {}).map(([docType, docMeta]: any) => ({
            _id: `${locker._id}_${docType}`,
            userId: locker.userId,
            documentType: docType,
            fileUrl: docMeta?.url || "",
            uploadedAt: docMeta?.uploadedAt || locker.updatedAt || new Date().toISOString(),
          }))
        );
        setDocuments(allDocs);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  // Group documents by type for sectioned display
  const groupedDocuments = documents.reduce((acc, doc) => {
    (acc[doc.documentType] = acc[doc.documentType] || []).push(doc);
    return acc;
  }, {} as Record<string, DocumentEntry[]>);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-20 px-6 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800">An Error Occurred</h3>
          <p className="text-red-700 mt-1">{error}</p>
        </div>
      );
    }
    
    return Object.keys(documentOrder).map((typeKey) => {
      const docsInSection = groupedDocuments[typeKey] || [];
      return (
        <section key={typeKey} className="mb-12">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 pb-3 border-b border-slate-200">
            {documentOrder[typeKey]}
          </h2>
          {docsInSection.length === 0 ? (
            <div className="text-center py-8 px-4 bg-white border-2 border-dashed border-slate-300 rounded-lg">
              <p className="text-slate-500 text-sm">No documents of this type have been uploaded.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {docsInSection.map((doc) => (
                <div key={doc._id} className="bg-white rounded-lg shadow-md border border-slate-200 flex flex-col overflow-hidden">
                  <div className="p-4 border-b border-slate-100">
                    <p className="text-sm font-medium text-slate-700 truncate">
                      User: <span className="font-mono text-slate-900">{doc.userId}</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(doc.uploadedAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="p-4 flex-grow flex items-center justify-center bg-slate-50">
                    {doc.fileUrl.match(/\.(jpg|jpeg|png|webp)$/i) ? (
                      <img src={doc.fileUrl} alt={doc.documentType} className="max-w-full max-h-48 object-contain"/>
                    ) : (
                      <div className="text-center text-slate-400 p-4">
                        <Icon path="M9 12h6m-6 4h6m2 5H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z" className="mx-auto h-12 w-12"/>
                        <p className="text-xs mt-2">Cannot preview file</p>
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-slate-50/50 border-t border-slate-200">
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 py-2 px-3 rounded-md transition-colors"
                    >
                      <Icon path="M4 12a1 1 0 011-1h6a1 1 0 110 2H5a1 1 0 01-1-1zm5-6a1 1 0 00-1 1v6a1 1 0 102 0V7a1 1 0 00-1-1z M15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"/>
                      View / Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      );
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 sm:px-6 lg:px-8 py-10 font-sans">
      <header className="max-w-7xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Digital Locker Documents
        </h1>
        <p className="mt-1 text-md text-slate-600">
          Browse and verify all documents uploaded by users, organized by type.
        </p>
      </header>
      <main className="max-w-7xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
}