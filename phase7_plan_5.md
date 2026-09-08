# Phase 7 Planning Specification — Corrected
## Flavour Find — Monorepo SaaS Project

**Document version:** 2.1.4
**Supersedes:** this document's own v2.1.3 revision — see §1G for this surgical state/governance reconciliation
**Also supersedes:** `phase7_plan_4.md` (v2.1.1), `phase7_plan_3.md` (v2.1.0), `phase7_plan_2.md` (v2.0.0), `phase7_plan_1.md` (v1.0.0)
**Planning session date:** 2026-09-08
**State reconciliation date:** 2026-09-08 (v2.1.3); 2026-09-08 (v2.1.4)
**Prepared by:** Claude (read-only audit + authorized state reconciliation) — planning specification only

---

## STATUS BLOCK

```
STATUS:             PHASE 7 IN PROGRESS — DELIVERABLE B CHECKPOINT COMPLETE; DELIVERABLE A
                    IMPLEMENTATION COMPLETE THROUGH B7 — CAPACITOR CHECKPOINT NOT YET TAGGED —
                    PRODUCTION-DEPENDENT RUNTIME ACCEPTANCE DEFERRED PENDING PHASE 10

PHASE 5:            COMPLETE / FROZEN
PHASE 5 CHECKPOINT: phase-5-checkpoint-1
PHASE 5 COMMIT:     746804515026d06f2c600a79e92460060eb56b22

PHASE 6:            COMPLETE / FORMALLY CLOSED
PHASE 6 CHECKPOINT: phase-6-checkpoint-1
PHASE 6 COMMIT:     5085f0112f6d4eda5e9d0805de63cd725ef45f9a

PLAYWRIGHT HARNESS: Post-Phase-6 correction separately authorized and verified.
                    Result: 5 passed / 1 skipped / 0 failed.
                    Does NOT modify Phase 6 checkpoint. See §2B.

PHASE 7 DELIVERABLE B (WIDGET):   COMPLETE / CHECKPOINTED / PUSHED
PHASE 7 WIDGET CHECKPOINT:        phase-7-widget-checkpoint-1
PHASE 7 WIDGET COMMIT:            fcca2f1e8ee3d59b6fb0aa87fb7fe918f987e81b

PHASE 7 DELIVERABLE A (CAPACITOR): IMPLEMENTATION COMPLETE THROUGH B7. B2–B5 complete (packages
                                    installed, config created, native Android project generated,
                                    INTERNET permission verified). B6 (production build) —
                                    COMPLETE: `apps/web/out/` built with
                                    `NEXT_PUBLIC_API_URL=https://api.flavourfind.com`. B7
                                    (`npx cap sync`) — COMPLETE: synced into
                                    `apps/web/android/app/src/main/assets/public/`, independently
                                    verified fresh/non-stale. No `phase-7-capacitor-checkpoint-1`
                                    tag exists yet — checkpoint commit/tag/push each remain
                                    separate, ungranted authorization gates (§11.3).
