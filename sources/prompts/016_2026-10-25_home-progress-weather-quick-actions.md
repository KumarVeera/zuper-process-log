# Prompt 016: Today's progress, weather and colour-coded quick actions on Home

- **Date:** 2026-10-25
- **Input type:** Text prompt (via `/anthropic-skills:figma-generate-design`), likely dictated by voice
- **Tool:** Claude Code (Claude Opus 5.5) · React app · built-in browser preview
- **Phase:** 3 · Prototype (iteration)

## Prompt (verbatim, abridged repeats kept)

> From above four cards, there are today my schedule, action required for my review. Above that, there are some other card also. Let's say example 14 LEM Street, full group started, how when they started and how many are left, and before some background images are there. Remove that entire card and replace with these details I'm adding now.
>
> TODAY'S PROGRESS / 1 of 3 jobs complete / 33% / 8:12 AM started / 5 photos uploaded
>
> So these details also should be as a card and there are some accents. Once we click on the today, in down it will show the schedule. And if you click the my schedule, it will show the my schedule and what if you click the action required, then it will show the details based on the cards. No need to show something like that. Just show the quick action below the today's progress, and show the weather condition. So that helps to the user what is the weather, because he is working on the roof. […] So that 4 cards, today, my schedule, action required for my review, keep it as a different color background. […] today's background color should be […] light green, and my schedule light orange, action required light red, for my review light blue, and stroke for all of the cards should be matched with their primary color. […]

## How the AI read it
- "Accents" = coloured accents on the progress card; "quick action" = the four cards, placed directly under the progress card.
- Weather sits at the top in a compact strip: the crew checks it before going up.

## What the AI did
- **Removed** the image-backed active-job card.
- **Today's progress card:**
  - "1 of 3 jobs complete", a 33% progress ring, "8:12 AM started", "5 photos uploaded"
  - green top accent; blue and green stat chips; a "Continue 14 Elm Street" link
  - all values are **live**: jobs complete today, start time from the work order, and photos actually uploaded
- **Matched the sample data to the given numbers:**
  - HR-2041 now starts at 8:12 AM (booked 8:00)
  - 5 Before photos are already uploaded, so the count is true rather than hard-coded
- **Quick actions:**
  - Today: light green with a green stroke · My schedule: orange · Action required: red · For my review: blue
  - the selected card gets a thicker stroke and a check badge; each opens its list below
  - label colours are dark shades of each hue for contrast
- **Weather (new):**
  - 64°F partly cloudy, wind 9 mph (gusts 18), rain 60% after 3 PM, UV 5
  - roof-safety note: "cover open decking by 2:30"
  - labelled **Sample forecast**, because no weather service is connected
- **Tested in the browser:**
  - each card shows the right list, with the right background and stroke colours
  - photos uploaded goes 5 → 6 after a save and upload
  - submitting HR-2041 turns 1 of 3 / 33% into 2 of 3 / 67% and the link changes to "View"
  - no errors
- **Fixed:** the first weather card was too tall and pushed Today's progress down; compacted it to two lines.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
