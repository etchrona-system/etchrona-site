'use client'

import { useState } from 'react'

export default function Result() {
  const [input, setInput] = useState('');
  const [found, setFound] = useState<boolean | null>(null);

  const checkHash = async () => {
    try {
      const res = await fetch('/log/verify.json');
      const data = await res.json();
      const exists = data.some((entry: any) => entry.hash === input);
      
      console.log('Fetched data:', data);
      console.log('Input:', input);
      console.log('Exists:', exists);

      setFound(exists);
    } catch (error) {
      console.error('Failed to fetch log:', error);
      setFound(null);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Check Verification Result</h1>
      <input
        type="text"
        placeholder="Enter SHA-256 hash"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button onClick={checkHash}>Check</button>
      {found === true && <p style={{ color: 'green' }}>✅ This hash exists in the log.</p>}
      {found === false && <p style={{ color: 'red' }}>❌ This hash is not found.</p>}
    </div>
  );
}
