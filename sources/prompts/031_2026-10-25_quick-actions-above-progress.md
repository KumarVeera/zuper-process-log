# Prompt 031: Quick actions above Today's progress, without a card

- **Date:** 2026-10-25
- **Input type:** Text prompt
- **Tool:** Claude Code (Claude Opus 5.5) · React app · built-in browser preview
- **Phase:** 4 · Test & refine (crew app)

## Prompt (verbatim)

> from crew mobile app application on the home page, there is a quick action card. So it should be above today's progress card. And remove the background of quick actions, white color and stroke.

## What the AI did
- **Home order** (`HomeScreen.jsx`): greeting → **Quick actions** → Today's progress → My schedule.
- **Quick actions:** removed the white card behind them (background, border and shadow). The title and the four coloured tiles now sit directly on the `#F5F5F7` page, lined up with the cards below. The tiles themselves are unchanged.
- **Tested** at 375 and 320px: quick actions sit above progress, with no wrapper background, border or shadow, no sideways scrolling, and tapping **Today** still opens its page.
- **App README:** the Home description now matches the new order.

## Follow-up: commit (text prompt, verbatim)

> Commit the Home change and log, regenerate the process-log site, and commit that too.

- Committed the app change and the log, then regenerated the process-log site and committed it separately.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
