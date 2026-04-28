# Connect Clinic — Hard Technical Review
**Reviewer:** Claude Code (Opus 4.7, 1M)
**Date:** 29 April 2026
**Scope:** index.html, patient-guide.html, admin.html, social.html, privacy.html, terms.html, 404.html, sitemap.xml, robots.txt
**Live URL inspected:** https://medsynapse.github.io/connect-clinic-website/

The site reads beautifully and the architecture (two-wing, evidence-driven, Pasifika-led) lands. But under the hood there are several Blocker-class issues that would actively damage trust if a funder or HRC reviewer spotted them on a single afternoon scroll. Most are 5- to 30-minute fixes.

---

## Blockers — fix this week (broken or harmful)

### B1. Bookings are not being saved anywhere
**File:** `index.html:2051-2052, 2075-2077`
**Problem:** `SUPABASE_URL` and `SUPABASE_ANON_KEY` are still string placeholders (`'YOUR_SUPABASE_URL'`). The runtime check on line 2075 means `window._sbClient` is never created — every booking submitted on the live site hits the `if (window._sbClient)` branch as false. Patient and booking inserts at `index.html:228-256` and the GP referral insert at `index.html:303-313` silently fail. Bookings only land in formsubmit.co email — no audit trail, no admin dashboard data, no consent record persisted. This contradicts the privacy policy which explicitly tells patients their bookings live in Supabase.
**Fix:** Replace the two constants with real Supabase project URL + anon key, then re-test a booking end-to-end. Until then, take the Supabase claim out of the privacy policy.

### B2. Stripe payment links are placeholders for the three flagship programmes
**File:** `index.html:2060-2067`
**Problem:** `Hauora Hinengaro 12-week programme — $420`, `Mate Huka 12-week programme — $480`, `Whakaora Wawe 12-week programme — $520`, `Acute Illness Review`, `Health Coaching session`, `Dietician Consultation`, and `Second Opinion / Condition Review` all map to `YOUR_STRIPE_LINK_*` strings. The filter at line 2082 strips these from `_stripeLinks`, so when a patient clicks "Start →" on a programme card (`:1251, :1277, :1303`), submits the form, and reaches the success screen, the Pay-now button is hidden and the fallback "We will email you a payment link shortly" is shown. The patient is left dangling. This is the primary commercial conversion path for the new programme positioning and it does not transact.
**Fix:** Create Stripe Payment Links for all seven services and paste the URLs in. Until they exist, hide the programme "Start →" buttons or route to a "contact us" instead.

### B3. Programme bookings cannot actually be made through the form
**File:** `index.html:1689-1698` (booking dropdown), `:1251, :1277, :1303` (programme CTA buttons)
**Problem:** The "Start →" buttons on the three 12-week programmes set `bookingService` to e.g. `'Hauora Hinengaro 12-week programme — $420'`. But the booking form's `<select name="service">` only contains 7 one-off-consult options — none of the programme strings are listed. Result: when a programme CTA fires, the dropdown displays nothing (the current value isn't a valid option), and on submit `d.service` is whatever the user picked or empty. Even if Supabase worked, the wrong service would be stored. This is the headline product on the homepage and it does not work.
**Fix:** Add `<option>Hauora Hinengaro 12-week programme — $420</option>` (and the other two programmes + Health Coaching) to the select at line 1689.

### B4. og:image is a 404 from the wrong GitHub user
**File:** `index.html:14`
**Problem:** `og:image` points to `https://kraftinacos.github.io/connect-clinic-website/assets/logo-full-dark.png` — that's not even the MEDSYNAPSE org. Curl confirms 404. There is no `assets/` directory anywhere in the repo. Result: every social-media share, Slack/iMessage/WhatsApp preview, LinkedIn card, and search-engine OG-card lookup gets a broken image. This is the FIRST thing anyone sees when the link is shared.
**Fix:** Add a real OG image at `/assets/og-image.png` (1200×630, brand-compliant) and update the URL to `https://connectclinic.co.nz/assets/og-image.png` (or the medsynapse.github.io path while DNS is stuck). Validate with the Facebook Sharing Debugger.

