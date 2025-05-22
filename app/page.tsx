import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start mt-24 px-4 text-center">

      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-wide">ETCHRONA</h1>
        <h2 className="text-xl mt-2 font-semibold">Verification Portal</h2>
      </div>

      <div className="flex flex-col items-center gap-6 mt-20">
        <Link href="/verify/single-id">
          <button className="bg-black text-white px-6 py-5 rounded hover:bg-gray-800 transition">
            Single Image Verification
          </button>
        </Link>

        <Link href="/verify/multi-id">
          <button className="bg-black text-white px-6 py-5 rounded hover:bg-gray-800 transition">
            Multi Image Verification
          </button>
        </Link>

        <Link href="/result">
          <button className="bg-black text-white px-6 py-5 rounded hover:bg-gray-800 transition">
            Query Verification Record
          </button>
        </Link>
      </div>
    </div>
  );
}
