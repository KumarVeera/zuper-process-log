# Prompt 017: #F5F5F7 background, Quick actions card, one page per quick action

- **Date:** 2026-10-25
- **Input type:** Text prompt (via `/anthropic-skills:figma-generate-design`) with a reference image of four tinted stat cards
- **Tool:** Claude Code (Claude Opus 5.5) · React app · built-in browser preview
- **Phase:** 3 · Prototype (iteration)

## Prompt (verbatim)

> background color should change into #f5f5f7 for all the pages. For quick action, there is no background. So add white color as a background, something like how today's progress card backgrounds are there. So you have to create a background, something like that. For example, background should be white color and there will be stroke also. Inside that you can add this quick actions. And one more thing, there will be a tab action. Let's say if you click on today's card, it is showing today's details and my schedule. If you click, it's showing my schedule details. So like that, it will go for action required for my review also. So those things not needed. So you can remove the those tab options, only show the card options. create separate pages for quick actions cards. Let's say if user clicking on today's card, it will go to new page. My schedule also same thing, it will go to new page. Action record also same thing, it will go to new page. For my review also, it will go to new page. Currently it's showing as a tab, remove that and add as a new page.

Reference image: four cards with a pale tint, a light matching stroke, a solid pastel icon square with a white icon, a big number and a grey label.

## What the AI did
- Page background token changed to **#F5F5F7** (every screen, plus the browser theme colour).
- **Quick actions card:** a white card with a stroke (same as Today's progress) holding the four tiles.
- **Restyled the tiles to match the reference:** pale tint, lighter matching stroke, solid coloured icon square with a white icon, number and grey label.
- **Removed the tab behaviour:** no selected state, and no list under the cards on Home.
- **New page per quick action** (`QuickScreen.jsx`):
  - **Today** (timeline), **My schedule** (booked jobs plus an "unscheduled" link), **Action required** (live tasks), **For my review** (office requests with *Mark as reviewed*)
  - each page has a back button and a tinted summary banner
  - the bottom nav stays, with Home active
  - opening a job from a quick page returns to that page
- **Tested in the browser:**
  - background rgb(245, 245, 247); Home no longer shows a list
  - all four pages show the right title, count and items
  - job → back returns to My schedule
  - "Mark as reviewed" drops the count 2 → 1 on both the page and Home
- **Fixed:**
  - the banner border rendered dark (a shorthand reset the colour)
  - the "Action required" label overflowed when forced onto one line; it now wraps

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