### B5. Canonical / domain references contradict each other across the site
**Files:** `index.html:11, 15, 24`, `sitemap.xml`, `robots.txt`, `privacy.html:9`, `terms.html:9`, `social.html:125+`
**Problem:** Three different "canonical" domains in use simultaneously:
  - `index.html:15` — `<link rel="canonical" href="https://connectclinic.nz" />` (no `co`)
  - `index.html:11` — `<meta property="og:url" content="https://connectclinic.co.nz" />`
  - `index.html:24` — JSON-LD url `"https://connectclinic.nz"`
  - `sitemap.xml` — all 9 URLs use `connectclinic.co.nz`
  - `robots.txt` — sitemap reference uses `connectclinic.nz`
  - `privacy.html:9` and `terms.html:9` — canonical uses `connectclinic.co.nz`
  - The CNAME file says `connectclinic.co.nz` (which is the actual registered domain — `connectclinic.nz` is a different TLD).
Both apex domains return connection-refused right now (DNS still pointing at the squatted GH Pages). Search engines will pick the wrong canonical, dilute SEO, and log JSON-LD errors.
**Fix:** Pick one canonical (`connectclinic.co.nz`) and replace everywhere. Update `index.html:15`, `index.html:24`, and `robots.txt` line 4 to use `co.nz`.

### B6. Admin dashboard is publicly accessible — no auth, only obscurity
**File:** `admin.html:124-128, 576-577`
**Problem:** The live URL `https://medsynapse.github.io/connect-clinic-website/admin.html` returns the admin UI directly. The only "protection" is a yellow banner saying "do not share this URL" and a `Disallow: /admin.html` in robots.txt. robots.txt is a request to crawlers, not access control. As soon as Supabase keys are pasted in (B1), this page will stream live patient bookings — names, emails, phones, addresses, medications, allergies, family history — to anyone who guesses the URL. That is a HIPC 2020 reportable breach the moment a real booking lands.
**Fix:** Move admin.html out of GitHub Pages entirely (host on Vercel/Cloudflare with SSO, or use Supabase Studio directly). At minimum, add Cloudflare Access / a Netlify password gate / an Edge Function check. Do not put the Supabase service-role key in this file — anon key + RLS only, with an authenticated `admin` role required to read `bookings`/`patients`.

### B7. Dietician service is still on the public site even though there's no dietician
**Files:** `index.html:923-927, 1696, 1811, 1891`, `social.html:7, 199`, `patient-guide.html:271, 740`
**Problem:** Pricing card says "Personalised dietary plan from our registered dietician" — Connect Clinic does not have a registered dietician on staff (the team is described elsewhere as "Dr Francis Katoa & Warren Aseloka — GP + Coach"). It's also a booking dropdown option (`:1696`), referral-form option (`:1811`), and a competitor-comparison row (`:1891`). Selling a phantom service is a Medical Council / HDC complaint waiting to happen, especially given Pasifika community trust positioning.
**Fix:** Delete every dietician reference until/unless an actual NZ-registered dietician is on the books. Replace the pricing card with the GP + Coach Mate Huka programme.

---

## High — fix before pushing to funders or community

### H1. Form labels are not associated with their inputs (WCAG 1.3.1 / 4.1.2 fail)
**File:** `index.html:1645-1726, 1783-1819`
**Problem:** 30 `<label>` elements, 0 `for=` attributes. Inputs have no `id`. Screen readers will announce "edit, blank" for every field on the booking and referral forms. Voice control software (Dragon, Voice Control) won't be able to target fields by name. WCAG AA fail.
**Fix:** Add `id="first_name"` etc. on each input and `for="first_name"` on the matching `<label>`, or wrap the input inside the `<label>` (the screening-question pattern at `:1574` already does this — copy that pattern to the booking and referral forms).

### H2. SVG icons have no accessible names — entire UI is a screen-reader vacuum
**File:** `index.html` (77 SVG instances; 0 `aria-label`, `<title>`, or `role="img"`)
**Problem:** Every nav SVG, every hero stat icon, every service-card icon, every footer credential badge — invisible to assistive tech. The site reads as a wall of unlabelled content. The hamburger button at `:357` has no `aria-label="Open menu"`. The decorative wave SVG at `:380` has no `aria-hidden="true"`.
**Fix:** Add `aria-hidden="true"` to purely decorative SVGs (the majority — wave, gradients, blob orbs, icon glyphs already next to text). Add `aria-label` or `<title>` to standalone interactive SVGs (hamburger, social/contact icons in the footer). Mark the screen-reader-only text where icons replace text (e.g. in the booking-CTA buttons).

