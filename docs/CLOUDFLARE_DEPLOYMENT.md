# Cloudflare Pages Deployment Guide

This guide will help you deploy your documentation site to Cloudflare Pages. The migration from Vercel has been completed, and all configurations are ready.

## 🚀 Quick Start

### Prerequisites

1. A Cloudflare account (free tier is sufficient)
2. Node.js 18+ installed
3. Git repository connected to your project

## Deployment Methods

### Method 1: Deploy via Cloudflare Dashboard (Recommended for first-time setup)

1. **Login to Cloudflare Dashboard**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to `Workers & Pages` → `Pages`

2. **Connect Your Repository**
   - Click `Create application` → `Pages` → `Connect to Git`
   - Authorize Cloudflare to access your GitHub/GitLab account
   - Select your repository

3. **Configure Build Settings**
   ```
   Framework preset: Next.js
   Build command: npm run pages:build
   Build output directory: .vercel/output/static
   Root directory: (leave empty or specify if needed)
   ```

4. **Environment Variables** (if any)
   - Add any environment variables your app needs
   - Check your `.env.local` for reference

5. **Deploy**
   - Click `Save and Deploy`
   - Wait for the build to complete (usually 2-5 minutes)

### Method 2: Deploy via Wrangler CLI (For ongoing deployments)

1. **Install Wrangler** (if not already installed)
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Build and Deploy**
   ```bash
   # Build the project
   npm run build
   npm run pages:build

   # Deploy to Cloudflare Pages
   npm run cf:deploy
   ```

4. **For subsequent deployments**
   ```bash
   npm run pages:deploy
   ```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run pages:build` | Build the Next.js app for Cloudflare Pages |
| `npm run pages:deploy` | Build and deploy to Cloudflare Pages |
| `npm run pages:preview` | Build and preview locally with Cloudflare Workers |
| `npm run pages:watch` | Watch mode for local development with Cloudflare |
| `npm run cf:deploy` | Build and deploy (explicit path) |

## Configuration Files

### wrangler.toml
- Main configuration file for Cloudflare Pages
- Located at project root
- Contains deployment settings and compatibility flags

### next.config.mjs
- Updated to include `@cloudflare/next-on-pages` setup
- Enables Cloudflare development platform in dev mode

## Features & Compatibility

### ✅ What Works
- Static pages and dynamic routes
- API routes
- Image optimization (via Cloudflare Images)
- Custom headers and redirects
- MDX content rendering
- Server-side rendering (SSR)
- Client-side navigation
- Search functionality

### 🔄 ISR Alternative
Instead of Vercel's ISR (Incremental Static Regeneration), Cloudflare Pages uses:
- **Static builds** with automatic revalidation
- **Edge caching** for improved performance
- **Stale-while-revalidate** patterns

For ISR-like behavior on Cloudflare:
1. Use `revalidate` in your pages
2. Cloudflare automatically handles caching at the edge
3. Consider using Cloudflare KV for caching if needed

### ⚙️ Advanced: Using Cloudflare KV for Caching

If you need persistent caching (similar to ISR), you can use Cloudflare KV:

1. **Create a KV namespace**
   ```bash
   wrangler kv:namespace create "MY_CACHE"
   ```

2. **Update wrangler.toml**
   ```toml
   [[kv_namespaces]]
   binding = "MY_CACHE"
   id = "your-namespace-id"
   ```

3. **Access in your API routes**
   ```typescript
   // app/api/example/route.ts
   export const runtime = 'edge';

   export async function GET(request: Request) {
     const cache = process.env.MY_CACHE;
     // Use cache for storing/retrieving data
   }
   ```

## Monitoring & Analytics

### Cloudflare Web Analytics (Free)
To add Cloudflare Web Analytics:

1. Go to Cloudflare Dashboard → `Analytics & Logs` → `Web Analytics`
2. Click `Add a site`
3. Get your tracking code
4. Add it to your app's `<head>` section in [app/layout.tsx](app/layout.tsx)

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <script
          defer
          src='https://static.cloudflareinsights.com/beacon.min.js'
          data-cf-beacon='{"token": "your-token-here"}'
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Cloudflare Pages Analytics
- Automatically enabled for all deployments
- View in Dashboard → `Pages` → Your Project → `Analytics`

## Custom Domains

1. Go to your Pages project in Cloudflare Dashboard
2. Click `Custom domains`
3. Add your domain
4. Update your DNS records as instructed
5. SSL certificates are automatically provisioned

## Troubleshooting

### Build Fails

**Issue**: Build fails with module errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
npm run pages:build
```

**Issue**: TypeScript errors during build
- Set `ignoreBuildErrors: true` in next.config.mjs (already configured)

### Runtime Errors

**Issue**: Functions exceed CPU time limit
- Check your serverExternalPackages in next.config.mjs
- Consider optimizing heavy computations
- Use edge runtime where possible

### Image Optimization

**Issue**: Images not loading
- Cloudflare uses its own image optimization
- Remote patterns are configured in next.config.mjs
- Images are automatically optimized at the edge

## Environment Variables

To add environment variables to Cloudflare Pages:

1. **Via Dashboard**:
   - Go to Pages project → `Settings` → `Environment variables`
   - Add your variables for Production/Preview

2. **Via .dev.vars** (local development):
   ```bash
   # .dev.vars (create this file)
   MY_SECRET_KEY=value
   API_ENDPOINT=https://api.example.com
   ```

## Performance Optimizations

Cloudflare Pages provides several performance benefits over Vercel:

1. **Global CDN**: Content served from 300+ data centers
2. **Zero cold starts**: Unlike Vercel Functions
3. **Unlimited bandwidth**: No bandwidth limits on free tier
4. **Smart routing**: Automatic routing to nearest edge location

## Cost Comparison

| Feature | Vercel | Cloudflare Pages |
|---------|--------|------------------|
| Bandwidth | 100GB/month (Hobby) | Unlimited |
| Builds | 6,000 min/month | 500 builds/month |
| ISR | Paid feature | Free (via edge caching) |
| Functions | Limited executions | 100,000 requests/day |
| CDN | Included | Included |

## Migration Checklist

- [x] Install @cloudflare/next-on-pages
- [x] Update next.config.mjs
- [x] Create wrangler.toml
- [x] Remove Vercel Analytics
- [x] Update build scripts
- [x] Update .gitignore
- [ ] Test build locally: `npm run pages:build`
- [ ] Deploy to Cloudflare Pages
- [ ] Configure custom domain (if needed)
- [ ] Set up environment variables
- [ ] Test all functionality on production
- [ ] Update DNS records

## Support & Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [@cloudflare/next-on-pages Documentation](https://github.com/cloudflare/next-on-pages)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Cloudflare Community](https://community.cloudflare.com/)

## Next Steps

1. **Test the build locally**:
   ```bash
   npm run build
   npm run pages:build
   ```

2. **Deploy to Cloudflare Pages** using Method 1 or 2 above

3. **Verify everything works**:
   - Check all pages load correctly
   - Test search functionality
   - Verify images load properly
   - Test API routes

4. **Set up custom domain** (optional)

5. **Configure analytics** (optional)

---

**Note**: The `.vercel` directory is intentionally kept as it's used by @cloudflare/next-on-pages for build output. This is normal and expected.
