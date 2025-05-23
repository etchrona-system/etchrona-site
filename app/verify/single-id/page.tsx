"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import sha256 from "crypto-js/sha256";
import encHex from "crypto-js/enc-hex";

export default function SingleImageVerificationPage() {
  const [file, setFile] = useState<File | null>(null);
  const [hash, setHash] = useState("");
  const [originalFilename, setOriginalFilename] = useState("");
  const [customFilename, setCustomFilename] = useState("");
  const [purpose, setPurpose] = useState("");
  const [method, setMethod] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [userId, setUserId] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const wordArray = sha256(reader.result as string);
      const hash = wordArray.toString(encHex);
      setHash(hash);
      setOriginalFilename(file.name);
      setFile(file);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!file) return;
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
      userId,
      timestamp: now,
    });
  };

  const handleQRDownload = () => {
    const svg = document.getElementById("qrCode") as SVGSVGElement;
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `etchrona-${hash}.svg`;
    link.click();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center">
        Etchrona - Single Image Semantic Sealing
      </h2>

      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full border p-2 rounded"
      />

      {originalFilename && (
        <div className="text-sm space-y-1">
          <p><strong>Original Filename:</strong> {originalFilename}</p>
          <p><strong>SHA-256 Hash:</strong> {hash}</p>
        </div>
      )}

      <input
        type="text"
        value={customFilename}
        onChange={(e) => setCustomFilename(e.target.value)}
        placeholder="Optional Custom Filename"
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
        placeholder="Usage Purpose"
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        placeholder="Creation Method"
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        value={authCode}
        onChange={(e) => setAuthCode(e.target.value)}
        placeholder="Authorization Code"
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="User ID (Anonymous or Public)"
        className="w-full border p-2 rounded"
      />

      <div className="text-center">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        >
          Confirm and Submit
        </button>
      </div>

      {submitted && (
        <div className="text-center space-y-3">
          <p className="text-green-600 font-medium">✅ Verification Complete</p>
          <p><strong>Timestamp:</strong> {timestamp}</p>
          <p><strong>Submitted by:</strong> {userId || "Anonymous"}</p>

          <div className="inline-block bg-white p-2">
            <QRCode id="qrCode" value={`https://etchrona.site/result/${hash}`} size={160} />
          </div>

          <div>
            <button
              onClick={handleQRDownload}
              className="mt-2 px-4 py-1 bg-gray-700 text-white rounded hover:bg-gray-800"
            >
              ⬇️ Download QR Code
            </button>
          </div>

          <p className="text-xs text-gray-500">Scan to verify on Etchrona</p>
        </div>
      )}
    </div>
  );
}