### H3. Privacy policy mismatches reality and lacks consent capture
**Files:** `privacy.html:89`, `index.html:1731`
**Problem:** Privacy policy line 89 says bookings are stored in "Supabase (encrypted, EU-hosted by default; we are evaluating NZ-region options)". For HIPC 2020, Pasifika patient health data residency in EU is a flag — under data sovereignty principles it's actively contradictory to the policy's own Section 9 about Pacific data sovereignty. Booking form says only "By submitting you agree to our privacy policy" (`index.html:1731`) with no link to privacy.html, no checkbox, no record of consent in the form data. This is not informed consent under HIPC Rule 3 + 11.
**Fix:** Choose Supabase region `ap-southeast-2` (Sydney) — closest in-market — or self-host on Microsoft Azure NZ North. Update privacy.html accordingly. Add a required checkbox at `:1727` like `<label><input type="checkbox" required name="consent"> I have read the <a href="privacy.html">privacy policy</a> and consent to my information being collected and stored as described.</label>` and persist `consent_given_at` timestamp in the booking row.

### H4. Booking form has no rate limiting, no honeypot, no CAPTCHA
**File:** `index.html:1638-1732, 263-267`
**Problem:** Form posts directly to formsubmit.co (no rate limit, no spam protection) and to Supabase (anon key, presumably no RLS rate-limiting policy). A bot can hammer the endpoint and create thousands of fake bookings, flood `connectclinic@outlook.com` with referrals, and burn through Supabase free-tier quota. formsubmit.co is also infamously spam-prone — without their CAPTCHA mode enabled you'll get scraped emails into Russian spam lists within weeks.
**Fix:** Add a hidden honeypot input (`<input type="text" name="_honey" style="display:none">`); formsubmit.co reads this. Add formsubmit.co's `_captcha=true` field. Add a 30-second cooldown via Alpine state. On the Supabase side, add an RLS policy on `bookings` that limits inserts per IP / hour (use `pg_net` or a Postgres function on insert).

### H5. Trust-bar ticker is duplicated content (literal copy-paste, not animation seam)
**File:** `index.html:474-494`
**Problem:** The ticker uses a CSS `transform: translateX(-50%)` infinite-scroll trick, which requires the content to be duplicated exactly once. But the source duplicates 11 items twice, and the second copy stops at "FRNZCGP-qualified GP" (`:490`) — the second half is incomplete. Result: visible "jump" every loop on mobile and a screen-reader announcing the same 11 trust statements twice in a row, then 11 more partial.
**Fix:** Move the ticker items into a `<template x-for>` Alpine loop, or wrap them in a single `<div class="ticker-half">` that's `aria-hidden="true"` and JS-cloned for the seam. Also add `aria-hidden="true"` to the visual duplicate.

### H6. Hero "Two Pillars" CTA stack collapses awkwardly on small screens
**File:** `index.html:431-441`
**Problem:** Three buttons (`Book a consult — Care wing`, `Partner with us — Build & Research`, `Patient guide`) stacked `flex-col sm:flex-row` means at <640px width all three stack vertically with no visual hierarchy. The teal CTA, emerald CTA and ghost CTA are all `px-8 py-4` — same weight, same size, all equally loud. Mobile users see three identical-looking buttons.
**Fix:** Make the primary book CTA full-width and visually dominant on mobile; reduce the other two to text-link size. Also: on widths 640-1024 the three buttons wrap weirdly because `Patient guide` overflows. Use `flex-wrap` and explicit `min-w-0`.

### H7. Tailwind via CDN is render-blocking and 3MB+ on every page load
**File:** `index.html:56`, `patient-guide.html:8`, `admin.html`, `404.html:7`, `social.html` (no Tailwind), `privacy.html:10`, `terms.html:10`
**Problem:** `https://cdn.tailwindcss.com` runs a JIT compiler in the browser. ~300KB JS, blocks first paint, and every Tailwind class is recomputed on each page load. On a slow 4G connection in South Auckland this is a 2-3 second lighthouse penalty. PageSpeed will mark this site below 50 on mobile.
**Fix:** Move to a build step (Tailwind CLI → static `tailwind.css`) or at minimum self-host the JIT and add `tailwind.config = {...}` inline so the production build can be a stripped CSS file. Vercel/Netlify can do this in <10 minutes of setup. Failing that, at least add `defer` to non-critical scripts and preload the font.

### H8. Hero counter shows "5.0 average rating" with 6 fictional reviews
**File:** `index.html:783-887`
**Problem:** The testimonials section has 6 named patient quotes (Sarah T., Mele F., Aroha K., Tane R., James W., Lani V.) and a "5.0 average rating · NZ-wide patients" claim. If these aren't real verified testimonials you'll find yourself in front of the Advertising Standards Authority. NZ rules under the Therapeutic Products Act + ASA Therapeutic Code require testimonials to be genuine and verifiable. Funders and HRC reviewers will spot fictional patient quotes immediately.
**Fix:** Either replace with real verified testimonials (with first-name + initial consent on file), or remove the section entirely and replace with "Patient feedback coming soon" + the existing evidence section. This is non-optional before pitching HRC.

