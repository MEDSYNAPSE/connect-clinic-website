# Connect Clinic

**One-line:** NZ-registered GP-led telehealth practice based in Auckland — see a doctor today from your phone for repeat prescriptions, medical certificates, Wegovy assessments, and general care.

## Customer

**Primary:** NZ adults (18+) who need access to a GP today and either:
- can't get a same-day in-person appointment with their usual GP
- prefer telehealth for convenience or privacy
- need a one-off (script, certificate, weight-loss assessment, lab review) without enrolling

**Secondary:** Pasifika and Māori patients who need culturally safe primary care with a GP who understands fa'asāmoa, faka-Tonga, and the realities of working-class NZ life.

**Not the customer:** Patients with complex multi-morbid disease who need a long-term enrolled GP relationship — they should enrol with a face-to-face practice.

## Visitor mindset on landing

"I need to see a doctor. Today. Will this work for what I want? Is it real, is it safe, is it fast?"

The visitor wants the answer to those four questions in under 30 seconds, then a clear path to a booking. Not a corporate brochure. Not a 5-minute scroll.

## Primary CTA

**"Book a consult now"** → opens the booking flow (Cal.com integration), shows next available slot, leads to checkout.

## Secondary CTAs

- "What can a GP help with?" → service list
- "How does it work?" → patient guide
- "Read patient stories" → testimonials

## Voice

Warm, direct, no medical jargon. First-person from Dr Francis Katoa where it's natural. Short sentences. Generous spacing. Pacific identity is real but not performative.

## Brand markers

- **Founder:** Dr Francis Katoa — NZ-Tongan GP, FRNZCGP, 10+ years' experience, registered with MCNZ.
- **Site:** connectclinic.nz (CNAME on this repo). GitHub Pages, single-page HTML.
- **Booking:** Cal.com embed, Stripe checkout for payment.

## Scope of this site

- **index.html** — main landing page (services, founder bio, testimonials, comparison table, CTA)
- **patient-guide.html** — how-to / FAQ for first-time telehealth patients
- **admin.html** — internal booking dashboard (private, not linked publicly)
- **social.html** — link-tree for Instagram bio
- **404.html** — not-found page

Static. No backend except Cal.com + Stripe + a Supabase booking log (see `supabase-schema.sql`). Optimised for fast load over patchy NZ mobile data.

## Anti-patterns to avoid

- Generic "Hero ipsum" stock photos
- Long pricing/feature tables before the visitor knows whether the service applies to them
- Healthcare-corporate visual register (overused stethoscope, blue gradient overload, smiling-doctor-stock-photo)
- Ambiguous CTAs ("Learn more", "Get started" with no destination)
- Privacy-policy lawyer-speak in body content

## What "good design" looks like for this site

A patient lands, in 5 seconds knows it's a real NZ GP practice, in 15 seconds sees the price and what's included, in 30 seconds clicks Book. Trust is built by clarity, not by visual flourish. Pasifika identity shows up in language choice and care, not in tropical decoration.
