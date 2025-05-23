"use client";
import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function SingleImagePage() {
  const [file, setFile] = useState<File | null>(null);
  const [hash, setHash] = useState("");
  const [originalFilename, setOriginalFilename] = useState("");
  const [customFilename, setCustomFilename] = useState("");
  const [purpose, setPurpose] = useState("");
  const [method, setMethod] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const selectedFile = fileList[0];
    setFile(selectedFile);
    setOriginalFilename(selectedFile.name);

    const buffer = await selectedFile.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    setHash(hashHex);
  };

  const handleSubmit = () => {
    if (!hash || !authCode) {
      alert("Please upload an image and enter an authorization code.");
      return;
    }
    const confirm = window.confirm(
      "You are about to seal the semantic record and authorization code. Once submitted, it cannot be modified and is only for future verification. Continue?"
    );
    if (!confirm) return;
    const now = new Date().toISOString();
    setTimestamp(now);
    setSubmitted(true);
    console.log({
      hash,
      originalFilename,
      customFilename,
      purpose,
      method,
      authCode,
      timestamp: now,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold">Etchrona - Single Image Semantic Sealing</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      {hash && (
        <div className="bg-gray-100 p-2 rounded">
          <p><strong>Original Filename:</strong> {originalFilename}</p>
          <p><strong>SHA-256 Hash:</strong> {hash}</p>
        </div>
      )}

      <input
        type="text"
        placeholder="Custom Filename (optional)"
        className="w-full border p-2 rounded"
        value={customFilename}
        onChange={(e) => setCustomFilename(e.target.value)}
      />

      <textarea
        placeholder="Usage Purpose (informative only, not legally binding)"
        className="w-full border p-2 rounded"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
      />

      <textarea
        placeholder="Creation Method / Process Description (e.g., tool used, AI generation, etc.)"
        className="w-full border p-2 rounded"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        maxLength={1000}
      />

      <input
        type="text"
        placeholder="Authorization Code (required for semantic access)"
        className="w-full border p-2 rounded"
        value={authCode}
        onChange={(e) => setAuthCode(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Confirm and Submit
      </button>

      {submitted && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded">
          <p>✅ Verification Complete</p>
          <p><strong>Timestamp:</strong> {timestamp}</p>
          <div className="mt-4">
            <QRCodeSVG value={`https://etchrona.com/result?hash=${hash}`} />
          </div>
        </div>
      )}
    </div>
  );
}