### H9. JSON-LD MedicalBusiness schema misses required address + omits the second physician
**File:** `index.html:18-55`
**Problem:** `MedicalBusiness` should include `address` (PostalAddress with streetAddress, addressLocality, addressRegion, postalCode, addressCountry) and `geo` for local-SEO. Footer has the address (26 Whakahui Lane, Mangere Bridge, Auckland 2022); JSON-LD does not. `physician` is a singleton, but Warren Aseloka is listed as `employee` not `physician` — that's correct, but `Person` for a non-regulated coach should use `jobTitle` "Health Coach" plus `worksFor` reference. `url` uses `connectclinic.nz` (B5). Also: `aggregateRating` is implied by the 5.0 stars on the page but not in the schema, so Google won't show stars in SERP.
**Fix:** Add the PostalAddress block; correct the `url`; remove the rating claim or add `aggregateRating` schema once H8 is resolved with real reviews. Validate with https://validator.schema.org/.

### H10. Sticky mobile CTA hides last 24px of content but no scroll-padding
**File:** `index.html:2037-2046`
**Problem:** Sticky bottom bar is ~76px tall on mobile but spacer is `h-24` (96px). That works for empty-end-of-page, but anchor-jump scroll lands content 96px above the sticky bar, hiding heading text behind it. `html { scroll-padding-bottom: 96px }` is missing.
**Fix:** Add `html { scroll-padding-bottom: 6rem; scroll-padding-top: 4rem }` to handle both sticky nav and sticky bottom CTA.

### H11. Patient guide has no SEO meta, no canonical, no og: tags
**File:** `patient-guide.html:1-10`
**Problem:** Just `<title>` and `<meta name="description">`. No `og:title`, `og:image`, `og:url`, no canonical link. Sitemap promises this URL with priority 0.7 but search engines will find a thin head and not surface it.
**Fix:** Copy the head pattern from `privacy.html:6-10` and add og: tags for shareability. Patient guide is one of the most-likely-to-be-shared pages.

### H12. social.html still lists the wrong positioning + dietician
**File:** `social.html:7, 196-200`
**Problem:** Description: "NZ telehealth GP. Book a consult from $35. Repeat scripts, sick notes, **Wegovy, dietician support**." This is the link-tree page (Instagram bio link). It contradicts the index.html positioning ("Pasifika preventive telehealth + research") and includes the phantom dietician (B7). The "Services available" grid lists Dietician $95.
**Fix:** Rewrite social.html for the new positioning. Add Hauora Hinengaro / Mate Huka / Whakaora Wawe to the services grid. Drop the dietician tile. Update the description tag.

---

## Medium — polish for the next round

### M1. x-cloak is used but never given a CSS rule
**File:** `index.html:1609`
**Problem:** Element has `x-cloak` but stylesheet has no `[x-cloak] { display: none }` rule. Result: on first paint, before Alpine hydrates, the failure-message div flashes for ~100-300ms even when no checkboxes are ticked.
**Fix:** Add `[x-cloak] { display: none !important }` to the embedded `<style>` block.

### M2. Duplicate SVG gradient IDs (`nb`, `na`, `fb`, `fa`) across the page
**File:** `index.html:334-335` (nav), `:1935-1936` (footer), and `404.html:15` (`lg`)
**Problem:** SVG `<defs>` `linearGradient id="nb"` is identical between nav and footer in both index.html and privacy.html/terms.html — but these are separate documents so OK there. Within `index.html`, nav uses `id="nb"`/`"na"` and footer uses `id="fb"`/`"fa"` (correctly different) — actually fine. The 404 page's `id="lg"` is fine too. But `id="lg1"` is used on `index.html:1852` without being defined anywhere — check Chrome DevTools, the comparison-table Connect Clinic logo SVG (`<rect fill="url(#lg1)">`) renders unfilled black.
**Fix:** Either define `<linearGradient id="lg1">` near `:1852` or change `fill="url(#lg1)"` to use one of the existing gradients (`nb`/`na`).

