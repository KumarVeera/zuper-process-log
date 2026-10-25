# Crew User Flow: Mobile Photo Capture

Define stage. Maps Part A of the [UX plan](03-ux-design-plan.md) end to end: the happy path, every
decision point, and the recovery paths. Screen IDs (M1–M6) and acceptance criteria (AC-M…) refer to doc 03.

**Scenario used:** Ravi arrives at *14 Elm St, Re-roof*. There's no signal on the roof.

**Presentation diagram:** [diagrams/crew-user-flow.svg](diagrams/crew-user-flow.svg)

![Crew user flow](diagrams/crew-user-flow.svg)

---

## 1. Overview: the whole job, at a glance

```mermaid
flowchart LR
    A["Arrive on site"] --> B["Open job<br/>(M1 → M2)"]
    B --> C["BEFORE shots"]
    C --> D["Do the work<br/>+ DURING shots"]
    D --> E["AFTER shots"]
    E --> F["Finish job<br/>(M6)"]
    F --> G["Photos sync<br/>when online (M5)"]
    G --> H["Office has<br/>all proof"]

    style C fill:#fde68a,stroke:#b45309,color:#111
    style H fill:#bbf7d0,stroke:#15803d,color:#111
```

Before photos are prompted **first**, because a missing before photo is what loses disputes (E9).

---

## 2. Detailed flow: capture loop with decisions and recovery

```mermaid
flowchart TD
    start(["Open app"]) --> m1["M1 Today<br/>job list (cached, works offline)"]
    m1 -->|no jobs| e1["Empty: 'No jobs today.<br/>Pull to refresh or call the office'"]
    m1 -->|tap job| m2["M2 Shot checklist<br/>opens on BEFORE tab · 0 of 7"]

    m2 -->|"Next required shot"| perm{"Camera<br/>permission?"}
    perm -->|denied| e2["Explain why + Open settings"] --> perm
    perm -->|ok| stor{"Storage<br/>space?"}
    stor -->|full| e3["'Storage full. Your saved<br/>photos are safe.'"] --> m2
    stor -->|ok| m3["M3 Guided camera<br/>shot name + hint + proof chips"]

    m3 -->|"shutter (or volume key)"| stamp["Stamp: time · job · crew<br/>+ GPS if available"]
    stamp --> gps{"GPS<br/>found?"}
    gps -->|no| flag1["Mark 'No location'<br/>(flagged for office)"] --> m4
    gps -->|yes| m4["M4 Review<br/>AI check runs (on device)"]

    m4 --> ai{"AI result"}
    ai -->|looks good| keep["Keep"]
    ai -->|blurry / dark / wrong subject| choice{"Crew decides"}
    choice -->|Retake| m3
    choice -->|"Keep anyway<br/>(AI never blocks)"| keep

    keep --> save["Saved on phone<br/>queued for upload"]
    save --> tick["Checklist item ✓<br/>progress 1 of 7"]
    tick --> more{"Required shots<br/>left in phase?"}
    more -->|yes| next["'Next: Back elevation →'"] --> m3
    more -->|no| phase{"Phase"}
    phase -->|BEFORE / DURING done| nextphase["Nudge to next phase tab"] --> m2
    phase -->|AFTER done| m6

    m2 -->|"⋯ Can't take this"| skip["Choose reason:<br/>not accessible · unsafe ·<br/>not applicable · other"]
    skip --> skipped["Item marked SKIPPED<br/>(not Done)"] --> more
    m2 -->|"+ Extra photo"| m3x["Camera (unlisted)<br/>AI suggests tag"] --> save
    m2 -->|Finish| m6

    m6["M6 Finish job<br/>Done / Skipped / Missing"] --> miss{"Anything<br/>missing?"}
    miss -->|yes| warn["Warning"]
    warn -->|Take now| m2
    warn -->|"Finish anyway + reason"| submit
    miss -->|no| submit["Submit job photos"]

    submit --> online{"Online?"}
    online -->|no| wait["'Saved on phone ·<br/>will upload when online'"]
    wait -->|signal returns| upload
    online -->|yes| upload["Auto upload<br/>(resumable)"]
    upload --> ok{"Server<br/>confirmed?"}
    ok -->|no| fail["'4 didn't upload. Still on<br/>your phone.' Auto-retry + Retry"] --> upload
    ok -->|yes| done(["✓ All photos uploaded<br/>local copy can be released"])

    style done fill:#bbf7d0,stroke:#15803d,color:#111
    style e1 fill:#e5e7eb,stroke:#6b7280,color:#111
    style e2 fill:#fecaca,stroke:#b91c1c,color:#111
    style e3 fill:#fecaca,stroke:#b91c1c,color:#111
    style fail fill:#fecaca,stroke:#b91c1c,color:#111
    style flag1 fill:#fde68a,stroke:#b45309,color:#111
    style skipped fill:#fde68a,stroke:#b45309,color:#111
    style wait fill:#e5e7eb,stroke:#6b7280,color:#111
```

