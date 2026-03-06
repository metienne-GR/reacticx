"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn-ui/accordion";
import Link from "next/link";
import localFont from "next/font/local";
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

const bethanyFont = localFont({
  src: "../../../../../assets/fonts/Bethany-Elingston.otf",
  variable: "--font-bethany",
});

const faqItems = [
  {
    id: "item-1",
    question: "Is Reacticx free to use?",
    answer:
      "Yes, Reacticx is completely free and open source. All core components are available at no cost for both personal and commercial projects.",
  },
  {
    id: "item-2",
    question: "Is Reacticx open source?",
    answer:
      "Yes, Reacticx is fully open source under the MIT license. You can find the source code on our GitHub repository, report issues, and contribute to the project.",
  },
  {
    id: "item-3",
    question: "Is Reacticx an animation library?",
    answer:
      "No. Reacticx is a UI component library for React Native, not an animation library. It's built on top of React Native Skia and Reanimated to deliver components with smooth, high-performance animations out of the box.",
  },
  {
    id: "item-4",
    question: "Can I use Reacticx in commercial projects?",
    answer:
      "Absolutely. Reacticx is MIT licensed, so you're free to use it in any project — personal, open source, or commercial — without restrictions.",
  },
  {
    id: "item-5",
    question: "What dependencies does Reacticx require?",
    answer:
      "Reacticx requires Expo as the base framework, along with React Native Skia and React Native Reanimated for rendering and animations. All peer dependencies are listed in the installation guide.",
  },
  {
    id: "item-6",
    question: "How do I get started with Reacticx?",
    answer:
      "Simply install the package, copy the components you need into your project, and start using them. Check out our documentation for step-by-step setup instructions and examples.",
  },
];

export default function FAQs() {
  return (
    <section className={`${satoshi.variable} @container`}>
      <div className="mx-auto max-w-2xl px-6">
        <div className="text-center space-y-3">
          <h2
            className={`${bethanyFont.className} text-4xl md:text-5xl font-medium text-foreground`}
          >
            Questions & Answers
          </h2>
          <p
            className={`${satoshi.className} text-muted-foreground text-base max-w-lg mx-auto`}
          >
            Everything you need to know about Reacticx.
          </p>
        </div>
        <Accordion type="single" collapsible className="mt-10">
          {faqItems.map((item) => (
            <div className="group" key={item.id}>
              <AccordionItem
                value={item.id}
                className="data-[state=open]:bg-muted/50 peer rounded-xl border-none px-5 py-1 transition-colors"
              >
                <AccordionTrigger
                  className={`${satoshi.className} cursor-pointer py-4 text-sm font-medium hover:no-underline`}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p
                    className={`${satoshi.className} text-muted-foreground pb-2 text-sm leading-relaxed`}
                  >
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
              <hr className="mx-5 group-last:hidden peer-data-[state=open]:opacity-0" />
            </div>
          ))}
        </Accordion>
        <p
          className={`${satoshi.className} text-muted-foreground mt-8 text-center text-sm`}
        >
          Can&apos;t find what you&apos;re looking for?{" "}
          <Link
            href="mailto:thisismyn07@gmail.com"
            className="text-primary font-medium hover:underline"
          >
            Contact Creator
          </Link>
        </p>
      </div>
    </section>
  );
}