### M3. Footer "Incorporated 29 April 2026" date is today's date
**File:** `index.html:2026`, `privacy.html:53`, `terms.html:53`
**Problem:** Footer says "Incorporated 29 April 2026, Auckland NZ" — that's today. Privacy and terms both say "(NZBN to be confirmed)". If incorporation is genuinely today, fine, but the NZBN should be findable on Companies Office within 1-2 working days; if it isn't yet incorporated, "Incorporated 29 April 2026" is factually false.
**Fix:** Either confirm incorporation actually happened today and add the NZBN within a week, or change to "Connect Clinic Limited (in formation)". Funders will check Companies Office in their first hour of due diligence.

### M4. Booking confirmation flow leaks `window._zoomLink` whether or not payment is completed
**File:** `index.html:1750`
**Problem:** Once a patient submits the form, the confirmation screen unconditionally exposes the Zoom personal meeting room link `https://zoom.us/j/5966111693` and the meeting ID. There's no payment gate before the Zoom link is shown. Anyone can fill the form with a fake email, get the Zoom URL, and squat the doctor's PMI.
**Fix:** Show only "We'll email you the Zoom link once payment is confirmed" until Stripe webhook fires; or use unique Zoom Scheduler links per booking. PMI should never be public — Zoom's own guidance.

### M5. JSON-LD lists `medicalSpecialty: "General Practice"` twice
**File:** `index.html:27, 38`
**Problem:** `MedicalBusiness.medicalSpecialty` and `Physician.medicalSpecialty` both say "General Practice" — fine but redundant. Also the `availableService` array mixes specific service types ("Repeat Prescription") with programme-name strings ("Health Coaching") that don't match the on-page service list (no "Hauora Hinengaro" in the schema).
**Fix:** Update `availableService` to match the actual offering list and add `MedicalProcedure` types where applicable.

### M6. Alpine `x-data` bloat — 130-line object inline on `<body>`
**File:** `index.html:189-326`
**Problem:** The entire app state (greetings array, screen answers, screen-fail logic, two async submit handlers, Stripe URL mapping) is in one giant inline `x-data` blob. Hard to maintain, no syntax highlighting, hard to test. Also runs on every page render even though only the booking section needs `screenAnswers`/`submitBooking`.
**Fix:** Move the booking logic into a separate `Alpine.data('bookingForm', () => ({...}))` registered before `Alpine.start()`, and split greetings cycling into its own component. The patches in `patch-booking.js` look intended for this — but they're not loaded in the live HTML.

### M7. `patch-booking.js`, `patch-form.js`, `patch-enhance.js` are in the repo but never referenced
**Files:** root directory
**Problem:** Three patch JS files live in the repo (`patch-booking.js`, `patch-form.js`, `patch-enhance.js`) but `index.html` never `<script src="...">` them. They're either dead code or were intended to be loaded.
**Fix:** Either delete the patch files (or move to `_archive/`) or actually load them. Right now they're confusing — a future maintainer (or another agent) will assume they're live.

### M8. Google Fonts loaded twice (Plus Jakarta Sans + Inter)
**Files:** `index.html:59` (Jakarta), `social.html:8` (Inter), `404.html:8` (Jakarta), `privacy.html:11` (Jakarta), `terms.html:11` (Jakarta)
**Problem:** social.html uses Inter; everything else uses Plus Jakarta Sans. Brand inconsistency between the link-tree page and main site.
**Fix:** Standardise on Plus Jakarta Sans across all pages, including social.html.

### M9. Sitemap entries don't match the new architecture
**File:** `sitemap.xml`
**Problem:** Sitemap lists `#programs`, `#coach`, `#evidence`, `#apps`, `#commitment`, `#about`, `#book`. Missing the new wing anchors (`#care-wing`, `#build-wing`, `#research`, `#pillars`). Search engines won't index the new sections as deep links.
**Fix:** Add the four new anchors. Also remove the URL-fragment entries entirely if you want — Google ignores fragments in sitemaps anyway. Better to list real pages.

### M10. Robots.txt sitemap URL points to wrong domain
**File:** `robots.txt:5`
**Problem:** `Sitemap: https://connectclinic.nz/sitemap.xml` — wrong TLD (B5).
**Fix:** Change to `https://connectclinic.co.nz/sitemap.xml`.

### M11. Inline styles bypassing Tailwind (34 instances)
**File:** `index.html` various
**Problem:** 34 `style="..."` attributes inline (radial gradients, transforms, colour values, animations). Some are unavoidable (`stop-color` in SVG defs), but several could be Tailwind utilities. Hard to audit dark/light theme later if you ever add one.
**Fix:** Move ad-hoc gradients into named CSS classes in the `<style>` block. Less of a real problem; mostly a maintainability nag.

