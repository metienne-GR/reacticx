import { loader, type InferPageType } from "fumadocs-core/source";
import { icons } from "lucide-react";
import { createElement } from "react";
import { docs, templates } from "fumadocs-mdx:collections/server";
export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon) {
      return;
    }

    if (icon in icons) {
      return createElement(icons[icon as keyof typeof icons]);
    }
  },
});

export type Page = InferPageType<typeof source>;

export { templates };
