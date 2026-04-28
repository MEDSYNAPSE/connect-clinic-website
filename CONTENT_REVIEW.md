# Connect Clinic + Mahino — Content Review

**Reviewed:** 2026-04-29
**Scope:** `index.html`, `privacy.html`, `terms.html`, `patient-guide.html`; Mahino app `Views/*.swift` and `Data/medications.json`.
**Voice rules:** direct, warm, concise; no superlatives; no em-dashes (— banned by Francis); en-dashes ok; Pacific concepts unitalicised.

---

## Summary numbers

| File | Em-dashes (raw count) | Em-dashes in user-visible copy |
|---|---|---|
| `index.html` | 82 | ~70 (excluding Stripe/JS keys, comments) |
| `patient-guide.html` | 33 | 32 |
| `terms.html` | 8 | 8 |
| `privacy.html` | 4 | 4 |
| `Views/DisclaimerView.swift` | 1 | **1 (in primary CTA)** |
| `Views/MedicationDetailView.swift` | 1 | 1 |
| `Views/SettingsView.swift` | 1 | 1 |
| `Data/medications.json` | 141 | 141 (every medication entry) |
| **Total user-visible** | | **~260+** |

Reviewed flag in `medications.json`: 41 entries `reviewed: true` (all English), 82 entries `reviewed: false` (every Tongan and Samoan entry). Nothing has had fluent-speaker review.

---

## 1. Voice / fluff

The site has at least three voices stitched together: a confident Pacific-GP voice, a marketing/agency voice, and a corporate-legal voice. The funder-facing copy is the strongest. The patient-facing pricing/comparison sections drift into hollow superlatives.

| File:line | Offending text | Why | Suggested rewrite |
|---|---|---|---|
| `index.html:7` (meta) | "A clinic that ships software. Care wing: Pacific GP + health coach for mental wellbeing, lifestyle, early intervention. Build & Research wing..." | Reads like a pitch deck, not a meta description. Shows up in Google snippet. | "Pacific-led telehealth GP and health coach in Aotearoa NZ. 12-week programmes for mental wellbeing, diabetes, and early intervention. Apps and research alongside." |
| `index.html:425-427` | "Healthcare that catches / things early." | Sticky enough but vague. Acceptable; see Tagline section below. | Keep, but pair with one concrete example below it. |
| `index.html:504` | "Connect Clinic runs as two wings. Care sees patients. Build & Research ships apps and runs trials. They feed each other — better evidence, better care." | "Better evidence, better care" is the exact phrase every health-tech startup uses. Hollow. | "Care sees patients. Build & Research ships apps and runs trials. What we learn in clinic shapes what we build. What we build goes back into clinic." |
| `index.html:534` | "A clinic that ships software. Patient-facing apps in Pacific languages, Pacific-led research partnerships, and a funding pipeline that turns evidence into reach. Not vapourware — already shipping." | "Not vapourware" is defensive; raises the question. Strong but a bit chest-puffy. | "Apps in Pacific languages, Pacific-led research partnerships, and a funding pipeline. Mahino is on TestFlight; Talanoa shipped." |
| `index.html:622-624` | "From your couch to clinical outcome. Three steps. No waiting rooms. No travel." | "Clinical outcome" is jargon that lands cold. | "From your couch, sorted. Three steps. No waiting room. No travel." |
| `index.html:689-691` | "Why patients choose telehealth. A real GP, without the wait. Here's how Connect Clinic compares." | Generic. | "Why telehealth works. Same GP. No waiting room. Here's how it stacks up." |
| `index.html:775` | "Real patients. Real results." | Pure marketing-ese. Funders will roll eyes. | "What patients say." (Then leave testimonials to do the work.) |
| `index.html:898` | "Simple, upfront fees" | Boilerplate. | "Fees, plain." |
| `index.html:983` | "He is a Fellow of the Royal New Zealand College of General Practitioners and brings a genuine commitment to accessible, high-quality care for all New Zealanders." | "Genuine commitment to accessible, high-quality care" is corporate filler. | "FRNZCGP. Auckland-based. Tongan." (Then keep the next sentence.) |
| `index.html:1051` | "A doctor diagnoses. A coach helps you change." | Strong. Keep. |  |
| `index.html:1330` | "We don't just see patients. We build for them." | "Don't just X. We Y." formula is overused but lands here. Borderline keep. | Optional: "We see patients. We also build for them." |
| `index.html:1404` | "We don't just deliver care. We measure it, write it up, and share what works. Funders see the same dashboard we do." | Second use of "we don't just X." pattern. Drop the second one. | "We measure care, write it up, share what works. Funders see the dashboard we use." |
| `index.html:1843` | "Same NZ-registered doctors. Better value." | "Better value" is car-yard talk. | "Same NZ-registered doctors. Lower fees." |
| `index.html:1949` | "A clinic that ships software. Pacific GP + Coach telehealth, plus apps and research. Two wings, one mission — Pasifika and Māori health equity. Auckland-based, serving NZ-wide." | "One mission" is a mission-statement tic. Em-dash hits twice. | "A clinic that ships software. Pacific GP + Coach telehealth, plus apps and research. Auckland-based, serving NZ-wide. Built around Pasifika and Māori health equity." |
| `patient-guide.html:1110` | "Book a consultation - from $35" (sticky CTA) | Hyphen used as separator; inconsistent with rest of site that uses em-dash. Pick one and use en-dash everywhere. | "Book a consultation – from $35" (en-dash) or "Book a consultation. From $35." |
| `index.html:444-466` | Hero stats "GP + Coach / 3 langs / FRNZCGP / NZ-wide / from $35" | Five stats is too many for a hero. "3 langs" is jarring abbreviation. | Drop to three: "FRNZCGP", "3 languages: English, Tongan, Sāmoan", "From $35." |

---

## 2. Em-dash hits in user-visible copy

Replace every em-dash (—) with: en-dash (–), comma, full stop, or rewrite. Listed in order of impact. **App copy is the highest-priority fix** because it's literally the first button a patient taps.

### App (Mahino)

| File:line | Text | Suggested fix |
|---|---|---|
| `Views/DisclaimerView.swift:63` | `Text("I understand — let's go")` | `Text("I understand. Let's go.")` |
| `Views/MedicationDetailView.swift:202` | `"Information only — not medical advice. Always check with your GP, nurse, or pharmacist."` | `"Information only, not medical advice. Always check with your GP, nurse, or pharmacist."` |
| `Views/SettingsView.swift:23` | `"Draft translations — fluent-speaker review pending"` | `"Draft translations. Fluent-speaker review pending."` |

### Mahino medications.json (141 em-dashes across all entries)

