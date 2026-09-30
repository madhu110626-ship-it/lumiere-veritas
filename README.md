# Lumiere Veritas Media Solutions

Premium creative agency website for **Lumiere Veritas Media Solutions**.

Built with **Next.js 15** (App Router), **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Dev on port 3456

```bash
npm run dev -- -p 3456 -H 0.0.0.0
```

### Production build

```bash
npm run build
npm start
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Full marketing homepage (all sections) |
| `/work` | Selected work + filters |
| `/services` | All 16 capabilities + signature hover |
| `/about` | Studio story, approach, why, stats |
| `/insights` | Editorial topic cards (placeholders) |
| `/contact` | Project form + WhatsApp / email / phone |

## Design system

- **Accent:** Electric Lime `#C8FF00`
- **Surfaces:** Near-black `#080808`, off-white `#F5F3EE`
- **Fonts:** Space Grotesk (display) + Inter (body) via `next/font/google`

## Contact

- Email: lumiereveritasmediasolutions@gmail.com
- Phone: +91 98920 27604
- WhatsApp: https://wa.me/919892027604

## Notes

- Client logos, testimonials, stats, awards, and case studies are clearly marked as **PLACEHOLDER** — do not treat as real claims.
- Contact form is front-end only until wired to a backend / email service.
- Showreel opens a placeholder modal until a video source is supplied.
- Social links in the footer are `#` until real profiles are provided.
- Stock imagery uses Unsplash URLs (configured in `next.config.ts`).

## Project structure

```
src/
  app/                 # App Router pages
  components/
    layout/            # Header, Footer, WhatsApp float
    sections/          # Homepage section modules
    ui/                # Reveal, buttons, headings
  data/                # Services, projects, insights, nav
```

© 2026 Lumiere Veritas Media Solutions
