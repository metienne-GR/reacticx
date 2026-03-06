import { source } from "#/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { baseOptions } from "@/app/layout.config";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Reactix",
    default: "Reactix - Open Source UI Components to build beautiful websites",
  },
};

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
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
        ),
      }}
      {...baseOptions()}
    >
      {children}
    </DocsLayout>
  );
}