Pattern is consistent across every entry. Search/replace the literal em-dash with en-dash or comma. Every Tongan and Samoan side mirrors the English structure, so the fix is mechanical. Examples:

| File:line | Text | Fix |
|---|---|---|
| `medications.json:17` | `"Loose tummy or feeling sick — usually settles after a week"` | `"Loose tummy or feeling sick. Usually settles after a week."` |
| `medications.json:32` | `"Manava-fa'ele pe ongo'i puke — 'oku 'osi 'i he uike 'e taha"` | `"Manava-fa'ele pe ongo'i puke. 'Oku 'osi 'i he uike 'e taha."` |
| `medications.json:79` | `"Strong muscle pain or weakness — especially with dark pee"` | Replace — with a full stop and split, or with a comma. |
| `medications.json:129` | `"... Stand up slowly the first few days — it can make you dizzy."` | Use full stop. |
| `medications.json:242` | `"Swallow whole — don't crush or chew."` | `"Swallow whole. Don't crush or chew."` |
| `medications.json:354` | `"... extra fluid — used for swelling and heart failure."` | Comma or full stop. |

Recommend a one-line sed sweep on `medications.json` (replace `" — "` with `". "`) reviewed by eye before commit. Don't run blindly — a few mid-sentence dashes need commas instead.

### Website (full list)

#### `index.html` user-visible em-dashes (line numbers)

`6, 8, 214, 218, 276, 283, 363, 368, 422, 429, 433, 436, 476, 478, 486, 488, 504, 534, 536, 559, 568, 573, 577, 586, 591, 595, 600, 604, 636, 653, 727, 732, 956, 984, 987, 1052, 1056, 1059, 1060, 1071, 1079, 1107, 1144, 1197, 1210, 1239, 1251, 1264, 1277, 1291, 1303, 1309, 1346, 1365, 1393, 1504, 1520, 1528, 1596, 1621, 1691-1697 (form options), 1706, 1710, 1749, 1949`

Highest priority (the ones a patient sees first):