PHASE 7A PRODUCTION-DEPENDENT
RUNTIME ACCEPTANCE:                DEFERRED — PENDING PHASE 10 PRODUCTION DEPLOYMENT (Android
                                    runtime API connectivity, authenticated production sign-in,
                                    live `/chat` SSE, widget behavior against a live backend,
                                    DNS/HTTPS/Caddy, B8–B10 Android build/emulator/manual testing
                                    — none of these are marked complete by B6/B7's completion).

AUTHORIZED:         Deliverable B implementation — DONE. Deliverable A steps B2–B7 — DONE.
                    Capacitor checkpoint commit/tag/push — NOT AUTHORIZED. Phase 10 production
                    deployment work — NOT AUTHORIZED, NOT PERFORMED.

CAPACITOR:          Phase 7 scope — mobile packaging of static build (Deliverable A).
                    `apps/web/capacitor.config.ts` created; `@capacitor/core`/`@capacitor/cli`/
                    `@capacitor/android` 8.5.1 installed in `apps/web/`; `apps/web/android/`
                    generated via `npx cap add android`; production build and sync completed
                    through B7 using the human-designated production API origin (see §12,
                    Decision 3).
WIDGET:             Phase 7 scope — floating chat widget (Deliverable B, see SAAS_ROADMAP.md
                    §7.8). Implemented, validated, committed, tagged, and pushed. See §11.1.

NODE.JS RUNTIME:    v22.19.0 (accepted working runtime)
```

---

## GOVERNING PRINCIPLE

This document is a planning specification, not implementation authorization. No sentence in this document authorizes Phase 7 implementation. Phase 7 implementation requires a separate, explicit human implementation authorization issued after this planning document is reviewed and accepted.

The document is structured to be used as the authoritative baseline from which narrowly scoped Claude CLI implementation authorizations are later issued, one deliverable at a time.

---

## §1G — Changes From v2.1.3 → v2.1.4 (Surgical State/Governance Reconciliation)

This is a state/governance reconciliation only, mirroring the §1F pattern. It records facts about work (B6, B7) that was separately, explicitly authorized and independently verified successful (by both the `repository-reviewer` and `pr-reviewer` read-only review agents) after v2.1.3 was committed. It does **not** redesign, broaden, or re-architect any part of the plan, and it does not itself authorize any further implementation, Git operation, or Phase 10 work.

**Historical note preserved:** v2.1.3 (committed at `52e16e85af11d65ca00231ce0c098acd1994d71e`) accurately described the state *at the time it was written* — B6 and B7 had not yet been authorized or performed, and Decision 3 was genuinely still open. Those v2.1.3 statements are not being erased as a record of what was true then; they are being superseded here because B6 and B7 were subsequently authorized and completed in later sessions, which v2.1.3 could not have reflected. See §1F for the full v2.1.2→v2.1.3 changelog, left unmodified below.

| # | Reconciliation item |
|---|---|
| 1 | STATUS BLOCK updated: Deliverable A (Capacitor) now recorded as "IMPLEMENTATION COMPLETE THROUGH B7" — B6 (production build using `NEXT_PUBLIC_API_URL=https://api.flavourfind.com`, producing `apps/web/out/`) and B7 (`npx cap sync` into `apps/web/android/app/src/main/assets/public/`) both recorded COMPLETE. No `phase-7-capacitor-checkpoint-1` tag recorded as existing; commit/tag/push explicitly recorded as still-ungranted separate authorization gates. Production-dependent runtime acceptance explicitly recorded as DEFERRED — PENDING PHASE 10 PRODUCTION DEPLOYMENT |
| 2 | §2A Layer 1 Established Facts: the two v2.1.3 facts stating B6/B7 "have not been performed" superseded with facts recording B6/B7 as complete, including the verified baked-in API origin (`https://api.flavourfind.com`, no `/api` suffix, no `localhost`, no DigitalOcean IP) and sync freshness |
| 3 | §12 Open Decisions: Decision 3 (production API URL) status updated from "STILL OPEN — BLOCKING" to **RESOLVED for Phase 7 mechanical implementation purposes** — `https://api.flavourfind.com` recorded as the human-designated production API origin used in the B6 build and B7 sync. Explicitly distinguished from live/verified production status: the actual endpoint is **NOT YET LIVE** — no DNS, Caddy, HTTPS/TLS, or API deployment exists for it. Phase 10 remains responsible for all of that. This resolution applies only to unblocking the Phase 7 build/sync mechanics (B6/B7); it does not resolve, satisfy, or substitute for any production-dependent runtime acceptance criterion |
| 4 | §13 Track B: B6 and B7 rows annotated COMPLETE with evidence; the existing narrow-authorization note (B2–B5 authorized separately from a single bundled B1) extended to record B6/B7 as likewise separately authorized. B8 (human opens Android Studio) through B16 (push) explicitly reaffirmed as **not begun and not retroactively marked complete** — these remain Phase-10-dependent or separate-authorization-gated steps |
| 5 | §11.2 Checkpoint 7-B: status line updated to record that the build/sync/config completion criteria are now met, while the Android-runtime-dependent criteria (APK launch, sign-in completion, `/chat` SSE, widget-in-WebView behavior, manual test protocol) remain explicitly outstanding and DEFERRED — PENDING PHASE 10, and no checkpoint tag has been created |
| 6 | §16 Required Governance Conclusions updated to reflect B6/B7 completion and the Decision 3 resolution-for-mechanics distinction |
| 7 | No changes made to: Phase 7 architecture, the Next.js + Capacitor strategy, widget architecture/accessibility/state/testing requirements, Android requirements, security requirements, hard stops, checkpoint governance, commit/tag/push separation, out-of-scope items, future-phase scope, protected-file rules, or CORS governance (Decision 7 remains unauthorized) |
| 8 | No implementation scope added. Specifically not introduced by this reconciliation: Docker, Caddy configuration, deployment scripts, GitHub Actions, production server configuration, DNS instructions, any other infrastructure implementation, Stripe, Sentry, PostHog, iOS, push notifications, deep links, React Native/Expo, dependency cleanup, or unrelated refactoring |
| 9 | No file other than `phase7_plan_5.md` was modified as part of this reconciliation. No Git operation (add/commit/tag/push/amend/reset/rebase/clean) was performed |

---

## §1F — Changes From v2.1.2 → v2.1.3 (Surgical State/Governance Reconciliation)

This is a state/governance reconciliation only. It records facts about work that was separately, explicitly authorized and completed since v2.1.2. It does **not** redesign, broaden, or re-architect any part of the plan, and it does not itself authorize any further implementation.

| # | Reconciliation item |
|---|---|
| 1 | STATUS BLOCK updated to record: Deliverable B (Widget) checkpoint complete, tagged `phase-7-widget-checkpoint-1`, at commit `fcca2f1e8ee3d59b6fb0aa87fb7fe918f987e81b`, pushed; Deliverable A (Capacitor) steps B2–B5 complete; B6/B7 explicitly not authorized; no `phase-7-capacitor-checkpoint-1` tag exists |
| 2 | §2A Layer 1 Established Facts: added rows recording the Widget checkpoint (commit/tag/file set), Capacitor 8.5.1 package installation, `capacitor.config.ts` creation and content, `apps/web/android/` generation and INTERNET permission, and removal of the stale pre-existing `apps/web/out/` directory. Removed/superseded the two now-stale v1.0.0-era facts stating no Capacitor configuration and no `FloatingChatWidget.tsx` existed |
| 3 | §12 Open Decisions: Decisions 1, 2, 4, 5, 6, and 10 recorded as **RESOLVED** with their confirmed values, both in the summary table and in each decision's own subsection. Decision 3 (production API URL) explicitly reaffirmed as **STILL OPEN — BLOCKING**; no URL recorded, invented, or substituted. Decisions 7, 8, 9 unchanged |
| 4 | §13: Pre-Phase-7 Prerequisites table (P1–P4) annotated with current satisfaction status; Track A table annotated as fully complete (checkpoint tagged and pushed); Track B table annotated to record that B2–B5 were completed under separate narrow authorizations (not the single bundled B1 authorization originally envisioned), and that B6 onward remain unauthorized |
| 5 | §11.1 and §11.2: added current status lines — Checkpoint 7-A (Widget) recorded complete; Checkpoint 7-B (Capacitor) recorded explicitly incomplete, with no tag created |
| 6 | §16 Required Governance Conclusions updated to reflect the above state |
| 7 | No changes made to: Phase 7 architecture, the Next.js + Capacitor strategy, widget architecture/accessibility/state/testing requirements, Capacitor/Android requirements, security requirements, hard stops, checkpoint governance, commit/tag/push separation, out-of-scope items, future-phase scope, protected-file rules, or CORS governance (§7.4, §9.5, Decision 7 — CORS narrowing remains unauthorized) |
| 8 | No application source file, `SAAS_ROADMAP.md`, or any file other than this plan was modified as part of this reconciliation |

---

## §1E — Changes From v2.1.1 → v2.1.2 (phase7_plan_4.md)

Four surgical consistency corrections only. No architectural or substantive planning changes.

| # | Correction |
|---|---|
| 1 | §10.2 Floating Widget E2E tests: unconditional "Widget FAB NOT visible on `/chat` page" requirement replaced with a conditional requirement — the `/chat` visibility behavior must match the human-confirmed Decision 4 option; three conditional sub-cases stated (Option A/B/C) |
| 2 | §11.1 Checkpoint 7-A completion criteria: unconditional "Widget FAB visible on all pages except `/chat`" replaced with governance-neutral criterion "Widget FAB `/chat` visibility behavior matches the human-confirmed Decision 4 option" |
| 3 | §9.4 Bearer Token Security: removed misleading security characterization "Android WebView has a lower XSS risk profile than open web" — no replacement claim introduced |
| 4 | §13 Track A execution sequence: verified no unconditional `/chat` FAB visibility assumption present — no change required |

---

## §1D — Changes From v2.1.0 → v2.1.1 (phase7_plan_3.md)

Three surgical consistency corrections only. No architectural or substantive planning changes.

| # | Correction |
|---|---|
| 1 | §12 Open Decisions summary table, Decision 4 row: "Recommendation" column updated to note "recommendation — not authorization"; "Blocking?" column corrected from "No — default to hide" to "Yes — must be explicitly confirmed before widget implementation" |
| 2 | §6.1 (§3.2 and What the Widget Is): removed absolute "all pages" / "every page" language; added explicit note that `/chat` visibility is subject to human-confirmed Decision 4 |
| 3 | §7.4: changed "All Capacitor packages are installed in `apps/web/`" to "All Capacitor packages are planned to be installed in `apps/web/`" to accurately reflect that no packages are yet installed |

---

## §1C — Changes From v2.0.0 → v2.1.0 (phase7_plan_2.md)

Two targeted governance corrections only. No architectural or substantive planning changes.

| # | Correction |
|---|---|
| 1 | Decision 4 governance: §2A Layer 2 table blocking status corrected from "No — can be decided during implementation" to "Yes — must be explicitly confirmed before widget implementation"; §6.6 opening changed from "Established architectural decision (human confirmation recommended)" to "Human decision required before widget implementation"; §12 Decision 4 "Default:" line removed — replaced with explicit confirmation requirement |
| 2 | §16 redundant status lines cleaned up: "PHASE 6: READY FOR CLOSURE RECORD" removed; duplicated PHASE 6 CHECKPOINT/TAG lines at the end removed |

---

## §1 — Changes From v1.0.0 (phase7_plan_1.md)

The following material corrections were made in v2.0.0:

| # | Correction |
|---|---|
| 1 | §8.1 Playwright governance language corrected — "must not be modified or committed" removed; replaced with post-checkpoint status and authorization model |
| 2 | Phase 7 test-harness baseline section added (§2B) recording verified 5/1/0 result |
| 3 | Widget → Capacitor dependency made explicit: widget in web build ⟹ widget in Android package |
| 4 | Capacitor version language tightened: `^6.x` is a planning hypothesis, not authorized fact |
| 5 | Clerk + Capacitor WebView behavior: all behavior in Android WebView is an implementation-time verification requirement |
| 6 | `@capacitor/browser` language corrected: OAuth return mechanism must not be assumed |
| 7 | `better-sqlite3` cleanup deferred: not Phase 7 scope |
| 8 | CORS narrowing: NOT a Phase 7 implementation task unless separately authorized |
| 9 | Production API URL example `https://api.flavourfind.com` identified as illustrative placeholder only |
| 10 | Android project git-tracking recommendation remains; does not authorize Git operations |
| 11 | Widget authentication UX made deterministic: unauthenticated widget sign-in navigates to `/sign-in` |
| 12 | Accessibility: removed claim that Tailwind "defaults to WCAG AA" |
| 13 | Unauthorized-change hard-stop: auto-revert removed; replaced with stop-and-report procedure |
| 14 | Three-layer planning structure added (§2A): established facts, human decisions, implementation hypotheses |

---

## §1B — What Was Preserved From v1.0.0

The following material from v1.0.0 is preserved without substantive change:

- Phase 7 objective (two independently authorizable deliverables)
- Capacitor architecture (config location recommendation, build flow, Android project structure, webDir, androidScheme)
- Widget architecture (FloatingChatWidget.tsx, layout.tsx insertion, Option B duplication)
- Checkpoint governance model (phase-7-widget-checkpoint-1, phase-7-capacitor-checkpoint-1)
- Open Decisions structure (expanded and corrected in this version)
- Out-of-scope protections
- Execution sequence (Track A: Widget → Track B: Capacitor)
- Testing strategy (except Playwright governance language corrected)

---

## §2A — Three-Layer Planning Structure

This document deliberately distinguishes three layers. A future Claude CLI implementation session must not confuse a hypothesis with an established fact.

### Layer 1 — Established Facts

These are confirmed by completed, committed, validated work. They are not hypotheses.

| Fact | Evidence |
|---|---|
| Phase 5 checkpoint `746804515026d06f2c600a79e92460060eb56b22` is immutable | Annotated tag `phase-5-checkpoint-1`; frozen |
| Phase 6 checkpoint `5085f0112f6d4eda5e9d0805de63cd725ef45f9a` is immutable | Annotated tag `phase-6-checkpoint-1`; formally closed |
| `apps/web/next.config.ts` has `output: 'export'` and `trailingSlash: true` | Phase 6 checkpoint; Phase 6 completion criteria verified |
| `apps/web/out/` is produced by `npm run build` | Phase 6 completion criteria verified |
| All 6 frontend API consumer files use `${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/...` | Phase 6 T6.B track completion; ChatClient.tsx confirmed |
| `@clerk/react` 6.15.1 is the frontend auth package; `@clerk/nextjs` was removed in Phase 6 | Phase 6 checkpoint |
| `ClerkProvider` wraps the entire app via `ClerkClientProvider.tsx` → `layout.tsx` | Read-only audit confirmed |
| `ChatClient.tsx` is Phase 5 frozen; only the URL string was changed in Phase 6 | Phase 6 ChatClient.tsx freeze verification criteria |
| Backend uses `@clerk/express`; each authenticated route independently verifies the Clerk JWT | Phase 6 Gate D security audit passed |
| `server.js` uses `app.use(cors())` — wildcard CORS; confirmed adequate in Phase 6 Gate K | Phase 6 Gate K Outcome K-1 |
| `/api/v1/chat` accepts POST, returns SSE stream, checks `chat_usage` limit, records to PostgreSQL | Phase 5 implementation; Phase 6 PostgreSQL migration |
| PostgreSQL (Neon) is the database backend; `database.js` is fully async | Phase 6 Track A completion |
| Post-Phase-6 Playwright harness: 5 passed / 1 skipped / 0 failed | Separately authorized harness correction, verified (§2B) |
| **(v2.1.3)** Phase 7 Widget checkpoint `fcca2f1e8ee3d59b6fb0aa87fb7fe918f987e81b` is implemented, committed, tagged `phase-7-widget-checkpoint-1`, and pushed to `origin/main` | Read-only audit; `origin/main` HEAD matches the checkpoint commit |
| **(v2.1.3)** The Widget checkpoint's exact file set is `apps/web/app/layout.tsx` (modified), `apps/web/components/FloatingChatWidget.tsx` (new), `apps/web/e2e/floating-widget.spec.ts` (new) | Read-only audit of checkpoint commit diff |
| **(v2.1.3)** `@capacitor/core`, `@capacitor/cli`, `@capacitor/android` are installed in `apps/web/` at exact version `8.5.1` (Track B step B2 complete) | Read-only audit of `apps/web/package.json` and lockfile |
| **(v2.1.3)** `apps/web/capacitor.config.ts` exists with `appId: 'com.flavourfind.app'`, `appName: 'Flavour Find'`, `webDir: 'out'`, `server.androidScheme: 'https'`, and no API URL field (Track B step B3 complete) | Read-only audit |
| **(v2.1.3)** `apps/web/android/` was generated via `npx cap add android`; `AndroidManifest.xml` contains `android.permission.INTERNET` (Track B steps B4–B5 complete) | Read-only audit |
| **(v2.1.3)** The pre-existing stale `apps/web/out/` directory (predating the Capacitor workflow, containing a build with `http://localhost:3000` baked in) was separately authorized and deleted; it has not been restored | Read-only audit |
| **(v2.1.4)** Track B step B6 is complete: `npm run build` was run in `apps/web` with `NEXT_PUBLIC_API_URL=https://api.flavourfind.com`, producing `apps/web/out/`. Independently verified (twice, by two separate read-only review agents) that the compiled bundle bakes in exactly `https://api.flavourfind.com` with no `/api` suffix, no `localhost`, and no DigitalOcean IP address | Read-only audit; independent `repository-reviewer` and `pr-reviewer` verification |
| **(v2.1.4)** Track B step B7 is complete: `npx cap sync` was run from `apps/web`, copying the fresh `apps/web/out/` into `apps/web/android/app/src/main/assets/public/`. Independently verified fresh/non-stale via matching mtimes and identical baked-URL content | Read-only audit; independent `repository-reviewer` and `pr-reviewer` verification |
| **(v2.1.4)** No `phase-7-capacitor-checkpoint-1` tag exists; the Capacitor checkpoint commit, tag, and push each remain separate, ungranted authorization gates per §11.3 | Read-only audit |
| **(v2.1.4)** The actual `https://api.flavourfind.com` endpoint is human-designated as the intended production API origin but is NOT YET LIVE — no DNS, Caddy, HTTPS/TLS, or API deployment exists for it. This is Phase 10 scope | Human-reported infrastructure state; not independently verifiable from within the repository |

### Layer 2 — Phase 7 Human Decisions

These require explicit human resolution before Phase 7 implementation can begin or proceed. Recommendations are noted but are not authorization.

| Decision | Default Recommendation | Blocking? |
|---|---|---|
| Capacitor config file location (`apps/web/` vs. repo root) | `apps/web/` (Option A) | Yes — before Capacitor init |
| Android project git-tracking policy (commit or `.gitignore`) | Commit `apps/web/android/` | Before Capacitor checkpoint commit |
| Production API URL for Android build | Human must supply — no default authorized | Yes — before Android build |
| Widget visibility on `/chat` page (hide vs. show) | Hide via `usePathname()` (recommendation — not authorization) | Yes — must be explicitly confirmed before widget implementation |
| Widget authentication UX (see §4.12) | Navigate to `/sign-in` when unauthenticated user activates sign-in | Yes — must be explicit before widget implementation |
| Widget conversation persistence (ephemeral vs. localStorage vs. server) | Ephemeral for Phase 7 | No |
| Clerk OAuth/social-login strategy in WebView (see §7.2) | Verify standard flow first; OAuth requires separate authorization | Yes if OAuth is enabled |
| CORS narrowing (see §7.4) | Separately authorized; not default Phase 7 scope | No (see §7.4) |
| Execution order (Widget first or Capacitor first) | Widget first (Track A → Track B) | Governance decision before implementation |
| `better-sqlite3` cleanup | Deferred outside Phase 7 | No |

### Layer 3 — Implementation Hypotheses Requiring Verification

These are planning assumptions that must be verified during later authorized implementation. They are not established facts.

| Hypothesis | Must Be Verified At |
|---|---|
| Capacitor `^6.x` package family is compatible with this project | Package installation time |
| Capacitor is compatible with Node.js v22.19.0 | Package installation time |
| Capacitor is compatible with Next.js 15.2.9 / React 19.0.3 | Package installation time and first sync |
| Android/Gradle/toolchain is compatible with the chosen Capacitor version | Android build time |
| Clerk sign-in (email/password) works inside the Capacitor Android WebView | First Android run |
| Clerk sign-up works inside the Capacitor Android WebView | First Android run |
| Clerk session establishment and persistence work inside the WebView | First Android run |
| Authenticated API calls succeed from the WebView | First Android run |
| OAuth/social-login (if enabled) works inside the WebView | Android OAuth test |
| SSE streaming via Fetch + ReadableStream works in the target Android WebView | Android chat test |
| `androidScheme: 'https'` does not break Clerk redirect flows | First Android sign-in test |
| Production API is reachable from Android device/emulator via `NEXT_PUBLIC_API_URL` | First Android API call |
| Back button / gesture navigation behavior is acceptable | Manual Android test |
| Floating widget behaves correctly in WebView environment | Android widget test |

---

## §2B — Phase 7 Test-Harness Baseline (NEW — Separately Authorized and Closed)

The following records the status of the post-Phase-6 Playwright harness. This section prevents a future Claude CLI implementation session from unnecessarily re-opening an already-closed issue.

### Current Status: CLOSED — NO FURTHER CORRECTION REQUIRED

The post-Phase-6 Playwright harness correction was separately authorized after the Phase 6 checkpoint. It was applied and verified successfully.

| Item | Status |
|---|---|
| Harness correction authorization | Separately authorized after Phase 6 checkpoint |
| Correction applied | Yes |
| Existing suite result | **5 passed / 1 skipped / 0 failed** |
| `NEXT_PUBLIC_API_URL` supplied to Playwright web server | Yes — established by the harness correction |
| Root `.env` loaded by Playwright global setup | Yes — established by the harness correction |
| Existing E2E Clerk credentials available to Playwright process | Yes — available via root `.env` |
| Further harness correction currently required | **No** |

### Governance of the Post-Phase-6 Playwright Files

The Playwright files `apps/web/global-setup.ts`, `apps/web/playwright.config.ts`, and `apps/web/e2e/chat.spec.ts` contain post-Phase-6-checkpoint changes.

**These changes:**
- Do NOT alter, rewrite, or retroactively modify the immutable Phase 6 checkpoint `5085f0112f6d4eda5e9d0805de63cd725ef45f9a`
- Do NOT modify the Phase 6 tag `phase-6-checkpoint-1`
- Are not part of the Phase 6 checkpoint

**Future modifications** to these files are not permanently prohibited. However:
- Any future modification to Playwright harness files requires its own explicit human authorization
- Any future commit containing these files requires separate, explicit human commit authorization
- No Claude CLI session may modify or commit these files without that authorization

---

## §3 — Phase 7 Objective

Phase 7 has two deliverables. They are separate and independently authorizable. Neither modifies the Phase 6 checkpoint.

### §3.1 — Deliverable A: Capacitor Mobile Packaging

Wrap the `apps/web/out/` static Next.js build in a Capacitor Android WebView shell so Flavour Find runs as a native Android application. The web application source code does not change — Capacitor wraps the build output; it does not re-implement the frontend. The Express backend server is not embedded in the mobile app; the Android client calls the same production API endpoint that the web client uses.

Phase 6 prerequisite satisfied (Layer 1 established fact): `apps/web/next.config.ts` has `output: 'export'` and `trailingSlash: true`. Phase 6 validation confirmed `apps/web/out/` is produced by `npm run build`. This is the hard prerequisite for Capacitor and is now met.

### §3.2 — Deliverable B: Floating Chat Widget

Add a floating chat button and expandable panel to the Flavour Find Next.js web application. The widget is rendered from `apps/web/app/layout.tsx` and provides chat access without navigating to the dedicated `/chat` page. The widget reuses the existing `/api/v1/chat` endpoint and `chat_usage` rate-limiting — no new backend routes are required. The dedicated `/chat` page and `ChatClient.tsx` are preserved unchanged. Visibility on the `/chat` page specifically is subject to human-confirmed Decision 4 (§12) and is not determined by this document.

### §3.3 — Authorization Scope

- Deliverable A and Deliverable B may be authorized and implemented independently.
- Deliverable B does not require Deliverable A to be complete first.
- Neither deliverable is authorized for implementation by this document.

### §3.4 — Widget → Capacitor Execution Relationship

When Deliverable B (floating chat widget) is implemented and included in the approved static web build before Deliverable A (Capacitor) is synchronized, the resulting Android package will include the widget. This is an execution relationship, not a dependency in the blocking sense:

- The widget can be implemented, validated, and checkpointed entirely as a web-application change (Track A) without any Capacitor involvement.
- The Capacitor sync/build (Track B) packages whatever approved static web build exists at sync time.
- Capacitor authorization does not authorize modifications to the widget.
- Widget authorization does not authorize Capacitor initialization or packaging.

**Recommended execution order:** Widget first (Track A) → Capacitor second (Track B), so the Android package includes the validated widget from the start. The human may override this order.

---

## §4 — Current-State Audit (Post-Phase-6 Checkpoint)

This audit reflects the Phase 6 checkpoint state (`5085f0112f6d4eda5e9d0805de63cd725ef45f9a` / `phase-6-checkpoint-1`). All findings are read-only.

### §4.1 — Next.js Configuration

**File:** `apps/web/next.config.ts`

```typescript
import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
};
export default nextConfig;
```

**Established facts (Layer 1):**
- `output: 'export'` — static export mode; no Next.js server runtime at runtime
- `trailingSlash: true` — all routes produce `index.html` files in subdirectories
- NO `rewrites()` — removed in Phase 6 (incompatible with static export)
- NO Next.js middleware — `middleware.ts` with `clerkMiddleware()` removed in Phase 6
- **Phase 7 does not need to modify `next.config.ts`.** Any modification to this file requires separate explicit authorization.

### §4.2 — Static Build Output

**Directory:** `apps/web/out/` (verified present post-Phase-6)

The `out/` directory includes `index.html`, `chat/index.html`, `sign-in/index.html`, `sign-up/index.html`, `saved/index.html`, and recipe/mood page directories. This is the directory Capacitor's `webDir` will reference.

### §4.3 — Clerk Authentication Architecture

**Frontend:** `@clerk/react` 6.15.1 (Layer 1 established fact)

- `ClerkProvider` wraps the entire app via `ClerkClientProvider.tsx` → `layout.tsx`
- All pages have Clerk context via `useAuth()`, `useUser()`, etc.
- `ChatClient.tsx` uses `useAuth()` → `getToken()` → `Authorization: Bearer <token>` header
- No server-side Clerk runtime in the static build
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` must be set at build time

**Backend:** `@clerk/express` 1.7.82 (Layer 1 established fact)

- `clerkMiddleware()` applied globally in `server.js`
- Per-route: `const { isAuthenticated, userId } = getAuth(req)` pattern
- All authenticated routes independently verify the Bearer token (Gate D audit passed in Phase 6)

**Capacitor WebView caveat (Layer 3 hypothesis — must NOT be assumed as proven):**

The Phase 6 architecture successfully establishes client-side Clerk authentication within the static web application. However, actual Clerk sign-in, sign-up, session establishment, session persistence, authenticated API call behavior, and behavior after returning from authentication inside the Capacitor Android WebView remain implementation-time verification requirements. These behaviors must not be assumed from the Phase 6 static-export validation alone. They must be verified during authorized Android testing.

### §4.4 — Chat Architecture

**Component:** `apps/web/components/ChatClient.tsx` — **FROZEN (Phase 5)**

Key characteristics:
- Full-page layout: `min-h-screen`, `max-w-2xl` — designed for the `/chat` page, not embeddable
- Auth: `useAuth()` → `getToken()` → `Authorization: Bearer` per request
- API: `fetch(\`\${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/v1/chat\`, ...)`
- Streaming: ReadableStream + TextDecoder, SSE parsing, AbortController
- State: `messages[]`, `input`, `isStreaming`, `remaining`, `resetAt`, `errorMessage`
- Rate limit: `remaining` count shown; 429 response handled; unauth state handled

`ChatClient.tsx` is **not** directly reusable as an embedded widget. Phase 7 creates a new `FloatingChatWidget.tsx`. `ChatClient.tsx` is not modified.

### §4.5 — Frontend API Call Pattern

All 6 API consumer files use:

```javascript
fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/...`)
```

The empty-string fallback (`''`) works in the web browser (same-origin). It does NOT work in a Capacitor WebView — there is no Express server to be same-origin with. The Android build must supply a populated `NEXT_PUBLIC_API_URL` at build time. See §6.2.

### §4.6 — Backend: CORS

**Layer 1 established fact:** `app.use(cors())` — wildcard CORS; Gate K confirmed adequate for Phase 6.

The wildcard CORS permits requests from Capacitor WebView origins (`capacitor://localhost`, `https://localhost` on Android). No CORS change is required for Phase 7 to function. Any CORS modification requires a separate, explicitly scoped human authorization — it is not a default Phase 7 implementation task. See §7.4.

### §4.7 — Backend: `/api/v1/chat`

- POST; requires `Authorization: Bearer` header
- `checkChatLimit(userId)` → 429 if exhausted
- Streams Anthropic SDK response as SSE
- Records to `chat_usage` via `insertChatUsage(userId, mood)` (awaited)
- No changes required for Phase 7 — the same endpoint serves both the `/chat` page and the floating widget

### §4.8 — Package Dependencies (Relevant to Phase 7)

**`apps/web/package.json`:**
- `@clerk/react`: 6.15.1
- `next`: 15.2.9
- `react`: 19.0.3
- `react-dom`: 19.0.3
- No Capacitor packages present
- No floating widget library present

**Root `package.json` — `better-sqlite3` note:**

`better-sqlite3` remains listed in the root `package.json` despite Phase 6's PostgreSQL migration. This is not a Phase 7 concern. Cleanup of unused dependencies is deferred outside Phase 7 scope and requires its own separate cleanup authorization. Phase 7 does not authorize any dependency removal.

### §4.9 — Monorepo Structure

```
flavour_find-app/
  apps/
    web/
      out/                  ← Static build output (Capacitor webDir — exists)
      app/
        layout.tsx          ← Widget global insertion point (can be modified in Phase 7)
        page.tsx
        chat/page.tsx       ← Frozen
      components/
        ChatClient.tsx      ← Frozen (Phase 5)
        ClerkClientProvider.tsx
        [other components]
      next.config.ts        ← output: 'export', trailingSlash: true — do not modify
      package.json
  server.js                 ← Express backend — do not modify (except separately authorized CORS work)
  database.js               ← PostgreSQL/pg async — do not modify
  package.json              ← Root workspace
```

No `apps/mobile/`, no `apps/android/`, no `capacitor.config.ts`, no `FloatingChatWidget.tsx`.

---

## §5 — Capacitor Architecture

### §5.1 — What Capacitor Does

Capacitor takes the `apps/web/out/` static HTML/CSS/JS build and serves it inside an Android WebView. The result is a native Android APK. Capacitor provides the native shell, a bridge layer for native API access, a plugin system, and build tooling. It does not modify Next.js source code — it wraps build output.

### §5.2 — Capacitor Configuration File Location

**Human Decision required — §10, Decision 1.**

**Option A (Recommended): `apps/web/capacitor.config.ts`**
- `webDir: 'out'` — relative to `apps/web/`
- Android project at `apps/web/android/`
- All Capacitor commands run from `apps/web/`
- Co-located with the Next.js project; Capacitor convention

**Option B: Repo root `capacitor.config.ts`**
- `webDir: 'apps/web/out'`
- Android project at `android/` (repo root)

Recommendation: Option A. The human must confirm before Capacitor initialization.

### §5.3 — Android Project Structure (Post-Initialization Hypothesis)

With Option A, the post-initialization structure is expected to be:

```
apps/web/
  android/                  ← Generated by 'npx cap add android' (does not exist yet)
    app/src/main/
      AndroidManifest.xml
      java/.../MainActivity.java
      assets/public/        ← 'npx cap sync' copies out/ here
  capacitor.config.ts       ← Created in Phase 7 (does not exist yet)
  out/                      ← Static build output
```

This is a planning hypothesis (Layer 3). The actual structure is produced by Capacitor initialization and may differ.

### §5.4 — Proposed Capacitor Configuration Content

The following is a planning hypothesis (Layer 3) — not authorized for implementation:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.flavourfind.app',
  appName: 'Flavour Find',
  webDir: 'out',
  server: {
    androidScheme: 'https',
  },
};

