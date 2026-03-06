import { Marquee } from "@/components/marquee";
import localFont from "next/font/local";

const bethanyFont = localFont({
  src: "../../../../../assets/fonts/Bethany-Elingston.otf",
  variable: "--font-bethany",
});
const satoshi = localFont({
  src: [
    {
      path: "../../../../../assets/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../../../assets/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../../../assets/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  fallback: ["system-ui", "sans-serif"],
});

const mockups = [
  {
    src: "https://i.ibb.co/GvRjb23F/chat-v1-iphone.png",
    alt: "Chat Screen",
  },
  {
    src: "https://i.ibb.co/6R5cyB9Y/settings-v1-iphone.png",
    alt: "Settings Screen",
  },
  {
    src: "https://i.ibb.co/jks5Xk9w/sign-up-v1-iphone.png",
    alt: "Sign Up Screen",
  },
  {
    src: "https://i.ibb.co/DPWnnb3g/sign-up-v2-iphone.png",
    alt: "Sign Up v2 Screen",
  },
  {
    src: "https://i.ibb.co/d0WNQwNF/bottom-sheet-mockup.png",
    alt: "Bottom Sheet Mockup",
  },
  {
    src: "https://i.ibb.co/F48xgdXC/parallax-header-mockup.png",
    alt: "Parallax Header Mockup",
  },
  {
    src: "https://i.ibb.co/kgQk8VdG/split-view-mockup.png",
    alt: "Split View Mockup",
  },
  {
    src: "https://i.ibb.co/KxwqfGHs/material-mockup.png",
    alt: "Material Carousel Mockup",
  },
];

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8">
      <div className="relative z-20 w-full max-w-3xl mx-auto text-center space-y-4">
        <div className="flex justify-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#121212] text-[#a3a3a3] text-sm font-medium border">
            90 + AND COUNTING
          </div>
        </div>
        <h1
          className={`${bethanyFont.className} text-4xl md:text-5xl lg:text-6xl text-foreground pt-5`}
        >
          Slight Showcase
        </h1>
        <p
          className={`${satoshi.className} text-lg md:text-xl text-[#717171] max-w-2xl mx-auto pb-12 leading-relaxed`}
        >
          A glimpse of the stunning components built with Reacticx. Using React
          Native Skia and React Native Reanimated.
        </p>
      </div>
      <div className="relative w-full">
        <Marquee
          pauseOnHover
          className="[--duration:10s] [--gap:2rem]"
          repeat={4}
        >
          {mockups.map((mockup) => (
            <div
              key={mockup.alt}
              className="relative h-[500px] w-[250px] shrink-0 overflow-hidden rounded-3xl border border-fd-border/50 shadow-lg transition-transform duration-300 hover:scale-[1.02]"
            >
              <img
                src={mockup.src}
                alt={mockup.alt}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-fd-background to-fd-background/0"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-fd-background to-fd-background/0"></div>
      </div>
    </div>
  );
}
