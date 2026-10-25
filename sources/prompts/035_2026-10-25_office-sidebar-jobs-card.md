# Prompt 035: Office navigation as a sidebar; Jobs section as a card

- **Date:** 2026-10-25
- **Input type:** Text prompt (followed by "Try again" after a tool interruption)
- **Tool:** Claude Code (Claude Opus 5.5) · React app · built-in browser preview
- **Phase:** 4 · Test & refine (office web app)

## Prompt (verbatim)

> From Office team dashboard, can you make it navbar as a sidebar? Office, dashboard, schedule, customers, these are the options are there. Can you add other option called settings, logout? So it should be in the sidebar, and background also same as how it is there in the horizontal way, it should be in the vertical way. And one more thing, below review now card, there are jobs section. So it should be designed a way, something like how the other card designed. I mean, background is white and it should be stroke as well, and should be maintenance consistency as well.

> Try again

## What the AI did
- **Sidebar** (`OfficeApp.jsx`, `office.css`): replaced the top bar with a 240px white sidebar with a right border, the same look as the old top bar.
  - **Top:** the Halden Roofing · Office brand.
  - **Navigation:** Dashboard (current), Schedule, Customers.
  - **Bottom group:** Crew phone view, **Settings** and **Log out** (new), and the signed-in user (Sean Doyle, Project manager).
  - **New icons:** settings, log out, menu and customers.
- **Honest placeholders:** Schedule, Customers, Settings and Log out aren't built. They're shown in grey and, when tapped, show "… isn't part of this prototype" with an info icon (not a tick).
- **Narrow screens** (under 860px): the sidebar becomes a slide-in menu opened from a slim top bar.
  - It has a dimmed backdrop and a close button, and Esc or a backdrop tap closes it.
  - Focus moves into the menu when it opens and back to Menu when it closes.
- **Jobs section:** the title, search, tabs and job cards now sit inside a white outlined card (`card` class, 20px padding, 16px on phones), matching the other dashboard cards.
- **Photo panel:** it now sits flush to the top, since there's no top bar.
- **Tested:**
  - **Desktop (1366px):** sidebar, Jobs card, the Settings message, and the job page with the photo panel open (no overlap).
  - **Tablet (1024 and 900px):** sidebar visible, no overflow.
  - **Phones (375px and 320px):** the slide-in menu opens and closes, with focus in and out; no overflow.

## Where the AI got it wrong
- The first version didn't move focus into the slide-in menu, because it was still hidden by its slide animation when focus was set. It now becomes visible immediately and hides only after sliding out.

## Follow-up: commit (text prompt, verbatim)

> Commit the sidebar and Jobs card change and log, regenerate the process-log site, and commit that too.

- Committed the app change and the log, then regenerated the process-log site and committed it separately.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
