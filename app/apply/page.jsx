"use client";

import { useState } from "react";

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    dob: "",
    place: "",
    qualification: "",
    state: "",
    religion: "",
    tenthMarks: "",
    twelfthMarks: "",
    graduationMarks: "",
    gender: "",
    cast: "",
    phone: "",
    email: "",
    disability: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
    "West Bengal"
  ];

  const religions = [
    "Hinduism", "Islam", "Christianity", "Sikhism", "Buddhism", "Jainism",
    "Judaism", "Atheist", "Others"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-gray-900 flex items-center justify-center p-6">
      <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 max-w-2xl w-full border border-cyan-500">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8 neon-heading">
          Application Form
        </h1>

        {submitted && (
          <div className="mb-6 text-center text-green-600 font-semibold text-lg neon-label">
            ✅ Response Submitted!
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Full Name", name: "name" },
            { label: "Father's Name", name: "fatherName" },
            { label: "Mother's Name", name: "motherName" },
            { label: "Date of Birth", name: "dob", type: "date" },
            { label: "Place", name: "place" },
            { label: "Qualification", name: "qualification" },
            { label: "10th Standard Marks (%)", name: "tenthMarks", type: "number" },
            { label: "12th Standard Marks (%)", name: "twelfthMarks", type: "number" },
            { label: "Graduation Marks (%)", name: "graduationMarks", type: "number" },
            { label: "Phone Number", name: "phone", type: "tel" },
            { label: "Email Address", name: "email", type: "email" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition duration-300"
                placeholder={`Enter ${field.label}`}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition duration-300"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Cast</label>
            <select
              name="cast"
              value={formData.cast}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition duration-300"
            >
              <option value="">Select Cast</option>
              <option value="general">General</option>
              <option value="sc">SC</option>
              <option value="st">ST</option>
              <option value="obs">OBS</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition duration-300"
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Religion</label>
            <select
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition duration-300"
            >
              <option value="">Select Religion</option>
              {religions.map((religion) => (
                <option key={religion} value={religion}>
                  {religion}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Disability</label>
            <select
              name="disability"
              value={formData.disability}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition duration-300"
            >
              <option value="">Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-black neon-button text-white font-bold py-3 rounded-xl shadow-lg transition duration-300 hover:scale-105"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