export default config;
```

Notes on the hypothesis:
- `appId: 'com.flavourfind.app'` — reverse-domain; required for Play Store (human must confirm this is the intended ID)
- `webDir: 'out'` — relative to `apps/web/`; points to the static build
- `androidScheme: 'https'` — serves assets under `https://localhost`; may be required for Clerk redirects — **must be verified during Android testing** (Layer 3 hypothesis)
- No `server.url` in production config — assets served from the bundled `out/` directory

### §5.5 — API Origin Problem in Capacitor WebView

**Layer 1 established fact:** All API calls use `NEXT_PUBLIC_API_URL ?? ''`. The empty-string fallback does not work in a Capacitor WebView.

**Consequence:** The Android build must supply `NEXT_PUBLIC_API_URL` set to the production Express server URL. This is a build-time configuration requirement. The production URL must be explicitly provided by the human — see §6.2 and §10, Decision 3.

**Development testing:** For Capacitor development testing, `NEXT_PUBLIC_API_URL` must be set to a reachable server URL (production or an accessible development server). The local `localhost:3000` Express server is not reachable from the Android emulator or device without additional network configuration.

### §5.6 — Capacitor Package Versions

**IMPORTANT — Layer 3 hypothesis:**

No Capacitor package version is authorized by this planning document. The candidate package family `@capacitor/core`, `@capacitor/cli`, and `@capacitor/android` at approximately `^6.x` is a planning hypothesis based on current Capacitor releases. The exact compatible version set must be verified against:
- This project's Node.js runtime (v22.19.0)
- Next.js 15.2.9 and React 19.0.3
- The Android/Gradle/toolchain environment available at implementation time
- Any existing dependency constraints in `apps/web/package.json`

