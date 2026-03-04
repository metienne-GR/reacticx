import { Header } from "@/components/header/header";
import { ForceDarkTheme } from "@/components/force-dark-theme";
import { Hero } from "@/components/home/hero";

export default function Home() {
  return (
    <>
      <ForceDarkTheme />
      <div className="relative min-h-screen w-full bg-neutral-50/50 dark:bg-neutral-950">
        <Header />
        {/* <Header /> */}
        <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#ffffff22_1px,transparent_1px)] pointer-events-none" />
        <main className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <Hero />
        </main>
      </div>
    </>
  );
}
