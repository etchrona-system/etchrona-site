'use client';

import { useState } from 'react';

export default function Result() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any | null>(null);
  const [status, setStatus] = useState('');

  const checkHash = async () => {
    try {
      const res = await fetch('/log/verify.json');
      const data = await res.json();
      const match = data.find((entry: any) => entry.hash === input);
      if (match) {
        setResult(match);
        setStatus('found');
      } else {
        setResult(null);
        setStatus('not-found');
      }
    } catch (error) {
      console.error('Failed to fetch log:', error);
      setResult(null);
      setStatus('error');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Check Verification Result</h1>
      <input
        type="text"
        placeholder="Enter SHA-256 hash"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button onClick={checkHash}>Check</button>

      {status === 'found' && result && (
        <div style={{ marginTop: '1rem', color: 'green' }}>
          <p>✅ This hash exists in the log.</p>
          <ul>
            <li><strong>Filename:</strong> {result.filename}</li>
            <li><strong>Hash:</strong> {result.hash}</li>
            <li><strong>Timestamp:</strong> {result.timestamp}</li>
            <li><strong>Description:</strong> {result.translated_log}</li>
            <li><strong>Version:</strong> {result.version}</li>
          </ul>
        </div>
      )}

      {status === 'not-found' && (
        <p style={{ color: 'red', marginTop: '1rem' }}>❌ This hash is not found.</p>
      )}

      {status === 'error' && (
        <p style={{ color: 'orange', marginTop: '1rem' }}>⚠️ Error loading verification log.</p>
      )}
    </div>
  );
}
