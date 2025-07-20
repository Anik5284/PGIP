'use client';

import React, { useState, ChangeEvent } from 'react';

interface DocumentInfo {
  key: string;
  label: string;
  accept: string;
}

const documentList: DocumentInfo[] = [
  { key: 'photo', label: 'Passport Size Photo', accept: 'image/jpeg, image/png' },
  { key: 'signature', label: 'Signature', accept: 'image/jpeg, image/png' },
  { key: 'aadhaar', label: 'Aadhaar Card', accept: 'application/pdf, image/*' },
  { key: 'pan', label: 'PAN Card', accept: 'application/pdf, image/*' },
  { key: 'passport', label: 'Passport', accept: 'application/pdf, image/*' },
  { key: 'voterId', label: 'Voter ID Card', accept: 'application/pdf, image/*' },
  { key: 'drivingLicense', label: 'Driving License', accept: 'application/pdf, image/*' },
  { key: 'tenthMarksheet', label: '10th Marksheet', accept: 'application/pdf' },
  { key: 'tenthCertificate', label: '10th Certificate', accept: 'application/pdf' },
  { key: 'twelfthMarksheet', label: '12th Marksheet', accept: 'application/pdf' },
  { key: 'twelfthCertificate', label: '12th Certificate', accept: 'application/pdf' },
  { key: 'gradMarksheet', label: 'Graduation Marksheet', accept: 'application/pdf' },
  { key: 'gradCertificate', label: 'Graduation Certificate', accept: 'application/pdf' },
  { key: 'sc_st_obc', label: 'SC/ST/OBC Certificate', accept: 'application/pdf, image/*' },
  { key: 'disabilityCertificate', label: 'Disability Certificate', accept: 'application/pdf, image/*' },
];

type UploadedFilesState = Record<string, File | null>;

const DocumentUploadPage: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesState>({});

  const handleFileChange = (key: string, event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setUploadedFiles(prev => ({ ...prev, [key]: file }));
    }
  };

  const handleDownload = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRemove = (key: string) => {
    setUploadedFiles(prev => ({ ...prev, [key]: null }));
    const input = document.getElementById(key) as HTMLInputElement;
    if (input) input.value = '';
  };

  const renderFilePreview = (file: File) => {
    const fileType = file.type.split('/')[0];
    if (fileType === 'image') {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="mt-2 h-24 w-auto rounded-md object-contain border"
        />
      );
    }
    return <p className="mt-2 text-sm text-gray-500">{file.name}</p>;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Document Upload Center 📂
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Please upload your documents below. All files are handled in your browser and are not sent to any server.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {documentList.map(({ key, label, accept }) => {
            const file = uploadedFiles[key];
            return (
              <div key={key} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
                <h3 className="font-semibold text-gray-800">{label}</h3>

                {!file ? (
                  <div className="mt-4">
                    <label htmlFor={key} className="cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                      <span>Upload File</span>
                      <input
                        id={key}
                        name={key}
                        type="file"
                        className="sr-only"
                        accept={accept}
                        onChange={(e) => handleFileChange(key, e)}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="mt-4">
                    <div className="flex items-start justify-between">
                      <div className="w-full truncate pr-2">
                        <p className="text-sm font-medium text-green-700">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(key)}
                        className="text-red-500 hover:text-red-700 font-bold text-xl"
                        title="Remove file"
                      >
                        &times;
                      </button>
                    </div>

                    {renderFilePreview(file)}

                    <button
                      onClick={() => handleDownload(file)}
                      className="mt-4 w-full rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-600"
                    >
                      Download
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadPage;
