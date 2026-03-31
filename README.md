# Pathway Career Coaching & Self Development
### Built with Astro + Tailwind + TypeScript | AWS Backend

---

## Project Structure

```
pathway/
├── src/
│   ├── components/
│   │   ├── Nav.astro              # Sticky navigation with mobile menu
│   │   ├── Hero.astro             # Landing hero with stats
│   │   ├── PathwayMethod.astro    # The 4-phase method section
│   │   ├── Services.astro         # All 5 services + CTA
│   │   ├── About.astro            # Erica's bio & credentials
│   │   ├── Results.astro          # Stats + As Seen On
│   │   ├── Testimonials.astro     # Client testimonials
│   │   ├── BookPromo.astro        # Book advertisement section
│   │   ├── NewsletterQuiz.astro   # Quiz CTA + Email signup
│   │   ├── Contact.astro          # Contact form + Calendly CTA
│   │   ├── CareerQuiz.tsx         # React quiz component (TypeScript)
│   │   └── Footer.astro           # Footer with links + CTA
│   ├── layouts/
│   │   └── Layout.astro           # Base HTML layout
│   ├── pages/
│   │   ├── index.astro            # Main single-page site
│   │   ├── faq.astro              # FAQ page
│   │   ├── book.astro             # Book dedicated page
│   │   └── quiz.astro             # Quiz standalone page
│   └── styles/
│       └── global.css             # Global styles + Google Fonts
├── aws/
│   ├── contact-handler.ts         # Lambda: contact form
│   ├── subscribe-handler.ts       # Lambda: newsletter signup
│   └── quiz-handler.ts            # Lambda: quiz submission
├── astro.config.mjs
├── tailwind.config.mjs
└── tsconfig.json
```

---

## Setup

### 1. Install dependencies
```bash
npm install
npm run dev
```

### 2. Replace placeholder values

Search for `YOUR_LINK_HERE` and replace with real values:

| Placeholder | File(s) | Replace With |
|---|---|---|
| `https://calendly.com/YOUR_LINK_HERE` | Nav, Hero, Services, About, PathwayMethod, BookPromo, Contact, FAQ, Book | Erica's Calendly URL |
| `hello@pathwaycareercoaching.com` | Footer | Real contact email |
| Amazon `#` link | BookPromo, book.astro | Real Amazon book URL |
| Book title/subtitle | book.astro, BookPromo.astro | Real book title |
| Media logos in Results.astro | Results.astro | Real `<img>` tags for press logos |

### 3. Add Erica's photos

Replace placeholder containers with actual `<img>` tags:
- **Hero section**: 420×560px headshot → `Hero.astro`
- **About section**: 480×640px lifestyle/professional shot → `About.astro`

### 4. Customize content
- Update stats in `Results.astro` (500+ clients, 94% success rate, etc.)
- Add real testimonials in `Testimonials.astro`
- Update social media links in `Footer.astro`

---

## AWS Backend Setup

### Required Services
- **AWS Lambda** — 3 functions (contact, subscribe, quiz)
- **API Gateway** — REST API with CORS
- **AWS SES** — Email sending (verify domain first)
- **DynamoDB** — Two tables: `subscribers`, `quiz_results`

### Environment Variables (Lambda)
```
AWS_REGION=us-east-1
SES_FROM_EMAIL=noreply@pathwaycareercoaching.com
SES_TO_EMAIL=erica@pathwaycareercoaching.com
SUBSCRIBERS_TABLE=pathway-subscribers
QUIZ_TABLE=pathway-quiz-results
CALENDLY_URL=https://calendly.com/YOUR_LINK
ALLOWED_ORIGIN=https://pathwaycareercoaching.com
```

### API Gateway Routes
```
POST /api/contact     → contact-handler Lambda
POST /api/subscribe   → subscribe-handler Lambda
POST /api/quiz        → quiz-handler Lambda
```

### Wire up frontend
In `NewsletterQuiz.astro` and `Contact.astro`, replace `/api/subscribe` and `/api/contact` with your full API Gateway URLs, or set up a proxy in `astro.config.mjs`.

---

## Brand Colors

| Name | Hex | Use |
|---|---|---|
| Cream | `#f8efee` | Primary background |
| Gold 500 | `#b87e27` | Primary accent |
| Gold 300 | `#d4a84b` | Light gold/highlights |
| Charcoal 900 | `#1a1410` | Dark sections/text |

---

## Fonts
- **Display**: Cormorant Garamond (headings, editorial)
- **Body**: DM Sans (UI, paragraphs, labels)

Loaded via Google Fonts in `global.css`.

---

## Deployment

```bash
npm run build
# Output in /dist — deploy to AWS S3 + CloudFront, Netlify, or Vercel
```

For Astro SSR (needed if using server-side API routes), switch `output: 'static'` to `output: 'server'` in `astro.config.mjs` and add an adapter.
