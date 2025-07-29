'use client';

import { useEffect, useState } from 'react';

interface Scheme {
  _id: string;
  message: string;
  createdAt: string;
}

export default function UserSchemesPage() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchemes = async () => {
      const res = await fetch('/api/schemes');
      const data = await res.json();
      setSchemes(data);
      setLoading(false);
    };
    fetchSchemes();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📢 Schemes</h1>

      {loading && <p>Loading...</p>}
      {schemes.length === 0 && !loading && <p>No schemes available.</p>}

      <ul className="space-y-4">
        {schemes.map((scheme) => (
          <li key={scheme._id} className="border p-4 rounded shadow">
            <p>{scheme.message}</p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(scheme.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
