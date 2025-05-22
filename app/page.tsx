import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {/* 你可以放置 LOGO 或簡單品牌文字 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-wide">ETCHRONA</h1>
        <h2 className="text-xl mt-2 font-semibold">Verification Portal</h2>
      </div>

      {/* 三個按鈕區塊：垂直排列，每個獨立一行 */}
      <div className="flex flex-col items-center gap-6">
        <Link href="/verify/single-id">
          <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition">
            Single Image Verification
          </button>
        </Link>

        <Link href="/verify/multi-id">
          <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition">
            Multi Image Verification
          </button>
        </Link>

        <Link href="/result">
          <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition">
            Query Verification Record
          </button>
        </Link>
      </div>
    </div>
  );
}
