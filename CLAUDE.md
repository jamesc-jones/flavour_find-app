# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install dependencies
- `npm start` / `npm run dev` — run the server (both run `node server.js`, no watch mode configured)
- App serves on `http://localhost:3000` (or `PORT` env var)
- No test suite, linter, or build step exists in this project.
- To reset the recipe data: stop the server, delete `recipes.db`, restart — it's regenerated automatically from the seed data in `database.js` (see Architecture).

## Architecture

This is a small full-stack app with no build tooling: an Express backend serving a vanilla JS/HTML frontend, backed by SQLite.

- **`server.js`** — Express app with three read-only JSON API routes (`/api/moods`, `/api/recipes/:mood`, `/api/recipe/:mood/random`) plus static file serving from `public/`. All route logic just delegates to `database.js`; there's no separate router/controller layer.
- **`database.js`** — This single file does three distinct jobs and is almost entirely seed data:
  1. **Schema + init** (`initDatabase`, top of file): creates 4 tables (`moods`, `recipes`, `ingredients`, `instructions`) with foreign keys back to `moods`/`recipes` if they don't exist.
  2. **Seed data** (`getRecipesData`, the bulk of the file's ~980 lines): a large hardcoded object of recipes keyed by mood (happy, sad, stressed, energetic, cozy, adventurous, romantic, lazy), each with ingredients/instructions arrays. `populateDatabase()` inserts this into SQLite via a single transaction, but only runs once — it's gated by `recipeCount.count === 0` in `initDatabase()`, so **editing `getRecipesData()` has no effect on an existing `recipes.db`; the DB file must be deleted for changes to take effect**.
  3. **Query functions** (`getMoods`, `getRecipesByMood`, `getRandomRecipe`, bottom of file, exported via `module.exports`): the actual read API used by `server.js`. `getRecipesByMood` does N+1 queries (one per recipe for ingredients, one for instructions) — fine at this data scale, but worth knowing if extending it.
  - `initDatabase()` runs synchronously at module load time (`better-sqlite3` is synchronous throughout), so requiring `database.js` has the side effect of creating/populating the DB file.
- **`public/index.html` + `public/app.js`** — Static frontend, no framework, no bundler. Tailwind is pulled in via CDN in `index.html`. `app.js` is a single-page mood-selector/recipe-viewer with plain DOM manipulation and `fetch` calls to the API; `API_BASE` is hardcoded to `http://localhost:3000/api`, so the frontend won't work correctly if the server is run on a different port.

## Adding recipes/moods

New moods or recipes are added by editing the hardcoded object returned by `getRecipesData()` in `database.js` (and `getMoodEmoji()` if adding a new mood). Since seeding only happens on an empty database, `recipes.db` must be deleted afterward for the new data to load on next server start.

## QA & review governance

### Repository reviewer agent

Before a human performs a Git checkpoint after an implementation task, invoke the `repository-reviewer` agent (`.claude/agents/repository-reviewer.md`). It independently inspects the repo against the task's stated scope/constraints and reports **CHECKPOINT READY** or **CHECKPOINT BLOCKED**, with evidence for any blockers. It is read-only: it never stages, commits, tags, or otherwise writes to Git, and never auto-fixes findings — those actions remain the human's.

### Git checkpoint policy

By default, only the human performs Git write operations (`add`, `commit`, `tag`, etc.); agents may only propose the exact commands for the human to run, plus read-only commands to verify the result afterward. `repository-reviewer` always operates under this default — it is strictly read-only and has no Git write authority under any circumstances.

**Exception:** the `pr-reviewer` agent (`.claude/agents/pr-reviewer.md`) is authorized to perform the Git write operations of the checkpoint workflow itself (staging intended files, committing, and creating/repairing the checkpoint tag), but only when the user explicitly instructs it to execute the checkpoint (e.g. "commit and checkpoint this phase," "run the checkpoint commands"). A normal review request to `pr-reviewer` does not authorize Git writes — it must still report blockers/warnings/readiness first, the same as `repository-reviewer`. Outside of an explicit checkpoint-execution instruction, `pr-reviewer` follows the same propose-only default as every other agent.

### Playwright MCP usage policy

Playwright MCP is **required** for tasks whose acceptance criteria include browser/UI behavior — creating or substantially modifying a web UI, navigation, forms, auth UI, API-driven rendering, cart/checkout behavior, responsive behavior, or other significant frontend interaction/user journeys. When used, validate as appropriate: the app loads, navigation works, forms submit and show validation, API-driven data renders, no unexpected console errors, no broken critical links, and critical user journeys complete.

Playwright MCP is **not required**, and should not be invoked, for tasks with no browser-facing behavior (e.g. backend-only, tooling/config-only, or dependency changes).

### QA hierarchy

1. **Static/structural** — TypeScript, ESLint, formatting, configuration validation, build checks.
2. **Backend** — unit/integration tests where available, API tests, HTTP smoke tests, database validation where appropriate.
3. **Browser** — Playwright MCP, when UI/browser behavior is part of the task's acceptance criteria (see policy above).
4. **Production** — deployed-application verification, and browser-level verification of critical production journeys when appropriate.

These levels are complementary — passing a higher level does not excuse skipping a lower one that applies to the task.

### QA lesson: cold-start / readiness in smoke tests

During the Phase 1 Turborepo scaffold task, a smoke test that launched the app immediately after a clean `npm install` and probed it after a single fixed 3-second delay hit a transient `ECONNREFUSED` on first attempt (cold module/filesystem cache); the identical command passed once the app had warmed up. Treat this class of event as a readiness/timing issue, not necessarily an implementation failure.

For future smoke tests that launch a freshly installed or freshly rebuilt application: prefer bounded readiness polling against the actual health/API endpoint (poll with a max timeout, fail clearly if readiness is never reached) rather than relying solely on a single fixed sleep, where practical.
