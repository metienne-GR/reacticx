import { DecorIcon } from "../decor-icon";
import { ShieldCheckIcon } from "lucide-react";
import localFont from "next/font/local";
import { DonateButton } from "../donation-button/index";

const bethanyFont = localFont({
  src: "../../../../../assets/fonts/Bethany-Elingston.otf",
  variable: "--font-bethany",
});

const drukwide = localFont({
  src: "../../../../../assets/fonts/DrukWideBold.ttf",
  variable: "--font-drukwide",
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

export function DonationCard() {
  return (
    <section className="w-full space-y-5">
      <div className="mx-auto max-w-lg">
        <div className="space-y-4">
          <h2
            className={`${bethanyFont.className} mt-4 text-center font-bethany text-4xl tracking-tight md:text-4xl`}
          >
            Support Reacticx
          </h2>
          <p className="mt-2 text-center text-zinc-500 text-sm md:text-base dark:text-zinc-400">
            Help us keep Reacticx free for everyone by supporting our work. Your
            donations allow us to pay the bills and continue improving the
            library.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-2xl space-y-2 mt-12 @xl:grid-cols-2 grid gap-3">
        <div className="relative w-full max-w-2xl grid border border-zinc-200 bg-white p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-950">
          {/* Decorative Icons */}
          <DecorIcon className="size-6" position="top-left" />
          <DecorIcon className="size-6" position="top-right" />
          <DecorIcon className="size-6" position="bottom-left" />
          <DecorIcon className="size-6" position="bottom-right" />

          {/* Centered Content */}
          <div className="flex flex-col items-center justify-center w-full text-center">
            <h3
              className={`font-semibold text-xl md:text-2xl ${satoshi.className}`}
            >
              Support The Library
            </h3>

            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              Help Reacticx to stay free forever!
            </p>

            {/* Price */}
            <div className="mt-6 flex items-end gap-3 text-zinc-500 text-xl dark:text-zinc-400">
              <span className="sm:text-1xl text-1xl">$</span>
              <span
                className={`font-bold text-4xl text-zinc-950 dark:text-zinc-50 ${satoshi.className} sm:text-5xl text-5xl`}
              >
                3.99
              </span>
            </div>

            {/* Button */}
            <div className="mt-6 w-full md:w-1/2">
              <DonateButton />
            </div>
            {/* <Button asChild className="mt-6 w-full md:w-1/2" variant="outline">
              <a href="#">Donate Now</a>
            </Button> */}
          </div>
        </div>

        <div className="flex items-center justify-center gap-x-2 text-zinc-500 text-sm dark:text-zinc-400">
          <ShieldCheckIcon className="size-4" />
          <span>Every contribution, big or small, makes a difference!</span>
        </div>
      </div>
    </section>
  );
}
