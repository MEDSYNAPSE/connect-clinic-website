# Connect Clinic — DESIGN

## Visual register

**Premium telehealth dark theme.** Deep navy / midnight base (#050d1a), high-contrast white text, single accent of **cyan-teal (#0891b2)** for CTAs and links, **emerald (#10b981)** for "available now" / safety-positive markers. Glass surfaces (`rgba(255,255,255,0.05)` + 10px backdrop blur) for cards.

The visual reference points: Linear's marketing pages, Stripe's product pages, Cal.com — clean, confident, fast. **Not** "healthcare corporate" — no white background, no stock smiling doctor, no royal blue.

## Typography

- **Headings + body**: Plus Jakarta Sans (Google Fonts). System fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica.
- **Sizes**: hero ~48-64px, section H2 ~32-40px, body 16-18px, captions 13-14px.
- **Weights**: 400 (body), 500 (emphasis), 700 (headlines), 800 (hero).
- Line-height generous (1.5 body, 1.1-1.2 hero).

## Spacing

8-pt grid. Section vertical rhythm 96-128px on desktop. Card padding 24-32px. Touch targets minimum 44x44px (NZ patient base skews older).

## Colour tokens

| Token | Hex | Usage |
|---|---|---|
| --bg-deep | `#050d1a` | Page background |
| --bg-card | `rgba(5,13,26,0.85)` | Card / nav backdrop |
| --glass | `rgba(255,255,255,0.05)` | Glass surfaces over hero |
| --border | `rgba(255,255,255,0.1)` | Default border on glass |
| --accent | `#0891b2` | Primary CTA, link, focus |
| --accent-hover | `#06b6d4` | Hover state |
| --safe | `#10b981` | "Available now" / verified-NZ markers |
| --warm | `#f59e0b` | Notice / heads-up state |
| --ink-100 | `#ffffff` | Primary text |
| --ink-70 | `rgba(255,255,255,0.7)` | Secondary text |
| --ink-40 | `rgba(255,255,255,0.4)` | Tertiary / captions |

## Layout patterns

- **Hero**: large H1, sub (one line), primary CTA, supporting trust cluster (MCNZ-registered, Auckland-based, NZ-trained, 10+ years).
- **Service grid**: 3-column responsive grid of cards — service name, price, "What you get" bullets, CTA.
- **Founder bio**: photo-left text-right at desktop, stacked on mobile. Small, warm, first-person.
- **Comparison table**: Connect Clinic vs walk-in clinic vs traditional GP enrolment — clear visual differentiation.
- **Testimonials**: 2-3 patient quotes, attributed (with consent), no stock photos.
- **FAQ accordion**: 5-7 most-asked questions before the booking CTA.
- **Footer**: minimal — clinic name, founder credentials, NZ Privacy Act note, contact email, Instagram link.

## Motion

Subtle. `transition: 0.2s ease` on hover. No big parallax. No animated hero gradient. Trust is built by stillness here, not by flourish. Booking flow uses a single fade-in.

## Anti-patterns (do not generate)

- Purple gradients
- Inter font (use Plus Jakarta Sans instead)
- Glass morphism over content (only over hero/decorative areas)
- Generic stethoscope/heart-monitor iconography
- "Trust badges" with fake awards
- Long bullet lists of benefits before the visitor sees what the service is
- Tropical / Pacific decoration as visual shorthand for "Pasifika-friendly" — the Pasifika layer comes through in copy and care, not in palm-leaf SVGs
- AI-generated team photos
- Lottie animations of cartoon doctors
