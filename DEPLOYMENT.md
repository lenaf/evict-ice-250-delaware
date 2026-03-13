# Deployment Guide

## Prerequisites

Before deploying, you'll need:

1. **MongoDB Atlas Account** (free tier is fine)
2. **Cloudflare R2 Account** (for media storage)
3. **Vercel Account** (for hosting)

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new project: "Evict ICE 250 Delaware"
3. Create a new cluster (free M0 tier works great)
4. Under "Database Access," create a new database user
5. Under "Network Access," allow access from anywhere (0.0.0.0/0) for Vercel
6. Get your connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user's password
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/evict-ice-db`

## Step 2: Set Up Cloudflare R2

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to R2 Object Storage
3. Create a new bucket: `evict-ice-media`
4. Go to "Manage R2 API Tokens"
5. Create a new API token with read/write permissions
6. Save these values:
   - Access Key ID
   - Secret Access Key
   - Bucket name
   - Endpoint URL (format: `https://<account-id>.r2.cloudflarestorage.com`)
7. Make the bucket public for read access:
   - Go to bucket settings
   - Set up a public domain or use R2's dev subdomain
   - Your public URL: `https://pub-<id>.r2.dev` or your custom domain

## Step 3: Deploy to Vercel

### Via Vercel Dashboard (Recommended)

1. Push your code to GitHub:

```bash
cd /Users/lena.forti/evict-ice-250-delaware
git add .
git commit -m "Initial commit: Evict ICE from 250 Delaware campaign site"
git remote add origin https://github.com/YOUR_USERNAME/evict-ice-250-delaware.git
git push -u origin main
```

2. Go to [Vercel Dashboard](https://vercel.com/)
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Configure the project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `pnpm run build` (or leave default)
   - Install Command: `pnpm install` (or leave default)

6. Add Environment Variables:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/evict-ice-db

# Payload CMS
PAYLOAD_SECRET=your-random-secret-key-at-least-32-chars
NEXT_PUBLIC_SERVER_URL=https://your-domain.vercel.app

# Cloudflare R2
S3_BUCKET=evict-ice-media
S3_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
S3_REGION=auto
S3_ACCESS_KEY_ID=your-r2-access-key-id
S3_SECRET_ACCESS_KEY=your-r2-secret-access-key
S3_PUBLIC_URL=https://pub-xxxxx.r2.dev

# Revalidation (for on-demand cache updates)
REVALIDATE_SECRET=Ap7Fj4QHI7gFnVKNe0mvkrTkkbrOKA8/GKVr7TEARMM=
```

7. Click "Deploy"

### Generate PAYLOAD_SECRET

Run this in your terminal to generate a secure secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Step 4: First Time Setup

After deployment completes:

1. Visit `https://your-domain.vercel.app/admin`
2. Create your admin account (first user is automatically admin)
3. Start creating content!

## Step 5: Custom Domain (Optional)

1. In Vercel, go to your project settings
2. Go to "Domains"
3. Add your custom domain (e.g., `evictice250delaware.org`)
4. Update DNS records as instructed by Vercel
5. Update `NEXT_PUBLIC_SERVER_URL` environment variable to your custom domain

## Updating the Site

Every time you push to `main` branch, Vercel automatically redeploys.

### Local Development Workflow

```bash
# Make changes locally
git add .
git commit -m "Update homepage content"
git push

# Vercel automatically deploys
```

### Content Updates

Content changes in the CMS automatically revalidate pages - no redeployment needed!

## Troubleshooting

### Build Fails

- Check that all environment variables are set correctly
- Ensure MongoDB connection string is valid
- Check build logs in Vercel dashboard

### Images Not Loading

- Verify R2 bucket is publicly accessible
- Check S3_PUBLIC_URL is correct
- Ensure R2 API token has read/write permissions

### CMS Admin Not Loading

- Verify MONGODB_URI is correct
- Check PAYLOAD_SECRET is set
- Try incognito/private browsing mode

## Environment Variables Quick Reference

| Variable | Example | Where to Get It |
|----------|---------|----------------|
| MONGODB_URI | `mongodb+srv://...` | MongoDB Atlas connection string |
| PAYLOAD_SECRET | Random 32+ char string | Generate with crypto |
| NEXT_PUBLIC_SERVER_URL | `https://your-site.vercel.app` | Your Vercel deployment URL |
| S3_BUCKET | `evict-ice-media` | Your R2 bucket name |
| S3_ENDPOINT | `https://...r2.cloudflarestorage.com` | R2 dashboard |
| S3_REGION | `auto` | Always `auto` for R2 |
| S3_ACCESS_KEY_ID | Your R2 access key | R2 API tokens |
| S3_SECRET_ACCESS_KEY | Your R2 secret | R2 API tokens |
| S3_PUBLIC_URL | `https://pub-...r2.dev` | R2 public domain |
| REVALIDATE_SECRET | Random string | Generate or use provided |

## Security Notes

- Never commit `.env.local` to git (it's in .gitignore)
- Rotate secrets periodically
- Use strong passwords for database users
- Keep admin credentials secure
- Enable 2FA on Vercel, MongoDB, and Cloudflare accounts

## Cost Estimates

- **Vercel:** Free tier (unlimited for non-commercial)
- **MongoDB Atlas:** Free M0 tier (512MB storage, sufficient for most campaigns)
- **Cloudflare R2:** Free tier (10GB storage, 1M Class A operations/month)

Total: **$0/month** for small to medium campaigns!
