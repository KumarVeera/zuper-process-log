# Explicit Requirements vs Assumptions

Source: https://spd-take-home.vercel.app/ · Written 2026-10-24
Purpose: keep clear what the brief **actually says** apart from what I (and the AI) **inferred**. In
the call, every design choice should trace back to either a line in the brief or a named assumption.

**Legend:**
- **E = Explicit:** stated in the brief.
- **I = Inferred:** strongly implied by a persona quote. Low risk, but still mine.
- **A = Assumption:** my design hypothesis, not in the brief. Needs a rationale, and validation where possible.

---

## 1. Explicit requirements (only what the brief says)

### Scope
| ID | Requirement | Brief wording |
|---|---|---|
| E1 | Design how a **crew takes job photos** | "Design how a crew takes job photos" |
| E2 | Design how the **office finds** photos | "how the office finds them" |
| E3 | Design how the office **shares them as proof** | "and shares them as proof" |
| E4 | Use AI tools in the work | "Use any AI tools you like" / "Design it with AI" |

### Problems the design must address (from the problem + voices)
| ID | Problem | Source |
|---|---|---|
| E5 | Photos are scattered across phones and group chats | Problem statement |
| E6 | The right photo can't be found when a customer disputes or an insurer asks | Problem statement |
| E7 | Can't show **when** a photo was taken | Problem statement |
| E8 | No signal on site; uploads done at night; **half never make it** | Ravi Menon, crew lead |
| E9 | The **before** photo is missing / on someone's phone | Sean Doyle, PM |
| E10 | Insurer rejected photos: **no date, no location** | Priya Shah, insurance claims |

### Questions the design should answer
| ID | Question |
|---|---|
| E11 | Which photos does a job need, and **how does the crew know they're done**? |
| E12 | How does a photo **hold up as proof**? |
| E13 | Where can **AI help**, and where should **a person check**? |

### Deliverables & constraints
| ID | Requirement |
|---|---|
| E14 | A prototype, any tool, showing **the crew's phone** |
| E15 | …and **one** office **or** customer view |
| E16 | A process log: prompts that mattered, what you threw away, where the AI got it wrong |
| E17 | Email both links within **2 days** |
| E18 | 60-min call: walk through, then **they change something** live |
| E19 | Own or stock photos only; **no customer data** |
| E20 | No roofing experience or coding required |

### Evaluation criteria
| ID | Criterion |
|---|---|
| E21 | **Judgment:** what you chose to solve, and what you left out |
| E22 | **Understanding:** crew, office *and* insurer |
| E23 | **Working with AI:** how you steered it, where you overruled it |
| E24 | **Clarity:** someone could build from it |

> The brief is short on purpose ("The dashed part is yours"). It does **not** specify screens, features,
> platform, AI features, shot lists, or proof mechanisms. Those are all design decisions, and they are
> what gets judged under E21.

---

## 2. Inferences (strongly implied, low risk)

| ID | Inference | Comes from | Confidence |
|---|---|---|---|
| I1 | Capture must **work offline** and upload reliably later | E8 | High |
| I2 | Before photos must be **prompted at the start**, not left to memory | E9 | High |
| I3 | Each photo needs a trustworthy **timestamp + location** attached | E7, E10 | High |
| I4 | Photos must be **linked to a job** (not to a phone or chat) | E5, E6 | High |
| I5 | A job has a defined set of **required photos** and a visible "done" state | E11 | High |
| I6 | Office needs **search/filter** at least by job and photo type (before/after) | E6, E9 | High |
| I7 | Proof is shared with **external people** (customer, insurer) | E3, E6, E10 | High |
| I8 | AI output must have a **human check** somewhere | E13 | High |
| I9 | Priya represents the **insurer's** viewpoint in the design, even if she works at Halden | E10, E22 | Medium |

---

## 3. Assumptions (my design hypotheses)

Risk = how badly the design breaks if it's wrong. Validate = a cheap check possible within 2 days.

### About the users and context
| ID | Assumption | Risk | How to validate quickly |
|---|---|---|---|
| A1 | Crew use **one hand**, often gloved, in **bright sun**, sometimes on a ladder | Med | Roofing YouTube / TikTok job videos; ask 1–2 tradespeople |
| A2 | Crew lead (not every crew member) owns the checklist | Med | Ask a contractor; design so both work |
| A3 | Crew will **not** reliably type notes or tags | High | Observe; default to taps and AI suggestions, not typing |
| A4 | Priya is **Halden's internal** claims staff; the adjuster is external | Low | State it in the call |
| A5 | Customers open a link **without an account** | Low | Industry norm; state it |
| A6 | Crews currently use the **native camera + WhatsApp** | Low | Implied by "group chats" |

