import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <h1 className="text-2xl font-bold my-6">Etchrona Verification Portal</h1>

        <div className="flex flex-col items-center gap-4 mt-4">
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
      </main>
    </div>
  );
}
