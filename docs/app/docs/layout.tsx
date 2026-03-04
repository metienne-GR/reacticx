import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { source } from "@/lib/source";
import { baseOptions } from "../layout.config";
import { AnnouncementDialog } from "@/components/announcement-dialog";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    template: "%s | Reactix",
    default: "Reactix - Open Source UI Components to build beautiful websites",
  },
};

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <>
      <DocsLayout
        tree={source.pageTree}
        sidebar={{
          banner: (
            <div className="flex flex-col gap-2 rounded-md p-2 py-1">
              <Link
                href="https://www.buymeacoffee.com/rit3zh"
                rel="noreferrer"
                target="_blank"
              >
                <span className="hidden items-center gap-2 md:flex">
                  <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a book&emoji=📖&slug=rit3zh&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" />
                </span>
              </Link>
            </div>
            // <Image
            //   alt="Reactix Logo"
            //   className="mr-0 hidden dark:block"
            //   height={250}
            //   src="https://i.ibb.co/fGyL5jCN/buymeacoffee-reacticx.png"
            //   width={120}
            // />
          ),
        }}
        {...baseOptions()}
      >
        {children}
      </DocsLayout>
      {/* <AnnouncementDialog /> */}
    </>
  );
}
