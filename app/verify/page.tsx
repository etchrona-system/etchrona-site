'use client';

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
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Etchrona /verify 模組</h1>
      <input type="file" onChange={handleFileChange} />
      <p>{status}</p>
      {hash && (
        <div>
          <h2>SHA-256 Hash:</h2>
          <code style={{ wordWrap: 'break-word' }}>{hash}</code>
        </div>
      )}
    </div>
  );
}
