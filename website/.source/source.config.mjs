// source.config.ts
import {
  defineDocs,
  defineConfig,
  frontmatterSchema,
  defineCollections
} from "fumadocs-mdx/config";
import * as z from "zod";
var docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema.extend({
      lastModified: z.string().or(z.date()).transform((val) => val ? new Date(val) : void 0).optional()
    }),
    postprocess: {
      includeProcessedMarkdown: true
    }
  }
});
var templates = defineCollections({
  type: "doc",
  dir: "content/templates",
  schema: frontmatterSchema.extend({
    preview: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional()
  })
});
var source_config_default = defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: "github-dark"
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
        "diff"
      ]
    }
  }
});
export {
  source_config_default as default,
  docs,
  templates
};
