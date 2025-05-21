"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyMulti() {
  const [files, setFiles] = useState<FileList | null>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleNext = () => {
    if (!files || files.length === 0) return alert("Please upload at least one image.");
    router.push("/semantic"); // next page to fill metadata
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Image Set</h1>
      <p className="mb-2 text-sm text-gray-600">
        Upload multiple images of the same character (e.g., different angles, colors, or frames).
      </p>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="my-4"
      />

      {files && files.length > 0 && (
        <ul className="mb-4 text-sm text-gray-700">
          {Array.from(files).map((file, index) => (
            <li key={index}>✔ {file.name}</li>
          ))}
        </ul>
      )}

      <button
        onClick={handleNext}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
      >
        Continue
      </button>
    </main>
  );
}
