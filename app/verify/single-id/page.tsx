// ✅ 第一步：建立 verify/single-id/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SingleIDPage() {
  const [nickname, setNickname] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) return;
    localStorage.setItem("etchrona-nickname", nickname);
    router.push("/verify");
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen pt-20 px-4">
      <h1 className="text-2xl font-bold mb-4">Enter Your ID (Single Image)</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Enter your ID or nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mb-4"
        />
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
        >
          Continue
        </button>
      </form>
    </main>
  );
}
