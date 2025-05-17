'use client'

import { useState } from 'react';

export default function Verify() {
  const [file, setFile] = useState<File | null>(null);
  const [hash, setHash] = useState('');
  const [status, setStatus] = useState('');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setStatus('Calculating hash...');

    const arrayBuffer = await selectedFile.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    setHash(hashHex);
    setStatus('Hash generated successfully.');

    // 發送 POST 請求，寫入 log/verify.json
    await fetch('/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        source: 'etchrona-system',
        type: 'image/placeholder',
        filename: selectedFile.name,
        hash: hashHex,
        translated_log: 'New file hash recorded from /verify.',
        timestamp: new Date().toISOString(),
        version: 'v0.2.1'
      })
    });
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Etchrona /verify Module</h1>
      <p>Please upload an image file to generate a SHA-256 hash.</p>
      <input type="file" onChange={handleFileChange} />

      <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{status}</p>
      {hash && (
        <p>
          ✅ Generated hash: <code>{hash}</code>
        </p>
      )}
    </div>
  );
}
