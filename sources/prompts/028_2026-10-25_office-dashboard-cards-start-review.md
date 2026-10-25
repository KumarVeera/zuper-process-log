# Prompt 028: Static metrics, job cards, Start review in the job card

- **Date:** 2026-10-25
- **Input type:** Text prompt (via `/figma-generate-design`), likely dictated by voice
- **Tool:** Claude Code (Claude Opus 5.5) · React app · built-in browser preview
- **Phase:** 4 · Test & refine (office view)

## Prompt (verbatim)

> From Office team dashboard, we have key metrics, then review now card. After that, all jobs are there. So once you click on the key metrics, each key metrics goes to different section. No need to go for different section. Remove the navigation from the key metrics. Just add the key metrics only. But after that, they have review now card. That should be there. So after that, all jobs are there, including search bar, and it's like a table format. Can you convert into card format? So it is easy to scan from the user end. So convert into card format. Then once you click on the review now, user can able to see the photos, how many photos they're uploaded, how many are record, those details are there. But there are one card is there. On the card, some details are there: job, date, crew, your view, review, everything is there. And there are there is a button called selected photos to share. So near to, I mean, beside that, can you add that button called start review? Because it is in this after scroll, you can able to see the start review button. But can you change the perspective of what do next? So that card, and it is mismatching in the file. Can you change that card? Because start review is important for here. So as a office team, they have to review the things. So for that, that is important. So how are you going to change that as intuitive and seamless experience for the office team?

## How the AI read it
- `/figma-generate-design` was invoked, but there is no Figma file, so (as before) the change went into the React office portal.

## What the AI did
- **Dashboard:**
  - **Key metrics:** now read-only. They no longer filter the job list.
  - **Review now card:** kept.
  - **All jobs:** rows became **cards** in a 3 / 2 / 1-column grid. Each card shows the job ID, a status chip, the address, the job type, the date and the photo count. Jobs needing review come first. Only HR-2041 opens; the others say "Photos not in this demo".
- **Job card on the review page:**
  - **Start review** is now the primary button beside *Select photos to share*, which became secondary. The button changes from *Continue review · N left* to *Mark job reviewed* and then *Job reviewed*.
  - A **review progress** bar shows approved and rejected out of 15.
  - "Your review" in the facts row became "Photos: received · uploading · skipped".
  - On phones, Start review sits above Share.
- **What to do next:**
  - **The review comes first:** it now leads with a blue review row (Start / Continue / Mark reviewed) instead of a list item.
  - **Follow-ups:** the rest share one style: a tinted icon, the text, and a consistent link-style action (*Open photo ›*, *Compare ›*). This replaces the mix of large primary and secondary buttons.
- **Fixed while testing:** the violet "Total jobs" metric showed a dark border, because the stylesheet load order overrode its colour. It was not a "selected" state.
- **Tested:** desktop at 1366px, phones at 320px.
  - dashboard cards: no overflow
  - Start review → Approve → *Continue review · 14 left* → all decided → *Mark job reviewed* → *Job reviewed*

## Where the AI got it wrong
- The violet metric's dark border existed since prompt 026. I read it as a selected state and didn't catch it until now.

## Follow-up: commit (text prompt, verbatim)

> Commit the office dashboard and Start review changes with the log updates.

- Committed the office changes and the log updates. Prompt 027's plan file and its timeline entry went in too, because the log links to them.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
