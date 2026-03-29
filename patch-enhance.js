/**
 * patch-enhance.js
 * Enhances the Connect Clinic index.html with:
 *   1. Replace existing ABOUT section with rich "Meet Dr Francis Katoa" section
 *   2. Insert TESTIMONIALS section before PRICING
 *   3. SEO meta tags + JSON-LD structured data
 *   4. Footer: add Quick Links column + emergency disclaimer
 *   5. Smooth scroll (already present — skip if exists)
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// ─── 1. REPLACE EXISTING ABOUT SECTION ────────────────────────────────────────
// The current about section runs from <!-- ABOUT --> to the closing </section>
// just before <!-- DIETICIAN -->

const OLD_ABOUT_START = `  <!-- ABOUT -->
  <section id="about" class="py-20 px-4 bg-[#050d1a]">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-14">
        <span class="section-label fade-up text-cyan-500">Our team</span>
        <h2 class="text-4xl font-bold mt-2 text-white">Real clinicians, NZ-wide</h2>
        <p class="text-gray-400 mt-3 max-w-xl mx-auto">Connect Clinic brings together a multi-disciplinary team of NZ-registered clinicians available across New Zealand.</p>
      </div>`;

const NEW_ABOUT_SECTION = `  <!-- ABOUT -->
  <section id="about" class="py-20 px-4 bg-[#030a15]">
    <div class="max-w-5xl mx-auto">
      <div class="mb-14">
        <span class="section-label fade-up text-cyan-500">Your doctor</span>
        <h2 class="text-4xl font-bold mt-2 text-white">Meet Dr Francis Katoa</h2>
      </div>
      <div class="grid md:grid-cols-2 gap-12 items-start">
        <!-- Left: bio text -->
        <div class="fade-up space-y-6">
          <p class="text-gray-300 leading-relaxed">Dr Francis Katoa is an FRNZCGP-qualified General Practitioner with experience across community health, telehealth, weight management, and Pasifika health. He is a Fellow of the Royal New Zealand College of General Practitioners and brings a genuine commitment to accessible, high-quality care for all New Zealanders.</p>
          <p class="text-gray-300 leading-relaxed">Connect Clinic was built on a simple idea: that every New Zealander deserves timely access to a real GP — without the wait, without the travel.</p>
          <blockquote class="border-l-4 border-cyan-500 pl-4 italic text-gray-300">
            "Healthcare should fit around your life, not the other way around."
            <span class="block not-italic font-semibold text-white mt-2 text-sm">— Dr Francis Katoa</span>
          </blockquote>
        </div>
        <!-- Right: credential cards -->
        <div class="fade-up delay-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
            <div class="w-9 h-9 bg-sky-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
            </div>
            <div>
              <div class="text-white font-bold text-sm">MBChB</div>
              <div class="text-gray-400 text-xs mt-0.5">Bachelor of Medicine and Surgery</div>
            </div>
          </div>
          <div class="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
            <div class="w-9 h-9 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <div>
              <div class="text-white font-bold text-sm">FRNZCGP</div>
              <div class="text-gray-400 text-xs mt-0.5">Fellow, Royal NZ College of General Practitioners</div>
            </div>
          </div>
          <div class="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
            <div class="w-9 h-9 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
            <div>
              <div class="text-white font-bold text-sm">MCNZ</div>
              <div class="text-gray-400 text-xs mt-0.5">Medical Council NZ, Full Registration (Active)</div>
            </div>
          </div>
          <div class="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
            <div class="w-9 h-9 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </div>
            <div>
              <div class="text-white font-bold text-sm">Pasifika Health</div>
              <div class="text-gray-400 text-xs mt-0.5">Pasifika NAC Representative, RNZCGP</div>
            </div>
          </div>
          <div class="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3 sm:col-span-2">
            <div class="w-9 h-9 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <div>
              <div class="text-white font-bold text-sm">Telehealth</div>
              <div class="text-gray-400 text-xs mt-0.5">NZ-registered, serving patients nationwide</div>
            </div>
          </div>
        </div>
      </div>`;

// Find the full old about section and replace
// It ends just before <!-- DIETICIAN -->
const aboutEndMarker = '\n\n  <!-- DIETICIAN -->';
const oldAboutIdx = html.indexOf('  <!-- ABOUT -->');
const dieticianIdx = html.indexOf('  <!-- DIETICIAN -->');

if (oldAboutIdx === -1 || dieticianIdx === -1) {
  console.error('ERROR: Could not find ABOUT or DIETICIAN markers');
  process.exit(1);
}

// Extract the old about section (from <!-- ABOUT --> up to but not including <!-- DIETICIAN -->)
const oldAboutSection = html.slice(oldAboutIdx, dieticianIdx);
html = html.slice(0, oldAboutIdx) + NEW_ABOUT_SECTION + '\n    </div>\n  </section>\n\n' + html.slice(dieticianIdx);

console.log('✓ Replaced ABOUT section with Dr Katoa bio');

// ─── 2. INSERT TESTIMONIALS BEFORE PRICING ────────────────────────────────────
const TESTIMONIALS_SECTION = `  <!-- TESTIMONIALS -->
  <section id="testimonials" class="py-20 px-4 bg-[#050d1a]">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-14">
        <span class="section-label fade-up text-cyan-500">Patient experiences</span>
        <h2 class="text-4xl font-bold mt-2 text-white">What patients are saying</h2>
      </div>
      <div class="grid md:grid-cols-3 gap-6">
        <!-- Card 1 -->
        <div class="fade-up bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
          <div class="text-amber-400 text-lg tracking-wide">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <p class="text-gray-300 leading-relaxed flex-1">"Finally a GP service that actually fits around my schedule. Had my prescription sorted in under an hour. Absolutely recommend."</p>
          <div>
            <div class="font-bold text-white text-sm">Sarah T.</div>
            <div class="text-gray-500 text-xs">Auckland</div>
          </div>
        </div>
        <!-- Card 2 -->
        <div class="fade-up delay-1 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
          <div class="text-amber-400 text-lg tracking-wide">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <p class="text-gray-300 leading-relaxed flex-1">"Dr Katoa was professional, thorough and actually listened. The Zoom call was easy to set up and my certificate was in my inbox straight after."</p>
          <div>
            <div class="font-bold text-white text-sm">Mele F.</div>
            <div class="text-gray-500 text-xs">South Auckland</div>
          </div>
        </div>
        <!-- Card 3 -->
        <div class="fade-up delay-2 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
          <div class="text-amber-400 text-lg tracking-wide">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <p class="text-gray-300 leading-relaxed flex-1">"Used Connect Clinic for a repeat prescription. Clear process, fast, and way cheaper than taking time off work to see someone in person."</p>
          <div>
            <div class="font-bold text-white text-sm">James W.</div>
            <div class="text-gray-500 text-xs">Wellington</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  `;

const pricingMarker = '<!-- PRICING -->';
if (!html.includes(pricingMarker)) {
  console.error('ERROR: Could not find PRICING comment marker');
  process.exit(1);
}
html = html.replace(pricingMarker, TESTIMONIALS_SECTION + pricingMarker);
console.log('✓ Inserted TESTIMONIALS section before PRICING');

// ─── 3. SEO META TAGS + JSON-LD ───────────────────────────────────────────────
const OG_URL_TAG = `  <meta property="og:url" content="https://connectclinic.co.nz" />`;
const SEO_ADDITIONS = `  <meta property="og:url" content="https://connectclinic.co.nz" />
  <meta name="keywords" content="telehealth GP New Zealand, online doctor NZ, repeat prescription online NZ, medical certificate online, Wegovy NZ, GLP-1 NZ, telehealth Auckland" />
  <meta name="author" content="Dr Francis Katoa, Connect Clinic" />
  <meta property="og:image" content="https://kraftinacos.github.io/connect-clinic-website/assets/logo-full-dark.png" />
  <link rel="canonical" href="https://connectclinic.nz" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Connect Clinic",
    "description": "Telehealth GP practice providing repeat prescriptions, medical certificates, and general health consultations across New Zealand.",
    "url": "https://connectclinic.nz",
    "telephone": "+6498735039",
    "email": "connectclinic@outlook.com",
    "medicalSpecialty": "General Practice",
    "availableService": ["Repeat Prescription", "Medical Certificate", "Telehealth Consultation", "Weight Management"],
    "areaServed": "New Zealand",
    "physician": {
      "@type": "Physician",
      "name": "Dr Francis Katoa",
      "medicalSpecialty": "General Practice",
      "hasCredential": ["MBChB", "FRNZCGP"]
    }
  }
  <\/script>`;

if (!html.includes(OG_URL_TAG)) {
  console.error('ERROR: Could not find og:url tag for SEO insertion');
  process.exit(1);
}
html = html.replace(OG_URL_TAG, SEO_ADDITIONS);
console.log('✓ Added SEO meta tags and JSON-LD structured data');

// ─── 4. FOOTER: Add Quick Links column + disclaimer ───────────────────────────
// Replace the current 3-column footer grid with a 4-column version that adds Quick Links
// Current second column is Services, third is Contact — insert Quick Links between them

const OLD_FOOTER_SERVICES_COL = `        <div>
          <h4 class="text-white font-semibold mb-3 text-sm">Services</h4>
          <ul class="space-y-1.5 text-sm">
            <li><a href="#book" class="hover:text-white transition">Repeat Prescriptions</a></li>
            <li><a href="#book" class="hover:text-white transition">Acute Illness</a></li>
            <li><a href="#book" class="hover:text-white transition">Medical Certificates</a></li>
            <li><a href="#book" class="hover:text-white transition">Wegovy Assessment</a></li>
            <li><a href="#dietician" class="hover:text-white transition">Dietician</a></li>
          </ul>
        </div>`;

const NEW_FOOTER_SERVICES_COL = `        <div>
          <h4 class="text-white font-semibold mb-3 text-sm">Services</h4>
          <ul class="space-y-1.5 text-sm">
            <li><a href="#book" class="hover:text-white transition">Repeat Prescriptions</a></li>
            <li><a href="#book" class="hover:text-white transition">Acute Illness</a></li>
            <li><a href="#book" class="hover:text-white transition">Medical Certificates</a></li>
            <li><a href="#book" class="hover:text-white transition">Wegovy Assessment</a></li>
            <li><a href="#dietician" class="hover:text-white transition">Dietician</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-3 text-sm">Quick Links</h4>
          <ul class="space-y-1.5 text-sm">
            <li><a href="#about" class="hover:text-white transition">About</a></li>
            <li><a href="patient-guide.html" class="hover:text-white transition">Patient Guide</a></li>
            <li><a href="#pricing" class="hover:text-white transition">Pricing</a></li>
            <li><a href="#testimonials" class="hover:text-white transition">Testimonials</a></li>
            <li><a href="#faq" class="hover:text-white transition">FAQ</a></li>
          </ul>
        </div>`;

if (!html.includes(OLD_FOOTER_SERVICES_COL)) {
  console.error('ERROR: Could not find footer Services column for replacement');
  process.exit(1);
}
html = html.replace(OLD_FOOTER_SERVICES_COL, NEW_FOOTER_SERVICES_COL);

// Update grid to md:grid-cols-4
html = html.replace(
  '<div class="grid md:grid-cols-3 gap-8 mb-8">',
  '<div class="grid md:grid-cols-4 gap-8 mb-8">'
);

// Update footer disclaimer
const OLD_DISCLAIMER = `        <p>NZ-registered medical practice. For emergencies call 111 or visit your nearest ED.</p>`;
const NEW_DISCLAIMER = `        <p>NZ-registered medical practice. For emergencies call 111 or visit your nearest ED.</p>
        <p class="mt-1 text-gray-600">Connect Clinic is a private telehealth service. Not a substitute for emergency care — call 111 in an emergency.</p>`;

html = html.replace(OLD_DISCLAIMER, NEW_DISCLAIMER);
console.log('✓ Updated footer with Quick Links column and disclaimer');

// ─── 5. SMOOTH SCROLL (already present — verify only) ─────────────────────────
if (html.includes('scroll-behavior: smooth')) {
  console.log('✓ Smooth scroll already present — no change needed');
} else {
  html = html.replace('</style>', '    html { scroll-behavior: smooth; }\n  </style>');
  console.log('✓ Added smooth scroll behaviour');
}

// ─── WRITE FILE ───────────────────────────────────────────────────────────────
fs.writeFileSync(filePath, html, 'utf8');
console.log('\nAll done. index.html has been updated.');
