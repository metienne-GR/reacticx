"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const libraries = [
  {
    name: "Reanimated",
    logoDark: "/static/deps/reanimated.png",
  },
  {
    name: "Skia",
    logoDark: "/static/deps/skia.png",
  },
];

export function HeroFlip() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % libraries.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center h-[1.5em] overflow-hidden relative w-[50px] inline-flex align-bottom">
      <AnimatePresence mode="wait">
        <motion.div
          key={libraries[index].name}
          initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -20, opacity: 0, filter: "blur(5px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute flex items-center gap-2"
        >
          <div className="relative h-10 w-10">
            <Image
              src={libraries[index].logoDark}
              alt={libraries[index].name}
              fill
              className="object-contain hidden dark:block"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
