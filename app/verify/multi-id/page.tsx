'use client';

import { useState } from 'react';

export default function VerifyMulti() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [hashes, setHashes] = useState<string[]>([]);
  const [status, setStatus] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected || selected.length === 0) return;

    setFiles(selected);
    setStatus('Calculating hashes...');

    const hashList: string[] = [];

    for (const file of Array.from(selected)) {
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      hashList.push(hashHex);
    }

    setHashes(hashList);
    setStatus('Ready');
  };

  const handleSubmit = async () => {
    if (!files || hashes.length !== files.length) return;
    setStatus('Uploading...');

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const hash = hashes[i];

      const payload = {
        source: 'user',
        type: 'image/multi',
        filename: file.name,
        hash: hash,
        translated_log: 'Multiple variation image upload',
      };

      await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    setStatus('Complete');
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Image Set</h1>
      <p className="text-sm text-gray-500 mb-4">Upload multiple images of the same character (e.g., different angles, colors, or frames).</p>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      <ul className="mb-4 text-sm text-gray-600">
        {Array.from(files || []).map((file, idx) => (
          <li key={idx}>✓ {file.name}</li>
        ))}
      </ul>
      {status && <p className="mb-4 text-sm">{status}</p>}
      <button
        onClick={handleSubmit}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
      >
        Continue
      </button>
    </main>
  );
}
