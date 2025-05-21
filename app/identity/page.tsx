import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Identity() {
  const [nickname, setNickname] = useState("");
  const [lastUsed, setLastUsed] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim() === "") return;
    localStorage.setItem("etchrona-nickname", nickname);
    router.push("/verify");
  };

  // On first render, check last used nickname
  useState(() => {
    const saved = localStorage.getItem("etchrona-nickname");
    if (saved) setLastUsed(saved);
  });

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Start Using Etchrona Protocol</h1>
      <p className="mb-2 text-sm text-gray-600">
        Choose your ID to use for this session. This is not an account—just a temporary signature name.
      </p>
      {lastUsed && (
        <p className="mb-2 text-yellow-600 text-sm">
          You last used: <strong>{lastUsed}</strong>. You may reuse or enter a new one.
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2 w-full max-w-sm">
        <input
          type="text"
          placeholder="Enter nickname / anonymous / real name"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded"
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Proceed
        </button>
      </form>
    </main>
  );
}
