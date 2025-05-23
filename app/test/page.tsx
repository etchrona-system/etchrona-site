"use client";

import QRCode from "react-qr-code";
import CryptoJS from "crypto-js";

export default function TestPage() {
  const sampleText = "etchrona";
  const hash = CryptoJS.SHA256(sampleText).toString(CryptoJS.enc.Hex);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">SHA256 Hash Test</h1>
      <p><strong>Hash Result:</strong> {hash}</p>
      <QRCode value={`https://etchrona.site/result/${hash}`} />
    </div>
  );
}