| Line | Text | Fix |
|---|---|---|
| `index.html:422` | "Pasifika & Māori preventive telehealth — GP + coach" | "Pasifika & Māori preventive telehealth. GP + coach." |
| `index.html:429` | "...lifestyle, and early intervention — in English, Lea Faka-Tonga, or Gagana Sāmoa." | "...lifestyle, and early intervention. Available in English, Lea Faka-Tonga, or Gagana Sāmoa." |
| `index.html:433` | "Book a consult — Care wing" | "Book a consult · Care wing" (or just "Book a consult") |
| `index.html:436` | "Partner with us — Build & Research" | "Partner with us · Build & Research" |
| `index.html:476-492` (trust ticker) | "Te Tiriti partnership — tino rangatiratanga over your health" | "Te Tiriti partnership: tino rangatiratanga over your health" |
| `index.html:984` | "... a real GP — without the wait, without the travel." | "... a real GP. No wait, no travel." |
| `index.html:987` | "— Dr Francis Katoa" (blockquote attribution) | "Dr Francis Katoa" (en-dash or no dash; em-dash here is the *one* place style guides allow it but Francis's rule is no em-dashes) |
| `index.html:1107, 1144, 1197, 1210` | "Te Mana Ola — Pacific Health Strategy", "Hauora — full health", etc. | Use en-dash (–) or colon (:). |
| `index.html:1264` | "Sugar sickness — diabetes & pre-diabetes" | "Sugar sickness: diabetes and pre-diabetes" |
| `index.html:1596` (screening checkbox) | "...controlled drug — opioids (...), benzodiazepines (...), or stimulants (...)" | "...controlled drug: opioids (...), benzodiazepines (...), or stimulants (...)." |
| `index.html:1691-1697` (booking <option>) | "Repeat Prescription — $35" through "Second Opinion / Condition Review — $85" | Use en-dash: "Repeat Prescription – $35" |
| `index.html:1706, 1710` (placeholders) | "e.g. metformin 500mg, ramipril 5mg — or write 'nil' if none" | "e.g. metformin 500mg, ramipril 5mg. Or write 'nil' if none." |
| `index.html:2057-2067` (Stripe link keys) | All keys contain " — $XX" | These are object keys — keep them as-is **only** if you're sure the live form-option strings match. Currently they do. If you change the option strings (above), update the keys here in lockstep or every payment will fail. |

#### `patient-guide.html` em-dashes (33 hits)

Lines: `6, 295, 299, 303 (twice), 307, 311, 345, 383, 401, 428, 437, 461, 501, 511, 539, 549, 566, 567, 568, 569, 657, 667, 713, 772, 806, 816, 845, 860, 886, 908, 1032, 1034, 1084`

Highest patient impact:
- `:295, 299, 303, 307, 311` — emergency/exclusion bullets all use em-dashes. Replace with colons. These are scary-context already; em-dash adds nothing.
- `:383, 428, 511, 549, 657, 667` — step-by-step instructions. Replace with full stops.
- `:1084` — the interactive checklist victory state: `'✓ All ready — let\'s go!'`. Same structure as Mahino's disclaimer button. Use full stop.

#### `terms.html` (8 hits)

Lines: `6, 7, 59, 60, 75, 76, 97, 110`. Mostly bullet-list explanations ("call 111 — emergency"). Replace with colons.

#### `privacy.html` (4 hits)

Lines: `6, 7, 72, 110`. Same pattern.

---

## 3. Cultural authenticity flags

The Pacific/Māori usage on the site is mostly *good* — Pacific concepts are unitalicised, te reo phrases are functional, and the team genuinely is Pacific-led. But there are some misuses that will jar a Pacific or Māori reader, and a couple of decoration-only uses.

### Cringe / decoration

| File:line | Text | Issue | Fix |
|---|---|---|---|
| `index.html:1170-1175` | SVG `<pattern id="tapa">` — "siapo/tapa motif" comment | The shape rendered (concentric diamond + dot) is **not** siapo/tapa. It's a generic geometric. Calling it siapo in the comment is fine for code, but if anyone Pasifika reads the source they'll wince. | Either commission a real motif or drop the "siapo/tapa" framing in the comment. |
| `index.html:194-196` | Greetings rotation: "Kia ora / Mālō e lelei / Tālofa lava / Kia orana / Mauri" | Kia orana is Cook Islands; Mauri is Kiribati. Whose Mauri though? It can also be a Māori greeting (older/dialect). If you mean i-Kiribati, label it. The current rotation is **good** — it's the diversity of Pacific NZ. | Add a quiet caption underneath in the source: "Greetings from across Te Moananui-a-Kiwa." |
| `index.html:1107` | "Te Mana Ola — Pacific Health Strategy, MoH 2023" | The actual document title is "Te Mana Ola: The Pacific Health Strategy". Use the colon, official title. |  |
| `index.html:1144` | "...the three groups traditional services miss." | "Traditional" here means "mainstream/Western". Misleading word choice in a Pacific/Māori context where "traditional" usually means cultural. | Replace "traditional services" with "mainstream services". |
| `index.html:1156` | "Whānau Ora" panel: "Whānau-led, outcome-funded. Pacific Whānau Ora (Cause Collective) commissions providers like us." | "Cause Collective commissions providers like us" — Connect Clinic isn't a commissioned provider yet. This claims a relationship that doesn't exist. | "Pacific Whānau Ora (Cause Collective) is a commissioning agency we're aligning with." |
| `index.html:1183` | "We honour Te Tiriti o Waitangi as the foundation of healthcare in Aotearoa. We work in partnership with iwi, hapū, and Pacific community providers. We hold ourselves accountable..." | "Work in partnership with iwi, hapū" — name them, or soften. As a solo-GP outfit, an unqualified claim of iwi/hapū partnership is overreach. | "We honour Te Tiriti o Waitangi. We work alongside iwi, hapū, and Pacific community providers wherever the work intersects, and we want to do more of that." |
| `index.html:1473` | "Talanoa anytime." | Good usage. Keep. |  |
| `index.html:1483` | "Mana whenua & Pacific community partnerships shape what we build." | Same overreach as :1183. Are there specific mana whenua partnerships? If yes, name them. If not, soften. | "Mana whenua and Pacific community input shapes what we build" — and only say this once you have specific partnerships to point at. |
| `Views/HomeView.swift:142-144` | Greetings: "Kia ora", "Mālō e lelei", "Tālofa lava" — all correctly diacriticised. Subtitle "Ko e hā 'i ho tohi-faito'o?" / "O le ā i lau tusi-talavai?" | Good. Native-speaker review still recommended. The fakauʻa/ʻokina is correct in "ko e hā". |  |
| `Views/DisclaimerView.swift:47` | "English, Lea Faka-Tonga, Gagana Sāmoa" | Correct. Keep. |  |

### Hauora reference

`index.html:1210` "Hauora — full health" with Te Whare Tapa Whā framing is correct and respectful. Keep. Replace em-dash with colon though.

### Fonofale + Te Whare Tapa Whā

`index.html:1239` "Pacific and Māori frameworks (Fonofale, Te Whare Tapa Whā) built in." This is the right register. Keep.

---

## 4. Translation quality risk (medications.json)

Every Tongan and Samoan entry is `reviewed: false`. The app honestly flags this with a banner ("Draft translation — Awaiting fluent-speaker review") which is the right move. But shipping non-reviewed health translations is risky even with the disclaimer. Some specific risk areas spotted:

### Tongan — likely AI-translation tells

| File:line | Text | Concern |
|---|---|---|
| `medications.json:30` | `"Folo ka 'oua na'a kalasi 'a e tablet 'oku tukuange fakatuotuai."` | "kalasi" is a transliteration of "crush" (English borrowed). The Tongan would more likely be "momosi" or "fakapikipiki ki he kelekele" (mash). "kalasi" reads as English-via-Tongan. Diacritics on **fakatuotuai** look correct (no kahakō needed there); but **māmālie** (line 144) and **fakamānifi** (line 427+) have correct kahakō, while many other long-vowel words do not. Inconsistent diacritic application is the strongest AI-translation tell here. |
| `medications.json:32` | `"Manava-fa'ele pe ongo'i puke"` | "Manava-fa'ele" literally translates as "stomach-give birth"; the medical idiom for "loose tummy/diarrhoea" in Tongan is closer to "manava holo" or "mole 'a e kete". Likely AI artefact. |
| `medications.json:599` | `"Lulu. Mānava 'atu. Lomi tu'o taha pea mānava māmālie ki loto. Tauhi 'a e mānava sekoni 'e 10. Fakangaue'aki ha spacer kapau 'oku 'i ai."` | Loanword overuse (`spacer`, `tablet`, `sekoni`) is unavoidable for clinical content but `Tauhi 'a e mānava` ("hold the breath") for "hold breath 10 seconds" is a literal calque. A native speaker would likely use `Taʻofi 'a e mānava`. |
| `medications.json:655` | `"Fufulu ho ngutu hili 'a e fakangaue'aki — ke ta'ofi 'a e thrush."` | Correct apostrophes and structure but "fakangaue'aki" should be "fakaʻaongaʻi" in standard Tongan orthography for "use/apply". Inconsistency between **fakangaue'aki** (lines 599, 663, 665, 712, 727, 736) and any **fakaʻaongaʻi** uses suggests one or the other was AI-chosen. |
| `medications.json:606` | `"Fiema'u 'i he toe vahevahe ange 'i he houa 'e 4"` | Translates as "needed in the dividing more in 4 hours". The English source is "Needing it more than every 4 hours" — the Tongan loses the comparison. |

### Samoan — likely AI-translation tells

| File:line | Text | Concern |
|---|---|---|
| `medications.json:44` | `"E fa'aitiitia le suka i lou toto. E fa'aaogaina mo le ma'i suka type 2."` | Good register. **fa'aaogaina** uses the correct ʻ apostrophe but elsewhere on the same file `fa'aaoga` appears without the second ʻ before the final `a`. Inconsistent. |
| `medications.json:47` | `"Manava-fa'aali pe lagona le ma'i — masani lava e mou atu pe a uma le vaiaso"` | "Manava-fa'aali" is "loose stomach" but the standard Samoan term for diarrhoea is **manavasēsē** or **manava sasala**. AI calque. |
| `medications.json:159` | `"Tasi le fualaau i le aso, tutusa le taimi i aso uma. Tu'u i luga lemu i nai aso muamua — e mafai ona niniva."` | Reasonable. "tu'u i luga lemu" for "stand up slowly" is fine. |
| `medications.json:614` | `"Fa'aaoga se spacer pe afai e maua se tasi."` | OK. Loanword `spacer` unavoidable. |
| `medications.json:1352` | `"E fa'aaoga i nisi taimi mo le moe."` | "Sometimes used for sleep" — clinically dangerous if the medication is e.g. quetiapine being used off-label. Check that the English source matches the clinical intent and the Samoan is not implying recreational use. |
| `medications.json:2149` | `"Ose vailaau (antibiotic). E masani ona fa'aaogaina mo ma'i pipisi i le ala mimi (UTI)."` | "Ose vailaau" reads weakly. "Vailaau e fa'amau ai siama" is more idiomatic for "antibiotic". |

### Diacritic inconsistency (the strongest AI tell)

| Word | Standard form | Found as |
|---|---|---|
| Tongan: faka'aonga'i | faka'aonga'i (or fakaʻaongaʻi) | "fakangaue'aki" used throughout — different verb |
| Tongan: faka'ataa / fakatuotuai | fakatuotuai (slow-release) — needs no macron | Used correctly on line 30 |
| Tongan: māmālie | māmālie (slowly) | Correct on lines 144, 599, 1619 |
| Tongan: mānava | mānava (breath) | Correct on lines 598-608 |
| Samoan: faʻaaogāina | with macron on second ā | Without macron throughout |
| Samoan: manavasēsē | with macron | Not used; replaced with calques |

**Recommendation:** before launch, get a fluent Tongan speaker (Pasifika Medical Association has a list) and a fluent Samoan speaker to spot-review at least the top 20 medications. The current "Draft translation" banner is good practice but if a kuia mistakes **"go to ED"** because the calque is unclear, it's a clinical risk. Until reviewed, consider locking the language picker to English and showing Tongan/Samoan only after review. Or at minimum, make the draft banner louder (red, persistent, not collapsible).

---

## 5. Funder credibility flags

Funders (HRC, Foundation North, Te Whatu Ora PPDF, Cause Collective) read this stuff line by line. Here's what an HRC peer reviewer or Foundation North programme officer would flag:

| File:line | Claim | Issue | Fix |
|---|---|---|---|
| `index.html:1118` | "~15% of Pasifika adults vs ~5% of all New Zealanders" T2DM | Cite the source properly. "BMC Health Services Research 2022" without title or authors is uncheckable. | "Penny et al, BMC Health Services Research 2022 (full citation in references)" — add a /references page. |
| `index.html:1119` | "Lifestyle change with a coach prevents up to 58% of new cases (DPP, NEJM)." | DPP showed 58% over 3 years in a non-Pacific US cohort. Saying "with a coach" is a stretch — DPP was a structured 16-session lifestyle intervention with a lifestyle coach. The 58% figure is real but the gloss "with a coach" oversimplifies. A reviewer will flag this. | "DPP showed 58% reduction in new T2DM at 3 years with structured lifestyle coaching (Knowler et al, NEJM 2002). We're applying this model to Pacific whānau in NZ." |
| `index.html:1131` | "Health & Independence Report, MoH 2024 · Te Tumu Waiora evaluation, Te Pou" | Te Tumu Waiora has been evaluated multiple times. Cite year. The 35% multimorbidity stat needs a specific source. | Pull the actual stat reference. If it's from MoH 2024 H&I Report, give a page number on the references page. |
| `index.html:1067` | "58% T2DM risk reduction with structured coaching (DPP, NEJM 2002)" | Same issue as above; here it's punchy enough but "structured coaching" is shorthand. OK if the audience is patient-facing — but this card is sandwiched between funder-facing content. |  |
| `index.html:1069-1072` | "3× Pacific NZ T2DM rate vs European" | Actual figure is closer to 2.5–3× depending on age band. Source? | Cite Ministry of Health 2024 or Penney 2022. |
| `index.html:1078-1079` | "2.4× Māori suicide rate vs non-Māori — where early intervention matters" | The 2.4× is roughly right (recent Coronial data). But if you're going to use Māori suicide stats, name the source and the year. Funders will want this checked. | "Māori suicide rate ~2× non-Māori (NZ Suicide Prevention Office 2023)." |
| `index.html:1182-1184` | "Connect Clinic exists because Pacific and Māori whānau in Aotearoa have been told to fit into a system that wasn't designed around them." | Strong, defensible. Keep. |  |
| `index.html:1226` | "Three pathways. Each one pairs a GP for the clinical work with a coach for the day-to-day. Outcomes tracked, reported back to whānau, designed with Pacific and Māori in mind from day one." | "Designed with Pacific and Māori in mind from day one" — was there formal co-design? With whom? If yes, name them. If no, soften to "by Pacific and Māori clinicians". | Specify the co-design partners. Otherwise: "designed by a Pacific GP-coach pair with input from..." |
| `index.html:1244` | Hauora Hinengaro: "Tools: 1737 integration, Malo CBT app pilot" | "1737 integration" — what does integration mean? Warm handover? API? It's vague and will get pushed back on by HRC. Malo is "in development" elsewhere on the site, so calling it a "pilot" tool inside a programme is forward-leaning. | "Tools: 1737 contact card pre-loaded for safety planning. Malo CBT app (in development) pilot from launch." Be honest about what's live. |
| `index.html:1267` | Mate Huka: "Week 1: GP labs (HbA1c, lipids, BP) + plan" | Where do labs get done? This is a pure-telehealth practice. Patient has to physically go to a lab. The programme description should acknowledge that — it's not a deal-breaker, just honesty. | "Week 1: GP consult, lab request to your nearest Labtests/Awanui, treatment plan." |
| `index.html:1294` | Whakaora Wawe: "Whānau-wide risk mapping (consent-based)" | Whānau-wide consent-based screening is a well-known equity hot button. How is consent obtained from each adult whānau member? You're a single GP — the operational reality of multi-person risk mapping is non-trivial. | Either describe the actual consent process, or remove. "Whānau-wide" implies multi-person — if it's just CV risk for the index patient with family history, say that. |
| `index.html:1332` | "Apps designed with Pacific and Māori whānau, in their languages, used in our consults and given out for free." | "Designed with" — same co-design question. Names? | If formal user research happened, cite it. If not: "Apps designed for Pacific and Māori whānau, by a Pacific GP team, in their languages." |
| `index.html:1411-1412` | HRC 2027 Pacific Projects: "Up to $1.2M, 36-month horizon, 300-400 Pacific whānau." | This is a planned application, not a funded project. The framing implies more certainty than exists. | "Targeting HRC 2027 Pacific Projects funding round. Application in design. Up to $1.2M, 36-month, 300-400 whānau." |
| `index.html:1417` | "Outcomes published in Pacific Health Dialog." | Future tense baked into the present. Has anything been submitted? | "Targeting publication in Pacific Health Dialog." |
| `index.html:1422` | "All programmes report against the four Whānau Ora outcomes by design. Quarterly outcome packs go to commissioning agencies and our own clinical governance." | "Quarterly outcome packs" — currently? Or planned? If you have zero patients on a programme, the pack is empty. | Future-proof: "Programmes are designed to report against the four Whānau Ora outcomes. Quarterly outcome packs once enrolled patient numbers support reporting." |
| `index.html:1432-1433` | "Connect Clinic Foundation (in formation) raises philanthropic capital..." / "90-day target: $40-70k secured + $200-400k pipeline." | "In formation" is honest. The 90-day target is good — funders like specifics. Make sure to update this number. If it's been on the site three months and it still says "90-day target" the same number, credibility drops. | Date-stamp it: "90-day target (set April 2026): $40-70k..." |
| `index.html:1437-1458` | Funder grid (Te Whatu Ora PPDF, Cause Collective, Foundation North, HRC, Le Va, Spark) | Reading this grid implies relationships. What stage is each at? Pipeline, applied, in conversation, awarded? | Add a one-word status: `Applying`, `In conversation`, `Aligned`. Funders distrust vague proximity claims. |
| `index.html:1478` | "We hire Pacific engineers and we ship every fortnight." | "Hire" — currently solo? "Hire" implies plural. "Every fortnight" is a release cadence claim. | "We're a Pacific engineering shop. Currently solo, hiring as funding lands. Release cadence: every fortnight." |
| `index.html:1483` | "Mana whenua & Pacific community partnerships shape what we build." | Same overreach as flagged in cultural section. |  |

### Whakaora Wawe / Hauora Hinengaro / Mate Huka — capacity claims (the big honesty flag)

The three programme cards (`index.html:1230-1306`) advertise 12-week structured pathways with weekly sessions priced $420-520. With a single GP (Francis) running clinic, building software, and one health coach (Warren), the operational reality of running 25+ Pacific whānau through Hauora Hinengaro week 1 from launch would need:

- 25 GP screen sessions in week 1 (at ~30 min each = 12.5 hours)
- 10 weekly coach sessions per week from week 2 onwards (assuming Warren is FT)
- A repeat-labs round in week 12

This is doable for ~10 patients. It is not doable for 25+ in a launch wave. The site doesn't claim 25 patients, but funders **will** ask "what's your launch capacity?" If the answer is "5 patients per programme", say so. Honesty here is more credible than ambition.

**Recommendation:** add a quiet note to each programme card: `Launch capacity: up to 8 whānau per cohort. Waitlist for next cohort.`

---

## 6. Patient accessibility flags

Test: imagine a 65-year-old Tongan grandmother (English-as-third-language, lives in Mangere, has hypertension and pre-diabetes, daughter is helping her on the iPad) trying to book.

| File:line | Issue | Fix |
|---|---|---|
| `index.html:429` | Hero subhead is one long sentence with three commas, an em-dash, an em-spacer, and a price. Tonga grandmother bounces. | Break into two sentences. "Pasifika telehealth for Aotearoa. Mental wellbeing, lifestyle change, early intervention. Available in English, Tongan, or Samoan. Consults from $35." |
| `index.html:1573-1606` | Eligibility check is 8 questions with bold-sub-text inside `<strong>` tags and clinical jargon (`benzodiazepines`, `methylphenidate`, `dexamfetamine`). | Add a single line above the checkboxes: "If any of these apply, we'll send you somewhere safer." Replace clinical names with plain language: "strong painkillers (like morphine, codeine)", "tranquillisers (like Valium)", "ADHD medication". |
| `index.html:1596` | "controlled drug — opioids (morphine, oxycodone, tramadol, codeine, fentanyl, methadone, buprenorphine), benzodiazepines (diazepam, clonazepam, temazepam, lorazepam), or stimulants (methylphenidate, dexamfetamine)" | Wall of clinical drug names is overwhelming. Most NZ Pacific elders know "panadol", "metformin", "amlodipine" but not "buprenorphine". | Group by category in plain language and link to a "what counts as a controlled drug?" expandable. |
| `index.html:1648-1727` | Booking form is 11 fields including "current_medications", "allergies", "family_history", "recent_admissions", "preferred_pharmacy". | Required vs optional is marked but the visual hierarchy is flat. A non-tech-confident older user will get overwhelmed. Consider: split into 2 steps (basic info → clinical history) or add the green "completed" tick as fields are filled. |
| `index.html:1706` placeholder | "e.g. metformin 500mg, ramipril 5mg — or write 'nil' if none" | "ramipril" is hard to spell from memory. Add a help hint: "if you can't remember the spelling, just write the brand name on your box." |
| `index.html:1710` placeholder | "or write 'NKDA' if none known" | "NKDA" is a clinical acronym. A patient won't know it. | Drop NKDA. Just say "Write 'none' if you don't have any allergies." |
| `index.html:1734-1764` (booking confirmation) | Booking confirmation has Zoom link, Stripe pay button, meeting ID. The flow is "request → confirmation page with Zoom link → email". | Confusing — patient sees the Zoom link before payment, and might think appointment is now confirmed. Lock the Zoom link section visually until `stripeUrl` is paid? Or move the Zoom info to the email only. |
| `patient-guide.html:1029-1036` checklist | "NHI number" — most older Pasifika patients don't know what an NHI is. | Add a one-liner: "NHI = a 7-digit code on every NZ hospital letter." |
| `index.html:1620` | "None of these apply — continue to booking" | Confusing button — sounds like a refusal. | "I'm clear of all of these. Take me to booking." |
| `Views/DisclaimerView.swift:30` | "Talanoa about your medication, in your language." | Lovely tagline. But the disclaimer screen is the FIRST thing a patient sees on first launch — make sure the kuia knows what "talanoa" means here. Pacific elders will get it; non-Pacific NZers may not, but that's fine because they're not the primary audience. Keep. |  |
| `Views/MedicationDetailView.swift:202` | "Information only — not medical advice." | Polite, doesn't scare. Em-dash aside, it's good. | Replace em-dash with comma. |
| `index.html:213-219` (screening fail messages) | "Please call 111 immediately or go to your nearest Emergency Department." / "If you are in mental health crisis or having thoughts of suicide, please call or text 1737..." | These are warm and correct. Good. | Keep. Just remove em-dashes. |

### Empowering vs scary disclaimers

The mix is OK. The biggest scary moment is the eligibility-fail wall (`index.html:1609-1613`) — red, big text, blocks booking. That's appropriate for a true "go to ED" case but the same red block fires for "patients under 16 need a parent". Consider tiering: red for clinical-emergency fails, amber for "we can't help with this but you're not in danger".

---

## 7. App copy (Mahino)

Mahino's onboarding reads mostly like a kind cousin. The first-launch disclaimer has the right warmth.

### Strengths

| File:line | Text | Note |
|---|---|---|
| `Views/HomeView.swift:39-41` | "Scan a script / Point your camera at the medication name" | Plain, direct. Good. |
| `Views/HomeView.swift:118` | "This is patient information, not medical advice. Always check with your GP, nurse, or pharmacist." | Soft, empowering. |
| `Views/HomeView.swift:147-152` | "What's on your script? / Ko e hā 'i ho tohi-faito'o? / O le ā i lau tusi-talavai?" | Conversational. Translations look right. |
| `Views/DisclaimerView.swift:30` | "Talanoa about your medication, in your language." | Strong tagline. |
| `Views/DisclaimerView.swift:42-48` | Three rows: "Your photo stays on your phone", "This is information, not advice", "English, Lea Faka-Tonga, Gagana Sāmoa" | Excellent. Privacy-first messaging without legal jargon. |
| `Views/MatchResultView.swift:44-46` | "Which one's yours? / We found a few. / Tap the medication that matches your script." | Cousin-not-lawyer voice. |
| `Views/ScanView.swift:101` | "Line up the medication name inside the box" | Good. Direct. |
| `Views/ScanView.swift:140` | "Couldn't find a medication name we know yet. Try a clearer photo, or browse the Library." | Apologetic-without-blame. Good. |

### Issues

| File:line | Text | Issue | Fix |
|---|---|---|---|
| `Views/DisclaimerView.swift:63` | `Text("I understand — let's go")` | **Em-dash directly violates Francis's rule, in the most-tapped button in the app.** | `Text("I understand. Let's go.")` |
| `Views/MedicationDetailView.swift:131-134` | "Draft translation / Awaiting fluent-speaker review. Use English if unsure." | This is good but the banner is collapsed by default in some flows. Consider making this **persistent and amber** until the language is reviewed. |  |
| `Views/MedicationDetailView.swift:202` | "Information only — not medical advice." | Em-dash. | Comma. |
| `Views/SettingsView.swift:23` | "Draft translations — fluent-speaker review pending" | Em-dash. | "Draft translations. Fluent-speaker review pending." |
| `Views/SettingsView.swift:74` | "This is patient information, not medical advice. Always check with your GP, nurse, or pharmacist for your situation." | Good. Keep. |  |
| `Views/MedicationDetailView.swift:96` | `"Also called: \(medication.brands.joined(separator: ", "))"` | "Also called" is friendly. |  |

---

## 8. Tagline pressure-test

### "A clinic that ships software"

**Verdict: confusing for patients, sticky for funders/engineers.**

Pacific patients won't know what "ships software" means. To them, "ships" means the boat-kind. To a Foundation North funder or HRC reviewer or NZ tech engineer, this lands instantly and is memorable. The tagline is doing dual-audience work and only succeeding for one audience.

**Fix:** keep it for the Build & Research wing — that's the right audience. Use a different tagline on the patient-facing hero. The hero currently has *both* (`index.html:425-427` says "Healthcare that catches things early" and `index.html:503` says "A clinic that ships software"). They're in different sections, which works. But the patient hero at the top of the page should never use "ships software" — it doesn't.

Currently the only patient-facing place "A clinic that ships software" appears is the meta description (`:7-8`) and the footer (`:1949`). That's defensible. **Leave it.**

### "Healthcare that catches things early"

**Verdict: solid. Sticky.**

Says what it does, in plain English. Pacific grandmothers understand "catches things early". Pakeha understand it. Funders understand it. The bottom 5% of NZ literacy levels can read it.

One small risk: "catches things" is slightly metaphorical. A literal-minded older speaker might want clarity. Solution is the next line: "GP and a health coach, working together for your mental wellbeing, lifestyle, and early intervention". That does the work.

**Keep.**

### Programme names

Hauora Hinengaro / Mate Huka / Whakaora Wawe — Māori-named programmes for Pasifika-and-Māori service. Mate Huka is Tongan-friendly because Tongans use "huka" for sugar too. Hauora Hinengaro and Whakaora Wawe are pure te reo. **This is intentional and correct** — Te Tiriti partnership means Māori-language naming is appropriate. But for a 65yo Tongan auntie, "Whakaora Wawe" doesn't immediately decode. The site does provide a tagline under each name ("Catching things early", "Sugar sickness", "Wellbeing of the mind"). Good.

---

## 9. Spelling, typos, grammar

| File:line | Issue | Fix |
|---|---|---|
| `index.html:1055` | Two `<svg>` paths in coach card section have a "1.414" coordinate error — `001.414 0l4-4z` instead of `00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z`. The "broken" stroke just doesn't render its inner curve right. Visual bug, not text. |  |
| `index.html:451` | "English · Tongan · Sāmoan" | "Sāmoan" with macron is the correct form. Good. |
| `index.html:477` | "Lea Faka-Tonga" | Standard form is "Lea Faka-Tonga" (hyphen, capital F). Correct. Keep. |
| `index.html:1056` | "Whānau-centred — fits Pacific and Māori households, shift work, faith rhythms" | Good. Em-dash flagged elsewhere. |
| `index.html:1264` | "Sugar sickness — diabetes & pre-diabetes" | "&" inside running text. Use "and". | "Sugar sickness: diabetes and pre-diabetes" |
| `index.html:1865` | Comparison table: "Tend $49–$129" uses an en-dash. | Good — consistent with house style for ranges. Keep. |
| `index.html:2026` | "Connect Clinic Limited · Incorporated 29 April 2026, Auckland NZ" | Today's date is 2026-04-29 per session context. Either it's incorporated today or it's not. If aspirational, change to "Incorporation in progress". | Verify or replace with "Incorporation pending". |
| `patient-guide.html:995` | "Connect Clinic Limited - Name reserved, incorporation pending" | Hyphen used as separator. Inconsistent with `index.html:2026` ("·"). | Use "·" everywhere or use "—" / "–" everywhere. Pick one. |
| `index.html:996` (in `patient-guide.html`) | Same line as above, slight wording difference: "Trading as Connect Clinic." | Either Connect Clinic IS the company or trades AS Connect Clinic. **They're contradictory between pages.** | Reconcile. |
| `terms.html:122` | "...the Children, Young Persons and Their Families Act..." | The Act was renamed in 2017. It's now the **Oranga Tamariki Act 1989**. | "Children, Young Persons and Their Families Act / Oranga Tamariki Act 1989" |
| `privacy.html:122` | Same issue. |  |
| `terms.html:60` | "controlled medications (opioids, benzodiazepines, stimulants)" — no Oxford comma or close. | OK. Keep. |
| `index.html:1502` | "Parent or guardian present for the consultation. Please book and note this in your request..." | "Please book and note this in your request" is awkward. Reads like the consultation is a third-person object. | "Please mention this when you book." |
| `patient-guide.html:331` | "Find it on any NZ hospital letter or my health record. Can't find it? Call 0800 855 066." | "my health record" is the lower-case product name "My Health Record" (australian) — but in NZ the equivalent is patient portals/Manage My Health/Health365. "my health record" reads like a phrase, but capitalisation is ambiguous. Consider "your hospital letter or your patient portal". |  |
| `patient-guide.html:1029` | "I have my NHI number handy (or know where to find it)" | Good. |  |
| `patient-guide.html:1030` | "I have a list of my current medications (name + dose)" | Good. |  |
| `patient-guide.html:1031` | "I know my drug allergies (or can confirm NKDA)" | "NKDA" is unfriendly. Same as flagged earlier. |  |
| `index.html:9` (meta) | "Pacific GP+Coach telehealth + open-evidence apps" | "open-evidence apps" — what does that mean? "Open-source"? "Evidence-based"? Reads like jargon. | "Pacific GP and coach telehealth, plus apps and Pacific health research" |
| `index.html:1949` (footer) | "Auckland-based, serving NZ-wide." | "NZ-wide" as adverb is fine but "serving NZ-wide" reads slightly clunky. | "Auckland-based. Serving Aotearoa NZ." |
| `index.html:1054` | "1:1 coaching for diabetes, weight, mental wellbeing, alcohol, smoking" | Five comorbidities in a list, no "and". | "1:1 coaching for diabetes, weight, mental wellbeing, alcohol, and smoking" |
| `index.html:1499-1505` | FAQ Q1 answer ends mid-thought. "For ongoing care we recommend staying enrolled with a regular practice." | OK. |  |
| `Views/MedicationDetailView.swift:45` | `eyebrow: "When to call your GP"` | Plain. Good. |  |

### Mojibake / encoding

No mojibake found. All Pacific diacritics render correctly in UTF-8.

---

## 10. Inconsistencies

### Pricing (X says one price, Y says another)

| Service | `index.html` Pricing card (894-933) | `index.html` Comparison table (713-755) | `index.html` Service card (559-611) | `patient-guide.html` Fee table (702-752) | `index.html` Footer comparison (1862-1897) |
|---|---|---|---|---|---|
| Repeat Prescription | $35 | "$35" | "$35" | "$35" | "$35" |
| Medical Certificate | $35 | "$35" | "$35" | "$35" | "$35" |
| General Consult | $55 | — | "$55" | "$55" | "$55" |
| Acute Illness Review | not listed | — | "$55" | "$55" | not listed |
| Wegovy Assessment | $120 | — | "$120" | "$120" | "$120" |
| Dietician | $95 | — | not listed | "$95" | "$95" |
| Second Opinion | $85 | — | "$85" | "$85" | not listed |
| Health Coaching | not listed | — | not listed | not listed | not listed |
| Hauora Hinengaro 12-wk | $420 (programmes section :1248) | — | — | not listed | not listed |
| Mate Huka 12-wk | $480 (:1274) | — | — | not listed | not listed |
| Whakaora Wawe 12-wk | $520 (:1300) | — | — | not listed | not listed |

**Inconsistencies:**
- **Acute Illness Review** is in the services grid and patient guide fee table at $55, but missing from the main `index.html` pricing block (`:894-933`). Add it.
- **Health Coaching session — $65** is referenced as a Stripe link (`:2062`) and as a CTA in the coach section (`:1059-1060`) but not listed in any pricing or fee table. Add it.
- **Hauora Hinengaro / Mate Huka / Whakaora Wawe** programmes have prices in their cards (`:1248, 1274, 1300`) but are absent from the main pricing summary and from the patient guide fee table. The patient guide is supposed to be the comprehensive "Costs & payment" section — it's missing the programme prices entirely.

### Service-name inconsistency (matters because Stripe routing is keyed on service-name string)

| Place | String |
|---|---|
| Hero / nav | "Wegovy Eligibility Assessment" (`:590`) and "Wegovy Assessment" (footer `:1968`) |
| Service card | "Wegovy Eligibility Assessment" (`:590`) |
| Pricing card | "Wegovy Assessment" (`:919`) |
| Booking option | "Wegovy / Weight Management Assessment — $120" (`:1695`) |
| Comparison table | "Wegovy assessment" (`:1884`) |
| Stripe key | "Wegovy / Weight Management Assessment — $120" (`:2061`) |

**Risk:** if a user picks the wrong-named option somewhere, the Stripe redirect fails. Currently safe because the booking dropdown is the only path. But pick one canonical name everywhere and use it.

### Hero claims vs evidence

| Place | Claim | Issue |
|---|---|---|
| `index.html:464` | "from $35" | Confirmed in pricing. OK. |
| `index.html:741` | "After-hours clinic (expensive)" comparison | Subjective. Drop the parenthetical. |
| `index.html:758` | "Connect Clinic is a private telehealth service and is not Pharmac-funded or subsidised." | Correct. |
| `index.html:956` | "Private service — not Pharmac subsidised." | Correct, redundant with :758. |
| Patient guide `:761-762` | "Consultations are not funded by ACC or DHB subsidies." | Correct. |
| `index.html:1520` (FAQ) | "ACC claims for injury-related consults may be available — ask us when you book." | Tension with `:761`'s "not funded by ACC". Reconcile: ACC accepts the consult fee for ACC45 lodgements but doesn't fund the consult itself. Be precise. |

### Footer copy vs hero copy (Pasifika vs Pacific)

| Place | Phrasing |
|---|---|
| Hero `:421-423` | "Pasifika & Māori preventive telehealth" |
| Trust ticker `:474-493` | "Pacific GP-led" |
| Pillars card `:514` | "Pacific GP and a Pacific health coach" |
| Apps `:1331` | "Pacific and Māori whānau" |
| Footer `:1949` | "Pasifika and Māori" |
| Schema.org `:33` | "Pacific peoples and Māori" |

**Recommendation:** pick one term and stick to it. Te Mana Ola convention is "Pacific peoples". Connect Clinic uses Pasifika in some places. Mixing is OK if intentional, but the site flips between them within the same page, which reads carelessly.

**Suggested rule:**
- "Pacific peoples" in formal/funder-facing copy (Te Mana Ola convention)
- "Pasifika" in patient-facing/community-facing copy
- Never "Pacific Islanders" (dated, found 0 times — good)

The site already mostly does this but is inconsistent in the hero section vs the trust ticker. Fix.

### "Pasifika & Māori" vs "Pacific and Māori"

`index.html:422` uses "&", others use "and". Standardise to "and" (& reads as marketing).

### Footer info mismatch (incorporation status)

| Place | Text |
|---|---|
| `index.html:2026` | "Incorporated 29 April 2026, Auckland NZ" |
| `patient-guide.html:995` | "Name reserved, incorporation pending" |
| `privacy.html:53` | "Connect Clinic Limited (NZBN to be confirmed)" |
| `terms.html:53` | "Connect Clinic Limited (NZBN to be confirmed) is an Auckland-based telehealth provider." |

**Fix:** confirm whether Connect Clinic Limited is incorporated yet. If no, all four places should say "Incorporation pending" or "Name reserved". If yes, all four should say "Incorporated [date], NZBN [number]". Today (per system context) is 29 April 2026 — the same date in `index.html:2026`. So either it's literally being incorporated today (in which case update other pages tomorrow), or that line is aspirational.

### Phone number

| Place | Number |
|---|---|
| All pages | `09 873 5039 ext. 800` |
| Schema.org `:25` | `+6498735039` |

OK. Both are valid representations.

### Email

`connectclinic@outlook.com` is consistent across all pages. Good — but **outlook.com is not a great look for a clinical practice**. Funders and referring GPs will silently downgrade trust. Move to `connect@connectclinic.nz` or similar before launch.

### Address

`26 Whakahui Lane, Mangere Bridge, Auckland 2022` is consistent across `privacy.html:53`, `terms.html:125`, `index.html:2027`. Good.

### Pasifika vs Pacific peoples vs Pacific Islanders

| Term | Where | Verdict |
|---|---|---|
| Pasifika | hero, programmes, footer, app store description | Active |
| Pacific peoples | schema.org, evidence section ("Pacific peoples in NZ live 5.5 fewer years") | Active in formal contexts |
| Pacific Islanders | nowhere | Good — this term is dated |
| Tagata Pasifika | `index.html:1365` "For tagata Pasifika reconnecting" | Used once, in the right context (Talanoa app for language learning). Keep. |

### "Apps built with whānau, not on whānau" (`:483, 493`)

Used twice in the trust ticker. Powerful line. But "built with whānau" is a co-design claim — see funder credibility flags. The line works only if there's a real co-design process to point at. If yes, name it. If no, soften to "built for whānau, in their languages."

---

## 11. Pasifika nomenclature audit

Already covered in section 10. Pick one rule and apply it. Te Mana Ola convention ("Pacific peoples") is the safest formal default; "Pasifika" works community-facing.

---

## 12. Over-claims to soften

Top ten over-claims, ranked by funder-credibility risk:

| # | File:line | Over-claim | Reality | Suggested rewrite |
|---|---|---|---|---|
| 1 | `index.html:1411-1412` | "HRC 2027 Pacific Projects... Up to $1.2M, 36-month horizon, 300-400 Pacific whānau." | Application not yet submitted. | Frame as "in design / targeting 2027 round". |
| 2 | `index.html:1156, 1183, 1483` | Implies partnerships with iwi, hapū, Cause Collective, mana whenua. | These are aspirational/early-stage relationships, not formal partnerships. | "Working alongside" / "in conversation with" / drop the claim. |
| 3 | `index.html:1422` | "Quarterly outcome packs go to commissioning agencies." | Programmes haven't launched. | "Programmes are designed to report quarterly..." |
| 4 | `index.html:1417` | "Outcomes published in Pacific Health Dialog." | No publication yet. | "Targeting publication in..." |
| 5 | `index.html:1483` | "Mana whenua & Pacific community partnerships shape what we build." | Solo-GP at present. | Soften or name partners. |
| 6 | `index.html:1226, 1331, 1332` | "Designed with Pacific and Māori in mind from day one" / "Apps designed with Pacific and Māori whānau" / "Built with whānau, not on whānau" (ticker). | If formal co-design hasn't happened, this is overreach. | Replace "with" with "by" or "for" until co-design is real. |
| 7 | `index.html:775-787` | "5.0 average rating · NZ-wide patients" — six glowing testimonials. | The clinic is just incorporating. Are these real patient quotes or aspirational? Funders will check. | If these are pilot patients, label them "early patient feedback (Apr 2026)". If they're synthetic/scenario, **remove**. False testimonials are a regulatory and ethical risk. |
| 8 | `index.html:1422` | "All programmes report against the four Whānau Ora outcomes by design." | "By design" is fine, but no patients = no reports. | OK as currently worded if you consistently say "designed to report". |
| 9 | `index.html:1244` | "Tools: 1737 integration, Malo CBT app pilot" | Both are forward-leaning. | Be honest about what's live: "1737 contact card pre-loaded; Malo app pilot from launch." |
| 10 | `index.html:1296` | "Linked referrals: cardiology, endocrine, diabetes nurse" | Are referrals actually linked, or do you write a standard referral letter? | "Referrals to cardiology, endocrine, diabetes nurse where indicated." |

### Capacity claims (the big one)

The whole "12-week programmes for Pacific whānau" framing implies operational scale that a solo-GP-and-coach pair cannot deliver in week 1 at any meaningful funded volume. **Soften programme cards** with a quiet "Launch capacity: ~8 whānau per cohort. Waitlist for next cohort." This single addition will save significant funder credibility.

### Testimonials risk (high)

The six glowing testimonials at `index.html:794-887` (Sarah T, Mele F, Aroha K, Tane R, James W, Lani V) need provenance. If the clinic is brand new (incorporated today), real testimonials shouldn't exist yet. Possible explanations:

1. They're from prior-employer telehealth practice — should be disclosed.
2. They're early-pilot quotes — date them.
3. They're scenario-style "imagined patient" quotes — **remove immediately**, this is HDC/MCNZ-risky territory.

**Recommendation:** check provenance with Francis, then either label, redact, or remove. This is the highest-impact honesty fix on the site.

---

## Action priority (top 10, ordered)

1. **Verify and either date-stamp, label, or remove** the six testimonials at `index.html:794-887`. Highest legal/ethics risk.
2. **Replace the em-dash in `Views/DisclaimerView.swift:63`** — it's the most-tapped button in the most-Pasifika app.
3. **Reconcile incorporation status** across `index.html`, `patient-guide.html`, `privacy.html`, `terms.html`.
4. **Add Acute Illness Review and Health Coaching** to the pricing block in `index.html:894-933`.
5. **Add programme prices** ($420/$480/$520) to the patient-guide fee table.
6. **Soften co-design claims** at `index.html:1183, 1226, 1332, 1483` until formal partnerships are in place.
7. **Cite sources** for the three evidence-section stats (`index.html:1106, 1118, 1130`) properly. Page numbers, authors, year.
8. **Run the em-dash sweep** across `index.html`, `patient-guide.html`, `terms.html`, `privacy.html`, `medications.json`, the three Mahino views.
9. **Get the Tongan and Samoan medication content reviewed** by a fluent speaker before flipping the language picker live.
10. **Move `connectclinic@outlook.com` to a domain email** before any HRC or Foundation North contact.

---

*Review compiled by Claude Code, 2026-04-29.*