before installation is authorized. If `^6.x` is confirmed as the correct family at implementation time, it will be stated in the implementation authorization. This planning document does not authorize installing any specific version.

The three packages must be at the same major version:
- `@capacitor/core` → apps/web production dependency
- `@capacitor/cli` → apps/web dev dependency
- `@capacitor/android` → apps/web dev dependency

### §5.7 — Capacitor Build Process (Planning Hypothesis)

```
[Phase 7 Capacitor build flow — hypothesis only, not authorized]

1. npm run build (apps/web)
   └─ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<key>
   └─ NEXT_PUBLIC_API_URL=<human-supplied production URL>
   └─ produces: apps/web/out/

2. npx cap sync (apps/web)
   └─ copies apps/web/out/ → apps/web/android/app/src/main/assets/public/
   └─ updates native plugin dependencies

3. npx cap open android (apps/web)
   └─ opens apps/web/android/ in Android Studio

4. Android Studio: Build > Generate Signed Bundle / APK (human action)
```

Steps 1–2 are shell commands that require implementation authorization. Steps 3–4 require human action. None of these steps is authorized by this document.

### §5.8 — Required Native Permissions

`AndroidManifest.xml` will need `android.permission.INTERNET`. Capacitor typically adds this on `npx cap add android`. It must be verified after project initialization.

### §5.9 — Capacitor Plugins

No Capacitor plugins beyond `@capacitor/core` + `@capacitor/cli` + `@capacitor/android` are required for the base Phase 7 Capacitor deliverable. The following are explicitly out of Phase 7 scope:

- `@capacitor/browser` — required only if OAuth/social-login WebView behavior fails and human authorizes this approach separately (see §7.2)
- `@capacitor/push-notifications` — future phase
- `@capacitor/preferences` — future phase

### §5.10 — Turbo / Monorepo Integration

Capacitor commands run from `apps/web/`. The existing `turbo.json` does not need modification for Phase 7. Optional future improvement: a Turbo task for `cap sync`. Not Phase 7 scope.

---

## §6 — Floating Chat Widget Architecture

### §6.1 — What the Widget Is

A floating action button (FAB) fixed at the bottom-right of the page, rendered globally from `apps/web/app/layout.tsx`. Clicking the FAB expands a compact chat panel. The panel maintains its own chat session, independent from the `/chat` page. The `/chat` page and `ChatClient.tsx` are not modified. Whether the FAB is visible on the `/chat` page is subject to human-confirmed Decision 4 (§12) and is not determined by this document.

### §6.2 — Component Structure

**New file: `apps/web/components/FloatingChatWidget.tsx`** (does not exist; must not be created until Phase 7 is authorized)

This is a `'use client'` component. It will:
- Import `useAuth` from `@clerk/react`
- Import `usePathname` from `next/navigation` (for route detection)
- Manage open/closed state locally (`useState`)
- Manage its own messages list, input, streaming state (independent of `ChatClient.tsx`)
- Send requests to `${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/v1/chat` with Bearer auth
- Render as a fixed-position overlay

**Modification: `apps/web/app/layout.tsx`** — the widget is added to the root layout after `{children}`:

```tsx
import { FloatingChatWidget } from '@/components/FloatingChatWidget';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkClientProvider>
          {children}
          <FloatingChatWidget />
        </ClerkClientProvider>
      </body>
    </html>
  );
}
```

`layout.tsx` is not on the Phase 6 frozen list and may be modified in authorized Phase 7 implementation. `ChatClient.tsx` and `apps/web/app/chat/page.tsx` remain frozen.

### §6.3 — Shared Logic: Option B — Duplication (Established Architectural Decision)

`FloatingChatWidget.tsx` contains its own implementation of the SSE streaming, auth, and rate-limit handling logic. It does not share code with `ChatClient.tsx`.

**Rationale (to be carried forward in implementation):** The duplication is intentional in Phase 7. `ChatClient.tsx` is Phase 5 frozen — any refactoring to extract a shared hook would constitute a modification of a frozen file and broaden Phase 7 scope into a shared-chat refactor. The widget borrows the pattern from `ChatClient.tsx` but implements it independently. This duplication can be resolved in a future phase when `ChatClient.tsx` freeze is explicitly lifted.

**`ChatClient.tsx` must not be modified during widget implementation.** If a future implementation session determines that it is impossible to implement the widget without touching `ChatClient.tsx`, the session must STOP and report this finding before making any change.

### §6.4 — Widget UI States

| State | Description |
|---|---|
| Collapsed (default) | Fixed FAB at bottom-right. Chat bubble icon. `aria-label="Open chat"`. |
| Expanded, unauthenticated | Panel visible; sign-in prompt with a button/link that navigates to `/sign-in` (see §6.12). |
| Expanded, authenticated, empty | Panel visible; placeholder/welcome; input field focused. |
| Expanded, authenticated, streaming | Streaming assistant message; abort button; input disabled during stream. |
| Expanded, rate-limited | Rate-limit message with `resetAt` time shown; input disabled. |
| Expanded, error | Error message; option to retry; input re-enabled. |

### §6.5 — Widget Layout and Positioning

Planning hypothesis for layout (Layer 3 — not implementation authorization):

```css
/* FAB */
position: fixed;
bottom: 1.5rem;
right: 1.5rem;
z-index: 50;
border-radius: 9999px;
min-width: 56px;
min-height: 56px;    /* 56px satisfies 48px minimum touch target */

/* Expanded Panel */
position: fixed;
bottom: 5rem;
right: 1.5rem;
width: 24rem;
height: 32rem;
z-index: 50;
border-radius: 1rem;
overflow: hidden;
```

Mobile adaptation (< 640px):
```css
width: calc(100vw - 2rem);
height: 60vh;
```

### §6.6 — Widget Behavior on `/chat` Page

**Human decision required before widget implementation (see §10, Decision 4):** The default recommendation is to hide the FAB when the user is on `/chat`. This is a recommendation only — the human must explicitly confirm this behavior (or specify an alternative) before Deliverable B implementation begins. Claude CLI may not choose this behavior without explicit human confirmation.

Implementation: `FloatingChatWidget.tsx` uses `usePathname()` from `next/navigation` to detect the current route and returns `null` when `pathname === '/chat'` (accounting for `trailingSlash: true` behavior: the route may be `/chat/` or `/chat`; the implementation must handle both). This approach works correctly with Next.js App Router static export.

See §10, Decision 4 for human confirmation.

### §6.7 — Widget Conversation Context

The widget maintains independent in-memory message history, separate from the `/chat` page. Messages are lost on page reload. No cross-page context sharing in Phase 7.

### §6.8 — Widget Accessibility Requirements

The following are implementation requirements for the Phase 7 widget — not yet verified:

- FAB: `aria-label="Open chat"` when collapsed; `aria-label="Close chat"` when expanded
- Expanded panel: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to a panel heading
- When panel opens: focus moves to the input field
- Focus trap: while panel is open, Tab cycles within panel only
- Escape key: closes the panel; focus returns to FAB
- Chat messages container: `aria-live="polite"` for screen reader announcements
- Touch targets: FAB and interactive elements at minimum 48×48px
- Color contrast: foreground/background color combinations used in the widget must be verified to meet applicable contrast requirements during implementation. Tailwind utility classes do not by themselves guarantee WCAG compliance — contrast must be verified for each specific color combination chosen.

### §6.9 — Widget in Capacitor WebView

The widget is part of the Next.js static build. When included in `apps/web/out/`, it is present in the Android WebView. No Capacitor-specific widget changes are required. Widget behavior in the Capacitor WebView is an implementation-time verification requirement (Layer 3 hypothesis) — it is not assumed to work identically to the web browser without Android testing.

### §6.10 — Responsive Layout in Capacitor

Touch targets must be at minimum 48×48px for Android usability. The FAB at 56px diameter satisfies this. The mobile-width responsive layout (§6.5) covers small Android screens. Actual visual behavior on Android emulator/device must be verified during authorized Android testing.

### §6.11 — Widget vs. `/chat` Page: Independent Sessions

The widget and the `/chat` page maintain completely independent conversation state. There is no shared state, shared context, or synchronized history between them. This is a planning decision: shared context is explicitly out of Phase 7 scope.

### §6.12 — Widget Authentication UX (Deterministic Behavior — Human Decision Required)