### M12. `select` dropdown options have no `value="..."` attributes
**File:** `index.html:1689-1698, 1809-1814`
**Problem:** Dropdowns send literal text including the em-dash `—` and dollar sign as the form value (`d.service = "Repeat Prescription — $35"`). When pricing changes (e.g. "$35" → "$40"), every Stripe link mapping breaks silently. Also problematic for analytics aggregation.
**Fix:** Use stable `value` attributes: `<option value="repeat-rx">Repeat Prescription — $35</option>` and key the Stripe map on the slug, not the price string.

### M13. JSON-LD lists Warren Aseloka but team page doesn't show his bio
**File:** `index.html:48-52` (schema mentions him), about section `:973-1040` (only Francis bio shown)
**Problem:** The "Meet Dr Francis Katoa & Warren Aseloka" heading is at line 977 but the bio text and credentials below only describe Dr Katoa. Warren is named in the heading but invisible on the page.
**Fix:** Add a Warren bio paragraph and a credential card or two. Otherwise change the heading to "Meet Dr Francis Katoa" until Warren's bio is ready.

### M14. Mobile menu has no close-button affordance
**File:** `index.html:357-360, 361-374`
**Problem:** Hamburger toggles `mobileMenu` but once open, the only way to close is to scroll up and tap the same button. No X icon swap, no esc-key handler, no click-outside-to-close.
**Fix:** Swap hamburger SVG for `X` when `mobileMenu` is true, and add `@keydown.escape.window="mobileMenu=false"` and `@click.outside="mobileMenu=false"`.

---

## Low — defer

### L1. `target="_blank"` without `rel="noopener"` on Stripe link
`index.html:1759` — minor security/perf, browsers now default to noopener anyway.

### L2. Trust ticker is decorative but not `aria-hidden`
`index.html:472-495` — read by screen readers as a stream of fragments. Tag the section `aria-hidden="true"`.

### L3. Hero greeting cycling has no `prefers-reduced-motion` guard
`index.html:415` — accessibility users with vestibular sensitivity have animation forced on them. Wrap in a media query.

### L4. Wave SVG animations run continuously, ~3-5% sustained CPU on low-end Android
`index.html:397-408` — pause when not in viewport; use `IntersectionObserver` to flip `animationPlayState`.

### L5. Plus Jakarta Sans loaded with 8 weights × italic — overkill
`index.html:59` — only 4 weights actually used. Drop italic and weights 300, 800.

### L6. FAQ "Can you prescribe medications?" answer mentions controlled substances vaguely
`index.html:1536` — terms.html is more specific. Sync the wording.

### L7. Duplicate "How we compare" comparison tables (Tend/CareHQ/The Doctors at `:1845` vs Traditional GP at `:694`)
Two adjacent comparison tables doing similar work. Consider merging or making them obviously distinct purposes.

### L8. Sticky nav `backdrop-filter` not supported in older Firefox
`index.html:85` — degrades to a non-blurred semi-transparent background, fine.

### L9. `opacity:0.04` tapa pattern at `:1175` may be invisible on dimmer monitors / sun-glare phones
Either bump to 0.06 or pin the opacity to a custom property for easy tuning.

### L10. Footer `&copy; 2026` will be wrong from 1 January 2027
`index.html:2030` — use a small JS injection or just commit to updating annually. Low priority.

### L11. Patient guide is 1,100 lines but not split into anchor-navigable chunks
`patient-guide.html` — long-form content with no in-page TOC. Add a sticky side-TOC.

### L12. `tabindex` not used for focus-trapping in modal-like screening flow
`index.html:1561+` — the screening "modal" is just a div toggle; users can tab past the disabled state. Low risk because it's not a true modal.

---

## Summary

- **Blockers: 7** (B1 Supabase placeholders, B2 Stripe placeholders, B3 programme-form mismatch, B4 og:image 404, B5 canonical chaos, B6 admin auth, B7 phantom dietician)
- **High: 12** (a11y, privacy, performance, content)
- **Medium: 14** (polish, code hygiene, SEO depth)
- **Low: 12** (defer)

The blockers are mostly small text edits in `index.html` plus one architectural decision (admin auth). A focused half-day fixes B1–B5 and B7. B6 is a half-day on its own.

The site is well-positioned, well-written, and aesthetically strong. It's also one weekend of fixes from being funder-ready. Right now it would likely embarrass on three counts: a broken og:image, fictional testimonials, and an unprotected admin URL.
