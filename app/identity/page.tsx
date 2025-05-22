"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// 強制此頁面跳過預先渲染，全部交由客戶端渲染（否則部署時會報錯）
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function IdentityPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  useEffect(() => {
    if (!mode) return;

    const timer = setTimeout(() => {
      switch (mode) {
        case "single":
          router.push("/verify");
          break;
        case "multi":
          router.push("/verify-multi");
          break;
        case "query":
          router.push("/result");
          break;
        default:
          router.push("/");
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [mode, router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-xl font-bold mb-3">Creating Your Session ID...</h1>
      <p className="text-sm text-gray-600">Routing mode: {mode}</p>
    </main>
  );
}
