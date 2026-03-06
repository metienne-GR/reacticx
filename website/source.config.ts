import {
  defineDocs,
  defineConfig,
  frontmatterSchema,
  defineCollections,
} from "fumadocs-mdx/config";
import * as z from "zod";
export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema.extend({
      lastModified: z
        .string()
        .or(z.date())
        .transform((val) => (val ? new Date(val) : undefined))
        .optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});
export const templates = defineCollections({
  type: "doc",
  dir: "content/templates",
  schema: frontmatterSchema.extend({
    preview: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
  }),
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      langs: [
        "typescript",
        "javascript",
        "tsx",
        "jsx",
        "bash",
        "shell",
        "json",
        "css",
        "diff",
      ],
    },
  },
});
