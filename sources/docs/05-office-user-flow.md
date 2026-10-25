# Office User Flow: Desktop Evidence Review (by Job ID)

Define stage. Maps Part B of the [UX plan](03-ux-design-plan.md) end to end. Screen IDs (D1–D5) and
acceptance criteria (AC-D…) refer to doc 03. Companion to the [crew flow](04-crew-user-flow.md).

**Presentation diagram:** [diagrams/office-evidence-review-flow.svg](diagrams/office-evidence-review-flow.svg)

![Office evidence-review flow](diagrams/office-evidence-review-flow.svg)

**Scenarios used**
- **Sean (PM), dispute:** a customer calls: "your crew broke my gutter." He has the job ID on screen.
- **Priya (claims), insurer packet:** an insurer asks for dated, located photos of existing storm damage.

---

## 1. Overview: from question to proof

```mermaid
flowchart LR
    Q["Question arrives<br/>(customer call / insurer request)"] --> L["Find job<br/>by job ID (D1)"]
    L --> R["Review evidence<br/>(D2)"]
    R --> V["Verify a photo<br/>(D3)"]
    V --> S["Share / export<br/>(D4)"]
    S --> X["Recipient views proof<br/>(D5)"]

    style Q fill:#fde68a,stroke:#b45309,color:#111
    style X fill:#bbf7d0,stroke:#15803d,color:#111
```

Target: Sean can answer the customer **while still on the call** (lookup → before photo in under a minute).

---

## 2. Detailed flow: dispute (Sean)

```mermaid
flowchart TD
    start(["Customer calls about gutter"]) --> d1["D1 Job lookup<br/>search field focused"]
    d1 -->|"type job ID / address / customer"| match{"Match?"}
    match -->|exact job ID| d2
    match -->|several| list["Result list<br/>job ID · address · date · completeness"] -->|pick job| d2
    match -->|none| e1["'No job found for HR-2041.<br/>Check the ID or search by address'"] --> d1
    match -->|no access| e2["'You don't have access to this job'"]

    d2["D2 Job evidence<br/>header: Before 7/7 · During 4/4 · After 7/7<br/>trust summary: 0 unverified · 1 no location"]
    d2 --> sync{"Photos still<br/>syncing?"}
    sync -->|yes| banner["Banner: '12 photos from Ravi's phone<br/>still uploading · last seen 2 h ago'"] --> filt
    sync -->|no| filt["Filter: Phase = Before · Area = Gutters"]

    filt --> res{"Results?"}
    res -->|0, shot skipped| skipr["'Before · Gutters was skipped:<br/>not accessible (ladder unsafe)'"]
    res -->|0, no match| e3["'No Before photos of Gutters'<br/>+ Clear filters"] --> filt
    res -->|1+ photos| d3["D3 Proof detail (side panel)<br/>photo · capture time · received time ·<br/>map + address text · crew · Verified"]

    d3 --> trust{"Trust<br/>issues?"}
    trust -->|imported / no GPS / clock mismatch| warn["Badge + plain explanation<br/>(never hidden)"] --> cmp
    trust -->|none| cmp["Compare with After<br/>(same area, side by side)"]

    cmp --> decide{"Sean decides"}
    decide -->|"before shows gutter was<br/>already damaged"| sel["Select before + after"]
    decide -->|"photos show crew caused it"| internal["Handle internally<br/>(out of scope)"]

    sel --> d4["D4 Share dialog<br/>recipient: Customer · expiry: 7 days"]
    d4 --> chk{"Selection has<br/>missing data?"}
    chk -->|yes| w2["Warning before creating link:<br/>remove photo or share anyway"] --> d4
    chk -->|no| link["Create link → copy / send"]
    link --> d5(["D5 Customer opens link<br/>before → after · date · location ·<br/>'Captured in app, unedited'"])

    style d5 fill:#bbf7d0,stroke:#15803d,color:#111
    style e1 fill:#e5e7eb,stroke:#6b7280,color:#111
    style e3 fill:#e5e7eb,stroke:#6b7280,color:#111
    style e2 fill:#fecaca,stroke:#b91c1c,color:#111
    style banner fill:#e5e7eb,stroke:#6b7280,color:#111
    style warn fill:#fde68a,stroke:#b45309,color:#111
    style w2 fill:#fde68a,stroke:#b45309,color:#111
    style skipr fill:#fde68a,stroke:#b45309,color:#111
```

---

## 3. Detailed flow: insurer evidence pack (Priya)

```mermaid
flowchart TD
    p0(["Insurer requests proof<br/>of storm damage"]) --> p1["D1 Lookup by job ID"] --> p2["D2 Job evidence"]
    p2 --> p3["Filter: Phase = Before · Tag = Existing damage"]
    p3 --> p4["Review each in D3<br/>(arrow keys: next / previous)"]
    p4 --> tag{"AI tag<br/>correct?"}
    tag -->|yes| conf["Confirm tag<br/>'Suggested' → 'Confirmed'"]
    tag -->|no| fix["Correct tag<br/>(change logged)"]
    conf --> p5["Select photos"]
    fix --> p5
    p5 --> p6["D4 Evidence pack · recipient: Insurer<br/>include metadata + map"]
    p6 --> gate{"Every photo has<br/>date + location + verified?"}
    gate -->|no| list2["List the problem photos<br/>remove · or include with note"] --> p6
    gate -->|yes| exp["Export PDF / create insurer link"]
    exp --> ok{"Export OK?"}
    ok -->|no| retry["'Export failed. Selection kept.' Retry"] --> exp
    ok -->|yes| sent(["Packet sent<br/>activity log records who shared what, when"])

    style sent fill:#bbf7d0,stroke:#15803d,color:#111
    style list2 fill:#fde68a,stroke:#b45309,color:#111
    style retry fill:#fecaca,stroke:#b91c1c,color:#111
```

