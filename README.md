# Soft Roots

A luxury truck dealership site for **Soft Roots**, a fictional business built as a portfolio project with the Next.js App Router. Its centerpiece is an interactive 3D truck configurator.

## Features

- **3D truck configurator (`/build`).** Customize the Fjord F-100 Heritage in real time with React Three Fiber:
  - Paint, two-tone accent and wheel finish, recolored live in the model's texture atlas.
  - Suspension and tire packages that animate the lift and tire size.
  - Roof light bar, bed cover and running boards, placed automatically from the model's measurements.
  - Powertrain and interior options with live specs and pricing.
  - Camera presets, auto-spin, headlights and a price breakdown.
  - Every build is encoded in the URL for sharing and can be added to the cart.
- **Scroll-driven hero video.** On Home and About, page scroll scrubs through the background video. It is encoded with dense keyframes for smooth seeking, shows a poster first, and is skipped for reduced-motion and data-saver users.
- **Working shop and cart.** Filter by category and price, sort, add products or custom builds, change quantities, pick shipping and apply a promo code (try `SOFTROOTS10`). The cart persists in `localStorage` and stays in sync across tabs.
- **Journal.** Category filtering, statically generated article pages, related posts, share links and `BlogPosting` structured data.
- **Test drive booking and contact.** Validated forms with inline errors, click-to-call/email links and directions.
- **SEO.** Per-page metadata, canonical URLs, generated Open Graph image, `sitemap.xml`, `robots.txt` and a web app manifest.
- **Accessibility.** Semantic landmarks, skip link, keyboard-friendly navigation and configurator controls, labelled form controls, live regions and `prefers-reduced-motion` support.
- **Security.** Strict security headers including a Content Security Policy. See [Security](#security).

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router) and React 19
- [three.js](https://threejs.org), [React Three Fiber](https://r3f.docs.pmnd.rs) and [drei](https://drei.docs.pmnd.rs) for the configurator
- CSS Modules with shared design tokens, plus [Tailwind CSS 4](https://tailwindcss.com) base styles
- ESLint with `eslint-config-next`
- pnpm

## Getting Started

Requires Node.js 20.9 or newer and [pnpm](https://pnpm.io).

```bash
pnpm install
cp .env.example .env.local   # optional: set NEXT_PUBLIC_SITE_URL
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script       | Description                      |
| ------------ | -------------------------------- |
| `pnpm dev`   | Start the development server     |
| `pnpm build` | Create a production build        |
| `pnpm start` | Serve the production build       |
| `pnpm lint`  | Run ESLint                       |

### Environment Variables

| Variable               | Description                                                                 |
| ---------------------- | --------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Public site URL used for canonical links, Open Graph tags, sitemap and sharing. Defaults to `http://localhost:3000`. |

## Project Structure

```
public/media/            Hero video and poster
public/models/           3D truck models (glTF binary)
src/app/                 Routes, layouts, metadata files (sitemap, robots, OG image, manifest)
  about/ blog/ book/ build/ cart/ contact/ shop/ terms/
  build/                 Configurator UI, 3D viewer and model preparation helpers
  fonts/                 Self-hosted Geist and Playfair Display variable fonts (SIL OFL 1.1)
src/components/          Shared UI: Navbar, Footer, VideoBackground, CtaSection,
                         NewsletterForm, FormField, cart store, ui.module.css
src/libs/                Site config, products, configurator options, blog content, validation
```

### Adding another truck

Add an entry to `trucks` in `src/libs/configurator.js` with its model URL, the palette colors to repaint (`swatches`) and its option groups. The model needs body and wheel parts named `Pickup`, `FrontWheel_L`, `FrontWheel_R` and `BackWheels`, or `prepareTruck.js` must be adapted to its node names.

## Security

- All dependencies are current and `pnpm audit` is clean at the time of writing.
- `next.config.mjs` sends a Content Security Policy, HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` and `Cross-Origin-Opener-Policy`, and hides the `X-Powered-By` header. Production pages allow no JavaScript `eval` (only `wasm-unsafe-eval`, for WebAssembly), and the 3D studio uses procedural lighting so no external assets are loaded.
- Remote images are limited to Unsplash through `images.remotePatterns`.
- Cart data and shared build URLs are validated against the product catalog and configurator options, and prices are always recalculated rather than read from storage.

## Notes

- Soft Roots is fictional. Vehicles are inspired by real trucks but use parody names, and nothing is for sale. See the Terms & Credits page (`/terms`).
- The booking, contact and newsletter forms validate input and simulate submission. They are not yet connected to a backend or email service.
- Online checkout is not implemented; the cart directs customers to a consultant.

## Credits

- 3D pickup truck model: [“Pickup Truck” by Quaternius](https://poly.pizza/m/qn4grQgHm8) (CC0)
- Photography from [Unsplash](https://unsplash.com)
- Background footage from [Pixabay](https://pixabay.com)
