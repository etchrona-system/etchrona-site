import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-white text-center">
      {/* Title Section */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold tracking-wide">ETCHRONA</h1>
        <h2 className="text-xl font-medium mt-2">Verification Portal</h2>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col items-center gap-6">
        <Link href="/verify/single-id">
          <button className="bg-black text-white px-8 py-4 rounded hover:bg-gray-800 transition">
            Single Image Verification
          </button>
        </Link>

        <Link href="/verify/multi-id">
          <button className="bg-black text-white px-8 py-4 rounded hover:bg-gray-800 transition">
            Multi Image Verification
          </button>
        </Link>

        <Link href="/result">
          <button className="bg-black text-white px-8 py-4 rounded hover:bg-gray-800 transition">
            Query Verification Record
          </button>
        </Link>
      </div>
    </main>
  );
}