### About the solution
| ID | Assumption | Risk | How to validate quickly |
|---|---|---|---|
| A7 | A **shot list template per job type** (e.g. re-roof, repair, inspection) is the right model for "which photos a job needs" | **High** | Check real contractor/insurer photo checklists (e.g. public insurer claim guides) |
| A8 | Shots are grouped **Before / During / After** by area of the house | Med | Same sources as A7 |
| A9 | **In-app camera** is required for "verified" photos; gallery imports are marked unverified | **High** | Test with a crew: will they switch from the native camera? |
| A10 | Proof = in-app capture record + GPS + device time + server time + **file hash** | Med | Read insurer requirements; C2PA standard |
| A11 | EXIF alone is not enough proof | Low | Well known: EXIF is editable |
| A12 | Crew can **skip a required shot with a reason** | Med | Usability test the "done" state |
| A13 | AI is useful for **quality checks** (blur, dark, wrong subject) and **tag suggestions**, not for damage assessment | Med | Prototype reaction; liability reasoning |
| A14 | AI suggestions must **never block** capture | Med | Usability test |
| A15 | Office's main entry is **search by customer/address → job** | Med | Ask a PM / card-sort |
| A16 | Share as a **link** (with expiry/revoke); PDF for insurers | Med | Ask what insurers accept |
| A17 | Native app beats PWA for background upload reliability | Low | Technical fact (iOS background limits) |
| A18 | Showing the upload status clearly will **change behaviour** (no more "upload at night") | **High** | Prototype test: does the crew trust the queue? |

### Riskiest assumptions (test or argue these first)
1. **A7 Shot list templates:** the backbone of "how does the crew know they're done".
2. **A9 In-app camera only for verified proof:** if crews refuse, proof breaks.
3. **A18 Visible sync status builds trust:** the direct answer to Ravi's pain.
4. **A3 Crews won't type:** this shapes every crew screen.

---

## 4. Light research plan (fits a 2-day take-home)

No access to Halden's real users, so: desk research plus 2–3 quick conversations, then use the
prototype itself as the test.

| Method | Goal | Effort | Assumptions it checks |
|---|---|---|---|
| Desk research: insurer claim photo guidelines, roofing photo checklists | Ground the shot list and proof rules in reality | 1–2 h | A7, A8, A10, A16 |
| Watch 3–5 roofing job videos | Understand physical context on a roof | 1 h | A1, A3 |
| 2–3 guerrilla chats (any tradesperson / site worker / PM you know) | Reality-check the capture flow | 1–2 h | A2, A3, A9, A15 |
| Hallway usability test of the crew prototype (3 people, 10 min each) | Can they finish the checklist and trust the queue? | 1 h | A12, A14, A18 |

**Mini interview guide (15 min, for a tradesperson or PM)**
1. *Context:* "Walk me through the last job where you took photos. What did you do with them after?"
2. *Pain:* "Tell me about a time a photo was missing or not accepted." Probe: what happened next?
3. *Offline:* "What do you do when there's no signal on site?"
4. *Proof:* "What would make a customer or insurer believe a photo?"
5. *Reaction:* show the checklist + camera screens. "What would you do next? What's missing?"
6. *Wrap-up:* "Anything that would make you not use this?"

If no research happens, the assumption table is still the deliverable: it shows judgment (E21) and
lets me answer "why did you do that?" in the call.

---

## 5. What to build first

Rule I used: **build what is explicit first, then the inferences, then the riskiest assumption.** Don't
spend prototype time on low-risk assumptions.

### Build first: the crew capture loop (covers E1, E8, E9, E10, E11, E13, E14)
1. **Job shot checklist:** Before / During / After, progress, a clear "done" state. *(E11, I2, I5; tests A7)*
2. **Guided capture with proof stamp:** time, GPS, job attached automatically and shown to the crew.
   *(E10, I3; tests A9)*
3. **AI quality check + accept/retake:** AI suggests, the crew decides. *(E13, I8; tests A13, A14)*
4. **Offline queue / sync status:** "12 photos saved on phone, will upload when online." *(E8, I1; tests A18)*

### Then: one office view, told through one story (covers E2, E3, E6, E15, E22)
5. **Job photo timeline**, filtered to *Before + Gutter*. *(E2, E9, I6)*
6. **Photo proof detail:** time, map, who took it, verified badge. *(E12, E10)*
7. **Share proof link → what the customer/insurer sees.** *(E3, I7)*

Hero story to demo: *Sean's customer says the crew broke her gutter → Sean finds the before photo Ravi
took offline that morning → shares a verified link.* This one story touches all three personas (E22).

### Explicitly not building (say so in the call, E21)
- AI damage assessment / claim decisions (liability; a person must judge).
- Shot-list template admin, user management, scheduling, payments.
- Customer accounts.
- Both an office *and* a customer view in full depth; the brief asks for **one**. Show the customer view
  only as the end of the share flow.
