# Prompt 026: Office dashboard, approve / reject, five review questions

- **Date:** 2026-10-25
- **Input type:** Text prompt
- **Tool:** Claude Code (Claude Opus 5.5) · React app · built-in browser preview
- **Phase:** 3 · Prototype (office view)

## Prompt (verbatim)

> change the office web portal into dashboard. And add related to key metrics something like ongoing completed review and and add related to key metrics, something like ongoing, completed, review, and total and add related to one key metrics. It should be four different kind of key metrics. How we have quick action from the mobile application, same as we have to keep it in web portal also. As a Office team, they can able to view the photos, and if they can reject or approve, those actions also should be needed. Add that also if it is not there. And check these points are there or not. If it is not there, please add it below.
>
> What job am I reviewing?
>
> Which required photos have been submitted?
>
> Is any evidence missing or questionable?
>
> Can I trust the available metadata?
>
> What should I do next?

## Audit before building

| Question | Before this prompt | Now |
|---|---|---|
| What job am I reviewing? | Partly: ID, address, date and crew only | A job card saying "Reviewing job HR-2041" with the job type, date and time window, crew, review status, review progress and why the job matters |
| Which required photos have been submitted? | Only counts per phase | A **Required photos** card listing all 18 shots by phase, each marked Received / Uploading / Skipped. Received shots open the photo. |
| Is any evidence missing or questionable? | Mostly ("Before you share") | A **Missing or questionable** card: skipped shots with the crew's reason, shots not received yet, the blurry photo, retakes, and photos the office rejected |
| Can I trust the available metadata? | One line | A **Can I trust the details?** card, covered in the note below |
| What should I do next? | Missing | A **What to do next** list worked out from the evidence, below |
| Approve / reject | Missing | Built in the photo panel, below |

**Can I trust the details?** It covers:
- **Time taken:** from the phone clock. Every photo arrived within 4 minutes of being taken (calculated from the data).
- **Phase and area:** come from the checklist.
- **Taken by:** the crew member named on each photo.
- **Quality check:** the results.
- **What isn't recorded:** GPS location and original-file proof.

**What to do next** works from the evidence. In order:
1. Review the remaining photos.
2. Decide on the blurry photo.
3. Answer the customer about the gutter.
4. Wait for the uploads.
5. Deal with the skipped shot.
6. Retakes requested.
7. Mark the job as reviewed once every photo has a decision.

**Approve and Reject** are in the photo panel:
- **Reject** needs a reason (Blurry or too dark / Wrong area or angle / Doesn't show the work / Other) and allows an optional note to the crew. It asks the crew for a retake, which is labelled as not sent in this demo.
- Rejected photos can't be shared.
- **Undo** and **Next to review** are available after a decision.
- **Review status** shows as a chip on each photo card, and there is a review-status filter.

## What the AI did
- **Dashboard:** the office landing page is now a dashboard.
  - **Four key metrics:** Ongoing 3, Completed 6, Needs review 2 and Total jobs 13. They use the crew app's quick-action card style (icon, label, big number) in blue, green, orange and violet.
  - **Filtering:** clicking a metric filters the job list.
  - **Review banner:** "HR-2041 has 15 photos waiting for your review", with **Review now**.
  - **Search:** job search sits above the list. It is autofocused on desktop only.
- **Review page:** rebuilt the job page in the order of the five questions. Added approve / reject with a reason, Undo, Next to review, the review filter and **Mark job reviewed**. Once the job is marked reviewed, the dashboard moves it from Needs review to Completed.
- **Colour fix:** the crew app's quick-action labels still used a hard-coded cool grey (`#666D78`). Changed them to the sub-text token, which prompt 025 had missed.
- **Testing:**
  - **Desktop (1366px):** dashboard → filter by Needs review → Review now → Start review → Approve → Next → Reject with a reason and note → approve the rest → Mark job reviewed → dashboard counts update (Completed 7, Needs review 1).
  - **Phones (375px and 320px):** checked for horizontal overflow.

## Where the AI got it wrong
- The Reject button's border didn't show, because the base `.btn { border: 0 }` loads after `office.css`. Fixed with a more specific selector.
- After Approve or Reject, keyboard focus was lost because the button the user clicked disappeared. Focus now moves to **Next to review**.
- On phones, the search autofocus scrolled the page past the metrics and would open the keyboard. Autofocus is now desktop-only.
- At 320px the top bar was 11px too wide ("Halden Roofing" + "Dashboard"). The brand name now hides below 380px and the logo stays.
- In prompt 025 I said the colours were changed everywhere, but the quick-action labels still used a hard-coded grey.

## Follow-up: commit (text prompt, verbatim)

> Commit the office dashboard and review changes with the log updates.

- Committed the dashboard, the review workflow and the log updates in one commit.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