**This behavior must be explicitly confirmed by the human before widget implementation begins.**

**Specified behavior:** When an unauthenticated user opens the widget and selects the sign-in action (by clicking a "Sign in" button or link displayed in the expanded panel), the widget navigates to the existing `/sign-in` route using `window.location.href = '/sign-in'` or an equivalent Next.js navigation call.

This behavior:
- Reuses the existing static `/sign-in` page (already in `apps/web/out/`)
- Does not introduce a new authentication mechanism
- Is compatible with the static-export architecture
- Does not open a modal, popup, or inline sign-in form within the widget

If the human specifies a different behavior (e.g., redirecting to `/sign-in?redirect_url=<current_path>` to return the user after sign-in), that behavior must be documented in the implementation authorization. The implementation session must not invent this behavior on its own.

See §10, Decision 5.

---

## §7 — Dependency Analysis

### §7.1 — Capacitor Dependencies

All Capacitor packages are planned to be installed in `apps/web/` (not repo root). This is a planning hypothesis — exact versions require implementation-time verification (§5.6).

| Package | Candidate Family | Installs In | Purpose |
|---|---|---|---|
| `@capacitor/core` | `^6.x` (hypothesis) | `apps/web/` prod dep | Runtime, bridge |
| `@capacitor/cli` | `^6.x` (hypothesis) | `apps/web/` dev dep | `npx cap` commands |
| `@capacitor/android` | `^6.x` (hypothesis) | `apps/web/` dev dep | Android platform |

All three must be at the same major version. Exact versions and compatibility with this project must be verified before installation is authorized.

### §7.2 — Floating Widget Dependencies

No new npm packages are required for the floating chat widget. All required capabilities are already available:

| Capability | Source | Layer 1 Confirmed |
|---|---|---|
| React component | React 19.0.3 | ✓ |
| Clerk auth | `@clerk/react` 6.15.1 | ✓ |
| Styling | Tailwind CSS 3.4.17 | ✓ |
| SSE streaming | Browser Fetch + ReadableStream (native) | ✓ |
| Route detection | `usePathname()` from `next/navigation` (Next.js 15.2.9) | ✓ |

### §7.3 — Dev Tooling

No new dev tooling packages required. `@playwright/test` 1.49.1 is present and will be extended for widget E2E tests.

### §7.4 — Compatibility Verification Requirements (Layer 3)

The following must be verified at implementation time before Capacitor installation is authorized:

- Capacitor `^6.x` compatibility with Node.js v22.19.0
- Capacitor `^6.x` compatibility with Next.js 15.2.9
- Capacitor `^6.x` compatibility with React 19.0.3
- Android API level support in the chosen Capacitor version
- Gradle/Android Studio toolchain compatibility
- No npm workspace hoisting conflict for Capacitor's Android Gradle references

---

## §8 — Environment and Configuration Requirements

### §8.1 — Existing Environment Variables

| Variable | Where | Phase 6 Status | Phase 7 Impact |
|---|---|---|---|
| `DATABASE_URL` | `.env`, server-side | Required | No change |
| `ANTHROPIC_API_KEY` | `.env`, server-side | Required | No change |
| `CLERK_SECRET_KEY` | `.env`, server-side | Required | No change |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Build env | Baked into static build | No change — same key for Android build |
| `NEXT_PUBLIC_API_URL` | Build env | Required by all 6 API consumers | **Critical for Capacitor — production URL required for Android build** |

### §8.2 — `NEXT_PUBLIC_API_URL` by Deployment Target

| Target | Required Value | Reason |
|---|---|---|
| Web browser (production) | Production API URL | Normal web deployment |
| Web browser (dev) | `http://localhost:3000` | Local Express server |
| Android (production APK) | Production API URL | Only option — WebView has no local server |
| Android (dev/test) | Reachable server URL | Emulator cannot reach host `localhost` without additional config |

**The production API URL for Android builds must be supplied explicitly by the human before the Android build/package is authorized.** The value `https://api.flavourfind.com` used in `phase7_plan_1.md` as an example is an **illustrative placeholder only** and is **NOT an approved production endpoint**. This planning document does not authorize, infer, select, or supply a production hostname. The implementation authorization for the Android build must contain the actual production URL supplied by the human.

Supplying `NEXT_PUBLIC_API_URL` for an Android build is a build-time configuration step, not authorization to modify `.env`, `next.config.ts`, or other application configuration files.

### §8.3 — New Variables

No new environment variables are introduced by Phase 7.

### §8.4 — Build Convenience Script (Optional — Requires Authorization)

A convenience build script for the Android target (e.g., `"build:android": "NEXT_PUBLIC_API_URL=<url> npm run build && npx cap sync"`) may be proposed in the implementation authorization. This planning document does not authorize adding scripts to any `package.json`.

---

## §9 — Security Considerations

### §9.1 — Clerk Auth in Static Export (Layer 1 — Established)

The Phase 6 Gate D security audit confirmed that all backend authenticated routes independently verify the Clerk JWT. The removal of `clerkMiddleware()` was explicitly audited and confirmed safe. This posture is unchanged in Phase 7. The floating widget follows the same auth pattern: `getToken()` → Bearer header → backend verification.

### §9.2 — Clerk Sign-In Flow in Capacitor WebView (Layer 3 — Unproven)

The Phase 6 architecture establishes client-side Clerk authentication within the static web application. Whether Clerk's hosted sign-in and sign-up flows work correctly inside the Capacitor Android WebView — including redirect completion, session establishment, and session persistence — is an implementation-time verification requirement. This must not be assumed from Phase 6 static-export validation alone.

Known risk factors to test:
- WebView third-party cookie handling
- `androidScheme: 'https'` effect on redirect URLs
- Email/password sign-in redirect completion
- Post-authentication navigation back to the app

If any sign-in/sign-up flow fails in the WebView, the issue must be reported to the human before further Android implementation proceeds. See Decision 6 and §9.3.

### §9.3 — OAuth / Social Login in Capacitor WebView (Layer 3)

If Clerk OAuth/social authentication is enabled and the standard WebView authentication flow does not work, the appropriate resolution — whether a native browser, a redirect scheme, a deep link, or another approach — must be investigated separately and explicitly authorized before any implementation. `@capacitor/browser` may be one option among several; it does not guarantee a particular OAuth return mechanism, and any specific integration must be planned and authorized separately.

Do not treat `@capacitor/browser` as a drop-in OAuth fix. Any OAuth/native authentication integration for Phase 7 requires its own implementation authorization.

### §9.4 — Bearer Token Security

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is embedded in the APK — acceptable (designed to be browser-safe)
- `CLERK_SECRET_KEY` must never appear in any client-side code or `NEXT_PUBLIC_` variable — unchanged from Phase 6
- Clerk JWTs are short-lived (default 60 seconds) — narrow interception window

### §9.5 — CORS in Production

**Layer 1 established fact:** `app.use(cors())` is wildcard. This permits Capacitor WebView requests without modification.

Any CORS modification — including narrowing the current policy to specific origins — is NOT a Phase 7 implementation task unless separately and explicitly authorized by the human. This includes CORS changes framed as "production hardening," "Play Store prerequisite," or "security consideration." Any such change must be named explicitly in a separate authorization and must identify the exact permitted origins. `server.js` is otherwise protected during Phase 7.

If the human decides to authorize CORS narrowing separately, the origin list at minimum should include the web production origin, the Capacitor Android origin (`capacitor://localhost`), `https://localhost` (Capacitor `androidScheme: 'https'`), and the development origin. The exact list is a human decision.

### §9.6 — SSE in Capacitor WebView (Layer 3 Hypothesis)

SSE via Fetch + ReadableStream is the mechanism used by `ChatClient.tsx`. The Android WebView is Chromium-based and is expected to support the Fetch API with ReadableStream. However, SSE behavior in the specific Android WebView version and the specific Capacitor version must be verified during authorized Android testing.

### §9.7 — Deep Links and iOS

Deep links and iOS are explicitly out of Phase 7 scope. No `server.url`, URL scheme, or intent filter configuration is authorized by this document.

---

## §10 — Testing Strategy

### §10.1 — Phase 7 Test-Harness Baseline (Established — See §2B)

The post-Phase-6 Playwright harness correction is complete and verified. Result: **5 passed / 1 skipped / 0 failed**. `NEXT_PUBLIC_API_URL` is supplied; root `.env` is loaded; Clerk credentials are available. No further harness correction is required before Phase 7 widget E2E tests are added.

Any new Phase 7 Playwright tests are added as new files alongside existing ones. The existing `apps/web/e2e/chat.spec.ts` is not modified in Phase 7.

### §10.2 — Floating Widget: Web E2E Tests

New Playwright test file: `apps/web/e2e/floating-widget.spec.ts` (does not exist; created under Phase 7 widget implementation authorization only)

**Required test coverage (planning specification — not yet implemented):**

| Test | Description |
|---|---|
| Widget FAB visible on home page | FAB present and accessible on `/` |
| Widget FAB visible on saved recipes page | FAB persists across navigation |
| Widget FAB `/chat` visibility matches Decision 4 | Behavior is conditional on the human-confirmed Decision 4 option: if Option A (Hide) → FAB absent on `/chat`; if Option B (Always show) → FAB visible on `/chat`; if Option C (Show but disable) → FAB visible but disabled on `/chat`. Test must reflect the confirmed option; do not implement this test until Decision 4 is human-confirmed. |
| Widget opens on FAB click | Click FAB → panel visible; input focused |
| Widget closes on FAB click again | Second FAB click → panel hidden |
| Widget closes on Escape key | Escape pressed → panel hidden |
| Unauthenticated: sign-in prompt shown | Not signed in → open widget → sign-in prompt visible |
| Unauthenticated: sign-in action navigates to `/sign-in` | Click sign-in → redirects to `/sign-in` route |
| Authenticated: can submit a message | Sign in → open widget → type message → submit → response begins |
| Authenticated: streaming response displayed | SSE tokens appear in widget panel |
| Loading / streaming state visible | Input disabled or submit button changes during streaming |
| Stop/abort streaming | Abort button cancels stream |
| Error handling | Simulated network error → error message shown |
| Rate-limit (429) displayed | Rate limit exhausted → remaining message and `resetAt` shown |
| Widget messages independent from `/chat` | Message in widget → navigate to `/chat` → `/chat` is empty |
| Widget messages ephemeral | Send message → refresh → widget empty on reopen |
| Escape/close behavior | Escape closes panel; focus returns to FAB |
| `/chat` page unchanged | Navigate to `/chat` after widget implementation; page functions identically to Phase 6 baseline |
| Responsive/mobile viewport | Widget layout correct at < 640px viewport width |

These tests are planned requirements. They require a separate Phase 7 implementation authorization to create.

### §10.3 — Capacitor: Manual Android Testing Protocol

Automated Playwright testing cannot target the Android APK. Android testing is manual and requires human action.

| Test | Method |
|---|---|
| APK builds without error | `gradlew assembleDebug` or Android Studio |
| App launches on emulator | Android emulator (API 28+) |
| App launches on physical device | USB debug or APK sideload |
| All pages load correctly | Manual navigation |
| Sign-in (email/password) completes | Manual Clerk sign-in |
| Sign-up completes | Manual Clerk sign-up |
| Session persists after backgrounding | Return to app from background |
| Chat streams on `/chat` page | Manual POST/SSE test |
| Floating widget visible (if Track A complete) | Manual widget test |
| Rate limit displayed correctly | Exhaust limit; verify display |
| Network error handled gracefully | Disable network; attempt chat |
| Back button / gesture navigation | Android back behavior |
| Offline page navigation (no chat) | Disable network; browse static pages |

