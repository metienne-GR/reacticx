import type { Metadata } from "next";
import { Suspense } from "react";

// import { usePathname } from "next/navigation";

export const metadata: Metadata = {
  title: {
    template: "%s | Reactix - The Modern React Native Component Library",
    default: "Reactix - The Modern React Native Component Library",
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}></Suspense>
      <main className="relative w-full bg-white pt-0 md:pt-0 dark:bg-black">
        {children}
      </main>
    </>
  );
}