**Colour key** (same as the crew flow): green = success · amber = flagged but allowed · red = error ·
grey = neutral info. In the UI, every state also has a **text label and icon**.

---

## 4. Share link lifecycle

```mermaid
stateDiagram-v2
    [*] --> Active: link created (expiry set)
    Active --> Viewed: recipient opens
    Viewed --> Viewed: opened again (logged)
    Active --> Revoked: office revokes
    Viewed --> Revoked: office revokes
    Active --> Expired: expiry date reached
    Viewed --> Expired: expiry date reached
    Revoked --> [*]
    Expired --> [*]

    note right of Expired
        Recipient sees: "This link has expired.
        Contact Halden Roofing."
    end note
```

---

## 5. Step-by-step table

| # | Step | Screen | Office user does | System does | Key states | ♿ Accessibility | AC |
|---|---|---|---|---|---|---|---|
| 1 | Find job | D1 | Types job ID | Exact ID jumps to job; partial shows list | No results, no access | Labelled search, focused on load; "3 jobs found" announced | AC-D1, D2 |
| 2 | Read job health | D2 | Scans header | Completeness per phase + trust summary | Still syncing banner | Summary is text, not only colour/icons | AC-D3, D10 |
| 3 | Narrow down | D2 | Applies filters | Filters shown as chips | 0 results, skipped-with-reason | Chips keyboard removable; result count announced | AC-D4 |
| 4 | Inspect photo | D3 | Opens a thumbnail | Side panel with proof block | Loading blur → full | Focus moves into panel; Esc returns; arrow keys next/prev | AC-D5 |
| 5 | Check trust | D3 | Reads badges | Explains imported / no GPS / clock mismatch | Warnings | Location as text + map; badges have text | AC-D6 |
| 6 | Compare | D3 | "Compare with After" | Side-by-side by area | No matching after | Labelled "Before" / "After" in text | AC-D7 |
| 7 | Confirm AI tags | D3 | Confirm or correct | Tag moves from Suggested to Confirmed; change logged | n/a | Tag state stated in words | AC-D11 |
| 8 | Share / export | D4 | Selects, picks recipient | Warns about missing data **before** creating | Export loading / failed | Dialog focus-trapped; warnings announced | AC-D8 |
| 9 | Recipient views | D5 | n/a | Read-only page, no login, only selected photos | Expired / revoked | Plain language; mobile friendly; alt text | AC-D9 |
| 10 | Audit | D3 activity | Checks who viewed | Logs views, shares, tag edits | n/a | Activity as readable list | n/a |

---

## 6. Decision points

| Decision | Who decides | Rule |
|---|---|---|
| Is this photo trustworthy? | **Person** (Sean / Priya) | System shows the facts and badges; it does not declare "fraud" or "safe" |
| Which photos to share | **Person** | Nothing is shared by default; recipient sees only the selection |
| Share a photo with missing data | **Person**, after a warning | Warning comes **before** the link, never after |
| Accept an AI tag | **Person** | Tags stay "Suggested" until confirmed (E13) |
| Who caused the damage | **Person** | AI does **not** assess damage (out of scope, liability) |
| Link expiry / revoke | **Person**, with a default | Default expiry (e.g. 7 days), revocable any time |

---

## 7. Where AI shows up in the office flow (and where a person checks)

| Point | AI does | Person checks |
|---|---|---|
| Filters | Area tags make "Gutters" filterable | Confirms or corrects tags |
| Trust summary | Flags clock mismatch, missing GPS, duplicates | Decides whether to share |
| Search (later) | Natural-language search, e.g. "before photos of the gutter" | Picks the right photo |
| Damage judgement | **Not used** | Always a person |

---

## 8. How this connects to the crew flow

| Crew does (doc 04) | Office sees (this doc) |
|---|---|
| Takes Before shots first | Before 7/7 in the header; before ↔ after pairing works |
| Skips a shot with a reason | "Skipped: not accessible" instead of an empty gap |
| Photo with no GPS | "No location" badge + warning before sharing |
| Imports from gallery | "Imported, not verified" badge everywhere |
| Phone still offline | "Still uploading · last seen 2 h ago" banner |

---

## 9. Open questions to test
- Is **job ID** really the starting point, or do PMs search by customer name or address during a call? (A15)
- Do PMs trust the **Verified** badge without understanding what it means? Is a plain explanation needed?
- Is a **link** enough for insurers, or do they require a PDF? (A16)
- Does showing **Skipped + reason** help or hurt in a dispute?
