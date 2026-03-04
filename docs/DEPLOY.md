# 🚀 Quick Deploy to Cloudflare Pages

## Option 1: Cloudflare Dashboard (Easiest)

1. Go to https://dash.cloudflare.com/
2. Navigate to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. Select your repository
4. Use these build settings:
   ```
   Framework preset: Next.js
   Build command: npm run pages:build
   Build output directory: .vercel/output/static
   ```
5. Click **Save and Deploy**

## Option 2: CLI Deployment

```bash
# First time setup
npm install -g wrangler
wrangler login

# Deploy
npm run build
npm run pages:build
npm run cf:deploy
```

## Option 3: Automatic CI/CD

Add this to your `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: |
          npm run build
          npm run pages:build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: kokonut-ui-docs
          directory: .vercel/output/static
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

### Setup GitHub Secrets:
1. `CLOUDFLARE_API_TOKEN`: Get from Cloudflare Dashboard → My Profile → API Tokens → Create Token
2. `CLOUDFLARE_ACCOUNT_ID`: Found in Workers & Pages overview

---

📖 For detailed instructions, see [CLOUDFLARE_DEPLOYMENT.md](CLOUDFLARE_DEPLOYMENT.md)
