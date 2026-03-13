# Evict ICE from 250 Delaware

A campaign website built with Next.js and Payload CMS to organize advocacy efforts against ICE presence at 250 Delaware Avenue.

## Campaign Colors

The site uses a bold, urgent color palette:

- **Primary Red** (#DC2626) - Action and urgency
- **Deep Blue** (#1E3A8A) - Trust and authority
- **Cyan** (#06B6D4) - ICE wordplay, visibility
- **Golden Yellow** (#EAB308) - Optimism and attention

## Tech Stack

- **Next.js 15** - React framework with App Router
- **Payload CMS** - Headless CMS for content management
- **MongoDB** - Database (MongoDB Atlas)
- **Cloudflare R2** - Media storage
- **TailwindCSS + DaisyUI** - Styling
- **Vercel** - Deployment

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Set up your `.env.local` file with:

```env
MONGODB_URI=your_mongodb_connection_string
PAYLOAD_SECRET=your_secret_key
S3_BUCKET=your_r2_bucket_name
S3_ENDPOINT=your_r2_endpoint
S3_REGION=auto
S3_ACCESS_KEY_ID=your_r2_access_key
S3_SECRET_ACCESS_KEY=your_r2_secret_key
S3_PUBLIC_URL=your_r2_public_url
```

3. Run the development server:

```bash
pnpm dev
```

4. Access the site at [http://localhost:3000](http://localhost:3000)

5. Access the CMS admin at [http://localhost:3000/admin](http://localhost:3000/admin)

## Customizing the Theme

Edit `src/config/theme.ts` to change colors, then run:

```bash
pnpm run generate-colors
```

This automatically generates `src/app/colors.css` with all the design tokens.