All manual tests are requirements for the Capacitor checkpoint. They are not authorized by this document.

### §10.4 — Regression: Phase 5 `/chat` Page Freeze

After widget implementation, the following verification is required:

```bash
git diff phase-6-checkpoint-1 -- apps/web/components/ChatClient.tsx
```

Expected output: no changes (or only the Phase 6 URL change already present in the checkpoint). Any widget-related modifications indicate a Phase 5 freeze violation. This must be verified before the widget checkpoint commit is authorized.

### §10.5 — Regression: Phase 6 PostgreSQL

Phase 7 makes no changes to `server.js`, `database.js`, or the PostgreSQL schema. The Phase 6 backend functionality (`/api/moods`, `/api/v1/chat`) must be re-verified after Phase 7 implementation to confirm no regressions.

---

## §11 — Phase 7 Checkpoints

Phase 7 has two checkpoints, one per deliverable. They are independent.

### §11.1 — Checkpoint 7-A: Floating Widget

**(v2.1.3) Status: CHECKPOINT COMPLETE.** Tag `phase-7-widget-checkpoint-1` exists at commit `fcca2f1e8ee3d59b6fb0aa87fb7fe918f987e81b`, pushed to `origin/main`.

**Proposed tag:** `phase-7-widget-checkpoint-1`

**Completion criteria — all must be true:**
- [ ] `apps/web/components/FloatingChatWidget.tsx` created (new file)
- [ ] `apps/web/app/layout.tsx` modified to import and render `FloatingChatWidget`
- [ ] Widget FAB `/chat` visibility behavior matches the human-confirmed Decision 4 option
- [ ] Widget opens and closes correctly (click FAB, Escape key)
- [ ] Widget sends request to `/api/v1/chat` with Bearer token
- [ ] SSE streaming displays in widget panel
- [ ] Rate limit (429) handled in widget
- [ ] Unauthenticated state shows sign-in prompt; sign-in action navigates to `/sign-in`
- [ ] Auth guard (unauth state) working in widget
- [ ] Accessibility: aria-label, dialog role, focus management, Escape key, live region
- [ ] Color contrast verified for widget color combinations
- [ ] Responsive layout on mobile viewport (< 640px)
- [ ] `git diff phase-6-checkpoint-1 -- apps/web/components/ChatClient.tsx` shows NO changes
- [ ] `npm run build` in `apps/web` succeeds (widget in static build)
- [ ] Playwright widget E2E tests (`floating-widget.spec.ts`) pass
- [ ] Human reviews diff
- [ ] Human explicitly authorizes commit
- [ ] Human explicitly authorizes tag (separate authorization)
- [ ] Human explicitly authorizes push (separate authorization)

**Out-of-scope for this checkpoint:**
- NO Capacitor files created
- NO `server.js` changes
- NO `database.js` changes
- NO `ChatClient.tsx` changes
- NO `/chat` page changes
- NO `next.config.ts` changes

### §11.2 — Checkpoint 7-B: Capacitor Android

**(v2.1.4) Status: IMPLEMENTATION COMPLETE THROUGH B7; CHECKPOINT NOT YET TAGGED.** No `phase-7-capacitor-checkpoint-1` tag exists. Steps B2–B7 (package install, config creation, native project generation, INTERNET permission verification, production build, and Capacitor sync) are all complete and independently verified. The completion criteria below that depend on Android runtime testing against a live backend (APK build/launch, sign-in flow completion, `/chat` SSE streaming, floating widget functioning in the WebView, and the full §10.3 manual test protocol) remain outstanding and are classified DEFERRED — PENDING PHASE 10 PRODUCTION DEPLOYMENT — they are not marked complete merely because B6/B7 succeeded. Checkpoint commit, tag, and push each remain separate, ungranted authorization gates per §11.3.

**(v2.1.3 historical note):** As of v2.1.3 this line read "NOT COMPLETE... Build, sync... outstanding, pending Decision 3." Superseded above because B6/B7 were subsequently authorized and completed.

**Proposed tag:** `phase-7-capacitor-checkpoint-1`

**Completion criteria — all must be true:**
- [ ] `apps/web/capacitor.config.ts` created
- [ ] Capacitor packages installed in `apps/web/` (exact versions verified and authorized)
- [ ] `apps/web/android/` project generated by `npx cap add android`
- [ ] `npx cap sync` succeeds
- [ ] Android project builds (APK produced)
- [ ] App launches on Android emulator (API 28+)
- [ ] Sign-in flow completes (email/password — Layer 3 hypothesis verified)
- [ ] `/chat` page functions with SSE streaming
- [ ] Floating widget functions (if Track A complete)
- [ ] INTERNET permission in `AndroidManifest.xml` confirmed
- [ ] Android project tracking decision implemented (commit or `.gitignore`) per human decision
- [ ] Production API URL (`NEXT_PUBLIC_API_URL`) human-confirmed and used in build
- [ ] Human reviews diff
- [ ] Human explicitly authorizes commit
- [ ] Human explicitly authorizes tag (separate authorization)
- [ ] Human explicitly authorizes push (separate authorization)

### §11.3 — Checkpoint Governance Sequence

For each checkpoint:

```
1. Phase 7 deliverable implementation authorization (separate document)
2. Implementation
3. Verification (build, tests, manual test protocol)
4. STOP — await human diff review
5. Human reviews diff → explicit commit authorization
6. Commit created
7. STOP — await separate tag authorization
8. Human issues explicit tag authorization
9. Tag created and verified (SHA reported)
10. STOP — await separate push authorization
11. Human issues explicit push authorization
12. Push to remote verified
13. STOP — do not begin next deliverable without separate authorization
```

Completing implementation does NOT authorize commit. Commit authorization does NOT authorize tag creation. Tag authorization does NOT authorize push.

---

## §12 — Open Decisions

| # | Decision | Recommendation | Blocking? |
|---|---|---|---|
| 1 | Capacitor config location (`apps/web/` vs. repo root) | `apps/web/` (Option A) | Yes — before Capacitor init — **(v2.1.3) RESOLVED: `apps/web/capacitor.config.ts`** |
| 2 | Android project git tracking (commit vs. `.gitignore`) | Commit `apps/web/android/` | Before Capacitor checkpoint commit — **(v2.1.3) RESOLVED: track `apps/web/android/`; do not add to `.gitignore`** |
| 3 | Production API URL for Android build | Human must supply — no default | Yes — before Android build — **(v2.1.4) RESOLVED for Phase 7 mechanical build/sync (B6/B7) purposes: `https://api.flavourfind.com`. NOT YET a live/verified endpoint — see subsection below.** |
| 4 | Widget FAB visibility on `/chat` (hide vs. show) | Hide via `usePathname()` (recommendation — not authorization) | Yes — must be explicitly confirmed before widget implementation — **(v2.1.3) RESOLVED: Option A (Hide); implemented** |
| 5 | Widget authentication UX for unauthenticated users | Navigate to `/sign-in` (see §6.12) | Yes — must be explicit before implementation — **(v2.1.3) RESOLVED: base behavior (`/sign-in/`, no `redirect_url`); implemented** |
| 6 | Clerk OAuth/social-login strategy in WebView | Verify standard flow; OAuth requires separate auth | Yes if OAuth is enabled — **(v2.1.3) RESOLVED: no OAuth/social providers enabled; email/password only** |
| 7 | CORS narrowing | Separately authorized; NOT default Phase 7 scope | No — unchanged; still NOT authorized |
| 8 | Widget conversation persistence | Ephemeral for Phase 7 | No — unchanged |
| 9 | `better-sqlite3` cleanup | Deferred — outside Phase 7 scope | No — unchanged |
| 10 | Execution order (Widget first vs. Capacitor first) | Widget first (Track A → B) | Governance decision — **(v2.1.3) RESOLVED: Widget first; repository state reflects this ordering** |

### Decision 1 — Capacitor config file location

**Options:** A: `apps/web/capacitor.config.ts` (recommended); B: repo root  
**Recommendation rationale:** Co-location with the web app is Capacitor convention. All commands run from `apps/web/`. The Android project at `apps/web/android/` sits naturally alongside `apps/web/out/`.  
**Blocking:** Yes — determines all Capacitor command paths and Android project location.  
**(v2.1.3) Resolution:** RESOLVED — Option A confirmed and implemented: `apps/web/capacitor.config.ts`.

### Decision 2 — Android project git tracking

**Options:** A: Commit `apps/web/android/` (recommended); B: Add to `.gitignore`  
**Recommendation rationale:** The Android project directory is analogous to an iOS Xcode project; both are conventionally committed. Committing ensures the Android build is reproducible without re-running Capacitor initialization.  
**Blocking:** Must be decided before the Capacitor checkpoint commit. Does not block Capacitor initialization.  
**Note:** This decision does not authorize any Git operation. The commit requires separate explicit authorization.  
**(v2.1.3) Resolution:** RESOLVED — track `apps/web/android/` in Git; it must NOT be added to `.gitignore`. This decision still does not itself authorize any Git write operation.

### Decision 3 — Production API URL for Android build

**The human must supply the actual production Express API URL.** No URL is authorized by this planning document. The illustrative value `https://api.flavourfind.com` used in `phase7_plan_1.md` was a placeholder only and must not be used in any build without explicit human confirmation that it is the correct production URL.  
**Blocking:** Yes — Android build cannot proceed without a confirmed `NEXT_PUBLIC_API_URL` value.  
**(v2.1.3) Historical status (superseded — see v2.1.4 note below):** As of v2.1.3, the real production API URL had not yet been supplied. No URL had been invented, assumed, or substituted — in particular neither `https://api.flavourfind.com`, nor the Neon `DATABASE_URL`, nor any inferred DigitalOcean hostname, nor `localhost`. This was, at that time, the sole blocking prerequisite for the Capacitor production build/sync sequence (B6/B7).

**(v2.1.4) Resolution status: RESOLVED for Phase 7 mechanical implementation purposes.** The domain `flavourfind.com` was subsequently purchased and a DigitalOcean production droplet was provisioned. The human has explicitly designated `https://api.flavourfind.com` as the intended production API origin, and it was used — not invented or inferred by any implementation session — as the `NEXT_PUBLIC_API_URL` value for the B6 production build and carried through the B7 sync. Both steps were independently verified successful by two separate read-only review agents.

**This resolution is deliberately narrow.** It resolves Decision 3 only to the extent needed to unblock the Phase 7 *mechanical* build/sync steps (B6/B7), which require a human-confirmed URL string, not a reachable endpoint. It does **not** mean:
- `https://api.flavourfind.com` is a live or verified production endpoint — it is **NOT YET LIVE**. No DNS record, no Caddy/reverse-proxy configuration, no TLS/HTTPS certificate, and no deployed Express API instance exist for that origin.
- Any production-dependent runtime acceptance criterion (Android runtime API connectivity, authenticated production sign-in/session, live `/chat` SSE streaming, floating widget behavior against a live backend, or any part of the manual Android test protocol in §10.3 that depends on a reachable backend) has passed. All such criteria remain explicitly classified as **DEFERRED — PENDING PHASE 10 PRODUCTION DEPLOYMENT** — not PASS, not FAIL.
- Phase 10 responsibility has narrowed in any way. Phase 10 remains solely responsible for actual API deployment to the DigitalOcean droplet, production deployment-user configuration, firewall configuration, DNS configuration, Caddy configuration, HTTPS/TLS establishment, production secrets configuration, and live public API verification.

