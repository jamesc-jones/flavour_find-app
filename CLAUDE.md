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
