import { createFromSource } from "fumadocs-core/search/server";
import { source } from "@/lib/source";

// Not using edge runtime - fumadocs search requires Node.js modules

export const { GET } = createFromSource(source, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: "english",
});