For the avoidance of doubt, `NEXT_PUBLIC_API_URL` must be the API **origin/base only** (e.g. `https://api.flavourfind.com`), with no trailing `/api` path segment — the existing frontend consumers already append `/api/...` themselves (see §4.5, §8.2), and the B6 build was independently verified to follow this exactly. No new environment variable is introduced by this reconciliation.

### Decision 4 — Widget FAB visibility on `/chat`

**Options:** A: Hide FAB on `/chat` via `usePathname()` (recommended); B: Always show; C: Show but disable  
**Recommendation:** Option A — avoids redundant UI on the dedicated chat page.  
**Required action:** The human must explicitly confirm the chosen option before widget implementation begins. Claude CLI may not select Option A (or any option) on the basis that it is the recommendation. The implementation authorization must state the confirmed option.  
**(v2.1.3) Resolution:** RESOLVED — Option A confirmed and implemented. `FloatingChatWidget.tsx` hides the FAB via pathname detection for both `/chat` and `/chat/`.

### Decision 5 — Widget authentication UX

**Specified behavior:** Unauthenticated user opens widget → sign-in prompt → click sign-in → navigate to `/sign-in`.  
**Alternative:** Human may specify `'/sign-in?redirect_url=<current_path>'` to return user after sign-in. This alternative is a planning suggestion; if chosen, it must be stated in the implementation authorization.  
**Blocking:** Yes — implementation session must not invent this behavior.  
**(v2.1.3) Resolution:** RESOLVED — base specified behavior confirmed and implemented (`window.location.href = '/sign-in/'`, static-export-compatible trailing slash, no `redirect_url` alternative used).

### Decision 6 — Clerk OAuth in WebView

**Current status:** Unknown — depends on Clerk dashboard configuration. Must be determined before Android testing.  
**If OAuth is not enabled:** Non-blocking; standard email/password flow must still be verified.  
**If OAuth is enabled:** The standard WebView flow must be tested first. If it fails, a separate authorization is required before any OAuth-specific integration work.  
**(v2.1.3) Resolution:** RESOLVED — human-confirmed: no Google, GitHub, or other OAuth/social-login providers are enabled; standard email/password is the only enabled Clerk sign-in strategy. Per the branch above, this is non-blocking. No OAuth-specific Capacitor plugin (e.g. `@capacitor/browser`) is authorized or required. Standard email/password Clerk authentication must still be tested during Android testing (§9.2, §10.3). If OAuth/social login is enabled in the Clerk Dashboard in the future, this constitutes a changed fact requiring re-evaluation of this decision and, per §9.3, its own separate explicit authorization before any OAuth-specific implementation.

### Decision 7 — CORS narrowing

NOT a default Phase 7 scope item. Any CORS modification to `server.js` requires separate explicit human authorization identifying the exact origin list. Framing as "production hardening" or "pre-Play-Store" does not make it authorized.

### Decision 8 — Widget conversation persistence

Ephemeral (in-memory state only) for Phase 7. `localStorage` or server-side persistence requires its own future authorization.

### Decision 9 — `better-sqlite3` cleanup

Deferred. Not related to Phase 7 deliverables. Requires its own cleanup authorization if and when desired. Phase 7 does not touch `package.json` or `server.js` for this purpose.

### Decision 10 — Execution order

**Recommended:** Widget (Track A) first, Capacitor (Track B) second — widget included in Android package from first build.  
**Human may override:** Capacitor can be authorized and implemented without the widget if desired. The two tracks are independent.  
**(v2.1.3) Resolution:** RESOLVED — Widget-first ordering was followed. Deliverable B is checkpoint-complete; Deliverable A (Capacitor) is in progress. Repository state reflects this ordering.

---

## §13 — Recommended Execution Sequence

Phase 7 is not authorized for implementation. This sequence is for planning purposes. Each step requires separate explicit human authorization.

### Pre-Phase-7 Prerequisites (Human Actions)

| # | Prerequisite | Owner |
|---|---|---|
| P1 | Android Studio installed | Human — **(v2.1.3) SATISFIED** (Android SDK/build-tools/JAVA_HOME environment verification passed) |
| P2 | Production API URL confirmed | Human — must supply explicitly — **(v2.1.4) RESOLVED for mechanical build/sync purposes: `https://api.flavourfind.com` (NOT YET live — see §12 Decision 3)** |
| P3 | Clerk social/OAuth strategy confirmed | Human — **(v2.1.3) SATISFIED**: no OAuth/social providers enabled; email/password only |
| P4 | Open Decisions 1–10 resolved (§12) | Human — **(v2.1.4) SATISFIED for Phase 7 mechanical implementation purposes**: Decisions 1, 2, 3 (mechanical scope only), 4, 5, 6, 7, 8, 9, 10 all resolved. Decision 3's live/verified-endpoint dimension remains DEFERRED — PENDING PHASE 10, not "open" in the blocking sense of earlier versions |

### Track A: Floating Chat Widget

**(v2.1.3) Status: COMPLETE.** All steps A1–A12 are complete. The widget was implemented, validated, committed, tagged `phase-7-widget-checkpoint-1` at commit `fcca2f1e8ee3d59b6fb0aa87fb7fe918f987e81b`, and pushed to `origin/main`.

| Step | Task | Authorization Required |
|---|---|---|
| A1 | Human issues widget implementation authorization | Human |
| A2 | Create `apps/web/components/FloatingChatWidget.tsx` | Included in A1 |
| A3 | Modify `apps/web/app/layout.tsx` | Included in A1 |
| A4 | Create `apps/web/e2e/floating-widget.spec.ts` | Included in A1 |
| A5 | Build (`npm run build`) — confirm widget in static build | Verification step |
| A6 | Run Playwright widget tests | Verification step |
| A7 | Verify ChatClient.tsx freeze: `git diff phase-6-checkpoint-1 -- apps/web/components/ChatClient.tsx` | Verification step |
| A8 | STOP — await human diff review | Human |
| A9 | Commit (human authorized) | Explicit human authorization |
| A10 | Tag `phase-7-widget-checkpoint-1` (human authorized) | Explicit human authorization (separate) |
| A11 | Push (human authorized) | Explicit human authorization (separate) |
| A12 | STOP | — |

### Track B: Capacitor Android

**(v2.1.4) Status: IMPLEMENTATION COMPLETE THROUGH B7.** B1 was never issued as a single bundled authorization. Instead, steps B2 through B7 were each separately and explicitly authorized and completed on their own narrow scope: Capacitor 8.5.1 packages installed (B2); `apps/web/capacitor.config.ts` created (B3); `apps/web/android/` generated via `npx cap add android` (B4); `AndroidManifest.xml` INTERNET permission verified (B5); production build run with `NEXT_PUBLIC_API_URL=https://api.flavourfind.com` (B6, complete, independently verified); `npx cap sync` run and verified fresh/non-stale (B7, complete, independently verified). Steps **B8 through B16 have not begun** and are not retroactively marked complete by this reconciliation — B8–B10 in particular depend on Phase 10 production deployment for meaningful execution (Android Studio build/emulator launch, sign-in flow completion, `/chat` SSE against the live API), and remain DEFERRED — PENDING PHASE 10. No `phase-7-capacitor-checkpoint-1` tag exists; commit/tag/push remain separate, ungranted authorization gates.

**(v2.1.4) Historical note:** As of v2.1.3, this status note read "B6/B7 remain NOT authorized and NOT performed, pending Decision 3." That was accurate at the time it was written; it is superseded here because B6/B7 were subsequently authorized and completed.

| Step | Task | Authorization Required |
|---|---|---|
| B1 | Human issues Capacitor implementation authorization (with confirmed production URL) | Human |
| B2 | Install Capacitor packages in `apps/web/` | Included in B1 |
| B3 | Create `apps/web/capacitor.config.ts` | Included in B1 |
| B4 | Run `npx cap add android` | Included in B1 |
| B5 | Verify `AndroidManifest.xml` INTERNET permission | Verification step |
| B6 | Build static assets: `npm run build` in `apps/web/` with human-confirmed production env vars | Included in B1 |
| B7 | Run `npx cap sync` | Included in B1 |
| B8 | Human opens Android Studio: `npx cap open android` | Human action |
| B9 | Human builds APK in Android Studio | Human action |
| B10 | Human runs Android manual test protocol (§10.3) | Human action |
| B11 | If CORS narrowing separately authorized: update `server.js` | Requires separate explicit authorization |
| B12 | STOP — await human diff review | Human |
| B13 | Commit (human authorized) | Explicit human authorization |
| B14 | Tag `phase-7-capacitor-checkpoint-1` (human authorized) | Explicit human authorization (separate) |
| B15 | Push (human authorized) | Explicit human authorization (separate) |
| B16 | STOP | — |

### Hard Stops

| Condition | Required Response |
|---|---|
| `npm run build` fails after widget changes | STOP. Do not modify code to fix. Report exact error. Await human direction. |
| Playwright widget tests fail | STOP. Report exact failures. Await human direction. |
| `git diff phase-6-checkpoint-1 -- apps/web/components/ChatClient.tsx` shows any change | CRITICAL STOP. Report the exact diff. Do not make additional modifications. Do not revert automatically. Await explicit human instruction. |
| `npx cap sync` fails | STOP. Report exact error. Await human direction. |
| Android build fails | STOP. Report exact error. Await human direction. |
| Clerk sign-in does not complete in Android WebView | STOP. Report observed behavior. Await human direction on next step. |
| Any unauthorized modification is detected | STOP immediately. Do not make additional modifications. Do not revert automatically. Do not perform Git cleanup. Report exactly what was changed and the resulting repository/file state. Await explicit human instruction. |
| Any CORS change is applied to `server.js` without explicit separate authorization | STOP immediately. Do not make additional modifications. Do not revert automatically. Report exactly what was changed. Await explicit human instruction. |

**Unauthorized change procedure:** The required response to any unauthorized modification is: (1) STOP immediately; (2) make no additional modifications; (3) do not automatically revert the unauthorized change — an automatic revert is itself an unauthorized modification; (4) do not perform Git cleanup or other remediation unless separately authorized; (5) report exactly what was changed and the resulting repository and file state; (6) await explicit human instruction. This procedure applies consistently throughout Phase 7 implementation.

---

## §14 — Phase 7 Out-of-Scope Protection

The following must NOT be implemented in Phase 7 unless a separate, explicitly scoped authorization is issued for that specific item:

**Application source files — protected:**
- `apps/web/components/ChatClient.tsx` (Phase 5 frozen)
- `apps/web/app/chat/page.tsx` (Phase 5 frozen)
- `apps/web/next.config.ts`
- `server.js` (except separately authorized CORS work)
- `database.js`

**Database — no changes:**
- No new PostgreSQL tables
- No schema modifications

**Future phases:**
- Stripe / billing (Phase 8/9)
- Sentry / PostHog / observability (Phase 10)
- Docker / Dockerfile / docker-compose.yml (Phase 10)
- GitHub Actions (Phase 10)
- Caddy (Phase 10)
- `/health` endpoint (Phase 10)

**Out of Phase 7 scope:**
- iOS Capacitor platform
- Play Store submission (human action)
- Push notifications
- Deep links
- `@capacitor/preferences`
- Widget conversation persistence
- Shared message context between widget and `/chat`
- `better-sqlite3` removal
- Any unrelated dependency cleanup
- `phase6_plan_3.md` modification
- `SAAS_ROADMAP.md` modification
- Phase 5 checkpoint/tag modification
- Phase 6 checkpoint/tag modification
- Any other uncommitted implementation work