**Colour key:** green = success · amber = flagged but allowed · red = error/recovery · grey = neutral
info (offline is *not* an error). In the real UI every state also has a **text label and icon**, never
colour alone.

---

## 3. Background: upload queue (runs alongside everything)

The sync runs **independently** of the capture flow. The crew never has to wait for it.

```mermaid
stateDiagram-v2
    [*] --> SavedOnPhone: photo kept
    SavedOnPhone --> Uploading: connection available
    Uploading --> Uploaded: server confirms
    Uploading --> Failed: error / signal lost
    Failed --> Uploading: auto-retry or Retry tapped
    Uploaded --> [*]: local copy may be released

    note right of SavedOnPhone
        Never deleted from the phone
        until the server confirms (AC-M8)
    end note
```

Global sync bar (on every screen, tap → M5): *Offline · 12 saved on phone* → *Uploading 3 of 12* →
*All uploaded ✓* / *4 failed: tap to retry*.

---

## 4. Step-by-step table

| # | Step | Screen | Crew does | System does | Key states | ♿ Accessibility | AC |
|---|---|---|---|---|---|---|---|
| 1 | Open job | M1 | Taps today's job | Loads cached jobs offline | Empty / loading skeleton | Cards announce progress "Before 0 of 7" | AC-M1 |
| 2 | See what's needed | M2 | Reads Before list | Opens on Before tab | Empty slots with names | Phase headings; status as text + icon | AC-M1 |
| 3 | Start shot | M2 → M3 | Taps **Next required shot** | Checks permission + storage | Permission denied, storage full | 56–64 dp button in thumb zone | n/a |
| 4 | Frame | M3 | Follows hint | Shows proof chips (time, GPS, offline) | GPS searching | Hint is screen-reader readable | AC-M3 |
| 5 | Capture | M3 | Shutter or **volume key** | Stamps time, job, crew, GPS | No GPS → flagged | Haptic + sound on capture | AC-M3, M4 |
| 6 | Review | M4 | Keep / Retake | On-device AI check (≤1–2 s) | Good / flagged / AI unavailable | AI result announced as text | AC-M5 |
| 7 | Save | M4 → M2 | n/a | Saves locally, queues, ticks item | Offline (neutral) | Live-region "Saved. 1 of 7." | AC-M2 |
| 8 | Next | M3 | Taps "Next: …" | Advances to next missing shot | Phase complete nudge | No swipe-only actions | n/a |
| 9 | Skip (if needed) | M2 | ⋯ → reason | Marks **Skipped**, not Done | n/a | Reasons are big tap options, no typing | AC-M6 |
| 10 | Finish | M6 | Reviews summary → Submit | Shows Done / Skipped / Missing | Missing warning | Summary readable as a list | AC-M10 |
| 11 | Leave site | Any | Switches job / logs out | Warns if photos unsent | Unsent warning | Count stated in words | AC-M9 |
| 12 | Sync | M5 (background) | Nothing (or Retry) | Auto upload, resumable, retry | Uploading / failed / done | Status changes announced + haptic | AC-M7, M8 |

---

## 5. Decision points (what the crew can choose, and what the system enforces)

| Decision | Who decides | Rule |
|---|---|---|
| Keep a photo the AI flagged | **Crew** | AI advises, never blocks (A14) |
| Mark a required shot done without a photo | **Not allowed** | Only via *Skip + reason* |
| Finish with missing shots | **Crew**, with a reason | Office sees the reason (honest "done") |
| Delete a photo from the phone | **System**, after server confirms | Prevents "half never make it" (E8) |
| Retake | **Crew** | Original is kept hidden for audit |
| Photo has no GPS | **System** saves anyway | Flagged "No location" for the office (E10) |

---

## 6. Where AI shows up in the crew flow (and where a person checks)

| Point | AI does | Person checks |
|---|---|---|
| Review (M4) | Blur / dark / "doesn't look like a roof" | Crew keeps or retakes |
| Extra photo | Suggests area tag (e.g. "Gutter") | Crew confirms, or the office confirms later |
| Finish (M6) | *(not used)* | Crew judges completeness; AI does not decide "done" |

---

## 7. Open questions to test with the prototype
- Do crews follow **Next required shot**, or browse the list? (tests A7)
- Is **Skip + reason** fast enough that crews don't fake a photo instead?
- Does the **sync bar** make them trust the app enough to stop uploading at night? (A18)
- Is the AI warning helpful or annoying after the 50th photo?
