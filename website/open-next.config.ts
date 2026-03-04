import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
	// staticAssetsIncrementalCache serves pre-rendered pages from the ASSETS binding.
	// The preview command copies .open-next/cache/ → .open-next/assets/cdn-cgi/_next_cache/
	// so the worker can read them at runtime without KV or R2.
	incrementalCache: staticAssetsIncrementalCache,
});
