const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// ── 1. Make allergies required + more prominent ───────────────────────────────
html = html.replace(
  `<label class="block text-sm font-medium text-gray-300 mb-1">Allergies <span class="text-gray-400 font-normal">(if any)</span></label>
            <input type="text" name="allergies" class="w-full border border-white/15 rounded-lg px-3 py-2.5 text-sm bg-white/8 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50" placeholder="e.g. penicillin" />`,
  `<label class="block text-sm font-medium text-gray-300 mb-1">Drug allergies <span class="text-red-400 font-normal text-xs">* required</span></label>
            <input type="text" name="allergies" required class="w-full border border-white/15 rounded-lg px-3 py-2.5 text-sm bg-white/8 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50" placeholder="e.g. penicillin, sulfa drugs — or write 'NKDA' if none known" />`
);

// ── 2. Make current medications required ─────────────────────────────────────
html = html.replace(
  `<label class="block text-sm font-medium text-gray-300 mb-1">Current medications <span class="text-gray-400 font-normal">(if any)</span></label>
            <input type="text" name="current_medications" class="w-full border border-white/15 rounded-lg px-3 py-2.5 text-sm bg-white/8 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50" placeholder="e.g. metformin 500mg, ramipril 5mg" />`,
  `<label class="block text-sm font-medium text-gray-300 mb-1">Current medications <span class="text-red-400 font-normal text-xs">* required</span></label>
            <input type="text" name="current_medications" required class="w-full border border-white/15 rounded-lg px-3 py-2.5 text-sm bg-white/8 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50" placeholder="e.g. metformin 500mg, ramipril 5mg — or write 'nil' if none" />`
);

// ── 3. Add family history + recent admissions after allergies field ───────────
html = html.replace(
  `<div class="mb-4">
            <label class="block text-sm font-medium text-gray-300 mb-1">Preferred pharmacy <span class="text-gray-400 font-normal">(for prescriptions)</span></label>`,
  `<div class="mb-4">
            <label class="block text-sm font-medium text-gray-300 mb-1">Relevant family history <span class="text-gray-400 font-normal">(optional)</span></label>
            <input type="text" name="family_history" class="w-full border border-white/15 rounded-lg px-3 py-2.5 text-sm bg-white/8 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50" placeholder="e.g. diabetes, heart disease, stroke, cancer in first-degree relatives" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-300 mb-1">Recent hospital admissions or procedures <span class="text-gray-400 font-normal">(last 12 months)</span></label>
            <input type="text" name="recent_admissions" class="w-full border border-white/15 rounded-lg px-3 py-2.5 text-sm bg-white/8 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50" placeholder="e.g. admitted Middlemore March 2026 for chest pain, or 'nil'" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-300 mb-1">Preferred pharmacy <span class="text-gray-400 font-normal">(for prescriptions)</span></label>`
);

// ── 4. Add family history + recent admissions to Supabase booking insert ──────
html = html.replace(
  `          referral_code: d.referral_code || null,
          source: 'website',`,
  `          referral_code: d.referral_code || null,
          family_history: d.family_history || null,
          recent_admissions: d.recent_admissions || null,
          source: 'website',`
);

// ── 5. Strengthen opioid screening label ─────────────────────────────────────
html = html.replace(
  `I am seeking a prescription for a <strong>controlled drug</strong> (opioid painkillers, benzodiazepines, stimulants such as Ritalin)`,
  `I am seeking a prescription for a <strong>controlled drug</strong> — opioid painkillers (tramadol, codeine, morphine, oxycodone), benzodiazepines (diazepam, clonazepam), or stimulants (Ritalin, Adderall)`
);

fs.writeFileSync('index.html', html);
console.log('Form patches applied.');