---

## §15 — Final Safety Verification

Verified before delivery of this document:

| Requirement | Status |
|---|---|
| No implementation changes made | ✓ VERIFIED — read-only planning revision only |
| No git changes made | ✓ VERIFIED — no commits, tags, or pushes |
| No application source files modified | ✓ VERIFIED |
| No packages installed or upgraded | ✓ VERIFIED |
| No Android project created or synchronized | ✓ VERIFIED |
| No `FloatingChatWidget.tsx` created | ✓ VERIFIED |
| `ChatClient.tsx` not modified | ✓ VERIFIED |
| `server.js` not modified | ✓ VERIFIED |
| `database.js` not modified | ✓ VERIFIED |
| `next.config.ts` not modified | ✓ VERIFIED |
| `SAAS_ROADMAP.md` not modified | ✓ VERIFIED |
| `phase6_plan_3.md` not modified | ✓ VERIFIED |
| Phase 6 checkpoint `5085f0112f6d4eda5e9d0805de63cd725ef45f9a` not modified | ✓ VERIFIED |
| Phase 6 tag `phase-6-checkpoint-1` not modified | ✓ VERIFIED |
| Phase 5 checkpoint not modified | ✓ VERIFIED |
| `phase7_plan_1.md` preserved (not overwritten or deleted) | ✓ VERIFIED |
| Document is a planning specification, not implementation authorization | ✓ VERIFIED — AUTHORIZED: NO |

| v2.0.0 correction applied | Status |
|---|---|
| §8.1 Playwright governance: "must not be modified or committed" removed; correct post-checkpoint governance stated | ✓ VERIFIED |
| Phase 7 test-harness baseline section added (§2B) with 5/1/0 result and NEXT_PUBLIC_API_URL/env status | ✓ VERIFIED |
| Widget → Capacitor execution relationship made explicit (§3.4) | ✓ VERIFIED |
| Capacitor `^6.x` labeled as planning hypothesis; version authorization requirement stated (§5.6) | ✓ VERIFIED |
| Clerk WebView behavior in §4.3 and §9.2 changed from stated fact to verification requirement | ✓ VERIFIED |
| `@capacitor/browser` OAuth language corrected: "passes the token back" removed (§9.3) | ✓ VERIFIED |
| `better-sqlite3` cleanup deferred; removed from Phase 7 scope (§4.8, §12, Decision 9) | ✓ VERIFIED |
| CORS narrowing: NOT default Phase 7 scope; requires separate authorization (§7.4, §9.5, Decision 7) | ✓ VERIFIED |
| Production API URL example identified as illustrative placeholder only (§8.2, Decision 3) | ✓ VERIFIED |
| Android project tracking recommendation preserved; does not authorize Git operations | ✓ VERIFIED |
| Widget authentication UX made deterministic: navigate to `/sign-in` (§6.12, Decision 5) | ✓ VERIFIED |
| Accessibility: "Tailwind defaults to WCAG AA" removed; contrast verification required (§6.8) | ✓ VERIFIED |
| Hard-stop procedure: auto-revert removed; stop-and-report procedure applied throughout (§13) | ✓ VERIFIED |
| Three-layer planning structure added (§2A): established facts, human decisions, hypotheses | ✓ VERIFIED |

| v2.1.0 correction applied | Status |
|---|---|
| §2A Layer 2 Decision 4 blocking status: "No — can be decided during implementation" → "Yes — must be explicitly confirmed before widget implementation" | ✓ VERIFIED |
| §6.6 opening: "Established architectural decision (human confirmation recommended)" → human decision required; explicit statement that Claude CLI may not choose without confirmation | ✓ VERIFIED |
| §12 Decision 4: "Default:" line removed; replaced with explicit human confirmation requirement and statement that implementation authorization must name the confirmed option | ✓ VERIFIED |
| §16: "PHASE 6: READY FOR CLOSURE RECORD" removed; duplicated PHASE 6 CHECKPOINT/TAG lines removed | ✓ VERIFIED |

| v2.1.1 correction applied | Status |
|---|---|
| §12 summary table Decision 4 row "Recommendation" column: added "(recommendation — not authorization)" qualifier | ✓ VERIFIED |
| §12 summary table Decision 4 row "Blocking?" column: "No — default to hide" → "Yes — must be explicitly confirmed before widget implementation" | ✓ VERIFIED |
| §3.2 (Deliverable B description): removed "globally available on all pages"; added explicit note that `/chat` visibility is subject to Decision 4 | ✓ VERIFIED |
| §6.1 (What the Widget Is): removed "every page" and "Available on all pages"; added explicit note that `/chat` visibility is subject to human-confirmed Decision 4 | ✓ VERIFIED |
| §7.4: "All Capacitor packages are installed" → "All Capacitor packages are planned to be installed" | ✓ VERIFIED |

| v2.1.2 correction applied | Status |
|---|---|
| §10.2 test row: unconditional "Widget FAB NOT visible on `/chat` page" replaced with conditional requirement tied to human-confirmed Decision 4 option (A/B/C) | ✓ VERIFIED |
| §11.1 checkpoint criterion: unconditional "Widget FAB visible on all pages except `/chat`" replaced with "Widget FAB `/chat` visibility behavior matches the human-confirmed Decision 4 option" | ✓ VERIFIED |
| §9.4: removed "Android WebView has a lower XSS risk profile than open web" — no replacement claim introduced | ✓ VERIFIED |
| §13 Track A: confirmed no unconditional `/chat` FAB visibility assumption present — no change required | ✓ VERIFIED |

| v2.1.3 reconciliation applied | Status |
|---|---|
| STATUS BLOCK: Widget checkpoint (commit/tag/push) and Capacitor B2–B5 completion recorded; B6/B7 recorded as not authorized; no Capacitor checkpoint tag recorded as existing | ✓ VERIFIED |
| §2A Layer 1: Widget checkpoint, Capacitor 8.5.1 install, `capacitor.config.ts` content, `apps/web/android/` generation + INTERNET permission, and stale `out/` removal added as established facts; two now-stale v1.0.0-era facts (no Capacitor config / no widget file) superseded | ✓ VERIFIED |
| §12: Decisions 1, 2, 4, 5, 6, 10 recorded RESOLVED with confirmed values (summary table + individual subsections); Decision 3 explicitly reaffirmed STILL OPEN — BLOCKING, with no URL invented, assumed, or substituted, and the `NEXT_PUBLIC_API_URL` origin/base (no `/api` suffix) semantic reaffirmed | ✓ VERIFIED |
| §13: Pre-Phase-7 Prerequisites (P1–P4) annotated with satisfaction status; Track A annotated complete; Track B annotated with B2–B5 complete / B6 onward not authorized | ✓ VERIFIED |
| §11.1 / §11.2: Widget checkpoint recorded complete; Capacitor checkpoint recorded explicitly incomplete, no tag claimed | ✓ VERIFIED |
| §16 Required Governance Conclusions updated to match the above | ✓ VERIFIED |
| No architecture, scope, sequencing, protections, prerequisites, hard stops, checkpoint governance, or CORS governance (Decision 7 still unauthorized) changed | ✓ VERIFIED |
| No application source file, `SAAS_ROADMAP.md`, package/lockfile, or Android/Capacitor file modified — only `phase7_plan_5.md` | ✓ VERIFIED |
| No production API URL invented, assumed, or substituted (not `https://api.flavourfind.com`, not the Neon `DATABASE_URL`, not an inferred DigitalOcean hostname, not `localhost`) | ✓ VERIFIED |
| No React Native / Expo content introduced from `SAAS_ROADMAP.md` or elsewhere | ✓ VERIFIED |

| v2.1.4 reconciliation applied | Status |
|---|---|
| STATUS BLOCK: B6 and B7 recorded COMPLETE (production build with `https://api.flavourfind.com`; Capacitor sync); Decision 3 recorded RESOLVED for mechanical purposes only; production-dependent runtime acceptance recorded DEFERRED — PENDING PHASE 10; no Capacitor checkpoint tag claimed | ✓ VERIFIED |
| §2A Layer 1: two v2.1.3 facts stating B6/B7 not performed superseded with facts recording B6/B7 complete, verified baked-in origin, and sync freshness; historical v2.1.3 statements preserved as superseded context, not erased | ✓ VERIFIED |
| §12 Decision 3: status changed from STILL OPEN — BLOCKING to RESOLVED for Phase 7 mechanical build/sync purposes only; explicit, repeated distinction preserved that the endpoint is NOT YET LIVE and Phase 10 responsibility is unchanged; `https://api.flavourfind.com` recorded as human-designated (post domain purchase), not invented; origin/base (no `/api` suffix) semantic reaffirmed | ✓ VERIFIED |
| §13 Track B and Prerequisites (P2, P4): annotated to record B6/B7 complete; B8–B16 explicitly NOT retroactively marked complete | ✓ VERIFIED |
| §11.2: status updated to record implementation-complete-through-B7 while keeping Android-runtime-dependent completion criteria explicitly outstanding/deferred; no checkpoint tag claimed | ✓ VERIFIED |
| §16 Required Governance Conclusions updated to match | ✓ VERIFIED |
| No architecture, scope, sequencing, protections, prerequisites, hard stops, checkpoint governance, or CORS governance changed | ✓ VERIFIED |
| No implementation scope added (no Docker, Caddy config, deployment scripts, GitHub Actions, production server config, DNS instructions, infrastructure implementation, Stripe, Sentry, PostHog, iOS, push notifications, deep links, React Native/Expo, dependency cleanup, or unrelated refactoring) | ✓ VERIFIED |
| No file other than `phase7_plan_5.md` modified; no Git operation performed | ✓ VERIFIED |

---

## §16 — Required Governance Conclusions

```
PHASE 6: FORMALLY CLOSED
PHASE 6 CHECKPOINT: IMMUTABLE
PHASE 6 TAG: IMMUTABLE

PHASE 7 DELIVERABLE B (WIDGET):    CHECKPOINT COMPLETE
                                    phase-7-widget-checkpoint-1 @ fcca2f1e8ee3d59b6fb0aa87fb7fe918f987e81b
                                    PUSHED TO origin/main

PHASE 7 DELIVERABLE A (CAPACITOR): B2–B7 COMPLETE (IMPLEMENTATION)
                                    B6 (PRODUCTION BUILD): COMPLETE — NEXT_PUBLIC_API_URL=https://api.flavourfind.com
                                    B7 (`npx cap sync`): COMPLETE — INDEPENDENTLY VERIFIED
                                    NO phase-7-capacitor-checkpoint-1 TAG EXISTS
                                    COMMIT/TAG/PUSH: NOT AUTHORIZED — SEPARATE GATES (§11.3)

DECISION 3 STATUS:                 RESOLVED FOR PHASE 7 MECHANICAL BUILD/SYNC PURPOSES
                                    ORIGIN: https://api.flavourfind.com — NOT YET LIVE
                                    NOT INVENTED — HUMAN-DESIGNATED AFTER DOMAIN PURCHASE

PRODUCTION-DEPENDENT RUNTIME
ACCEPTANCE:                        DEFERRED — PENDING PHASE 10 PRODUCTION DEPLOYMENT
                                    (API deployment, deployment-user config, firewall, DNS,
                                    Caddy, HTTPS/TLS, production secrets, live verification —
                                    ALL REMAIN PHASE 10 SCOPE, NOT PERFORMED)
```
