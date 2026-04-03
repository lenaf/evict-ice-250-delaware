# Evict ICE 250 Delaware

## Stack
- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS 4, DaisyUI 5
- Supabase (Postgres), Resend (email)
- Deployed on Vercel, package manager: pnpm

## Design System

### Color Palette
- **Yellow** `#FFD600` — primary brand, hero backgrounds, highlights
- **Dark Blue** `#1E3A8A` — secondary brand, headings, section backgrounds
- **Red** `#DC2626` — urgency, CTAs, stats
- **Black** `#000000` — text, borders, section backgrounds
- **White** `#FFFFFF` — clean section backgrounds, card backgrounds

### Design Rules
- No drop shadows
- No left/right/partial borders — use full 2px black borders (`border-2 border-black`) for cards and containers
- Hover states on cards: `hover:border-[#DC2626]`
- Buttons: solid fill with `border-2`, uppercase, font-black, tracking-wider
- Primary CTA: red bg (`bg-[#DC2626]`), hover to black
- All buttons must have `cursor-pointer`
- Typography: Inter font, font-black for headings, uppercase for section headers
- Avoid adjacent sections with the same background color
- Section padding: `px-6 md:px-10 py-14 md:py-20` for content sections
- Max content width: `max-w-6xl mx-auto`
- Forms: white bg inputs with `border-2 border-black`, red focus ring (`focus:border-[#DC2626]`)

### Component Patterns
- Cards: white bg, full black border, red hover border
- Progress bars: rounded-full, `bg-black/10` track, red fill (green when target met)
- Modals: centered, `bg-black/60` backdrop, white container, no close on backdrop click
- Form validation: disable submit button until valid, show `disabled:opacity-50 disabled:cursor-not-allowed`

## Code Conventions

### Components
- Use arrow function with `React.FC`: `const MyComponent: React.FC<Props> = ({ ... }) => { ... }`
- Define prop interfaces above the component: `interface MyComponentProps { ... }`
- No `function` keyword for component definitions

### File Structure
- Page-level views go directly in `page.tsx` when possible (like the homepage)
- If `page.tsx` needs `"use client"` and metadata, split the view into a sibling file in the same folder
- Sub-components specific to a page go in the same folder as that page
- Only truly shared/reusable components go in `src/components/`
- Shared utilities go in `src/lib/` (e.g. `format.ts`, `email.ts`)
- Shared types go in `src/types/`
- Don't duplicate helpers — extract to `src/lib/` if used in 2+ files
- Try to keep files under ~200 lines (soft rule) — extract sub-components when they can stand alone

## Admin
- `/admin` uses shared password auth via `ADMIN_PASSWORD` env var
- Admin pages should have `robots: { index: false }` metadata
