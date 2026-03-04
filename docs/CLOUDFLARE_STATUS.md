# Cloudflare Pages Migration Status

## Current Situation

Your documentation site uses **fumadocs**, which relies on Node.js filesystem APIs (`fs` and `path`) for:
- Reading component source code dynamically
- Generating search indexes
- Processing MDX content

These features are **incompatible** with Cloudflare Pages when using the `@cloudflare/next-on-pages` adapter because:
1. Cloudflare's Edge Runtime doesn't support Node.js modules
2. SSG pages with `generateStaticParams` create server functions that conflict with the adapter
3. The `@cloudflare/next-on-pages` package has [known issues](https://github.com/cloudflare/next-on-pages/issues/833) with Next.js SSG routes

## Recommended Solutions

### Option 1: Use @opennextjs/cloudflare (Recommended)

**Cloudflare now officially recommends** [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) instead of `@cloudflare/next-on-pages`. This adapter:
- ✅ Supports both Edge and Node.js runtimes
- ✅ Better SSG/ISR support
- ✅ Works with fumadocs and similar tools
- ✅ More mature and actively maintained

**Migration Steps:**

```bash
# Remove old adapter
bun remove @cloudflare/next-on-pages

# Install OpenNext Cloudflare adapter
bun add -D @opennextjs/cloudflare

# Update build scripts in package.json
# Replace: "pages:build": "npx @cloudflare/next-on-pages"
# With: "pages:build": "open-next build --cloudflare"
```

See [OpenNext Cloudflare Documentation](https://opennext.js.org/cloudflare) for full setup.

### Option 2: Deploy to Vercel (Simplest)

Since your project is already optimized for Vercel, staying on Vercel might be the best option if:
- You're primarily concerned about ISR costs (consider if you actually need ISR)
- The free tier limits are sufficient (100GB bandwidth, 6000 build minutes)
- You value zero-configuration deployment

**Cost Comparison:**
| Feature | Vercel Free | Vercel Pro | Cloudflare Pages |
|---------|-------------|------------|------------------|
| Bandwidth | 100GB | 1TB | Unlimited |
| Builds | 6000 min | 24000 min | 500 builds |
| ISR | Limited | Included | Via KV (different) |
| Functions | Limited | 1M executions | 100K requests/day |

### Option 3: Static Export to Cloudflare Pages

If you don't need the API routes or server features, you can use Next.js's static export:

1. **Update next.config.mjs:**
   ```js
   const nextConfig = {
     output: 'export',
     // ... rest of config
   };
   ```

2. **Deploy the `out` directory to Cloudflare Pages**

**Limitations:**
- ❌ No API routes (`/api/search` won't work)
- ❌ No server-side features
- ✅ All pages are static HTML
- ✅ Perfect for pure documentation sites

### Option 4: Cloudflare Workers with Custom Setup

For advanced users who want full control:
- Use Cloudflare Workers directly
- Implement custom routing and caching
- Pre-compile search indexes
- More complex but most flexible

## What We've Done

✅ Configured project for Cloudflare compatibility:
- Removed Vercel Analytics/SpeedInsights
- Disabled `cacheComponents` (conflicts with edge runtime)
- Added Cloudflare-specific build scripts
- Created wrangler.toml configuration
- Updated .gitignore for Cloudflare files

✅ Documentation created:
- [CLOUDFLARE_DEPLOYMENT.md](CLOUDFLARE_DEPLOYMENT.md) - Full deployment guide
- [DEPLOY.md](DEPLOY.md) - Quick reference
- This status document

## My Recommendation

**Use @opennextjs/cloudflare** (Option 1). It's specifically designed to handle Next.js applications with mixed runtime requirements and is now Cloudflare's recommended approach. The migration is straightforward and will give you:

1. **Unlimited bandwidth** vs Vercel's 100GB limit
2. **Full Node.js support** for fumadocs
3. **Better ISR/caching** without additional costs
4. **Future-proof** solution maintained by the community

## Implementation Plan for @opennextjs/cloudflare

If you choose Option 1, here's what to do:

```bash
# 1. Clean up
bun remove @cloudflare/next-on-pages

# 2. Install OpenNext
bun add -D @opennextjs/cloudflare

# 3. Update package.json scripts
# Change "pages:build" to use: open-next build
```

Then follow the [OpenNext Cloudflare setup guide](https://opennext.js.org/cloudflare).

## Questions?

- **Can I keep ISR-like features?** Yes, with @opennextjs/cloudflare or Cloudflare KV
- **Will search work?** Yes, with @opennextjs/cloudflare (Node.js runtime support)
- **What about costs?** Cloudflare Pages is free for most use cases
- **Migration time?** ~30 minutes with @opennextjs/cloudflare

## References

- [Cloudflare next-on-pages Issue #833](https://github.com/cloudflare/next-on-pages/issues/833) - SSG breaking change
- [OpenNext Cloudflare Documentation](https://opennext.js.org/cloudflare)
- [Cloudflare Pages Framework Guides](https://developers.cloudflare.com/pages/framework-guides/nextjs/)

---

**Next Step:** Choose an option above and let me know which direction you'd like to go. I recommend Option 1 (@opennextjs/cloudflare) for the best balance of features and cost savings.
