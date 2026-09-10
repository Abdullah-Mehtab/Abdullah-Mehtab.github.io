# Running a build-and-critique loop without burning the budget

Read this before starting any loop where an agent reviews work and you act on the review.

Written 2026-09-10 after the Cyber Sentinel chapter took ten critic rounds and ~1.0M tokens
to move a score from 5 to 6. The page ended up good. The loop was not what made it good, and
six of the ten rounds bought nothing.

---

## The one root failure

**I verified that my change existed. I never verified that it worked.**

`npm test` green, selector applies, computed style correct: all true, all irrelevant to
whether a reader sees any difference. Then I bought a fresh 100k-token opinion to find out.

That is using an oracle to answer a question a pixel diff answers in two seconds.

---

## The evidence, so this is not a feeling

Issue recurrence across the ten rounds, counted from the reports:

| finding | rounds it appeared in | times |
|---|---|---|
| the rooms do not read as different | 4, 5, 6, 8, 9, 10 | 6 |
| phone headings cut by the header | 4, 5, 7, 8, 9, 10 | 6 |
| a frame with nothing composed in it | 3, 4, 5, 6, 7, 9, 10 | 7 |
| vocabulary borrowed from the reference | 1, 2, 5, 6, 9 | 5 |
| no numbers in the copy (content, not fixable here) | 3, 7, 8, 9, 10 | 5 |

**After round three no new class of problem appeared.** The loop had stopped discovering and
started repeating. That is the stop signal, and it was visible from round five onward in data
I already had and never tabulated.

---

## Five rules

**1. A finding is about an outcome, not about a change. Close it with a measurement.**

Before touching code, write the check that would fail today and pass when the finding is
genuinely gone. Then fix until the check passes. Only then spend another review round.

Breaking it sounds like: "I raised the contrast, that should read now."

**2. Never let a critic tell you whether your last fix worked.**

That is the most expensive possible way to learn it. The critic exists to find what you
cannot see, not to confirm what you already changed. If the same finding returns, your fix
failed and you had no way of knowing, which is a tooling gap, not a design problem.

**3. Deterministic sweeps first, always, and build them before round one.**

They cost approximately nothing and catch a larger class of problem. Four exist, all in
`.claude-tools/`, which is **git-ignored**: they survive on this machine but not a fresh
clone, so if they are missing, rebuild them from these one-line descriptions.

| tool | what it measures |
|---|---|
| `audit-handoff.mjs` | sweeps every 40px: share of depths showing a fully composed frame, depths where two sections are legible at once, void bands |
| `audit-frames.mjs` | text lane edges, horizontal overflow, text under fixed chrome, faded elements, console errors |
| `audit-scene-difference.mjs` | hides the document, screenshots each scene, reports mean pixel delta and share of visibly differing pixels for every pair |
| `verify-chapter.mjs` | every theme applies and grades distinctly, scenes differ, cursor trail and truck and controls intact |

The third one is the one that cost six rounds by not existing. **Sample the same pixels
across states and report the delta.** If the delta is small, no amount of "but the CSS is
correct" matters. It flags four of six scene pairs as identical if the per-scene overrides
are stripped, and passes when they are restored; that was checked, not assumed.

**4. Drive one root to measured-closed. Do not do broad passes.**

A score out of ten is a whole-page judgement. Fixing item seven on a list does not move it.
Six items touched per round produces "still 6" every time. One root fixed and proven produces
a different page.

**5. Stop when the findings repeat, not when the round cap is reached.**

"Up to N rounds" is permission to stop. Tabulate recurrence after every round. Two rounds
with no new class of finding means the loop is done and the remaining work is yours or the
owner's. Report that instead of buying the same list again.

---

## Before spending a review round, all four must be true

- [ ] Every deterministic check passes, including a perceptual delta check for anything
      whose whole purpose is to be seen.
- [ ] Every finding from the last round is closed by a check, not by an assertion.
- [ ] I looked at the output myself first and cannot find the next problem.
- [ ] The previous round produced a class of finding I had not already seen.

## Cheaper mistakes from the same session, worth not repeating

- **Bash heredocs above ~100 lines fail to parse here.** Hit three times in one session after
  it was already documented. Write the script to a file and run it.
- **Check units before trusting arithmetic.** An overlap value was mis-derived by a factor of
  100 (viewport units read as percentages), shipped, and found by a sweep.
- **Do not let the last reviewer to speak overturn the previous one.** Per-act accent colours
  were added, removed on one round's advice, then re-added on another's. Reconcile conflicting
  reviews yourself; usually they are describing two different things.
- **A rule that constrains three numbers across two files needs a gate.** See
  `checkFilmActPacing` in `tools/check-site.mjs`, and
  `journal/2026-09-10-chapter-act-pacing-arithmetic.md`.
