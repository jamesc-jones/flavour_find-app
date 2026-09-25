# Flavour Find — Phase 10: Production Deployment

**Document**: `phase10_plan_3.md`
**Version**: v1.0.27
**Status**: v1.0.27 is **APPROVED / AUTHORITATIVE** (carrying forward v1.0.26's baseline approval, Authorization Act #2, 2026-09-15), superseding v1.0.11 through v1.0.26, all of which remain preserved as historical predecessor states (see §12 "v1.0.12 Baseline Acceptance", "AC-B1 Human Interpretation and Documentation Record — Authorization Act #7", "AC-B7 Verification Result — Authorization Act #8", "AC-B2 Verification Result — Authorization Act #9", "AC-B3 / AC-B4 Verification Result — Authorization Act #10", "AC-B5 Verification Result — Authorization Act #13", "Task 10-B Acceptance State — Authorization Act #16", "Decision D-1 Resolution — Authorization Act #19", and "Task 10-C Acceptance Record — Authorization Act #22"). Task 10-A specification is documented as ACCEPTED below; Task 10-B is documented as ACCEPTED below (Authorization Act #16); Task 10-C is documented as ACCEPTED below (Authorization Act #22). Baseline approval authorizes adoption of this document as the current governance reference ONLY — it does NOT authorize Task 10-D or any later Phase 10 task, Caddy/TLS work, further application or infrastructure implementation, or any Git commit, tag, or push. **AC-B1–AC-B7: all PASS (see individual Act attributions in §5). Task 10-B: ACCEPTED (Authorization Act #16). Decision D-1: RESOLVED — production domain `flavourfind.com` (Authorization Act #19, 2026-09-17). AC-C1–AC-C3: all PASS (Authorization Act #21 implementation and verification). Task 10-C: ACCEPTED (Authorization Act #22, 2026-09-17)** — see §12 "Task 10-C Acceptance Record — Authorization Act #22." **This accepts Task 10-C's completed DNS implementation only; it does not authorize Task 10-D or any later Phase 10 task, Caddy installation, TLS/certificate configuration, or reverse-proxy work. Task 10-D and all later Phase 10 tasks remain NOT AUTHORIZED** and each requires its own separate, explicit future human authorization. **v1.0.21 (RC-31, Authorization Act #23 — human-selected, 2026-09-21) is a documentation-only correction that records the Task 10-F Option B (`prod-v*` version-tag-triggered production deployment) architecture; it did not implement the workflow change, and at the time of v1.0.21 Gate C was NOT SATISFIED, Task 10-F was NOT ACCEPTED, and production deployment was UNAUTHORIZED** — see §12 "v1.0.21 Documentation Correction Record — Authorization Act #23." **v1.0.22 (RC-32, Authorization Act #24, 2026-09-22) records Decision D-F5 — a human decision approving, in principle, a future, separately authorized Shape-1-only `server.js` Stripe-client-initialization deferral — and reconciles this document's wording accordingly; D-F5 is not implementation authorization, does not retroactively expand Task 10-F's authorization, and does not authorize any secret, Docker, registry, Droplet, Caddy, production, tag, commit, push, or reboot action. At the time of v1.0.22's publication, Gate C was NOT SATISFIED, Task 10-F was NOT ACCEPTED, and production deployment was UNAUTHORIZED** — see §12 "D-F5 Documentation Correction Record — Authorization Act #24." **v1.0.23 status summary (RC-33, Authorization Act #25, 2026-09-23 — historical; its release-target reference to `724fe67` is superseded by v1.0.24): Gate C is SATISFIED as of 2026-09-22 (see §8.1, "Gate C final prerequisite — explicit human authorization recorded"); whether a production release of the corrected commit `724fe67278df65a0f5d08125c6ed504015a8d299` is authorized remains a separate, undecided human decision (see §8.1 "Corrected-Dockerfile Docker evidence" and §12 "v1.0.23 Documentation Record — Authorization Act #25"). The first production release attempt (`prod-v1.0.0` → `a2d45cc`, run `35750588575`, 2026-09-22) FAILED at the registry push and did not deploy (see Task 10-F, "First production release attempt"). Task 10-F remains NOT ACCEPTED; no production deployment has occurred; the release mechanism for the corrected artifact (DEC-9) is intentionally unresolved.** **v1.0.24 status summary (RC-34, Authorization Act #26, 2026-09-24 — historical; its "no production deployment has occurred" and "DEC-9 … remains an undecided human decision" statements are superseded by v1.0.25): Gate C remains SATISFIED (2026-09-22, §8.1); Task 10-B remains ACCEPTED; Task 10-H remains ACCEPTED; Task 10-F remains NOT ACCEPTED; no production deployment has occurred. `724fe67` remains the historical evidence commit for the corrected `Dockerfile` (Decision D-F6; Task 10-B). The Deploy step's SSH remote-command defect was corrected in `48d62ac2bd47888e6ea67f726e5fcd1dfd7f8519` (pushed to `origin/main`); a production release must therefore target `48d62ac` or a later commit containing that fix — a tag at `724fe67` or `253e7df` would run the defective Deploy step (see Task 10-F, "Deploy-step SSH remote-command defect and correction" and "Release-readiness record (v1.0.24)"). DEC-9 (release mechanism, tag name, tag target, and explicit production-release authorization) remains an undecided human decision; no production release is authorized by this document.** **v1.0.25 status summary (RC-35, Authorization Act #27, 2026-09-24 — historical; superseded by v1.0.26): the first production deployment HAS OCCURRED — `prod-v1.0.1` → `c2249c90247e88a7679f9828478f692b7727fe4a`, GitHub Actions run `36003636133` attempt 2 (attempt 1 failed at SSH authentication before any remote command), image `sha256:e000b840828c6c6e1ade33fcd75eeac5b5f1e1a0365ba85b3816d206d3f06a09`, independently verified on the Droplet by the human (see Task 10-F, "Production release record (v1.0.25)"). The application is NOT publicly reachable: it is bound to `127.0.0.1:3000` and no Caddy/TLS exists (Task 10-D NOT AUTHORIZED). DEC-9 is RESOLVED (option B: new tag `prod-v1.0.1`). Gate C remains SATISFIED and was used for this release; Task 10-B, Task 10-C, Task 10-H remain ACCEPTED; Task 10-F remains NOT ACCEPTED; D-8 is not authorized within Phase 10 (deferred). Stage 1 human decisions (D-2, D-3, D-5 authorized in principle only; D-4 not authorized; D-8 deferred; AC-F7, AC-N4, AC-N5, PostgreSQL SSL, AC-E5) and the v1.0.25 decisions C1–C15 are recorded (§4 "Decision status (v1.0.25)"; §12 "v1.0.25 Documentation Record — Authorization Act #27"). No production release beyond `prod-v1.0.1`, no implementation of D-2/D-3/D-5 or the SSL change, and no Task 10-D work is authorized by this document.** **v1.0.26 status summary (RC-__, Authorization Act #__ — numbers to be assigned by the human, 2026-09-25 — historical; its "UNCOMMITTED at the time of writing" and "no Day 3 commit hash exists" statements are superseded by v1.0.27): the Day 2 PostgreSQL SSL change (`ssl: { rejectUnauthorized: true }`) is committed and pushed in `9448d2f15663b89a736be89084d29e9927029ede` (which contains only `database.js`) but is NOT deployed; P4 is OPEN (§1.5). The Day 3 implementation (D-2 `GET /health`, D-3 Sentry, D-5 environment-driven CORS, and the `SENTRY_DSN`/`CORS_ORIGIN` `deploy.yml` wiring) is implemented, its diff reviewed, and its non-production validation completed and reviewed; it is UNCOMMITTED at the time of writing, no Day 3 commit hash exists, and it is NOT deployed. Production is unchanged at `prod-v1.0.1` → `c2249c9`. No Day 3 commit, push, tag, secret creation, second production deployment, P4, or Task 10-D work is authorized by this document (§4 "Decision status (v1.0.26)"; §12 "Day 3 Non-Production Validation Record (v1.0.26)" and "v1.0.26 Documentation Record — Authorization Act #__").** **Current status (v1.0.27, RC-__, Authorization Act #__ — numbers to be assigned by the human, 2026-09-25): the Day 2 implementation commit `9448d2f15663b89a736be89084d29e9927029ede` and the Day 3 implementation commit `d1eaa1045fa4df09125e7e19eebb894211515c36` are committed and pushed to `origin/main`; neither is deployed; P4 is OPEN. Production is unchanged at `prod-v1.0.1` → `c2249c9`. Human decisions A1–F2 are recorded (§4 "Decision status (v1.0.27)"); AC-L4 is SATISFIED by human decision A1 (Task 10-L). `CORS_ORIGIN` and `SENTRY_DSN` are decided (B1, C1) but NOT authorized and NOT created; Sentry is not set up. Retrospective repository-reviewer reviews of `9448d2f` and `d1eaa10` are complete (§12 "Retrospective Repository-Reviewer Evidence (v1.0.27)"); they do not retroactively satisfy the original pre-checkpoint timing requirement. No secret creation, Sentry setup, documentation commit or push, `prod-v*` tag creation or push, second production deployment, P4, production verification, registry read, Task 10-D work, or checkpoint tag is authorized by this document (§12 "v1.0.27 Documentation Record — Authorization Act #__").**
**Supersedes**: `phase10_plan_2.md` v1.0.1 (2026-09-10)
**This version**: 2026-09-25 — Documentation recording (v1.0.27, RC-__, Authorization Act #__ — numbers to be assigned by the human): records the human Day 4 governance decisions A1 (AC-L4 satisfied for Phase 10; AC-L4 checkbox changed by this human decision), B1 (create `CORS_ORIGIN` = `https://flavourfind.com` — decision only), C1 (set up Sentry and create `SENTRY_DSN` — decision only), D1 (retrospective repository-reviewer reviews), E1 (a separately authorized `prod-v*` release tag permitted for the second production deployment, distinct from the Phase 10 checkpoint tag), and F2 (intended release target: the later documentation-only commit containing this v1.0.27 document, SHA not yet known); the retrospective repository-reviewer evidence for `9448d2f` and `d1eaa10` (original pre-checkpoint requirement not met; retrospective CHECKPOINT READY for content/scope), including a Day 2 reviewer observation not adopted as evidence and a Day 3 reviewer temporary-file process slip; and that `d1eaa10` is committed and pushed. AC-L4 is the only checkbox changed; no acceptance-criterion wording changed; no task newly accepted. Documentation-only: no other file was modified by this documentation pass; no Git write, tag action, workflow run, secret access, or production action occurred in making it; it does not authorize any secret creation, Sentry setup, commit, push, tag creation or push, deployment, P4, production verification, registry read, Task 10-D work, or Task acceptance. See §11 v1.0.27 and §12 "v1.0.27 Documentation Record — Authorization Act #__."
**Previous version (v1.0.26)**: 2026-09-25 — Documentation recording (v1.0.26, RC-__, Authorization Act #__ — numbers to be assigned by the human): records the Day 2 PostgreSQL SSL change (committed and pushed in `9448d2f`, containing only `database.js`; Day 2 validation evidence; not deployed; P4 OPEN); the Day 3 implementation of D-2, D-3, and D-5 with the `SENTRY_DSN`/`CORS_ORIGIN` `deploy.yml` wiring and the two `.env.example` lines (uncommitted at the time of writing; no Day 3 commit hash exists); the Day 3 decisions K1–K5 and K7–K14 (no K6 issued); the Day 3 non-production validation record (Playwright E2E NOT RUN; AC-J4 DEFERRED; AC-J2 OPEN; AC-L2/AC-L3 UNVERIFIED); an AC-L3 interpretation note (K7) that leaves the criterion wording unchanged; the existing §1.6 discrepancy (recorded, not corrected); and an out-of-scope validation-session governance deviation (`docker builder prune -f --filter until=2h`). No acceptance-criterion wording changed and no checkbox changed; no task newly accepted. Documentation-only: no other file changed; no Git write, tag action, workflow run, secret access, or production action occurred in making it; it does not authorize any commit, push, deployment, P4, secret creation, Task 10-D work, or Task acceptance. See §11 v1.0.26 and §12 "v1.0.26 Documentation Record — Authorization Act #__."
**Previous version (v1.0.25)**: 2026-09-24 — Documentation recording (RC-35, Authorization Act #27): records the first production deployment (`prod-v1.0.1` → `c2249c9`, run `36003636133` attempt 1 failed at SSH; credential correction; attempt 2 succeeded; human Droplet verification; non-public state) and DEC-9's resolution; the human AC-F6 production-path determination (SATISFIED); the Stage 1 human decisions (D-2, D-3, D-5 authorized in principle only; D-4 not authorized; D-8 not authorized within Phase 10 (deferred); AC-F7 disposition; AC-N4; AC-N5; PostgreSQL SSL; AC-E5) and decisions C1–C15, including checkbox changes for AC-F1, AC-F2, AC-F4, AC-E5 (AC-F5 left unchecked), the C11 human-run SSL-mode log check result, single-origin CORS, Play Store outside Phase 10, and a pre-go-live Clerk check; an effective-TLS-behavior nuance for §1.5 (recorded as unverified); rollback-evidence status (AC-N2 first-deployment record is a single newline); status notes for Tasks 10-A, 10-B, 10-D, 10-E, 10-G, 10-I, 10-J, 10-K, 10-L, 10-N and Gates A, C, D; and the §8.2 template's stale version reference. No acceptance-criterion wording changed; AC-F5, AC-F7 (literally NOT SATISFIED), AC-F8, AC-E1, AC-E3, AC-N2–AC-N5 remain open; no task newly accepted. Documentation-only: no application/infrastructure file changed; no Git write, tag action, workflow run, DOCR/secret access, or production action occurred in making it; it does not authorize any implementation, deployment, release, Task 10-D work, or Task acceptance. See §11 v1.0.25 and §12 "v1.0.25 Documentation Record — Authorization Act #27."
**Previous version (v1.0.24)**: 2026-09-24 — Documentation recording (RC-34, Authorization Act #26): reconciles this document to the actual release state at `48d62ac2bd47888e6ea67f726e5fcd1dfd7f8519`. Records the Deploy-step SSH remote-command defect and its correction in `48d62ac` (the only change to `.github/workflows/deploy.yml` since `a5318ab`); records that a production release must target `48d62ac` or a later commit containing that fix, while `724fe67` remains the historical evidence commit for the corrected `Dockerfile` (unchanged through `48d62ac`); records the human-reported read-only Droplet Docker-readiness checkpoint; records the `DROPLET_SSH_KEY` non-interactive-use uncertainty as an operational risk tested by AC-F5, not a pre-tag requirement; records the `${{ secrets.X }}` inline-interpolation concern as a separate non-blocking follow-up; and updates current-status references (header, Gate A, Gate C note, footer). No acceptance status changes; no criterion newly checked. DEC-9 remains an undecided human decision. Documentation-only: no application/infrastructure file changed; no Git write, tag action, workflow run, DOCR/Droplet/secret access, or production action occurred in making it; and it does not authorize any production release, retry, tag creation/movement/push, or deployment. See §11 v1.0.24 and §12 "v1.0.24 Documentation Record — Authorization Act #26."
**Previous version (v1.0.23)**: 2026-09-23 — Documentation recording (RC-33, Authorization Act #25): records Decision D-F6 (the corrected three-stage `Dockerfile`, blob `ffe54bf1caf9d90a501661e84ea4cb503bf46a34` at commit `724fe67278df65a0f5d08125c6ed504015a8d299`, replacing D-F1's `Dockerfile` reference only); corrected-Dockerfile evidence for AC-B1–AC-B7 and AC-GOV-7 (Task 10-B remains ACCEPTED; original Act-numbered PASS records preserved as historical evidence); corrected-Dockerfile Docker evidence for the Gate C Docker bullet (Gate C remains SATISFIED; release authorization for the corrected commit is not inferred); the factual record of the failed first production release attempt (`prod-v1.0.0` → `a2d45cc`, run `35750588575`, image build succeeded, DOCR push denied with `quota exceeded`, deploy skipped, no Droplet change, no retry); a manual DigitalOcean control-panel registry observation; the previously unrecorded implementation commits `7425b3d` and `a5318ab`; and current-status corrections (header, §1, Gate A, footer). AC-F1 and AC-F2 remain unchecked; no AC-F, AC-N, or other criterion is newly checked. The release mechanism for the corrected artifact (DEC-9) is intentionally unresolved. This is a documentation-only recording: no application/infrastructure file changed; no Git write, tag action, workflow run, DOCR/Droplet/secret access, or production action occurred in making it; and it does not authorize any production release, retry, tag creation/movement/push, or deployment. See §11 v1.0.23 and §12 "v1.0.23 Documentation Record — Authorization Act #25."
**Previous version (v1.0.22)**: 2026-09-22 — Documentation correction (RC-32, Authorization Act #24): records Decision D-F5, inserted into the existing Task 10-F D-F1–D-F4 decision block. D-F5 is a human decision approving, in principle, a future, separately authorized `server.js` change that defers Stripe client construction (Shape 1 only: initialization in `server.js` only, preserving the existing `stripe` identifier and all four existing Stripe call sites, excluding any webhook/checkout/billing-portal/frontend/database/package-file/SDK-version/logging/error-handling change), together with the accepted webhook nuance (a deferred, still-unconfigured Stripe client may still throw on first access, caught by the existing webhook try/catch and producing its existing 400 response) and an explicit list of what D-F5 does not authorize (any Stripe secret action, placeholder production credentials, any change to D-8, any Docker/DOCR/Droplet/Caddy/production/tag/commit/push/reboot action). This pass also reconciles §0, §3, Task 10-F, AC-B5, AC-F7, AC-GOV-1, Gate C, and the Task 10-E first-pass/second-pass clarification with D-F5 via narrow clarifications and cross-references, without rewriting any existing rule, criterion wording, or historical evidence record (Authorization Act #13 / AC-B5, the 2026-09-19 AC-F7 recording, and all other prior acceptance/execution records are preserved unchanged). AC-F7's checkbox is not changed by this pass; a note records that it is to be treated as NOT SATISFIED under its literal wording once the Shape 1 implementation actually occurs. This is a documentation-only correction: `server.js`, `.github/workflows/deploy.yml`, `package.json`, `package-lock.json`, and all other application/infrastructure files are unchanged; no Git write, workflow run, or production action occurred; and it does not authorize `server.js` implementation, any secret action, any `prod-v*` tag creation or push, any production deployment, or Task 10-F/Task 10-E acceptance. See §11 v1.0.22 correction narrative and §12 "D-F5 Documentation Correction Record — Authorization Act #24."
**Phase 8 baseline**: `phase8_plan_1_4.md` v1.1.8
**Phase 8 checkpoint tag**: `phase-8-checkpoint-1` → `ad5776f5f2653785706727c9381249d587f1faf8`
**Current HEAD at time of writing**: `d1eaa1045fa4df09125e7e19eebb894211515c36` — the Day 3 implementation commit (pushed to `origin/main`), whose parent `9448d2f15663b89a736be89084d29e9927029ede` is the Day 2 implementation commit. If this v1.0.27 document is committed under separate authorization, that commit's SHA will be recorded only in a later documentation pass, after the commit exists.

---

## §0. Governance Preamble

This document is a PLANNING SPECIFICATION ONLY. It does not authorize any implementation.
Each task described herein requires separate, explicit human authorization before any work begins.
No task in this document may be treated as pre-authorized by virtue of appearing here.

### Absolute Rules (in effect for this document and all work derived from it)

- Do not modify application source code. *(D-F5, recorded 2026-09-22, is the specific, narrow,
  explicitly recorded exception to this rule: it is a human decision record approving, in
  principle, a future, separately authorized `server.js` Stripe-client-initialization change —
  see Task 10-F, "D-F5 — Stripe client initialization deferral." D-F5 does not itself authorize
  any edit; a further separate, explicit implementation authorization is required before any
  `server.js` change is made. This rule remains in force everywhere else in this document.)*
- Do not modify `package.json` or `package-lock.json`.
- Do not modify infrastructure files.
- Do not create or modify GitHub Actions workflows.
- Do not create or modify Docker/Caddy configuration.
- Do not access or change production infrastructure.
- Do not access or modify Stripe live configuration.
- Do not access or modify Neon production infrastructure.
- Do not create, rotate, expose, or record any real secrets.
- Do not commit, tag, or push anything.
- Do not modify the existing Phase 8 implementation to make the Phase 10 plan easier to write.
- Planning-document changes only.

---

## §1. Baseline Verification Report

The following was verified by direct inspection of repository files before drafting this document.
This report is authoritative. All task specifications in §5 derive from it.

### 1.1 Git State

| Item | Verified Value |
|------|---------------|
| Current HEAD | `c366af0bc9d32c7ee4ae047ee2f0280b9944af0f` (refs/heads/main) |
| `phase-8-checkpoint-1` tag target | `ad5776f5f2653785706727c9381249d587f1faf8` |
| Authoritative Phase 8 plan version | v1.1.8 (`phase8_plan_1_4.md`) |
| HEAD declared in Phase 8 plan v1.1.8 | `e116e8f300aec9774a15f2f9e9a6cb9aaa60180e` |

**DISCREPANCY — informational, non-blocking**: `phase8_plan_1_4.md` v1.1.8 declares HEAD as
`e116e8f...`, but the actual current HEAD is `c366af0...`. Commits were made to `main` after
the Phase 8 plan document was last updated. The authoritative Phase 8 completion
marker is the immutable tag `phase-8-checkpoint-1` (`ad5776f...`). Phase 10 planning proceeds
from that tag.

### 1.2 Backend Architecture

| Item | Value (Verified) |
|------|------------------|
| Entry point | `server.js` (root, CommonJS JavaScript) |
| Language | JavaScript (CommonJS) |
| `package.json` `main` | `"main": "server.js"` |
| Start command | `node server.js` |
| Express port | 3000 |

`apps/api/` does **not exist**. The directory `apps/` contains only `apps/web/`.

### 1.3 Frontend Architecture

| Item | Value (Verified) |
|------|------------------|
| Location | `apps/web/` |
| Framework | Next.js 15.2.9 |
| Dev port | 3001 (confirmed: `"dev": "next dev -p 3001"`) |
| Build output | Static export — `output: 'export'` in `apps/web/next.config.ts` |
| `trailingSlash` | `true` (set in `apps/web/next.config.ts`) |
| Output directory | `apps/web/out/` (Next.js static export default) |
| Auth | `@clerk/react` 6.15.1 |
| Mobile | `@capacitor/core` 8.5.1, `@capacitor/android` 8.5.1 |
| Styling | Tailwind CSS 3.4.17 (compiled at build time via PostCSS — not loaded from CDN) |
| Analytics | PostHog — **NOT PRESENT** (not in `apps/web/package.json`) |

### 1.4 Workspace Layout

The root `package.json` declares:

```json
"workspaces": ["apps/*", "packages/*"]
```

The `packages/` directory exists in the repository and is referenced as a workspace.
`apps/web/package.json` depends on `@flavour-find/types: 0.1.0`, which is a local
workspace package residing in `packages/`. The `packages/` directory must be present
in the Docker build context for `npm ci` to install this local dependency correctly.
See Task 10-B.

### 1.5 Database Schema (Authoritative — Verified from `database.js`)

The following 10 tables are implemented in `database.js`. This is the complete schema.
`database.js` uses PostgreSQL exclusively via the `pg` package. `better-sqlite3` remains
in root `package.json` but is not called anywhere in `database.js` or `server.js`.

**Schema provenance**: Tables 1–8 were established by Phase 6. Tables 9–10 (`users` and
`user_subscriptions`) were **authoritatively introduced and human-approved during Phase 8
Task 8-A**, as documented in `phase8_plan_1_4.md` Appendix B (v1.1.8). The 10-table count
reflects that deliberate, authorized expansion of the schema. Phase 10 does not introduce
new tables; it initializes the existing 10-table schema in the production Neon database.

1. `moods` — `id SERIAL PK`, `name TEXT UNIQUE NOT NULL`, `emoji TEXT`
2. `recipes` — `id SERIAL PK`, `mood_id INT NOT NULL FK→moods`, `name TEXT NOT NULL`, `emoji TEXT`, `description TEXT`
3. `ingredients` — `id SERIAL PK`, `recipe_id INT NOT NULL FK→recipes`, `ingredient TEXT NOT NULL`, `order_index INT`
4. `instructions` — `id SERIAL PK`, `recipe_id INT NOT NULL FK→recipes`, `instruction TEXT NOT NULL`, `step_number INT`
5. `user_saved_recipes` — `id SERIAL PK`, `user_id TEXT NOT NULL`, `recipe_id INT NOT NULL FK→recipes`, `saved_at TIMESTAMPTZ DEFAULT NOW()`, `UNIQUE(user_id, recipe_id)`
6. `mood_history` — `id SERIAL PK`, `user_id TEXT NOT NULL`, `mood TEXT NOT NULL`, `recipe_id INT`, `created_at TIMESTAMPTZ DEFAULT NOW()`
7. `meal_plan` — `id SERIAL PK`, `user_id TEXT NOT NULL`, `recipe_id INT NOT NULL FK→recipes`, `planned_date DATE NOT NULL`, `meal_slot TEXT NOT NULL CHECK IN ('breakfast','lunch','dinner','snack')`
8. `chat_usage` — `id SERIAL PK`, `user_id TEXT NOT NULL`, `model TEXT NOT NULL DEFAULT 'pending'`, `tokens_in INT NOT NULL DEFAULT 0`, `tokens_out INT NOT NULL DEFAULT 0`, `cost_usd NUMERIC(10,6) NOT NULL DEFAULT 0`, `created_at TIMESTAMPTZ DEFAULT NOW()`; INDEX on `(user_id, created_at)`
9. `users` — `id TEXT PK`, `email TEXT UNIQUE NOT NULL`, `tier TEXT NOT NULL DEFAULT 'free'`, `stripe_customer_id TEXT UNIQUE`, `created_at TIMESTAMPTZ DEFAULT NOW()`; INDEX on `(tier)` *(introduced Phase 8 Task 8-A — authorized)*
10. `user_subscriptions` — `id SERIAL PK`, `user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE`, `stripe_subscription_id TEXT UNIQUE`, `plan TEXT NOT NULL`, `status TEXT NOT NULL`, `current_period_end TIMESTAMPTZ`, `updated_at TIMESTAMPTZ DEFAULT NOW()`; INDEX on `(user_id)`, INDEX on `(status)` *(introduced Phase 8 Task 8-A — authorized)*

**Tables that do not exist and must not be created**: `user_preferences`, `grocery_list`.
Grocery list data is computed dynamically from `meal_plan` by `getGroceryList()`.

**Database initialization behavior**: `database.js` calls `initDatabase()` immediately on
module load. All DDL uses `CREATE TABLE IF NOT EXISTS` and `CREATE INDEX IF NOT EXISTS`
(fully idempotent). Seeding runs inside a transaction and is guarded by a row-count check
on the `recipes` table (seeds only if `COUNT(*) = 0`). Running `node database.js` performs
schema initialization and guarded seed initialization automatically. No separate seed command
is required.

**PostgreSQL SSL configuration note**: The `pg.Pool` in `database.js` is configured with
`ssl: { rejectUnauthorized: false }`. This disables Node.js certificate-chain verification
on the database connection. This is a security consideration that must be reviewed before
production deployment. The Phase 10 plan does not claim that standard certificate verification
is in effect while this option is active. If a stricter SSL configuration is desired for
production, that change requires separate implementation authorization and must be validated
against the specific Neon connection endpoint. This plan does not authorize that change.

**v1.0.25 note — effective TLS behavior (nuance; not independently verified)**: The statement above
describes the pool's own `ssl` option. With the `pg` 8.23.0 and `pg-connection-string` 2.14.0
versions pinned in `package-lock.json`, settings parsed from `connectionString` override the pool's
`ssl` option (`pg/lib/connection-parameters.js`), and any `sslmode` parameter in `DATABASE_URL`
sets `ssl = {}` (`pg-connection-string/index.js`); `prefer`, `require`, and `verify-ca` are treated
as aliases for `verify-full` (with a "SECURITY WARNING: The SSL modes …" deprecation warning), and
only `no-verify` or `disable` turns verification off. Whether production certificate verification is
currently in effect therefore depends on the `sslmode` in the `DATABASE_URL` secret, which has not
been read. **C11 human-run read-only check (2026-09-24)**: on the production Droplet, the human ran
`docker logs flavourfind-app 2>&1 | grep -c "SECURITY WARNING: The SSL modes"`; the result was
**1**. What this establishes: the running container's log contains one line matching that warning
text. Under the pinned library code, that warning is emitted only when the connection string's
`sslmode` is `prefer`, `require`, or `verify-ca`, which would cause the connection-string SSL
setting (`{}`, certificate verification enabled) to override `rejectUnauthorized: false`. This is an
inference from library code; it is **not** a direct observation of certificate verification, and
`DATABASE_URL` was not read, printed, or exposed. The statement above is therefore preserved as a
description of the pool option, not as a determination of the production connection's actual state.
**Disposition (human decisions, Stage 1 and C10)**: CHANGE BY SEPARATE AUTHORIZATION — the current
configuration is not accepted as the final public-production posture; the Day 2 change will
explicitly set `ssl: { rejectUnauthorized: true }` in the pool configuration; no `DATABASE_URL`
secret change is required by this decision. The change requires separate implementation
authorization, validation against the actual Neon endpoint (including a negative test showing that
verification is enforced), regression/connection testing, and deployment before public HTTPS go-live.
**Timing (recorded honestly)**: the review this section requires "before production deployment" was
completed after the `prod-v1.0.1` production deployment, and before public HTTPS go-live.

**v1.0.26 note — Day 2 SSL change (implemented, committed, pushed; NOT deployed; P4 OPEN)**: The text
above is preserved as the historical description of the pool option as it stood through v1.0.25.
- *Implementation (source: the commit itself)*: the `pg.Pool` `ssl` option in `database.js` was
  changed from `{ rejectUnauthorized: false }` to `{ rejectUnauthorized: true }`. Commit
  `9448d2f15663b89a736be89084d29e9927029ede` contains only `database.js` (+1/−1) and was pushed to
  `origin/main`. The commit establishes that the change was implemented, committed, and pushed.
- *Validation (source: the Day 2 non-production validation session evidence, not the commit)*: P1–P3
  connections to the production database endpoint reported `tls_authorized=true` (URL as-is;
  `sslmode` removed in memory; inside the `node:22-alpine` image); N1–N5 disposable negative tests
  rejected a self-signed certificate, a wrong hostname, and an untrusted CA; application regression
  passed; initialization fails closed on an untrusted certificate. No `DATABASE_URL` change.
- *Deployment*: NOT deployed. Production remains `prod-v1.0.1` → `c2249c9`, which runs the previous
  `rejectUnauthorized: false` code.
- *P4 — OPEN*: P4 is the second-production-deployment verification item — the workflow's `/api/moods`
  smoke checks plus a restart count of 0 on the new production container running a commit that
  contains `9448d2f`. P4 is defined by the Day 2 session and was not previously defined in this
  document. P4 remains open until the new implementation has gone through that second production
  deployment verification.

### 1.6 Environment Variables (Authoritative)

Verified from `.env.example` and direct `server.js` inspection.

**Present in `.env.example`**:

| Variable | Example value |
|----------|--------------|
| `ANTHROPIC_API_KEY` | _(blank)_ |
| `DATABASE_URL` | `postgresql://user:password@host/flavourfind?sslmode=require` |
| `STRIPE_SECRET_KEY` | `sk_test_REPLACE_ME` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_REPLACE_ME` |
| `STRIPE_PREMIUM_PRICE_ID` | `price_REPLACE_ME` |
| `STRIPE_SUCCESS_URL` | `http://localhost:3001/billing?result=success` |
| `STRIPE_CANCEL_URL` | `http://localhost:3001/billing?result=cancel` |
| `STRIPE_PORTAL_RETURN_URL` | `http://localhost:3001/billing` |

**Consumed by `server.js` but absent from `.env.example`** (documentation gap):

| Variable | Purpose |
|----------|---------|
| `PORT` | Express listen port (defaults to 3000) |
| `AI_CHAT_LIMIT_FREE` | Rate limit integer for free-tier users (rolling 24-hour window) |
| `AI_CHAT_LIMIT_PREMIUM` | Rate limit integer for premium-tier users (rolling 24-hour window) |
| `CLERK_SECRET_KEY` | Clerk backend middleware — auto-read by `@clerk/express` |

**Build-time vs. runtime environment variable classification**:

This classification is critical because the frontend is a static Next.js export. Variables
with the `NEXT_PUBLIC_` prefix are baked into the JavaScript bundle at `next build` time
and cannot be changed at container runtime.

| Variable | When needed | Notes |
|----------|-------------|-------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | **Build time** (Docker build) | Baked into static JS bundle by `next build`. Must be passed as a Docker build argument. The production Clerk publishable key (`pk_live_...`) must be supplied during `docker build`. Must never be the test key from `.env.local`. |
| `NEXT_PUBLIC_API_URL` | Build time | Defaults to `''` (empty string) if not set. Empty string is the correct production value — frontend API calls become relative paths (`/api/...`) and route through Caddy to the Express server. No build argument is required for this variable in production. |
| `NEXT_PUBLIC_POSTHOG_KEY` | Build time (if D-4 authorized) | PostHog not currently installed. Gated behind D-4. |
| `NEXT_PUBLIC_POSTHOG_HOST` | Build time (if D-4 authorized) | PostHog not currently installed. Gated behind D-4. |
| `DATABASE_URL` | Runtime only | Server-side secret. Never baked into the image. Injected at container start. |
| `ANTHROPIC_API_KEY` | Runtime only | Server-side secret. Never baked into the image. Injected at container start. |
| `STRIPE_SECRET_KEY` | Runtime only | Server-side secret. Never baked into the image. Injected at container start. |
| `STRIPE_WEBHOOK_SECRET` | Runtime only | Server-side secret. Never baked into the image. Injected at container start. |
| `STRIPE_PREMIUM_PRICE_ID` | Runtime only | Server-side. Injected at container start. |
| `STRIPE_SUCCESS_URL` | Runtime only | Server-side. Injected at container start. |
| `STRIPE_CANCEL_URL` | Runtime only | Server-side. Injected at container start. |
| `STRIPE_PORTAL_RETURN_URL` | Runtime only | Server-side. Injected at container start. |
| `CLERK_SECRET_KEY` | Runtime only | Server-side secret. Never baked into the image. Injected at container start. |
| `AI_CHAT_LIMIT_FREE` | Runtime only | Integer. Injected at container start. |
| `AI_CHAT_LIMIT_PREMIUM` | Runtime only | Integer. Injected at container start. |
| `NODE_ENV` | Runtime only | Set to `production` at container start. |
| `PORT` | Runtime only | Defaults to 3000 if unset. Injected at container start (optional). |

**IMPORTANT**: GitHub repository secrets do not automatically become container environment
variables. The CI/CD workflow (Task 10-F) must explicitly pass runtime secrets to the
container at deployment time via `docker run -e VAR=value ...` or an equivalent
`--env-file` approach. Runtime secrets must never be written into the Docker image layers.

**v1.0.26 note — Day 3 environment variables (implemented; uncommitted at the time of writing)**:
`SENTRY_DSN` (Task 10-J) and `CORS_ORIGIN` (Task 10-L) are runtime-only variables, injected at
container start by `.github/workflows/deploy.yml` (existing `printf 'export %q'` block, and both the
candidate and final `docker run` commands), and are present with blank values (`SENTRY_DSN=`,
`CORS_ORIGIN=`) in the Day 3 `.env.example` change. Neither GitHub secret has been created.

**v1.0.26 note — existing §1.6 discrepancy (recorded, not corrected)**: The "Present in
`.env.example`" table above lists six `STRIPE_*` variables and a `DATABASE_URL` example that differs
from the committed file. The committed `.env.example` (HEAD blob `4c33dc6`) contains neither the
`STRIPE_*` lines nor that `DATABASE_URL` example; the `STRIPE_*` lines exist only as pre-existing,
uncommitted working-tree edits. This existing discrepancy is intentionally outside the Day 2/Day 3
implementation scope and is not corrected by this pass unless explicitly authorized later; the table
above is preserved unchanged.

### 1.7 Actual API Routes (Verified from `server.js`)

| Method | Path | Auth Required |
|--------|------|--------------|
| GET | `/` | None (static file) |
| POST | `/api/billing/webhook` | Stripe signature |
| GET | `/api/moods` | Optional Clerk |
| GET | `/api/recipes/:mood` | Optional Clerk |
| GET | `/api/recipe/:mood/random` | Optional Clerk |
| GET | `/api/user/saved` | Required Clerk |
| POST | `/api/user/saved` | Required Clerk |
| DELETE | `/api/user/saved/:id` | Required Clerk |
| GET | `/api/user/mood-history` | Required Clerk |
| POST | `/api/user/mood-history` | Required Clerk |
| GET | `/api/user/meal-plan` | Required Clerk |
| POST | `/api/user/meal-plan` | Required Clerk |
| DELETE | `/api/user/meal-plan/:id` | Required Clerk |
| GET | `/api/user/grocery-list` | Required Clerk |
| **POST** | **`/api/billing/checkout`** | Required Clerk |
| **POST** | **`/api/billing/portal`** | Required Clerk |
| GET | `/api/billing/status` | Required Clerk |
| POST | `/api/v1/chat` | Required Clerk |
| **GET** | **`/health`** | **DOES NOT EXIST** |

**v1.0.26 note**: The `/health` row above is preserved as the baseline. `GET /health` (no
authentication; process-only; returns `{"status":"ok"}`) is implemented by Day 3 (Task 10-I, D-2),
uncommitted at the time of writing, and NOT deployed.

**CORRECTION from v1.0.1**: `/api/billing/checkout` and `/api/billing/portal` were
incorrectly listed as `GET` in v1.0.1 §1.6. Both are `POST`, confirmed by `server.js`
(`app.post(...)`) and `apps/web/lib/api.ts` (`method: 'POST'`).

**Note on versioned routing**: Only `POST /api/v1/chat` uses the `/api/v1/` prefix. All
other routes use `/api/` directly.

### 1.8 Middleware Order (Exact, from `server.js`)

```
helmet()
compression()
pinoHttp()
cors()   ← wide-open, no CORS_ORIGIN
[Stripe webhook: POST /api/billing/webhook with express.raw()]
express.json()
express.static('public')
clerkMiddleware()
[routes]
```

The Stripe webhook handler uses `express.raw({ type: 'application/json' })` and is registered
**before** `express.json()`. This ordering is critical and must not be changed without explicit
authorization.

**v1.0.26 note — Day 3 source order (implemented; uncommitted at the time of writing; NOT
deployed)**: `require('dotenv').config()` → `Sentry.init({ dsn: process.env.SENTRY_DSN })` →
remaining requires → `helmet()` → `compression()` → `pinoHttp()` →
`cors({ origin: process.env.CORS_ORIGIN || '*' })` → [Stripe webhook with `express.raw()`] →
`express.json()` → `express.static('public')` → `clerkMiddleware()` → `GET /health` → [routes] →
`Sentry.setupExpressErrorHandler(app)` → startup. The Stripe webhook's position before
`express.json()` is unchanged. The block above is preserved as the baseline.

### 1.9 CI/CD and Infrastructure Files

| Item | Status |
|------|--------|
| `.github/` directory | **DOES NOT EXIST** |
| `.github/workflows/` | **DOES NOT EXIST** |
| `Dockerfile` | **EXISTS (untracked)** *(baseline status at the time of this report)* — adopted as the current Task 10-B artifact effective 2026-09-13 (Decision D-6, artifact-adoption boundary only); original 2026-09-12 creation provenance unresolved — see §4 "D-6 current status", §11 v1.0.10, §12 v1.0.10. **Current status (v1.0.23): TRACKED** — first committed to `main` in `7425b3d` (it first appeared in `eeb4093` on the `phase10-f-ci-dry-run` branch) (blob `c9461fc0b74dda4812c8b900e6fb0c683749c336`); replaced by the corrected three-stage `Dockerfile` in `724fe67278df65a0f5d08125c6ed504015a8d299` (blob `ffe54bf1caf9d90a501661e84ea4cb503bf46a34`; Decision D-F6, Task 10-F) |
| `.dockerignore` | **EXISTS (untracked)** *(baseline status at the time of this report)* — adopted as the current Task 10-B artifact effective 2026-09-13 (Decision D-6, artifact-adoption boundary only); original 2026-09-12 creation provenance unresolved — see §4 "D-6 current status", §11 v1.0.10, §12 v1.0.10. **Current status (v1.0.23): TRACKED** — committed to `main` in `7425b3d` (it first appeared in `eeb4093` on the `phase10-f-ci-dry-run` branch) (blob `e2b09c521b4060f7e2ad2060209fc4c7d7f61330`), unchanged through `724fe67` |
| `docker-compose.yml` | **DOES NOT EXIST** |
| `Caddyfile` | **DOES NOT EXIST** |

All CI/CD pipeline files, and any Docker or Caddy configuration other than the two adopted
Task 10-B files above, must be created from scratch. Each creation requires separate explicit
human authorization. Adoption of the existing `Dockerfile`/`.dockerignore` is not authorization
to build, run, or verify them — see Task 10-B below.

### 1.10 Third-Party SDK Status

| Package | Location | Status |
|---------|----------|--------|
| `@anthropic-ai/sdk` 0.123.0 | root `package.json` | Installed |
| `stripe` ^22.6.1 | root `package.json` | Installed (sandbox mode) |
| `@clerk/express` 1.7.82 | root `package.json` | Installed |
| `@sentry/node` | root `package.json` | **NOT INSTALLED** |
| `better-sqlite3` ^9.2.2 | root `package.json` | Installed (legacy; not called in `database.js` or `server.js` after PostgreSQL migration) |
| `@clerk/react` 6.15.1 | `apps/web/package.json` | Installed |
| `@capacitor/core` 8.5.1 | `apps/web/package.json` | Installed |
| `posthog-js` | `apps/web/package.json` | **NOT INSTALLED** |

**v1.0.26 note**: The `@sentry/node` row above is preserved as the baseline. Day 3 adds
`@sentry/node` pinned exactly to `11.0.0` in root `package.json` (K1; implemented, uncommitted at the
time of writing). Dependency-tree observation: `package-lock.json` gains 56 entries and 21
previously dev-only packages become production dependencies; the added production tree includes
`@babel/core`, `oxc-parser`, and `sentry` 0.44.1 (license `FSL-1.1-Apache-2.0`).

---

## §2. Phase 8 Baseline (Authoritative)

- **Authoritative Phase 8 planning document**: `phase8_plan_1_4.md` — Version **v1.1.8** (2026-09-10)
- **Phase 8 completion tag**: `phase-8-checkpoint-1` → `ad5776f5f2653785706727c9381249d587f1faf8`
- **HEAD at time of writing** (informational): `c366af0bc9d32c7ee4ae047ee2f0280b9944af0f`

### 2.1 Phase 8 Completed Tasks

All tasks confirmed complete per `phase8_plan_1_4.md` v1.1.8:

- **Task 8-A**: Backend — Stripe package installation (`stripe@^22.6.1` at monorepo root),
  database schema additions (`users.tier TEXT NOT NULL DEFAULT 'free'` and
  `users.stripe_customer_id TEXT UNIQUE` columns; new `user_subscriptions` table), and
  `.env.example` additions. Human-reviewed and approved with follow-up requirements.
  **No billing routes were implemented in Task 8-A.**

- **Task 8-B**: Backend billing routes — `POST /api/billing/checkout` (creates Stripe
  Checkout Session; returns `{ url }`), `POST /api/billing/portal` (creates Stripe Customer
  Portal session per §3.7 entitlement states; returns `{ url }`), `POST /api/billing/webhook`
  (with `express.raw()` middleware before `express.json()`, signature verification via
  `stripe.webhooks.constructEvent()`). Webhook handles `customer.subscription.created`,
  `customer.subscription.updated`, and `customer.subscription.deleted` (no other event types
  are handled). Subscription tier enforcement: `PREMIUM_ENTITLED_STATUSES` Set
  (`trialing`, `active`, `past_due` → `'premium'`; all other statuses → `'free'`); `statusToTier()`
  helper. Narrow `/api/v1/chat` rate-limit tier enforcement (§3.3 narrow exception): flat
  rate-limit lookup replaced with tier-aware DB query applying `AI_CHAT_LIMIT_FREE` /
  `AI_CHAT_LIMIT_PREMIUM` per `users.tier`.

- **Task 8-C**: Frontend — Upgrade UI & Tier Display. Billing page
  (`apps/web/app/billing/page.tsx`), "Upgrade to Premium" CTA (calls
  `POST /api/billing/checkout`), "Manage Subscription" portal link (calls
  `POST /api/billing/portal`), tier badge in global layout, Chat 429 upgrade prompt.
  Backend: `GET /api/billing/status` tier-visibility endpoint (labeled as Task 8-C scope
  in `server.js` implementation comment; reuses existing `getUserTier()`).

- **Task 8-D**: Playwright E2E billing test suite — `apps/web/e2e/billing.spec.ts`
  covering deterministic HTTP and UI billing behavior: auth-required route rejections (401),
  webhook signature validation (400), portal entitlement state handling (States A/B/C per
  §3.7 of `phase8_plan_1_4.md`), and billing page UI elements. Does not require the Stripe
  CLI as an external process.

**CORRECTION from v1.0.1**: §2.1 previously described portal session as `GET /api/billing/portal`.
The correct method is `POST /api/billing/portal`.

**CORRECTION from v1.0.3**: §2.1 task attribution corrected in v1.0.4 following read-only
governance review. Previous text incorrectly attributed billing routes to Task 8-A, listed
`checkout.session.completed` as a handled webhook event (the committed `server.js` handles
only `customer.subscription.created/updated/deleted`), attributed tier-aware rate limiting
to Task 8-C, and attributed `PREMIUM_ENTITLED_STATUSES` / subscription enforcement to Task 8-D.
Correct attributions established by inspecting `phase8_plan_1_4.md` v1.1.8 and `server.js`.

### 2.2 Phase 8 Known Carried-Forward Issues

**CF-1: Task 8-C Rate-Limit-Text Regression**

The rate-limit-exceeded response text may contain incorrect or inconsistent messaging.
Known cosmetic defect carried forward from Phase 8. Any fix requires separate explicit human
authorization and a new task in a future phase plan.

**CF-2: Stripe Managed Payments Limitation**

A constraint documented in `phase8_plan_1_4.md` v1.1.8 regarding Stripe Managed Payments.
Phase 10 does not resolve or work around this limitation. Resolution requires a separate plan
and explicit human authorization.

---

## §3. Phase 10 Objective

Phase 10 deploys the Flavour Find application — as it exists at `phase-8-checkpoint-1`
plus any subsequent commits currently on `main` — to a production environment on DigitalOcean,
with Caddy TLS, a GitHub Actions CI/CD pipeline, Neon production database, and live Stripe billing.

### What Phase 10 IS

- Provisioning a DigitalOcean Droplet
- Creating a Dockerfile and `.dockerignore` for the root Express server (`server.js`)
- Creating a GitHub Actions CI/CD pipeline (`.github/workflows/`)
- Provisioning a Neon production database branch
- Configuring DNS for the production domain (`flavourfind.com`, per Decision D-1, resolved
  2026-09-17 — Task 10-C DNS configuration was implemented manually by the human operator via
  Namecheap and is now ACCEPTED as of Authorization Act #22, 2026-09-17; see §5 Task 10-C and
  §12 "Task 10-C Acceptance Record — Authorization Act #22")
- Installing and configuring Caddy as a TLS reverse proxy
- Setting GitHub repository secrets
- Activating Stripe in live mode (with explicit operational authorization per Decision D-8)
- Configuring UptimeRobot monitoring
- Defining rollback and recovery procedures (Task 10-N)

### What Phase 10 Is NOT

- Authorization to implement `GET /health` (requires separate explicit authorization — Decision D-2)
- Authorization to install `@sentry/node` (requires separate authorization; `package.json` change — Decision D-3)
- Authorization to install `posthog-js` (requires separate authorization; `apps/web/package.json` change — Decision D-4)
- Authorization to restrict CORS (requires separate authorization; `server.js` code change — Decision D-5)
- Authorization to modify any existing route, middleware, or application logic — **except** the
  single, specific, narrow future exception described by Decision D-F5 (Task 10-F,
  "D-F5 — Stripe client initialization deferral"): a future, separately authorized, Shape-1-only
  `server.js` Stripe-client-initialization change. D-F5 does not generally authorize application-
  code modification anywhere else in Phase 10, and does not itself authorize that change either —
  it is a decision record only, pending its own separate implementation authorization.
- Authorization to modify Phase 8 implementation in any way
- Authorization to create `user_preferences` or `grocery_list` database tables
- Authorization to change the `ssl: { rejectUnauthorized: false }` PostgreSQL configuration
- *(v1.0.25, human decision C9)* Play Store release work — it is outside Phase 10 scope and is not a
  Phase 10 completion requirement

**v1.0.26 note — authorization trail**: The list above is preserved unchanged. The `GET /health`
(D-2), `@sentry/node` (D-3), CORS restriction (D-5), and PostgreSQL SSL (`rejectUnauthorized`) items
have each since received separate, explicit human implementation authorization — the SSL change
under the Day 2 authorization (Authorization Act #__) and the D-2/D-3/D-5 changes under the Day 3
implementation authorization (Authorization Act #__), numbers to be assigned by the human. This note
records the authorization trail only; it does not authorize anything further.

---

## §4. Pending Human Decisions

The following must be resolved by human decision before the affected tasks can proceed.
Each is flagged at its task with a `⚠ PENDING HUMAN DECISION` marker.

| ID | Decision | Affects | Consequence if unresolved |
|----|----------|---------|--------------------------|
| **D-1** | Confirm production domain (`flavourfind.com` or other) — **RESOLVED 2026-09-17: `flavourfind.com`** (see "D-1 current status" below) | Tasks 10-C, 10-D, 10-E, 10-G | Tasks 10-C onward previously blocked; now unblocked for this decision specifically — each task still requires its own separate implementation authorization |
| **D-2** | Authorize `GET /health` implementation (new route in `server.js`) | Task 10-I; Task 10-M monitoring URL | Task 10-I blocked; Task 10-M uses alternative URL |
| **D-3** | Authorize Sentry integration (requires `npm install @sentry/node`, `package.json` change, `server.js` change) | Task 10-J | Task 10-J blocked |
| **D-4** | Authorize PostHog integration (requires `npm install posthog-js --workspace=apps/web`, `apps/web/package.json` change; `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` become build-time variables) | Task 10-K | Task 10-K blocked |
| **D-5** | Authorize CORS restriction (requires `server.js` code change to consume `CORS_ORIGIN` env var) | Task 10-L | Task 10-L blocked; CORS remains wide-open |
| **D-6** | Authorize production Docker image configuration: creation of `Dockerfile` AND creation of `.dockerignore` (both are new infrastructure configuration files) | Task 10-B; Task 10-F | Tasks 10-B and 10-F blocked |
| **D-7** | Authorize GitHub Actions workflow creation (new `.github/workflows/` files) — **RESOLVED 2026-09-17: authorized** (see "D-7 current status" below) | Task 10-F | Task 10-F previously blocked on this decision; now unblocked for this decision specifically — Task 10-F still requires its own separate implementation authorization |
| **D-8** | Authorize Stripe live mode activation (real-money transactions) | Task 10-G | Task 10-G blocked; no live payments |
| **D-9 (Registry)** | Select container registry: DigitalOcean Container Registry (DOCR) or Docker Hub — **RESOLVED 2026-09-17: DigitalOcean Container Registry (DOCR)** (see "D-9 current status" below) | Tasks 10-B, 10-F, 10-N | Registry strategy previously undefined; now resolved for this decision specifically — each affected task still requires its own separate implementation authorization |

**D-1 current status (as of 2026-09-17, Authorization Act #19)**: The human has explicitly
resolved Decision D-1. The confirmed production domain is **`flavourfind.com`**. This resolves D-1
as a decision only — it does **not** itself create any DNS record, does not confirm DNS
propagation, does not confirm registrar/DNS control has been exercised, and does not authorize
Task 10-C, Task 10-D, Task 10-E, Task 10-G, or any other implementation. Everywhere `<domain>`
appears as a placeholder in Task 10-C and later task specifications, it now refers to
`flavourfind.com`, but those specifications remain unimplemented and separately unauthorized.
**Task 10-C remains NOT AUTHORIZED.** See §12 "Decision D-1 Resolution — Authorization Act #19"
for the full record.

**D-1/Task 10-C status update (as of 2026-09-17, Authorization Act #22)**: The paragraph above
accurately recorded the state as of Authorization Act #19. Since then, Task 10-C implementation
was explicitly authorized (Authorization Act #21), the DNS records were manually configured by the
human operator via Namecheap, and read-only technical verification confirmed AC-C1, AC-C2, and
AC-C3 all PASS. Task 10-C has since been formally accepted (Authorization Act #22). **Task 10-C is
now ACCEPTED** — see §5 Task 10-C and §12 "Task 10-C Acceptance Record — Authorization Act #22."
This supersedes only the Task-10-C-authorization-status portion of the paragraph above; it does not
change D-1's resolution record, does not retroactively alter Authorization Act #19, and does not
authorize, implement, or accept Task 10-D or any later Phase 10 task, all of which remain
separately unauthorized.

**D-6 expanded note**: D-6 authorizes both the `Dockerfile` and the `.dockerignore` as a single
decision. Both files constitute the production Docker image configuration. Neither file may be
created until D-6 receives explicit human authorization. The `.dockerignore` is a required
companion to the `Dockerfile` — without it the Docker build context includes test credentials,
local caches, and unnecessary build artifacts. See Task 10-B for the full `.dockerignore`
specification.

**D-6 current status (as of 2026-09-13)**: The human has made a present-day decision adopting
the already-existing `Dockerfile` and `.dockerignore` as the current Task 10-B artifacts. This
resolves D-6 only for the artifact-adoption boundary — i.e., these two files may now be treated
as the current Task 10-B specification's implementation. It does not resolve, and is not, an
authorization for Docker build verification, runtime verification, PostgreSQL verification
(relevant to AC-B3/AC-B4), or any AC-B item (AC-B2 through AC-B7, including AC-B6 — whose
v1.0.11-corrected verification method requires a Docker build but not PostgreSQL or a running
container, and whose substantive credential-definition was further corrected in v1.0.12/RC-22;
see Task 10-B and §11/§12 v1.0.12). It also does not establish what
authorization, if any, existed for these files' original creation on 2026-09-12 — that record
could not be recovered and no retroactive authorization is claimed. See §11 v1.0.10 and §12
v1.0.10 for the full reconciliation.

**D-9 detail**: The registry choice has operational consequences:

- **DigitalOcean Container Registry (DOCR)**: Private registry, native integration with DigitalOcean Droplets, lower egress costs within DO region. Requires DOCR credentials in GitHub secrets (`DOCR_ACCESS_TOKEN`) and `doctl` or Docker login in the CI/CD workflow. The Droplet must be granted pull access to DOCR.
- **Docker Hub**: Widely used, straightforward GitHub Actions integration. Public images are free; private images require a paid plan. Requires `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` in GitHub secrets.

A human must select one registry before Task 10-F can be fully specified. Task 10-F uses
`<registry>/<image-name>` as a placeholder pending D-9.

**D-9 current status (as of 2026-09-17, human decision)**: The human has explicitly resolved
Decision D-9. The selected container registry is **DigitalOcean Container Registry (DOCR)**. This
resolves D-9 as a decision only — it does **not** itself create the DOCR registry, does not create
or configure any registry credential, does not set any GitHub secret (including
`DOCR_ACCESS_TOKEN`), does not create `.github/` or any workflow file, and does not authorize Task
10-E or Task 10-F implementation. Everywhere `<registry>` appears as a placeholder in Task 10-B,
Task 10-E, Task 10-F, and Task 10-N, it now refers to DigitalOcean Container Registry, but those
specifications remain unimplemented and separately unauthorized. **Task 10-E and Task 10-F remain
NOT AUTHORIZED** and each requires its own separate, explicit future human implementation
authorization, in addition to their other unmet prerequisites (Task 10-H, Task 10-N, Gate C, and —
for Task 10-F specifically — Decision D-7, which is now resolved per the "D-7 current status" note
below, though this does not by itself remove Task 10-F's other unmet prerequisites).

**D-7 current status (as of 2026-09-17, human decision)**: The human has explicitly resolved
Decision D-7. Creation of a GitHub Actions workflow under `.github/workflows/` is authorized. This
resolves D-7 as a decision only — it does **not** itself create the `.github/` directory or any
workflow file, does not modify or run any GitHub Actions workflow, does not trigger a deployment,
does not create or configure any registry resource or credential, does not create or modify any
GitHub repository secret, and does not authorize Task 10-E or Task 10-F implementation. **Task 10-E
and Task 10-F remain NOT AUTHORIZED** and each requires its own separate, explicit future human
implementation authorization, in addition to their other unmet prerequisites (Task 10-H, Task 10-N,
and Gate C). Gate C — the separate "pre-deployment authorization" gate covering Task 10-F's first
production run (§8.1) — remains a distinct, later, separately-required human authorization; nothing
in this D-7 resolution satisfies or advances Gate C.

**Decision status (v1.0.25, RC-35, Authorization Act #27 — human decisions, 2026-09-24)**: The table
above and the notes before this one are preserved unchanged. The human has since decided:
- **D-2 (`GET /health`)**: AUTHORIZED IN PRINCIPLE. This is **not** implementation authorization;
  implementation requires a separate, explicit authorization. It is recorded here so that AC-I4's
  "Decision D-2 human authorization is on record before implementation began" can be satisfied.
  Task 10-I becomes applicable; Task 10-M is to monitor `/health` once public HTTPS exists.
- **D-3 (Sentry)**: AUTHORIZED IN PRINCIPLE. Not implementation authorization. The eventual
  implementation authorization must include the narrowly scoped `.github/workflows/deploy.yml`
  environment wiring required to make `SENTRY_DSN` available to the running container. No Sentry
  account/DSN setup, `SENTRY_DSN` secret, package, code, or workflow change is authorized now. The
  AC-J4 verification mechanism is left open (C13); no temporary test route is to be added merely to
  satisfy AC-J4.
- **D-4 (PostHog)**: NOT AUTHORIZED within this Phase 10 completion cycle (declined/deferred). Task
  10-K is omitted; `apps/web`, package files, `Dockerfile`, `deploy.yml`, GitHub secrets, and PostHog
  configuration are not to be modified for PostHog, and no PostHog secret is to be created or requested.
- **D-5 (CORS)**: AUTHORIZED IN PRINCIPLE, single origin (C12). Not implementation authorization. The
  Day 2 implementation is to allow `https://flavourfind.com` only, consistent with this document's
  single-string `cors({ origin: process.env.CORS_ORIGIN || '*' })` specification; no multi-origin
  parsing and no `https://localhost` support. The eventual implementation authorization must include
  the narrowly scoped `deploy.yml` environment wiring required to make `CORS_ORIGIN` available to the
  running container. No `CORS_ORIGIN` secret or code change is authorized now. An Android build that
  calls the production API from the Capacitor origin `https://localhost` (`androidScheme: 'https'`)
  would require a future CORS decision and change.
- **D-8 (Stripe live mode)**: **not authorized within Phase 10 (deferred)** (C14). Task 10-G and Task
  10-E's second pass are deferred; Stripe live mode is NOT ACTIVE; no live Stripe secret, webhook,
  checkout, or real-money action is authorized.
- **DEC-9 (release mechanism for the corrected artifact)**: RESOLVED — option (B): a new tag
  `prod-v1.0.1` pointing to `c2249c90247e88a7679f9828478f692b7727fe4a`, created and pushed under
  separate explicit human authorizations, followed by an explicitly authorized re-run of the same
  failed run (same tag and commit) under the retry boundary. See Task 10-F, "Production release
  record (v1.0.25)".

D-1, D-6, D-7, and D-9 are unchanged. Each "in principle" authorization above requires its own later,
separate, explicit implementation authorization.

**Decision status (v1.0.26 — human decisions and authorizations, 2026-09-25)**: The notes above are
preserved unchanged. Since v1.0.25:
- **PostgreSQL SSL change (C10)**: implementation authorized and completed; committed and pushed in
  `9448d2f` (contains only `database.js`); NOT deployed; P4 OPEN (§1.5, v1.0.26 note).
- **D-2, D-3, D-5**: implementation authorized and completed under the Day 3 implementation
  authorization; uncommitted at the time of writing; no Day 3 commit hash exists; NOT deployed.
- **Day 3 decisions K1–K5 and K7–K14 (no K6 issued)**: K1 — `@sentry/node` `11.0.0`, exact pin;
  K2 — capture scope limited to `Sentry.init` plus `Sentry.setupExpressErrorHandler(app)`, no
  route-level `captureException`, no test route; K3 — DSN-only initialization, no other Sentry
  options; K4 — AC-J4 real-event validation DEFERRED; K5 — `/health` process-only, no database query;
  K7 — AC-L3 evidence method: an unauthorized Origin receives a non-matching
  `Access-Control-Allow-Origin` value, with no function-based server-side origin-rejection mechanism;
  K8 — `CORS_ORIGIN` is a GitHub secret (not created); K9 — existing `deploy.yml` wiring style;
  K10 — `.env.example` receives only `SENTRY_DSN=` and `CORS_ORIGIN=`, excluding the pre-existing
  Stripe-related lines; K11 — no new AC-GOV-7 implementation requirement; K12 — Day 3 is intended to
  ride with the second production deployment that also deploys the Day 2 SSL change and closes P4;
  K13 — documentation handled in a separate authorized pass (this v1.0.26 pass); K14 — the optional
  GitHub Actions workflow test is not run.
- **Secrets**: the `SENTRY_DSN` and `CORS_ORIGIN` GitHub secrets have NOT been created.

None of these authorizes a commit, push, tag, secret creation, deployment, P4, or Task 10-D work.

**Decision status (v1.0.27 — human decisions, 2026-09-25)**: The notes above are preserved unchanged.
The human has made the following six Day 4 governance decisions. Each is a decision only; none is
authorization to execute the corresponding action.
- **A1 — AC-L4 satisfied for Phase 10**: Capacitor origins were reviewed; the known Capacitor origin
  is `https://localhost` (`androidScheme: 'https'`); no production-pointed Capacitor client exists;
  Phase 10 does not build or deploy Android; Play Store work is outside Phase 10 (C9); the future
  Capacitor compatibility case remains conditional (C12). Capacitor compatibility was **not**
  implemented, and `https://localhost` is **not** an allowed production CORS origin. See Task 10-L,
  "AC-L4 human disposition (v1.0.27)".
- **B1 — create `CORS_ORIGIN` with the intended value `https://flavourfind.com`**: decision only.
  Creation of the secret is **NOT AUTHORIZED** and the secret has **NOT** been created.
- **C1 — set up Sentry, obtain a DSN, and create `SENTRY_DSN` for production**: decision only. Sentry
  project/DSN setup and creation of the secret are **NOT AUTHORIZED** and have **NOT** been done; the
  secret does not exist and Sentry is not active in production.
- **D1 — retrospective repository-reviewer reviews of the Day 2 and Day 3 implementation commits**:
  completed; see §12, "Retrospective Repository-Reviewer Evidence (v1.0.27)".
- **E1 — production release tag**: a separately authorized `prod-v*` production release tag is
  permitted for the second production deployment, because pushing a `prod-v*` tag is the documented
  production deployment trigger. Tag creation and tag push remain separate authorization boundaries.
  The Phase 10 checkpoint tag (`phase-10-checkpoint-1`, Gate E) remains a separate later governance
  event and must never trigger production. See Task 10-F, "v1.0.27 note — release-tag boundary and
  release target (E1, F2)".
- **F2 — release target**: the intended release target is the later documentation-only commit that
  contains this v1.0.27 document, if that commit is created, reviewed, committed, and pushed under
  separate authorizations. Its SHA is not yet known and is not recorded here.

None of these authorizes secret creation, Sentry setup, a documentation commit or push, `prod-v*` tag
creation or push, deployment, production verification, registry read, Task 10-D work, or the
checkpoint tag.

---

## §5. Phase 10 Tasks

Each task is a planning specification. None is pre-authorized. Each requires separate explicit
human authorization before any implementation begins.

---

### Task 10-A: DigitalOcean Droplet Provisioning

**Type**: Human infrastructure action
**Depends on**: Nothing (first task; no code or file changes)
**Can run in parallel with**: 10-B, 10-C, 10-H

**Specification**:

Provision a DigitalOcean Droplet with the following minimum configuration:

- **OS**: Ubuntu 24.04 LTS *(corrected in v1.0.6 — v1.0.5 and earlier specified Ubuntu 22.04
  LTS; the human-provisioned Droplet runs Ubuntu 24.04 LTS. A read-only governance review
  found no Phase 10 task with a documented dependency on Ubuntu 22.04 specifically — see
  §11 "Corrections Applied in v1.0.6" for the full correction narrative and provenance.)*
- **Size**: Originally specified as 2 vCPU / 4 GB RAM ("minimum for Node.js + Caddy +
  container runtime"). **Actual provisioned and accepted capacity (as of v1.0.6): 1 vCPU /
  2 GB RAM.** Governance finding (v1.0.6 correction pass): no `AC-A#` criterion and no
  downstream Phase 10 task establishes 2 vCPU / 4 GB as a binding technical prerequisite;
  no downstream task references CPU count, RAM size, swap, `NODE_OPTIONS`, memory limits,
  container memory, or OOM requirements. The 1 vCPU / 2 GB Droplet is therefore carried
  forward as the currently accepted infrastructure baseline. This is **not** a claim that
  1 vCPU / 2 GB has been performance-tested or proven equivalent to 2 vCPU / 4 GB for all
  future Phase 10 build/deployment workloads — capacity adequacy remains subject to
  empirical validation during the relevant implementation/build work (e.g., Task 10-B's
  Docker build). If the smaller Droplet proves inadequate, resizing remains a possible
  future infrastructure decision; resizing is **not** authorized by this documentation
  correction.
- **Region**: Human's choice based on target user geography *(provisioned: TOR1)*
- **Networking**: Assign a DigitalOcean Reserved IP (formerly "Floating IP") for stable DNS
- **Access**: Add SSH public key(s) for deployment access
- **Firewall** (UFW or DigitalOcean Cloud Firewall): allow inbound SSH (22), HTTP (80),
  HTTPS (443); deny all other inbound. Allow all outbound.
- **Backups**: Enable automated Droplet backups (recommended)

**This task does NOT authorize**:
- Installing Node.js, Docker, or Caddy (covered in later tasks)
- Exposing any application port directly (all traffic routes through Caddy)
- Storing any secrets on the Droplet at this stage

**Acceptance Criteria**:
- [x] **AC-A1**: Droplet is running Ubuntu 24.04 LTS *(corrected in v1.0.6; originally
  Ubuntu 22.04 LTS — see §11). Human-confirmed: `flavourfind-api-prod`, TOR1, Ubuntu 24.04
  LTS x64.*
- [x] **AC-A2**: SSH access confirmed from deployment key. Human-confirmed: successful
  connection via `ssh -i ~/.ssh/flavourfind_api_prod root@159.89.127.34`, reaching
  `root@flavourfind-api-prod:~#`.
- [x] **AC-A3**: Reserved IP assigned; IP value recorded in GitHub secrets (`DROPLET_HOST`).
  Human-confirmed: Reserved IPv4 `146.190.189.242` assigned to `flavourfind-api-prod`;
  GitHub repository secret `DROPLET_HOST` exists, human-confirmed configured value
  `146.190.189.242`. Secret value not retrieved or displayed by any automated review.
- [x] **AC-A4**: UFW/firewall configured: allow SSH, HTTP, HTTPS; deny all other inbound.
  Human-confirmed: DigitalOcean Cloud Firewall `flavourfind-api-prod-firewall` — inbound
  TCP 22/80/443 (all IPv4 + all IPv6) allowed, all other inbound denied, outbound allowed.
  Automated weekly backups also confirmed enabled (exceeds the "(recommended)" backup note
  above; no `AC-A#` criterion gates on backups).

**10-A Acceptance State (recorded in v1.0.6, 2026-09-11)**:

Task 10-A is documented as **ACCEPTED**. All four `AC-A#` acceptance criteria are satisfied
per the human-confirmed evidence above, after correcting AC-A1 to reflect the actually
provisioned Ubuntu 24.04 LTS. The 1 vCPU / 2 GB actual capacity is documented as the
accepted baseline; capacity adequacy for later Phase 10 build/deployment workloads remains
unvalidated and subject to empirical confirmation during that work, not to a claim made
here. No Phase 10 implementation (Dockerfile, `.dockerignore`, Caddyfile, GitHub Actions
workflow, application code, or any other implementation artifact) has occurred as part of
10-A or as part of this documentation correction.

Acceptance of Task 10-A does **not** authorize Task 10-B or any later Phase 10 deliverable.
**Phase 10-B is NOT authorized** and requires separate explicit human authorization, as does
every subsequent task in this document. Commit, tag, and push authorization remain
separately unauthorized and are unaffected by this documentation correction.

**v1.0.25 note (reference only)**: the "Installing … Docker … (covered in later tasks)" item above is
preserved as written. Docker is installed and running on the production Droplet per the human-reported
read-only checkpoint recorded in Task 10-F, "Release-readiness record (v1.0.24)", item 2, and it ran
the `prod-v1.0.1` deployment (Task 10-F, "Production release record (v1.0.25)"). This note does not
alter Task 10-A's acceptance record.

---

### Task 10-B: Dockerfile and .dockerignore for Root Express Server

**Type**: Existing file(s), adopted — Decision D-6 (artifact-adoption boundary) AUTHORIZED 2026-09-13
**Depends on**: Nothing (can work in parallel with 10-A); D-9 required for image-name references
**Can run in parallel with**: 10-A, 10-C, 10-H

⚠ **AUTHORIZATION GATE (D-6) — ARTIFACT ADOPTION RESOLVED, VERIFICATION STILL GATED**: The
`Dockerfile` and `.dockerignore` described below already exist in the repository (untracked)
and were adopted as the current Task 10-B artifacts by explicit human decision effective
2026-09-13 (see §4 "D-6 current status" and §11/§12 v1.0.10). This adoption does not
constitute, and must not be read as, authorization for a Docker build, a container run, any
PostgreSQL verification (relevant to AC-B3/AC-B4), or any AC-B acceptance criterion (AC-B2
through AC-B7, including AC-B6, whose v1.0.11-corrected verification method requires a Docker
build but not PostgreSQL or a running container) — each remains separately unauthorized and
gated. It also does not establish or claim
what authorization, if any, existed for these files' original creation on 2026-09-12; that
provenance remains unresolved.

#### 10-B.1 `.dockerignore` Specification

The `.dockerignore` file must be created in the repository root alongside the `Dockerfile`.
Without it, the Docker build context includes test credentials, unnecessary Capacitor Android
build artifacts, local caches, and local `node_modules`, which would enter the image layers
or — critically — allow local Clerk test keys to be read during `next build`.

Minimum required `.dockerignore` contents:

```text
# Local environment files — must not enter the Docker build context.
# apps/web/.env.local contains test Clerk keys (pk_test_..., sk_test_...).
# If this file reaches the build context and NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
# is not explicitly provided as a build argument, next build may silently consume
# the test key and bake it into the production static export.
.env
.env.*
apps/web/.env.local

# Local build caches — not needed for production build
apps/web/.next/
apps/web/out/

# Capacitor Android project — not part of the Node.js/Docker application
apps/web/android/

# Playwright E2E test files — must not enter the production image
apps/web/e2e/

# Local node_modules — npm ci will install fresh inside the container
node_modules/
apps/web/node_modules/

# Git metadata
.git/
.gitignore
```

**Rationale for each exclusion**:
- `.env` / `.env.*` / `apps/web/.env.local`: Prevents local/test Clerk keys and other
  development credentials from entering the build context. Interaction with
  `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` build-arg injection (see §10-B.2) means an
  unexcluded `.env.local` is a silent credential-contamination risk.
- `apps/web/.next/`: Local development build cache; stale or incompatible with the
  Alpine container environment.
- `apps/web/out/`: Local static export; must be regenerated inside the container using
  the correct build-time environment variables.
- `apps/web/android/`: Full Capacitor Android project (Gradle files, APK artifacts).
  Adds substantial image size with no runtime benefit.
- `apps/web/e2e/`: Playwright E2E test files and any associated test credentials or
  test fixtures. Must not appear in the production image.
- `node_modules/` and `apps/web/node_modules/`: `npm ci` installs dependencies fresh
  inside the container. Shipping local `node_modules` into the build context wastes
  transfer time and risks native addon incompatibility between the local OS and
  the Alpine container.

#### 10-B.2 Dockerfile Specification

The Dockerfile must target the root Express server (`server.js`). It must NOT reference
`apps/api/` (which does not exist). The correct entry point is `node server.js`.

Intended Dockerfile structure (planning specification only — not implementing):

> **Replaced artifact note (v1.0.23, RC-33, Authorization Act #25)**: The single-stage structure
> below is preserved unchanged as the **historical** Task 10-B planning specification and describes
> the artifact against which the original AC-B1–AC-B7 PASS results (Authorization Acts #3, #7, #8,
> #9, #10, #13) were recorded. It is **no longer the current production artifact.** It was replaced
> by the corrected three-stage `Dockerfile` (stages: `builder` — full workspace install and Next.js
> static export, with the unchanged `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` `ARG`/`ENV` interface;
> `prod-deps` — scoped production install via
> `npm ci --omit=dev --workspace=packages/shared --include-workspace-root`; runtime —
> `node:22-alpine` containing only the runtime dependency tree, `packages/shared`, `server.js`,
> `database.js`, `public/`, and the root `package.json`, with `EXPOSE 3000` and
> `CMD ["node", "server.js"]` unchanged) committed in `724fe67278df65a0f5d08125c6ed504015a8d299`
> (blob `ffe54bf1caf9d90a501661e84ea4cb503bf46a34`). The `npm prune --production` step below does not
> exist in the corrected artifact. See Decision D-F6 (Task 10-F) and "Corrected-Dockerfile record"
> below the Task 10-B acceptance criteria. `.dockerignore` is unchanged.

```dockerfile
FROM node:22-alpine

# Install build tools required by better-sqlite3 (native addon).
# better-sqlite3 remains in package.json; npm ci will attempt to build it.
# Alpine Linux requires these tools explicitly.
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy monorepo root configuration.
COPY package.json package-lock.json turbo.json ./

# Copy the local workspace packages/ directory.
# apps/web depends on @flavour-find/types (local workspace package in packages/).
# This directory must be present for npm ci to resolve the local dependency.
COPY packages/ ./packages/

# Copy the frontend workspace.
# .dockerignore excludes android/, e2e/, .next/, out/, node_modules/, and .env.local.
COPY apps/web/ ./apps/web/

# Copy the root application files.
COPY server.js database.js ./

# Copy the public/ directory (contains static assets served by express.static('public')).
# Verify that public/ exists in the repository before authorizing this Dockerfile.
COPY public/ ./public/

# Install all dependencies (devDependencies required for next build).
RUN npm ci

# --- Clerk build-time injection ---
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is a Next.js public environment variable.
# It is embedded in the JavaScript bundle by next build and cannot be changed
# at container runtime. The production Clerk publishable key (pk_live_...) must
# be supplied as a Docker build argument at docker build time.
# The docker build command must include:
#   --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
# Without this, the production static export will have no valid Clerk key
# and user authentication will be non-functional.
# Because .dockerignore excludes apps/web/.env.local, the test key
# (pk_test_...) cannot be silently consumed — the build argument is the
# only source for this variable.
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}

# Build Next.js static export → apps/web/out/
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is baked into the output at this step.
RUN npm run build --workspace=apps/web

# Copy the static export into public/ so express.static('public') serves it.
RUN cp -r apps/web/out/. public/

# Remove devDependencies — the image now only needs production dependencies.
RUN npm prune --production

EXPOSE 3000
CMD ["node", "server.js"]
```

**Notes on this Dockerfile**:

- `apps/web/next.config.ts` sets both `output: 'export'` (static export) and
  `trailingSlash: true`. The static output in `apps/web/out/` contains trailing-slash
  URLs. The Express `express.static('public')` configuration must serve these correctly.
  No server.js change is authorized; verify behavior at AC-B3.
- `packages/` is retained and is required. `apps/web` depends on the local workspace
  package `@flavour-find/types` (version 0.1.0). Without `packages/` in the build
  context, `npm ci` will fail to resolve this local dependency.
- `better-sqlite3` is in `package.json` and requires native build tools (`python3`,
  `make`, `g++`). Alpine Linux requires these to be installed explicitly. Removal of
  `better-sqlite3` from `package.json` would require a separate authorization.
- `NEXT_PUBLIC_API_URL` does not need to be set. Its default value is `''` (empty
  string), producing relative `/api/...` paths that flow correctly through Caddy to
  the Express server. No build argument is needed.
- If `public/` does not exist at build time, `COPY public/ ./public/` will fail.
  Confirm `public/` exists in the repository before authorizing implementation.
- Runtime secrets (`DATABASE_URL`, `STRIPE_SECRET_KEY`, `CLERK_SECRET_KEY`, etc.)
  are NOT present in the Dockerfile. They are injected at container start time and
  must never appear in image layers.

**This task does NOT authorize**:
- Modifying `server.js`
- Modifying `package.json`
- Modifying `apps/web/next.config.ts`

**Acceptance Criteria**:
- [x] **AC-B1** — **PASS (Authorization Act #7, 2026-09-16 — see §12 "AC-B1 Human Interpretation and Documentation Record — Authorization Act #7")**: Dockerfile and `.dockerignore` are both created; both authorized by D-6

  **AC-B1 corrected-Dockerfile record (v1.0.23, RC-33, Authorization Act #25 — governance/documentation
  evidence, not a technical test)**: the Authorization Act #7 PASS above concerns the original
  single-stage `Dockerfile` and is preserved unchanged as historical evidence. The current
  `Dockerfile` is the corrected three-stage artifact committed in
  `724fe67278df65a0f5d08125c6ed504015a8d299` (blob `ffe54bf1caf9d90a501661e84ea4cb503bf46a34`). It
  exists and is tracked, and it was implemented under an explicit human authorization limited to that
  file (2026-09-22; human-authorized, not formally identified by Act number in this document).
  Decision D-F6 (Task 10-F) records the human decision that this blob replaces D-F1's `Dockerfile`
  reference as the intended Docker release artifact. `.dockerignore` is unchanged (blob
  `e2b09c521b4060f7e2ad2060209fc4c7d7f61330`, the D-6/D-F1 artifact). This note does not re-accept
  or reopen Task 10-B.
- [x] **AC-B2** — **PASS (Authorization Act #9, 2026-09-16 — see §12 "AC-B2 Verification Result — Authorization Act #9")**: `docker build --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<pk_live_...> .` completes without error

  **AC-B2 corrected-Dockerfile verification (2026-09-23, human-authorized)**: the Authorization Act #9
  PASS above concerns the original single-stage `Dockerfile` (HEAD `c366af0`) and is preserved
  unchanged as historical evidence. A fresh `docker build --no-cache` of the corrected three-stage
  `Dockerfile` was performed from a `git archive` of exact commit
  `724fe67278df65a0f5d08125c6ed504015a8d299` (so no working-tree file, including any local `.env` or
  `.env.local`, entered the build context), with the real production `pk_live_` publishable key
  supplied as `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` through a temporary, human-created key file that was
  read into the build's environment without being echoed and deleted immediately after the build.
  Build window 2026-09-23T07:39:26Z–07:46:09Z; exit code 0; both install stages completed; Next.js
  compiled, generated 17/17 static pages, and exported; resulting image ID
  `sha256:da5ea518dc9e151387068b2aa29a85d6d136756ae5f72f9787cee1adac853fca`, created
  2026-09-23T07:45:59Z, 78,757,967 bytes. Provenance/SBOM attestations were disabled for the build; the
  build log, build metadata, image configuration, and image history contained no `pk_live_` occurrence.
  `CLERK_SECRET_KEY` was not read, supplied, or used. The single local Docker Buildx history record for
  this build was deleted afterward; the temporary image was removed. **Result: PASS** for the corrected
  artifact. As with the Act #9 record, this does **not** independently prove that the supplied value
  equals the `CLERK_PUBLISHABLE_KEY` GitHub secret; AC-E4 is unchanged by this recording.
- [x] **AC-B3** — **PASS (Authorization Act #10, 2026-09-16 — see §12 "AC-B3 / AC-B4 Verification Result — Authorization Act #10")**: Container starts and the Express server listens on port 3000; `GET /` returns HTTP 200 from within the container

  **AC-B3 corrected-Dockerfile verification (2026-09-22 and 2026-09-23, human-authorized, local and
  disposable)**: the Authorization Act #10 PASS above concerns the original single-stage `Dockerfile`
  and is preserved unchanged as historical evidence. (1) 2026-09-22 (approximately 17:39–17:49Z): an
  image built with `--no-cache` from a `git archive` of exact commit
  `724fe67278df65a0f5d08125c6ed504015a8d299` (dummy, non-production Clerk publishable key) was started
  with its own image `CMD` (`node server.js`) against a disposable, SSL-enabled local PostgreSQL 16
  container on an isolated Docker network, with dummy non-production runtime values; readiness was
  confirmed by bounded polling. From within the container: `GET /` → HTTP 200; `GET /api/moods` → 200
  (8 moods); `GET /api/recipes/happy` → 200 (4 recipes); the process listened on `:::3000` with 0
  restarts; the 13 runtime dependencies (`express`, `cors`, `helmet`, `compression`, `pino`,
  `pino-http`, `@clerk/express`, `@anthropic-ai/sdk`, `stripe`, `pg`, `dotenv`,
  `@flavour-find/shared`, `better-sqlite3`) loaded; `next`, `@clerk/react`, and `@capacitor/*` were
  absent; no `MODULE_NOT_FOUND`. (2) 2026-09-23: the same disposable startup/smoke procedure was
  repeated against the live-key image described under AC-B2, with the same results and no error-level
  log lines. No production database, secret, DOCR, or Droplet was used; all disposable resources were
  removed. **Result: PASS** for the corrected artifact.
- [x] **AC-B4** — **PASS (Authorization Act #10, 2026-09-16 — see §12 "AC-B3 / AC-B4 Verification Result — Authorization Act #10")**: `POST /api/billing/webhook` path is reachable from within the container

  **AC-B4 corrected-Dockerfile verification (2026-09-22 and 2026-09-23, human-authorized, local and
  disposable)**: the Authorization Act #10 PASS above is preserved unchanged as historical evidence. In
  both disposable runs described under AC-B3 (corrected artifact from `724fe67`, `STRIPE_SECRET_KEY`
  absent), `POST /api/billing/webhook` was reachable from within the container and returned its
  existing HTTP 400 `{"error":"Webhook signature verification failed"}` response — the accepted D-F5
  webhook nuance (Task 10-F, D-F5). No Stripe API or network call was made. **Result: PASS** for the
  corrected artifact.
- [x] **AC-B5** — **PASS (Authorization Act #13, 2026-09-17 — see §12 "AC-B5 Verification Result — Authorization Act #13")**: No application source code was modified to make the Dockerfile work *(D-F5, recorded 2026-09-22, is a separate, later, differently-scoped human decision concerning Stripe client initialization, unrelated to the Dockerfile; it does not affect this criterion, and no fresh AC-B5 evidence is required because of D-F5)*

  **AC-B5 corrected-Dockerfile record (v1.0.23, read-only Git evidence)**: the Authorization Act #13
  PASS above is preserved unchanged as historical evidence. Commit
  `724fe67278df65a0f5d08125c6ed504015a8d299` modifies only `Dockerfile` (read-only `git show --stat`);
  no application source code, `package.json`, or `package-lock.json` was modified to make the corrected
  `Dockerfile` work. **Result: PASS** for the corrected artifact (no new technical test required).
- [x] **AC-B6** — **PASS (Authorization Act #3, 2026-09-15 — see §12 "AC-B6 Verification Result — Authorization Act #3")** *(verification method corrected in v1.0.11/RC-21; substantive credential-definition corrected in v1.0.12/RC-22 — see §11/§12 for both)*: A structurally valid production Clerk publishable-key value (`pk_live_` followed immediately by an uninterrupted Base64-alphabet run, consistent with Clerk's documented `pk_<test|live>_<base64(FAPI-hostname + "$")>` format — see Clerk, "Refactoring our frontend API key," https://clerk.com/blog/refactoring-our-api-keys) is confirmed present in the static assets produced by a `docker build` of the project's `Dockerfile` with `--build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<pk_live_...>`, **and** no structurally valid `pk_test_` value of the same form is present anywhere in those assets. A bare `pk_test_` or `pk_live_` prefix occurrence that is **not** immediately followed by such a Base64 run (e.g., the Clerk SDK's own prefix/classification constants, or a truncated fragment inside SDK error-message text) is an SDK/reference literal, not a credential value, and does not by itself cause PASS or FAIL.

  **Verification procedure** (Docker/static-asset method retained unchanged from v1.0.11/RC-21):
  1. `docker build` the project's `Dockerfile` with `--build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<the real production pk_live_ key>`.
  2. `docker create` a container from the resulting image (the image does not need to be run).
  3. `docker cp` (or an equivalent read-only extraction) the container's copied static assets out for inspection.
  4. Search the extracted static assets for every occurrence of `pk_live_` and `pk_test_`.
  5. For each occurrence, apply the structural test: is the prefix immediately followed by an uninterrupted Base64-alphabet (`A-Za-z0-9+/`) run?
     - **No** → classify as **SDK/reference literal**. Record file path only; this occurrence has no effect on PASS/FAIL.
     - **Yes** → classify as a **credential-structured value**. Record file path, prefix (`pk_live_` or `pk_test_`), and the matched Base64 run's **length only** — never its characters, and never any decoded value.
  6. Remove the temporary container, image, and any extracted files immediately after step 5 completes. No PostgreSQL connectivity or running container is required at any point.

  **PASS**: At least one `pk_live_` occurrence is classified as a credential-structured value, **and** zero `pk_test_` occurrences are classified as credential-structured values.

  **FAIL**: Any `pk_test_` occurrence is classified as a credential-structured value (regardless of whether a valid `pk_live_` credential-structured value is also present).

  **INCONCLUSIVE**: Either (a) no `pk_live_` occurrence is classified as credential-structured (the production key may not have reached the build correctly), or (b) a `pk_test_`/`pk_live_` occurrence is ambiguous under the structural test (e.g., interrupted by a minification/chunk-splitting boundary in a way that cannot be safely classified). INCONCLUSIVE requires human review of that specific occurrence and must not be resolved by relaxing the structural test or defaulting to PASS.

  **Evidence handling**: Verification evidence may record only file paths, prefix, classification, matched-run length, the PASS/FAIL/INCONCLUSIVE determination, verification date, and Git HEAD. Verification evidence must never record: the complete `pk_live_` or `pk_test_` value; the matched Base64 payload characters; any decoded FAPI hostname; or any other credential material beyond the bare prefix and a length count.

  A local `npm run build --workspace=apps/web` output (produced outside the Docker build context) does not satisfy this criterion, since it does not exercise the `.dockerignore`/build-argument pipeline this criterion exists to validate.

  **AC-B6 fresh post-D-F5 verification (2026-09-22, human-authorized)**: the 2026-09-15 (Authorization
  Act #3) PASS above was recorded before the D-F5 Shape 1 `server.js` implementation existed and is
  preserved unchanged as historical evidence. A fresh run of the same documented procedure was
  separately authorized and performed against current HEAD (`43acfdd6bf440b8da6f0ce69c48a1fefe46edc39`,
  containing the published D-F5 implementation): `docker build --no-cache` from current HEAD with the
  real production `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` build argument; static assets extracted via
  `docker create`/`docker cp` without running the application container; one `pk_live_` occurrence
  classified as a credential-structured value (matched-run length 30); zero `pk_test_` occurrences
  classified as credential-structured (three `pk_test_` and three `pk_live_` occurrences in one SDK
  chunk had run-length 0 and were classified as SDK/reference literals, per the documented test). No
  secret value, matched Base64 characters, or decoded content was exposed at any point. All disposable
  resources (temporary key file, container, image, extracted assets, build log) were removed
  afterward. **Result: PASS**, confirming AC-B6 remains satisfied against the current, post-D-F5
  production artifact. This recording does not evidence any other AC-B, AC-F, or AC-N criterion, does
  not constitute or imply Task 10-B, Task 10-F, or Task 10-E acceptance, and does not satisfy Gate C.

  **AC-B6 corrected-Dockerfile verification (2026-09-23, human-authorized)**: the 2026-09-15
  (Authorization Act #3) PASS and the 2026-09-22 fresh post-D-F5 PASS above both concern the original
  single-stage `Dockerfile` and are preserved unchanged as historical evidence. The same documented
  structural test was applied to the static assets (`/app/public`, 54 files) of the corrected-artifact
  image built from exact commit `724fe67278df65a0f5d08125c6ed504015a8d299` with the real production
  `pk_live_` publishable key (see AC-B2 corrected-Dockerfile verification). The assets were examined by a
  read-only scan inside a disposable container of that image (an equivalent read-only extraction under
  step 3; the application was not started for this step), reporting only the fields permitted by the
  evidence-handling rule above. Findings: one `pk_live_` occurrence classified as a
  **credential-structured value** (matched-run length 30), in
  `/app/public/_next/static/chunks/app/layout-d6381817b08c7cc6.js`; **zero** `pk_test_` occurrences
  classified as credential-structured; three `pk_live_` and three `pk_test_` occurrences with run-length
  0, classified as SDK/reference literals. Additional secret-boundary checks: zero structured
  `sk_live_`/`sk_test_` values in `/app/public`, in the application source and `packages/`, and in
  `node_modules`; the runtime image configuration contains no Clerk-related environment variable; no
  `.env`/`.env.local` file is present in the image; `CLERK_SECRET_KEY` was not read, supplied, or used.
  No complete or partial credential value, matched Base64 characters, decoded content, or credential
  hash was recorded or exposed. The temporary key file, container, image, build log, and the single
  Buildx history record for this build were removed afterward. **Result: PASS** for the corrected
  artifact. This recording does not evidence any AC-F or AC-N criterion and does not constitute or
  imply Task 10-F or Task 10-E acceptance.
- [x] **AC-B7** — **PASS (Authorization Act #8, 2026-09-16 — see §12 "AC-B7 Verification Result — Authorization Act #8")**: `apps/web/.env.local` is confirmed excluded from the Docker build context (test by running `docker build` without `--build-arg` and verifying the build fails or produces an undefined key — the test key must not silently appear)

  **AC-B7 corrected-Dockerfile verification (2026-09-22, human-authorized, local and disposable)**: the
  Authorization Act #8 PASS above is preserved unchanged as historical evidence. A `docker build
  --no-cache` of the corrected artifact was run **without** any `--build-arg`, from the working-tree
  build context (in which `apps/web/.env.local` exists), with `Dockerfile` and `.dockerignore`
  confirmed identical to commit `724fe67278df65a0f5d08125c6ed504015a8d299`. The build completed; a
  read-only scan of the resulting static assets (54 files) found zero credential-structured `pk_test_`
  or `pk_live_` values (six SDK/reference literals only), and a comparison performed without printing
  or recording any value or hash confirmed that the `apps/web/.env.local` publishable key did not appear
  in the output — i.e., the build produced an undefined key and the test key did not silently appear.
  The temporary image was removed. **Result: PASS** for the corrected artifact.

  **Task 10-B acceptance state after the corrected artifact (v1.0.23, human decision DEC-2)**: Task
  10-B **remains ACCEPTED** (Authorization Act #16). It is **not** reopened and **not** re-accepted.
  The original Act-numbered AC-B1–AC-B7 PASS results remain the historical acceptance evidence for the
  original artifact; the corrected-Dockerfile records above additionally evidence AC-B1–AC-B7 against
  the corrected artifact at `724fe67`, following the same treatment used for the fresh post-D-F5
  evidence. None of the original Act results is represented as having been performed against
  `724fe67`.

  **Corrected-Dockerfile record (factual chronology, 2026-09-22 — 2026-09-23)**:
  1. The first production release attempt (`prod-v1.0.0` → `a2d45cc`, run `35750588575`, 2026-09-22)
     built the original single-stage image successfully in CI but failed at the DigitalOcean Container
     Registry push with `denied: quota exceeded`; no deployment occurred (see Task 10-F, "First
     production release attempt").
  2. A local, read-only image-size audit (2026-09-22) found the existing local images built from the
     original single-stage `Dockerfile` (`flavourfind-app:smoke-test-local`,
     `flavourfind-app:phase10-smoke-test`) at approximately **2.38 GB** each, against a DOCR Starter
     (Free) 500 MiB storage allowance.
  3. Authorized, local-only, never-pushed trials of a multi-stage design reduced the local image to
     approximately 994 MB (multi-stage, unscoped runtime dependencies) and then approximately 362 MB
     (scoped runtime dependencies: root + `packages/shared` only).
  4. The validated three-stage design was implemented in `Dockerfile` only, under explicit human
     authorization, and verified locally with `--no-cache` and a dummy key: reported image size
     approximately 362 MB; image size 78,762,389 bytes; `docker save` 78,782,464 bytes (approximately
     78.8 MB); runtime `node_modules` approximately 99.8 MB; `next`, `@capacitor/*`, and `@clerk/react`
     absent; `react`/`react-dom` retained as peer dependencies of `@clerk/shared` (via
     `@clerk/express`).
  5. The `repository-reviewer` agent reported **CHECKPOINT READY** with no blockers.
  6. The change was committed as `724fe67278df65a0f5d08125c6ed504015a8d299` (Dockerfile only;
     2026-09-22T13:18:34−04:00) and pushed to `origin/main` (fast-forward from `a2d45cc`) under
     separate explicit human authorizations; no tag was created, moved, or pushed, and the push did not
     trigger any workflow.
  7. Fresh corrected-artifact evidence was then recorded above for AC-B1–AC-B7 and in §8.1 for the Gate
     C Docker bullet.

  These local measurements do not themselves prove registry acceptance; actual DOCR acceptance of the
  corrected image remains to be demonstrated by a separately authorized production release.

  *(v1.0.25 cross-reference: DOCR accepted the corrected-`Dockerfile` image built from `c2249c9` in
  both attempts of run `36003636133` — attempt 1 digest
  `sha256:3e13aba02971a01ceff96fe54ddfefa0d60727b576d7b74786cb34387f8273c5`, attempt 2 digest
  `sha256:e000b840828c6c6e1ade33fcd75eeac5b5f1e1a0365ba85b3816d206d3f06a09`. See Task 10-F,
  "Production release record (v1.0.25)". The sentence above is preserved as written at the time.)*

**Current authorization status (v1.0.10, as of 2026-09-13)**: AC-B1's file-existence half is
satisfied (both files exist) and its "authorized by D-6" half is satisfied only for the
artifact-adoption boundary described above — not for the files' original 2026-09-12 creation,
whose authorization record remains unrecovered. AC-B2 through AC-B4 and AC-B7 have not been
verified and are not authorized to be verified by this reconciliation. AC-B5 is not being newly
evaluated by this reconciliation. AC-B6 remains separately gated per §0 and must not be
attempted without its own explicit human authorization involving the production Clerk
publishable key. Task 10-B as a whole remains **NOT ACCEPTED**.

**AC-B6 status update (as of 2026-09-15, Authorization Act #3)**: The AC-B6 gate described in the
paragraph above has since been exercised. Under a separate, explicit human authorization
(Authorization Act #3), a fresh verification of AC-B6 was performed and reviewed against the
authoritative v1.0.12 structural criterion; the result is **AC-B6: PASS** (see §12 "AC-B6
Verification Result — Authorization Act #3" for the full record). This supersedes only the
AC-B6-specific portion of the paragraph above; it does not change AC-B1's, AC-B2's, AC-B3's,
AC-B4's, AC-B5's, or AC-B7's status, all of which remain unverified exactly as stated above.
**Task 10-B as a whole remains NOT ACCEPTED.**

**AC-B1 status update (as of 2026-09-16, Authorization Act #7)**: The AC-B1 provenance/governance
question described in the first paragraph above has since been resolved by explicit human
decision. A read-only investigation (Authorization Act #6) confirmed that the original
2026-09-12 creation of `Dockerfile` and `.dockerignore` has no recoverable authorization record
anywhere in the repository, and identified that AC-B1's phrase "authorized by D-6" admits two
readings: one requiring proof of authorization for the original creation (unrecoverable), and one
satisfied by D-6's documented 2026-09-13 artifact-adoption decision. The human governing this
Phase 10 process has explicitly selected the latter reading (Authorization Act #7); the result is
**AC-B1: PASS** (see §12 "AC-B1 Human Interpretation and Documentation Record — Authorization
Act #7" for the full record). This interpretation does **not** retroactively authorize the
2026-09-12 creation, and the historical fact that its authorization record remains unrecovered is
preserved above, unchanged. This supersedes only the AC-B1-specific portion of the paragraphs
above; it does not change AC-B2's, AC-B3's, AC-B4's, AC-B5's, or AC-B7's status, all of which
remain unverified exactly as previously stated. **Task 10-B as a whole remains NOT ACCEPTED.**

**AC-B7 status update (as of 2026-09-16, Authorization Act #8)**: The AC-B7 gate described above
has since been exercised. Under a separate, explicit human authorization (Authorization Act #8), a
fresh negative Docker build (no `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` build argument) was performed
and the resulting static assets were inspected; the result is **AC-B7: PASS** (see §12 "AC-B7
Verification Result — Authorization Act #8" for the full record). This supersedes only the
AC-B7-specific portion of the paragraphs above; it does not change AC-B2's, AC-B3's, AC-B4's, or
AC-B5's status. **Task 10-B as a whole remains NOT ACCEPTED.**

**AC-B2 status update (as of 2026-09-16, Authorization Act #9)**: The AC-B2 gate described above
has since been exercised. Under a separate, explicit human authorization (Authorization Act #9), an
operator-executed Docker build using the real production Clerk publishable key was performed; the
build completed with exit code 0 (the key value itself was never disclosed to Claude or written to
any file). The result is **AC-B2: PASS** (see §12 "AC-B2 Verification Result — Authorization Act
#9" for the full record). This supersedes only the AC-B2-specific portion of the paragraphs above;
it does not change AC-B3's, AC-B4's, or AC-B5's status, both of which remain unverified exactly as
previously stated. **Task 10-B as a whole remains NOT ACCEPTED** — AC-B3 and AC-B4 are still
outstanding.

**AC-B5 status update (as of 2026-09-17, Authorization Act #13)**: The AC-B5 gate described above
has since been exercised. Under a separate, explicit human authorization (Authorization Act #13),
a read-only Git/repository-inspection evaluation of AC-B5 was performed: `server.js` and
`database.js` were confirmed to have no uncommitted changes, and their most recent commits (both
2026-09-10, Phase 8 billing work) were confirmed to predate the Dockerfile's documented 2026-09-12
creation date; the modified `package.json`/`package-lock.json` were independently diff-inspected
and identified as an unrelated, pre-existing Stripe dependency addition; `.env.example` and
`apps/web/global-setup.ts` changes were identified as Stripe environment documentation and
Playwright test setup respectively; `apps/web/e2e/chat.spec.ts` is excluded from the Docker build
context by `.dockerignore`; all other Dockerfile-referenced paths showed no changes. The result is
**AC-B5: PASS** (see §12 "AC-B5 Verification Result — Authorization Act #13" for the full record).
With this, **all seven AC-B1–AC-B7 criteria now have PASS evidence. This does not itself
constitute, and must not be read as, Task 10-B acceptance. Task 10-B as a whole remains NOT
ACCEPTED** and requires its own separate, explicit future human authorization and acceptance
review.

**Forward-looking note (added upon Act #16 acceptance decision, does not alter the historical
record above)**: This paragraph's statement that Task 10-B remained NOT ACCEPTED and required its
own separate acceptance review was accurate as of this recording (2026-09-17, Act #13/#14). A
read-only acceptance-readiness review (Authorization Act #15) subsequently confirmed the record was
ready for that decision, and explicit human authorization (Authorization Act #16) then made it.
**Task 10-B is now formally ACCEPTED** — see "Task 10-B Acceptance State — Authorization Act #16"
below. Task 10-C and all later Phase 10 tasks remain **NOT AUTHORIZED**.

**AC-B3/AC-B4 status update (as of 2026-09-16, Authorization Act #10)**: The AC-B3 and AC-B4 gates
described above have since been exercised together, in a single runtime session. Under a separate,
explicit human authorization (Authorization Act #10), the application was built from the unmodified
current `Dockerfile` and started against a disposable, non-production, SSL-enabled local PostgreSQL
instance; an in-container `GET /` returned HTTP 200, and an in-container `POST
/api/billing/webhook` returned HTTP 400 with body `{"error":"Webhook signature verification
failed"}` — a response body specific to the webhook route's own signature-verification code,
demonstrating the request reached the route handler rather than being rejected by earlier
middleware. The results are **AC-B3: PASS** and **AC-B4: PASS** (see §12 "AC-B3 / AC-B4
Verification Result — Authorization Act #10" for the full record). This supersedes only the
AC-B3- and AC-B4-specific portions of the paragraphs above; AC-B5's status is unaffected.

**Individual-criterion evidence summary (as of 2026-09-16)**: six of the seven AC-B1–AC-B7 criteria
now have PASS evidence — AC-B1 via Act #7; AC-B2 via Act #9; AC-B3 via Act #10; AC-B4 via Act #10;
AC-B6 via Act #3; AC-B7 via Act #8. **AC-B5 ("No application source code was modified to make the
Dockerfile work") has not been evaluated by any Authorization Act to date and remains unverified —
see the §5 checklist, unchanged by this pass.** Neither this recording nor Act #10 addressed AC-B5;
no PASS is claimed for it here. Even once all seven are individually evidenced, **that would not
itself constitute, and must not be read as, acceptance of Task 10-B.** Formal Task 10-B acceptance
is a separate governance decision, distinct from the individual technical criteria, and requires
its own explicit future human authorization reviewing the complete AC-B1–AC-B7 evidence set as a
whole. **Task 10-B as a whole remains NOT ACCEPTED, and Task 10-C and every later Phase 10 task
remain NOT AUTHORIZED.**

**Forward-looking note (added upon Act #13 verification, does not alter the historical record
above)**: This paragraph's statement that AC-B5 remained unevaluated and unverified was accurate
as of this recording (2026-09-16). A separate authorization (Authorization Act #13) subsequently
evaluated it; see "AC-B5 Verification Result — Authorization Act #13" below. AC-B5 is now
**PASS**, and all seven AC-B1–AC-B7 criteria have PASS evidence. This still does **not** constitute
Task 10-B acceptance. **Task 10-B as a whole remains NOT ACCEPTED, and Task 10-C and every later
Phase 10 task remain NOT AUTHORIZED.**

**Second forward-looking note (added upon Act #16 acceptance decision, does not alter the
historical record above)**: The preceding note's statement that Task 10-B acceptance had not yet
occurred was accurate as of this recording (2026-09-17, Act #14). Following the read-only
acceptance-readiness review (Authorization Act #15) and explicit human authorization (Authorization
Act #16), **Task 10-B is now formally ACCEPTED** — see "Task 10-B Acceptance State — Authorization
Act #16" below. **Task 10-C and every later Phase 10 task remain NOT AUTHORIZED.**

**Task 10-B Acceptance State (recorded in v1.0.18, Authorization Act #16, 2026-09-17)**:

Task 10-B is documented as **ACCEPTED**. This decision follows the same governance pattern already
established for Task 10-A's acceptance (§5, "10-A Acceptance State"): a read-only
acceptance-readiness review (Authorization Act #15) confirmed that (a) Task 10-B's own acceptance
requirement is exactly AC-B1 through AC-B7, with no additional substantive technical requirement
specific to Task 10-B; (b) all seven criteria have recorded PASS evidence, each retaining its
original Authorization Act attribution unchanged — AC-B1 (Act #7), AC-B2 (Act #9), AC-B3 (Act #10),
AC-B4 (Act #10), AC-B5 (Act #13), AC-B6 (Act #3), AC-B7 (Act #8); (c) pending Decision D-9 concerns
only a later `<registry>/<image-name>` reference needed by Task 10-F and does not block Task 10-B's
own Dockerfile/`.dockerignore` artifacts or acceptance criteria; and (d) the whole-Phase-10
governance gates and checkpoint apparatus (§7–§8: AC-GOV-1 through AC-GOV-8, Gates A–E) is a
separate, later, whole-project checkpoint spanning DNS, Caddy, CI/CD, Neon production, and Stripe
live mode — none of which exist yet — and is not itself a Task 10-B acceptance prerequisite.

Based on that review, explicit human authorization (Authorization Act #16) directed this formal
acceptance decision. No individual AC-B criterion's technical evidence was re-evaluated, modified,
or broadened by this decision — each retains exactly the evidentiary basis and scope limitations
recorded in its own §12 entry. No application source code, `Dockerfile`, or `.dockerignore` was
modified as part of this decision. No Docker build, container run, PostgreSQL work, or other
runtime or infrastructure activity was performed.

**Acceptance of Task 10-B does NOT authorize Task 10-C or any later Phase 10 deliverable.** Task
10-C and every subsequent task in this document remain **NOT AUTHORIZED** and each requires its own
separate, explicit human authorization, exactly as was already true before this acceptance and as
remains true for Task 10-C following Task 10-A's own acceptance. Commit, tag, and push authorization
remain separately unauthorized and are unaffected by this documentation decision.

---

### Task 10-C: Production Domain / DNS

**Type**: Human DNS action
**Depends on**: Decision D-1 (domain confirmation — **RESOLVED 2026-09-17, Authorization Act #19:
`flavourfind.com`**; see §4 "D-1 current status" and §12 "Decision D-1 Resolution — Authorization
Act #19"); Task 10-A (Droplet IP)
**Can run in parallel with**: 10-B, 10-H

✅ **DECISION D-1 RESOLVED (2026-09-17)** — ⚠ **TASK 10-C ITSELF STILL NOT AUTHORIZED**: The
production domain has been confirmed by explicit human decision as `flavourfind.com`. This
resolves D-1 only. It does not create any DNS record, does not confirm DNS propagation, does not
confirm registrar/DNS control has actually been exercised, and does not authorize this task's
implementation. Task 10-C requires its own separate, explicit human implementation authorization
before any DNS record is created. Throughout this task's specification, `<domain>` now refers to
`flavourfind.com` and `www.<domain>` to `www.flavourfind.com`; the placeholder notation is retained
below for clarity of the specification's structure.

**Specification** (D-1 resolved; Task 10-C implementation itself remains separately unauthorized):

- Set A record for `flavourfind.com` (`<domain>`) → Reserved IP from Task 10-A
- Set A record for `www.flavourfind.com` (`www.<domain>`) → same Reserved IP
- TTL: 300 seconds during initial cutover; increase to 3600 after stable
- Propagation check: confirm from an external resolver (e.g., `dig @8.8.8.8 flavourfind.com A`)

**Acceptance Criteria**:
- [x] **AC-C1** — **PASS (Authorization Act #21, 2026-09-17 — see §12 "Task 10-C Acceptance
  Record — Authorization Act #22")**: `dig <domain> A` resolves to Droplet Reserved IP. Verified:
  `flavourfind.com` resolves to `146.190.189.242`, confirmed via the local system resolver and
  independently via Google Public DNS and Cloudflare Public DNS (both queried over
  DNS-over-HTTPS).
- [x] **AC-C2** — **PASS (Authorization Act #21, 2026-09-17 — see §12 "Task 10-C Acceptance
  Record — Authorization Act #22")**: `dig www.<domain> A` resolves to Droplet Reserved IP.
  Verified: `www.flavourfind.com` resolves to `146.190.189.242`, confirmed via the same three
  independent lookups; the answer is a type-A record, not the former Namecheap parking CNAME.
- [x] **AC-C3** — **PASS (Authorization Act #21, 2026-09-17 — see §12 "Task 10-C Acceptance
  Record — Authorization Act #22")**: DNS propagation confirmed from external resolver. Verified:
  two independent public resolvers (Google Public DNS, Cloudflare Public DNS), external to the
  local default resolver, returned identical answers for both hostnames; no propagation
  discrepancy was observed.

**Task 10-C Acceptance State (recorded in v1.0.20, Authorization Act #22, 2026-09-17)**:

Task 10-C is documented as **ACCEPTED**. Decision D-1 was resolved to `flavourfind.com`
(Authorization Act #19). Task 10-C's implementation-readiness was independently confirmed
(Authorization Act #20). Task 10-C's DNS implementation was then explicitly authorized
(Authorization Act #21); the human operator manually configured Namecheap Advanced DNS — `@` → A
→ `146.190.189.242` (TTL 30 min) and `www` → A → `146.190.189.242` (TTL 30 min) — replacing the
prior Namecheap parking CNAME (`www` → `parkingpage.namecheap.com.`) and URL redirect (`@` →
`http://www.flavourfind.com/`); the pre-existing SPF TXT record was left unchanged. Claude did not
access Namecheap credentials and performed no DNS writes at any point; the DNS implementation was
performed entirely by the human operator through the Namecheap dashboard. Claude then performed
read-only technical verification (also under Authorization Act #21): AC-C1, AC-C2, and AC-C3 all
PASS, confirmed via the local system resolver and two independent public resolvers (Google Public
DNS and Cloudflare Public DNS, both via DNS-over-HTTPS), with no propagation discrepancy observed
and no residual parking CNAME found for `www.flavourfind.com`. Based on this evidence, explicit
human authorization (Authorization Act #22) formally accepts Task 10-C.

Acceptance of Task 10-C does **not** authorize Task 10-D or any later Phase 10 deliverable. **Task
10-D is NOT authorized** and requires separate explicit human authorization, as does every
subsequent task in this document. Commit, tag, and push authorization remain separately
unauthorized and are unaffected by this documentation recording. No Caddy installation, TLS/
certificate configuration, or reverse-proxy work has occurred as part of Task 10-C or this
documentation recording.

---

### Task 10-D: Caddy Installation and TLS Configuration

**Type**: New infrastructure configuration file — REQUIRES EXPLICIT HUMAN AUTHORIZATION
**Depends on**: Task 10-A (Droplet running), Task 10-C (DNS propagated)
**Serialized after**: 10-A, 10-C

⚠ **AUTHORIZATION GATE**: No Caddyfile exists. Creating a Caddyfile and installing Caddy
is creating new infrastructure configuration. This requires explicit human authorization.

**Specification**:

Install Caddy on the Droplet. Configure it as a TLS-terminating reverse proxy to the
Express server on port 3000.

Intended Caddyfile (planning specification — not implementing):

```caddyfile
<domain> {
    reverse_proxy localhost:3000 {
        flush_interval -1
    }
}

www.<domain> {
    redir https://<domain>{uri} permanent
}
```

Where `<domain>` is resolved by Decision D-1.

**Notes**:

- Caddy obtains TLS certificates automatically via ACME / Let's Encrypt. No manual
  certificate management is required.
- The Express server must NOT be directly exposed on port 443 or 80. Caddy handles
  TLS termination.
- The Stripe webhook endpoint (`POST /api/billing/webhook`) must be reachable over
  HTTPS through Caddy.
- **`flush_interval -1` is required and is part of the mandatory deployment specification.**
  `POST /api/v1/chat` uses Server-Sent Events (SSE). Caddy is the production reverse
  proxy. Without `flush_interval -1`, Caddy may buffer streaming responses, causing
  the chat widget to stall or produce visible latency.
  The `X-Accel-Buffering: no` header set by `server.js` is an nginx-specific hint.
  Caddy does not honor it for its own response-buffering behavior. `flush_interval -1`
  in the Caddy `reverse_proxy` block is the correct Caddy mechanism for disabling
  SSE buffering.
- Caddy must be configured to start automatically on Droplet boot (e.g., `systemd` service).

**This task does NOT authorize**:
- Modifying `server.js`
- Exposing any port directly (all traffic must route through Caddy)

**Acceptance Criteria**:
- [ ] **AC-D1**: `https://<domain>/` returns HTTP 200
- [ ] **AC-D2**: TLS certificate is valid (Let's Encrypt; verify with `curl -v`)
- [ ] **AC-D3**: `http://<domain>/` permanently redirects to `https://<domain>/`
- [ ] **AC-D4**: `https://www.<domain>/` permanently redirects to `https://<domain>/`
- [ ] **AC-D5**: `POST https://<domain>/api/billing/webhook` returns a response (route must be reachable; Stripe signature will be invalid without a real event)
- [ ] **AC-D6**: Caddy service is enabled and starts on boot
- [ ] **AC-D7**: SSE streaming is verified functional end-to-end through Caddy (chat widget streams tokens without buffering delay)

**Pre-go-live prerequisites (v1.0.25, human decisions)**: Task 10-D remains **NOT AUTHORIZED**; these
prerequisites do not authorize it and do not alter AC-D1–AC-D7.
1. **PostgreSQL SSL first**: the separately authorized Day 2 change setting
   `ssl: { rejectUnauthorized: true }` (§1.5, v1.0.25 note) must be validated and deployed before Task
   10-D makes the application publicly reachable over HTTPS.
2. **Clerk production check (C15)**: a read-only verification of the Clerk production instance's
   setup, domain, and DNS is to be performed before public HTTPS go-live, without modifying Clerk
   configuration. (AC-D7 requires a signed-in chat session, which depends on the Clerk production
   instance functioning for the production domain.)

**v1.0.26 note — prerequisite 1 status**: The Day 2 SSL change is implemented, validated in
non-production, and committed and pushed in `9448d2f`; it is NOT deployed. **Prerequisite 1 remains
UNMET** until the second production deployment and P4 (§1.5, v1.0.26 note). Task 10-D remains **NOT
AUTHORIZED**.

---

### Task 10-E: GitHub Repository Secrets

**Type**: Human GitHub settings action
**Depends on**: Task 10-A (Droplet IP), Task 10-H (Neon production `DATABASE_URL`),
  Task 10-G partial (Stripe live keys), D-9 (registry choice)
**Note on ordering**: Task 10-E may be done in two passes: first pass after 10-A and 10-H;
  second pass after 10-G to add Stripe live-mode secrets.

**Task 10-E / Task 10-H dependency clarification (as of 2026-09-17, human decision)**: The
"Depends on: Task 10-H" line above means Task 10-E requires the production `DATABASE_URL`
connection information for the already-adopted Neon production database (`flavourfind` /
`production` — see Task 10-H, "adoption status") to be identified and available for this human
GitHub Secrets action. It does **not** require full Task 10-H acceptance before Task 10-E may be
authorized or performed. In particular, Task 10-H's AC-H5 (storing `DATABASE_URL` in GitHub
secrets) and AC-H6 (the Droplet-to-Neon connection test) are downstream of, not prerequisites to,
the `DATABASE_URL` portion of Task 10-E — performing Task 10-E's GitHub Secrets action is in fact
what subsequently enables the separately authorized AC-H6 connection test to be attempted.
Completing Task 10-E does **not** by itself satisfy Task 10-H, and Task 10-H remains **NOT
ACCEPTED** until all of its own acceptance criteria, including AC-H5 and AC-H6, are independently
satisfied. Task 10-E's own acceptance remains governed solely by AC-E1 through AC-E5 and its other
stated dependencies (Task 10-A, Task 10-G partial, D-9), unaffected by this clarification. This
note does not itself authorize, implement, or accept Task 10-E, and does not satisfy AC-H5 or
AC-H6.

**Specification**:

Set the following GitHub repository secrets. Secret names are specifications.
Secret **values** must not be recorded in this document or any committed file.

**Build-time secrets** (used during `docker build` in the CI/CD workflow):

| Secret Name | Purpose | Used as |
|-------------|---------|---------|
| `CLERK_PUBLISHABLE_KEY` | Clerk dashboard — production publishable key (`pk_live_...`) | `--build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${{ secrets.CLERK_PUBLISHABLE_KEY }}` in `docker build` |

**Runtime secrets** (injected into the container at `docker run` time; never baked into the image):

| Secret Name | Source / Notes |
|-------------|---------------|
| `DROPLET_HOST` | Reserved IP from Task 10-A |
| `DROPLET_SSH_KEY` | SSH private key for CI/CD deployment to Droplet |
| `DATABASE_URL` | Neon production connection string from Task 10-H |
| `ANTHROPIC_API_KEY` | Anthropic console — production API key |
| `STRIPE_SECRET_KEY` | Production live Stripe key (`sk_live_...`) from Task 10-G |
| `STRIPE_WEBHOOK_SECRET` | Production webhook signing secret (`whsec_...`) from Task 10-G |
| `STRIPE_PREMIUM_PRICE_ID` | Production live price ID (`price_...`) from Task 10-G |
| `STRIPE_SUCCESS_URL` | Production HTTPS URL (format: `https://<domain>/billing?result=success`) |
| `STRIPE_CANCEL_URL` | Production HTTPS URL (format: `https://<domain>/billing?result=cancel`) |
| `STRIPE_PORTAL_RETURN_URL` | Production HTTPS URL (format: `https://<domain>/billing`) |
| `CLERK_SECRET_KEY` | Clerk dashboard — production backend secret key |
| `AI_CHAT_LIMIT_FREE` | Human decision — integer; free-tier chat rate limit (rolling 24-hour window) |
| `AI_CHAT_LIMIT_PREMIUM` | Human decision — integer; premium-tier chat rate limit (rolling 24-hour window) |
| `NODE_ENV` | `production` |

**Additional secrets if D-9 selects DigitalOcean Container Registry**:

| Secret Name | Purpose |
|-------------|---------|
| `DOCR_ACCESS_TOKEN` | DigitalOcean API token with registry read/write scope |

**Additional secrets if D-9 selects Docker Hub**:

| Secret Name | Purpose |
|-------------|---------|
| `DOCKERHUB_USERNAME` | Docker Hub account username |
| `DOCKERHUB_TOKEN` | Docker Hub access token (not account password) |

**CRITICAL — STRIPE NAMING**: The env var name is **`STRIPE_PREMIUM_PRICE_ID`**, not
`STRIPE_PRICE_ID`. Using the wrong name causes checkout session creation to fail silently.

**CRITICAL — RUNTIME INJECTION**: Runtime secrets in this table are not automatically
available to the container. The CI/CD workflow (Task 10-F) must explicitly pass them
to `docker run` using `-e` flags or an `--env-file`. See Task 10-F for the required
injection specification.

**CRITICAL — NO REAL VALUES IN THIS DOCUMENT**: The table above contains only variable
names and descriptions. No actual keys, passwords, IPs, price IDs, or tokens appear here.

**Clerk production instance**: At implementation time, confirm that the production Clerk
instance is configured with the production domain as an allowed origin. Clerk production
instances enforce origin restrictions and may require the production domain (`https://<domain>`)
to be listed in the Clerk dashboard under the instance's allowed origins or domains.
No Clerk configuration is changed by this task; this note is a pre-implementation checklist
item for the human performing Task 10-G/Task 10-E.

**Acceptance Criteria**:
- [ ] **AC-E1**: All listed secrets are set in GitHub repository Settings → Secrets → Actions
- [x] **AC-E2** — **EVIDENCED (2026-09-22 — see "AC-E2 evidence recording" below)**: No secret values appear in any file tracked by git
- [ ] **AC-E3**: Secret name `STRIPE_PREMIUM_PRICE_ID` (not `STRIPE_PRICE_ID`) confirmed
- [x] **AC-E4** — **EVIDENCED (2026-09-22 — see Task 10-B, "AC-B6 fresh post-D-F5 verification")**: `CLERK_PUBLISHABLE_KEY` confirmed as `pk_live_...` (not `pk_test_...`) *(cross-reference recorded 2026-09-22, human-authorized: the fresh AC-B6 structural verification used this exact secret — `CLERK_PUBLISHABLE_KEY` — as the documented Docker build argument and established that it is structurally `pk_live_`, with zero structurally valid `pk_test_` occurrences; this is the same secret and the same underlying fact AC-E4 asks about, so no additional technical test was performed or is required. This does not evidence AC-E1, AC-E2, AC-E3, or AC-E5, and does not constitute or imply Task 10-E acceptance.)*
- [x] **AC-E5** — **SATISFIED (human attestation, v1.0.25 — see "AC-E5 human attestation record" below)**: `AI_CHAT_LIMIT_FREE` and `AI_CHAT_LIMIT_PREMIUM` values decided by human and set

**AC-E5 human attestation record (v1.0.25, human decision C5, 2026-09-24)**: The human has attested
that they personally decided the integer values configured for `AI_CHAT_LIMIT_FREE` and
`AI_CHAT_LIMIT_PREMIUM`, and that the values currently configured in GitHub Secrets are the values
they selected. Supporting metadata (names and timestamps only): both secrets exist, updated
2026-09-17T14:01:06Z, and are listed in the 2026-09-22 Gate C secrets record (§8.1). **No value is
recorded in this document**; no secret value was read, printed, or retrieved. This recording does not
evidence AC-E1 or AC-E3 and does not constitute Task 10-E acceptance.

**AC-E1 / AC-E3 status under the D-8 deferral (v1.0.25, human decision C6)**: both remain **unchecked
and open**. The six Stripe second-pass secrets (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`,
`STRIPE_PREMIUM_PRICE_ID`, `STRIPE_SUCCESS_URL`, `STRIPE_CANCEL_URL`, `STRIPE_PORTAL_RETURN_URL`) are
absent / not configured, as already evidenced; D-8 remains not authorized within Phase 10 (deferred).
No exception is authorized for AC-E1 or AC-E3. **Task 10-E remains NOT ACCEPTED**; its second pass is
deferred with D-8.

**AC-E2 evidence recording (2026-09-22, human-authorized read-only review)**: AC-E2 is recorded as
evidenced based on a read-only, pattern-based scan of all 132 files currently tracked by git (via
`git ls-files`; untracked files explicitly excluded, consistent with this criterion's "tracked by
git" wording). The scan checked for Stripe, Clerk, Anthropic, DigitalOcean, AWS, GitHub, and Slack
credential-shaped patterns, PEM private-key blocks, database connection strings with embedded
credentials, JWTs, and generic long-value `*_KEY`/`*_SECRET`/`*_TOKEN` assignments. No actual
credential-shaped secret value was found. Four database-connection-string matches occurred
(`.env.example` line 3; `SAAS_ROADMAP.md` line 669; and this document's own §1.6 environment-
variable table and Task 10-H specification example — see the "CRITICAL — NO REAL VALUES IN THIS
DOCUMENT" note above), and each was confirmed to contain only generic placeholder words
(`user`/`password`/`host`/`your-neon-user`/`your-neon-host`), not real hostnames or credentials.
The six pre-existing, separately-authorized working-tree modifications to `.env.example`,
`.gitignore`, `SAAS_ROADMAP.md`, `apps/web/e2e/chat.spec.ts`, `apps/web/global-setup.ts`, and
`phase8_plan_1_4.md` were also reviewed observationally (both their `HEAD` and working-tree
content) and contained no credential-shaped values — only explicit `_REPLACE_ME` placeholders,
variable-name references (e.g., `process.env.DATABASE_URL`), and unrelated documentation prose. No
secret value was read, printed, or exposed by this review, and no repository file was modified.
**This recording evidences AC-E2 only.** It does not evidence AC-E1, AC-E3, AC-E4, or AC-E5; does
not constitute or imply Task 10-E acceptance; does not satisfy Gate C; and does not authorize,
initiate, or imply authorization for production deployment. The six second-pass Stripe secrets
(`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PREMIUM_PRICE_ID`, `STRIPE_SUCCESS_URL`,
`STRIPE_CANCEL_URL`, `STRIPE_PORTAL_RETURN_URL`) remain deferred per Task 10-E's two-pass model and
are not documented as present. **Task 10-E remains NOT ACCEPTED, Gate C remains NOT SATISFIED, and
production deployment remains UNAUTHORIZED.**

---

### Task 10-F: GitHub Actions CI/CD Pipeline

**Type**: New file creation — REQUIRES EXPLICIT HUMAN AUTHORIZATION (Decision D-7)
**Depends on**: Task 10-B (Dockerfile and .dockerignore authorized by D-6), Task 10-E (secrets set), D-9 (registry choice)
**Task 10-E dependency clarification (as of 2026-09-17, human decision)**: "Task 10-E (secrets
set)" above refers to Task 10-E's **first pass** (see Task 10-E, "Note on ordering") — the
non-Stripe-dependent secrets required for deployment (`DROPLET_HOST`, `DROPLET_SSH_KEY`,
`DATABASE_URL`, `ANTHROPIC_API_KEY`, `CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`,
`AI_CHAT_LIMIT_FREE`/`PREMIUM`, `NODE_ENV`, and the D-9-selected registry secret). It does **not**
require full Task 10-E acceptance (AC-E1's "all listed secrets") or Task 10-E's second pass
(the Stripe live-mode secrets from Task 10-G) before Task 10-F may proceed. This clarification
does not alter Task 10-E's two-pass model, AC-E1–AC-E5, or any AC-F criterion. *(Decision D-F5,
Task 10-F, is intended — once its Shape 1 implementation is separately authorized and made — to
reconcile this first-pass deployment path with the application's Stripe-client startup
dependency, so that application startup can proceed through the first-pass secrets alone. D-F5
does not itself complete Task 10-E or Task 10-F, and does not alter this two-pass model.)*
**Serialized after**: 10-B, 10-E

⚠ **AUTHORIZATION GATE (D-7) — RESOLVED (v1.0.21 correction)**: Decision D-7 was resolved on
2026-09-17 (see the "D-7 current status" note in the decision section), and
`.github/workflows/deploy.yml` now exists (registered dispatch-only; see the "CI-only dry-run
evidence recording" below). This task is no longer blocked on D-7. Each further Task 10-F
implementation, publication, and production action still requires its own separate, explicit human
authorization, and Gate C remains NOT SATISFIED.

**Current status note (v1.0.23)**: the paragraph above describes the state at the time of the v1.0.21
correction and is preserved as written. Since then: the `prod-v*` production trigger was implemented
and published in commit `a5318abb03bb21f56ecfde824f72be8cbf6699f5` — `ci(phase10): enable prod-v tag deployment workflow`,
2026-09-21T14:26:35−04:00 — so `deploy.yml` is **no longer dispatch-only** (it now triggers on a push
of a `prod-v*` tag, with `workflow_dispatch` retained as the non-production dry run); `deploy.yml` is
unchanged from `a5318ab` through `724fe67`. Gate C is **SATISFIED** as of 2026-09-22 (§8.1). See
"Implementation references (recorded in v1.0.23)" under the D-F decisions below. *(v1.0.24: `deploy.yml`
was subsequently changed in `48d62ac2bd47888e6ea67f726e5fcd1dfd7f8519` to correct the Deploy step's SSH
remote-command defect — its only change since `a5318ab`; see "Deploy-step SSH remote-command defect and
correction" below.)*

**Specification**:

The CI/CD pipeline must:

1. Trigger on a push of a `prod-v*` Git version tag (the production release trigger, Option B —
   v1.0.21); `workflow_dispatch` remains the non-production dry-run trigger; checkpoint tags
   (e.g., `phase-10-checkpoint-1`) must never trigger production
2. Check out the repository
3. Log in to the container registry selected by D-9
4. Build the Docker image using the Dockerfile from Task 10-B; pass the Clerk publishable
   key as a build argument (see below)
5. Tag the image with both an immutable image tag (Git commit SHA) and a mutable
   convenience tag
6. Push the tagged image to the registry
7. SSH into the Droplet using `DROPLET_SSH_KEY` and `DROPLET_HOST` secrets
8. Pull the new image by its immutable image tag (Git commit SHA)
9. Start the new container with all runtime secrets injected via environment variables
10. Run a smoke check on an existing unauthenticated route (e.g., `GET /api/moods`) or
    `GET /health` if Decision D-2 is authorized and Task 10-I is implemented
11. If the smoke check passes, stop and remove the old container; the new container is live

**Clerk build-time argument mapping**:

The GitHub secret `CLERK_PUBLISHABLE_KEY` holds the production Clerk publishable key
(`pk_live_...`). The Dockerfile `ARG` name is `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`.
The `docker build` step must explicitly map the secret to the build argument:

```text
docker build \
  --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${{ secrets.CLERK_PUBLISHABLE_KEY }} \
  -t <registry>/<image-name>:${{ github.sha }} \
  -t <registry>/<image-name>:latest \
  .
```

The secret name (`CLERK_PUBLISHABLE_KEY`) and the build argument name
(`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`) differ intentionally. The secret name omits the
`NEXT_PUBLIC_` prefix for clarity in the GitHub secrets store; the build argument name
must match the `NEXT_PUBLIC_` convention that Next.js requires for client-side exposure.

**Image tagging strategy**:

| Tag | Format | Purpose |
|-----|--------|---------|
| Immutable image tag (Git commit SHA) | `<registry>/<image-name>:<git-commit-sha>` | Uniquely identifies the deployed image; used for rollback (see Task 10-N) |
| Convenience tag | `<registry>/<image-name>:latest` | For reference; must never be the sole tag used for rollback |

The Git commit SHA (`${{ github.sha }}`) provides a traceable link between the deployed
image and the exact source code that produced it. The previously deployed image must
be retained in the registry (not overwritten or deleted) to allow rollback.

**Production release trigger and tag namespace (Option B — recorded in v1.0.21)**:

- **Production trigger**: a push of a Git version tag matching `prod-v*`. This Git release tag is
  distinct from the immutable Docker image tag (Git commit SHA) above; the two must not be
  conflated. The image-tagging behavior above is unchanged.
- **Dry run**: `workflow_dispatch` remains the non-production dry-run mechanism.
- **Checkpoint tags** (e.g., `phase-10-checkpoint-1`) must never trigger production.
- **Concurrency**: production tag-triggered runs and `workflow_dispatch` dry runs use
  event-separated concurrency groups, with `cancel-in-progress: false`.
- **No GitHub Environment** is added.
- **Human-only tag actions**: only a human creates or pushes a production release tag, under the
  appropriate explicit authorization. Production tag creation and production tag push are separate
  authorization boundaries. The workflow itself must not create commits or tags (see "Additional
  notes" below).
- **Publishing the workflow does not execute production.** The registered
  `.github/workflows/deploy.yml` remains dispatch-only until a separately authorized workflow
  implementation; documentation correction and workflow implementation (edit, commit, publication)
  are separate authorization boundaries, in that order. *(Current status, v1.0.23: that workflow
  implementation has since occurred and been published in `a5318abb03bb21f56ecfde824f72be8cbf6699f5`;
  `deploy.yml` is no longer dispatch-only. The sentence above is preserved as the rule as recorded.)*
- **Retry boundary**: a retry of the same authorized production release is permitted under the
  original authorization only when the original production attempt failed or remained incomplete,
  and only through an explicitly named retry mechanism, such as a GitHub Actions re-run of the
  failed production workflow for the same `prod-v*` tag and same commit SHA. This does **not**
  authorize: redeploying an already-successful release; changing the production tag or commit SHA;
  deploying a different release or to a different target; a second successful production
  deployment for AC-F8; rollback testing; or any other new production action. A second production
  deployment needed for AC-F8 requires separate explicit human authorization.
  *(Cross-reference, v1.0.23: a GitHub Actions re-run of failed run `35750588575` reuses that run's
  original ref and commit — `prod-v1.0.0` / `a2d45cccd17aba327f4565e45d98f658887656be` — and would
  therefore rebuild the original single-stage `Dockerfile` whose image push was denied, not the
  corrected artifact at `724fe67`. Any mechanism that uses the corrected commit changes the commit SHA
  and therefore falls outside this retry boundary. This note does not choose, authorize, or perform any
  retry or release mechanism; the release mechanism (DEC-9) remains an unresolved human decision — see
  "First production release attempt" below and §12 "v1.0.23 Documentation Record — Authorization Act
  #25".)*
  *(Cross-reference, v1.0.24: a tag-triggered run uses the workflow file at the tagged commit. A release
  that is to use both the corrected `Dockerfile` and the corrected Deploy step must therefore target
  `48d62ac2bd47888e6ea67f726e5fcd1dfd7f8519` or a later commit containing that fix; `724fe67` and
  `253e7df` contain the corrected `Dockerfile` but the defective Deploy step. This note does not choose,
  authorize, or perform any release mechanism; DEC-9 remains undecided — see "Release-readiness record
  (v1.0.24)" below.)*

**Runtime secret injection**:

Runtime secrets must be passed to the container using `-e` flags or an `--env-file`
mechanism — never baked into the image. The Droplet-side deployment step must inject
all runtime secrets from the GitHub secrets into the container environment. Example
conceptual approach:

```text
docker run -d \
  --name flavourfind-app \
  --restart unless-stopped \
  -p 127.0.0.1:3000:3000 \
  -e DATABASE_URL="${{ secrets.DATABASE_URL }}" \
  -e ANTHROPIC_API_KEY="${{ secrets.ANTHROPIC_API_KEY }}" \
  -e STRIPE_SECRET_KEY="${{ secrets.STRIPE_SECRET_KEY }}" \
  -e STRIPE_WEBHOOK_SECRET="${{ secrets.STRIPE_WEBHOOK_SECRET }}" \
  -e STRIPE_PREMIUM_PRICE_ID="${{ secrets.STRIPE_PREMIUM_PRICE_ID }}" \
  -e STRIPE_SUCCESS_URL="${{ secrets.STRIPE_SUCCESS_URL }}" \
  -e STRIPE_CANCEL_URL="${{ secrets.STRIPE_CANCEL_URL }}" \
  -e STRIPE_PORTAL_RETURN_URL="${{ secrets.STRIPE_PORTAL_RETURN_URL }}" \
  -e CLERK_SECRET_KEY="${{ secrets.CLERK_SECRET_KEY }}" \
  -e AI_CHAT_LIMIT_FREE="${{ secrets.AI_CHAT_LIMIT_FREE }}" \
  -e AI_CHAT_LIMIT_PREMIUM="${{ secrets.AI_CHAT_LIMIT_PREMIUM }}" \
  -e NODE_ENV="production" \
  <registry>/<image-name>:<git-commit-sha>
```

The container is bound to `127.0.0.1:3000` to prevent direct external access; all
traffic must route through Caddy.

**Additional notes**:

- The Docker build must target the root `server.js`. No reference to `apps/api/` may
  appear in the workflow.
- All secrets must be injected via `${{ secrets.SECRET_NAME }}` and must not be
  printed or echoed in any workflow step.
- The workflow must NOT run any step that connects to the production Neon database directly.
- The workflow must NOT create commits or tags autonomously.
- If a test suite is run in CI, it must use test/development credentials, not production.

**Droplet pull access** (if D-9 selects DOCR): The Droplet must be granted permission
to pull images from the DigitalOcean Container Registry. This is typically done via
DigitalOcean API access controls at registry creation time or by configuring Docker
credentials on the Droplet as part of Task 10-A/10-F setup.

**This task does NOT authorize**:
- Modifying `server.js`
- Modifying `package.json`
- Any step that modifies production infrastructure other than deploying the new container

**Acceptance Criteria**:
- [x] **AC-F1** — **SATISFIED (production path — run `36003636133`, `prod-v1.0.1`; human decision C1, v1.0.25; the 2026-09-17 `workflow_dispatch` evidence is preserved as historical)**: Workflow YAML is syntactically valid
- [x] **AC-F2** — **SATISFIED (the push of `prod-v1.0.1` exercised the `prod-v*` push trigger, event `push` — run `36003636133`; human decision C2, v1.0.25; the 2026-09-17 evidence is preserved as historical)**: Workflow triggers on the specified event
- [x] **AC-F3** — **EVIDENCED (2026-09-17 — see "CI-only dry-run evidence recording" below)**: Docker build step completes without error in CI; `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` build argument is confirmed passed
- [x] **AC-F4** — **SATISFIED (immutable SHA tag `c2249c9…` pushed to DOCR in both attempts of run `36003636133`; the attempt 2 image was deployed; human decision C3, v1.0.25 — see "Production release record (v1.0.25)")**: Image is tagged with immutable Git SHA tag and pushed to registry
- [ ] **AC-F5**: Deployment to Droplet succeeds; application container restarts with new image
- [x] **AC-F6** — **EVIDENCED (2026-09-17 — dry-run path; see "CI-only dry-run evidence recording" below) and SATISFIED for the `prod-v*` production path (human determination, v1.0.25 — see "AC-F6 production-path human determination (v1.0.25)" below)**: No secret values appear in workflow logs
- [ ] **AC-F7** — **NOT SATISFIED (as of 2026-09-22 — see "AC-F7 — D-F5 implementation consequence" below and Task 10-F, "D-F5 — Stripe client initialization deferral")**: No application source code was modified to accommodate the workflow
- [ ] **AC-F8**: Previous image is retained in registry and can be pulled for rollback

**v1.0.25 checklist notes (human decisions C1–C4)**: AC-F1, AC-F2, and AC-F4 are checked by explicit
human decision on the evidence recorded in "Production release record (v1.0.25)". **AC-F5 remains
unchecked (C4)**: the `prod-v1.0.1` deployment succeeded and was independently verified, but no
previous application container existed, so "application container restarts with new image" is not
literally evidenced; AC-F5 remains open until a later deployment provides literal evidence. **AC-F7
remains NOT SATISFIED** (literal status unchanged; see "AC-F7 disposition (human decision, v1.0.25)").
**AC-F8 remains unchecked**: DOCR holds one production SHA tag; a second deployment from a different
commit is required (see "AC-F8 first-deployment / second-deployment consequence" below). No criterion
wording is changed by these notes.

**AC-F6 production-path human determination (v1.0.25)**: The human reviewer has determined:
**"AC-F6: SATISFIED."** The determination is based on the human's review of GitHub Actions production
workflow run `36003636133`, including both attempts (attempt 1, failed at the Deploy step's SSH
authentication; attempt 2, successful deployment) and the relevant raw log sections. In the human's
words: no secret-value disclosure was found in the reviewed output, and "the `***` masking side effects
observed in ordinary log strings do not constitute disclosure of the underlying secret values." This
is recorded as **the human reviewer's determination**; a count-only automated search by Claude for
known secret formats (no matches in either attempt) is supporting evidence only and is not the basis
of the determination. The 2026-09-17 dry-run AC-F6 record below is preserved unchanged.

**AC-F4 / AC-F8 technical dependency clarification**: AC-F8 ("Previous image is retained
in registry and can be pulled for rollback") presupposes that at least one real registry push
(AC-F4) has already occurred — there is no "previous image" to evidence retention of otherwise.
AC-F4 must therefore occur before AC-F8 can be evidenced; AC-F8 does not precede or gate AC-F4.
This is a technical ordering fact only. It does not authorize AC-F4's execution or AC-F8's
verification; AC-F4 having occurred does not itself authorize AC-F8 or any other action. This
clarification does not alter Task 10-F's acceptance status, Gate C's status, or any AC-F checklist
state, and all execution remains governed exclusively by Gate C and this document's existing
authorization requirements.

**AC-F8 first-deployment / second-deployment consequence (recorded in v1.0.21, human decision)**:
AC-F8 requires an already-existing previous production image that is retained in the registry and
pullable for rollback. The first production deployment alone therefore does not satisfy AC-F8; it
establishes the first image only. A subsequent, separately authorized production deployment is
required to establish the before/after image evidence AC-F8 needs, and that deployment — as well
as any registry evidence/read access for AC-F8 — requires separate explicit human authorization
(it is not covered by the retry boundary above). The treatment of registry evidence/read access for
AC-F8 as a distinct authorization boundary requiring separate explicit human authorization is
explicitly human-ratified (v1.0.21, Authorization Act #23). That ratification is a documentation
and governance clarification only: it does not itself authorize registry access, AC-F8
verification, AC-F4 execution, any production deployment, or any other operational action. AC-F8
remains a Task 10-F criterion; it is not
converted into AC-N3, which remains a Task 10-N criterion. This adds no wording to AC-F8 itself.

**CI-only dry-run evidence recording (2026-09-17, human-authorized GitHub Actions run)**: AC-F1, AC-F2,
AC-F3, and AC-F6 are recorded as evidenced based on a real GitHub Actions run of the registered
`.github/workflows/deploy.yml` workflow, executed via a manually authorized `workflow_dispatch`
event against the non-production branch `phase10-f-ci-dry-run` (commit
`eeb40930c60e0f4ee325d3a42c2666b84a5a05d9`), **not** via the `push`-to-`main` production trigger.
Run ID `35274886507`, event `workflow_dispatch`, overall conclusion **success**.

- **AC-F1**: the run's own successful execution is direct evidence the workflow YAML parsed
  correctly — an invalid YAML file would have failed before any step ran.
- **AC-F2**: the run was successfully triggered by the `workflow_dispatch` event, one of the two
  triggers declared in the workflow's `on:` block, confirming trigger-matching functions correctly.
  This evidences the `workflow_dispatch` trigger specifically; the `push`-to-`main` production
  trigger remains separately unexercised and unevidenced by this run.
- **AC-F3**: the "Build Docker image" step completed successfully inside GitHub Actions CI (not
  merely locally), and the run's log directly confirms the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  build argument was supplied, via the logged `CLERK_BUILD_ARG: pk_test_dryrun_dummy_value` step
  environment line. This run used the workflow's non-production dummy Clerk value (by design, for
  `workflow_dispatch` events) rather than the real `CLERK_PUBLISHABLE_KEY` secret — AC-F3's
  requirement concerns the build-argument mechanism, not the specific value, and the mechanism is
  evidenced.
- **AC-F6**: for this specific run, the "Log in to DigitalOcean Container Registry", "Push image to
  registry", and "Deploy to production Droplet" steps all show `conclusion: skipped` (confirmed via
  the GitHub Actions API, not merely the UI) — meaning `DOCR_ACCESS_TOKEN`, `DATABASE_URL`,
  `CLERK_SECRET_KEY`, `ANTHROPIC_API_KEY`, the Stripe secrets, `DROPLET_SSH_KEY`, and
  `DROPLET_HOST` were never evaluated or referenced in this run at all. Full log review found no
  masked-secret markers corresponding to any of those secrets — only standard, expected masking of
  GitHub's own automatic `GITHUB_TOKEN` and unrelated numeric runner-metadata substrings. This
  evidences AC-F6 **for the CI-only dry-run path specifically**; the full `push`-triggered
  production path, which does reference all of those secrets, has not been executed or log-reviewed
  and remains separately unevidenced.

**This recording does not**: evidence AC-F4, AC-F5, AC-F7, or AC-F8, all of which remain unchecked
and require either an actual registry push or an actual production deployment to evidence; constitute
or imply Task 10-F acceptance — AC-F4 and AC-F5 remain outstanding, and no whole-task acceptance
decision has been made; satisfy Gate C — Gate C's own remaining prerequisite (explicit human
authorization for production deployment) is entirely separate from and unaffected by this CI-only
evidence; authorize Task 10-F execution against the `push`-to-`main` production path; or authorize
production deployment. **Task 10-F remains NOT ACCEPTED, Gate C remains NOT SATISFIED, and
production deployment remains UNAUTHORIZED.**

**v1.0.21 scoping note on the CI-only dry-run evidence above**: that recording is preserved as
historical evidence of the `workflow_dispatch` path only. Under the Option B architecture recorded
in v1.0.21, production deploys via a `prod-v*` tag push, and that path has not been exercised.
AC-F1 and AC-F2 are therefore unchecked pending evidence from the actual `prod-v*` production path,
as applicable to their exact wording. The references above to the `push`-to-`main` production
trigger describe the trigger as it was specified at the time of that recording and are superseded
by Option B; no AC-F3 or AC-F6 state is changed by this note.

**v1.0.23 cross-reference (human decision DEC-4)**: the statement above that the `prod-v*` path "has
not been exercised" was accurate when written. The path was first exercised on 2026-09-22 by the
failed first production release attempt (run `35750588575`; see "First production release attempt"
below): the push of `prod-v1.0.0` triggered the production workflow, the workflow parsed and began
execution, and the run reached the build and registry-push stages. That is recorded here as factual
evidence only. **AC-F1 and AC-F2 remain unchecked** pending a separate acceptance determination; the
failed attempt is not treated as successful production-path acceptance evidence, and no AC-F3 or AC-F6
state is changed.

**AC-F7 evidence recording (2026-09-19, human-authorized review)**: AC-F7 is recorded as evidenced
based on a read-only review of repository source-control state, not the CI dry-run. `server.js` and
`database.js` remain tracked-and-clean throughout the Task 10-F implementation — neither was
modified to accommodate the workflow. The Task 10-F implementation was confined to the authorized
deployment/CI files (`.github/workflows/deploy.yml`, `Dockerfile`, `.dockerignore`) and required no
application source-code change. The pre-existing modifications to `package.json` and
`package-lock.json` (adding the Stripe dependency) predate the Task 10-F work and are **not** a
Task 10-F workflow accommodation — this recording does not claim those two files are clean, only
that their modification is unrelated to the workflow. **This recording evidences AC-F7 only.** It
does not evidence AC-F4, AC-F5, or AC-F8; does not constitute or imply Task 10-F acceptance; does
not satisfy Gate C; and does not authorize, initiate, or imply authorization for production
deployment. **Task 10-F remains NOT ACCEPTED, Gate C remains NOT SATISFIED, and production
deployment remains UNAUTHORIZED.**

**AC-F7 — D-F5 implementation consequence (recorded 2026-09-22)**: The D-F5 Shape 1 implementation
(Task 10-F, "D-F5 — Stripe client initialization deferral") was completed and published in commit
`aeabcff661eedfc9369940dc44c4edb34e836dbb` (current HEAD and `origin/main`; `server.js` contains
the change, with no working-tree diff). Per the rule already recorded under D-F5's "AC-F7 —
literal treatment," now that this separately authorized `server.js` change has actually occurred,
AC-F7 is recorded as **NOT SATISFIED** under its literal wording ("No application source code was
modified to accommodate the workflow"), because application source code was changed in connection
with making the documented Task 10-F deployment path workable. **This is a governance consequence
of the explicitly authorized D-F5 change, not evidence of unauthorized activity or of any defect in
the D-F5 implementation.** The 2026-09-19 evidence recording above remains accurate as historical
evidence of what was found at that time and is **not** rewritten, deleted, or reinterpreted. This
record does **not**: evidence AC-F4, AC-F5, or AC-F8; constitute or imply Task 10-F acceptance;
satisfy Gate C; or authorize, initiate, or imply authorization for production deployment. **Task
10-F remains NOT ACCEPTED, Gate C remains NOT SATISFIED, and production deployment remains
UNAUTHORIZED.**

**AC-F7 disposition (human decision, v1.0.25)**: AC-F7's literal status **remains NOT SATISFIED**, and
its criterion wording and the 2026-09-19 and 2026-09-22 records above are unchanged. The human has
explicitly authorized recording an exception for purposes of the eventual Task 10-F acceptance,
provided that the final Task 10-F acceptance record clearly states: (1) AC-F7's literal status remains
NOT SATISFIED; (2) D-F5 was explicitly authorized; (3) the D-F5 source-code modification (`server.js`,
commit `aeabcff661eedfc9369940dc44c4edb34e836dbb`, allowing startup without Stripe secrets) is the
reason AC-F7 is not satisfied; (4) this exception is a human decision; (5) the historical 2026-09-19
recording remains unchanged; and (6) no historical record is rewritten to make AC-F7 appear satisfied.
This is not a rewritten criterion. Task 10-F acceptance itself remains separately unauthorized.

**Task 10-F release-prerequisite human decisions D-F1–D-F4 (recorded after the v1.0.21 publication)**:
The human has explicitly made the following four decisions, resolving the three implementation
blockers and the image-name confirmation identified in the Task 10-F pre-implementation review.
"D-F1–D-F4" label these decisions only; they are distinct from this document's Decisions D-1
through D-9. This record is an unnumbered human-decision recording: it neither creates nor uses a
new Authorization Act or RC number, and it does not alter v1.0.21, RC-31, 2026-09-21,
Authorization Act #23, or any historical Act number. **These are recorded decisions, not executed
actions. During the recording of D-F1–D-F4: no file was transferred; nothing was staged; no commit
occurred; no push occurred; no tag was created or pushed; no workflow ran; no production access or
deployment occurred; no DOCR access or image push occurred; no registry access occurred; no
Droplet access occurred; no secret was changed or accessed; and no other operational action was
taken.**

- **D-F1 — Docker artifacts.** The intended Docker release artifacts are the exact `Dockerfile`
  (blob `c9461fc0b74dda4812c8b900e6fb0c683749c336`) and `.dockerignore` (blob
  `e2b09c521b4060f7e2ad2060209fc4c7d7f61330`) from commit
  `eeb40930c60e0f4ee325d3a42c2666b84a5a05d9`. Their later transfer to the `main` working tree using
  `git checkout eeb4093 -- Dockerfile .dockerignore` is authorized as a future operation only; this
  decision does **not** authorize the transfer now. The `phase10-f-ci-dry-run` branch must **not** be
  merged wholesale, because its `deploy.yml` contains the obsolete `push: branches: [main]`
  trigger. The two files must be transferred alone, with no workflow file or other branch content.
  The eventual Docker-artifact commit requires a separate explicit authorization.
- **D-F2 — Stripe dependency.** The required Stripe dependency change is `stripe: ^22.6.1` in
  `package.json`, with the corresponding already-identified `package-lock.json` changes from the
  current working tree (the root dependency entry, the `node_modules/stripe` 22.6.1 entry, and the
  `dev` → `devOptional` marker changes for `@types/node` and `undici-types`). The later staging
  operation `git add -- package.json package-lock.json` is authorized as a future operation only,
  and only if a pre-staging read-only check confirms those two files contain **only** those
  identified changes. This decision does **not** authorize staging or committing now. The Stripe
  dependency changes require a separate explicit commit authorization.
- **D-F3 — Workflow concurrency.** The Task 10-F workflow concurrency configuration is:
  `concurrency:` with `group: deploy-${{ github.event_name }}` and `cancel-in-progress: false`.
  This implements the event-separated concurrency requirement recorded in v1.0.21 between
  production tag-triggered runs and `workflow_dispatch` dry runs. No additional concurrency policy
  (such as tag-specific or SHA-specific grouping) is authorized.
- **D-F4 — DOCR image name.** The resolved Task 10-F image name is
  `registry.digitalocean.com/flavourfind/flavourfind-app`, to be used as the concrete value in the
  later workflow implementation. This decision does **not** authorize DOCR access, image push,
  registry verification, production deployment, or any other operational action.

**Scope of these decisions**: they do **not** authorize transferring the Docker artifacts, staging
or committing the Stripe dependency changes, workflow implementation, any workflow commit or
publication, any `prod-v*` tag creation or push, any retry, any production deployment, AC-F4,
AC-F8 verification, registry evidence/read access, Task 10-F acceptance, or the final Phase 10
checkpoint — each of which remains separately unauthorized. **Task 10-F remains NOT ACCEPTED, Gate C
remains NOT SATISFIED, and production deployment remains UNAUTHORIZED.**

**D-F5 — Stripe client initialization deferral (human decision; recorded 2026-09-22)**: This is a
human decision record only. **It is not implementation authorization**, and a further separate,
explicit implementation authorization is required before any `server.js` edit is made. **It does
not retroactively authorize `server.js` modification under Task 10-F**; D-F5 is a separate human
decision outside Task 10-F's original authorization boundary, and Task 10-F's own "does NOT
authorize: Modifying `server.js`" scope statement (below) is unchanged. D-F5 is the narrow,
explicit exception referenced by §0 and §3 for this one future, separately authorized change only.

The human approves, in principle, a future, separately authorized modification to `server.js`
that defers Stripe client construction so that an absent or empty `STRIPE_SECRET_KEY` does not
terminate application startup at module load.

- **Shape 1 only.** The future implementation is limited to Stripe client initialization in
  `server.js`. It must: preserve the existing `stripe` identifier; preserve all four existing
  Stripe call sites (`stripe.webhooks.constructEvent`, `stripe.customers.create`,
  `stripe.checkout.sessions.create`, `stripe.billingPortal.sessions.create`) unchanged; not modify
  the webhook handler, checkout logic, or billing-portal logic; not modify frontend or database
  code; not modify `package.json` or `package-lock.json`; not change the Stripe SDK version; not
  add environment variables or logging; not redesign error handling; not change any unrelated
  application behavior. **Shape 2 (call-site or route-handler changes) is explicitly excluded.**
- **Accepted webhook nuance**: if `STRIPE_SECRET_KEY` is absent or empty, startup must no longer
  fail merely because Stripe is initialized at module load. If the webhook route is subsequently
  invoked while Stripe remains unconfigured, first access to the deferred Stripe client may still
  throw, because the Stripe SDK constructor requires a key; the existing webhook try/catch may
  therefore return its existing 400 "Webhook signature verification failed" response. **This does
  not mean webhook signature verification works without a Stripe secret key, and does not
  authorize any webhook-handler redesign.**
- **Security / production boundary**: D-F5 does **not** authorize: setting or modifying any
  Stripe secret; placeholder Stripe credentials in production; any change to D-8; any live Stripe
  credential action; a Docker build or run; DOCR access; Droplet access; Caddy changes; production
  deployment; `prod-v*` tag creation or push; a Git commit or push; or an OS reboot.
- **AC-F7 — literal treatment**: the 2026-09-19 AC-F7 evidence recording remains accurate as
  historical evidence of what was found at that time and is not rewritten; its checkbox is **not**
  changed by this pass. Once the separately authorized `server.js` change is actually implemented,
  AC-F7 is to be treated as **NOT SATISFIED** under its literal wording ("No application source
  code was modified to accommodate the workflow"), because application source code will have been
  changed in connection with making the documented deployment path workable. This is recorded as a
  governance consequence of this decision, not as evidence of any unauthorized activity.
- **AC-B5 — unaffected**: AC-B5's existing evidence (Authorization Act #13) remains historically
  valid and is not invalidated by D-F5; AC-B5 concerns modification of application source code to
  make the Dockerfile work, a separate and unrelated matter. No fresh AC-B5 technical test is
  required solely because of D-F5.
- **Fresh-evidence requirements**, once the Shape 1 implementation is actually authorized and
  made: AC-B3 and AC-B4 require fresh evidence; the Gate C Docker smoke-test bullet requires fresh
  evidence, because the historical 2026-09-17 evidence predates this change; AC-GOV-7 requires
  fresh verification against the production image that actually contains the new code. Existing
  AC-F3 dry-run evidence remains valid as historical evidence and is not itself invalidated; the
  first real `prod-v*` run will generate new, separate deployment/build evidence.
- **Task 10-G / D-8 / Task 10-E unaffected**: D-F5 does not modify Task 10-G's existing
  prohibition on changing webhook, checkout, or portal logic; does not authorize Task 10-G; does
  not change D-8; and does not complete Task 10-E or Task 10-F. See Task 10-E, "Task 10-E
  dependency clarification," for the related cross-reference.

**D-F6 — Corrected Docker artifact (human decision DEC-1; recorded in v1.0.23, RC-33, Authorization
Act #25)**: This is the successor decision to D-F1 **for the `Dockerfile` artifact only**. The intended
Docker release `Dockerfile` is the corrected three-stage `Dockerfile`, blob
`ffe54bf1caf9d90a501661e84ea4cb503bf46a34`, at commit `724fe67278df65a0f5d08125c6ed504015a8d299`. It
replaces D-F1's `Dockerfile` reference (blob `c9461fc0b74dda4812c8b900e6fb0c683749c336` from commit
`eeb40930c60e0f4ee325d3a42c2666b84a5a05d9`), whose image could not be pushed to the registry (see
"First production release attempt" below). The `.dockerignore` artifact is **unchanged**: D-F1's
`.dockerignore` reference (blob `e2b09c521b4060f7e2ad2060209fc4c7d7f61330`) remains the intended
artifact. **D-F1's text, including its transfer instructions, is not rewritten**; it remains the
historical record of that decision (its transfer was carried out in `7425b3d`; see below). D-F6 does
**not** authorize any tag creation, movement, or push; any workflow run or re-run; any DOCR, Droplet,
or secret action; any production release or deployment; or Task 10-F acceptance. Whether and how the
corrected artifact is released is a separate human decision (DEC-9, unresolved). *(v1.0.25
cross-reference: DEC-9 has since been resolved — see "Production release record (v1.0.25)" below.
The sentence above is preserved as written at the time.)*

**Implementation references (recorded in v1.0.23; Git facts only)**: the following commits exist on
`main` and were not previously recorded in this document. Each was made under human authorization that
is **not formally identified by Act number or reference in this document** (human decision DEC-5); no
Act number, authorization text, or timestamp beyond the Git record is asserted here.
- `7425b3d05e18887ef60a7119aa9cdf526c828d4f` — `feat(phase10): add production Docker artifacts and
  Stripe dependency` (committer date 2026-09-21T12:15:37−04:00): adds `Dockerfile` (blob
  `c9461fc0b74dda4812c8b900e6fb0c683749c336`, the D-F1 blob), `.dockerignore` (blob
  `e2b09c521b4060f7e2ad2060209fc4c7d7f61330`, the D-F1 blob), and the `package.json` /
  `package-lock.json` Stripe dependency changes (D-F2).
- `a5318abb03bb21f56ecfde824f72be8cbf6699f5` — `ci(phase10): enable prod-v tag deployment workflow`
  (committer date 2026-09-21T14:26:35−04:00): implements the Option B `prod-v*` production trigger in
  `.github/workflows/deploy.yml`, which is unchanged from this commit through `724fe67`.
- `724fe67278df65a0f5d08125c6ed504015a8d299` — `fix(phase10): reduce production Docker image
  dependencies` (2026-09-22T13:18:34−04:00): the corrected three-stage `Dockerfile` (D-F6); see Task
  10-B, "Corrected-Dockerfile record".
- `48d62ac2bd47888e6ea67f726e5fcd1dfd7f8519` — `fix(deploy): pass remote deploy script to bash over
  stdin` (committer date 2026-09-24T03:41:39−04:00; recorded in v1.0.24): modifies only
  `.github/workflows/deploy.yml` (resulting blob `43f0f1a763bca72060c151d128be5e77dd8f201c`); see
  "Deploy-step SSH remote-command defect and correction" below. Committed and pushed to `origin/main`
  under separate explicit human authorizations.

**First production release attempt — `prod-v1.0.0` (2026-09-22) — FAILED at registry push; NOT
deployed (recorded in v1.0.23)**: factual record only. This was **not** a production deployment, and it
is **not** AC-F4 or AC-F5 evidence.
1. **Tag**: `prod-v1.0.0`, a lightweight Git tag pointing to
   `a2d45cccd17aba327f4565e45d98f658887656be` (which contains the original single-stage `Dockerfile`,
   blob `c9461fc0…`, and the `a5318ab` workflow). Its creation and push were human-authorized but are
   **not formally identified by Act number or reference in this document** (DEC-5). A lightweight tag
   records no creation time, and none is asserted here.
2. **Workflow execution**: the tag push triggered run `35750588575` ("Deploy to Production", event
   `push`, ref `prod-v1.0.0`, SHA `a2d45cc…`), created 2026-09-22T15:55:27Z, attempt 1.
3. **Registry login**: "Log in to DigitalOcean Container Registry" succeeded (15:55:32Z–15:55:33Z).
4. **Image build**: "Build Docker image" succeeded (15:55:33Z–15:58:06Z), producing the
   `…/flavourfind-app:<sha>` and `:latest` tags inside the CI runner only.
5. **Registry push failure**: "Push image to registry" ran 15:58:06Z–15:59:40Z and **failed** on the
   immutable SHA-tag push with `denied: quota exceeded` (14 layers were reported as pushed before the
   denial); the `:latest` push was never attempted.
6. **Deployment**: "Deploy to production Droplet" was **skipped**; no SSH to, and no change on, the
   production Droplet occurred; no container was started or replaced.
7. **No retry**: run `35750588575` has not been re-run, and no other production workflow run has
   occurred since.
8. **Post-failure registry observation (human decision DEC-6)**: a **manual DigitalOcean
   control-panel observation** — not API-level verification — made before the 2026-09-23T07:39Z
   live-key verification build, showed registry `flavourfind` (Starter, Free, 500 MiB) at
   **0 Bytes / 500 MiB**, with **no container images** and **0 Bytes** garbage-collectable/unused data.
   This observation served as a pre-release capacity check only; it is **not** AC-F4, AC-F8, or AC-N3
   evidence, and it does not satisfy the separately authorized registry evidence/read access boundary
   for AC-F8.
9. **Remediation**: the image-size cause and the corrected artifact are recorded in Task 10-B,
   "Corrected-Dockerfile record", and in D-F6 above.
10. **Acceptance-criterion effect**: none newly checked. AC-F1 and AC-F2 remain unchecked (see the
    v1.0.23 cross-reference above); AC-F3 is unchanged; AC-F4 remains unchecked (the image was not
    pushed); AC-F5 remains unchecked (no deployment); AC-F6 remains evidenced for the dry-run path only
    — the push-path logs of this run have not been reviewed for AC-F6; AC-F7 remains NOT SATISFIED
    (D-F5); AC-F8, AC-N2, and AC-N3 remain unchecked (no image was stored and no deployment occurred).
11. **Release mechanism for the corrected artifact (DEC-9) — intentionally UNRESOLVED**: the options
    identified (none chosen or authorized) are: (A) re-run `35750588575`, which rebuilds the original
    `a2d45cc` artifact; (B) create a new `prod-v*` tag pointing to the corrected commit; (C) move
    `prod-v1.0.0` to the corrected commit, which rewrites a published tag. (B) and (C) change the
    commit SHA and fall outside the retry boundary above. Each requires its own separate, explicit
    human authorization (for (B)/(C): tag creation/movement, then a tag push that itself starts
    production execution; for (A): the re-run itself). **No production release of `724fe67` is
    authorized by this document.** *(v1.0.24: options (B) and (C) must target `48d62ac` or a later
    commit — see "Release-readiness record (v1.0.24)" below; option (A) would re-run `a2d45cc` with both
    the original `Dockerfile` and the defective Deploy step.)* *(v1.0.25: DEC-9 resolved as option (B)
    — see "Production release record (v1.0.25)" below; this item is preserved as written.)*

**Deploy-step SSH remote-command defect and correction (recorded in v1.0.24, RC-34, Authorization Act
#26)**: factual record only.
1. **Defect (identified 2026-09-24 by a read-only release-decision audit)**: the "Deploy to production
   Droplet" step invoked `ssh … root@"$DROPLET_HOST" VAR="…" … bash -c "$REMOTE_CMD"`. OpenSSH joins
   the remote-command arguments into one string that the remote login shell re-parses, so the quoting
   around `"$REMOTE_CMD"` was lost: the remote executed `bash -c set`, and the rest of the script ran in
   the login shell with every deploy variable empty and without `set -euo pipefail`; values containing
   shell metacharacters (e.g. `&`) could split the command further; and the variable values were
   passed as SSH command-line arguments. The defect was present at `a2d45cc` (so in the failed first
   attempt it was never reached, because the Deploy step was skipped) and at `724fe67` and `253e7df`.
2. **Correction**: the variables are generated locally as shell-quoted `export` statements
   (`printf 'export %q; '`) and sent, followed by the unchanged `REMOTE_CMD` script, to a fixed remote
   `bash -s` over stdin. The 15 secret references, triggers, concurrency, `REGISTRY`, `IMAGE_NAME`,
   image reference, production host, and the full candidate / smoke-test / cutover / rollback sequence
   are unchanged; only the Deploy step's `run:` text changed (8 insertions, 3 deletions, including a
   3-line explanatory comment).
3. **Verification (local, dummy values only)**: a local simulation reproducing OpenSSH argument joining,
   with stub `docker`/`curl` and quoting-hostile dummy values, showed the original invocation delivering
   empty variables and the corrected invocation delivering every value exactly, with the remote command
   reduced to `bash -s` and no value in SSH arguments or step output; candidate-failure,
   final-smoke-failure (rollback), and registry-login-failure paths exited non-zero as designed. An
   independent read-only `repository-reviewer` review reported **READY FOR SEPARATE COMMIT
   AUTHORIZATION** with no blockers. No real secret, GitHub secret, Droplet, DOCR, or production system
   was used.
4. **Publication**: committed as `48d62ac2bd47888e6ea67f726e5fcd1dfd7f8519` and pushed to `origin/main`
   under separate explicit human authorizations; the branch push triggered no workflow run (the
   workflow triggers only on `prod-v*` tag pushes or manual dispatch).
5. **Separate follow-up (non-blocking)**: 13 of the 15 deploy-variable lines and the earlier registry-login step
   interpolate `${{ secrets.X }}` directly into the runner's shell script inside double quotes (unchanged
   from `a2d45cc`; not introduced or worsened by this correction), so a secret value containing `"`,
   `$`, a backtick, or `\` would be interpreted by the runner shell. No acceptance criterion in this
   document makes this a pre-tag requirement; moving these references to the step `env:` block would be
   a separate workflow change requiring its own explicit authorization.

**Release-readiness record (v1.0.24, RC-34, Authorization Act #26)**: factual record; it does not
authorize any release.
1. **Release commit requirement**: a production release that is to use the corrected `Dockerfile`
   (blob `ffe54bf1caf9d90a501661e84ea4cb503bf46a34`, unchanged from `724fe67` through `48d62ac`) and
   the corrected Deploy step must target `48d62ac2bd47888e6ea67f726e5fcd1dfd7f8519` or a later commit
   containing that fix. `724fe67` remains the historical evidence commit for the corrected `Dockerfile`
   (Decision D-F6; Task 10-B), and the Task 10-B and Gate C Docker evidence recorded against it applies
   unchanged to the same `Dockerfile` at `48d62ac`. Between `a2d45cc` and `48d62ac` only `Dockerfile`,
   `.github/workflows/deploy.yml`, and this document changed.
2. **Docker readiness on the production Droplet (human-reported)**: Task 10-A deferred installing Docker
   to later tasks. A human-performed, read-only Droplet checkpoint, reported before this v1.0.24 recording,
   established: `docker.io` `29.1.3-0ubuntu3~24.04.2` installed; the Docker service active and enabled;
   containerd active and enabled; no containers present and no application containers running; Docker
   Compose/Buildx not required by the reviewed workflow; nothing installed, changed, started, stopped,
   pulled, or deployed. This is human-reported evidence: an earlier non-interactive attempt by Claude to
   perform the same check did not connect (`Permission denied (publickey)` with the passphrase-protected
   local key `~/.ssh/flavourfind_api_prod`), and no command ran on the Droplet in that attempt.
3. **`DROPLET_SSH_KEY` — operational risk, not a pre-tag requirement**: this document requires
   `DROPLET_SSH_KEY` to be set (Task 10-E; confirmed present by name in the 2026-09-22 Gate C secrets
   record) and records interactive root access with the local key `~/.ssh/flavourfind_api_prod` (AC-A2).
   It does not record which key the secret contains, whether that key is passphrase-free, or whether it
   is authorized for `root@DROPLET_HOST`, and it imposes no pre-tag requirement to establish those
   properties. The secret has not been accessed or inspected, and no claim is made about its contents.
   Whether the CI/CD SSH connection succeeds is tested by AC-F5 on the first release run; if it does not,
   the run would build and push the image and then fail at SSH before any command reaches the Droplet.
4. **Gate A and the eventual tag target**: Gate A verifies, before each task, that the actual Git HEAD
   matches the value recorded in this document. This document records HEAD at time of writing
   (`48d62ac`); no rule in this document requires a production tag to target the commit that contains
   this document, and a document cannot record the SHA of its own commit. (Precedent: `prod-v1.0.0` was
   created on documentation commit `a2d45cc`, whose recorded HEAD was its parent `a047cf0`.) Either
   `48d62ac` or a later documentation commit containing the fix satisfies item 1; the choice is part of
   DEC-9.
5. **DEC-9 — remaining human decision (UNDECIDED)**: (a) the release mechanism — (A) re-run
   `35750588575` (rebuilds `a2d45cc`; cannot release the corrected artifact), (B) a new `prod-v*` tag
   (name not fixed by this document), or (C) moving `prod-v1.0.0` (rewrites a published tag); (b) the
   tag name; (c) the tag target (`48d62ac` or a later commit containing the fix); and (d) explicit
   production-release authorization for that commit, which the 2026-09-22 Gate C final authorization is
   not read as providing. Tag creation/movement and tag push remain separate authorization boundaries.

*(v1.0.25 cross-reference: the record above is preserved as written. Item 3's operational risk
materialized — the first `prod-v1.0.1` attempt failed at SSH authentication — and was resolved by a
dedicated CI/CD deployment key; item 5's DEC-9 has been resolved. See "Production release record
(v1.0.25)" below.)*

**Production release record (v1.0.25, RC-35, Authorization Act #27)**: factual record only; it does
not authorize any further release, retry, tag action, or deployment.
1. **DEC-9 resolution and tag**: `prod-v1.0.1`, a lightweight Git tag pointing to
   `c2249c90247e88a7679f9828478f692b7727fe4a` (the v1.0.24 documentation commit, which contains the
   corrected `Dockerfile` blob `ffe54bf1…` and the corrected Deploy step from `48d62ac`), was created
   and then pushed under separate explicit human authorizations (option (B)). `prod-v1.0.0` →
   `a2d45cccd17aba327f4565e45d98f658887656be` was not modified, moved, deleted, or re-run. The v1.0.24
   commit `c2249c9` was pushed to `origin/main` under a separate explicit authorization before the tag
   was created.
2. **Run `36003636133`, attempt 1** (2026-09-24, 13:08:29Z–13:11:10Z; event `push`, ref
   `prod-v1.0.1`, SHA `c2249c9…`): checkout, DOCR login, image build, and image push succeeded (digest
   `sha256:3e13aba02971a01ceff96fe54ddfefa0d60727b576d7b74786cb34387f8273c5`, tags `:c2249c9…` and
   `:latest`). The "Deploy to production Droplet" step failed with `root@***: Permission denied
   (publickey).` and exit code 255 — SSH authentication was refused, so no remote command executed: no
   candidate container, smoke test, cutover, final smoke test, or rollback path was reached, and no
   Droplet change occurred. No automatic retry occurred.
3. **Credential correction**: a new dedicated, passphrase-free ED25519 key pair for CI/CD deployment
   only (public-key fingerprint `SHA256:aOLoWMyv/QNCdY6etNfny7bsYKxNO97ZuGKRLprYWgo`) was created locally
   outside the repository under explicit authorization; its public key was added to root's
   `authorized_keys` on the Droplet by the human, preserving existing entries; and the GitHub secret
   `DROPLET_SSH_KEY` was updated with the new private key under explicit authorization (metadata
   timestamp 2026-09-24T13:27:54Z; no other secret changed). The personal key
   `~/.ssh/flavourfind_api_prod` was not modified. No private key or secret value is recorded here.
4. **Run `36003636133`, attempt 2** (2026-09-24, 13:31:50Z–13:35:00Z): an explicitly authorized
   re-run of the same failed run — same tag `prod-v1.0.1` and same commit — within the retry boundary
   above. All steps succeeded: image pushed (digest
   `sha256:e000b840828c6c6e1ade33fcd75eeac5b5f1e1a0365ba85b3816d206d3f06a09`, tags `:c2249c9…` and
   `:latest`); on the Droplet the workflow logged in to DOCR, pulled the SHA-tagged image, started the
   candidate container, reported "Candidate smoke check passed", performed cutover, reported "Final
   smoke check passed", and reported "Deployment complete". No rollback path was triggered. Attempt
   1's image is no longer tagged in DOCR.
5. **Independent human verification on the Droplet** (read-only, human-executed): container
   `flavourfind-app` running image
   `registry.digitalocean.com/flavourfind/flavourfind-app:c2249c90247e88a7679f9828478f692b7727fe4a`,
   status Up / `running=true`, `restart_count=0`; image ID
   `sha256:e000b840828c6c6e1ade33fcd75eeac5b5f1e1a0365ba85b3816d206d3f06a09`, equal to the attempt 2
   digest; ports `127.0.0.1:3000->3000/tcp`; restart policy `unless-stopped`; `GET
   http://127.0.0.1:3000/api/moods` returned HTTP 200; no `flavourfind-app-candidate` container
   remains; `/tmp/flavourfind-previous-image.txt` is exactly 1 byte, a single newline (see Task 10-N,
   "Rollback-evidence status (v1.0.25)").
6. **Public reachability**: `https://flavourfind.com/`, `http://flavourfind.com/`, and
   `https://www.flavourfind.com/` refuse connections from outside (human-reported and independently
   observed). This is expected: the application is bound to localhost and Task 10-D (Caddy/TLS) has
   not been authorized or performed. The first production deployment has therefore occurred, but the
   application is not publicly reachable.
7. **Authorization boundary**: this record does not authorize any further production release, any
   further re-run, any `prod-v*` tag creation/movement/push, any deployment or rollback, Task 10-D, any
   DOCR/Droplet/secret action, or Task 10-F acceptance.

**v1.0.26 note — intended second production deployment (not authorized)**: Per Day 3 decision K12,
the second production deployment is intended to carry the Day 2 SSL change (`9448d2f`) and the Day 3
implementation together and to supply the P4 evidence (§1.5, v1.0.26 note). This note records intent
only; the second production deployment, and any commit, push, tag, or secret action it would
require, is **NOT AUTHORIZED** by this document.

**v1.0.27 note — release-tag boundary and release target (E1, F2)**: The notes above, including
"Production release trigger and tag namespace (Option B — recorded in v1.0.21)", are unchanged.
`prod-v*` is the production release tag; pushing it is the documented production deployment trigger.
By human decision E1, a separately authorized `prod-v*` release tag is permitted for the second
production deployment. Tag creation and tag push remain separate authorization boundaries. The
Phase 10 checkpoint tag (`phase-10-checkpoint-1`, Gate E) is a separate later governance event and
must never trigger production. E1 is a governance decision, not authorization to create or push a
tag. No release tag name is fixed by this document. By human decision F2, the intended release
target is the later documentation-only commit that contains this v1.0.27 document, if it is created,
reviewed, committed, and pushed under separate authorizations; `d1eaa1045fa4df09125e7e19eebb894211515c36`
is therefore not the final intended release target if that commit is created. The target SHA is not
yet known and is not recorded here, because a document cannot record the SHA of its own commit (see
"Gate A and the eventual tag target" above). The future `prod-v*` tag must point to the verified SHA
of that commit.

---

### Task 10-G: Stripe Live Mode Activation

**Type**: Stripe dashboard action — REQUIRES EXPLICIT OPERATIONAL AUTHORIZATION (Decision D-8)
**Depends on**: Decision D-1 (domain confirmed), Task 10-D (TLS active)
**Serialized after**: 10-C, 10-D

⚠ **AUTHORIZATION GATE — REAL-MONEY TRANSACTIONS (D-8)**: Activating Stripe live mode
enables real financial transactions. This must not proceed without explicit written human
authorization.

⚠ **STRIPE GOVERNANCE**: All Stripe references in this document use sandbox/test terminology
until Task 10-G is explicitly authorized and confirmed complete. Live mode and live keys
are distinct from test mode and test keys. Live-mode activation involves real money.
Live Stripe secrets must never be placed in source control or any committed file.

**Specification**:

1. Complete Stripe account verification (required by Stripe before live mode)
2. Activate live mode in the Stripe dashboard
3. Create a production webhook endpoint at `https://<domain>/api/billing/webhook`
   - Subscribe to events: `customer.subscription.created`,
     `customer.subscription.updated`, `customer.subscription.deleted`
   - (Note: `checkout.session.completed` is intentionally NOT in this list. The
     committed webhook handler processes only the three subscription lifecycle events
     above. Stripe creates a subscription upon checkout payment, triggering
     `customer.subscription.created`; no separate checkout-session event handler
     exists or is required.)
   - Obtain the webhook signing secret (`whsec_...`) for `STRIPE_WEBHOOK_SECRET`
4. Create a production Price object for the premium subscription tier
   - Obtain the price ID (`price_...`) for `STRIPE_PREMIUM_PRICE_ID`
5. Obtain the production Stripe secret key (`sk_live_...`) for `STRIPE_SECRET_KEY`
6. Record all three values in GitHub secrets per Task 10-E

**Rollback consideration**: Stripe webhooks delivered to the production endpoint during an
application outage or rollback period will be retried by Stripe automatically. Webhook
idempotency in `database.js` (subscription upsert keyed on `stripe_subscription_id`)
provides tolerance for replayed events. However, checkout sessions that are abandoned
mid-flow during a rollback window may not complete; this must be monitored during any
rollback period.

**Stripe Managed Payments Limitation (carried forward from Phase 8)**: CF-2 remains in effect.

**This task does NOT authorize**:
- Modifying the webhook handler in `server.js`
- Modifying checkout or portal session creation logic
- Changing how subscription statuses map to tiers
- Changing `PREMIUM_ENTITLED_STATUSES` (`trialing`, `active`, `past_due`)

**Acceptance Criteria**:
- [ ] **AC-G1**: Stripe account verification is complete; live mode is active
- [ ] **AC-G2**: Production webhook endpoint is registered with correct event subscriptions
- [ ] **AC-G3**: Webhook signature verification succeeds for a test event from Stripe dashboard
- [ ] **AC-G4**: Production price ID is set in `STRIPE_PREMIUM_PRICE_ID` GitHub secret
- [ ] **AC-G5**: End-to-end checkout flow tested before accepting first real payment

**Status (v1.0.25)**: Task 10-G is **DEFERRED** — D-8 is not authorized within Phase 10 (deferred)
(§4, "Decision status (v1.0.25)"). AC-G1–AC-G5 are not applicable while D-8 remains deferred (§7
lists them "[if D-8 authorized]"); RV-7 (§10-N.4) is likewise not applicable. Stripe live mode is NOT
ACTIVE.

---

### Task 10-H: Neon Production Database

**Type**: Neon dashboard action — REQUIRES EXPLICIT HUMAN AUTHORIZATION
**Depends on**: Nothing (can run in parallel with 10-A, 10-B, 10-C)
**Can run in parallel with**: 10-A, 10-B, 10-C

⚠ **AUTHORIZATION GATE**: Provisioning a Neon production branch and initializing the
schema is production infrastructure access. This requires explicit human authorization.

**Specification**:

1. Create a Neon production project or branch (isolated from any development branch)
2. Obtain the connection string: `postgresql://user:password@host/flavourfind?sslmode=require`
3. Initialize the 10-table schema by running `node database.js` against the production
   database with `DATABASE_URL` set to the production connection string

**Database initialization behavior**: `node database.js` executes `initDatabase()` on
module load. `initDatabase()` creates all 10 tables and 4 indexes using
`CREATE TABLE IF NOT EXISTS` and `CREATE INDEX IF NOT EXISTS` (idempotent DDL). It then
checks `SELECT COUNT(*) FROM recipes` and, if the count is 0, runs `populateDatabase()`
inside a transaction to seed the 8 moods and their recipes. No separate seed command is
required. The process exits after initialization completes. If the process fails, the
transaction is rolled back and it is safe to re-run.

4. Verify schema via Neon console SQL editor or `psql`

**Complete production schema** (10 tables — from §1.5):
`moods`, `recipes`, `ingredients`, `instructions`, `user_saved_recipes`, `mood_history`,
`meal_plan`, `chat_usage`, `users`, `user_subscriptions`

**Tables that must NOT be created**:
- `user_preferences` — does not exist in `database.js`
- `grocery_list` — grocery data is computed dynamically; no table must be created

**Acceptance Criteria**:
- [x] **AC-H1** — **EVIDENCED (2026-09-17 — see "AC-H1–AC-H4 formal recording" below)**: Existing
  Neon project/branch (`flavourfind` / `production`, adopted per human decision 2026-09-17 — see
  "Task 10-H adoption status" below) is confirmed and accessible as the production database — not
  newly provisioned
- [x] **AC-H2** — **EVIDENCED (2026-09-17 — see "AC-H1–AC-H4 formal recording" below)**: All 10 schema tables present (verify via `\dt` in psql or Neon console): `moods`, `recipes`, `ingredients`, `instructions`, `user_saved_recipes`, `mood_history`, `meal_plan`, `chat_usage`, `users`, `user_subscriptions`. The last two were authorized during Phase 8 Task 8-A (`phase8_plan_1_4.md` Appendix B).
- [x] **AC-H3** — **EVIDENCED (2026-09-17 — see "AC-H1–AC-H4 formal recording" below)**: `user_preferences` table is **absent** (governance check)
- [x] **AC-H4** — **EVIDENCED (2026-09-17 — see "AC-H1–AC-H4 formal recording" below)**: `grocery_list` table is **absent** (governance check)
- [x] **AC-H5** — **EVIDENCED (2026-09-17 — see "AC-H5 formal recording" below)**: `DATABASE_URL`
  is stored in GitHub repository secrets (value not in this document)
- [x] **AC-H6** — **EVIDENCED (2026-09-17 — see "AC-H6 formal recording" below)**: Database
  connection from Droplet succeeds (test after Task 10-A is complete)

**Task 10-H Acceptance State (2026-09-17, human decision)**: Under a separate, explicit human
authorization, and following the read-only "Post-AC-H6 acceptance-readiness audit" that confirmed
all six criteria have recorded evidence, Task 10-H is formally accepted. This record documents that
decision:

1. **Result: Task 10-H = ACCEPTED.** All six acceptance criteria — AC-H1, AC-H2, AC-H3, AC-H4,
   AC-H5, and AC-H6 — have recorded evidence (see "AC-H1–AC-H4 formal recording", "AC-H5 formal
   recording", and "AC-H6 formal recording" below, and the "Task 10-H adoption status" note).
2. **Basis**: the readiness audit established that no individual AC-H criterion's evidentiary
   basis needed re-evaluation and that all six already carried recorded evidence at the time this
   decision was made.
3. **Decision**: on that basis, the human explicitly authorized this acceptance decision. No new
   technical evaluation of any AC-H criterion was performed or is claimed by this record; each
   criterion's evidentiary basis, scope, and recording remain exactly as documented in its own
   entry, unchanged.
4. **Governance pattern**: this decision follows the same acceptance-record pattern already
   established for Task 10-A ("10-A Acceptance State") and Task 10-B ("Task 10-B Acceptance
   State — Authorization Act #16") — a distinct, dated declaration made under its own explicit
   human authorization, separate from the individual criteria it rests on.
5. **Scope of this result**: this record establishes **Task 10-H acceptance only**. It does
   **not**: satisfy Gate C by itself; authorize Task 10-F; authorize Docker image building or
   smoke-testing; authorize production deployment; authorize Task 10-E's second pass; authorize
   Task 10-G; authorize Stripe live-mode configuration; or authorize any other Phase 10
   implementation or deployment action. Gate C's remaining prerequisites — a Docker image built
   and smoke-tested locally or in CI, and explicit human authorization for production deployment —
   remain outstanding and unaffected by this acceptance. **Task 10-F, Task 10-E's second pass,
   Task 10-G, and every later Phase 10 task remain separately unauthorized.**
6. Did **not** modify application source code, `Dockerfile`, `.dockerignore`, or
   `.github/workflows/deploy.yml`.
7. Did **not** build or run Docker, perform any SSH or production-server action, access Neon, or
   access, retrieve, print, rotate, or modify any secret.
8. Did **not** access GitHub Actions, modify GitHub repository secrets, or configure Stripe.
9. Did **not** commit, tag, or push. `phase10_plan_3.md` remains untracked. No file other than
   `phase10_plan_3.md` was created or modified by this recording. HEAD is unaffected.
10. Did **not** alter any individual AC-H criterion's substantive wording or evidentiary record,
    nor any prior note; all are preserved unchanged above. This record only adds the whole-task
    acceptance decision that the unchanged, already-established criterion evidence supports.

**AC-H6 formal recording (2026-09-17)**: AC-H6 is formally recorded as evidenced. The human
personally performed the test from their own separate SSH session to the production Droplet
(`flavourfind-api-prod`, `146.190.189.242`, Ubuntu 24.04.4 LTS), using the PostgreSQL client
(`psql` 16.15) installed on the Droplet for this purpose. The test executed was
`psql "$DATABASE_URL" -c "SELECT 1;"`, which established an authenticated PostgreSQL connection to
the adopted Neon production database and returned the expected result (`?column? = 1`). No schema
change, data mutation, migration, or any query beyond the single harmless `SELECT 1` was performed.
`DATABASE_URL` was supplied by the human directly and transiently within their own SSH session and
was **never provided to, read by, or exposed to Claude** — Claude did not connect to Neon, did not
retrieve any GitHub secret value, and does not record any credential value in this document. The
human confirmed the credential was unset from their shell afterward and not persisted to any file.
**This recording does not**: authorize or perform Task 10-F, Gate C, Docker image build/smoke-
testing, production deployment, Task 10-E's second pass, Task 10-G, or Stripe live-mode
configuration — all remain separately unauthorized. **All six of AC-H1 through AC-H6 now have
recorded evidence; this does not, by itself, constitute formal Task 10-H acceptance** — consistent
with this document's established convention (see Task 10-A's "10-A Acceptance State" and Task
10-B's "Task 10-B Acceptance State — Authorization Act #16", each a distinct, separately authorized
declaration made only after all of that task's individual criteria already had recorded evidence).
**At the time of this AC-H6 recording, Task 10-H as a whole remained NOT COMPLETE / NOT ACCEPTED**,
pending a separate, future, explicit human authorization of that acceptance declaration. (Task 10-H
was subsequently formally accepted later on 2026-09-17 — see "Task 10-H Acceptance State" above.)

**AC-H5 formal recording (2026-09-17)**: AC-H5 is formally recorded as evidenced, based solely on
metadata-only confirmation that a GitHub repository secret named `DATABASE_URL` exists (`gh secret
list --repo jamesc-jones/flavour_find-app`, set 2026-09-17T14:00:56Z, during Task 10-E's first-pass
execution). No secret value was read, retrieved, or exposed to produce this recording. **This
recording does not**: complete Task 10-H (at the time of this AC-H5 recording, AC-H6 — a separate
Droplet-to-Neon connectivity test, distinct from mere secret existence — remained unchecked and
unresolved; AC-H6 was subsequently recorded as evidenced later on 2026-09-17 — see "AC-H6 formal
recording" below); satisfy Gate C (§8.1) — Task 10-H's own formal acceptance declaration,
a Docker image built and smoke-tested locally or in CI, and explicit human authorization for
production deployment all remain outstanding Gate C prerequisites, independent of this recording;
imply Task 10-E acceptance — Task 10-E's own AC-E1 requires **all** listed secrets, including the six
Task-10-G-sourced Stripe secrets, which do not yet exist; imply Task 10-E's second pass is complete;
imply Stripe live-mode authorization or that Stripe live secrets exist; imply Gate D satisfaction;
or imply Task 10-F acceptance or execution authorization, both of which remain separately unauthorized.
**At the time of this AC-H5 recording, Task 10-H as a whole remained NOT COMPLETE / NOT ACCEPTED**,
pending a separate future formal acceptance declaration. (Task 10-H was subsequently formally
accepted later on 2026-09-17 — see "Task 10-H Acceptance State" above.)

**AC-H1–AC-H4 formal recording (2026-09-17)**: AC-H1 through AC-H4 are formally recorded as
evidenced, based solely on evidence already documented elsewhere in this section — the "Task 10-H
adoption status" note (project/branch identity and accessibility) and the §8.1 "Gate B
reconciliation for the adopted existing database" note (the queried `neondb`/`public` state, the
10-table listing, and the confirmed absence of `user_preferences` and `grocery_list`). No new
evidence was gathered or invented for this recording; no database was queried, and no Neon action
was performed. **At the time of this recording, AC-H5 and AC-H6 remained unchecked** — AC-H5
because storing `DATABASE_URL` in GitHub secrets was then Task 10-E's separately gated, not-yet-
exercised scope, and AC-H6 because the required Droplet-to-Neon connectivity test had not been
performed. (AC-H5 and AC-H6 were both subsequently recorded as evidenced later on 2026-09-17 — see
"AC-H5 formal recording" and "AC-H6 formal recording" below.) **Recording AC-H1 through AC-H4 does
not constitute full Task 10-H acceptance, does not declare Gate B satisfied, and does not declare
Gate C satisfied** — at the time of this AC-H1–AC-H4 recording, Task 10-H as a whole remained NOT
ACCEPTED, pending a separate future formal acceptance declaration. (Task 10-H was subsequently
formally accepted later on 2026-09-17 — see "Task 10-H Acceptance State" above.)

**Task 10-H adoption status (as of 2026-09-17, human decision)**: The human has explicitly decided
to adopt the existing Neon project `flavourfind` (Project ID `small-credit-02662026`, region AWS US
East 2 (Ohio), PostgreSQL 17) and its existing `production` branch (Branch ID
`br-silent-lab-ayzzwap4`, created 2026-09-06) as the authoritative Phase 10 production database. **No
new Neon project or branch will be created.** This project was originally provisioned under Phase 6
Task T6.A.0 (`phase6_plan.md`) and has been in continuous use through Phase 6–8. **This adoption
decision is a governance decision only and does not itself constitute Task 10-H acceptance** —
AC-H1 through AC-H4, and subsequently AC-H5 and AC-H6, above are now formally evidenced and checked
(see "AC-H1–AC-H4 formal recording", "AC-H5 formal recording", and "AC-H6 formal recording" below).
All six AC-H1–AC-H6 criteria now have recorded evidence, and Task 10-H has since been formally
ACCEPTED under a separate, explicit human authorization — see "Task 10-H Acceptance State" above.
At the time this adoption-status note was originally written, Task 10-H's formal acceptance had not
yet occurred; that acceptance decision is recorded separately and does not alter the adoption
decision described in this note.

This task's original Specification (steps 1–4 above) was written around creating and initializing a
fresh, isolated production database; that original wording is preserved unchanged above as the
task's original design intent, not rewritten. For this adopted-database path, step 1's creation of a
new project/branch does not apply — the human has adopted an already-existing project/branch
instead. Step 3's initialization is likewise not required to establish the schema for this adopted
database: per human-supplied evidence (not independently queried by Claude), the adopted branch
already contains exactly the documented 10-table schema (§1.5), with `user_preferences` and
`grocery_list` both absent. This documentation correction does not claim `node database.js` was run
against this database, and does not authorize running it.

See §8.1 Gate B for the corresponding reconciliation of the pre-initialization snapshot requirement.

---

### Task 10-I: GET /health Endpoint

**Type**: New application route in `server.js` — REQUIRES SEPARATE EXPLICIT HUMAN AUTHORIZATION (Decision D-2)
**Depends on**: Decision D-2

⚠ **AUTHORIZATION GATE (D-2) — NEW APPLICATION FUNCTIONALITY**: `GET /health` does **not**
exist in `server.js`. This is a modification of `server.js`. It is not pre-authorized.

**If D-2 is authorized — specification**:

```javascript
// Health check endpoint — authorized by [decision reference]
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
```

Positioning: before any catch-all route, after `clerkMiddleware()` is applied.
Must NOT require Clerk authentication. Must NOT expose internal state or secrets.

**If D-2 is NOT authorized**:
- Task 10-I is omitted entirely
- Task 10-M monitors `GET /api/moods` instead
- Task 10-N rollback smoke check uses `GET /api/moods` instead
- The absence of `/health` must be documented in the checkpoint attestation

**Acceptance Criteria** (if D-2 authorized):
- [ ] **AC-I1**: `GET /health` returns HTTP 200 with body `{"status":"ok"}`
- [ ] **AC-I2**: Route does not require authentication
- [ ] **AC-I3**: Route does not expose secrets or internal state
- [ ] **AC-I4**: Decision D-2 human authorization is on record before implementation began

**Status (v1.0.25)**: Task 10-I is **APPLICABLE** — D-2 authorized in principle (§4, "Decision status
(v1.0.25)"). Implementation is not authorized by this document and requires its own separate,
explicit authorization; no `/health` route exists yet.

**Status (v1.0.26)**: The v1.0.25 status above is preserved as historical. `GET /health` is
**implemented** (Day 3; uncommitted at the time of writing; NOT deployed). **Non-production evidence
exists** for AC-I1–AC-I3 (Day 3 validation record, §12): HTTP 200 with body `{"status":"ok"}`;
returned without any authentication; returned HTTP 200 while the disposable database was paused
(process-only); the body contains only the status field. **Production acceptance has not been
given**; the AC-I1–AC-I3 checkboxes are unchanged. AC-I4 — documentary fact: D-2 human authorization
was recorded in §4 "Decision status (v1.0.25)" (committed in `ac5238b`) before the Day 3
implementation authorization and the implementation itself; the AC-I4 checkbox is unchanged. A
completed checkbox would not itself authorize any next action.

---

### Task 10-J: Sentry Error Monitoring

**Type**: New dependency + `server.js` code change — REQUIRES EXPLICIT HUMAN AUTHORIZATION (Decision D-3)
**Depends on**: Decision D-3

⚠ **AUTHORIZATION GATE (D-3)**: `@sentry/node` is NOT in root `package.json`. Installing
it requires modifying `package.json` and `server.js`. Both changes require separate explicit
human authorization.

**If D-3 is authorized — specification**:

1. Run `npm install @sentry/node` (modifies root `package.json` and `package-lock.json`)
2. In `server.js`, Sentry must be initialized in the correct order:

   ```javascript
   // Step 1 — already present at line 1; must remain first:
   require('dotenv').config();

   // Step 2 — Sentry initialization immediately after dotenv:
   const Sentry = require('@sentry/node');
   Sentry.init({ dsn: process.env.SENTRY_DSN });

   // Step 3 — all remaining imports and application code follow
   ```

   **Ordering rationale**: `require('dotenv').config()` must remain first so that
   `process.env.SENTRY_DSN` is populated before `Sentry.init()` is called.
   Sentry initialization must occur before all other application code so that it
   can instrument downstream requires and the Express application. The specification
   "before all other imports" means immediately after `dotenv`, not before it.

3. After all route registrations but before any generic error handler, add:
   ```javascript
   Sentry.setupExpressErrorHandler(app);
   ```
4. Add `SENTRY_DSN=` to `.env.example`
5. Set `SENTRY_DSN` in GitHub secrets

**If D-3 is NOT authorized**:
- Task 10-J is omitted; note in checkpoint attestation

**Acceptance Criteria** (if D-3 authorized):
- [ ] **AC-J1**: `@sentry/node` appears in root `package.json`
- [ ] **AC-J2**: `SENTRY_DSN` is set in GitHub secrets
- [ ] **AC-J3**: Sentry initialization appears immediately after `dotenv` in `server.js`
- [ ] **AC-J4**: A deliberate test error is captured and visible in Sentry dashboard

**Status (v1.0.25)**: Task 10-J is **APPLICABLE** — D-3 authorized in principle, with the eventual
implementation authorization to include the narrowly scoped `deploy.yml` wiring for `SENTRY_DSN` (§4,
"Decision status (v1.0.25)"). Implementation, Sentry account/DSN setup, and the `SENTRY_DSN` secret
each require separate authorization. The AC-J4 verification mechanism is left open (C13); no temporary
test route is to be added merely to satisfy AC-J4.

**Status (v1.0.26)**: The v1.0.25 status above is preserved as historical. Sentry is **implemented**
(Day 3, K1–K3; uncommitted at the time of writing; NOT deployed). **Non-production evidence exists**:
startup with an empty and with a dummy (non-routable) DSN; normal requests and `/health` unaffected
with the Express integration active (Day 3 validation record, §12). AC-J1 and AC-J3: implemented,
uncommitted — checkboxes unchanged. **AC-J2: OPEN** — the production `SENTRY_DSN` secret does not
exist. **AC-J4: DEFERRED** (K4, C13) — real Sentry event delivery was not tested. Production
acceptance has not been given. A completed checkbox would not itself authorize any next action.

**Status (v1.0.27)**: The v1.0.26 status above is preserved as historical. The Sentry implementation
is committed in `d1eaa1045fa4df09125e7e19eebb894211515c36` and pushed; it is NOT deployed. Human
decision C1 (set up Sentry, obtain a DSN, and create `SENTRY_DSN` for production) is recorded as a
decision only: Sentry project/DSN setup and `SENTRY_DSN` secret creation are **NOT AUTHORIZED** and
have **NOT** been done; the secret does not exist and Sentry is not active in production. **AC-J2:
OPEN.** **AC-J4: DEFERRED.** Checkboxes unchanged.

---

### Task 10-K: PostHog Analytics

**Type**: New dependency — REQUIRES EXPLICIT HUMAN AUTHORIZATION (Decision D-4)
**Depends on**: Decision D-4

⚠ **AUTHORIZATION GATE (D-4)**: `posthog-js` is NOT in `apps/web/package.json`. Installing
it requires modifying `apps/web/package.json`. Additionally, `NEXT_PUBLIC_POSTHOG_KEY` and
`NEXT_PUBLIC_POSTHOG_HOST` become build-time variables — they must be added to the Docker
build arguments in Task 10-B and Task 10-F if D-4 is authorized after D-6/D-7.

**If D-4 is authorized — specification**:

1. Run `npm install posthog-js --workspace=apps/web`
2. Initialize PostHog with:
   - `NEXT_PUBLIC_POSTHOG_KEY` — PostHog project API key
   - `NEXT_PUBLIC_POSTHOG_HOST` — PostHog host
3. Both are `NEXT_PUBLIC_` variables — they are build-time variables baked into the
   static export. Add them to the Dockerfile `ARG`/`ENV` block and to the `docker build`
   `--build-arg` list in the CI/CD workflow.

**If D-4 is NOT authorized**: Task 10-K is omitted; note in checkpoint attestation.

**D-4 late-authorization governance clarification**: If D-4 is authorized **after** Task 10-B
(Dockerfile) and/or Task 10-F (CI/CD pipeline) have already been completed, that
authorization explicitly authorizes **only** the PostHog-related build-time configuration
changes required by Task 10-K within those previously completed surfaces — specifically:

- Adding `ARG NEXT_PUBLIC_POSTHOG_KEY` / `ENV NEXT_PUBLIC_POSTHOG_KEY=...` and the
  corresponding `NEXT_PUBLIC_POSTHOG_HOST` lines to the Dockerfile (Task 10-B surface)
- Adding the corresponding `--build-arg` entries to the `docker build` step in the
  GitHub Actions workflow (Task 10-F surface)

This **does not** reopen unrelated Dockerfile, CI/CD, infrastructure, or application source
code changes. All other Task 10-B and Task 10-F implementation constraints remain in full
effect. No change to `server.js`, `apps/web/**`, or any other file is authorized by D-4.
**This clarification does not constitute authorization to perform these changes now.**
D-4 must be separately and explicitly authorized before any Task 10-K implementation begins.

**Acceptance Criteria** (if D-4 authorized):
- [ ] **AC-K1**: `posthog-js` appears in `apps/web/package.json`
- [ ] **AC-K2**: PostHog events appear in PostHog dashboard after a test pageview
- [ ] **AC-K3**: No API key is hardcoded; all via `NEXT_PUBLIC_` env vars
- [ ] **AC-K4**: Dockerfile and CI/CD `docker build` step include `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` as build arguments (authorized by D-4 as the narrow PostHog reopening of those surfaces)

**Status (v1.0.25)**: Task 10-K is **OMITTED** — D-4 is not authorized within this Phase 10
completion cycle (§4, "Decision status (v1.0.25)"). The checkpoint attestation is to record that
PostHog was intentionally not implemented. AC-K1–AC-K4 are not applicable.

---

### Task 10-L: CORS Restriction

**Type**: `server.js` code change — REQUIRES EXPLICIT HUMAN AUTHORIZATION (Decision D-5)
**Depends on**: Decision D-5; Decision D-1

⚠ **AUTHORIZATION GATE (D-5)**: `CORS_ORIGIN` does not exist in `.env.example` or
`server.js`. Restricting CORS requires modifying `server.js`. This is blocked until D-5 is
explicitly authorized.

**If D-5 is authorized — specification**:

```javascript
// Before (current):
app.use(cors());

// After (authorized change):
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
```

Where `CORS_ORIGIN` is set in production to `https://<domain>`. Add `CORS_ORIGIN=` to
`.env.example`. Set `CORS_ORIGIN=https://<domain>` in GitHub secrets.

**Capacitor consideration**: Capacitor apps may use origins such as `capacitor://localhost`.
If the mobile app makes API requests from a Capacitor WebView, those origins may need to
be included. Review at implementation time.

**If D-5 is NOT authorized**:
- CORS remains wide-open; note in checkpoint attestation as a security posture item

**Acceptance Criteria** (if D-5 authorized):
- [ ] **AC-L1**: `server.js` consumes `CORS_ORIGIN` env var; documented fallback is `'*'` when `CORS_ORIGIN` is unset
- [ ] **AC-L2**: Preflight requests from `https://<domain>` receive correct CORS headers
- [ ] **AC-L3**: When production `CORS_ORIGIN` is configured to the authorized production origin, preflight requests from unauthorized origins are rejected by the CORS policy. **Note**: AC-L3 is only verifiable when `CORS_ORIGIN` is explicitly set. While the documented `*` fallback (`process.env.CORS_ORIGIN || '*'`) is active, all origins are permitted and this criterion cannot pass. AC-L3 verification requires the production `CORS_ORIGIN` environment variable to be set in the container.
- [x] **AC-L4** — **SATISFIED (human decision A1, v1.0.27 — see "AC-L4 human disposition (v1.0.27)" below)**: Capacitor app origins (if applicable) reviewed and handled before `CORS_ORIGIN` is restricted

**Status (v1.0.25)**: Task 10-L is **APPLICABLE** — D-5 authorized in principle for a single origin,
`https://flavourfind.com` (C12), with the eventual implementation authorization to include the narrowly
scoped `deploy.yml` wiring for `CORS_ORIGIN` (§4, "Decision status (v1.0.25)"). No multi-origin
parsing and no `https://localhost` support are in the Day 2 scope. The C12 decision is recorded as the
human's Capacitor-origin review input for AC-L4 (an Android build calling the production API from
`https://localhost` would require a future CORS decision); AC-L4 remains unchecked pending
implementation and verification. AC-L2 and AC-L3 require public HTTPS (Task 10-D).

*(v1.0.26 note — K7; AC-L3 wording above is unchanged)*: For AC-L3, "rejected by the CORS policy" is
evidenced by the server returning an `Access-Control-Allow-Origin` value that does not match the
unauthorized requesting origin, so that a conforming browser denies the response. Express does not
return an error status for a mismatched origin (Day 3 non-production evidence: HTTP 200 on GET and
HTTP 204 on preflight, each carrying the configured `Access-Control-Allow-Origin` value). AC-L3
remains **unverified** until the production container runs the Day 3 implementation with the
production `CORS_ORIGIN` configured and public HTTPS evidence exists.

**Status (v1.0.26)**: The v1.0.25 status above is preserved as historical. Environment-driven CORS
is **implemented** (Day 3; uncommitted at the time of writing; NOT deployed). AC-L1: implemented,
with non-production evidence (the `*` fallback was observed with `CORS_ORIGIN` unset/empty, and the
configured origin was advertised with `CORS_ORIGIN=https://example.test`) — checkbox unchanged.
**AC-L2 and AC-L3: UNVERIFIED** — they require the production `CORS_ORIGIN` configuration and public
HTTPS evidence. AC-L4: unchanged (C12). Production acceptance has not been given. A completed
checkbox would not itself authorize any next action.

**AC-L4 human disposition (v1.0.27)**: By human decision A1, AC-L4 is **SATISFIED for Phase 10**.
Capacitor origins were reviewed: the known Capacitor origin is `https://localhost`
(`apps/web/capacitor.config.ts`, `androidScheme: 'https'`); no production-pointed Capacitor client
exists (no tracked configuration sets `NEXT_PUBLIC_API_URL` to a production URL, and no Android build
artifact is tracked); Phase 10 does not build or deploy Android; Play Store work is outside Phase 10
(C9). The future Capacitor compatibility case remains conditional (C12: an Android build calling the
production API from `https://localhost` would require a future CORS decision and change). Capacitor
compatibility was **not** implemented by this decision, and `https://localhost` is **not** an allowed
production CORS origin. The disposition was made before `CORS_ORIGIN` is restricted: the
`CORS_ORIGIN` secret does not exist and production still runs `app.use(cors())`. Only the AC-L4
checkbox and label changed; the criterion wording after the colon is unchanged. A completed checkbox
does not itself authorize any next action.

**Status (v1.0.27)**: The v1.0.26 status above is preserved as historical. Environment-driven CORS is
committed in `d1eaa1045fa4df09125e7e19eebb894211515c36` and pushed; it is NOT deployed. Human decision
B1 (create `CORS_ORIGIN` with the intended value `https://flavourfind.com`) is recorded as a decision
only: creation of the secret is **NOT AUTHORIZED** and the secret has **NOT** been created. AC-L1:
checkbox unchanged. **AC-L2 and AC-L3: UNVERIFIED.** AC-L4: SATISFIED (human decision A1, above).

---

### Task 10-M: UptimeRobot Monitoring

**Type**: Third-party dashboard action
**Depends on**: Task 10-D (domain + TLS active); Task 10-I outcome (D-2 decision)
**Serialized after**: 10-D; 10-I outcome must be known

**Note on monitored URL** (per D-2 outcome):
- If D-2 **authorized** and Task 10-I **implemented**: monitor `GET https://<domain>/health`
- If D-2 **not authorized**: monitor `GET https://<domain>/api/moods` (existing unauthenticated route returning HTTP 200)

**Specification**:

1. Create UptimeRobot account (free tier sufficient for basic monitoring)
2. Add HTTP(S) monitor:
   - URL: per D-2 outcome above
   - Check interval: 5 minutes (free tier minimum)
   - Alert when: URL returns non-2xx or times out
3. Configure at least one alert contact (email recommended)

**Acceptance Criteria**:
- [ ] **AC-M1**: UptimeRobot monitor is active and shows "Up" status
- [ ] **AC-M2**: At least one alert contact is configured
- [ ] **AC-M3**: Monitored URL and D-2 outcome documented in checkpoint attestation
- [ ] **AC-M4**: A deliberate brief downtime (e.g., stop container) triggers an alert

---

### Task 10-N: Production Rollback and Recovery

**Type**: Operational procedure definition — must be documented before first production deployment
**Depends on**: Task 10-B (Dockerfile + image tagging strategy), Task 10-A (Droplet)
**Dependency correction (as of 2026-09-17, human decision)**: This line previously also listed Task
10-F (CI/CD pipeline, immutable image tags) as a dependency, which contradicted the Serialized
statement immediately below (and Gate C, §8.1) — all of which require Task 10-N to be documented and
understood *before* Task 10-F's first production deployment, not after. Task 10-N's procedure
(§10-N.2, §10-N.4/RV-9) references Task 10-F's documented immutable-image-tag and runtime-secret-
injection design for procedural context only; it does **not** depend on Task 10-F having executed,
and does not claim Task 10-F has executed, that a production image exists, or that rollback has been
tested. This correction does not alter AC-N1 through AC-N6, which remain unchecked, and does not
constitute Task 10-N acceptance.
**Serialized**: This task must be documented before first production deployment executes.
Task 10-F must not deploy to production until rollback procedures are defined and understood.
**Can be defined in parallel with**: 10-B, 10-C, 10-H

#### 10-N.1 Deployment Failure Criteria

A deployment is considered failed and rollback should be considered if any of the following
occur within an agreed observation window (recommended: 15 minutes) after deploying the
new container:

- The new container fails to start or exits immediately
- `GET https://<domain>/health` returns non-2xx (if D-2 authorized and Task 10-I implemented)
- `GET https://<domain>/api/moods` returns non-2xx (if `/health` not available)
- The frontend (`https://<domain>/`) does not load or returns a non-2xx response
- Clerk authentication fails for a test sign-in attempt
- `POST https://<domain>/api/billing/checkout` returns an unexpected error for an authenticated
  user (not a Stripe test-mode limitation — a genuine 5xx or connection error)
- `POST https://<domain>/api/v1/chat` does not begin streaming within a reasonable timeout
- UptimeRobot reports the monitored endpoint as down

Rollback must be explicitly authorized by a human. The CI/CD workflow must not trigger
automatic rollback without a separately authorized automated safety gate.

#### 10-N.2 Container Rollback Procedure

The container rollback procedure relies on the immutable image tags established in Task 10-F.
The `latest` tag alone is insufficient for rollback — it is overwritten by each deployment.
The Git SHA tag (`<registry>/<image-name>:<git-commit-sha>`) uniquely identifies each
production image and must be retained in the registry.

**Pre-rollback requirement**: Before each deployment, record the currently running image tag.
This can be done on the Droplet with:

```text
docker inspect flavourfind-app --format '{{.Config.Image}}'
```

Store this value (the image tag of the currently running deployment) before starting the
new deployment. It is the rollback target.

**Rollback steps** (planning specification — not executing):

1. A human authorizes the rollback decision
2. On the Droplet, stop the current (failed) container:
   ```text
   docker stop flavourfind-app && docker rm flavourfind-app
   ```
3. Start the previous known-good container using the previously recorded immutable tag.
   The runtime environment must be supplied using **the same secret-injection mechanism
   established in Task 10-F** (e.g., the same `-e` flags or `--env-file` approach). The
   rollback procedure must NOT rely on manually reconstructing secrets from memory, nor
   must any secret value be written to a committed file or shell history.

   **Runtime configuration governance for rollback**:
   - Task 10-F establishes the authoritative mechanism by which required runtime
     environment variables (see §1.6 runtime-only rows) are supplied to the container.
     That same mechanism governs rollback. If Task 10-F uses GitHub Actions to inject
     secrets via SSH command with `${{ secrets.NAME }}` substitution, the rollback
     procedure must use the same path — or an equivalent path that reads from the same
     approved secret store — not a manually typed alternative.
   - Secrets must remain stored in the approved secret-management mechanism (GitHub
     repository secrets) and must never be committed to Git or stored in plaintext on
     the Droplet.
   - Build-time variables (`NEXT_PUBLIC_*`, baked into the static bundle) are already
     embedded in the image layer; they do not need to be supplied at `docker run` time
     during rollback. Runtime-only secrets must be supplied explicitly.
   - Before declaring rollback started, verify that the runtime environment configuration
     (all required runtime secrets listed in §1.6) is available through the Task 10-F
     mechanism and will be correctly injected into the rollback container.

   Conceptual rollback start command (using immutable previous SHA tag):
   ```text
   docker run -d \
     --name flavourfind-app \
     --restart unless-stopped \
     -p 127.0.0.1:3000:3000 \
     [runtime secrets injected via the Task 10-F mechanism — not manually reconstructed] \
     <registry>/<image-name>:<previous-git-sha>
   ```
4. Run the recovery verification steps in §10-N.4 (including RV-9 below)
5. Update UptimeRobot to confirm the rollback target is what is being monitored

#### 10-N.3 Database Rollback Scope

The current Phase 10 database initialization (`node database.js`) uses fully idempotent DDL:
`CREATE TABLE IF NOT EXISTS` and `CREATE INDEX IF NOT EXISTS`. The initial schema
initialization is safe to re-run without effect. The seed data initialization is guarded
by a row-count check and runs only once.

**Current Phase 10 database state is not a reversible migration system.** The following
distinctions apply:

- The current `node database.js` initialization creates tables and seeds data. It does not
  alter or drop existing tables. It is idempotent and does not require a database rollback
  procedure for its own execution.
- Future schema changes (adding columns, altering types, dropping tables) are a different
  concern entirely. They require a dedicated migration system and a separate migration
  rollback strategy. Phase 10 does not implement a migration system and does not authorize
  future schema migrations.
- Phase 10 must not create procedures that DROP or TRUNCATE production tables. No such
  step exists in the current plan and none is authorized.

In the context of a container rollback: because the schema is forward-compatible (the tables
and data are unchanged between application versions in Phase 10), a container rollback to
a prior image does not require a database rollback. The prior application version continues
to use the same schema.

#### 10-N.4 Recovery Verification

After rollback or recovery, verify the following before declaring the rollback complete:

- [ ] **RV-1**: Container is running: `docker ps` shows `flavourfind-app` in Up state
- [ ] **RV-2**: Database connectivity: `GET https://<domain>/api/moods` returns HTTP 200 and a valid moods array (this route queries the database)
- [ ] **RV-3**: Frontend loads: `https://<domain>/` returns HTTP 200 and renders the application
- [ ] **RV-4**: Authentication: a test sign-in via Clerk succeeds (confirm in the browser)
- [ ] **RV-5**: Billing routes respond: `GET https://<domain>/api/billing/status` returns HTTP 200 for an authenticated user
- [ ] **RV-6**: Chat streaming: `POST https://<domain>/api/v1/chat` initiates and streams a response (SSE tokens appear in the browser)
- [ ] **RV-7**: Stripe webhook (if Task 10-G is complete): send a Stripe test event from the Stripe dashboard and confirm it is received and processed without error
- [ ] **RV-8**: UptimeRobot shows monitored endpoint as "Up" following rollback
- [ ] **RV-9**: Runtime configuration verified — confirm that all required runtime secrets (§1.6 runtime-only rows) were injected into the rollback container via the Task 10-F mechanism, not from memory or plaintext files. Verify no secret value appears in shell history, Droplet filesystem, or any committed file.

**Acceptance Criteria**:
- [x] **AC-N1** — **CONFIRMED (human attestation, 2026-09-17 — see "AC-N1 / AC-N6 human
  confirmation record" below)**: Rollback procedure is documented and a human has confirmed they
  understand it before first production deployment
- [ ] **AC-N2**: The currently running image tag is recorded immediately before each deployment
- [ ] **AC-N3**: At least two historical production image tags are retained in the registry (current + previous)
- [ ] **AC-N4**: Rollback was exercised at least once in a non-production context (or human accepts risk of first-time production rollback)
- [ ] **AC-N5**: Recovery verification checklist RV-1 through RV-9 is completed and signed off by a human after any rollback
- [x] **AC-N6** — **CONFIRMED (human attestation, 2026-09-17 — see "AC-N1 / AC-N6 human
  confirmation record" below)**: Task 10-F runtime secret-injection mechanism is documented and
  understood before any rollback is attempted; rollback does not require reconstructing secrets
  from memory

**Task 10-N acceptance-model clarification (proposed — now human-authorized for insertion):** Gate
C's pre-deployment requirement (§8.1) — that rollback procedures be "documented and understood by
the human performing the deployment" — corresponds to AC-N1 and AC-N6 only, both of which are
documentation/understanding criteria with no dependency on a deployment or rollback having occurred.
Gate C's text does not reference, and is not satisfied by, AC-N2, AC-N3, AC-N5, or the
non-production-test branch of AC-N4 — those four remain lifecycle evidence obtainable only after an
actual deployment (AC-N2, AC-N3) or an actual rollback (AC-N5, and AC-N4's test branch, unless its
risk-acceptance alternative is used instead). Passing Gate C's Task-10-N-related requirement is
accordingly a narrower, distinct readiness threshold from full Task 10-N acceptance, which remains
defined as all six AC-N1–AC-N6 criteria. This note does not itself satisfy AC-N1, AC-N6, or any other
criterion; does not claim Gate C has been satisfied; does not claim a deployment or rollback has
occurred; and does not constitute Task 10-N acceptance.

**AC-N1 / AC-N6 human confirmation record (2026-09-17)**:

> I personally confirm that I have read and understood the Task 10-N rollback procedure described
> in `phase10_plan_3.md` §10-N.1 through §10-N.4, including the deployment-failure criteria,
> container rollback procedure, database rollback scope, and RV-1 through RV-9 recovery
> verification requirements.
>
> I also personally confirm that I have read and understood Task 10-F's documented runtime
> secret-injection mechanism and Task 10-N §10-N.2's requirement that rollback reuse that
> mechanism or an equivalent approved path, without reconstructing secrets from memory or storing
> runtime secrets improperly.
>
> — James Jones, 2026-09-17

This confirmation satisfies AC-N1 and AC-N6 individually, and thereby the narrower Task-10-N-
related Gate C threshold described above. It does **not** constitute full Task 10-N acceptance —
AC-N2, AC-N3, AC-N4, and AC-N5 remain unsatisfied and unchecked — and does **not** by itself
satisfy Gate C overall, which has independent prerequisites (Task 10-H completion, Task 10-E
completion, Docker image build/smoke-test evidence, and a separate explicit deployment
authorization) unaddressed by this record.

**Rollback-evidence status (v1.0.25, RC-35, Authorization Act #27)**: AC-N1 and AC-N6 are unchanged.
- **AC-N2 — unchecked.** For the first production deployment (`prod-v1.0.1`), the human-executed
  read-only checks `wc -c` and `od -An -tx1 -c` show `/tmp/flavourfind-previous-image.txt` is exactly
  1 byte, `0a` (a single newline). No application container existed before that deployment, so the
  workflow's `docker inspect flavourfind-app --format "{{.Config.Image}}" > … 2>/dev/null || true`
  wrote only an empty line; no previous image tag was recorded. The workflow's "Previous image tag
  recorded at /tmp/flavourfind-previous-image.txt" log line is printed unconditionally and is **not**
  AC-N2 evidence. Content evidence is expected from a later, separately authorized deployment.
- **AC-N3 — unchecked.** DOCR holds one production SHA tag (`:c2249c9…`); a second deployment from a
  different commit is required.
- **AC-N4 — unchecked.** Human decision (Stage 1): the rollback procedure is to be exercised in a
  disposable, non-production context rather than accepting the risk of an untested first production
  rollback. Executing that exercise requires its own explicit authorization, and registry read access
  or any other required resource requires its own authorization where applicable; it must not affect the production
  release. How RV-1 through RV-9 apply to that exercise is **left open** for a later human decision (C7).
- **AC-N5 — unchecked; conditional.** Human decision (Stage 1), recorded verbatim: "No rollback has
  occurred; therefore RV-1 through RV-9 have not been signed off. These verification steps become
  applicable following any actual rollback." For this purpose, a non-production rollback exercise under
  AC-N4 is to be treated as a rollback event unless this document explicitly distinguishes the exercise
  from an operational rollback. Whether the workflow's automatic restore sequence (which has not
  executed) counts as a rollback event under AC-N5 — and whether it is the "separately authorized
  automated safety gate" referenced in §10-N.1 — is **left open** for the later rollback/governance
  review (C8).
- No rollback has been performed or authorized. Task 10-N is **not** accepted.

---

## §6. Task Dependency Graph

```
Independent / parallel (subject to their decision gates):
  10-A (Droplet) ──────────────────────────────────────────────────────┐
  10-B (Dockerfile + .dockerignore) [D-6, D-9] ───────────────────┐   │
  10-C (DNS) [D-1] ────────────────────────────────────────────┐   │   │
  10-H (Neon prod DB) ─────────────────────────────────────┐   │   │   │
  10-N (Rollback procedure) ───────────────────────────┐   │   │   │   │
  10-I (health endpoint) [D-2] ────────────────────────│───│───│───│───│──► (informs 10-M)
  10-J (Sentry) [D-3] ─────────────────────────────────│───│───│───│───│──► (informs checkpoint)
  10-K (PostHog) [D-4] ────────────────────────────────│───│───│───│───│──► (informs checkpoint)
                                                        │   │   │   │   │
Serialized:                                             ▼   ▼   ▼   ▼   ▼
  10-E (Secrets) ─────────────────── needs 10-H, 10-A, 10-G partial
  10-D (Caddy TLS) ───────────────────── needs 10-A (running) + 10-C (DNS propagated)
  10-G (Stripe live) [D-8] ──────────────── needs 10-D (HTTPS required for webhooks)
  10-F (CI/CD) [D-7, D-9] ─────────────────── needs 10-B + 10-E (first pass) + 10-N (rollback defined)
  10-L (CORS) [D-5, D-1] ──────────────────────── needs D-1 (domain known)
  10-M (UptimeRobot) ──────────────────────────── needs 10-D + 10-I outcome
```

**Tasks that can start immediately** (no task prerequisites, only decision gates):
10-A, 10-B (needs D-6, D-9), 10-C (needs D-1), 10-H, 10-N, 10-I (needs D-2),
10-J (needs D-3), 10-K (needs D-4), 10-L (needs D-5 + D-1)

**Longest critical path**: D-1 → 10-C → 10-D → 10-G → 10-E (complete) → 10-F

**Key constraint**: Task 10-F (first production deployment) must not execute until Task 10-N
(rollback procedures) is defined and understood. 10-N has no implementation steps and can
be documented immediately.

---

## §7. Acceptance Criteria Summary

All applicable AC items must be verified before `phase-10-checkpoint-1` may be tagged.
Optional tasks (10-I, 10-J, 10-K, 10-L) contribute AC items only if their governing
decision is authorized.

### Infrastructure
- [ ] AC-A1 – AC-A4 (Droplet)
- [ ] AC-B1 – AC-B7 (Dockerfile + .dockerignore) [if D-6 authorized]
- [ ] AC-C1 – AC-C3 (DNS)
- [ ] AC-D1 – AC-D7 (Caddy TLS including SSE verification)

### Secrets and CI/CD
- [ ] AC-E1 – AC-E5 (GitHub secrets)
- [ ] AC-F1 – AC-F8 (CI/CD pipeline) [if D-7 authorized]

### Application
- [ ] AC-G1 – AC-G5 (Stripe live mode) [if D-8 authorized]
- [ ] AC-H1 – AC-H6 (Neon production database)
- [ ] AC-I1 – AC-I4 (health endpoint) [if D-2 authorized]
- [ ] AC-J1 – AC-J4 (Sentry) [if D-3 authorized]
- [ ] AC-K1 – AC-K4 (PostHog, including D-4 late-authorization Dockerfile/CI build-arg reopening) [if D-4 authorized]
- [ ] AC-L1 – AC-L4 (CORS restriction) [if D-5 authorized]
- [ ] AC-M1 – AC-M4 (UptimeRobot)
- [ ] AC-N1 – AC-N6 (Rollback and recovery, including runtime secret-injection governance)

### Governance
- [ ] **AC-GOV-1**: No application source code was modified without explicit authorization on record *(D-F5, Task 10-F, is a human decision record only — not the implementation authorization this criterion would require; a further separate, explicit implementation authorization is needed before any `server.js` edit)*
- [ ] **AC-GOV-2**: No `package.json` file was modified without explicit authorization on record
- [ ] **AC-GOV-3**: No real secret, credential, API key, token, password, connection string containing credentials, or private key appears in any committed file. Infrastructure metadata (e.g., a provisioned server's IP address, recorded for custody/provenance as in §11's v1.0.6 correction attestation) is not itself a secret or credential and is not prohibited by this criterion.
- [ ] **AC-GOV-4**: All pending decisions D-1 through D-9 are resolved and outcomes recorded
- [ ] **AC-GOV-5**: Phase 8 carried-forward issues CF-1 and CF-2 are documented in checkpoint attestation as unresolved
- [ ] **AC-GOV-6**: Production Neon database contains no `user_preferences` or `grocery_list` tables
- [x] **AC-GOV-7** — **SATISFIED (2026-09-22 — see Task 10-B, "AC-B6 fresh post-D-F5 verification")** *(substantive credential-definition corrected in v1.0.12/RC-22 — see §11/§12)*: The production Docker image contains a structurally valid `pk_live_` Clerk publishable-key value (per the AC-B6 structural test: prefix immediately followed by an uninterrupted Base64-alphabet run) for `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, and does not contain a structurally valid `pk_test_` credential value. A bare `pk_test_` or `pk_live_` prefix occurrence without an accompanying Base64 credential structure (e.g., a Clerk SDK reference literal) does not by itself violate this criterion. This criterion is evaluated using the same evidence produced for AC-B6, not a separate test — the fresh post-D-F5 AC-B6 verification (Task 10-B) satisfies it. This does not constitute or imply Task 10-B, Task 10-E, or Task 10-F acceptance, and does not satisfy Gate C. *(v1.0.23 cross-reference: AC-GOV-7 **remains SATISFIED** and is additionally evidenced for the corrected production artifact at `724fe67278df65a0f5d08125c6ed504015a8d299` by the same AC-B6 evidence — see Task 10-B, "AC-B6 corrected-Dockerfile verification (2026-09-23)": one credential-structured `pk_live_` value (matched-run length 30) and zero credential-structured `pk_test_` values. The 2026-09-22 post-D-F5 evidence is preserved as historical evidence for the original artifact.)*
- [ ] **AC-GOV-8**: Rollback procedure was reviewed by a human before first deployment

---

## §8. Phase 10 Governance Gates and Checkpoint

### 8.1 Intermediate Governance Gates

These gates must be passed in order. They define the safe checkpoints during implementation.
No gate implicitly authorizes the next gate; each requires a separate human decision.

**Gate A — Pre-implementation baseline verification**

Before any implementation task begins:

- Verify actual Git HEAD matches the expected value recorded in this document
- Verify working tree has no uncommitted changes that could enter the Docker image unexpectedly
- Verify this planning document version (v1.0.27) is the active authoritative specification
- Obtain explicit human authorization for the specific task about to begin

This gate is required before each task, not only the first.

**Gate B — Pre-production-database snapshot**

Before `node database.js` is run against the Neon production database (Task 10-H):

- Obtain explicit human authorization for the database initialization step
- Record the current Neon production database state (confirm it is empty and has no existing tables)
- Confirm `DATABASE_URL` points to the correct production Neon branch (not a development branch)

**Gate B reconciliation for the adopted existing database (as of 2026-09-17, human decision)**: The
above bullets describe Gate B's original path, for a newly-created, empty production database, and
remain unchanged and fully applicable to that path. They do **not** apply as written to the Neon
project `flavourfind` / branch `production` (`br-silent-lab-ayzzwap4`), which the human has
explicitly adopted as the Task 10-H production database (see Task 10-H, "adoption status," §5) — that
database was not empty at adoption and was not confirmed empty; no such confirmation is claimed here.
For this specific adopted-database path only, Gate B's snapshot requirement is instead satisfied by
recording the actual pre-existing state as evidenced by the human: `current_database() = neondb`,
`current_schema() = public`, PostgreSQL `17.11 (c4ba6b8)`, and exactly the 10 documented application
tables present with `user_preferences` and `grocery_list` both absent. This reconciliation applies
only to this specific adopted database, under this specific explicit human adoption decision — it
does not waive Gate B's original empty-database requirement for any other or future database. No
database command was executed to produce this record; the evidence is as supplied by the human.

**Gate C — Pre-deployment authorization**

Before the first container is deployed to the production Droplet (Task 10-F first run):

- Rollback procedures (Task 10-N) must be documented and understood by the human
  performing the deployment
- The Neon production database must be initialized (Task 10-H complete)
- GitHub secrets must be set (Task 10-E at minimum for runtime variables)
- Docker image must be built and smoke-tested locally or in CI
- Explicit human authorization to proceed with production deployment

**Gate C Docker prerequisite — evidenced (2026-09-17, human-authorized non-production test)**: The
"Docker image must be built and smoke-tested locally or in CI" bullet above is now evidenced by an
authorized, disposable, non-production local Docker build and smoke test performed on 2026-09-17:
the current `Dockerfile` successfully built `flavourfind-app:phase10-smoke-test` (using a dummy/test
Clerk publishable key, not a production secret); a disposable PostgreSQL 16 container was started
using the previously established local self-signed-SSL workaround; the application container
started successfully; `GET /api/moods`, `GET /api/recipes/happy`, and `GET /` all returned HTTP 200;
and all disposable resources (the application container, the PostgreSQL container, the Docker
network, and temporary certificate/key files) were cleaned up afterward. No Neon production access
occurred, no production `DATABASE_URL` was used, no GitHub Actions execution occurred, no DOCR push
occurred, no SSH to the production Droplet occurred, no production deployment occurred, and no
production secret values were read, printed, exposed, or tested. **This record evidences only the
single Gate C bullet quoted above.** It does **not**: satisfy Gate C as a whole — the remaining Gate
C prerequisite, "Explicit human authorization to proceed with production deployment," remains
separately outstanding and unaffected by this record; authorize Task 10-F execution; alter Task
10-F's, Task 10-E's, or Task 10-G's acceptance or authorization state (all remain exactly as
separately recorded elsewhere in this document); authorize production deployment; or authorize
Stripe live-mode configuration. **Gate C as a whole remains NOT SATISFIED**, pending its one
remaining outstanding prerequisite.

**D-F5 note (recorded 2026-09-22)**: this 2026-09-17 Docker smoke-test evidence predates Decision
D-F5 (Task 10-F, "D-F5 — Stripe client initialization deferral") and any `server.js` change made
under it. If and once the separately authorized Shape 1 implementation actually occurs, fresh
Docker build/smoke-test evidence will be required before this Gate C bullet may rely on it; the
existing 2026-09-17 evidence remains valid as historical evidence of what was tested at that time
and is not itself invalidated by this note.

**D-F5 fresh Docker/application smoke-test evidence — recorded (2026-09-22)**: The Docker
build/smoke-test evidence anticipated by the note above now exists. A disposable, non-production
local test was performed against the D-F5 implementation as published in commit
`aeabcff661eedfc9369940dc44c4edb34e836dbb` (the current HEAD and `origin/main`, containing the
D-F5 Stripe lazy-initialization change in `server.js`, with no working-tree diff): the application
image was built from that commit; the application container started successfully with
`STRIPE_SECRET_KEY` absent; a disposable, non-production local PostgreSQL instance was used;
`GET /` returned HTTP 200; the billing webhook route's first-access path (with `STRIPE_SECRET_KEY`
still absent) returned its existing HTTP 400 "Webhook signature verification failed" response,
consistent with the accepted webhook nuance recorded under D-F5; no Stripe API or network call
occurred; and all disposable resources (containers, network, certificate/key files) were removed
afterward. No repository file was modified by this test. **This is local, disposable evidence
only** — it is **not** production-image evidence, **not** DOCR/registry evidence, **not** CI
workflow evidence, and **not** production-deployment evidence. On this basis, the Gate C Docker
prerequisite bullet ("Docker image must be built and smoke-tested locally or in CI") may now rely
on this fresh, post-D-F5 evidence in place of the superseded 2026-09-17 evidence referenced above.
This record does **not**: satisfy Gate C as a whole — its remaining prerequisite, "Explicit human
authorization to proceed with production deployment," remains separately outstanding; provide
registry, CI-workflow, or production-deployment evidence for any AC-F criterion (AC-F1, AC-F2,
AC-F4, AC-F5, AC-F8) or for AC-GOV-7, each of which still requires its own separate, later
evidence; alter Task 10-E's or Task 10-G's acceptance or authorization state; or authorize
production deployment. **Gate C as a whole remains NOT SATISFIED**, pending its one remaining
outstanding prerequisite.

**Gate C secrets prerequisite — evidenced (2026-09-22, human-authorized read-only review)**: The
"GitHub secrets must be set (Task 10-E at minimum for runtime variables)" bullet above is evidenced
by a read-only GitHub Actions secret-metadata review (names and update timestamps only — no secret
value accessed): all 10 first-pass secret names defined by Task 10-F's "Task 10-E first pass"
clarification are confirmed present — `DROPLET_HOST`, `DROPLET_SSH_KEY`, `DATABASE_URL`,
`ANTHROPIC_API_KEY`, `CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `AI_CHAT_LIMIT_FREE`,
`AI_CHAT_LIMIT_PREMIUM`, `NODE_ENV`, and `DOCR_ACCESS_TOKEN`. This metadata was confirmed unchanged
across repeated read-only checks. The already-recorded AC-E2 (no secret values in tracked files)
and AC-E4 (`CLERK_PUBLISHABLE_KEY` structurally confirmed `pk_live_`) evidence supports this bullet
but does not by itself establish it — AC-E2 and AC-E4 evidence only their own specific criteria.
**The six second-pass Stripe secrets** (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`,
`STRIPE_PREMIUM_PRICE_ID`, `STRIPE_SUCCESS_URL`, `STRIPE_CANCEL_URL`, `STRIPE_PORTAL_RETURN_URL`)
**remain intentionally deferred** per Task 10-E's two-pass model and are **not** present and **not**
required for this bullet; this record does not imply they exist. This record does **not**: satisfy
Gate C as a whole — its remaining prerequisite, "Explicit human authorization to proceed with
production deployment," remains separately outstanding; constitute or imply Task 10-E acceptance
(AC-E1, AC-E3, and AC-E5 remain unchecked); or authorize production deployment. **Gate C as a
whole remains NOT SATISFIED**, pending its one remaining outstanding prerequisite.

**Gate C final prerequisite — explicit human authorization recorded (2026-09-22)**: The human has
explicitly authorized proceeding with production deployment, satisfying the "Explicit human
authorization to proceed with production deployment" bullet above. Combined with the four other
bullets already separately evidenced (rollback documented/understood; Neon production database
initialized, Task 10-H ACCEPTED; GitHub secrets set, first-pass names confirmed; Docker image
built and smoke-tested, fresh post-D-F5 evidence), **all five Gate C bullets are now satisfied and
Gate C as a whole is SATISFIED as of this recording.** This authorization is explicitly bounded and
does **not** authorize, and must not be read as authorizing: creating, moving, or pushing any
`prod-v*` tag or other tag; running the production deployment workflow or any GitHub Actions
workflow; deploying to, or otherwise changing, the Droplet; changing Caddy; changing Docker/DOCR
state; modifying any GitHub secret or accessing any secret value; modifying application source,
infrastructure files, or this document beyond this recording; any commit or push; any reboot;
Stripe live-mode activation; Task 10-G; Task 10-E's second pass; the second production deployment;
AC-F8; or AC-N2/AC-N3. It does **not** constitute or imply Task 10-E, Task 10-F, or Task 10-G
acceptance/authorization, does **not** constitute Gate D passing, and does **not** mean production
deployment has occurred — no deployment, tag, or workflow action has taken place. Each of the
excluded actions above remains a separate, later, explicitly-required authorization boundary,
starting with the first `prod-v*` tag creation.

**Corrected-Dockerfile Docker evidence (recorded in v1.0.23, RC-33, Authorization Act #25; human
decision DEC-3)**: Following the failed first production release attempt (Task 10-F, "First production
release attempt"), the production `Dockerfile` was corrected (Decision D-F6; commit
`724fe67278df65a0f5d08125c6ed504015a8d299`). Fresh, human-authorized, local, disposable, non-production
Docker evidence now exists for that corrected artifact:
- **Build**: `--no-cache` builds from a `git archive` of exact commit `724fe67` succeeded on 2026-09-22
  (dummy Clerk key) and on 2026-09-23 (real production `pk_live_` publishable key via a temporary key
  file; image 78,757,967 bytes). The corrected image is approximately 78.8 MB (`docker save`
  78,782,464 bytes, measured on the 2026-09-22 pre-commit implementation build of the same `Dockerfile`
content, not on the later `git archive` builds), versus approximately 2.38 GB for local images of the
  original single-stage `Dockerfile`.
- **Smoke test**: with a disposable, SSL-enabled local PostgreSQL 16 and dummy runtime values, the
  application container started with its image `CMD`; `GET /`, `GET /api/moods` (8 moods), and
  `GET /api/recipes/happy` (4 recipes) each returned HTTP 200; the webhook route returned its accepted
  D-F5 400 response; the 13 runtime dependencies loaded; no `MODULE_NOT_FOUND`; all disposable
  resources were removed. No Neon, production `DATABASE_URL`, GitHub Actions, DOCR, Droplet, or
  production secret was used, other than the human-supplied `pk_live_` publishable key for the
  2026-09-23 build.
- **Criteria**: AC-B2, AC-B3, AC-B4, AC-B6, and AC-B7 PASS for the corrected artifact, AC-B1 and AC-B5
  recorded, and AC-GOV-7 additionally evidenced — see the Task 10-B corrected-Dockerfile records.
- **Registry state (manual observation only)**: see Task 10-F, "First production release attempt",
  item 8 — registry `flavourfind` observed via the DigitalOcean control panel at 0 Bytes / 500 MiB, no
  images, 0 Bytes garbage-collectable; not API-level verification.

For the purpose of documenting the corrected artifact, this evidence **supersedes** the 2026-09-17 and
2026-09-22 (D-F5) Docker smoke-test evidence as support for the "Docker image must be built and
smoke-tested locally or in CI" bullet; those earlier records are preserved unchanged as historical
evidence for the original artifact. **Gate C remains SATISFIED** as recorded above (2026-09-22). This
record does **not** state or imply that the 2026-09-22 Gate C final authorization — which names no
commit — authorizes a production release of `724fe67`; no such authorization is inferred from the
absence of a commit SHA. **Whether a production release of the corrected commit is authorized remains
a separate, undecided human decision**, together with the release mechanism (DEC-9; see Task 10-F).
This record is local, disposable evidence only: it is not registry, CI-workflow, or
production-deployment evidence, and it does not evidence AC-F1, AC-F2, AC-F4, AC-F5, AC-F6, AC-F8, or
any AC-N criterion.

**v1.0.24 note (RC-34, Authorization Act #26)**: The corrected-Dockerfile evidence above continues to
support the Docker bullet for any release built from `48d62ac2bd47888e6ea67f726e5fcd1dfd7f8519` or a later
commit that retains the same `Dockerfile` (blob `ffe54bf1caf9d90a501661e84ea4cb503bf46a34`), because
`48d62ac` changed only `.github/workflows/deploy.yml`. Such a release must target `48d62ac` or a later
commit containing the Deploy-step correction (Task 10-F, "Release-readiness record (v1.0.24)"). **Gate C
remains SATISFIED** as recorded above (2026-09-22). This note does not state or imply that the
2026-09-22 Gate C final authorization authorizes a production release of `48d62ac` or any other commit;
that remains a separate, undecided human decision (DEC-9).

**v1.0.25 note (RC-35, Authorization Act #27)**: Gate C remains **SATISFIED** and was relied on for the
first production deployment, `prod-v1.0.1` → `c2249c9` (run `36003636133`, attempt 2), which was made
under separate explicit human authorizations for the tag creation, the tag push, and the re-run (DEC-9
resolved; see Task 10-F, "Production release record (v1.0.25)"). No further production release is
authorized by this note or by Gate C.

**Gate D — Pre-live-Stripe authorization**

Before Stripe live mode is activated (Task 10-G):

- TLS must be active on the production domain (Task 10-D verified)
- The application must be deployed and running (Task 10-F verified)
- Webhook endpoint must be reachable via HTTPS
- Explicit human authorization (Decision D-8) — this is a real-money boundary

**"Task 10-F verified" clarification (as of 2026-09-17, human decision)**: For this Gate D
prerequisite, "Task 10-F verified" refers to the operational deployed-and-running state
described by the preceding bullet — achievable via Task 10-F using Task 10-E's first pass (see
Task 10-F, "Task 10-E dependency clarification"). It does **not** by itself require that every
AC-F1 through AC-F8 criterion already be formally accepted, nor that Task 10-E's second
Stripe-secret pass already be complete. This clarification does not alter AC-F1–AC-F8, Gate D's
other prerequisites, Gate C, or Task 10-G's substantive requirements.

**v1.0.25 note**: the "application must be deployed and running" prerequisite is now met operationally
(Task 10-F, "Production release record (v1.0.25)"). TLS is not active, the webhook endpoint is not
reachable over HTTPS, and D-8 is not authorized within Phase 10 (deferred); Gate D is therefore **not
exercised** while D-8 remains deferred, and is not satisfied.

**Gate E — Final checkpoint**

After all required AC items are verified by a human, and only then:

- Explicit human authorization to create a commit (if any closing documentation commits are needed)
- Separate explicit human authorization to create the `phase-10-checkpoint-1` tag
- Separate explicit human authorization to push

These three authorizations are distinct and must not be combined. Creating a tag without
a push authorization is not a push; pushing without a tag authorization does not create a tag.

### 8.2 Phase 10 Checkpoint Attestation Template

```
PHASE 10 CHECKPOINT ATTESTATION
Document: phase10_plan_3.md v1.0.27
Date: [YYYY-MM-DD]
Attested by: [Name]

Governance gates passed:
[ ] Gate A (pre-implementation baseline) — verified before implementation began
[ ] Gate B (pre-production-database snapshot) — verified before Task 10-H executed
[ ] Gate C (pre-deployment authorization) — verified before first production deployment
[ ] Gate D (pre-live-Stripe authorization) — verified before Task 10-G executed
[ ] Gate E (final checkpoint) — this section

Infrastructure:
[ ] Droplet running at Reserved IP [REDACT IP]
[ ] Neon production database with 10-table schema confirmed; user_preferences and grocery_list absent
[ ] Caddy serving HTTPS at https://<domain> with flush_interval -1 (SSE verified)
[ ] CI/CD pipeline operational; image tagging strategy (Git SHA) confirmed

Application:
[ ] Backend (server.js) running in Docker container on Droplet
[ ] Frontend (Next.js static export) served correctly from /
[ ] NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY confirmed as pk_live_... in production bundle
[ ] Stripe live mode: [ACTIVE / NOT YET ACTIVE — D-8 outcome]
[ ] Webhook verified with Stripe test event
[ ] AI chat SSE streaming verified through Caddy

Optional tasks (record outcome):
[ ] GET /health: [IMPLEMENTED (D-2 authorized) / NOT IMPLEMENTED (D-2 not authorized)]
[ ] Sentry:      [INSTALLED (D-3 authorized) / NOT INSTALLED (D-3 not authorized)]
[ ] PostHog:     [INSTALLED (D-4 authorized) / NOT INSTALLED (D-4 not authorized)]
[ ] CORS:        [RESTRICTED (D-5 authorized) / WIDE-OPEN (D-5 not authorized)]

Registry (D-9 outcome):
[ ] Selected registry: [DOCR / Docker Hub]
[ ] Image naming: <registry>/<image-name>:<git-sha>
[ ] At least 2 historical image tags retained for rollback

Rollback:
[ ] Task 10-N rollback procedure reviewed before first deployment
[ ] Currently running image tag recorded: [image-name:sha]
[ ] Previous known-good image tag retained in registry: [image-name:sha]

Monitored URL (D-2 outcome):
[ ] URL: [https://<domain>/health  OR  https://<domain>/api/moods]
[ ] UptimeRobot shows Up

Carried-forward issues (unresolved):
[ ] CF-1 (Task 8-C rate-limit-text regression): present; not fixed by Phase 10
[ ] CF-2 (Stripe Managed Payments limitation): present; not fixed by Phase 10

PostgreSQL SSL note:
[ ] ssl: { rejectUnauthorized: false } in database.js reviewed; disposition: [ACCEPTED AS-IS / CHANGED BY SEPARATE AUTHORIZATION ref: ...]

Checkpoint:
  Tag: phase-10-checkpoint-1
  Target commit: [actual commit hash at time of tagging — DO NOT FILL IN ADVANCE]
  Authorized to create tag by: [Name]
  Tag authorization date: [YYYY-MM-DD]
  Authorized to push by: [Name]
  Push authorization date: [YYYY-MM-DD]
```

---

## §9. Known Carried-Forward Issues (Phase 10 Scope Exclusions)

### CF-1: Task 8-C Rate-Limit-Text Regression

**Source**: Phase 8, Task 8-C
**Description**: The rate-limit-exceeded response text may contain incorrect messaging.
**Phase 10 action**: NONE
**Future resolution**: Requires separate planning and explicit human authorization.

### CF-2: Stripe Managed Payments Limitation

**Source**: Phase 8 (`phase8_plan_1_4.md` v1.1.8)
**Description**: A constraint regarding Stripe Managed Payments documented in Phase 8.
**Phase 10 action**: NONE. Phase 10 activates Stripe live mode within current constraints.
**Future resolution**: Requires separate planning, Stripe API research, and explicit authorization.

---

## §10. Security Attestation

This document contains:

- No real API keys, secret keys, or tokens
- No real passwords or signing secrets
- Production domain name: `flavourfind.com` (Decision D-1, resolved 2026-09-17, Authorization Act
  #19). A domain name is public information, not a secret or credential, and its presence here does
  not violate this section's guarantee against real API keys, passwords, or other credentials. No
  DNS record, registrar credential, or other secret associated with this domain appears in this
  document.
- No real Stripe keys, price IDs, or webhook secrets
- No real Neon connection strings or database credentials
- No real Clerk keys
- No SSH private keys

**Infrastructure metadata note (added v1.0.7)**: The list above no longer includes "no
real IP addresses" — that statement was inaccurate. §5 Task 10-A's Acceptance Criteria
and the §11 v1.0.6 correction attestation already record human-confirmed infrastructure
metadata for custody and provenance purposes, including the Droplet's Reserved IP
`146.190.189.242` and the original public IPv4 used during initial SSH confirmation. An
IP address is infrastructure metadata, not a secret or credential; documenting it does
not violate this attestation. What this attestation prohibits, without exception and
without weakening, is every item in the list above: real API keys, secret keys, tokens,
passwords, signing secrets, connection strings containing credentials, and private keys.
Production secrets remain exclusively in the approved secret-management/injection
mechanism (GitHub repository secrets, injected at container runtime per Task 10-F) and
must never be placed in this or any other committed file.

**PostgreSQL SSL note** (documented in §1.5 and carried here for checkpoint use):
The production database pool uses `ssl: { rejectUnauthorized: false }`. This disables
Node.js certificate-chain verification. This is a security consideration that must be
acknowledged and reviewed by a human before production go-live. The checkpoint attestation
template in §8.2 includes a disposition field for this item. *(v1.0.25: reviewed by the human —
disposition CHANGE BY SEPARATE AUTHORIZATION, Day 2 to set `ssl: { rejectUnauthorized: true }`,
before public HTTPS go-live; see §1.5, "v1.0.25 note — effective TLS behavior", including the C11
result and the honest timing note.)* *(v1.0.26: `ssl: { rejectUnauthorized: true }` is committed and
pushed in `9448d2f`; the deployed production image still contains `rejectUnauthorized: false`; P4 is
OPEN — see §1.5, "v1.0.26 note — Day 2 SSL change".)*

**CORS note**: Unless D-5 is authorized, CORS remains unrestricted (`app.use(cors())`).
This is a security posture note; it does not block deployment.
*(v1.0.26 note)*: The currently deployed production image (`prod-v1.0.1` → `c2249c9`) contains the
previous `app.use(cors())` implementation, which is unrestricted. Day 3 changed the source
(uncommitted at the time of writing) to `cors({ origin: process.env.CORS_ORIGIN || '*' })`, which
advertises only the configured origin when `CORS_ORIGIN` is set and falls back to `*` when it is
unset or empty. The Day 3 implementation is not yet deployed, so production has not yet acquired the
Day 3 CORS behavior. After any future, separately authorized deployment, production restriction also
requires the production `CORS_ORIGIN` secret, which does not yet exist.

---

## §11. Version History

| Version | File | Date | Change |
|---------|------|------|--------|
| v1.0.0 | `phase10_plan_1.md` | 2026-09-10 | Initial Phase 10 planning document |
| v1.0.1 | `phase10_plan_2.md` | 2026-09-10 | Repository-state governance correction |
| v1.0.2 | `phase10_plan_3.md` | 2026-09-11 | Implementation-readiness audit corrections (this document) |
| v1.0.3 | `phase10_plan_3.md` | 2026-09-11 | Schema provenance reconciliation, CORS AC conditionality, rollback runtime reproducibility, PostHog D-4 reopening scope, cross-document consistency audit |
| v1.0.4 | `phase10_plan_3.md` | 2026-09-11 | Phase 8 task attribution correction (§2.1): Task 8-A/8-B/8-C/8-D scope and webhook event documentation corrected following read-only governance review |
| v1.0.5 | `phase10_plan_3.md` | 2026-09-11 | Task 10-G Stripe Dashboard webhook event subscription list corrected: `checkout.session.completed` removed (not handled by committed implementation); `customer.subscription.created` added (was omitted, is handled) |
| v1.0.6 | `phase10_plan_3.md` | 2026-09-11 | Task 10-A documentation corrected to match the actually-provisioned infrastructure (Ubuntu 24.04 LTS; 1 vCPU / 2 GB RAM) following a final read-only 10-A acceptance review; AC-A1 corrected; Task 10-A recorded as ACCEPTED. Documentation-only; no implementation performed. |
| v1.0.7 | `phase10_plan_3.md` | 2026-09-12 | Governance-language reconciliation: Gate A's stale version reference corrected (v1.0.3 → v1.0.7); §10 Security Attestation and AC-GOV-3 corrected to distinguish infrastructure metadata (e.g., the already-recorded Reserved IP) from secrets/credentials, without weakening the secrets/credentials prohibition. Documentation-only; no implementation performed. |
| v1.0.8 | `phase10_plan_3.md` | 2026-09-12 | Governance-language reconciliation: §8.2 Checkpoint Attestation Template's stale live document-version reference corrected (v1.0.3 → v1.0.8); this reference had not been updated since the v1.0.3 pass and was missed by the v1.0.7/RC-17 pass, which corrected only the structurally identical Gate A reference. Documentation-only; no implementation performed. |
| v1.0.9 | `phase10_plan_3.md` | 2026-09-12 | Governance-language reconciliation: §8.1 Gate A's live authoritative-version reference corrected (v1.0.7 → v1.0.9); this reference had been correctly updated to v1.0.7 by the v1.0.7/RC-17 pass but was not propagated forward when the document advanced to v1.0.8 in the RC-18 pass (RC-18's scope was limited to §8.2). Documentation-only; no implementation performed. |
| v1.0.10 | `phase10_plan_3.md` | 2026-09-13 | Governance reconciliation (RC-20): records a new, present-day human decision adopting the already-existing `Dockerfile` and `.dockerignore` as the current Task 10-B artifacts (Decision D-6, artifact-adoption boundary only). No retroactive authorization of their 2026-09-12 creation is claimed; that provenance remains unresolved. Verification (AC-B2–AC-B7, including AC-B6) remains separately unauthorized. Documentation-only; no implementation, build, or verification performed. |
| v1.0.11 | `phase10_plan_3.md` | 2026-09-14 | Governance reconciliation (RC-21): corrects AC-B6's documented verification method (running-container/browser-devtools → direct inspection of the Docker-built image's static assets), removing the incidental PostgreSQL/running-container dependency. Substantive requirement (`pk_live_...` present, `pk_test_...` absent) unchanged. §4 and Task 10-B's PostgreSQL-gating language clarified to associate PostgreSQL specifically with AC-B3/AC-B4. Documentation-only; no implementation, build, verification, or credential inspection performed; Task 10-B remains NOT ACCEPTED. |
| v1.0.12 | `phase10_plan_3.md` | 2026-09-15 | Governance reconciliation (RC-22): corrects the *substantive* credential definition underlying AC-B6 and AC-GOV-7, replacing the v1.0.11/RC-21 literal-substring test (`pk_live_...` present / `pk_test_...` absent) with a structural test based on Clerk's documented publishable-key format, distinguishing a bare SDK/reference literal from a credential-structured value. Corrects a false-FAIL risk (legitimate SDK `pk_test_` prefix/error text) and a false-PASS risk (SDK `pk_live_` text alone). Adds an explicit INCONCLUSIVE outcome. Retains the RC-21 verification method unchanged. Documentation-only; no implementation, build, verification, or credential inspection performed; historical evidence not reclassified; AC-B6 remains NOT FORMALLY VERIFIED; Task 10-B remains NOT ACCEPTED; v1.0.12 itself is PROPOSED, pending separate baseline approval. |
| v1.0.13 | `phase10_plan_3.md` | 2026-09-16 | Governance recording (RC-23): records an explicit human interpretation decision resolving the AC-B1 "authorized by D-6" ambiguity identified by the read-only Authorization Act #6 investigation, which confirmed the original 2026-09-12 creation of `Dockerfile`/`.dockerignore` has no recoverable authorization record. The human selected the reading under which D-6's documented 2026-09-13 artifact-adoption decision satisfies AC-B1, without retroactively authorizing the original creation. AC-B1 is recorded as PASS. Documentation-only; no implementation, build, verification, or credential inspection performed; AC-B2–AC-B5 and AC-B7 status unchanged; Task 10-B remains NOT ACCEPTED. |
| v1.0.14 | `phase10_plan_3.md` | 2026-09-16 | Governance recording (RC-24): records the results of two separately authorized, evidence-reviewed verification Acts. Authorization Act #8 performed a fresh negative Docker build and static-asset inspection; no credential-structured `pk_live_`/`pk_test_` value was found — AC-B7 recorded as PASS. Authorization Act #9 performed an operator-executed Docker build with the real production Clerk publishable key (never disclosed to Claude); build completed with exit code 0 — AC-B2 recorded as PASS. Both Acts' raw evidence logs were read and reviewed prior to this recording. Documentation-only; no implementation performed; AC-B3, AC-B4, and AC-B5 status unchanged; Task 10-B remains NOT ACCEPTED. |
| v1.0.15 | `phase10_plan_3.md` | 2026-09-16 | Governance recording (RC-25): records the result of Authorization Act #10, a runtime verification that built the application from the unmodified current Dockerfile and started it against a disposable, SSL-enabled, non-production local PostgreSQL instance. An in-container `GET /` returned HTTP 200 and an in-container `POST /api/billing/webhook` returned HTTP 400 with a body specific to the route's own signature-verification code, demonstrating route reachability. AC-B3 and AC-B4 recorded as PASS. AC-B5 was not addressed by Act #10 and remains unverified. Documentation-only; no application/Dockerfile/`.dockerignore` change; all disposable Act #10 infrastructure was removed after evidence capture; Task 10-B remains NOT ACCEPTED. |
| v1.0.16 | `phase10_plan_3.md` | 2026-09-16 | Documentation correction (RC-26, Authorization Act #12), applied following the v1.0.15 post-recording read-only review: corrected a pre-existing drafting error in the §12 Act #7 record ("AC-B5 and AC-B6 remain PASS" → AC-B5 correctly distinguished as unverified); annotated three ancillary Act #10 details (PostgreSQL version, "no suitable prior image" pre-check, `STRIPE_SECRET_KEY` placeholder detail) as session context not independently provable from the retained log, without weakening the log-supported AC-B3/AC-B4 PASS conclusions; reconciled the stale closing footer with the current APPROVED/AUTHORITATIVE header status. No status change to any AC-B criterion, Task 10-B, or Task 10-C+; no runtime verification performed. |
| v1.0.17 | `phase10_plan_3.md` | 2026-09-17 | Governance recording (RC-27): records the result of Authorization Act #13, a read-only Git/repository-inspection evaluation of AC-B5. `server.js`/`database.js` had no uncommitted changes and their most recent commits predate the Dockerfile's creation; the modified `package.json`/`package-lock.json`, `.env.example`, and `apps/web/global-setup.ts` were independently identified as unrelated pre-existing Stripe/test-infrastructure changes; `apps/web/e2e/chat.spec.ts` is `.dockerignore`-excluded. AC-B5 recorded as PASS. All seven AC-B1–AC-B7 criteria now have PASS evidence; this does not constitute Task 10-B acceptance. Documentation-only (Authorization Act #14); no new evaluation, runtime work, or Git write performed; Task 10-B remains NOT ACCEPTED. |
| v1.0.18 | `phase10_plan_3.md` | 2026-09-17 | Governance decision (RC-28, Authorization Act #16): formally accepts Task 10-B, following a read-only acceptance-readiness review (Authorization Act #15) that confirmed Task 10-B's acceptance requirement is exactly AC-B1–AC-B7 (all PASS, existing Act attributions unchanged), that D-9 does not block Task 10-B's own acceptance, and that the whole-Phase-10 §7–§8 governance-gate apparatus is a separate, later checkpoint. Adds a "Task 10-B Acceptance State" record (§5) following the Task 10-A precedent. Documentation-only; no criterion re-evaluated or broadened; no application/Dockerfile/`.dockerignore`/runtime/infrastructure change; no Git write. Task 10-C and all later Phase 10 tasks remain NOT AUTHORIZED. |
| v1.0.19 | `phase10_plan_3.md` | 2026-09-17 | Governance recording (RC-29, Authorization Act #19): documents the human's explicit resolution of Decision D-1 (production domain = `flavourfind.com`), following a read-only Task 10-C readiness review (Authorization Act #18) that identified D-1 as the material blocker. Updates §3, §4, Task 10-C's specification, and §10 Security Attestation to reflect the resolved decision, preserving prior "D-1 is pending" wording as historical record via an added current-status note. Documentation-only; no DNS record created or verified; no application/Dockerfile/`.dockerignore`/infrastructure change; no Git write. Task 10-C and all later Phase 10 tasks remain NOT AUTHORIZED. |
| v1.0.20 | `phase10_plan_3.md` | 2026-09-17 | Governance recording (RC-30, Authorization Act #22): documents the completed Task 10-C DNS implementation (performed manually by the human operator via Namecheap — `@`/`www` A records set to `146.190.189.242`, replacing the prior parking CNAME/URL redirect), read-only technical verification (AC-C1, AC-C2, AC-C3 all PASS, confirmed via local resolution and two independent public DNS-over-HTTPS resolvers), and formal acceptance of Task 10-C (Authorization Act #22), following Authorization Act #20 (implementation-readiness review) and Authorization Act #21 (implementation authorization and verification), neither of which modified this document. Documentation-only; no DNS record created, modified, or verified by Claude as part of this recording; no application/Dockerfile/`.dockerignore`/infrastructure change; no Git write. Task 10-D and all later Phase 10 tasks remain NOT AUTHORIZED. |
| v1.0.21 | `phase10_plan_3.md` | 2026-09-21 | Documentation correction (RC-31, Authorization Act #23 — human-selected number): records the Task 10-F Option B architecture (`prod-v*` version-tag-triggered production deployment; `workflow_dispatch` retained as non-production dry run; checkpoint tags never trigger production; event-separated concurrency with `cancel-in-progress: false`; no GitHub Environment), the AC-F8 first/second-deployment consequence, the bounded retry rule, and the AC-F1/AC-F2 revert to unchecked (2026-09-17 `workflow_dispatch` evidence preserved as historical); applies the named corrections (stale D-7 gate text; live version references in §8.1 Gate A and §8.2 advanced to v1.0.21; "immutable image tag (Git commit SHA)" terminology in Task 10-F); removes the "(proposed)" label from the AC-F4/AC-F8 clarification. Documentation-only; `deploy.yml`, `CLAUDE.md`, and all application/infrastructure files unchanged; no Git write, workflow run, or production action. Workflow implementation, production tag creation/push, production deployment, and Task 10-F acceptance remain NOT AUTHORIZED. |
| v1.0.22 | `phase10_plan_3.md` | 2026-09-22 | Documentation correction (RC-32, Authorization Act #24): records Decision D-F5 (Task 10-F), a human decision approving, in principle, a future, separately authorized Shape-1-only `server.js` Stripe-client-initialization deferral (preserving the existing `stripe` identifier and all four existing call sites; excluding webhook/checkout/billing-portal/frontend/database/package-file/SDK-version/logging/error-handling changes), the accepted webhook nuance, and an explicit non-authorization list (no secret, Docker, DOCR, Droplet, Caddy, production, tag, commit, push, or reboot action). Reconciles §0, §3, AC-B5, AC-F7, AC-GOV-1, AC-GOV-7, Gate C, and the Task 10-E first-pass/second-pass clarification with narrow clarifications/cross-references only; does not rewrite any existing rule, criterion wording, or historical evidence record; does not alter Task 10-F's "does NOT authorize: Modifying `server.js`" scope statement. AC-F7's checkbox is unchanged; a note records its future NOT SATISFIED treatment once the Shape 1 implementation actually occurs. Documentation-only; `server.js`, `deploy.yml`, `package.json`, `package-lock.json`, `CLAUDE.md`, and all other application/infrastructure files unchanged; no Git write, workflow run, or production action. `server.js` implementation, any secret action, production tag creation/push, production deployment, and Task 10-E/Task 10-F acceptance remain NOT AUTHORIZED. |
| v1.0.23 | `phase10_plan_3.md` | 2026-09-23 | Documentation recording (RC-33, Authorization Act #25): records Decision D-F6 (corrected three-stage `Dockerfile`, blob `ffe54bf1…` at `724fe67`, replacing D-F1's `Dockerfile` reference only; `.dockerignore` unchanged; D-F1 text preserved); corrected-Dockerfile evidence for AC-B1–AC-B7 (Task 10-B remains ACCEPTED, not reopened or re-accepted; original Act-numbered PASS records preserved) and AC-GOV-7 (remains SATISFIED); corrected-Dockerfile Docker evidence for the Gate C Docker bullet (Gate C remains SATISFIED; release authorization for `724fe67` not inferred); the failed first production release attempt (`prod-v1.0.0` → `a2d45cc`, run `35750588575`: build succeeded, DOCR push denied `quota exceeded`, deploy skipped, no Droplet change, no retry) and a manual control-panel registry observation; previously unrecorded implementation commits `7425b3d` and `a5318ab`; a retry-boundary cross-reference; and current-status corrections (header, §1, Task 10-F D-7 gate note, Gate A, footer). AC-F1/AC-F2 remain unchecked; no criterion newly checked. DEC-9 (release mechanism) intentionally unresolved. Documentation-only; no application/infrastructure file changed; no Git write, tag action, workflow run, DOCR/Droplet/secret access, or production action. Production release, retry, tag creation/movement/push, and deployment remain NOT AUTHORIZED. |
| v1.0.24 | `phase10_plan_3.md` | 2026-09-24 | Documentation recording (RC-34, Authorization Act #26): reconciles the document to the release state at `48d62ac`. Records the Deploy-step SSH remote-command defect and its correction in `48d62ac` (implementation reference, factual record, local dummy-value verification, `repository-reviewer` READY, push with no workflow run); the release-commit requirement (`48d62ac` or later; `724fe67` remains the historical `Dockerfile` evidence commit); the human-reported read-only Droplet Docker-readiness checkpoint; the `DROPLET_SSH_KEY` non-interactive-use uncertainty as an AC-F5-tested operational risk (no claim about the secret's contents); the `${{ secrets.X }}` inline-interpolation concern as a separate non-blocking follow-up; the Gate A / tag-target analysis; and the remaining DEC-9 decision. Updates header, Task 10-F cross-references, Gate A, Gate C (note), and footer. No acceptance status changes; no criterion newly checked; DEC-9 undecided. Documentation-only; no application/infrastructure file changed; no Git write, tag action, workflow run, DOCR/Droplet/secret access, or production action. Production release, retry, tag creation/movement/push, and deployment remain NOT AUTHORIZED. |
| v1.0.25 | `phase10_plan_3.md` | 2026-09-24 | Documentation recording (RC-35, Authorization Act #27): records the first production deployment (`prod-v1.0.1` → `c2249c9`; run `36003636133` attempt 1 failed at SSH authentication with no remote command executed, digest `3e13aba0…`; dedicated CI/CD key and `DROPLET_SSH_KEY` update; attempt 2 succeeded, digest `sha256:e000b840…06a09`; human Droplet verification; not publicly reachable) and DEC-9's resolution (option B); the human AC-F6 production-path determination (SATISFIED); Stage 1 decisions (D-2, D-3, D-5 authorized in principle only, with `deploy.yml` wiring scope for D-3/D-5; D-4 not authorized — Task 10-K omitted; D-8 not authorized within Phase 10 (deferred) — Task 10-G deferred; AC-F7 exception disposition with literal NOT SATISFIED preserved; AC-N4 non-production exercise; AC-N5 conditional; PostgreSQL SSL change by separate authorization; AC-E5 attestation) and decisions C1–C15 (AC-F1, AC-F2, AC-F4, AC-E5 checked; AC-F5 left unchecked; AC-E1/AC-E3 open; C7, C8, C13 left open; Play Store outside Phase 10; C10 `rejectUnauthorized: true`; C11 log-check result 1; single-origin CORS; pre-go-live Clerk check); the §1.5 effective-TLS nuance (unverified); rollback-evidence status; status notes for Tasks 10-A, 10-B, 10-D, 10-E, 10-G, 10-I, 10-J, 10-K, 10-L, 10-N and Gates A, C, D; §3 Play Store scope line; §10 SSL cross-reference; §8.2 stale version reference (v1.0.22 → v1.0.25). No acceptance-criterion wording changed; no task newly accepted. Documentation-only; no application/infrastructure file changed; no Git write, tag action, workflow run, DOCR/secret access, or production action. Implementation of D-2/D-3/D-5 and the SSL change, any further production release, Task 10-D, and all task acceptances remain NOT AUTHORIZED. |
| v1.0.26 | `phase10_plan_3.md` | 2026-09-25 | Documentation recording (RC-__, Authorization Act #__ — numbers to be assigned by the human): Day 2 PostgreSQL SSL change (committed and pushed in `9448d2f`, containing only `database.js`; not deployed; P4 OPEN); Day 3 implementation of D-2/D-3/D-5 with `deploy.yml` wiring and two `.env.example` lines (uncommitted at the time of writing; no Day 3 commit hash exists; not deployed); Day 3 decisions K1–K5, K7–K14 (no K6 issued); Day 3 non-production validation record (Playwright E2E NOT RUN; AC-J4 DEFERRED; AC-J2 OPEN; AC-L2/AC-L3 UNVERIFIED); AC-L3 interpretation note (K7; criterion wording unchanged); existing §1.6 discrepancy recorded, not corrected; out-of-scope validation-session governance deviation (`docker builder prune -f --filter until=2h`). No acceptance-criterion wording or checkbox changed; no task newly accepted. Documentation-only. |
| v1.0.27 | `phase10_plan_3.md` | 2026-09-25 | Documentation recording (RC-__, Authorization Act #__ — numbers to be assigned by the human): human Day 4 governance decisions A1 (AC-L4 satisfied for Phase 10), B1 (create `CORS_ORIGIN` = `https://flavourfind.com` — decision only), C1 (set up Sentry and create `SENTRY_DSN` — decision only), D1 (retrospective repository-reviewer reviews), E1 (separately authorized `prod-v*` release tag permitted for the second production deployment; checkpoint tag separate), F2 (intended release target: the later documentation-only commit containing this document; SHA not yet known); retrospective repository-reviewer evidence for `9448d2f` and `d1eaa10` (original pre-checkpoint requirement not met; retrospective CHECKPOINT READY for content/scope; not retroactive); `d1eaa10` committed and pushed. AC-L4 checkbox changed by human decision A1 (the only checkbox change); no acceptance-criterion wording changed; no task newly accepted. Documentation-only. |

### Corrections Applied in v1.0.27

The following documentation recording was applied in the 2026-09-25 v1.0.27 pass under explicit
human documentation-edit authorization (Authorization Act #__, number to be assigned by the human).
*Items P1–P12 below identify the documentation edits made in this pass. They are not independent
acceptance decisions. The only acceptance-criterion checkbox change is AC-L4, made by recorded human
decision A1.*

1. **P1 — header**: version updated to v1.0.27.
2. **P2 — header status line**: "v1.0.27 … superseding v1.0.11 through v1.0.26"; the v1.0.26
   "Current status" clause relabelled "v1.0.26 status summary (… historical; its 'UNCOMMITTED at the
   time of writing' and 'no Day 3 commit hash exists' statements are superseded by v1.0.27)" with its
   wording otherwise unchanged; a v1.0.27 "Current status" clause added.
3. **P3 — header "This version"**: new v1.0.27 description; the v1.0.26 "This version" description
   retained verbatim under a "Previous version (v1.0.26)" label.
4. **P4 — header "Current HEAD at time of writing"**: `d1eaa10…` (Day 3 implementation commit, pushed;
   parent `9448d2f…`).
5. **P5 — §4**: "Decision status (v1.0.27)" added (A1, B1, C1, D1, E1, F2).
6. **P6 — Task 10-F**: "v1.0.27 note — release-tag boundary and release target (E1, F2)" added.
7. **P7 — Task 10-J**: "Status (v1.0.27)" added (C1 decision only; AC-J2 OPEN; AC-J4 DEFERRED;
   checkboxes unchanged).
8. **P8 — Task 10-L**: AC-L4 checkbox and label changed by human decision A1 (criterion wording after
   the colon unchanged); "AC-L4 human disposition (v1.0.27)" and "Status (v1.0.27)" added (B1 decision
   only; AC-L2/AC-L3 UNVERIFIED).
9. **P9 — §8.1, §8.2**: Gate A and template version references updated to v1.0.27.
10. **P10 — §11**: this v1.0.27 table row and corrections list added.
11. **P11 — §12**: "Retrospective Repository-Reviewer Evidence (v1.0.27)" and "v1.0.27 Documentation
    Record — Authorization Act #__" added.
12. **P12 — footer**: current-status text updated to v1.0.27; the v1.0.26 footer-history clause is
    retained with its wording unchanged except for the one-word adjustment needed for the v1.0.27
    clause to follow.
13. **Not changed**: the wording of any acceptance criterion; every acceptance-criterion checkbox other
    than AC-L4 (including AC-I1–AC-I4, AC-J1–AC-J4, AC-L1–AC-L3, AC-F5, AC-F7, AC-F8, AC-N2–AC-N5,
    AC-E1, AC-E3, and all AC-GOV items); Gates A–E status; §1.5 (whose existing description of `pg`
    connection-string precedence is correct and unchanged); §1.6; every prior RC, Act, custody,
    acceptance, execution, and v1.0.26 record. No other file was modified by this documentation pass.

### Corrections Applied in v1.0.26

The following documentation recording was applied in the 2026-09-25 v1.0.26 pass under explicit
human documentation-edit authorization (Authorization Act #__, number to be assigned by the human).
*Items E1–E20 below identify the documentation and evidence edits made in this pass. They are not
independent acceptance decisions. Acceptance-criterion checkbox changes, if any, are listed
separately and only as recorded human decisions; this pass made none.*

1. **E1 — header**: version, status line ("v1.0.26 … superseding v1.0.11 through v1.0.25"), "This
   version", and "Current HEAD at time of writing" (`9448d2f…`, the Day 2 commit containing only
   `database.js`; Day 3 uncommitted; no Day 3 commit hash exists) updated; the v1.0.25 "Current
   status" clause relabelled "v1.0.25 status summary (… historical; superseded by v1.0.26)" with its
   wording otherwise unchanged; a v1.0.26 "Current status" clause added; the v1.0.25 "This version"
   description retained verbatim under a "Previous version (v1.0.25)" label.
2. **E2 — §1.5**: "v1.0.26 note — Day 2 SSL change" added (implementation sourced to the commit;
   validation sourced to the Day 2 session evidence; not deployed; P4 defined and OPEN).
3. **E3 — Task 10-D**: "v1.0.26 note — prerequisite 1 status" added (prerequisite 1 remains UNMET).
4. **E4 — §10 PostgreSQL SSL note**: v1.0.26 cross-reference added.
5. **E5 — §10 CORS note**: v1.0.26 note added (deployed image still unrestricted; Day 3 CORS not yet
   deployed).
6. **E6 — §1.6**: v1.0.26 notes added (Day 3 environment variables; existing discrepancy recorded, not
   corrected).
7. **E7 — §1.7**: v1.0.26 note added below the route table (baseline row preserved).
8. **E8 — §1.8**: v1.0.26 note added (Day 3 source order; baseline block preserved).
9. **E9 — §1.10**: v1.0.26 note added (`@sentry/node` `11.0.0`; dependency-tree observation).
10. **E10 — §3**: v1.0.26 authorization-trail note added after "What Phase 10 Is NOT" (list unchanged).
11. **E11 — §4**: "Decision status (v1.0.26)" added.
12. **E12 — Task 10-I**: "Status (v1.0.26)" added (checkboxes unchanged).
13. **E13 — Task 10-J**: "Status (v1.0.26)" added (AC-J2 OPEN; AC-J4 DEFERRED; checkboxes unchanged).
14. **E14 — Task 10-L**: v1.0.26 K7 note on AC-L3 and "Status (v1.0.26)" added (AC-L2/AC-L3
    UNVERIFIED; criterion wording and checkboxes unchanged).
15. **E15 — Task 10-F**: "v1.0.26 note — intended second production deployment (not authorized)" added.
16. **E16 — §8.1, §8.2**: Gate A and template version references updated to v1.0.26.
17. **E17 — §11**: this v1.0.26 table row and corrections list added.
18. **E18 — §12**: "v1.0.26 Documentation Record — Authorization Act #__" added.
19. **E19 — footer**: current-status text updated to v1.0.26; the v1.0.25 footer-history clause is
    retained with its wording unchanged except for the one-word adjustment needed for the v1.0.26
    clause to follow.
20. **E20 — §12**: "Day 3 Non-Production Validation Record (v1.0.26)" added.
21. **Not changed**: the wording of any acceptance criterion; every acceptance-criterion checkbox
    (including AC-I1–AC-I4, AC-J1–AC-J4, AC-L1–AC-L4, AC-GOV-1, AC-GOV-2); every prior RC, Act,
    custody, acceptance, and execution record; the §1.6 table text; and no file other than this
    document (`database.js`, `Dockerfile`, and `.dockerignore` unchanged).

### Corrections Applied in v1.0.25

The following documentation recording was applied in the 2026-09-24 v1.0.25 pass (RC-35), under
explicit human authorization (Authorization Act #27), incorporating the human AC-F6 determination, the
Stage 1 human decisions, and human decisions C1–C15.

1. **RC-35 — header**: version, status line ("v1.0.25 … superseding v1.0.11 through v1.0.24"), "This
   version", and "Current HEAD at time of writing" (`c2249c9…`) updated; the v1.0.24 "Current status"
   clause was relabelled "v1.0.24 status summary (… historical; …superseded by v1.0.25)" with its wording
   otherwise unchanged; a v1.0.25 "Current status" clause was added; the v1.0.24 "This version"
   description is retained verbatim under a "Previous version (v1.0.24)" label.
2. **RC-35 — §1.5**: "v1.0.25 note — effective TLS behavior (nuance; not independently verified)" added,
   including the C11 result (1), its limited meaning, the SSL disposition (C10), and the timing note.
3. **RC-35 — §3**: a Play Store scope line added to "What Phase 10 Is NOT" (C9).
4. **RC-35 — §4**: "Decision status (v1.0.25)" added (D-2, D-3, D-4, D-5, D-8, DEC-9).
5. **RC-35 — Task 10-A, Task 10-B, Task 10-D**: reference/cross-reference notes added; Task 10-D
   pre-go-live prerequisites (SSL first; Clerk check, C15) added. Task 10-D remains NOT AUTHORIZED.
6. **RC-35 — Task 10-E**: AC-E5 checked (C5) with an attestation record (no values); AC-E1/AC-E3 status
   note (C6). Task 10-E remains NOT ACCEPTED.
7. **RC-35 — Task 10-F**: AC-F1, AC-F2, AC-F4 checked with new labels (C1–C3; criterion wording after
   each colon unchanged); AC-F6 label extended (production path SATISFIED — human determination);
   checklist notes (AC-F5 unchecked, C4; AC-F7; AC-F8); "AC-F6 production-path human determination
   (v1.0.25)"; "AC-F7 disposition (human decision, v1.0.25)"; cross-references on D-F6, "First
   production release attempt" item 11, and "Release-readiness record (v1.0.24)"; and "Production release
   record (v1.0.25)". Task 10-F remains NOT ACCEPTED.
8. **RC-35 — Tasks 10-G, 10-I, 10-J, 10-K, 10-L**: status notes (deferred; applicable; applicable;
   omitted; applicable, single origin).
9. **RC-35 — Task 10-N**: "Rollback-evidence status (v1.0.25)" added (AC-N2 first-deployment record is a
   single newline; AC-N3; AC-N4 route with C7 open; AC-N5 conditional wording with C8 open).
10. **RC-35 — §8.1**: Gate A version reference updated to v1.0.25; v1.0.25 notes added to Gate C and
    Gate D.
11. **RC-35 — §8.2**: the template's stale live version reference "v1.0.22" (not updated by the v1.0.23
    or v1.0.24 passes) corrected to v1.0.25.
12. **RC-35 — §10**: a cross-reference added to the PostgreSQL SSL note.
13. **RC-35 — footer**: current-status text updated to v1.0.25; the v1.0.24 footer-history clause is
    retained with its wording unchanged except that "and is updated here to v1.0.24" now reads "updated
    to v1.0.24" so that the v1.0.25 clause can follow.
14. **Not changed**: the wording of any acceptance criterion; AC-F5, AC-F7 (literally NOT SATISFIED),
    AC-F8, AC-E1, AC-E3, AC-N2–AC-N5, AC-GOV-1–AC-GOV-6, AC-GOV-8 (all remain open/unchecked);
    AC-GOV-7; AC-N1/AC-N6; any task acceptance (Tasks 10-A, 10-B, 10-C, 10-H remain ACCEPTED; no other
    task accepted); D-F1–D-F6; and every prior RC, Act, custody, acceptance, and execution record,
    including all dated "no production deployment has occurred" statements.

### Corrections Applied in v1.0.24

The following documentation recording was applied in the 2026-09-24 v1.0.24 pass (RC-34), under
explicit human authorization (Authorization Act #26).

1. **RC-34 — header**: version, status line, "This version", and "Current HEAD at time of writing"
   (`48d62ac…`) updated; the v1.0.23 "Current status" clause was relabelled "v1.0.23 status summary
   (… historical; its release-target reference to `724fe67` is superseded by v1.0.24)" with its wording
   otherwise unchanged; a v1.0.24 "Current status" clause was added; the v1.0.23 "This version"
   description is retained verbatim under a "Previous version (v1.0.23)" label.
2. **RC-34 — Task 10-F**: a v1.0.24 note appended to the v1.0.23 current-status note (`deploy.yml` changed
   in `48d62ac`); a v1.0.24 cross-reference appended to the retry-boundary note; a `48d62ac` entry added
   to "Implementation references"; a v1.0.24 note appended to item 11 of "First production release
   attempt"; and two new records added: "Deploy-step SSH remote-command defect and correction" and
   "Release-readiness record (v1.0.24)".
3. **RC-34 — Gate A**: version reference updated to v1.0.24.
4. **RC-34 — Gate C**: a v1.0.24 note added (evidence still applies to the unchanged `Dockerfile` at
   `48d62ac`; release target `48d62ac` or later; no release authorization inferred). Gate C remains
   SATISFIED.
5. **RC-34 — footer**: current-status text updated to v1.0.24, with its sentence "production release of
   the corrected commit `724fe67` is **not** authorized by this document and remains a separate human
   decision, together with the release mechanism (DEC-9, unresolved)" replaced by the v1.0.24 release-
   commit requirement and the statement that no production release of any commit is authorized; the
   v1.0.23 footer-history clause is retained with its wording unchanged except that "and is updated here
   to v1.0.23" now reads "updated to v1.0.23" so that the v1.0.24 clause can follow.
6. **Not changed**: no acceptance criterion or checkbox; Task 10-B, Task 10-H, and Gate C statuses; any
   Task 10-B or Gate C evidence recorded against `724fe67`; D-F1 or D-F6; any prior RC, Act, custody,
   acceptance, or execution record.

### Corrections Applied in v1.0.23

The following documentation recording was applied in the 2026-09-23 v1.0.23 pass (RC-33), under
explicit human authorization (Authorization Act #25), incorporating the human decisions labelled DEC-1
through DEC-8 in the authorizing instructions (DEC-9 intentionally left unresolved). "D-F6" is the sixth
entry in the Task 10-F "D-F" decision sequence and is distinct from this document's Decisions D-1
through D-9.

1. **RC-33 — D-F6 recorded (Task 10-F; DEC-1)**: successor to D-F1 for the `Dockerfile` artifact
   only (blob `c9461fc0…` from `eeb4093` → blob `ffe54bf1caf9d90a501661e84ea4cb503bf46a34` at
   `724fe67`); `.dockerignore` blob `e2b09c52…` unchanged; D-F1's text and transfer instructions
   preserved as historical.
2. **RC-33 — Task 10-B corrected-artifact evidence (DEC-2)**: dated corrected-Dockerfile records added
   under AC-B1–AC-B7, a "Replaced artifact note" added above the preserved §10-B.2 single-stage
   specification, a Task 10-B acceptance-state note (remains ACCEPTED; not reopened or re-accepted),
   and a factual "Corrected-Dockerfile record" chronology. Original Act-numbered PASS records are
   unchanged.
3. **RC-33 — AC-GOV-7 cross-reference**: remains SATISFIED; additionally evidenced for the corrected
   artifact by the corrected-Dockerfile AC-B6 evidence.
4. **RC-33 — Gate C corrected-Dockerfile Docker evidence (DEC-3)**: added to §8.1; supersedes the
   earlier Docker smoke-test evidence for documenting the corrected artifact; Gate C remains SATISFIED;
   no release authorization for `724fe67` is inferred from the 2026-09-22 final authorization.
5. **RC-33 — failed first production release attempt (Task 10-F; DEC-4, DEC-5, DEC-6)**: factual
   record of `prod-v1.0.0` / run `35750588575` (tag, trigger, login, build, registry-push denial,
   skipped deploy, no Droplet change, no retry) and the manual post-failure control-panel registry
   observation (not API-level verification; not AC-F4/AC-F8/AC-N3 evidence). AC-F1/AC-F2 factual
   evidence cross-referenced; both remain unchecked. Authorization references for the tag and for
   `7425b3d`/`a5318ab` recorded conservatively as human-authorized but not formally identified.
6. **RC-33 — implementation references**: `7425b3d` (Docker artifacts + Stripe dependency) and
   `a5318ab` (`prod-v*` trigger) recorded from Git; stale "dispatch-only" statements annotated with
   current-status notes rather than rewritten.
7. **RC-33 — retry-boundary cross-reference**: a re-run of `35750588575` would rebuild `a2d45cc`; using
   the corrected commit falls outside the retry boundary; no mechanism chosen (DEC-9 unresolved).
8. **RC-33 — current-status corrections**: header (version, status, "This version", "Current HEAD");
   §1 `Dockerfile`/`.dockerignore` rows (baseline wording preserved, current status added); Gate A
   version reference; footer. Historical "Gate C remains NOT SATISFIED" statements inside dated records
   are preserved unchanged.
9. **Not recorded (DEC-8)**: local Docker build-cache state is not an acceptance requirement and is not
   recorded.

### Corrections Applied in v1.0.22

The following documentation correction was applied in the 2026-09-22 v1.0.22 pass (RC-32), under
explicit human authorization (Authorization Act #24). Note: "D-F5" labels the human decision
recorded in the authorizing instructions; it is the fifth entry in the existing Task 10-F "D-F"
decision sequence (D-F1 through D-F4), and is distinct from this document's Decisions D-1 through
D-9.

1. **RC-32 — D-F5 recorded (Task 10-F)**: a human decision approving, in principle, a future,
   separately authorized `server.js` change deferring Stripe client construction so an absent or
   empty `STRIPE_SECRET_KEY` no longer terminates startup at module load. Shape 1 only (initialization
   in `server.js` only; existing `stripe` identifier and all four existing call sites preserved
   unchanged; no webhook/checkout/billing-portal/frontend/database/package-file/SDK-version/
   logging/error-handling change; Shape 2 explicitly excluded). D-F5 is a decision record only — it
   is **not** implementation authorization and does **not** retroactively expand Task 10-F's
   authorization.
2. **RC-32 — accepted webhook nuance recorded**: a deferred, still-unconfigured Stripe client may
   still throw on first access (the SDK constructor requires a key), caught by the webhook route's
   existing try/catch and producing its existing 400 response; this is not represented as webhook
   signature verification working without a key, and does not authorize any webhook-handler
   redesign.
3. **RC-32 — security/production exclusions recorded**: D-F5 does not authorize any Stripe secret
   action, placeholder production credentials, any change to D-8, or any Docker, DOCR, Droplet,
   Caddy, production, `prod-v*` tag, commit, push, or reboot action.
4. **RC-32 — governance reconciliation (narrow clarifications/cross-references only, no rule or
   criterion wording rewritten)**: §0's application-source-code rule now names D-F5 as its specific
   narrow exception; §3's application-logic exclusion now cross-references D-F5 as the sole
   exception, not a general authorization; AC-B5 and AC-GOV-7 each received a one-sentence
   cross-reference; AC-F7 received a cross-reference recording its future NOT SATISFIED treatment
   once implementation actually occurs, with its checkbox unchanged; AC-GOV-1 received a
   cross-reference noting D-F5 is a decision record, not implementation authorization; Gate C's
   Docker smoke-test evidence received a note that it predates D-F5 and that fresh evidence will be
   required after implementation; the Task 10-E first-pass/second-pass clarification received a
   cross-reference explaining D-F5's intended reconciliation purpose. Task 10-F's own "does NOT
   authorize: Modifying `server.js`" scope statement is unchanged.
5. **RC-32 — historical evidence preserved unchanged**: Authorization Act #13 / AC-B5 evidence, the
   2026-09-19 AC-F7 recording, the 2026-09-17 Gate C Docker smoke-test record, and every other prior
   acceptance/execution record are preserved exactly as previously written; none was rewritten,
   deleted, or retroactively altered.
6. **RC-32 — future fresh-evidence requirements recorded (not performed now)**: once the D-F5
   Shape 1 implementation is separately authorized and actually made, AC-B3 and AC-B4 will require
   fresh evidence, Gate C's Docker smoke-test bullet will require fresh evidence, and AC-GOV-7 will
   require fresh verification against the production image containing the new code; existing AC-F3
   dry-run evidence remains valid as historical evidence and is not retroactively invalidated.
7. **RC-32 — version references advanced (D5-style convention)**: header, status, footer, §11, and
   §12 updated to v1.0.22; historical version records preserved.
8. **What this pass did NOT do**: modify `server.js`, `.github/workflows/deploy.yml`, `CLAUDE.md`,
   `package.json`, `package-lock.json`, `Dockerfile`, or `.dockerignore`; commit, tag, or push; run
   or dispatch any GitHub Actions workflow; access DOCR, the Droplet, Caddy, or production; create,
   modify, rotate, or read any secret; create a `prod-v*` tag; alter Task 10-F's, Task 10-G's, or
   Gate C's requirements, or any historical acceptance/execution record. **Gate C remains NOT
   SATISFIED, Task 10-E and Task 10-F remain NOT ACCEPTED, and production deployment remains
   UNAUTHORIZED.**

### Corrections Applied in v1.0.21

The following documentation correction was applied in the 2026-09-21 v1.0.21 pass (RC-31), under
explicit human authorization (Authorization Act #23 — a human-selected number; the document's
existing chronology did not by itself establish a unique next Act number, and historical Act
numbering, including the absent #4, #5, and #17, is preserved unchanged). Note: "D1–D8" and "R1–R6"
below label the human decisions recorded in the authorizing instructions; they are distinct from
this document's Decisions D-1 through D-9.

1. **RC-31 — Option B architecture recorded (Task 10-F)**: production deploys only on a push of a
   `prod-v*` Git version tag; `workflow_dispatch` remains the non-production dry run; checkpoint
   tags never trigger production; event-separated concurrency groups with
   `cancel-in-progress: false`; no GitHub Environment; production tag creation and tag push are
   separate authorization boundaries; publishing the workflow does not execute production. Recorded
   in Task 10-F's step 1 and the new "Production release trigger and tag namespace" subsection.
2. **RC-31 — AC-F8 consequence and retry boundary recorded (D1, D2)**: the first production
   deployment alone does not satisfy AC-F8; a second, separately authorized deployment is required;
   AC-F8 stays in Task 10-F and AC-N3 stays in Task 10-N. A retry is permitted only for a failed or
   incomplete production attempt, via a named mechanism (e.g., GitHub Actions re-run), for the same
   `prod-v*` tag and commit SHA, with the exclusions listed in Task 10-F. The treatment of registry
   evidence/read access for AC-F8 as a distinct authorization boundary requiring separate explicit
   human authorization was explicitly human-ratified after the read-only verification of this
   pass; it is a documentation clarification only and authorizes no registry access, AC-F8
   verification, or other operational action.
3. **RC-31 — AC-F1 / AC-F2 state (D4)**: both reverted from `[x]` to `[ ]`; the "EVIDENCED"
   annotation replaced by a "HISTORICAL WORKFLOW_DISPATCH EVIDENCE" annotation; acceptance wording
   unchanged; a v1.0.21 scoping note added after the dry-run evidence recording; the recording
   itself preserved unchanged. AC-F3, AC-F6, and AC-F7 unchanged.
4. **RC-31 — named consistency corrections (D6)**: (a) the stale "No `.github/` directory exists …
   blocked until D-7 is resolved" gate text in Task 10-F replaced with a D-7-resolved status note;
   (b) the live `v1.0.10` references in §8.1 Gate A and the §8.2 Checkpoint Attestation Template
   advanced to v1.0.21 (historical v1.0.10 records unchanged); (c) "immutable version tag" /
   "immutable commit-SHA tag" wording in Task 10-F steps 5 and 8 and the image-tagging table
   relabelled "immutable image tag (Git commit SHA)" to distinguish it from the `prod-v*` Git
   release tag (the Task 10-N immutable-tag text and AC-F4's wording unchanged). The planned
   `CLAUDE.md` correction was dropped: no stale `CLAUDE.md` sentence was identified, and `CLAUDE.md`
   is not modified.
5. **RC-31 — "(proposed)" label removed (R5)**: the AC-F4/AC-F8 technical dependency clarification
   is adopted text; its substantive wording is unchanged apart from the D1 addition.
6. **RC-31 — version references advanced (D5)**: header, status, footer, §11, and §12 updated to
   v1.0.21; historical version records preserved.
7. **RC-31 — separation of documentation and workflow (D7, D8)**: this pass edits documentation
   only. Workflow implementation (including the stale workflow header comment) is a later, separate
   authorization, followed by its own diff verification, commit authorization, and publication
   authorization.
8. **What this pass did NOT do**: modify `.github/workflows/deploy.yml`, `CLAUDE.md`, any
   application source, `Dockerfile`, or `.dockerignore`; commit, tag, or push; run or dispatch any
   GitHub Actions workflow; access DOCR, the Droplet, or production; create a `prod-v*` tag; alter
   AC-F8's or AC-N3's wording, Gate C's five bullets, or any other Task 10-F criterion. **Gate C
   remains NOT SATISFIED, Task 10-F remains NOT ACCEPTED, and production deployment remains
   UNAUTHORIZED.**

### Corrections Applied in v1.0.20

The following governance recording was applied in the 2026-09-17 v1.0.20 pass (RC-30), under
explicit human authorization (Authorization Act #22), following the completed Task 10-C
implementation-readiness review (Authorization Act #20) and the explicit human authorization,
manual DNS implementation, and read-only technical verification recorded under Authorization Act
#21.

1. **RC-30 — Task 10-C DNS implementation recorded**: the human operator manually configured
   Namecheap Advanced DNS for `flavourfind.com`: `@` → A → `146.190.189.242` (TTL 30 min) and
   `www` → A → `146.190.189.242` (TTL 30 min), replacing the prior Namecheap parking CNAME
   (`www` → `parkingpage.namecheap.com.`) and URL redirect (`@` → `http://www.flavourfind.com/`).
   The pre-existing SPF TXT record was left unchanged. Claude performed no DNS writes; this
   implementation was performed entirely by the human operator.
2. **RC-30 — Task 10-C technical verification recorded**: read-only verification (Authorization
   Act #21) established AC-C1 PASS, AC-C2 PASS, and AC-C3 PASS, using the local system resolver
   plus two independent public resolvers (Google Public DNS and Cloudflare Public DNS, both via
   DNS-over-HTTPS). No propagation discrepancy was observed; no residual Namecheap parking CNAME
   was found for `www.flavourfind.com`.
3. **RC-30 — Task 10-C formally accepted**: based on that evidence, explicit human authorization
   (Authorization Act #22) formally accepts Task 10-C. This is recorded in §4's decision table (a
   "D-1/Task 10-C status update" note), in §3's Phase 10 objective summary, in Task 10-C's own
   specification (§5, AC-C1–AC-C3 checked and a "Task 10-C Acceptance State" record added
   following the Task 10-A/Task 10-B precedent), and in §12 ("Task 10-C Acceptance Record —
   Authorization Act #22").
4. **RC-30 — historical wording preserved**: prior text stating Task 10-C was not yet authorized
   or not yet implemented is preserved as accurate historical record wherever it describes an
   earlier point in time; only current-state wording was corrected, via added notes rather than
   rewriting the original text.
5. **RC-30 — Task 10-D remains unauthorized**: acceptance of Task 10-C does **not** itself
   authorize, implement, or advance Task 10-D or any later Phase 10 task. No Caddy installation,
   TLS/certificate configuration, or reverse-proxy work was performed or authorized by this pass.
   **Task 10-D and every later Phase 10 task remain NOT AUTHORIZED.**
6. **What this pass did NOT do**: create, modify, or verify any DNS record (the DNS
   implementation was performed manually by the human operator, not by Claude, and Claude's role
   was limited to read-only verification under the separate Authorization Act #21 session); modify
   application source, `Dockerfile`, or `.dockerignore`; modify any file other than
   `phase10_plan_3.md`; authorize, implement, or accept Task 10-D or any later task; launch any
   agent; rewrite any v1.0.2–v1.0.19 historical attestation beyond the specifically identified
   current-status additions; or commit, tag, or push.

### Corrections Applied in v1.0.19

The following governance recording was applied in the 2026-09-17 v1.0.19 pass (RC-29), under
explicit human authorization (Authorization Act #19), following the completed read-only Task 10-C
readiness review (Authorization Act #18).

1. **RC-29 — Decision D-1 resolved and recorded**: Authorization Act #18 established that
   Decision D-1 (production domain confirmation) was the material blocker preventing Task 10-C from
   reaching implementation-authorization readiness. The human has since explicitly resolved D-1:
   the confirmed production domain is **`flavourfind.com`**. This is recorded in §4's decision
   table (a "D-1 current status" note, mirroring the existing "D-6 current status" note's format),
   in §3's Phase 10 objective summary, in Task 10-C's own specification (§5), and in §10's Security
   Attestation (which previously asserted no real production domain name was present in the
   document — now corrected, since a domain name is public information, not a secret, and its
   presence does not violate that section's guarantee).
2. **RC-29 — historical "pending" wording preserved**: prior text stating D-1 was pending or that
   the production domain was unconfirmed is preserved as accurate historical record wherever it
   describes an earlier point in time; only current-state wording was corrected, via added notes
   rather than rewriting the original text.
3. **RC-29 — Task 10-C remains unauthorized**: resolving D-1 removes one blocker to a future
   implementation-authorization decision but does **not** itself authorize, implement, or verify
   Task 10-C. No DNS record was created, modified, or verified; no DNS propagation was checked; no
   registrar or DNS-provider action was taken. **Task 10-C remains NOT ACCEPTED and NOT
   AUTHORIZED.** AC-C1, AC-C2, and AC-C3 remain unverified.
4. **What this pass did NOT do**: create, modify, or verify any DNS record; perform DNS propagation
   verification; access any registrar, DNS provider, or DigitalOcean resource; modify application
   source, `Dockerfile`, or `.dockerignore`; modify any file other than `phase10_plan_3.md`;
   authorize Task 10-C, Task 10-D, or any later task; accept Task 10-C; launch any agent; rewrite
   any v1.0.2–v1.0.18 historical attestation beyond the specifically identified current-status
   additions; or commit, tag, or push. Task 10-C as a whole remains **NOT AUTHORIZED**.

### Corrections Applied in v1.0.18

The following governance decision was applied in the 2026-09-17 v1.0.18 pass (RC-28), under
explicit human authorization (Authorization Act #16), following the completed read-only
acceptance-readiness review (Authorization Act #15).

1. **RC-28 — Task 10-B formally accepted**: Authorization Act #15 established, without modifying
   anything, that Task 10-B's own acceptance requirement is exactly AC-B1 through AC-B7 (no
   additional substantive technical requirement specific to Task 10-B exists), that all seven
   criteria have recorded PASS evidence with intact Act attributions, that pending Decision D-9
   concerns only a later Task 10-F `<registry>/<image-name>` reference and does not block Task
   10-B's own artifacts or criteria, and that the whole-Phase-10 governance gates and checkpoint
   (§7–§8) are a separate, later, whole-project checkpoint rather than a Task 10-B prerequisite.
   Based on that review, explicit human authorization (Authorization Act #16) directed the formal
   acceptance decision. A "Task 10-B Acceptance State" record was added to §5, following the same
   pattern already established for Task 10-A's acceptance (§5, "10-A Acceptance State"). **Task
   10-B is accordingly recorded as ACCEPTED.**
2. **RC-28 — evidence preserved, not re-evaluated**: no individual AC-B criterion's technical
   evidence was re-evaluated, modified, or broadened by this decision. Each of AC-B1 through AC-B7
   retains exactly the evidentiary basis, scope limitations, and Authorization Act attribution
   recorded in its own §12 entry, unchanged by this pass.
3. **RC-28 — Task 10-C+ remain separately unauthorized**: acceptance of Task 10-B does **not**
   authorize Task 10-C or any later Phase 10 task. Each remains **NOT AUTHORIZED** and requires its
   own separate, explicit future human authorization, exactly as Task 10-B itself did before this
   Act, and exactly as remained true for Task 10-B after Task 10-A's own acceptance.
4. **What this pass did NOT do**: re-evaluate AC-B1, AC-B2, AC-B3, AC-B4, AC-B5, AC-B6, or AC-B7;
   perform any Docker build, container run, PostgreSQL provisioning, or other runtime or
   infrastructure work; modify application source, `Dockerfile`, or `.dockerignore`; authorize Task
   10-C or any later task; rewrite any v1.0.2–v1.0.17 historical attestation (two forward-looking
   notes were added to the two most recent pre-acceptance status-update paragraphs in §5, consistent
   with the document's established convention — no historical text was altered); or commit, tag, or
   push.

### Corrections Applied in v1.0.17

The following governance recording was applied in the 2026-09-17 v1.0.17 pass (RC-27), under
explicit human authorization scoped strictly to documentation recording (Authorization Act #13
performed the underlying read-only evaluation; this pass, Authorization Act #14, only records its
reviewed result).

1. **RC-27 — AC-B5 verification recorded**: Under Authorization Act #13, a read-only Git and
   repository inspection of AC-B5 ("No application source code was modified to make the Dockerfile
   work") was performed. `server.js` and `database.js` — the application's core runtime source,
   both referenced by the Dockerfile's `COPY` instructions — were confirmed via `git status` to
   have no uncommitted changes, and `git log` confirmed their most recent commits (both 2026-09-10:
   `server.js` via Phase 8 Task 8-C, `database.js` via Phase 8 Task 8-B) predate the Dockerfile's
   documented 2026-09-12 creation date, with no commit in either file's history referencing Docker
   or Task 10-B. The only other Dockerfile-build-context files showing changes — `package.json` and
   `package-lock.json` — were independently diff-inspected and found to contain only an unrelated,
   pre-existing Stripe dependency addition (`"stripe": "^22.6.1"`). `.env.example` and
   `apps/web/global-setup.ts` changes were identified as Stripe environment-variable documentation
   and Playwright test-setup changes respectively; `apps/web/e2e/chat.spec.ts` is excluded from the
   Docker build context by the existing `.dockerignore` rule for `apps/web/e2e/`. All other
   Dockerfile-referenced paths (`packages/`, `apps/web/next.config.ts`, `apps/web/tsconfig.json`,
   `turbo.json`, root `tsconfig.json`) showed no changes. On this evidence, AC-B5 is recorded as
   **PASS**. This evidentiary summary reflects precisely what Act #13 established — no broader
   claim (e.g., about every possible file the Dockerfile could ever reference) is made beyond this.
2. **RC-27 — individual-criterion evidence complete, Task 10-B acceptance still separate**: with
   this recording, all seven AC-B1–AC-B7 criteria now have PASS evidence (AC-B1 via Act #7; AC-B2
   via Act #9; AC-B3 via Act #10; AC-B4 via Act #10; AC-B5 via Act #13; AC-B6 via Act #3; AC-B7 via
   Act #8). **This does not itself constitute, and must not be read as, acceptance of Task 10-B.**
   Formal Task 10-B acceptance remains a separate governance decision, distinct from the individual
   technical criteria, requiring its own explicit future human authorization and acceptance review.
3. **What this pass (Act #14) did NOT do**: perform any new AC-B5 evaluation, Docker build,
   PostgreSQL provisioning, or HTTP request (the technical work was performed under Act #13, prior
   to and separately from this documentation pass); re-evaluate AC-B1, AC-B2, AC-B3, AC-B4, AC-B6,
   or AC-B7; authorize Task 10-B acceptance; authorize Task 10-C or any later task; modify
   application source, `Dockerfile`, or `.dockerignore`; rewrite any v1.0.2–v1.0.16 historical
   attestation; or commit, tag, or push. Task 10-B as a whole remains **NOT ACCEPTED**.

### Corrections Applied in v1.0.16

The following documentation-only correction was applied in the 2026-09-16 v1.0.16 pass (RC-26),
under explicit human authorization (Authorization Act #12), following the completed v1.0.15
post-Act #11 read-only governance review (which itself involved three independent read-only agent
reviews: `repository-reviewer`, `pr-reviewer`, and `auth-runtime-verifier`).

1. **RC-26 — AC-B5/AC-B6 historical contradiction corrected**: the §12 "AC-B1 Human Interpretation
   and Documentation Record — Authorization Act #7" record previously stated, in its item 4, "AC-B5
   and AC-B6 remain **PASS**, unaffected by this Act." This was incorrect: as of Act #7
   (2026-09-16), only AC-B6 had PASS evidence (via Authorization Act #3, 2026-09-15); AC-B5 has
   never been evaluated by any Authorization Act, before or since, and remains unverified to this
   day. The item is corrected in place to read "AC-B5 remains **unverified** (no Authorization Act
   has evaluated it — this is distinct from AC-B6, which had already reached **PASS** via
   Authorization Act #3)," with an inline annotation explaining the correction, rather than being
   silently rewritten. This was an isolated drafting error: it was never repeated elsewhere in the
   document, and no other passage relied on it to claim AC-B5 verification or Task 10-B acceptance.
2. **RC-26 — Act #10 ancillary-detail evidentiary scope clarified**: the §12 "AC-B3 / AC-B4
   Verification Result — Authorization Act #10" record's items 3–4 previously presented three
   details — the specific PostgreSQL version used, the claim that no suitable prior application
   image was available and that this was confirmed by inspection before the Act, and the specific
   placeholder value/detail used for `STRIPE_SECRET_KEY` — without noting that none of the three
   appear in the retained evidence log itself. A new "Evidentiary-completeness note" is added to
   that record identifying all three as session context rather than log-provable fact. This does
   **not** change the AC-B3 or AC-B4 result: both remain **PASS**, resting on evidence the log does
   directly contain (build exit code 0; in-container `GET /` → HTTP 200; in-container `POST
   /api/billing/webhook` → HTTP 400 with the exact route-specific error body).
3. **RC-26 — stale closing footer reconciled**: the document's final closing paragraph previously
   stated "Status: PROPOSED — AWAITING HUMAN REVIEW AND EXPLICIT IMPLEMENTATION AUTHORIZATION," in
   tension with the header's current "APPROVED / AUTHORITATIVE" status. It is corrected to reflect
   the current status while explicitly preserving the distinction that this does not extend to Task
   10-B acceptance or Task 10-C+ authorization. Every other, individually dated "Document status
   remains: PROPOSED..." attestation elsewhere in §11/§12 is preserved unchanged, as each is an
   accurate historical record of the document's status at that specific earlier point in time, not
   a current-status claim.
4. **What this pass did NOT do**: perform any Docker build, PostgreSQL provisioning, or HTTP
   request; evaluate AC-B5; change AC-B3's, AC-B4's, AC-B6's, or AC-B7's PASS status; change AC-B5's
   unverified status; authorize Task 10-B acceptance; authorize Task 10-C or any later task; modify
   application source, `Dockerfile`, or `.dockerignore`; rewrite any v1.0.2–v1.0.15 historical
   attestation beyond the single corrected item identified above (which is itself preserved and
   annotated, not deleted); or commit, tag, or push. Task 10-B as a whole remains **NOT ACCEPTED**.

### Corrections Applied in v1.0.15

The following governance recording was applied in the 2026-09-16 v1.0.15 pass (RC-25), under
explicit human authorization scoped strictly to documentation recording (Authorization Act #10
performed the underlying runtime verification; this pass only records its reviewed results).

1. **RC-25 — AC-B3 and AC-B4 verification recorded**: Under Authorization Act #10, the application
   was built from the unmodified current `Dockerfile` (a fresh build was required since no prior
   application image remained available; it reused Docker's layer cache and completed with exit
   code 0) and started in a container on a disposable Docker network, connected to a disposable,
   non-production, SSL-enabled local PostgreSQL instance (self-signed certificate; disposable
   `testuser`/`testdb` credentials; no Neon production database or credential involved). The
   container's startup log confirmed database initialization completed and Express reached its
   listening state on port 3000. From inside that running container: a `GET /` request returned
   HTTP 200 (AC-B3's literal requirement); a `POST /api/billing/webhook` request (no Stripe
   signature supplied — none is required by AC-B4's literal wording) returned HTTP 400 with body
   `{"error":"Webhook signature verification failed"}`, the exact literal string produced by the
   webhook route's own signature-verification catch block in `server.js`, distinguishing route
   reachability from a generic middleware-level rejection. AC-B3 and AC-B4 are accordingly recorded
   as **PASS**. All disposable resources (application container, PostgreSQL container, Docker
   network, temporary TLS material, temporary application image) were removed after evidence
   capture; the raw evidence log was retained at
   `task10b-acb3acb4-verification-acb3acb4-20260916-141425-c366af0.log`.
2. **RC-25 — AC-B5 explicitly not addressed**: Act #10 verified AC-B3 and AC-B4 only. AC-B5 ("No
   application source code was modified to make the Dockerfile work") has not been evaluated by any
   Authorization Act to date and remains **unverified** in the §5 checklist; this pass does not
   change that status and does not claim otherwise, notwithstanding any characterization in the
   authorization request that preceded this recording.
3. **RC-25 — individual-criterion evidence does not constitute Task 10-B acceptance**: with this
   recording, six of the seven AC-B1–AC-B7 criteria (all but AC-B5) now have PASS evidence. This
   is explicitly documented as distinct from, and insufficient for, formal Task 10-B acceptance,
   which remains a separate future human governance decision requiring its own explicit
   authorization.
4. **What this pass did NOT do**: perform any new Docker build, PostgreSQL provisioning, or HTTP
   request (the technical work was performed under Act #10, prior to and separately from this
   documentation pass); mark AC-B5 as PASS or otherwise evaluate it; authorize Task 10-B acceptance;
   authorize Task 10-C or any later task; modify application source, `Dockerfile`, or
   `.dockerignore`; rewrite any v1.0.2–v1.0.14 historical attestation; or commit, tag, or push.
   Task 10-B as a whole remains **NOT ACCEPTED**.

### Corrections Applied in v1.0.14

The following governance recording was applied in the 2026-09-16 v1.0.14 pass (RC-24), under
explicit human authorization scoped strictly to documentation recording (Authorization Acts #8 and
#9 performed the underlying technical verifications; this pass only records their reviewed
results). Like RC-23, this pass does not correct defective wording — it records the results of
completed, evidence-reviewed verification work.

1. **RC-24 — AC-B7 verification recorded**: Under Authorization Act #8, a fresh negative Docker
   build (`docker build --no-cache .` without the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` build
   argument) was performed from repository HEAD `c366af0bc9d32c7ee4ae047ee2f0280b9944af0f`. The
   build completed successfully (exit code 0). The resulting image's static assets were extracted
   (via `docker create`/`docker cp`, without starting a container) and searched for `pk_live_` and
   `pk_test_` occurrences. All occurrences found were bare SDK/reference literals (a prefix
   constant assignment, an error-message template, and a `.startsWith()` check) — none were
   immediately followed by an uninterrupted Base64-alphabet run. Zero credential-structured values
   of either prefix were found, meaning the local test key was not silently baked into the build.
   AC-B7 is accordingly recorded as **PASS**. Full raw command output and search results are
   preserved in the gitignored evidence log `task10b-acb7-verification-acb7-20260916-041154-c366af0.log`.
2. **RC-24 — AC-B2 verification recorded**: Under Authorization Act #9, an operator-executed Docker
   build (`docker build --no-cache --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<production key> .`)
   was performed from the same HEAD, in the operator's own terminal so the key value was never
   disclosed to Claude, written to any repository file, or written to the evidence log. The build
   completed with exit code 0, and image tag/ID/creation-timestamp metadata was captured before the
   temporary image was removed. AC-B2 is accordingly recorded as **PASS**. This record does not
   claim independent proof that the supplied value was structurally a valid `pk_live_` key — the
   raw log intentionally redacts it; that distinct question is AC-B6's scope, which is separately
   recorded as PASS (Authorization Act #3). Full raw build output is preserved in the gitignored
   evidence log `task10b-acb2-verification-acb2-20260916-092529-c366af0.log`.
3. **What this pass did NOT do**: perform any new Docker build, container run, or credential
   inspection (the technical work was performed under Acts #8 and #9, prior to and separately from
   this documentation pass); change AC-B3's, AC-B4's, or AC-B5's status; authorize Task 10-B
   verification of AC-B3/AC-B4 or Task 10-B acceptance; authorize Task 10-C or any later task;
   rewrite any v1.0.2–v1.0.13 historical attestation; or commit, tag, or push. Task 10-B as a whole
   remains **NOT ACCEPTED** — AC-B3 and AC-B4 remain unverified.

### Corrections Applied in v1.0.13

The following governance recording was applied in the 2026-09-16 v1.0.13 pass (RC-23), under
explicit human authorization (Authorization Act #7). Unlike RC-16 through RC-22, this pass does
not correct defective wording — it records an explicit human interpretive decision resolving an
ambiguity that the read-only Authorization Act #6 investigation identified but could not itself
resolve, since the remaining question was interpretive rather than evidentiary.

1. **RC-23 — AC-B1 interpretation selected and recorded**: Authorization Act #6 established, from
   full Git history, reflog, file timestamps, and a dated pre-creation snapshot of this planning
   document, that no authorization record for the original 2026-09-12 creation of `Dockerfile`/
   `.dockerignore` exists anywhere in the repository and confirmed this gap is not resolvable by
   further investigation. It identified that AC-B1's phrase "authorized by D-6" admits two
   readings: (A) requiring proof that D-6 authorized the original creation (permanently
   unsatisfiable, since that authorization record cannot be recovered), or (B) satisfied by D-6's
   documented 2026-09-13 artifact-adoption decision, which currently authorizes these files as
   the governed Task 10-B artifacts regardless of the circumstances of their original creation.
   The human governing this Phase 10 process explicitly selected Reading B. AC-B1 is accordingly
   recorded as **PASS**.
2. **RC-23 — no retroactive authorization**: This decision does not authorize, and does not claim
   to authorize, the original 2026-09-12 creation. The historical fact that this creation's
   authorization record remains unrecovered is preserved unchanged in the "Current authorization
   status (v1.0.10, as of 2026-09-13)" paragraph and in §12's prior attestations.
3. **What this pass did NOT do**: perform any Docker build, container run, or credential
   inspection; change AC-B2's, AC-B3's, AC-B4's, AC-B5's, or AC-B7's status; authorize Task 10-B
   verification or acceptance; authorize Task 10-C or any later task; rewrite any v1.0.2–v1.0.12
   historical attestation; or commit, tag, or push. Task 10-B as a whole remains **NOT ACCEPTED**.

### Corrections Applied in v1.0.12

The following governance-language reconciliation was applied in the 2026-09-15 v1.0.12 correction
pass (RC-22), under explicit human authorization scoped strictly to Authorization Act #1
(documentation correction only). This pass corrects a substantive criterion defect, not merely a
verification-method inconsistency; it does not add, remove, alter, or retroactively rewrite any
historical fact, authorization record, or acceptance/authorization state established by v1.0.2
through v1.0.11.

1. **RC-22 — AC-B6 substantive credential-definition corrected**: The v1.0.11/RC-21 wording
   tested literal substring presence/absence of `pk_test_...` / `pk_live_...`. This was found to
   be defective in two ways: (a) a **false-FAIL risk** — the installed Clerk SDK (`@clerk/shared`)
   legitimately embeds the bare `pk_test_` prefix as an environment-classification constant and
   in error-message text, so a correctly configured production build can contain that substring
   without any test credential being embedded (already observed in the human-run Docker evidence
   discussed in §12's v1.0.11 note); (b) a **false-PASS risk** — a bare `pk_live_` substring (for
   example, from the same SDK's error-message text) does not by itself prove a real production
   key was supplied to the build. AC-B6 is corrected to test the documented Clerk publishable-key
   *structure* (`pk_<test|live>_<base64(FAPI-hostname + "$")>`; see Clerk, "Refactoring our
   frontend API key," https://clerk.com/blog/refactoring-our-api-keys) rather than a bare
   substring: a prefix is only a credential value if it is immediately followed by an
   uninterrupted Base64-alphabet run. An explicit **INCONCLUSIVE** outcome is added for
   occurrences that cannot be safely classified, so ambiguity is escalated rather than defaulted
   to PASS. The RC-21 verification method (Docker build + static-asset extraction; no running
   container; no PostgreSQL) is unchanged.
2. **RC-22 — AC-GOV-7 corrected to match**: AC-GOV-7 previously restated the same defective
   literal-substring rule as an independent test. It is corrected to use the same structural test
   and the same evidence as AC-B6, rather than defining a second, inconsistent criterion.
3. **RC-22 — historical evidence not reclassified**: The earlier human-run Docker evidence
   (`pk_live_` found in two static chunks, `pk_test_` found in one, at
   `_next/static/chunks/739-08d0e2931b2fd855.js`) remains historical evidence generated under the
   v1.0.11 criterion. It is not, and cannot be, retroactively declared a PASS, FAIL, or
   INCONCLUSIVE outcome under v1.0.11 or v1.0.12, since the matched `pk_test_` substring was not
   retained and the structural classification this pass introduces was never applied to it. A
   fresh AC-B6 verification under the corrected criterion remains required and is not authorized
   by this pass.
4. **What this pass did NOT do**: perform any Docker build, container run, or PostgreSQL setup;
   inspect, use, or expose any credential; mark AC-B6 as PASS, FAIL, or INCONCLUSIVE; authorize
   AC-B6 verification, Task 10-B verification, or Task 10-B acceptance; authorize Task 10-C or any
   later task; adopt v1.0.12 as the new authoritative Phase 10 baseline (a separate human decision);
   rewrite any v1.0.2–v1.0.11 historical attestation; or commit, tag, or push. Task 10-B as a whole
   remains **NOT ACCEPTED**.

### Corrections Applied in v1.0.11

The following governance-language reconciliation was applied in the 2026-09-14 v1.0.11 correction
pass (RC-21). This pass corrects a verification-method inconsistency only; it does not add,
remove, alter, or retroactively rewrite any historical fact, authorization record, or
acceptance/authorization state established by v1.0.2 through v1.0.10.

1. **RC-21 — AC-B6 verification method corrected**: AC-B6 previously required verification "in
   the running container's static export... via browser devtools," which implicitly required a
   running, database-connected container to check a property (Clerk-key presence) that is
   actually fixed at `docker build` time. This coupled AC-B6 to an unrelated PostgreSQL runtime
   dependency. AC-B6 is corrected to require direct inspection of the static assets produced by
   an actual `docker build --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...` invocation (e.g.,
   via `docker create` + `docker cp`), with no running container or PostgreSQL connectivity
   required. The substantive requirement — `pk_live_...` present, `pk_test_...` absent, redacted
   reporting only — is unchanged. The corrected wording also makes explicit that a local
   `npm run build --workspace=apps/web` output does not satisfy AC-B6, since it does not exercise
   the `.dockerignore`/build-argument pipeline the criterion exists to validate.
2. **RC-21 — secondary consistency corrections**: §4 "D-6 current status" and the Task 10-B
   authorization-gate note previously listed "PostgreSQL verification" and "AC-B6" together in a
   way that implied AC-B6 itself required PostgreSQL. Both were clarified, with minimum wording
   changes, to note that PostgreSQL verification is relevant to AC-B3/AC-B4 and that AC-B6's
   corrected method requires a Docker build but not PostgreSQL or a running container.
3. **What this pass did NOT do**: perform any Docker build, container run, or PostgreSQL setup;
   inspect, use, or expose any credential; change AC-B6's substantive `pk_live_`/`pk_test_`
   requirement; authorize AC-B6, Task 10-B verification, or Task 10-B acceptance; authorize
   Task 10-C or any later task; rewrite any v1.0.2–v1.0.10 historical attestation; or commit,
   tag, or push. Task 10-B as a whole remains **NOT ACCEPTED**.

### Corrections Applied in v1.0.10

The following governance reconciliation was applied in the 2026-09-13 v1.0.10 correction pass
(RC-20). This pass records a new present-day human governance decision; it does not retroactively
authorize, reconstruct, or claim to recover the original 2026-09-12 Task 10-B authorization
record.

1. **RC-20 — D-6 artifact-adoption decision recorded**: On 2026-09-13, the human explicitly
   decided to adopt the already-existing `Dockerfile` and `.dockerignore` (present in the
   working tree, untracked, with filesystem creation timestamps of 2026-09-12) as the current
   Task 10-B implementation artifacts, going forward. This decision is limited strictly to
   artifact adoption. It is not a claim that the original creation of these files on 2026-09-12
   was authorized, nor an attempt to reconstruct that missing authorization record — a
   dedicated read-only investigation (repository/history audit, in-session conversation search,
   and available-file recovery) was unable to locate any human authorization statement, Git
   history, reflog entry, or Docker-engine evidence establishing what occurred on 2026-09-12.
   That gap remains explicitly unresolved and is preserved as such in §1.9, §4, and Task 10-B
   above, and in the §12 v1.0.10 custody attestation below.
2. **Scope of what was and was not changed**: §1.9 was updated to reflect that `Dockerfile` and
   `.dockerignore` currently exist (previously documented as "DOES NOT EXIST," which was accurate
   only as of the v1.0.2 baseline and had become stale). §4 (D-6) and Task 10-B were updated to
   record the artifact-adoption decision and to make explicit that Docker build/runtime
   verification, PostgreSQL verification, and AC-B2 through AC-B7 (including AC-B6) remain
   separately unauthorized. §8.1 Gate A and §8.2's Checkpoint Attestation Template's stale live
   version references were advanced from v1.0.9 to v1.0.10, consistent with the pattern
   established by RC-17/RC-18/RC-19.

No change was made to: the technical content of the Task 10-B Dockerfile/.dockerignore
specification; Task 10-A's ACCEPTED state or any of its historical provenance; the v1.0.2
through v1.0.9 correction attestations' historical facts (preserved unchanged); the §10 Security
Attestation or AC-GOV-3 language established by RC-17; Task 10-C or any later Phase 10 task's
authorization status (all remain unauthorized); or commit/tag/push authorization (all remain
separately unauthorized). Task 10-B **acceptance** remains pending — artifact adoption is not
acceptance.

**Research performed during this pass** (read-only; no repository files modified other than
`phase10_plan_3.md` itself):
- Re-read the full current document to identify every live/current statement describing
  `Dockerfile`/`.dockerignore` as absent or Task 10-B as unauthorized, so each could be updated
  consistently rather than piecemeal.
- Re-confirmed via read-only `git status`/`git log` that both files remain untracked with no
  commit history, and that current HEAD is unchanged (`c366af0bc9d32c7ee4ae047ee2f0280b9944af0f`).
- No Docker build, container run, or PostgreSQL verification was performed or required.
- No production Clerk key, or any other secret, was inspected, used, or exposed.

### Corrections Applied in v1.0.9

The following governance-language reconciliation was applied in the 2026-09-12 v1.0.9
correction pass (RC-19). This pass corrected one internal documentation inconsistency only;
it did not add, remove, or alter any historical fact, infrastructure metadata, or
acceptance/authorization state.

1. **RC-19 — §8.1 Gate A stale live version reference**: Gate A's baseline-verification
   step read "Verify this planning document version (v1.0.7) is the active authoritative
   specification." This reference was correctly set to v1.0.7 by the v1.0.7/RC-17 pass, but
   the document subsequently advanced to v1.0.8 in the RC-18 pass — a pass whose scope was
   deliberately limited to the separate §8.2 Checkpoint Attestation Template reference and
   did not touch Gate A. As a result, Gate A was left identifying a superseded version as
   the active authoritative specification. An independent read-only review performed after
   the v1.0.8 pass identified this as a live/current contradiction (not a historical
   reference) and it was corrected to v1.0.9.

No change was made to: the Task 10-B technical specification or its NOT-authorized status;
the overall Phase 10 status; Task 10-A's ACCEPTED state; any historical Ubuntu, capacity,
or Reserved IP provenance; the v1.0.6, v1.0.7, or v1.0.8 correction attestations' historical
facts (preserved unchanged); the §10 Security Attestation or AC-GOV-3 language established
by RC-17; or commit/tag/push authorization (all remain separately unauthorized).

**Research performed during this pass** (read-only; no repository files modified):
- Re-read the full current document to confirm Gate A was the only unresolved live-version
  contradiction before editing, and to confirm no other live/current reference still named
  v1.0.7 or v1.0.8 as the active version.
- Re-confirmed via read-only `git status` that `phase10_plan_3.md` remains untracked and
  that no other file was modified by this pass.
- No DigitalOcean, GitHub, database, or Stripe access was performed or required.

### Corrections Applied in v1.0.8

The following governance-language reconciliation was applied in the 2026-09-12 v1.0.8
correction pass (RC-18). This pass corrected one internal documentation inconsistency only;
it did not add, remove, or alter any historical fact, infrastructure metadata, or
acceptance/authorization state.

1. **RC-18 — §8.2 Checkpoint Attestation Template stale live version reference**: The
   Checkpoint Attestation Template's header line read "Document: phase10_plan_3.md v1.0.3."
   This reference was last synchronized during the v1.0.3 pass (RC-13) and was not updated
   during the v1.0.4, v1.0.5, v1.0.6, or v1.0.7 passes — including the v1.0.7/RC-17 pass,
   which corrected the structurally identical stale-version defect in Gate A (§8.1) but did
   not address this separate §8.2 occurrence. A read-only content-level review performed
   after the v1.0.7 pass identified this as the sole unresolved defect. Corrected to
   "Document: phase10_plan_3.md v1.0.8" so the template — when filled in by a human at a
   future checkpoint — identifies the actual current document version rather than a stale
   one.

No change was made to: the Task 10-B technical specification or its NOT-authorized status;
the overall Phase 10 status; Task 10-A's ACCEPTED state; any historical Ubuntu, capacity,
or Reserved IP provenance; the v1.0.6 or v1.0.7 correction attestations' historical facts
(preserved unchanged); or commit/tag/push authorization (all remain separately unauthorized).

**Research performed during this pass** (read-only; no repository files modified):
- Re-read the full current document to confirm the §8.2 reference was the only unresolved
  stale-version defect before editing.
- Re-confirmed via read-only `git status` that `phase10_plan_3.md` remains untracked and
  that no other file was modified by this pass.
- No DigitalOcean, GitHub, database, or Stripe access was performed or required.

### Corrections Applied in v1.0.7

The following governance-language reconciliation was applied in the 2026-09-12 v1.0.7
correction pass (RC-17). This pass corrected internal documentation inconsistencies only;
it did not add, remove, or alter any historical fact, infrastructure metadata, or
acceptance/authorization state.

1. **RC-17a — Gate A stale version reference (§8.1)**: Gate A's baseline-verification step
   instructed verifying "this planning document version (v1.0.3)" as the active
   authoritative specification. The document had advanced through v1.0.4, v1.0.5, and
   v1.0.6 without this reference being updated in those passes. Corrected to reference
   v1.0.7.

2. **RC-17b — §10 Security Attestation false "no real IP addresses" claim**: §10 stated
   "No real IP addresses (all references use placeholder `<domain>` or `[REDACT IP]`)."
   This was inaccurate: §5 Task 10-A's Acceptance Criteria and the §11 v1.0.6 correction
   attestation both already recorded the real Reserved IPv4 `146.190.189.242` (and the
   original public IPv4 `159.89.127.34` used during initial SSH confirmation) as
   human-confirmed infrastructure metadata. The false claim was removed and replaced with
   language distinguishing infrastructure metadata (permitted, when recorded for
   custody/provenance) from secrets and credentials (prohibited without exception).

3. **RC-17c — AC-GOV-3 conflated infrastructure metadata with secrets (§7)**: AC-GOV-3
   read "No real secret, credential, IP address, or connection string appears in any
   committed file," which — taken literally — the document itself already did not satisfy
   by design, per RC-16's human-confirmed Reserved IP. Corrected to the materially relevant
   requirement: no secrets, credentials, API keys, tokens, passwords, connection strings
   containing credentials, or private keys, with an explicit statement that infrastructure
   metadata (e.g., an IP address recorded for custody/provenance) is not itself a secret or
   credential and is not prohibited by this criterion.

No change was made to: the Task 10-B technical specification or its NOT-authorized status;
the overall Phase 10 status; Task 10-A's ACCEPTED state; the historical Ubuntu 22.04/24.04
or 2 vCPU/4 GB and 1 vCPU/2 GB provenance; the v1.0.6 correction attestation's historical
facts (preserved unchanged below); or commit/tag/push authorization (all remain separately
unauthorized).

**Research performed during this pass** (read-only; no repository files modified):
- Grepped and re-read the exact current text of the Gate A reference, §10, and AC-GOV-3
  before editing, to confirm the reported inconsistencies actually existed as described
  rather than assuming the correction request's premises were accurate.
- Re-confirmed via read-only `git status` / `git rev-parse HEAD` that no file other than
  `phase10_plan_3.md` was modified and that Git state (HEAD `c366af0bc9d32c7ee4ae047ee2f0280b9944af0f`,
  branch `main`) was unchanged.
- No DigitalOcean, GitHub, database, or Stripe access was performed or required.

### Corrections Applied in v1.0.6

The following governance correction was applied in the 2026-09-11 v1.0.6 correction pass,
following a final read-only 10-A acceptance review:

1. **RC-16 — Task 10-A infrastructure baseline (§5, Task 10-A)**: The original v1.0.5 (and
   earlier) 10-A specification stated Ubuntu 22.04 LTS and 2 vCPU / 4 GB RAM as the target
   Droplet configuration, and AC-A1 required Ubuntu 22.04 LTS specifically. The human
   independently provisioned and confirmed the following actual infrastructure:
   - Droplet `flavourfind-api-prod`, region TOR1, 1 vCPU / 2 GB RAM / 70 GB NVMe SSD / 2 TB
     transfer, Ubuntu 24.04 LTS x64.
   - Reserved IPv4 `146.190.189.242` assigned (original public IPv4 `159.89.127.34`).
   - SSH key `~/.ssh/flavourfind_api_prod`; connection confirmed via
     `ssh -i ~/.ssh/flavourfind_api_prod root@159.89.127.34`, reaching
     `root@flavourfind-api-prod:~#`.
   - GitHub repository secret `DROPLET_HOST` exists; human-confirmed configured value
     `146.190.189.242` (secret value not retrieved or displayed).
   - DigitalOcean Cloud Firewall `flavourfind-api-prod-firewall`: inbound TCP 22/80/443
     (all IPv4 + all IPv6) allowed, all other inbound denied, outbound allowed.
   - Automated weekly Droplet backups enabled.

   A prior read-only governance review searched the full Phase 10 plan for any task or
   acceptance criterion depending on Ubuntu 22.04 specifically, or on 2 vCPU / 4 GB RAM
   specifically, and found none: the only package-manager command in the document
   (`apk add --no-cache python3 make g++`, Task 10-B) runs inside the Docker build against
   the `node:22-alpine` base image, independent of host OS; no downstream task references
   CPU count, RAM size, swap, `NODE_OPTIONS`, memory limits, container memory, or OOM
   requirements.

   Correction applied: AC-A1 changed from "Ubuntu 22.04 LTS" to "Ubuntu 24.04 LTS." The
   10-A capacity text was revised to distinguish the originally specified 2 vCPU / 4 GB RAM
   from the actually provisioned and accepted 1 vCPU / 2 GB RAM, and to record the
   governance finding that the smaller capacity is not empirically proven equivalent — it is
   carried forward as the accepted baseline subject to future validation, not asserted as
   sufficient. AC-A2, AC-A3, and AC-A4 were marked satisfied based on the human-confirmed
   evidence above; their requirement text was not altered. A "10-A Acceptance State" note
   was added recording Task 10-A as ACCEPTED and explicitly preserving that Task 10-B and
   all later Phase 10 deliverables remain unauthorized.

   This correction does **not** alter the historical fact that v1.0.5 and earlier originally
   specified Ubuntu 22.04 LTS and 2 vCPU / 4 GB RAM — that original specification remains of
   record in this and prior version-history entries.

**Research performed during this pass** (read-only; no repository files modified):
- `phase10_plan_3.md` re-read to confirm version (v1.0.5), 10-A specification text, and
  AC-A1–AC-A4 wording before editing.
- All infrastructure facts (Droplet configuration, Reserved IP, SSH connectivity,
  `DROPLET_HOST` existence/value, firewall, backups) were supplied as human-confirmed
  external facts; none were independently retrieved via DigitalOcean or GitHub API/CLI
  access, and no such access was used.
- All corrections applied exclusively to `phase10_plan_3.md`.

The predecessor document `phase10_plan_2.md` v1.0.1 was not deleted or overwritten.
Document status remains: **PROPOSED — AWAITING HUMAN REVIEW AND EXPLICIT IMPLEMENTATION AUTHORIZATION**
(overall Phase 10 status is unchanged by Task 10-A's acceptance; Task 10-B and all later
deliverables remain unauthorized).

### Corrections Applied in v1.0.5

The following governance correction was applied in the 2026-09-11 v1.0.5 correction pass:

1. **RC-15 — Task 10-G Stripe webhook event subscription list (§10)**: The Task 10-G
   specification for creating a production Stripe webhook endpoint listed incorrect events.
   The prior text specified:

   ```
   checkout.session.completed, customer.subscription.updated, customer.subscription.deleted
   ```

   Two errors were present:
   - `checkout.session.completed` was listed but is NOT handled by the committed webhook
     implementation (`server.js` lines 108–111). The Phase 8 billing architecture
     (CASE B per the evidence) uses subscription lifecycle events exclusively; when
     a user completes Stripe Hosted Checkout, Stripe creates a subscription and fires
     `customer.subscription.created`, which the handler processes.
   - `customer.subscription.created` was omitted but IS handled (`server.js` line 109).

   Corrected event list:
   ```
   customer.subscription.created, customer.subscription.updated, customer.subscription.deleted
   ```

   A clarifying note was added to Task 10-G explicitly stating that
   `checkout.session.completed` is intentionally absent and explaining why.

   Verified against: `server.js` lines 108–111 (read-only staging) and
   `phase8_plan_1_4.md` (read-only staging; `checkout.session.completed` does not appear
   anywhere in the Phase 8 plan).

   No other changes were made to Task 10-G or any other section.

### Corrections Applied in v1.0.4

The following governance correction was applied in the 2026-09-11 v1.0.4 correction pass:

1. **RC-14 — Phase 8 task attribution (§2.1)**: A read-only governance review identified five
   inaccuracies in the §2.1 Phase 8 task-attribution text. Each was verified against
   `server.js` (read-only staging) and `phase8_plan_1_4.md` (read-only staging) before
   correction:

   - **Task 8-A**: Previously described as implementing billing routes (`POST /api/billing/checkout`,
     `POST /api/billing/portal`, `GET /api/billing/status`). Corrected to: Stripe package
     installation, database schema additions (`users.tier`, `users.stripe_customer_id` columns;
     `user_subscriptions` table), and `.env.example` additions. Billing routes are explicitly
     Task 8-B scope per `phase8_plan_1_4.md` §556.

   - **Webhook event list**: Previously listed `checkout.session.completed` as a handled event.
     Corrected to: `customer.subscription.created`, `customer.subscription.updated`, and
     `customer.subscription.deleted` only. Verified against `server.js` lines 91–157; no
     `checkout.session.completed` handler exists in the committed code.

   - **Task 8-C**: Previously described tier-aware chat rate limiting as Task 8-C scope.
     Corrected to: Task 8-C is Frontend — Upgrade UI & Tier Display. Tier-aware rate limiting
     belongs to Task 8-B scope per `phase8_plan_1_4.md` §194 ("This exception is scoped to
     Task 8-B") and verified against `server.js` lines 550–559 (billing-block, same commit).

   - **Task 8-D**: Previously described as implementing `PREMIUM_ENTITLED_STATUSES` Set and
     subscription tier enforcement. Corrected to: `PREMIUM_ENTITLED_STATUSES` belongs to
     Task 8-B. Task 8-D is the Playwright E2E billing test suite
     (`apps/web/e2e/billing.spec.ts`), which was omitted from the prior text.

   All other §2.1 content (v1.0.1 billing-route-method correction note) was preserved.
   No changes were made outside §2.1 during this pass.

   **Out-of-scope finding identified but NOT corrected in this pass**: §10 / Task 10-G
   (Stripe Dashboard configuration) lists `checkout.session.completed` in the webhook
   events to subscribe. The committed `server.js` does not handle this event. This is
   outside §2.1 scope; it will require a separate correction pass with explicit
   human authorization.

### Corrections Applied in v1.0.3

The following governance corrections were applied in the 2026-09-11 v1.0.3 correction pass:

1. **RC-9 — Schema provenance attribution (CASE B)**: Investigated whether the 10-table
   schema in §1.5 and §2.1 was correctly authorized. Read `phase8_plan_1_4.md` Appendix B
   and confirmed CASE B: `users` and `user_subscriptions` were **authoritatively introduced
   and human-approved during Phase 8 Task 8-A**. The 10-table count is correct.
   Added provenance note to §1.5 before the table list, annotated Tables 9–10 as
   "introduced Phase 8 Task 8-A — authorized", and updated AC-H2 to list all 10 tables
   with a provenance note. No table names or counts changed.

2. **RC-10 — AC-L3 CORS conditionality**: AC-L3 (unauthorized-origin rejection) was
   stated unconditionally, but the D-5 implementation uses `process.env.CORS_ORIGIN || '*'`.
   AC-L3 is only testable when `CORS_ORIGIN` is explicitly configured. The AC item now
   states this explicitly and explains that the `*` fallback means all origins are
   permitted when `CORS_ORIGIN` is unset. AC-L4 updated to note it applies
   "before `CORS_ORIGIN` is restricted" in the context of Capacitor.

3. **RC-11 — Task 10-N rollback runtime configuration**: The placeholder
   `[runtime environment variables as in Task 10-F]` in the Task 10-N rollback procedure
   was replaced with explicit runtime-configuration governance guidance covering:
   the authoritative secret-injection mechanism from Task 10-F (not manual reconstruction),
   secret store provenance (GitHub repository secrets), build-time vs. runtime variable
   distinction (build-time variables are already in the image layer), and a pre-rollback
   runtime variable verification requirement. RV-9 added to the recovery verification
   checklist. AC-N5 updated to reference RV-1 through RV-9. AC-N6 added.

4. **RC-12 — Task 10-K PostHog D-4 late-authorization reopening clarification**: Added
   explicit governance note in Task 10-K explaining that if D-4 is authorized after
   Task 10-B (Dockerfile) and/or Task 10-F (CI/CD) are already complete, that
   authorization opens **only** the PostHog-specific `ARG`/`ENV`/`--build-arg` entries
   in those surfaces — not unrelated changes. Added AC-K4 and updated §7 AC Summary
   to reference AC-K1–AC-K4.

5. **RC-13 — Cross-document consistency audit**: Full read of `phase10_plan_3.md` and
   `phase8_plan_1_4.md` for stale or contradictory references. Findings:
   - §8.2 checkpoint attestation template references `v1.0.2` — updated to `v1.0.3`
   - Gate A reference to "v1.0.2" updated to "v1.0.3" as the active specification
   - No other stale cross-document references found
   - All route methods, table counts, port numbers, Git SHAs, and dependency versions
     verified consistent across §1, §2, §5, §6, §7, and §8

### Corrections Applied in v1.0.2

The following issues identified by the 2026-09-11 implementation-readiness audit are resolved:

1. **RC-1 — Clerk build-time injection**: Added `ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` /
   `ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}` to the
   Task 10-B Dockerfile specification before `RUN npm run build --workspace=apps/web`.
   Added explanation of why this variable must be a build-time argument, not a runtime variable.

2. **RC-2 — GitHub Actions Clerk build-arg mapping**: Task 10-F now explicitly maps
   the GitHub secret `CLERK_PUBLISHABLE_KEY` to the Docker build argument
   `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` via `--build-arg` in the `docker build` step.
   The intentional naming difference (secret omits the `NEXT_PUBLIC_` prefix; build arg
   must include it) is documented.

3. **RC-3 — Billing route method corrections**:
   - §1.7 route table: `/api/billing/checkout` corrected from GET to **POST**;
     `/api/billing/portal` corrected from GET to **POST**
   - §2.1 Phase 8 task description: `portal session (GET /api/billing/portal)`
     corrected to `POST /api/billing/portal`

4. **RC-4 — `.dockerignore` added to D-6 scope**: Decision D-6 now explicitly covers
   creation of both the `Dockerfile` and the `.dockerignore`. No new D-9 decision was
   created for `.dockerignore`. Task 10-B now includes a complete `.dockerignore`
   specification with rationale for each exclusion.

5. **RC-5 — Task 10-N added**: A complete Rollback and Recovery task (10-N) was added
   covering deployment failure criteria, container rollback procedure (using immutable
   image tags), database rollback scope (correctly describes idempotent DDL; distinguishes
   from future migration needs), and recovery verification checklist. Task 10-N was added
   to §5, §6, §7, and §8.

6. **RC-6 — `packages/` directory resolved**: Direct inspection confirmed that the root
   `package.json` declares `"workspaces": ["apps/*", "packages/*"]` and that
   `apps/web/package.json` depends on `@flavour-find/types: 0.1.0` (a local workspace
   package). The `packages/` directory must exist in the repository to host this package.
   The `COPY packages/ ./packages/` line is retained in the Dockerfile specification and
   documented with a rationale comment.

7. **RC-7 — Caddy SSE flushing mandatory**: `flush_interval -1` is now part of the
   required Task 10-D Caddyfile specification (not an optional recommendation). Rationale
   explicitly documented: `X-Accel-Buffering: no` is nginx-specific; Caddy requires
   `flush_interval -1` to avoid buffering SSE responses. AC-D7 added to verify SSE
   streaming through Caddy end-to-end.

8. **RC-8 — PostgreSQL SSL configuration documented**: §1.5 and §10 now note that
   `database.js` uses `ssl: { rejectUnauthorized: false }`. Documented accurately as a
   security consideration requiring human review; no unsupported claims about Neon behavior;
   no change authorized.

9. **D-9 (Registry decision) added**: The choice between DigitalOcean Container Registry
   and Docker Hub is now a formal human decision gate (D-9). Task 10-E and Task 10-F
   use `<registry>` as a placeholder pending D-9. Operational implications of each
   choice are documented.

10. **Build-time vs. runtime variable classification**: §1.6 now includes a complete
    classification table distinguishing build-time variables (`NEXT_PUBLIC_*`) from
    runtime server-side secrets. The critical constraint — that GitHub secrets do not
    automatically become container environment variables — is explicitly stated.

11. **Container registry strategy and image tagging**: Task 10-F now specifies immutable
    Git SHA image tags, a mutable `latest` tag, how to record the previous known-good image
    tag before deployment, and how the Droplet obtains pull access from the registry.

12. **Runtime secret injection**: Task 10-F now includes a conceptual `docker run` example
    showing explicit `-e` flag injection of all runtime secrets. The requirement that
    runtime secrets never enter image layers is stated explicitly.

13. **Intermediate git governance gates**: §8 now defines five named governance gates
    (A through E) covering pre-implementation baseline, pre-database-initialization,
    pre-deployment, pre-Stripe-live, and final checkpoint. Separate human authorization
    for commit, tag, and push is preserved.

14. **Sentry initialization ordering**: Task 10-J now explicitly specifies that Sentry
    initialization must occur immediately after `require('dotenv').config()` (not before
    it), with a rationale comment. "Before all other imports" is clarified to mean
    "after dotenv, before all other application imports."

15. **Database seeding clarification**: Task 10-H now correctly states that `node database.js`
    performs schema initialization and guarded automatic seeding. No separate seed command
    is required.

16. **`trailingSlash: true` documented**: §1.3 now notes that `apps/web/next.config.ts`
    sets `trailingSlash: true` alongside `output: 'export'`.

---

## §12. Document Creation Custody Attestation

This section attests to the governance constraints observed during the creation and correction
of this document. It is a documentation-only attestation and does not constitute
implementation authorization for any task described in this document.

### v1.0.2 Creation Attestation (2026-09-11)

Attests to governance observed during the v1.0.2 creation pass:

| Category | Result |
|----------|--------|
| Dependencies installed | **NONE** |
| Application source code modified | **NONE** |
| `package.json` or `package-lock.json` modified | **NONE** |
| Infrastructure changed | **NONE** |
| Production configuration changed | **NONE** |
| Stripe live configuration changed | **NONE** |
| Neon production configuration changed | **NONE** |
| Commits created | **NONE** |
| Tags created | **NONE** |
| Pushes performed | **NONE** |
| Files created or modified | **`phase10_plan_3.md` only** |

The predecessor document `phase10_plan_2.md` v1.0.1 was not deleted or overwritten.

### v1.0.3 Correction Attestation (2026-09-11)

Attests to governance observed during the v1.0.3 correction pass (RC-9 through RC-13):

| Category | Result |
|----------|--------|
| Dependencies installed | **NONE** |
| Application source code modified | **NONE** |
| `package.json` or `package-lock.json` modified | **NONE** |
| Infrastructure changed | **NONE** |
| Production configuration changed | **NONE** |
| Stripe live configuration changed | **NONE** |
| Neon production configuration changed | **NONE** |
| Commits created | **NONE** |
| Tags created | **NONE** |
| Pushes performed | **NONE** |
| Files created or modified | **`phase10_plan_3.md` only** |

**Corrections applied in this pass**:

- **RC-9**: Schema provenance attributed to Phase 8 Task 8-A (CASE B — human-approved). No
  table names or counts changed. `phase8_plan_1_4.md` Appendix B read to confirm.
- **RC-10**: AC-L3 made explicitly conditional on production `CORS_ORIGIN` being configured.
  AC-L4 updated with corresponding caveat.
- **RC-11**: Task 10-N rollback runtime configuration placeholder replaced with explicit
  governance guidance. RV-9, AC-N5 (expanded), and AC-N6 added.
- **RC-12**: Task 10-K PostHog D-4 late-authorization scope clarification added. AC-K4
  added. §7 AC Summary updated to reference AC-K1–AC-K4 and AC-N1–AC-N6.
- **RC-13**: Cross-document consistency audit completed. Two stale v1.0.2 references
  (Gate A, §8.2 attestation template) corrected to v1.0.3. No other stale references found.

**Research performed during this pass** (read-only; no repository files modified):
- `phase8_plan_1_4.md` staged from device and read to determine schema provenance (CASE B)
- All corrections applied exclusively to `phase10_plan_3.md`

The predecessor document `phase10_plan_2.md` v1.0.1 was not deleted or overwritten.
Document status remains: **PROPOSED — AWAITING HUMAN REVIEW AND EXPLICIT IMPLEMENTATION AUTHORIZATION**

### v1.0.4 Correction Attestation (2026-09-11)

Attests to governance observed during the v1.0.4 correction pass (RC-14):

| Category | Result |
|----------|--------|
| Dependencies installed | **NONE** |
| Application source code modified | **NONE** |
| `package.json` or `package-lock.json` modified | **NONE** |
| Infrastructure changed | **NONE** |
| Production configuration changed | **NONE** |
| Stripe live configuration changed | **NONE** |
| Neon production configuration changed | **NONE** |
| Commits created | **NONE** |
| Tags created | **NONE** |
| Pushes performed | **NONE** |
| Files created or modified | **`phase10_plan_3.md` only** |

**Corrections applied in this pass**:

- **RC-14**: §2.1 Phase 8 task attribution corrected. Task 8-A billing route attribution
  removed; webhook `checkout.session.completed` removed (server.js does not handle it);
  tier-aware rate limiting re-attributed from Task 8-C to Task 8-B; `PREMIUM_ENTITLED_STATUSES`
  re-attributed from Task 8-D to Task 8-B; Task 8-D Playwright E2E description added.
  All corrections verified against read-only staging of `server.js` and `phase8_plan_1_4.md`.

**Research performed during this pass** (read-only; no repository files modified):
- `server.js` staged from device (read-only) to verify webhook handler events and route
  placement; lines 52, 91–157, 430, 482, 517–520, 550–559 inspected.
- `phase8_plan_1_4.md` staged from device (read-only) to verify Task 8-A/8-B/8-C/8-D
  scope boundaries; §§194, 556, 665, 789, 830 inspected.

**Out-of-scope finding identified but NOT corrected in this pass**:
- Task 10-G (§10, Stripe Dashboard configuration) lists `checkout.session.completed` in
  the webhook events to subscribe. The committed `server.js` does not handle this event.
  This finding is outside §2.1 scope and was not corrected in this pass. A separate
  correction pass with explicit human authorization is required to address it.

The predecessor document `phase10_plan_2.md` v1.0.1 was not deleted or overwritten.
Document status remains: **PROPOSED — AWAITING HUMAN REVIEW AND EXPLICIT IMPLEMENTATION AUTHORIZATION**

### v1.0.5 Correction Attestation (2026-09-11)

Attests to governance observed during the v1.0.5 correction pass (RC-15):

| Category | Result |
|----------|--------|
| Dependencies installed | **NONE** |
| Application source code modified (`server.js`, `database.js`, etc.) | **NONE** |
| `package.json` or `package-lock.json` modified | **NONE** |
| Tests modified | **NONE** |
| Infrastructure changed | **NONE** |
| Production configuration changed | **NONE** |
| Stripe implementation modified | **NONE** |
| Stripe Dashboard modified | **NONE** |
| Neon modified | **NONE** |
| Sentry modified | **NONE** |
| PostHog modified | **NONE** |
| Environment configuration (`.env`, `.env.example`) modified | **NONE** |
| Database migration performed | **NONE** |
| Production change | **NONE** |
| Commits created | **NONE** |
| Tags created | **NONE** |
| Pushes performed | **NONE** |
| Files created or modified | **`phase10_plan_3.md` only** |

**Correction applied in this pass**:

- **RC-15**: Task 10-G webhook event subscription list corrected. Removed
  `checkout.session.completed` (not handled by `server.js`); added
  `customer.subscription.created` (handled by `server.js` line 109, omitted in error).
  Clarifying note added to Task 10-G. No application code, Stripe configuration, or
  Stripe Dashboard was modified.

**Research performed during this pass** (read-only; no repository files modified):
- `server.js` read from prior session staging to verify webhook handler lines 108–111.
- `phase8_plan_1_4.md` read from prior session staging to confirm `checkout.session.completed`
  was never part of the Phase 8 billing design.

The predecessor document `phase10_plan_2.md` v1.0.1 was not deleted or overwritten.
Document status remains: **PROPOSED — AWAITING HUMAN REVIEW AND EXPLICIT IMPLEMENTATION AUTHORIZATION**

### v1.0.6 Correction Attestation (2026-09-11)

Attests to governance observed during the v1.0.6 correction pass (RC-16):

| Category | Result |
|----------|--------|
| Application source code modified | **NONE** |
| Infrastructure configuration changed by Claude CLI | **NONE** |
| Database or Stripe configuration modified | **NONE** |
| GitHub Actions workflow created or modified | **NONE** (`.github/workflows/` does not exist) |
| GitHub secret created or modified by Claude CLI | **NONE** — `DROPLET_HOST` existence and value were human-confirmed only; not retrieved, displayed, or altered |
| DigitalOcean configuration changed by Claude CLI | **NONE** — Droplet, Reserved IP, firewall, and backups were independently provisioned and confirmed by the human |
| Packages installed | **NONE** |
| Commits created | **NONE** |
| Tags created | **NONE** |
| Pushes performed | **NONE** |
| Files created or modified | **`phase10_plan_3.md` only** |

**Correction applied in this pass**: RC-16 — see "Corrections Applied in v1.0.6" above.

**Human-confirmed external facts recorded in this correction** (independently provisioned
and confirmed by the human; not independently verified via DigitalOcean or GitHub API/CLI
access by Claude CLI):
- Droplet `flavourfind-api-prod` — TOR1, 1 vCPU / 2 GB RAM / 70 GB NVMe SSD / 2 TB transfer,
  Ubuntu 24.04 LTS x64.
- Reserved IPv4: `146.190.189.242`, assigned to `flavourfind-api-prod`.
- GitHub repository secret `DROPLET_HOST` exists; human-confirmed configured value
  `146.190.189.242` (value not retrieved or displayed by Claude CLI).
- SSH access confirmed by the human via
  `ssh -i ~/.ssh/flavourfind_api_prod root@159.89.127.34`, reaching
  `root@flavourfind-api-prod:~#`.
- Cloud Firewall `flavourfind-api-prod-firewall`: inbound TCP 22/80/443 (all IPv4 + all
  IPv6) allowed, all other inbound denied, outbound allowed; automated weekly backups
  enabled.

**Git state at time of this correction**:
- Current HEAD: `c366af0bc9d32c7ee4ae047ee2f0280b9944af0f`
- `phase10_plan_3.md` remains untracked (unless a later session's `git status` shows
  otherwise, in which case this attestation does not override that observed state)
- No commit, tag, or push was performed as part of this correction

The predecessor document `phase10_plan_2.md` v1.0.1 was not deleted or overwritten. This
correction did not alter, conceal, or reinterpret the historical fact that v1.0.5 and
earlier originally specified Ubuntu 22.04 LTS and 2 vCPU / 4 GB RAM for Task 10-A; that
history is preserved in the "Corrections Applied in v1.0.6" narrative above and in the
unmodified v1.0.0–v1.0.5 version-history entries.

Document status remains: **PROPOSED — AWAITING HUMAN REVIEW AND EXPLICIT IMPLEMENTATION AUTHORIZATION**.
Task 10-A is documented as ACCEPTED (see §5, Task 10-A, "10-A Acceptance State"). **Phase
10-B is NOT authorized.** Commit, tag, and push authorization remain separately
unauthorized.

### v1.0.7 Correction Attestation (2026-09-12)

Attests to governance observed during the v1.0.7 correction pass (RC-17):

| Category | Result |
|----------|--------|
| Application source code modified | **NONE** |
| Infrastructure configuration changed by Claude CLI | **NONE** |
| Database or Stripe configuration modified | **NONE** |
| GitHub Actions workflow created or modified | **NONE** (`.github/workflows/` does not exist) |
| GitHub secret created or modified by Claude CLI | **NONE** |
| DigitalOcean configuration changed by Claude CLI | **NONE** |
| Packages installed | **NONE** |
| Commits created | **NONE** |
| Tags created | **NONE** |
| Pushes performed | **NONE** |
| Files created or modified | **`phase10_plan_3.md` only** |

**Correction applied in this pass**: RC-17 — governance-language reconciliation only (see
"Corrections Applied in v1.0.7" above for RC-17a/b/c). No infrastructure metadata was
added, removed, or altered by this pass. The historical Reserved IP `146.190.189.242` and
the surrounding v1.0.6 custody attestation above were read and confirmed unchanged; they
are preserved exactly as recorded in v1.0.6. This correction did not weaken any security
requirement: secrets, credentials, API keys, tokens, passwords, connection strings
containing credentials, and private keys remain absolutely prohibited from any committed
file. Task 10-B's technical specification was not modified, and Task 10-B remains **NOT
authorized**. No later Phase 10 task was authorized by this correction.

**Git state at time of this correction**:
- Current HEAD: `c366af0bc9d32c7ee4ae047ee2f0280b9944af0f`
- `phase10_plan_3.md` remains untracked (unless a later session's `git status` shows
  otherwise, in which case this attestation does not override that observed state)
- No commit, tag, or push was performed as part of this correction

Document status remains: **PROPOSED — AWAITING HUMAN REVIEW AND EXPLICIT IMPLEMENTATION AUTHORIZATION**.
Task 10-A is documented as ACCEPTED (see §5, Task 10-A, "10-A Acceptance State"). **Phase
10-B is NOT authorized.** Commit, tag, and push authorization remain separately
unauthorized.

### v1.0.8 Correction Attestation (2026-09-12)

Attests to governance observed during the v1.0.8 correction pass (RC-18):

| Category | Result |
|----------|--------|
| Application source code modified | **NONE** |
| Infrastructure configuration changed by Claude CLI | **NONE** |
| Database or Stripe configuration modified | **NONE** |
| GitHub Actions workflow created or modified | **NONE** (`.github/workflows/` does not exist) |
| GitHub secret created or modified by Claude CLI | **NONE** |
| DigitalOcean configuration changed by Claude CLI | **NONE** |
| Packages installed | **NONE** |
| Commits created | **NONE** |
| Tags created | **NONE** |
| Pushes performed | **NONE** |
| Files created or modified | **`phase10_plan_3.md` only** |

**Correction applied in this pass**: RC-18 — corrected the stale live §8.2 Checkpoint
Attestation Template document-version reference from v1.0.3 to v1.0.8 (see "Corrections
Applied in v1.0.8" above). No infrastructure metadata, historical fact, or
acceptance/authorization state was added, removed, or altered by this pass. The historical
Reserved IP `146.190.189.242`, the v1.0.6 custody attestation, and the v1.0.7 correction
attestation above were read and confirmed unchanged. This correction did not weaken any
security requirement. Task 10-B's technical specification was not modified, and Task 10-B
remains **NOT authorized**. No later Phase 10 task was authorized by this correction.

**Git state at time of this correction**:
- Current HEAD: `c366af0bc9d32c7ee4ae047ee2f0280b9944af0f`
- `phase10_plan_3.md` remains untracked (unless a later session's `git status` shows
  otherwise, in which case this attestation does not override that observed state)
- No commit, tag, or push was performed as part of this correction

Document status remains: **PROPOSED — AWAITING HUMAN REVIEW AND EXPLICIT IMPLEMENTATION AUTHORIZATION**.
Task 10-A is documented as ACCEPTED (see §5, Task 10-A, "10-A Acceptance State"). **Phase
10-B is NOT authorized.** Commit, tag, and push authorization remain separately
unauthorized.

### v1.0.9 Correction Attestation (2026-09-12)

Attests to governance observed during the v1.0.9 correction pass (RC-19):

| Category | Result |
|----------|--------|
| Application source code modified | **NONE** |
| Infrastructure configuration changed by Claude CLI | **NONE** |
| Database or Stripe configuration modified | **NONE** |
| GitHub Actions workflow created or modified | **NONE** (`.github/workflows/` does not exist) |
| GitHub secret created or modified by Claude CLI | **NONE** |
| DigitalOcean configuration changed by Claude CLI | **NONE** |
| Packages installed | **NONE** |
| Commits created | **NONE** |
| Tags created | **NONE** |
| Pushes performed | **NONE** |
| Files created or modified | **`phase10_plan_3.md` only** |

**Correction applied in this pass**: RC-19 — corrected the stale live §8.1 Gate A
authoritative-version reference from v1.0.7 to v1.0.9 (see "Corrections Applied in v1.0.9"
above). No infrastructure metadata, historical fact, or acceptance/authorization state was
added, removed, or altered by this pass. The historical Reserved IP `146.190.189.242`, and
the v1.0.6, v1.0.7, and v1.0.8 correction attestations above, were read and confirmed
unchanged. The §10 Security Attestation and AC-GOV-3 language established by RC-17 were
read and confirmed unchanged. This correction did not weaken any security requirement.
Task 10-B's technical specification was not modified, and Task 10-B remains **NOT
authorized**. No later Phase 10 task was authorized by this correction.

**Git state at time of this correction**:
- Current HEAD: `c366af0bc9d32c7ee4ae047ee2f0280b9944af0f`
- `phase10_plan_3.md` remains untracked (unless a later session's `git status` shows
  otherwise, in which case this attestation does not override that observed state)
- No commit, tag, or push was performed as part of this correction

Document status remains: **PROPOSED — AWAITING HUMAN REVIEW AND EXPLICIT IMPLEMENTATION AUTHORIZATION**.
Task 10-A is documented as ACCEPTED (see §5, Task 10-A, "10-A Acceptance State"). **Phase
10-B is NOT authorized.** Commit, tag, and push authorization remain separately
unauthorized.

### v1.0.10 Correction Attestation (2026-09-13)

Attests to governance observed during the v1.0.10 correction pass (RC-20):

| Category | Result |
|----------|--------|
| Application source code modified | **NONE** |
| `Dockerfile` modified | **NONE** — read-only inspection only |
| `.dockerignore` modified | **NONE** — read-only inspection only |
| `package.json` or `package-lock.json` modified | **NONE** |
| Infrastructure changed | **NONE** |
| Docker build performed | **NONE** |
| Docker container run | **NONE** |
| PostgreSQL verification performed | **NONE** |
| AC-B2 / AC-B3 / AC-B4 / AC-B7 verification performed | **NONE** |
| AC-B6 attempted or production Clerk key used/exposed | **NONE** |
| Production configuration changed | **NONE** |
| Stripe live configuration changed | **NONE** |
| Neon production configuration changed | **NONE** |
| GitHub secret or workflow created/modified | **NONE** |
| Commits created | **NONE** |
| Tags created | **NONE** |
| Pushes performed | **NONE** |
| Files created or modified | **`phase10_plan_3.md` only** |

**Human governance decision recorded by this pass**: On 2026-09-13, the human made an explicit,
present-day decision to adopt the already-existing `Dockerfile` and `.dockerignore` as the
current Task 10-B implementation artifacts (Decision D-6, artifact-adoption boundary only). This
attestation records that decision; it does not itself grant any further authorization beyond
what the human stated. The human was explicit that this is **not** a retroactive authorization
of the files' original 2026-09-12 creation, and no such retroactive claim is made anywhere in
this pass. The original 2026-09-12 authorization record remains unrecovered, and that gap is
preserved as an open, unresolved fact — not resolved, not dismissed, and not reconstructed.

**What this pass explicitly did NOT authorize or perform**: Docker build verification; Docker
runtime verification; disposable PostgreSQL verification; AC-B2, AC-B3, AC-B4, or AC-B7
verification; AC-B6 (which remains separately gated pending its own future explicit human
authorization involving the production Clerk publishable key); Task 10-B acceptance; Task 10-C
or any later Phase 10 task; production infrastructure, Neon, or Stripe live-mode access; or any
commit, tag, or push.

**Git state at time of this correction**:
- Current HEAD: `c366af0bc9d32c7ee4ae047ee2f0280b9944af0f`
- `phase10_plan_3.md`, `Dockerfile`, and `.dockerignore` all remain untracked (unless a later
  session's `git status` shows otherwise, in which case this attestation does not override that
  observed state)
- No commit, tag, or push was performed as part of this correction

Document status remains: **PROPOSED — AWAITING HUMAN REVIEW AND EXPLICIT IMPLEMENTATION
AUTHORIZATION**. Task 10-A is documented as ACCEPTED. **Decision D-6 is documented as AUTHORIZED
effective 2026-09-13, for the artifact-adoption boundary only** (see §4 "D-6 current status").
**Task 10-B verification and Task 10-B acceptance remain NOT authorized.** Task 10-C and all
later Phase 10 tasks remain NOT authorized. Commit, tag, and push authorization remain
separately unauthorized.

### v1.0.10 Baseline Acceptance (2026-09-13)

The human has reviewed the complete v1.0.10 document and accepts **v1.0.10 as the current
Phase 10 governance baseline**, including the governance reconciliation it documents concerning
Task 10-B and the unresolved 2026-09-12 authorization provenance. This acceptance is recorded
as:

1. v1.0.10 is accepted as the current authoritative Phase 10 planning and governance document.
2. The 2026-09-13 present-day adoption of the existing `Dockerfile` and `.dockerignore` is
   accepted as documented in §4 ("D-6 current status"), Task 10-B, §11 (RC-20), and the
   v1.0.10 Correction Attestation above.
3. No retroactive claim is made, or accepted, that Task 10-B was authorized on 2026-09-12; that
   provenance remains explicitly unresolved.
4. The historical v1.0.1 through v1.0.9 record remains preserved and is not reopened by this
   acceptance.
5. Task 10-B as a whole remains **NOT ACCEPTED**.
6. Docker build verification remains **unauthorized**.
7. Docker runtime verification remains **unauthorized**.
8. PostgreSQL verification remains **unauthorized**.
9. AC-B2, AC-B3, AC-B4, and AC-B7 remain **unauthorized**.
10. AC-B6 remains **separately unauthorized** and requires its own explicit future human
    authorization before any production Clerk credential or production authentication
    configuration is used.
11. Task 10-C and every later Phase 10 task remain **unauthorized** unless separately authorized.
12. Commit, tag, and push remain **separately unauthorized**.

This acceptance record does not itself authorize implementation, verification, AC-B6, production
credential use, or any commit, tag, or push. Those each remain separate, future, explicit human
decisions.

### v1.0.11 AC-B6 Verification-Method Correction Note (2026-09-14)

This is a documentation-only correction (RC-21, see §11 v1.0.11) to AC-B6's verification method,
made under explicit human authorization scoped strictly to that documentation correction. It:

- Changed AC-B6's required verification method from a running-container/browser-devtools check
  to direct inspection of the static assets produced by an actual `docker build --build-arg
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...` invocation, removing the incidental PostgreSQL/running-
  container dependency.
- Did **not** change AC-B6's substantive requirement: `pk_live_...` must be present and
  `pk_test_...` must be absent, with redacted-only reporting.
- Did **not** treat any prior local-build evidence (e.g., the `npm run build --workspace=apps/web`
  result discussed earlier in this document's history) as satisfying AC-B6 — the corrected
  wording explicitly excludes that.
- Did **not** perform, and does not authorize, any Docker build, container run, PostgreSQL setup,
  or credential inspection.
- Did **not** mark AC-B6 as PASS, FAIL, or otherwise verified. AC-B6 remains unverified.
- Did **not** change Task 10-B's acceptance status. **Task 10-B as a whole remains NOT ACCEPTED.**
- Did **not** authorize Task 10-C or any later Phase 10 task.
- Did **not** commit, tag, or push. `phase10_plan_3.md` remains untracked, as do `Dockerfile`
  and `.dockerignore`.
- Did **not** alter any v1.0.2–v1.0.10 historical attestation; all are preserved unchanged above.

**Forward-looking note (added in v1.0.12, does not alter the historical record above)**: The
substantive requirement described in this note ("`pk_live_...` must be present and `pk_test_...`
must be absent") was subsequently found to be a defective literal-substring test and was
corrected — not by this note, but prospectively — by RC-22/v1.0.12. See the "v1.0.12 AC-B6 /
AC-GOV-7 Substantive Correction Note" immediately below and §11 v1.0.12. This note's description
of what RC-21 did in 2026-09-14 remains historically accurate and unchanged.

### v1.0.12 AC-B6 / AC-GOV-7 Substantive Correction Note (2026-09-15)

This is a documentation-only correction (RC-22, see §11 v1.0.12) to the substantive credential
definition underlying AC-B6 and AC-GOV-7, made under explicit human authorization scoped
strictly to that documentation correction (Authorization Act #1 only). It:

- Replaced the v1.0.11/RC-21 literal-substring test ("`pk_live_...` present, `pk_test_...`
  absent") with a structural test based on Clerk's documented publishable-key format
  (`pk_<test|live>_<base64(FAPI-hostname + "$")>`; see Clerk, "Refactoring our frontend API
  key," https://clerk.com/blog/refactoring-our-api-keys), distinguishing a bare SDK/reference
  literal (e.g., the `@clerk/shared` prefix constant or error-message text) from a
  credential-structured value.
- Corrected two defects in the prior wording: a false-FAIL risk (legitimate SDK code containing
  the bare `pk_test_` prefix would fail the literal test) and a false-PASS risk (an SDK
  error-message fragment containing `pk_live_` could satisfy the literal test without a real
  production key having been supplied to the build).
- Retained the v1.0.11/RC-21 verification method unchanged: Docker build + `docker create`/
  `docker cp` static-asset extraction; no running container; no PostgreSQL connectivity.
- Added an explicit **INCONCLUSIVE** outcome for ambiguous occurrences, so that an unclassifiable
  case is escalated for human review rather than defaulted to PASS.
- Corrected AC-GOV-7 to use the same structural test and the same evidence as AC-B6, rather than
  restating the same defective literal-substring rule as a second, independent criterion.
- Did **not** perform, and does not authorize, any Docker build, container run, PostgreSQL setup,
  or credential inspection.
- Did **not** mark AC-B6 as PASS, FAIL, or INCONCLUSIVE. AC-B6 remains **NOT FORMALLY VERIFIED**.
- Did **not** retroactively reclassify the earlier human-run Docker evidence (which found
  `pk_live_` in two static chunks and `pk_test_` in one, at
  `_next/static/chunks/739-08d0e2931b2fd855.js`, under the v1.0.11 criterion) as a PASS, FAIL, or
  otherwise-resolved outcome under v1.0.11 or v1.0.12. That evidence remains historical evidence
  only, generated under a criterion that has since been superseded; it did not exercise the
  structural classification this note introduces, since the matched substring was not retained.
- Did **not** change Task 10-B's acceptance status. **Task 10-B as a whole remains NOT ACCEPTED.**
- Did **not** authorize Task 10-C or any later Phase 10 task.
- Did **not** adopt v1.0.12 as the new authoritative Phase 10 baseline. v1.0.12 is **PROPOSED**,
  pending a separate human baseline-approval decision.
- Did **not** commit, tag, or push. `phase10_plan_3.md` remains untracked, as do `Dockerfile`
  and `.dockerignore`. No other repository file was modified, including the pre-existing,
  unrelated Phase 8 Stripe working-tree changes.
- Did **not** alter any v1.0.2–v1.0.11 historical attestation; all are preserved unchanged above.

**Forward-looking note (added upon Act #2 baseline approval, does not alter the historical record
above)**: This note's statement that v1.0.12 had not yet been adopted as the authoritative Phase
10 baseline was accurate as of this documentation correction (Authorization Act #1, 2026-09-15).
v1.0.12 was subsequently approved as the authoritative Phase 10 planning baseline by a separate,
explicit human decision (Authorization Act #2, 2026-09-15). See the "v1.0.12 Baseline Acceptance"
note immediately below.

### v1.0.12 Baseline Acceptance (2026-09-15)

The human has reviewed the completed Act #2 baseline-approval readiness review (which concluded
READY FOR HUMAN BASELINE APPROVAL) and explicitly approves **v1.0.12 as the new authoritative
Phase 10 governance baseline**, replacing v1.0.11. This acceptance is recorded as:

1. v1.0.12 is approved as the current authoritative Phase 10 planning and governance document,
   superseding v1.0.11.
2. v1.0.11 remains preserved as the historical predecessor baseline; its content is not rewritten,
   reinterpreted, or reopened by this approval.
3. RC-21 remains historical. RC-22 is part of the authoritative v1.0.12 correction history.
4. The corrected v1.0.12 AC-B6 definition (structural credential test distinguishing an SDK/
   reference literal from a credential-structured value) is now the authoritative AC-B6
   acceptance criterion; the v1.0.11 literal-substring wording is no longer the active criterion.
   The corrected AC-GOV-7 definition is likewise now authoritative.
5. This baseline approval does **not** constitute, and must not be interpreted as, an AC-B6 PASS,
   FAIL, or INCONCLUSIVE determination.
6. This baseline approval does **not** accept Task 10-B. **Task 10-B as a whole remains NOT
   ACCEPTED.**
7. **AC-B6 remains NOT FORMALLY VERIFIED** and requires its own separate, explicit future human
   authorization and a fresh verification performed under the corrected criterion; no prior
   evidence (including the earlier human-run Docker evidence discussed in §12's v1.0.11 note) is
   retroactively reclassified as PASS, FAIL, or INCONCLUSIVE by this approval.
8. Task 10-C and every later Phase 10 task remain **unauthorized** unless separately authorized.
9. Docker build, Docker runtime verification, application/infrastructure implementation, and
   commit, tag, and push remain **separately unauthorized**.
10. No work performed before this approval — by this document, by any prior review, or otherwise
    — is retroactively authorized by this approval.

This acceptance record does not itself authorize AC-B6 verification, Task 10-B acceptance,
implementation, or any commit, tag, or push. Those each remain separate, future, explicit human
decisions.

**Forward-looking note (added upon Act #3 verification, does not alter the historical record
above)**: Item 7's statement that AC-B6 remained NOT FORMALLY VERIFIED, and required its own
separate future authorization and fresh verification, was accurate as of this baseline-approval
record (Authorization Act #2, 2026-09-15). That separate authorization was subsequently granted
(Authorization Act #3, 2026-09-15), a fresh verification was performed and reviewed, and AC-B6 is
now recorded as PASS. See the "AC-B6 Verification Result — Authorization Act #3" note immediately
below.

### AC-B6 Verification Result — Authorization Act #3 (2026-09-15)

Under a separate, explicit human authorization (Authorization Act #3), a fresh verification of
AC-B6 was performed and its evidence formally reviewed against the authoritative v1.0.12
structural criterion (see AC-B6 in §5, Task 10-B). This record documents that result:

1. **Result: AC-B6 = PASS.**
2. **Methodology**: Per Act #3's governance design, the verification commands (Docker build,
   container creation, static-asset extraction, and grep-based structural search) were executed
   by the human operator, not by Claude — Claude did not run Docker, did not receive or handle
   the production Clerk publishable key, and did not decode any credential material. Claude's
   role was limited to reviewing the operator-reported command output for (a) compliance with the
   v1.0.12 structural test and (b) internal consistency of the build/image/container provenance
   chain (git commit, image ID, container-to-image linkage, and build timestamps).
3. **Provenance established**: fresh `docker build --no-cache` from repository HEAD
   `c366af0bc9d32c7ee4ae047ee2f0280b9944af0f`, using a uniquely timestamped image tag
   (`acb6-verify-20260915-153850-c366af0`) not reused from any prior attempt; the inspected
   container's image ID was confirmed to exactly match the newly built image's ID; the image's
   recorded creation timestamp fell within the session in which the build was requested.
4. **Structural findings**: at least one `pk_live_` occurrence in the extracted static assets was
   classified as a credential-structured value (prefix immediately followed by an uninterrupted
   Base64-alphabet run); zero `pk_test_` occurrences were classified as credential-structured.
   Bare (non-structural) `pk_test_`/`pk_live_` occurrences consistent with Clerk SDK reference
   literals were also observed and correctly excluded from the result per the criterion's own
   terms.
5. **Not performed and not claimed**: no semantic decoding of the matched Base64 run was
   performed or is claimed; the criterion does not require it and the evidence-handling rule
   forbids recording a decoded value. No complete or partial credential value, production or
   test, appears anywhere in this record or was disclosed at any point in the verification.
6. **Scope of this result**: this record establishes **AC-B6 only**. AC-B1, AC-B2, AC-B3, AC-B4,
   AC-B5, and AC-B7 remain unverified and are not addressed by this Act. **Task 10-B as a whole
   remains NOT ACCEPTED** and requires its own separate, explicit future authorization and
   acceptance review covering all remaining AC-B criteria.
7. Did **not** authorize Task 10-C or any later Phase 10 task.
8. Did **not** commit, tag, or push. `phase10_plan_3.md` remains untracked, as do `Dockerfile`
   and `.dockerignore`. No other repository file was modified, including the pre-existing,
   unrelated Phase 8 Stripe working-tree changes.
9. Did **not** alter the AC-B6 acceptance criterion's substantive wording, RC-21, or RC-22; all
   are preserved unchanged above. This record only adds the result of applying that unchanged
   criterion.

### AC-B1 Human Interpretation and Documentation Record — Authorization Act #7 (2026-09-16)

A read-only investigation (Authorization Act #6) established the following facts from repository
evidence: `Dockerfile` and `.dockerignore` were absent from a dated 2026-09-11 snapshot of this
planning document; their filesystem timestamps place their creation on 2026-09-12; neither file
has ever appeared in Git history (across every commit and ref); and no authorization record for
that 2026-09-12 creation exists anywhere in the repository. Act #6 concluded this gap is not
resolvable by further investigation and identified that AC-B1's phrase "authorized by D-6" admits
two readings: (A) requiring proof that D-6 authorized the original creation — permanently
unsatisfiable, since no such record can be recovered — or (B) satisfied by D-6's documented
2026-09-13 artifact-adoption decision, which currently authorizes `Dockerfile` and `.dockerignore`
as the governed Task 10-B artifacts, independent of the circumstances of their original creation.

Under a separate, explicit human authorization (Authorization Act #7), the human governing this
Phase 10 process selected **Reading B**. This record documents that decision:

1. **Human decision**: AC-B1's "authorized by D-6" requirement is interpreted to mean current
   governed-artifact adoption by D-6, not proof of authorization for the original 2026-09-12
   creation.
2. **Result: AC-B1 = PASS.** Basis: both artifacts exist; D-6 was explicitly exercised
   (2026-09-13) to adopt them as the governed Task 10-B artifacts; under the selected
   interpretation, that adoption satisfies AC-B1's operative requirement.
3. **No retroactive authorization**: this decision does **not** authorize, and does not claim to
   authorize, the original 2026-09-12 creation. That creation's authorization record remains
   **unrecovered** — this historical fact is preserved, unchanged, in the "Current authorization
   status (v1.0.10, as of 2026-09-13)" paragraph (§5, Task 10-B) and in §12's prior attestations.
   No historical text describing that gap was rewritten, concealed, or reinterpreted by this Act.
4. **Scope of this result**: this record establishes **AC-B1 only**. AC-B2, AC-B3, AC-B4, and
   AC-B7 remain **INCONCLUSIVE / NOT VERIFIED**, pending separately authorized Docker/container
   execution. AC-B5 remains **unverified** (no Authorization Act has evaluated it — this is
   distinct from AC-B6, which had already reached **PASS** via Authorization Act #3, 2026-09-15);
   both are unaffected by this Act. *(Corrected in v1.0.16, Authorization Act #12: this item
   previously misstated "AC-B5 and AC-B6 remain PASS," incorrectly implying AC-B5 had PASS
   evidence as of this Act #7 record. AC-B5 has never been evaluated by any Authorization Act,
   including this one; only AC-B6 had PASS evidence at this point. See §11 "Corrections Applied
   in v1.0.16" for the full correction record.)* **Task 10-B as a whole remains NOT ACCEPTED** and
   requires its own separate, explicit future authorization and acceptance review once the
   remaining criteria are resolved.

   **Forward-looking note (added upon Acts #8/#9 verification, does not alter the historical record
   above)**: This item's statement that AC-B2 and AC-B7 remained INCONCLUSIVE / NOT VERIFIED was
   accurate as of this Act #7 record (2026-09-16). Separate authorizations were subsequently
   granted for each: Authorization Act #8 performed a fresh AC-B7 verification, and Authorization
   Act #9 performed a fresh AC-B2 verification. Both are now recorded as **PASS**. See "AC-B7
   Verification Result — Authorization Act #8" and "AC-B2 Verification Result — Authorization Act
   #9" immediately below. AC-B3 and AC-B4 remain **INCONCLUSIVE / NOT VERIFIED** exactly as stated
   above; this note does not affect them. **Task 10-B as a whole remains NOT ACCEPTED.**
5. Did **not** authorize any Docker build, container run, or credential inspection.
6. Did **not** authorize Task 10-C or any later Phase 10 task.
7. Did **not** commit, tag, or push. `phase10_plan_3.md` remains untracked, as do `Dockerfile`
   and `.dockerignore`. No other repository file was modified, including the pre-existing,
   unrelated Phase 8 Stripe working-tree changes.
8. Did **not** alter AC-B2's, AC-B3's, AC-B4's, AC-B5's, AC-B6's, or AC-B7's substantive wording,
   nor any prior RC or custody record; all are preserved unchanged above. This record only adds
   the AC-B1 result reached by applying an explicit human interpretation to the unchanged
   criterion text.

### AC-B7 Verification Result — Authorization Act #8 (2026-09-16)

Under a separate, explicit human authorization (Authorization Act #8), a fresh verification of
AC-B7 was performed and its evidence formally reviewed. This record documents that result:

1. **Result: AC-B7 = PASS.**
2. **Methodology**: A fresh, uncached negative Docker build (`docker build --no-cache .`, no
   `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` build argument) was performed from repository HEAD
   `c366af0bc9d32c7ee4ae047ee2f0280b9944af0f`, tagged with a unique identifier
   (`task10b-acb7-verify-acb7-20260916-041154-c366af0`). Full build stdout/stderr was captured to
   a gitignored evidence log. The build completed with exit code 0. A container was then created
   from the image (never started) solely to extract its `/app/public` static assets via
   `docker cp`; the container was removed immediately after extraction.
3. **Search performed**: the extracted static assets were searched for every occurrence of
   `pk_live_` and `pk_test_`. Four occurrences were found, all within a single chunk file
   (`_next/static/chunks/739-08d0e2931b2fd855.js`).
4. **Structural classification**: each occurrence was inspected in its surrounding context. All
   four are bare SDK/reference literals — a prefix-classifier constant assignment (`eS="pk_live_"`),
   an error-message template (`Expected format: pk_test_... or pk_live_...`), and a
   `.startsWith("pk_test_")` check — none immediately followed by an uninterrupted Base64-alphabet
   run. **Zero occurrences classify as credential-structured values** of either prefix.
5. **Basis for PASS**: because no credential-structured `pk_test_` value was found, the local test
   key from `apps/web/.env.local` did not silently enter the build output, satisfying AC-B7's
   requirement as worded in §5, Task 10-B.
6. **Evidence retained**: the complete raw build output, extraction commands, and search evidence
   are preserved in the gitignored evidence log
   `task10b-acb7-verification-acb7-20260916-041154-c366af0.log`. No credential value, real or
   test, appears anywhere in that log or in this record.
7. **Scope of this result**: this record establishes **AC-B7 only**. AC-B3 and AC-B4 remain
   **INCONCLUSIVE / NOT VERIFIED** and are not addressed by this Act. **Task 10-B as a whole
   remains NOT ACCEPTED** and requires its own separate, explicit future authorization and
   acceptance review covering all remaining AC-B criteria.

   **Forward-looking note (added upon Act #10 verification, does not alter the historical record
   above)**: This item's statement that AC-B3 and AC-B4 remained INCONCLUSIVE / NOT VERIFIED was
   accurate as of this Act #8 record (2026-09-16). A separate authorization (Authorization Act #10)
   subsequently verified both together; see "AC-B3 / AC-B4 Verification Result — Authorization Act
   #10" below. AC-B5 remains unverified, unaffected by that Act. **Task 10-B as a whole remains NOT
   ACCEPTED.**
8. Did **not** start a container, perform GET `/`, test the webhook path, or perform any AC-B3/
   AC-B4 work.
9. Did **not** commit, tag, or push. `phase10_plan_3.md` remains untracked, as do `Dockerfile` and
   `.dockerignore`. No file other than the new evidence log was created or modified during this
   Act.
10. Did **not** alter the AC-B7 acceptance criterion's substantive wording or any prior RC or
    custody record; all are preserved unchanged above. This record only adds the result of applying
    the unchanged criterion.

### AC-B2 Verification Result — Authorization Act #9 (2026-09-16)

Under a separate, explicit human authorization (Authorization Act #9), a fresh verification of
AC-B2 was performed and its evidence formally reviewed. This record documents that result:

1. **Result: AC-B2 = PASS.**
2. **Methodology**: Per Act #9's governance design, the build itself was executed by the human
   operator in their own interactive terminal, not by Claude — Claude did not run the build
   command, did not receive or handle the production Clerk publishable key, and did not observe
   the key value at any point. Claude's role was limited to (a) providing the operator a script
   structure that captured build output to a gitignored log without recording the key, and (b)
   reading and reviewing the resulting raw evidence log directly from the shared filesystem after
   the operator ran it.
3. **Provenance established**: a fresh, uncached Docker build (`docker build --no-cache
   --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<production key> .`) was run from repository HEAD
   `c366af0bc9d32c7ee4ae047ee2f0280b9944af0f`, tagged with a unique identifier
   (`task10b-acb2-verify-acb2-20260916-092529-c366af0`). The raw captured output shows the
   repository's actual `Dockerfile` stages executing in order (`apk add`, the documented `COPY`
   sequence, `npm ci`, `next build` with a successful static export of 17 pages, `npm prune`, and
   image export), ending in `BUILD_EXIT_CODE=0`. Image tag, image ID
   (`sha256:20b2ff5c5e7fbeaa8d0d936f0eb98cc7448af946d992f5c8f969fb400bef99a8`), and creation
   timestamp (`2026-09-16T13:32:40.450766408Z`) were captured while the image existed; stage
   durations recorded in the log are consistent with the elapsed time between the log's start
   timestamp and the image's creation timestamp. The temporary image was removed immediately after
   this metadata was captured (confirmed by `Untagged`/`Deleted` lines in the log).
4. **Credential handling verified**: the evidence log was searched for `pk_live_`, `pk_test_`, and
   the build-arg pattern; the only match is the single redacted command-echo line the operator's
   script itself produced (`--build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<redacted>`). No
   credential value, partial or complete, appears anywhere in the log.
5. **Not claimed**: this record does **not** claim independent proof that the value supplied to
   the build argument was itself a structurally valid `pk_live_` key — the raw log intentionally
   redacts it, and a build with an arbitrary or empty value would also complete successfully. That
   distinct question (whether a structurally valid production key was actually baked into the
   static output) is AC-B6's scope, not AC-B2's, and is separately recorded as **PASS**
   (Authorization Act #3, see above).
6. **Evidence retained**: the complete raw build output is preserved in the gitignored evidence log
   `task10b-acb2-verification-acb2-20260916-092529-c366af0.log`.
7. **Scope of this result**: this record establishes **AC-B2 only**. AC-B3 and AC-B4 remain
   **INCONCLUSIVE / NOT VERIFIED** and are not addressed by this Act. **Task 10-B as a whole
   remains NOT ACCEPTED** and requires its own separate, explicit future authorization and
   acceptance review covering all remaining AC-B criteria.

   **Forward-looking note (added upon Act #10 verification, does not alter the historical record
   above)**: This item's statement that AC-B3 and AC-B4 remained INCONCLUSIVE / NOT VERIFIED was
   accurate as of this Act #9 record (2026-09-16). A separate authorization (Authorization Act #10)
   subsequently verified both together; see "AC-B3 / AC-B4 Verification Result — Authorization Act
   #10" below. AC-B5 remains unverified, unaffected by that Act. **Task 10-B as a whole remains NOT
   ACCEPTED.**
8. Did **not** start a container, perform GET `/`, test the webhook path, or perform any AC-B3/
   AC-B4 work.
9. Did **not** commit, tag, or push. `phase10_plan_3.md` remains untracked, as do `Dockerfile` and
   `.dockerignore`. No file other than the new evidence log was created or modified during this
   Act.
10. Did **not** alter the AC-B2 acceptance criterion's substantive wording or any prior RC or
    custody record; all are preserved unchanged above. This record only adds the result of applying
    the unchanged criterion.

### AC-B3 / AC-B4 Verification Result — Authorization Act #10 (2026-09-16)

Under a separate, explicit human authorization (Authorization Act #10), a fresh runtime
verification of AC-B3 and AC-B4 was performed together, in a single runtime session, and its
evidence formally reviewed (including an independent read-only cross-check of the evidence log).
This record documents that result:

1. **Result: AC-B3 = PASS. AC-B4 = PASS.**
2. **Authorization scope**: Act #10 authorized provisioning a disposable, non-production,
   SSL-enabled local PostgreSQL test service; building the application image from the existing,
   unmodified `Dockerfile` if no suitable image remained available; starting the application
   container against that disposable database; performing the AC-B3 and AC-B4 runtime checks;
   capturing evidence; and cleaning up. It explicitly did **not** authorize Task 10-B acceptance,
   Task 10-C or any later task, use of the Neon production database, use of any production
   credential, or any application/`Dockerfile`/`.dockerignore` modification.
3. **Infrastructure used**: the operator reported that no suitable prior application image
   remained available and that this was checked by inspection before the Act; **that inspection
   step and its output are not themselves captured in the retained evidence log** (see the
   "Evidentiary-completeness note" at the end of this record), so this detail rests on operator
   narration from the same session rather than on a log-recoverable artifact. A fresh image was
   built from the unmodified current `Dockerfile` (build reused Docker's layer cache; completed
   with exit code 0 — **this specific fact is directly confirmed by the retained log**). A
   disposable PostgreSQL instance (a standard PostgreSQL image; **the specific version/tag used
   does not itself appear in the retained log**, so it is recorded here as context rather than as
   a log-proven fact) was started on a purpose-built, disposable Docker network, configured with a
   freshly generated self-signed TLS certificate/key pair (generated outside the repository,
   installed into the container with corrected ownership/permissions, `ssl = on` set in
   `postgresql.conf`), and disposable, non-production `testuser`/`testdb` credentials. SSL
   activation was reported as independently confirmed (`SHOW ssl;` → `on`) before the application
   was started; the retained log shows a bare `on` line consistent with, but not itself a captured
   command/output pair proving, that specific check.
4. **Application startup evidence**: the application container was started with `DATABASE_URL`
   pointing only at the disposable PostgreSQL instance (no `sslmode` query parameter, so the
   explicit `ssl: { rejectUnauthorized: false }` configuration already present in `database.js`
   governs the connection) and a non-production placeholder value for `STRIPE_SECRET_KEY`,
   reported as required only so the existing `Stripe` client constructor in `server.js` does not
   throw at module load (no Stripe API call was made or required). **The specific placeholder
   value/detail itself does not appear in the retained log** (the log's redacted startup excerpt
   shows no environment-variable listing), so it is recorded here as context from the same
   session rather than as a log-proven fact. The container's startup log **directly recorded**
   `"Server running on http://localhost:3000"`, confirming PostgreSQL initialization succeeded and
   Express reached its listening state, consistent with the dependency chain established by the
   read-only Phase 10 v1.0.14 runtime-dependency reviews.
5. **AC-B3 evidence**: from inside the running application container (via `docker exec`, not an
   external host request), a `GET /` request returned `HTTP/1.1 200 OK`, satisfying AC-B3's literal
   requirement.
6. **AC-B4 evidence**: from inside the same running container, a `POST /api/billing/webhook`
   request (no Stripe signature header supplied; none is required by AC-B4's literal wording) with
   a JSON body returned HTTP 400 with response body exactly `{"error":"Webhook signature
   verification failed"}` — the literal string produced by the webhook route's own
   signature-verification catch block in `server.js`. This response shape is specific to that
   route's own code (a generic middleware-level rejection, such as from `helmet()` or `cors()`,
   would not produce this JSON body), demonstrating the request reached the route handler itself
   and establishing route reachability per AC-B4's literal wording. No Stripe signature validation
   success and no webhook business-logic execution were required or attempted.
7. **Independent review**: the retained evidence log was independently reviewed by a separate,
   read-only verification pass, which concurred with the PASS classification for both criteria,
   while noting a minor evidence-log completeness caveat (the actually-successful in-container
   requests were not each preceded by their own explicit "Command:" label in the log, because the
   first-attempted tool in each case — `curl` for AC-B3, a `wget --method=POST` invocation for
   AC-B4 — failed and was followed by a working alternative within the same `docker exec` session
   on the same container). This caveat does not affect the PASS classification: the raw HTTP
   evidence, container hostname match, and response-body specificity independently establish that
   the requests were genuine and originated inside the correct container.
8. **Evidence retained**: the complete raw evidence (network/container creation, TLS installation,
   SSL confirmation, full Docker build output, redacted application startup log, both request/
   response exchanges, and full cleanup output) is preserved in the gitignored evidence log
   `task10b-acb3acb4-verification-acb3acb4-20260916-141425-c366af0.log`. No production credential,
   Neon connection detail, or disposable-Postgres password appears anywhere in that log.

   **Evidentiary-completeness note (added in v1.0.16, following a documentation-only correction
   pass under Authorization Act #12; does not alter the AC-B3/AC-B4 PASS conclusions above)**: a
   subsequent read-only review (Authorization Act #11's post-recording review) found that three
   ancillary details narrated in items 3–4 above are not themselves recoverable from the retained
   log file: (a) the specific PostgreSQL image/version used; (b) the claim that no suitable prior
   application image remained available, and that this was confirmed by inspection before the Act
   — the log contains no `docker images` (or equivalent) output; and (c) the specific placeholder
   value/detail used for `STRIPE_SECRET_KEY`. None of these three details affect the AC-B3 or
   AC-B4 result, both of which rest on evidence the log does directly contain (build exit code,
   the in-container `GET /` → HTTP 200, and the in-container `POST /api/billing/webhook` → HTTP
   400 with the exact route-specific error body). They are retained above as session context,
   explicitly marked as not independently log-provable, rather than removed, per the correction
   authorization's instruction not to delete valid Act #10 facts merely because they are not
   independently recoverable from the log.
9. **Cleanup confirmed**: the application container, PostgreSQL container, disposable Docker
   network, temporary TLS material, and temporary application image were all removed after evidence
   capture; the evidence log itself was retained, unmodified.
10. **Scope of this result**: this record establishes **AC-B3 and AC-B4 only**. AC-B5 has not been
    evaluated by any Authorization Act to date and remains **unverified**; this Act did not address
    it and no PASS is claimed for it. With AC-B3 and AC-B4 now PASS, six of the seven AC-B1–AC-B7
    criteria have PASS evidence (only AC-B5 remains outstanding). **This does not constitute, and
    must not be read as, Task 10-B acceptance.** Task 10-B as a whole **remains NOT ACCEPTED** and
    requires its own separate, explicit future authorization and acceptance review covering all
    AC-B criteria, including AC-B5.

    **Forward-looking note (added upon Act #13 verification, does not alter the historical record
    above)**: This item's statement that AC-B5 remained unevaluated and unverified was accurate as
    of this Act #10 record (2026-09-16). A separate authorization (Authorization Act #13)
    subsequently evaluated it; see "AC-B5 Verification Result — Authorization Act #13" below. AC-B5
    is now **PASS**, and all seven AC-B1–AC-B7 criteria have PASS evidence. **Task 10-B as a whole
    remains NOT ACCEPTED.**
11. Did **not** use the Neon production database, any production credential, or any production
    Stripe/Clerk secret at any point.
12. Did **not** modify application source code, `Dockerfile`, or `.dockerignore`.
13. Did **not** commit, tag, or push. `phase10_plan_3.md` remains untracked, as do `Dockerfile` and
    `.dockerignore`. No file other than the new evidence log (created during Act #10, prior to and
    separately from this documentation pass) was created or modified.
14. Did **not** alter the AC-B3 or AC-B4 acceptance criteria's substantive wording, AC-B5's
    unverified status, or any prior RC or custody record; all are preserved unchanged above. This
    record only adds the result of applying the unchanged AC-B3/AC-B4 criteria.

### AC-B5 Verification Result — Authorization Act #13 (2026-09-17)

Under a separate, explicit human authorization (Authorization Act #13), a read-only Git and
repository-inspection evaluation of AC-B5 was performed. This record documents that result
(recorded here under a separate, explicit human documentation authorization, Authorization Act
#14, which performed no new evaluation of its own):

1. **Result: AC-B5 = PASS.**
2. **Authoritative requirement**: AC-B5 states, in full: "No application source code was modified
   to make the Dockerfile work." No further elaboration or verification procedure is defined for
   this criterion anywhere else in this document.
3. **Methodology**: because this criterion asks a factual/historical question about the
   repository's own state rather than about runtime behavior, Act #13 used read-only `git status`,
   `git diff`, and `git log` inspection only — no Docker build, container, or PostgreSQL instance
   was created or required.
4. **Core evidence**: `server.js` and `database.js` — the application's runtime source files,
   both referenced by the Dockerfile's `COPY` instructions — showed **no uncommitted changes** in
   `git status`. Their `git log` history showed their most recent commits were both dated
   2026-09-10 (`server.js` via commit `30ef225`, "feat(phase8): implement Task 8-C frontend billing
   UI"; `database.js` via commit `11e3bec`, "feat(phase8): implement Task 8-B billing
   integration"), predating the Dockerfile's documented 2026-09-12 creation date (established by
   the earlier Authorization Act #6 investigation, §12 "AC-B1..." record). No commit in either
   file's full history references Docker, containerization, or Task 10-B.
5. **Ancillary evidence**: the only other Dockerfile-build-context files showing any change —
   `package.json` and `package-lock.json` — were independently diff-inspected (not merely assumed
   from prior document narrative) and found to contain only an unrelated, pre-existing addition of
   the `stripe` npm dependency. `.env.example`'s change was inspected and found to document Stripe
   environment variables only. `apps/web/global-setup.ts`'s change was inspected and found to add
   `dotenv` loading for Playwright test setup only. `apps/web/e2e/chat.spec.ts` is excluded from
   the Docker build context entirely by the existing `.dockerignore` rule for `apps/web/e2e/`, so
   its content cannot affect this criterion regardless. `packages/`, `apps/web/next.config.ts`,
   `apps/web/tsconfig.json`, `turbo.json`, and root `tsconfig.json` — the remaining paths the
   Dockerfile's `COPY` instructions reference — each showed zero changes.
6. **Evidentiary precision**: this record documents exactly what Act #13 established — that the
   specific files inspected showed no Docker-motivated modification, committed or uncommitted — and
   does not extend that finding into an unqualified historical claim about every file the
   Dockerfile could ever reference beyond what was actually inspected.
7. **Scope of this result**: this record establishes **AC-B5 only**; it does not re-evaluate AC-B1,
   AC-B2, AC-B3, AC-B4, AC-B6, or AC-B7. With AC-B5 now PASS, **all seven AC-B1–AC-B7 criteria have
   PASS evidence. This does not constitute, and must not be read as, Task 10-B acceptance.** Task
   10-B as a whole **remains NOT ACCEPTED** and requires its own separate, explicit future
   authorization and acceptance review.
8. Did **not** build a Docker image, start a container, provision PostgreSQL, or use any production
   infrastructure or credential.
9. Did **not** modify application source code, `Dockerfile`, or `.dockerignore`, during either
   Act #13 or this recording (Act #14).
10. Did **not** commit, tag, or push. `phase10_plan_3.md` remains untracked, as do `Dockerfile` and
    `.dockerignore`. No file other than `phase10_plan_3.md` was created or modified by this
    recording.
11. Did **not** alter the AC-B5 acceptance criterion's substantive wording or any prior RC or
    custody record; all are preserved unchanged above. This record only adds the result of applying
    the unchanged criterion.

### Task 10-B Acceptance State — Authorization Act #16 (2026-09-17)

Under a separate, explicit human authorization (Authorization Act #16), and following the
completed read-only acceptance-readiness review (Authorization Act #15), Task 10-B is formally
accepted. This record documents that decision:

1. **Result: Task 10-B = ACCEPTED.**
2. **Basis**: Authorization Act #15 established, through read-only inspection only, that (a) Task
   10-B's own acceptance requirement (§5) is exactly AC-B1 through AC-B7, with no additional
   substantive technical requirement specific to Task 10-B found anywhere in this document; (b) all
   seven criteria carry recorded PASS evidence — AC-B1 (Authorization Act #7), AC-B2 (Authorization
   Act #9), AC-B3 (Authorization Act #10), AC-B4 (Authorization Act #10), AC-B5 (Authorization Act
   #13), AC-B6 (Authorization Act #3), AC-B7 (Authorization Act #8); (c) pending Decision D-9
   concerns only a later `<registry>/<image-name>` reference needed by Task 10-F and does not block
   Task 10-B's own Dockerfile/`.dockerignore` artifacts or acceptance criteria; and (d) the
   whole-Phase-10 governance gates and checkpoint apparatus (§7–§8: AC-GOV-1 through AC-GOV-8, Gates
   A–E) is a separate, later, whole-project checkpoint spanning infrastructure and tasks that do not
   yet exist (DNS, Caddy, CI/CD, Neon production, Stripe live mode), not a Task 10-B prerequisite.
3. **Decision**: on that basis, the human explicitly authorized this acceptance decision
   (Authorization Act #16). No new technical evaluation of any AC-B criterion was performed or is
   claimed by this record; each criterion's evidentiary basis, scope, and Act attribution remain
   exactly as recorded in its own entry above, unchanged.
4. **Governance pattern**: this decision follows the same acceptance-record pattern already
   established for Task 10-A (§5, "10-A Acceptance State," v1.0.6) — a distinct, dated declaration
   made under its own explicit human authorization, separate from the individual criteria it rests
   on.
5. **Scope of this result**: this record establishes **Task 10-B acceptance only**. It does **not**
   authorize, and must not be read as authorizing, Task 10-C or any later Phase 10 task, production
   deployment, DNS, Caddy/TLS work, CI/CD work, Neon production access, Stripe live-mode activation,
   or any other implementation. **Task 10-C and every later Phase 10 task remain NOT AUTHORIZED**
   and each requires its own separate, explicit future human authorization.
6. Did **not** modify application source code, `Dockerfile`, or `.dockerignore`.
7. Did **not** build a Docker image, start a container, provision PostgreSQL, or perform any other
   runtime or infrastructure work.
8. Did **not** commit, tag, or push. `phase10_plan_3.md` remains untracked, as do `Dockerfile` and
   `.dockerignore`. No file other than `phase10_plan_3.md` was created or modified by this
   decision.
9. Did **not** alter any individual AC-B criterion's substantive wording or evidentiary record, nor
   any prior RC or custody record; all are preserved unchanged above. This record only adds the
   whole-task acceptance decision that the unchanged, already-established criterion evidence
   supports.

### Decision D-1 Resolution — Authorization Act #19 (2026-09-17)

Under a separate, explicit human authorization (Authorization Act #19), and following the
completed read-only Task 10-C readiness review (Authorization Act #18), Decision D-1 is formally
resolved. This record documents that decision:

1. **Result: Decision D-1 = RESOLVED. Production domain: `flavourfind.com`.**
2. **Basis**: Authorization Act #18 established, through read-only inspection only, that Decision
   D-1 (production domain confirmation) was the material blocker preventing Task 10-C from reaching
   implementation-authorization readiness, and that Task 10-A's Reserved IP (`146.190.189.242`) was
   already available as the eventual A-record target. The human has now explicitly confirmed the
   production domain as `flavourfind.com`.
3. **Scope of this decision**: this record establishes **only** that the human has selected
   `flavourfind.com` as the production domain for Decision D-1. It does **not** establish, and must
   not be read as establishing, that any DNS record has been created, that DNS propagation has
   occurred, that registrar or DNS-provider control has actually been exercised, or that the domain
   is live in any sense. No DNS query, propagation check, or registrar action was performed as part
   of this Act.
4. **Effect on Task 10-C**: resolving D-1 removes one of Task 10-C's two stated dependencies
   (Decision D-1 and Task 10-A; Task 10-A was already ACCEPTED). This does **not** itself authorize,
   implement, or verify Task 10-C. **Task 10-C remains NOT AUTHORIZED** and requires its own
   separate, explicit future human implementation authorization before any DNS record is created.
   AC-C1, AC-C2, and AC-C3 remain **unverified**.
5. **Effect on later tasks**: Task 10-D, Task 10-E, and Task 10-G also list D-1 as a dependency;
   resolving D-1 similarly removes that specific blocker for each without authorizing,
   implementing, or advancing any of them. **Task 10-D and every later Phase 10 task remain NOT
   AUTHORIZED.**
6. Did **not** create, modify, or verify any DNS record.
7. Did **not** perform DNS propagation verification, access any registrar, DNS provider, or
   DigitalOcean resource, or perform any other runtime or infrastructure work.
8. Did **not** modify application source code, `Dockerfile`, or `.dockerignore`.
9. Did **not** commit, tag, or push. `phase10_plan_3.md` remains untracked, as do `Dockerfile` and
   `.dockerignore`. No file other than `phase10_plan_3.md` was created or modified by this
   decision.
10. Did **not** launch any Claude agent.
11. Did **not** alter any individual AC-B criterion's, Task 10-A's, or Task 10-B's substantive
    wording or evidentiary record, nor any prior RC or custody record; all are preserved unchanged
    above. This record only adds the D-1 resolution decision.

### Task 10-C Acceptance Record — Authorization Act #22 (2026-09-17)

Under a separate, explicit human authorization (Authorization Act #22), and following the
completed Task 10-C implementation-readiness review (Authorization Act #20) and the explicit human
authorization, manual DNS implementation, and read-only technical verification recorded under
Authorization Act #21, Task 10-C is formally accepted. This record documents that decision:

1. **Result: Task 10-C = ACCEPTED.**
2. **DNS implementation (performed manually by the human operator, not by Claude)**: Namecheap
   Advanced DNS was configured with `@` → A → `146.190.189.242` (TTL 30 min) and `www` → A →
   `146.190.189.242` (TTL 30 min), replacing the prior Namecheap parking CNAME (`www` →
   `parkingpage.namecheap.com.`) and URL redirect (`@` → `http://www.flavourfind.com/`). The
   pre-existing SPF TXT record (`v=spf1 include:spf.efwd.registrar-servers.com ~all`) was left
   unchanged. Claude did not access Namecheap credentials and performed no DNS writes at any point.
3. **Technical verification (read-only, performed by Claude under Authorization Act #21)**:
   - **AC-C1 — PASS**: `flavourfind.com` resolves to `146.190.189.242`, confirmed via the local
     system resolver and independently via Google Public DNS and Cloudflare Public DNS (both
     queried over DNS-over-HTTPS).
   - **AC-C2 — PASS**: `www.flavourfind.com` resolves to `146.190.189.242`, confirmed via the same
     three independent lookups.
   - **AC-C3 — PASS**: external propagation confirmed — two independent public resolvers (Google
     Public DNS, Cloudflare Public DNS), external to the local default resolver, returned identical
     answers for both hostnames; no propagation discrepancy was observed.
   - No residual Namecheap parking CNAME was found for `www.flavourfind.com` (its DNS answer is a
     type-A record, not a CNAME to `parkingpage.namecheap.com.`); no ambiguous or conflicting
     multi-answer A-record result was found for either hostname.
4. **Basis**: Authorization Act #20 established, through read-only inspection only, that Task
   10-C's two stated dependencies (Decision D-1 and Task 10-A) were both satisfied and that no
   other pending decision (D-2 through D-9) blocks Task 10-C specifically. Authorization Act #21
   then explicitly authorized the DNS implementation and its read-only verification; the human
   performed the DNS implementation manually, and Claude performed only the read-only verification
   described above, with no DNS write access used or attempted.
5. **Decision**: on that basis, the human explicitly authorized this acceptance decision
   (Authorization Act #22). No new technical evaluation of AC-C1, AC-C2, or AC-C3 was performed by
   this recording; each criterion's evidentiary basis and Act attribution remain exactly as
   established during Authorization Act #21's verification, unchanged.
6. **Governance pattern**: this decision follows the same acceptance-record pattern already
   established for Task 10-A (§5, "10-A Acceptance State," v1.0.6) and Task 10-B (§5, "Task 10-B
   Acceptance State"; §12, "Task 10-B Acceptance State — Authorization Act #16") — a distinct,
   dated declaration made under its own explicit human authorization, separate from the individual
   criteria and implementation evidence it rests on.
7. **Scope of this result**: this record establishes **Task 10-C acceptance only**. It does
   **not** authorize, and must not be read as authorizing, Task 10-D or any later Phase 10 task,
   Caddy installation, TLS/certificate configuration, reverse-proxy configuration, CI/CD work, Neon
   production access, or Stripe live-mode activation. **Task 10-D and every later Phase 10 task
   remain NOT AUTHORIZED** and each requires its own separate, explicit future human authorization.
8. Did **not** create, modify, or verify any DNS record as part of this recording (the DNS
   implementation was performed manually by the human operator; its read-only verification was
   performed and evidenced in the separate, prior Authorization Act #21 session).
9. Did **not** access or request Namecheap credentials, install Caddy, configure TLS, issue
   certificates, or perform any other runtime or infrastructure work.
10. Did **not** modify application source code, `Dockerfile`, or `.dockerignore`.
11. Did **not** commit, tag, or push. `phase10_plan_3.md` remains untracked. No file other than
    `phase10_plan_3.md` was created or modified by this recording.
12. Did **not** launch any Claude agent.
13. Did **not** alter any prior RC, Act, or custody record; all are preserved unchanged above.
    This record only adds the Task 10-C implementation summary, verification results, and
    whole-task acceptance decision.

### v1.0.21 Documentation Correction Record — Authorization Act #23 (2026-09-21)

Under a separate, explicit human authorization (Authorization Act #23 — a human-selected number;
RC-31; 2026-09-21), this documentation-only pass records the Task 10-F Option B architecture and
the related human decisions. The document's own numbering did not establish a unique next
Authorization Act number (its highest recorded Act was #22, with #4, #5, and #17 absent, and later
Task 10-F evidence recordings carrying no Act number); the human explicitly selected #23. No
historical Act number was renumbered, repaired, or reinterpreted.

1. **Result: v1.0.21 recorded.** Live version references advanced (header, status, footer, §11,
   §12, §8.1 Gate A, §8.2); historical version and Act records preserved unchanged.
2. **Option B recorded**: `prod-v*` version-tag push is the production trigger; `workflow_dispatch`
   is the non-production dry run; checkpoint tags never trigger production; event-separated
   concurrency with `cancel-in-progress: false`; no GitHub Environment; only a human creates or
   pushes the production tag, with tag creation and tag push as separate authorization boundaries;
   publishing the workflow does not execute production.
3. **AC-F8 (human decision)**: requires an already-existing previous production image that is
   retained and pullable; the first production deployment alone does not satisfy it; a second,
   separately authorized deployment is required; AC-F8 remains Task 10-F and is not AC-N3.
   Registry evidence/read access for AC-F8 is a distinct authorization boundary requiring separate
   explicit human authorization; this was explicitly human-ratified after the read-only
   verification of this pass. The ratification is a documentation clarification only and grants no
   operational authorization.
4. **Retry boundary (human decision)**: permitted only for a failed or incomplete production attempt,
   via a named mechanism (e.g., GitHub Actions re-run), same `prod-v*` tag and same commit SHA;
   does not authorize redeploying a successful release, changing tag/SHA/release/target, a second
   successful deployment for AC-F8, rollback testing, or any other new production action.
5. **AC-F1 / AC-F2 (human decision)**: reverted to `[ ]`; the 2026-09-17 `workflow_dispatch`
   evidence is preserved as historical; the `prod-v*` production path is unexercised; acceptance
   wording unchanged.
6. **Named corrections (human decision)**: stale D-7 gate text in Task 10-F; live `v1.0.10`
   references in §8.1 Gate A and §8.2 advanced to v1.0.21; "immutable image tag (Git commit SHA)"
   terminology at three Task 10-F locations. `CLAUDE.md` is not modified.
7. **Authorization sequence (human decision)**: (1) documentation correction — this pass;
   (2) read-only verification of the documentation diff; (3) separate authorization for the
   documentation commit; (4) separate authorization for documentation publication; (5) stop;
   (6) separate authorization for workflow implementation; (7) workflow implementation, including
   the stale workflow header comment; (8) read-only verification of the workflow diff;
   (9) separate authorization for the workflow commit; (10) separate authorization for workflow
   publication; (11) stop. Documentation and workflow changes are not combined into one commit or
   one authorization act.
8. **Scope of this result**: this record does **not** authorize workflow implementation, any
   `prod-v*` tag creation or push, any production deployment, any retry, a second production
   deployment for AC-F8, registry evidence/read access, Task 10-F acceptance, or the final Phase 10
   checkpoint. **Gate C remains NOT SATISFIED, Task 10-F remains NOT ACCEPTED, and production
   deployment remains UNAUTHORIZED.**
9. Did **not** modify `.github/workflows/deploy.yml`, `CLAUDE.md`, application source,
   `Dockerfile`, or `.dockerignore`; did **not** commit, tag, or push; did **not** run or dispatch
   any GitHub Actions workflow; did **not** access DOCR, the Droplet, or production; did **not**
   modify any secret.
10. Did **not** alter any prior RC, Act, or custody record, AC-F8's or AC-N3's wording, or Gate C's
    five bullets; all are preserved unchanged above.

### D-F5 Documentation Correction Record — Authorization Act #24 (2026-09-22)

Under a separate, explicit human authorization (Authorization Act #24; RC-32; 2026-09-22), this
documentation-only pass records Decision D-F5 (Task 10-F) and reconciles this document's wording
accordingly.

1. **Result: v1.0.22 recorded; D-F5 inserted into the Task 10-F "D-F1–D-F4" decision block**, now
   D-F1 through D-F5, following that block's established convention. D-F5 is the fifth entry in the
   Task 10-F "D-F" decision sequence, distinct from this document's Decisions D-1 through D-9.
2. **D-F5 (human decision)**: approves, in principle, a future, separately authorized `server.js`
   change deferring Stripe client construction (Shape 1 only — see Task 10-F for the full scope,
   webhook nuance, and security/production exclusions). D-F5 is **not** implementation
   authorization and does **not** retroactively expand Task 10-F's authorization; Task 10-F's own
   "does NOT authorize: Modifying `server.js`" scope statement is unchanged.
3. **Governance reconciliation (human decision)**: §0, §3, AC-B5, AC-F7, AC-GOV-1, AC-GOV-7, Gate
   C, and the Task 10-E first-pass/second-pass clarification each received a narrow clarification
   or cross-reference to D-F5, without rewriting any existing rule, criterion wording, or
   historical evidence record. AC-F7's checkbox is unchanged; the cross-reference records only that
   AC-F7 is to be treated as NOT SATISFIED under its literal wording once the Shape 1
   implementation actually occurs.
4. **Historical evidence preserved (human decision)**: Authorization Act #13 / AC-B5 evidence, the
   2026-09-19 AC-F7 recording, the 2026-09-17 Gate C Docker smoke-test record, and every other
   prior acceptance/execution record remain exactly as previously written.
5. **Future fresh-evidence requirements recorded, not performed now (human decision)**: AC-B3,
   AC-B4, Gate C's Docker smoke-test bullet, and AC-GOV-7 will require fresh evidence once the
   D-F5 Shape 1 implementation is separately authorized and actually made; existing AC-F3 dry-run
   evidence remains valid as historical evidence and is not retroactively invalidated.
6. **Scope of this result**: this record does **not** authorize any `server.js` edit; any Stripe
   secret action or placeholder production credential; any change to D-8; any Docker, DOCR,
   Droplet, Caddy, or production action; any `prod-v*` tag creation or push; any Git commit or
   push; any OS reboot; or Task 10-E, Task 10-F, or Gate C acceptance/satisfaction. **Gate C
   remains NOT SATISFIED, Task 10-E and Task 10-F remain NOT ACCEPTED, and production deployment
   remains UNAUTHORIZED.**
7. Did **not** modify `server.js`, `.github/workflows/deploy.yml`, `CLAUDE.md`, `package.json`,
   `package-lock.json`, `Dockerfile`, or `.dockerignore`; did **not** commit, tag, or push; did
   **not** run or dispatch any GitHub Actions workflow; did **not** access DOCR, the Droplet,
   Caddy, or production; did **not** create, modify, rotate, or read any secret.
8. Did **not** alter any prior RC, Act, or custody record, Task 10-F's "does NOT authorize"
   scope statement, or any historical acceptance/execution record; all are preserved unchanged
   above.

### v1.0.23 Documentation Record — Authorization Act #25 (2026-09-23)

Under a separate, explicit human authorization (Authorization Act #25; RC-33; 2026-09-23), this
documentation-only pass records the corrected Docker artifact, the fresh evidence for it, and the failed
first production release attempt, and corrects genuinely stale current-status statements.

1. **Result: v1.0.23 recorded.**
2. **Human decisions recorded**:
   - **DEC-1 — D-F6 APPROVED**: the corrected three-stage `Dockerfile` (blob
     `ffe54bf1caf9d90a501661e84ea4cb503bf46a34`, commit `724fe67278df65a0f5d08125c6ed504015a8d299`)
     replaces D-F1's `Dockerfile` reference only; `.dockerignore` (blob `e2b09c52…`) unchanged; D-F1
     preserved as historical.
   - **DEC-2 — Task 10-B remains ACCEPTED**: not reopened or re-accepted; original Act-numbered
     AC-B1–AC-B7 PASS records preserved; corrected-artifact evidence recorded under AC-B1–AC-B7.
   - **DEC-3 — Gate C scope**: Gate C remains SATISFIED (§8.1); the corrected-Dockerfile evidence
     supersedes the earlier Docker evidence for documenting the corrected artifact; the 2026-09-22
     final authorization is **not** read as authorizing a production release of `724fe67`; that remains
     a separate human decision.
   - **DEC-4 — AC-F1/AC-F2**: factual evidence from run `35750588575` recorded; **both remain
     unchecked** pending a separate acceptance determination.
   - **DEC-5 — authorization references**: `7425b3d`, `a5318ab`, and `prod-v1.0.0` creation and push
     recorded as human-authorized but not formally identified in this document; no Act number,
     timestamp, authorization text, authorship, or tag-creation time invented.
   - **DEC-6 — DOCR observation**: recorded as a manual control-panel observation made before the
     2026-09-23T07:39Z live-key build (0 Bytes / 500 MiB; no images; 0 Bytes garbage-collectable); not
     API-level verification; not AC-F8 or AC-N3 evidence.
   - **DEC-7 — change record**: v1.0.23, RC-33, Authorization Act #25.
   - **DEC-8 — build cache**: local Docker build-cache state intentionally not recorded (not an
     acceptance requirement).
   - **DEC-9 — release mechanism: intentionally UNRESOLVED.** No choice is made among re-running
     `35750588575`, creating a new `prod-v*` tag, moving `prod-v1.0.0`, or any other mechanism.
3. **Evidence sources recorded** (each separately human-authorized earlier; not re-performed by this
   pass): local corrected-artifact implementation build and repository-reviewer checkpoint (2026-09-22);
   Dockerfile-only commit `724fe67` and its push to `origin/main` (2026-09-22); disposable local
   AC-B3/AC-B4/AC-B7 and Gate C smoke verification (2026-09-22); live-key AC-B2/AC-B6/AC-GOV-7
   verification (2026-09-23); read-only GitHub Actions metadata for run `35750588575`.
4. **Status after this pass**: Task 10-B ACCEPTED (unchanged); Gate C SATISFIED (unchanged);
   AC-GOV-7 SATISFIED (unchanged); **Task 10-F NOT ACCEPTED**; AC-F1, AC-F2, AC-F4, AC-F5, AC-F8
   unchecked; AC-F6 evidenced for the dry-run path only; AC-F7 NOT SATISFIED; AC-N2–AC-N5 unchecked;
   Gate D NOT SATISFIED (Task 10-D, deployed-and-running state, HTTPS webhook reachability, and D-8
   all outstanding); **no production deployment has occurred.**
5. **Production release authorization remains separate**: this record does **not** authorize any
   production release of `724fe67` or any other commit; any re-run of `35750588575`; any `prod-v*` tag
   creation, movement, or push; any workflow run or dispatch; any DOCR, Droplet, Caddy, Neon, or secret
   action; any deployment or rollback; Task 10-D, Task 10-G, or D-8; or Task 10-F acceptance. Each
   remains a separate, explicit human authorization boundary.
6. Did **not** modify `Dockerfile`, `.dockerignore`, `.github/workflows/deploy.yml`, `package.json`,
   `package-lock.json`, `server.js`, `database.js`, any `.env` file, or any file other than this
   document; did **not** commit, tag, or push; did **not** run or dispatch any workflow; did **not**
   access DOCR, the Droplet, or any secret. No credential value, key body, credential hash, or `.env`
   content is recorded in this document.
7. Did **not** alter any prior RC, Act, custody, acceptance, or execution record. **Authorized tense
   changes were made to three historical summary clauses** so that they no longer read as current
   status, without changing their historical meaning: (a) the header status line's v1.0.21 summary
   ("it does not implement the workflow change, and Gate C remains NOT SATISFIED, Task 10-F remains
   NOT ACCEPTED, and production deployment remains UNAUTHORIZED" → "it did not implement the
   workflow change, and at the time of v1.0.21 Gate C was NOT SATISFIED, Task 10-F was NOT ACCEPTED,
   and production deployment was UNAUTHORIZED"); (b) the header status line's v1.0.22 summary
   ("Gate C remains NOT SATISFIED, Task 10-F remains NOT ACCEPTED, and production deployment remains
   UNAUTHORIZED" → "At the time of v1.0.22's publication, Gate C was NOT SATISFIED, Task 10-F was NOT
   ACCEPTED, and production deployment was UNAUTHORIZED"); and (c) the footer's v1.0.22 history
   clause ("Gate C remains NOT SATISFIED, Task 10-E and Task 10-F remain NOT ACCEPTED, and production
   deployment remains UNAUTHORIZED" → "at that time Gate C was NOT SATISFIED, Task 10-E and Task 10-F
   were NOT ACCEPTED, and production deployment was UNAUTHORIZED", with the surrounding "and is
   updated here to v1.0.22" adjusted to "updated to v1.0.22" so the v1.0.23 entry could follow). The
   former "This version" description of v1.0.22 is retained verbatim under a "Previous version
   (v1.0.22)" label, and the §1 baseline `Dockerfile`/`.dockerignore` rows retain their original
   wording with a "(baseline status at the time of this report)" label and appended current-status
   text. All other historical statements — including every dated "Gate C remains NOT SATISFIED"
   statement within dated records, the footer's v1.0.21 history clause, D-F1, and all Act-numbered
   records and original PASS evidence — are preserved unchanged; elsewhere, current status was
   conveyed only by added notes or cross-references.

### v1.0.24 Documentation Record — Authorization Act #26 (2026-09-24)

Under a separate, explicit human authorization (Authorization Act #26; RC-34; 2026-09-24), this
documentation-only pass reconciles this document to the actual release state at
`48d62ac2bd47888e6ea67f726e5fcd1dfd7f8519` (HEAD and `origin/main` at time of writing).

1. **Result: v1.0.24 recorded.**
2. **Facts recorded**: the Deploy-step SSH remote-command defect and its correction in `48d62ac`
   (Task 10-F); the release-commit requirement (`48d62ac` or a later commit containing the fix), with
   `724fe67` retained as the historical evidence commit for the corrected `Dockerfile`; the human-reported
   read-only Droplet Docker-readiness checkpoint; the `DROPLET_SSH_KEY` non-interactive-use uncertainty
   as an operational risk tested by AC-F5 and not a pre-tag requirement (the secret was not accessed, and
   no claim about its contents is made); the `${{ secrets.X }}` inline-interpolation concern as a separate
   non-blocking follow-up; and the Gate A / tag-target analysis (no rule requires the tag to target the
   documentation commit).
3. **Status after this pass (unchanged)**: Task 10-B ACCEPTED; Task 10-H ACCEPTED; Gate C SATISFIED;
   **Task 10-F NOT ACCEPTED**; AC-F1, AC-F2, AC-F4, AC-F5, AC-F8 unchecked; AC-F7 NOT SATISFIED;
   AC-N2–AC-N5 unchecked; Gate D NOT SATISFIED; **no production deployment has occurred.** No acceptance
   criterion or checkbox was changed.
4. **DEC-9 — UNDECIDED**: the release mechanism, tag name, tag target, and explicit production-release
   authorization remain a human decision (see Task 10-F, "Release-readiness record (v1.0.24)", item 5).
5. **Production release authorization remains separate**: this record does **not** authorize any
   production release of `48d62ac` or any other commit; any re-run of `35750588575`; any `prod-v*` tag
   creation, movement, or push; any workflow run or dispatch; any DOCR, Droplet, Caddy, Neon, or secret
   action; any change to `DROPLET_SSH_KEY` or any SSH key; any deployment or rollback; Task 10-D, Task
   10-G, or D-8; or Task 10-F acceptance.
6. **Wording changes to existing text**, beyond added notes and records: the header's v1.0.23 "Current
   status" clause relabelled as a historical "v1.0.23 status summary" (wording otherwise unchanged); the
   v1.0.23 "This version" description retained verbatim under "Previous version (v1.0.23)"; the header
   version, status line, and "Current HEAD at time of writing"; the Gate A version reference; and the
   footer's current-status sentence and v1.0.23 history clause, as described in §11 "Corrections Applied
   in v1.0.24", item 5. No other existing wording was changed; all prior RC, Act, custody, acceptance, and
   execution records, D-F1, D-F6, and the Task 10-B and Gate C evidence recorded against `724fe67` are
   preserved unchanged.
7. Did **not** modify `Dockerfile`, `.dockerignore`, `.github/workflows/deploy.yml`, `package.json`,
   `package-lock.json`, `server.js`, `database.js`, any `.env` file, or any file other than this
   document; did **not** stage, commit, tag, or push; did **not** run or dispatch any workflow; did **not**
   access DOCR, the Droplet, or any secret. No credential value, key body, credential hash, or `.env`
   content is recorded in this document.

### v1.0.25 Documentation Record — Authorization Act #27 (2026-09-24)

Under a separate, explicit human authorization (Authorization Act #27; RC-35; 2026-09-24), this
documentation-only pass records the first production deployment and the human decisions made since
v1.0.24. HEAD and `origin/main` at time of writing: `c2249c90247e88a7679f9828478f692b7727fe4a`.

1. **Result: v1.0.25 recorded.**
2. **Facts recorded**: DEC-9's resolution (option B, `prod-v1.0.1` → `c2249c9`); run `36003636133`
   attempt 1 (failed at SSH authentication, no remote command executed) and attempt 2 (successful
   deployment, image `sha256:e000b840828c6c6e1ade33fcd75eeac5b5f1e1a0365ba85b3816d206d3f06a09`); the
   dedicated CI/CD deployment key and `DROPLET_SSH_KEY` update; the human's independent Droplet
   verification; the newline-only previous-image file; the non-public state; the effective-TLS
   library behavior (recorded as unverified) and the C11 human-run log-check result (1). See Task 10-F,
   "Production release record (v1.0.25)", Task 10-N, "Rollback-evidence status (v1.0.25)", and §1.5.
3. **Human determination recorded**: **AC-F6: SATISFIED** for the `prod-v*` production path, as the
   human reviewer's determination (Task 10-F, "AC-F6 production-path human determination (v1.0.25)").
4. **Human decisions recorded**:
   - Stage 1: D-2, D-3, D-5 authorized in principle only (D-3/D-5 with `deploy.yml` wiring scope);
     D-4 not authorized (Task 10-K omitted); D-8 not authorized within Phase 10 (deferred) (Task 10-G
     deferred); AC-F7 exception disposition (literal NOT SATISFIED preserved); AC-N4 non-production
     exercise in principle; AC-N5 conditional; PostgreSQL SSL change by separate authorization; AC-E5
     attestation.
   - C1 AC-F1 checked; C2 AC-F2 checked; C3 AC-F4 checked; C4 AC-F5 left unchecked; C5 AC-E5 checked;
     C6 AC-E1/AC-E3 left open under the D-8 deferral (no exception); C7 RV-applicability to the AC-N4
     exercise left open; C8 automatic-restore question left open; C9 Play Store outside Phase 10; C10
     Day 2 SSL change to set `ssl: { rejectUnauthorized: true }`, no `DATABASE_URL` change required;
     C11 read-only SSL-mode log check performed by the human (result 1); C12 single-origin CORS
     (`https://flavourfind.com`); C13 AC-J4 mechanism left open; C14 D-8 recorded as "not authorized
     within Phase 10 (deferred)"; C15 read-only Clerk production check before public HTTPS go-live.
5. **Status after this pass**: Tasks 10-A, 10-B, 10-C, 10-H ACCEPTED (unchanged); Gate B and Gate C
   SATISFIED (unchanged); **Task 10-F NOT ACCEPTED**; Tasks 10-D, 10-E, 10-I, 10-J, 10-L, 10-M, 10-N NOT
   ACCEPTED; Task 10-G DEFERRED; Task 10-K OMITTED; Gate D not exercised; Gate E not reached. AC-F1,
   AC-F2, AC-F4, AC-E5 newly checked by human decision; AC-F5, AC-F8, AC-E1, AC-E3, AC-N2–AC-N5,
   AC-GOV-1–AC-GOV-6, AC-GOV-8 unchecked; AC-F7 NOT SATISFIED.
6. **Wording changes to existing text**, beyond added notes and records: the header items listed in §11
   "Corrections Applied in v1.0.25", item 1; the labels (text before the colon) of AC-F1, AC-F2, AC-F4,
   AC-F6, and AC-E5 and the checkboxes of AC-F1, AC-F2, AC-F4, AC-E5; the Gate A and §8.2 version
   references; and the footer's current-status text and v1.0.24 history clause. No acceptance-criterion
   wording and no other existing wording was changed.
7. **Not authorized by this record**: implementation of D-2, D-3, D-5, or the PostgreSQL SSL change;
   any `server.js`, `database.js`, `deploy.yml`, `Dockerfile`, package, or `.env.example` change; any
   Sentry, PostHog, Clerk, Stripe, Neon, DNS, or UptimeRobot action; any secret creation or change; Task
   10-D (Caddy/TLS); any further production release, re-run, `prod-v*` tag action, deployment, or
   rollback (including the AC-N4 exercise); registry read access; or any task acceptance.
8. Did **not** modify any file other than this document; did **not** stage, commit, tag, or push; did
   **not** run or dispatch any workflow; did **not** access DOCR, the Droplet, or any secret value. The
   C11 log check was run by the human; `DATABASE_URL` was not read, printed, or recorded. No credential
   value, key body, credential hash, or `.env` content is recorded in this document.

### Day 3 Non-Production Validation Record (v1.0.26)

Recorded under the v1.0.26 documentation-edit authorization (Authorization Act #__, number to be
assigned by the human). The validation itself was performed under a separate, explicit human
authorization for Day 3 non-production validation only, and its evidence was reviewed by the human
before this record was made. **All results below are non-production and are not production
acceptance.**

1. **Environment**: an isolated copy outside the repository (`git archive HEAD` plus the five Day 3
   files, line-ending-normalized, each byte-identical to the working-tree blob); a disposable
   `postgres:16-alpine` database with TLS enabled and a throwaway test CA (`NODE_EXTRA_CA_CERTS`),
   bound to localhost; dummy Clerk, Anthropic, and Sentry values; no `.env` file present; no
   production value used.
2. **PASS**: clean `npm ci` (exit 0) and `npm ls --all` (exit 0), `package-lock.json` unchanged by
   the install; Node/Sentry compatibility (local Node 22.19.0; image Node 22.23.3; `@sentry/node`
   11.0.0 requires `>=22.12.0 <23` on the 22.x line); local startup; `GET /health` (HTTP 200
   `{"status":"ok"}`, no authentication, HTTP 200 while the database was paused); CORS default
   (`Access-Control-Allow-Origin: *` with `CORS_ORIGIN` unset or empty); Sentry empty and dummy DSN
   (startup and requests unaffected); API/database regression against the disposable database
   (`/api/moods` 8 moods, `/api/recipes/happy` 4 recipes, `/api/recipe/happy/random` 200, `/` 200;
   protected routes 401 without authentication; database initialized over TLS); Docker build
   (`docker build --no-cache`, exit 0) and container runtime (same checks inside the container, 0
   restarts, 0 warn/error log lines); `deploy.yml` static validation (YAML parses; the file equals
   the committed file plus exactly the three authorized insertions; `bash -n` passes for the Deploy
   step and the assembled remote command; the export quoting was simulated with dummy values only);
   worktree integrity.
3. **Verified as implemented**: configured-origin CORS (`CORS_ORIGIN=https://example.test`): the
   configured origin is advertised to every requester, including a different origin, which receives
   HTTP 200 (GET) or HTTP 204 (preflight) with the non-matching configured value. See the Task 10-L
   v1.0.26 K7 note; AC-L2 and AC-L3 remain UNVERIFIED for production.
4. **NOT RUN — existing Playwright E2E suite**: it requires real Clerk test-instance credentials; the
   working tree contains unrelated, uncommitted edits to `apps/web/global-setup.ts` and
   `apps/web/e2e/chat.spec.ts`; and repository credentials had to be kept isolated. No backend test
   suite exists. **No frontend or authenticated end-to-end coverage is claimed.**
5. **Sentry limitation**: real Sentry event delivery was not tested; **AC-J4 remains DEFERRED**.
6. **Image impact (observation, not a failure)**: compressed image 78.7 MB → 95.1 MB (about +16.4 MB);
   `node_modules` 99.8 MB → 197.7 MB (about double); `docker image ls` size 362 MB → 481 MB (compared
   with the Day 2 pre-Sentry test image).

### v1.0.26 Documentation Record — Authorization Act #__ (2026-09-25)

Under a separate, explicit human documentation-edit authorization (Authorization Act #__, number to
be assigned by the human; RC-__), this documentation-only pass records the Day 2 and Day 3 state.

1. **Result: v1.0.26 recorded.**
2. **Git state at time of writing**: HEAD and `origin/main` are
   `9448d2f15663b89a736be89084d29e9927029ede`, the existing Day 2 SSL commit, which contains only
   `database.js`. The Day 3 implementation is uncommitted and **no Day 3 commit hash exists**; if the
   Day 3 implementation and this document are later committed together under separate
   authorization, that commit's hash will be recorded only after it exists.
3. **Day 2 facts**: see §1.5, "v1.0.26 note — Day 2 SSL change" (implementation sourced to the
   commit; validation sourced to the Day 2 session evidence; not deployed; **P4 OPEN**).
4. **Day 3 implementation facts**: `@sentry/node` `11.0.0` (exact pin); `Sentry.init({ dsn:
   process.env.SENTRY_DSN })` immediately after `dotenv`; `GET /health` (process-only);
   `cors({ origin: process.env.CORS_ORIGIN || '*' })`; `Sentry.setupExpressErrorHandler(app)` after the
   routes and before startup; `SENTRY_DSN`/`CORS_ORIGIN` wiring in `deploy.yml` (export block and both
   `docker run` commands); `.env.example` additions `SENTRY_DSN=` and `CORS_ORIGIN=` only.
   `database.js`, `Dockerfile`, and `.dockerignore` were unchanged by Day 3. Decisions K1–K5 and
   K7–K14 (no K6 issued) are recorded in §4, "Decision status (v1.0.26)".
5. **Validation**: see "Day 3 Non-Production Validation Record (v1.0.26)" above. Playwright E2E NOT
   RUN; AC-J4 DEFERRED; AC-J2 OPEN; AC-L2/AC-L3 UNVERIFIED.
6. **Governance deviation (recorded)**: During Day 3 non-production validation cleanup, Claude ran
   `docker builder prune -f --filter until=2h`, which removed approximately 8.78 GB of Docker build
   cache older than two hours. This was an out-of-scope validation-session action. Repository
   integrity checks after it passed; no production deployment occurred; no production workflow was
   dispatched; no production secrets were accessed; no code remediation was performed. No before/after
   inventory of Docker images, containers, or volumes was taken, so their state is not verified by
   inventory; the command's documented scope is build cache only. No restoration was attempted.
7. **Day 3 governance state**: implementation authorized and completed; diff reviewed; non-production
   validation authorized and completed; validation evidence reviewed; no remediation authorized;
   nothing staged; no Day 3 commit; no push; no production deployment.
8. **Acceptance criteria**: no acceptance-criterion wording changed and no checkbox changed. AC-I1–AC-I3
   non-production evidence recorded; AC-I4 documentary fact recorded (D-2 authorization on record in
   `ac5238b` before implementation); AC-J1/AC-J3 implemented, uncommitted; AC-J2 OPEN; AC-J4 DEFERRED;
   AC-L1 implemented with non-production evidence; AC-L2/AC-L3 UNVERIFIED; AC-L4 unchanged;
   AC-GOV-1/AC-GOV-2 authorization trail recorded (§3, §4), not treated as checkpoint-level
   acceptance. A completed checkbox would not itself authorize any next action.
9. **Existing §1.6 discrepancy**: recorded in §1.6, not corrected.
10. **Intended future commit boundary (not authorized by this record)**: `server.js`, `package.json`,
    `package-lock.json`, `.github/workflows/deploy.yml`, `.env.example` (only `SENTRY_DSN=` and
    `CORS_ORIGIN=`, staged without the seven pre-existing Stripe-related lines), and
    `phase10_plan_3.md`. Excluded: `database.js`, `Dockerfile`, `.dockerignore`, `.gitignore`,
    `SAAS_ROADMAP.md`, `apps/web/e2e/chat.spec.ts`, `apps/web/global-setup.ts`, `phase8_plan_1_4.md`,
    all 27 untracked entries, the seven pre-existing `.env.example` lines, validation artifacts, and
    tags.
11. **Not authorized by this record**: any commit, push, or tag; any deployment, including the second
    production deployment; P4; any secret creation or change; Task 10-D; any remediation; any task
    acceptance.
12. Did **not** modify any file other than this document; did **not** stage, commit, tag, or push; did
    **not** run or dispatch any workflow; did **not** access any secret value or production system. No
    credential value or `.env` content is recorded in this document.

### Retrospective Repository-Reviewer Evidence (v1.0.27)

Recorded under the v1.0.27 documentation-edit authorization (Authorization Act #__, number to be
assigned by the human). The retrospective reviews were performed on 2026-09-25 under a separate,
explicit human authorization (decision D1), using the read-only `repository-reviewer` agent against
the commit objects (not the working tree).

1. **ORIGINAL PRE-CHECKPOINT REQUIREMENT**: CLAUDE.md requires that, "Before a human performs a Git
   checkpoint after an implementation task," the `repository-reviewer` agent be invoked. This
   requirement was **NOT met** for the Day 2 implementation commit
   `9448d2f15663b89a736be89084d29e9927029ede` or the Day 3 implementation commit
   `d1eaa1045fa4df09125e7e19eebb894211515c36`: no repository-reviewer run occurred before either
   commit was created.
2. **RETROSPECTIVE EVIDENCE**:
   - `9448d2f` (parent `ac5238b`): **RETROSPECTIVE VERDICT: CHECKPOINT READY** for the commit's
     content and scope — `database.js` only, +1/−1 (`rejectUnauthorized: false` → `true`); no
     unrelated file; no secret found.
   - `d1eaa10` (parent `9448d2f`): **RETROSPECTIVE VERDICT: CHECKPOINT READY** for the commit's
     content and scope — exactly `server.js`, `package.json`, `package-lock.json`,
     `.github/workflows/deploy.yml`, `.env.example` (two lines only), and `phase10_plan_3.md`, each
     matching the Day 3 specification (K1–K5, K7–K14); `database.js`, `Dockerfile`, `.dockerignore`,
     and `apps/web/` unchanged; no secret found.
   - Classification for both commits: **ORIGINAL PRE-CHECKPOINT REVIEW EVIDENCE MISSING;
     RETROSPECTIVE REVIEW COMPLETED.**
   - The retrospective reviews do **not** retroactively satisfy the original pre-checkpoint timing
     requirement, do not state that the historical checkpoints were reviewer-approved before they
     occurred, and do not accept any acceptance criterion.
3. **Day 2 reviewer observation — NOT ADOPTED as evidence**: The Day 2 retrospective report contained
   an observation that the explicit `ssl` object passed to `Pool` takes precedence over `sslmode` and
   that `sslmode=require` does not by itself enforce certificate verification. That statement is
   **not adopted** as evidence. The pinned `pg` 8.23.0 source shows that connection-string settings
   override pool options (`pg/lib/connection-parameters.js` line 60,
   `Object.assign({}, config, parse(config.connectionString))`), and `pg-connection-string` sets
   `config.ssl = {}` when `sslmode` is present (`index.js` line 78), consistent with §1.5, whose
   existing text is unchanged. The Day 2 CHECKPOINT READY verdict, which concerns the commit's
   content and scope, is unaffected.
4. **Day 3 reviewer process slip (recorded)**: During its lockfile comparison, the Day 3 retrospective
   reviewer redirected output into `/tmp/parent_keys.json`, outside the repository, contrary to its
   no-redirect/no-temporary-file instruction. The reviewer deleted the file itself and repeated the
   comparison without writing to disk; the file's absence was confirmed afterwards. The file contained
   only package-name key lists. The repository was not modified, and the working-tree status
   fingerprint was identical before and after the audit (`365b67ae…`). This is recorded as a process
   slip; no repository change was made to compensate for it.

### v1.0.27 Documentation Record — Authorization Act #__ (2026-09-25)

Under a separate, explicit human documentation-edit authorization (Authorization Act #__, number to
be assigned by the human; RC-__), this documentation-only pass records the Day 4 human governance
decisions and the retrospective repository-reviewer evidence.

1. **Result: v1.0.27 recorded.**
2. **Git state at time of writing**: HEAD and `origin/main` are
   `d1eaa1045fa4df09125e7e19eebb894211515c36` (Day 3 implementation commit, pushed; parent
   `9448d2f15663b89a736be89084d29e9927029ede`, Day 2 implementation commit). Production is
   `prod-v1.0.1` → `c2249c9`; neither `9448d2f` nor `d1eaa10` is deployed; P4 is OPEN.
3. **Human decisions recorded**: A1, B1, C1, D1, E1, F2 — see §4, "Decision status (v1.0.27)". Each is
   a decision only, not authorization to execute.
4. **Acceptance criteria**: AC-L4 checkbox and label changed by human decision A1 (criterion wording
   after the colon unchanged) — the only checkbox change. AC-J2 OPEN; AC-J4 DEFERRED; AC-L2/AC-L3
   UNVERIFIED; all other criteria, checkboxes, and gate statuses unchanged.
5. **Retrospective evidence**: see "Retrospective Repository-Reviewer Evidence (v1.0.27)" above.
6. **Release target (F2)**: the later documentation-only commit containing this v1.0.27 document, if
   created, reviewed, committed, and pushed under separate authorizations; its SHA is not yet known
   and is not recorded here. No release tag name is fixed.
7. **Not authorized by this record**: `CORS_ORIGIN` or `SENTRY_DSN` creation; Sentry project/DSN
   setup; any commit, push, or tag creation or push (including the `prod-v*` release tag and the
   checkpoint tag); any deployment, including the second production deployment; P4; production
   verification; registry read; Task 10-D; any remediation; any task acceptance.
8. No other file was modified by this documentation pass (the pre-existing, unrelated working-tree
   modifications and untracked entries are unaffected and remain as they were). Did **not** stage,
   commit, tag, or push; did **not** run or dispatch any workflow; did **not** access any secret value
   or production system. No credential value, DSN, or `.env` content is recorded in this document.

---

*This document is a planning specification only. It does not, by itself, authorize any
implementation beyond what has been separately and explicitly authorized above. Separate explicit
human authorization is required before any further task in this document may be implemented.
Current document status: v1.0.27 is APPROVED / AUTHORITATIVE as the governance reference (baseline
approval carried forward from Authorization Act #2); **the Day 2 PostgreSQL SSL change is committed
and pushed in `9448d2f` but NOT deployed (P4 OPEN)**; **the Day 3 implementation (D-2, D-3, D-5) is
committed and pushed in `d1eaa10` and NOT deployed**; human decisions A1–F2 are recorded (AC-L4
SATISFIED by human decision A1; `CORS_ORIGIN` and `SENTRY_DSN` decided but not authorized or created;
a `prod-v*` release tag permitted in principle for the second production deployment, not authorized);
retrospective repository-reviewer evidence is recorded (not retroactive); production
remains `prod-v1.0.1` → `c2249c9`; no commit, push, tag, secret creation, or second production
deployment is authorized by this document; **Task 10-B is ACCEPTED** (Authorization Act
#16; additionally evidenced for the corrected artifact at `724fe67`, v1.0.23); **Gate C is SATISFIED**
(2026-09-22, §8.1) and was used for the first production deployment; **the first production
deployment has occurred** — `prod-v1.0.1` → `c2249c9` (run `36003636133`, attempt 2; image
`sha256:e000b840…06a09`; DEC-9 resolved, v1.0.25) — but the application is **not publicly reachable**
(no Caddy/TLS; Task 10-D NOT AUTHORIZED); no further production release is authorized by this
document; **Task 10-F is NOT ACCEPTED** (AC-F5 and AC-F8 open; AC-F7 NOT SATISFIED, with a recorded
human exception disposition for its eventual acceptance); D-2, D-3, D-5 are authorized in principle
only, D-4 is not authorized, and D-8 is not authorized within Phase 10 (deferred); **Decision D-1 is RESOLVED — production domain `flavourfind.com`** (Authorization Act #19);
**Task 10-C is ACCEPTED** (Authorization Act #22, see §12 "Task 10-C Acceptance Record —
Authorization Act #22") — its DNS implementation was performed manually by the human operator and
independently verified read-only by Claude (AC-C1–AC-C3 all PASS); none of these extend to Task
10-D or any later Phase 10 task, all of which remain separately unauthorized — see the header above
and §12 for the full, current criterion-by-criterion, decision-by-decision, and task-by-task state.
(This footer previously read "PROPOSED — AWAITING HUMAN REVIEW AND EXPLICIT IMPLEMENTATION
AUTHORIZATION," a generic closing statement last accurate before the v1.0.10 baseline-approval
sequence; it was first reconciled to the then-current status in v1.0.16, updated to v1.0.17,
updated to v1.0.18 to reflect Task 10-B's acceptance, updated to v1.0.19 to reflect Decision D-1's
resolution, updated to v1.0.20 to reflect Task 10-C's acceptance, updated to v1.0.21 to reflect the Task 10-F Option B documentation correction (Authorization Act #23; see §11 and §12; Gate C remains NOT SATISFIED, Task 10-F remains NOT ACCEPTED, and production deployment remains UNAUTHORIZED), updated to v1.0.22 to reflect Decision D-F5's recording (Authorization Act #24; see §11 and §12; D-F5 is a human decision record only, not implementation authorization; at that time Gate C was NOT SATISFIED, Task 10-E and Task 10-F were NOT ACCEPTED, and production deployment was UNAUTHORIZED), updated to v1.0.23 (Authorization Act #25; see §11 and §12) to record Decision D-F6, the corrected-artifact evidence, and the failed first production release attempt, and to correct the current Gate C status to SATISFIED (2026-09-22) consistent with §8.1, updated to v1.0.24 (Authorization Act #26; see §11 and §12) to record the Deploy-step SSH correction in `48d62ac`, the resulting release-commit requirement, the human-reported Docker-readiness checkpoint, and the remaining DEC-9 decision, updated to v1.0.25 (Authorization Act #27; see §11 and §12) to record the first production deployment of `prod-v1.0.1`, DEC-9's resolution, the human AC-F6 determination, and the Stage 1 and C1–C15 human decisions, updated to v1.0.26 (Authorization Act #__, number to be assigned by the human; see §11 and §12) to record the Day 2 SSL commit `9448d2f` (not deployed; P4 OPEN), the uncommitted Day 3 implementation and its non-production validation, and the recorded governance deviation, and is updated here to v1.0.27 (Authorization Act #__, number to be assigned by the human; see §11 and §12) to record the Day 4 human governance decisions A1–F2, the AC-L4 disposition, and the retrospective repository-reviewer evidence. Earlier dated
"Document status remains: PROPOSED..." statements elsewhere in §11/§12 are historical attestations
of status at those specific past points in time and are preserved unchanged.)*
