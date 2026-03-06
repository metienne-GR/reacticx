import { createMDX } from "fumadocs-mdx/next";
/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/docs/:path*.mdx",
        destination: "/llms.mdx/:path*",
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Use shiki's "unwasm" export condition so it resolves to the pure-JS
      // implementation (core-unwasm.mjs) instead of the WebAssembly build.
      // This makes it bundle-friendly for Cloudflare Workers.
      config.resolve.conditionNames = [
        "unwasm",
        ...(config.resolve.conditionNames ?? []),
      ];
      // fumadocs-core uses `await import("shiki/core")` which webpack splits into
      // separate async chunks. Cloudflare Workers can't load these at runtime,
      // so force them to be bundled inline (eager mode).
      config.module.rules.push({
        test: /node_modules[\\/](fumadocs-core|shiki)[\\/]/,
        parser: { dynamicImportMode: "eager" },
      });
      // No OG image routes — exclude @vercel/og and its wasm files from the bundle.
      config.resolve.alias["@vercel/og"] = false;
    }
    return config;
  },
};

const withMDX = createMDX({});
export default withMDX(config);

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
