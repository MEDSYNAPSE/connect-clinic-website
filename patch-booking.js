const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// ── 1. Add bookingRef to Alpine data ─────────────────────────────────────────
html = html.replace(
  `  bookingService: '',
  submitted: false,`,
  `  bookingService: '',
  bookingRef: '',
  submitted: false,`
);

// ── 2. Update submitBooking — add ref generation + patient confirmation email ─
const OLD_SUBMIT = `      // 2. Also email via formsubmit as backup
      fetch('https://formsubmit.co/ajax/connectclinic@outlook.com', {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(d)
      });

      // 3. Set Stripe URL based on service selected
      this.stripeUrl = window._stripeLinks[d.service] || '';
      this.submitted = true;

      // 4. Auto-redirect to Stripe after 1.5s if we have a link
      if (this.stripeUrl) {
        setTimeout(() => { window.location.href = this.stripeUrl; }, 2000);
      }`;

const NEW_SUBMIT = `      // 2. Generate booking reference
      const ref = 'CC-' + Date.now().toString(36).toUpperCase();
      this.bookingRef = ref;

      // 3. Notify clinic via formsubmit
      fetch('https://formsubmit.co/ajax/connectclinic@outlook.com', {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({ ...d, booking_ref: ref, _subject: 'New booking request: ' + d.service })
      });

      // 4. Send patient confirmation email if they provided one
      if (d.email) {
        const patientName = ((d.first_name || '') + ' ' + (d.last_name || '')).trim() || 'Patient';
        fetch('https://formsubmit.co/ajax/' + d.email, {
          method: 'POST',
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          body: JSON.stringify({
            _subject: 'Connect Clinic — Booking Request Received (' + ref + ')',
            _template: 'table',
            name: patientName,
            booking_reference: ref,
            service_requested: d.service,
            next_step: 'Complete payment to confirm your appointment. Once payment is received, Dr Katoa will confirm your appointment time by email.',
            zoom_link: window._zoomLink,
            zoom_instructions: 'Your consultation will take place via Zoom video call. Click the link above at your appointment time. No download required — works in any browser.',
            contact: 'connectclinic@outlook.com | 09 873 5039 ext. 800',
          })
        });
      }

      // 5. Set Stripe URL based on service selected
      this.stripeUrl = window._stripeLinks[d.service] || '';
      this.submitted = true;`;

if (html.includes(OLD_SUBMIT)) {
  html = html.replace(OLD_SUBMIT, NEW_SUBMIT);
  console.log('Updated submitBooking');
} else {
  console.log('NOT FOUND: submitBooking block');
}

// ── 3. Update confirmation screen ────────────────────────────────────────────
const OLD_CONFIRM = `      <div x-show="submitted" class="bg-white/5 rounded-2xl border border-white/10 p-12 text-center">
        <div class="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Request received!</h3>
        <p class="text-gray-400 mb-4">One last step — pay now to secure your appointment. We'll confirm your time by email.</p>
        <a x-show="stripeUrl" :href="stripeUrl" class="inline-block bg-sky-500 hover:bg-sky-600 text-white font-bold px-8 py-3.5 rounded-xl transition text-base mb-4">
          Pay now to confirm
        </a>
        <p class="text-gray-400 text-sm">Can't pay now? Call us on <a href="tel:098735039" class="text-sky-600">09 873 5039 ext. 800</a></p>
      </div>`;

const NEW_CONFIRM = `      <div x-show="submitted" class="bg-white/5 rounded-2xl border border-white/10 p-10 text-center">
        <!-- Tick -->
        <div class="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg class="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-1">Request received!</h3>
        <p class="text-gray-500 text-sm mb-5" x-text="'Booking ref: ' + bookingRef"></p>

        <!-- Zoom info box -->
        <div class="bg-sky-950/60 border border-sky-500/30 rounded-xl p-5 mb-6 text-left">
          <div class="flex items-center gap-2 mb-2">
            <svg class="w-5 h-5 text-sky-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.9L15 14M4 8h8a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4a2 2 0 012-2z"/></svg>
            <span class="text-sm font-semibold text-sky-300">Your consultation will be via Zoom</span>
          </div>
          <p class="text-xs text-gray-400 mb-3">Once payment is confirmed, Dr Katoa will email you your appointment time. Join using the link below at that time — no download required.</p>
          <a :href="window._zoomLink" target="_blank" rel="noopener" class="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-5 py-2.5 rounded-lg transition text-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            Join Zoom consultation
          </a>
          <p class="text-xs text-gray-600 mt-2">Meeting ID: 596 611 1693</p>
        </div>

        <!-- Pay CTA -->
        <p class="text-gray-400 text-sm mb-4">Complete payment to lock in your time slot:</p>
        <a x-show="stripeUrl" :href="stripeUrl" target="_blank" class="inline-block bg-teal-500 hover:bg-teal-600 text-white font-bold px-8 py-3.5 rounded-xl transition text-base mb-4">
          Pay now to confirm appointment
        </a>
        <p x-show="!stripeUrl" class="text-gray-400 text-sm mb-4">We will email you a payment link shortly.</p>
        <p class="text-gray-500 text-xs">Questions? <a href="tel:098735039" class="text-sky-500">09 873 5039 ext. 800</a> or <a href="mailto:connectclinic@outlook.com" class="text-sky-500">connectclinic@outlook.com</a></p>
      </div>`;

if (html.includes(OLD_CONFIRM)) {
  html = html.replace(OLD_CONFIRM, NEW_CONFIRM);
  console.log('Updated confirmation screen');
} else {
  console.log('NOT FOUND: confirmation screen block');
}

// ── 4. Add ZOOM_LINK to config section ────────────────────────────────────────
html = html.replace(
  `    // ────────────────────────────────────────────────────────────────

    // Initialise Supabase client`,
  `    // 3. Zoom Personal Meeting Room
    const ZOOM_LINK = 'https://zoom.us/j/5966111693'; // PMI: 596 611 1693
    window._zoomLink = ZOOM_LINK;
    // ────────────────────────────────────────────────────────────────

    // Initialise Supabase client`
);
console.log('Added ZOOM_LINK config');

fs.writeFileSync('index.html', html);
console.log('\nAll booking patches applied.');
