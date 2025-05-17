import { useState } from 'react';

export default function Verify() {
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState('');
  const [status, setStatus] = useState('');

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setStatus('Calculating hash...');

    const arrayBuffer = await selectedFile.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

    setHash(hashHex);
    setStatus('Hash generated successfully.');

    // Store the record locally (can be adapted to API or DB call)
    const log = {
      filename: selectedFile.name,
      size: selectedFile.size,
      type: selectedFile.type,
      hash: hashHex,
      timestamp: new Date().toISOString(),
    };

    console.log('Log entry:', log);
    // You may replace this with a POST call to backend or S3
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Etchrona /verify 模組</h1>
      <p className="mb-4">上傳圖片以產生 SHA-256 hash 並建立語義紀錄。</p>
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
      {status && <p className="text-sm text-green-600">{status}</p>}
      {hash && (
        <div className="mt-4">
          <h2 className="font-semibold">Hash:</h2>
          <p className="break-all text-sm bg-gray-100 p-2 rounded">{hash}</p>
        </div>
      )}
    </div>
  );
}
