# Phase 8 Planning Specification
## Flavour Find — Monorepo SaaS Project

**Document version:** 1.1.7
**Supersedes:** `phase8_plan_1_4.md` v1.1.6 (2026-09-10 schema/AC correction pass)
**Change summary:** v1.1.7 is a documentation-only correction pass resolving a file-boundary governance discrepancy identified during a Task 8-B planning/readiness assessment. No implementation was performed and no implementation is authorized by this revision. Corrections: (1) Task 8-B's authorized modification boundary (§6 Task 8-B, §10) is extended from "`server.js` only" to "`server.js` and `database.js`," with the `database.js` portion strictly narrowed to the minimum new exported query functions required for local user lookup/creation, Stripe Customer ID persistence, user-subscription upsert/retrieval, and tier retrieval; existing `database.js` functions must not be rewritten or behaviorally changed; a second independent `pg.Pool` in `server.js` remains explicitly prohibited — the existing single-pool `database.js` pattern remains the sole DB-access path; (2) the Task 8-A Appendix B schema boundary is explicitly reaffirmed as unchanged by this correction — no new tables or columns are authorized; (3) §3.4 Webhook Idempotency Requirement is updated with a schema-compatible implementation approach (subscription-identity-keyed upsert against the existing `user_subscriptions.stripe_subscription_id` UNIQUE constraint) that satisfies the idempotency acceptance criteria without a new `processed_webhook_events` table or any other new schema object; (4) §16 historical filename references updated to reflect v1.1.7 as current. Decision 5, Decision 6, Decision 7, the entitlement table, Task 8-A Appendix B schema, Stripe test-mode state, and all other governance gates preserved exactly and unchanged.
**Planning session date:** 2026-09-08 (v1.0.0); corrected 2026-09-09 (v1.1.0, v1.1.1, v1.1.2, v1.1.3); governance correction 2026-09-10 (v1.1.4); state correction 2026-09-10 (v1.1.5); schema/AC correction 2026-09-10 (v1.1.6); Task 8-B file-boundary governance correction 2026-09-10 (v1.1.7)
**Prepared by:** Claude (read-only audit + planning specification) — planning only
**Status:** PROPOSED — AWAITING HUMAN REVIEW AND EXPLICIT IMPLEMENTATION AUTHORIZATION

---

## STATUS BLOCK

```
PHASE 7:            FORMALLY COMPLETE / CLOSED
PHASE 7 CHECKPOINT: phase-7-capacitor-checkpoint-1
PHASE 7 COMMIT:     e116e8f300aec9774a15f2f9e9a6cb9aaa60180e
origin/main:        e116e8f300aec9774a15f2f9e9a6cb9aaa60180e (confirmed authoritative)

PHASE 7 WIDGET:     phase-7-widget-checkpoint-1 / fcca2f1e8ee3d59b6fb0aa87fb7fe918f987e81b
                    Preserved historical checkpoint — not Phase 8 baseline.

PHASE 8:            PLANNING ONLY — NO IMPLEMENTATION AUTHORIZED
PHASE 8 BASELINE:   phase-7-capacitor-checkpoint-1 /
                    e116e8f300aec9774a15f2f9e9a6cb9aaa60180e

PHASE 10 DEFERRED:  Production deployment, DNS, Caddy, HTTPS/TLS, Android
                    runtime API connectivity, live Clerk/Stripe webhooks,
                    live Stripe credentials, production Stripe Dashboard
                    configuration — ALL EXPLICITLY DEFERRED TO PHASE 10.
                    NOT PHASE 8 SCOPE.
```

---

## GOVERNING PRINCIPLE

This document is a planning specification, not implementation authorization. No sentence in this document authorizes Phase 8 implementation. Phase 8 implementation requires a separate, explicit human authorization issued after this planning document is reviewed and accepted.

---

## §1 — Repository State Inspection Summary

### §1.1 Git State

| Item | Value |
|---|---|
| Authoritative HEAD | `e116e8f300aec9774a15f2f9e9a6cb9aaa60180e` |
| Branch | `main` |
| `origin/main` | `e116e8f300aec9774a15f2f9e9a6cb9aaa60180e` |
| Phase 7 Capacitor tag | `phase-7-capacitor-checkpoint-1` → `e116e8f300aec9774a15f2f9e9a6cb9aaa60180e` |
| Phase 7 Widget tag | `phase-7-widget-checkpoint-1` → `fcca2f1e8ee3d59b6fb0aa87fb7fe918f987e81b` |
| Phase 8 planning docs | **None existed before v1.0.0** — this is the first |
| Unrelated pre-existing modifications | None identified (Phase 7 closed cleanly) |

*Note: The `device_bash` shell was unavailable during the Phase 8 planning session. Git state is established from the user's authoritative declaration, consistent with `phase7_plan_5.md` v2.1.4. If any discrepancy exists between declared state and actual repo state, the actual repo state (verified via `git log`, `git tag -l`, `git status`) is the source of truth.*

### §1.2 Codebase Architecture (as of Phase 7 close) — CORRECTED IN v1.1.0

**Backend (root-level — Express):**

- `server.js` — Express entry point (~16 KB, ~466 lines). All API routes are registered **inline directly on the `app` object**. There is no `apiRouter`, no Express Router abstraction, no `src/routes/` directory, and no `src/db/` directory. These structures do not exist in the repository and must not be created during Phase 8.
- **API route structure** (verified by direct reading of `server.js`):
  - Predominantly **unversioned** `/api/*` routes: `/api/moods`, `/api/recipes/:mood`, `/api/recipe/:mood/random`, `/api/user/saved`, `/api/user/mood-history`, `/api/user/meal-plan`, `/api/user/grocery-list`
  - One **versioned** route (Phase 5): `/api/v1/chat`
  - Phase 8 billing routes will use the unversioned pattern: `/api/billing/*`
- `database.js` — PostgreSQL initialization and raw `pg` query functions. Also contains legacy `better-sqlite3` references (cleanup deferred per project decision; not Phase 8 scope).
- Root `package.json` — monorepo root; server-side dependencies include `@anthropic-ai/sdk`, `@clerk/express`, `pg`, `helmet`, `compression`, `pino`. **`stripe` (`^22.6.1`) was installed at the monorepo root during Task 8-A.** No `stripe` package was added to `apps/web`. No client-side Stripe package was added. Stripe billing functionality has not been implemented; that is Task 8-B scope.

**Frontend (apps/web — Next.js 15, static export):**

- `next.config.ts` — `output: 'export'`, `trailingSlash: true` (required for Capacitor; frozen)
- `capacitor.config.ts` — `appId: com.flavourfind.app`, `webDir: out`, `androidScheme: https` (Phase 7, frozen)
- `apps/web/android/` — Capacitor Android project (Phase 7, frozen)
- `apps/web/app/` — Next.js App Router: `chat/` (frozen), `recipe/`, `saved/`, `sign-in/`, `sign-up/`
- `apps/web/components/` — `ChatClient.tsx` (Phase 5, **frozen**), `FloatingChatWidget.tsx` (Phase 7, **frozen**), `SavedRecipes.tsx`, `MealPlanner.tsx`, `GroceryList.tsx`, `MoodHistory.tsx`, `RecipeCard.tsx`, `MoodGrid.tsx`, `RecipePageClient.tsx`, `SignInClient.tsx`, `SignUpClient.tsx`
- `apps/web/lib/api.ts` — typed API client (two functions currently: `fetchMoods`, `fetchRandomRecipe`)
- `apps/web/e2e/` — Playwright tests: `home.spec.ts`, `chat.spec.ts` (frozen), `floating-widget.spec.ts` (frozen)

**Packages:**
- `packages/shared/` — shared Zod schemas and utilities
- `packages/types/` — shared TypeScript types (`@flavour-find/types`)

**`stripe` dependency status (as of Task 8-A):** `stripe@^22.6.1` is installed in root `package.json`. `node -e "require('stripe')"` resolves. `stripe` is NOT present in `apps/web/package.json`. *Stripe billing routes and functionality are not yet implemented — that is Task 8-B scope.*

### §1.3 SAAS_ROADMAP.md Phase 8 Gap

The roadmap's Appendix C defines phases: 1, 4, 5, 7, 9, 10. **Phase 8 is not defined in the roadmap.** This document establishes Phase 8 as the next implementation phase, drawing its primary content from SAAS_ROADMAP.md Appendix C Phase 9 (Billing & Monetization). The roadmap's phase numbering (skipping from 7 to 9) is a historical artifact; it does not need to be corrected.

---

## §2 — Phase 8 Objective

**Phase 8: Stripe Billing & Subscription Enforcement**

Implement the full monetization layer: Stripe subscription checkout, customer portal, webhook handling with signature verification, and tier-gated feature enforcement across the frontend and backend. After Phase 8, the product has a working revenue stream in test mode. Free and Premium tiers are enforced at the API and UI level. A user can upgrade, be charged using Stripe test-mode credentials, and have their tier reflected in the application.

This corresponds to SAAS_ROADMAP.md Appendix C §Phase 9 (Billing & Monetization — Security Fix Applied). **Phase 8 is a test-mode and local-development Stripe implementation phase only.** Live production Stripe configuration, live credentials, and production infrastructure are Phase 10 concerns.

---

## §3 — Scope

### 3.1 Explicitly In Scope

1. **Stripe package installation** — `npm install stripe` at the monorepo root (`package.json`). No client-side Stripe.js. No Stripe package in `apps/web`. Phase 8 uses **Stripe Hosted Checkout**: the server creates a checkout session and returns a URL; the browser redirects to Stripe's hosted page. No in-page payment form, no Stripe publishable key in the frontend.

2. **`user_subscriptions` table** — PostgreSQL migration using inline SQL consistent with the existing `database.js` initialization pattern (per resolved Decision 2). Exact column names, types, and constraints must be confirmed at implementation time after inspecting the current `database.js` initialization block and current `users` table schema. The conceptual data model is specified in Task 8-A below.

3. **`users.tier` column** — Confirm or add to the `users` table. Exact type and constraints confirmed at implementation time.

4. **`stripe_customer_id` column on `users`** — One Stripe Customer ID per Flavour Find user; nullable (null until first Checkout). Exact definition confirmed at implementation time.

5. **Billing routes — inline in `server.js`** (no new files, no new directories, no Express Router):
   - `POST /api/billing/checkout` — authentication required; creates a Stripe Checkout session; returns `{ url }`.
   - `POST /api/billing/portal` — authentication required; creates a Stripe Customer Portal session; returns `{ url }`.
   - `POST /api/billing/webhook` — no Clerk auth; uses `express.raw({ type: 'application/json' })`; verifies signature via `stripe.webhooks.constructEvent()`; handles subscription events; returns 400 on failure, 200 on success.

6. **Critical middleware ordering** — The webhook route must be registered in `server.js` **before** the existing `app.use(express.json())` call (currently at line 75). This is a security requirement: `express.json()` would consume the raw request body that Stripe's signature verification requires. All existing middleware and inline routes remain unchanged. No refactoring of existing routes is authorized:

   ```js
   // ─── INSERT BEFORE the existing app.use(express.json()) ──────────────────
   app.post('/api/billing/webhook',
     express.raw({ type: 'application/json' }),
     handleBillingWebhook         // inline function defined in server.js
   );

   // ─── EXISTING middleware — position and content UNCHANGED ─────────────────
   app.use(express.json());       // existing line — unchanged
   // [all existing inline routes follow unchanged]
   ```

7. **Webhook event handling (idempotent):**
   - `customer.subscription.created` → upsert `user_subscriptions`; set `users.tier` per the entitlement policy in §3.6 based on the event's subscription `status` (`trialing`/`active`/`past_due` → `'premium'`; all others → `'free'`)
   - `customer.subscription.updated` → upsert `user_subscriptions`; update `users.tier` per the entitlement policy in §3.6 based on the updated subscription `status`
   - `customer.subscription.deleted` → update `user_subscriptions`; set `users.tier = 'free'`
   - All handlers must be idempotent with respect to Stripe event ID (see §3.4).

8. **Narrow chat rate-limit tier enforcement** — The existing `/api/v1/chat` handler contains a flat rate-limit lookup using `AI_CHAT_LIMIT_FREE`. Phase 8 authorizes a **single narrowly scoped change**: the rate-limit lookup is replaced with a DB query for the authenticated user's `users.tier`, which determines the applicable limit (e.g., free: 20 messages/day; premium: 500 messages/day). All other aspects of the `/api/v1/chat` handler are frozen. See §3.3.

9. **Frontend billing page** — A dedicated `apps/web/app/billing/page.tsx` with:
   - "Upgrade to Premium" button/CTA for free-tier users → calls `POST /api/billing/checkout`, redirects to the returned URL.
   - "Manage Subscription" link for premium-tier users → calls `POST /api/billing/portal`, redirects to the returned URL.
   - Tier display ("Free" / "Premium" badge) on the billing page and/or global layout.

10. **Chat 429 upgrade prompt** — When `/api/v1/chat` returns 429, render a styled upgrade prompt. This must be implemented **outside** the frozen `ChatClient.tsx` and `FloatingChatWidget.tsx` — via the page layout surrounding those components, an error boundary, or the existing 429 error-propagation path. If no path exists that avoids touching frozen components, this sub-item must be escalated to the human before Task 8-C implementation proceeds.

11. **Environment variables** — Added to `.env.example` (placeholder values only; no real credentials):
    ```
    STRIPE_SECRET_KEY=sk_test_REPLACE_ME
    STRIPE_WEBHOOK_SECRET=whsec_REPLACE_ME
    STRIPE_PREMIUM_PRICE_ID=price_REPLACE_ME
    STRIPE_SUCCESS_URL=http://localhost:3001/billing?result=success
    STRIPE_CANCEL_URL=http://localhost:3001/billing?result=cancel
    STRIPE_PORTAL_RETURN_URL=http://localhost:3001/billing
    ```
    Production redirect URLs are Phase 10 concerns.

12. **Stripe CLI workflow (local development)** — `stripe listen --forward-to localhost:3000/api/billing/webhook` for webhook testing. This is a **manual developer-run verification step**, not an automated Playwright test.

13. **Playwright E2E tests** — New `apps/web/e2e/billing.spec.ts` covering deterministic HTTP and UI behavior that does not require the Stripe CLI to be running as an external process. See Task 8-D for the explicit split between automated Playwright tests and manual CLI verification.

### 3.2 Stripe Architecture: Hosted Checkout (Closed Decision)

Phase 8 uses **Stripe Hosted Checkout exclusively**:

- Server calls `stripe.checkout.sessions.create(...)`, returns `{ url }` to the client.
- Client browser redirects to that Stripe-hosted URL.
- No client-side Stripe.js is loaded.
- No Stripe publishable key is used or required in the frontend.
- No `stripe` package in `apps/web`.
- All payment form rendering is on Stripe's hosted page.

This is a **closed architectural decision** for Phase 8. Any architecture requiring client-side Stripe integration is out of scope.

### 3.3 Narrow `/api/v1/chat` Rate-Limit Exception

The `/api/v1/chat` handler in `server.js` is a Phase 5 frozen component. Phase 8 grants a **single narrow exception**:

**Authorized change (one change only):** Replace the flat `AI_CHAT_LIMIT_FREE` environment-variable rate limit with a tier-aware lookup: query `users.tier` for the authenticated user from the DB and apply the tier-appropriate message limit.

**Explicitly prohibited changes (exhaustive list):**
- SYSTEM_PROMPT or prompt construction
- Anthropic SDK integration, model selection, or API call parameters
- Chat request or response structure (SSE streaming, token counting, cost logging)
- Chat business logic of any kind
- Error handling unrelated to applying the tier-based rate limit
- Authentication or authorization behavior (beyond reading tier)
- `ChatClient.tsx` (Phase 5 frozen)
- `FloatingChatWidget.tsx` (Phase 7 frozen)
- Any frontend chat behavior

This exception is scoped to Task 8-B. No other `/api/v1/chat` logic may change at any point during Phase 8.

### 3.4 Webhook Idempotency Requirement

Stripe may deliver the same webhook event more than once. The `handleBillingWebhook` function must be idempotent:

- Processing the same event twice must produce the same DB state as processing it once.
- The handler must be structured so that a repeated delivery of the exact same `event.id` does not re-apply side effects that would compound or duplicate state. (The implementation basis for this is resolved below as subscription-identity-keyed upserts, not an `event.id`-keyed log — see "Webhook Idempotency — Schema-Compatible Approach.")
- The handler must not create duplicate subscription records or apply tier changes twice on repeated delivery.

**Webhook Idempotency — Schema-Compatible Approach (resolved v1.1.7, governance-approved):**

The idempotency requirement above must be satisfied using **only** the already-authorized Task 8-A Appendix B schema. No new table, column, or index (including a `processed_webhook_events` event-log table) is authorized for this purpose.

The authorized approach: idempotency is achieved through **subscription-identity-keyed upserts**, not event-ID-keyed deduplication. `user_subscriptions.stripe_subscription_id` already carries a `UNIQUE` constraint. All three webhook handlers (`created`, `updated`, `deleted`) resolve to the same upsert shape — `INSERT ... ON CONFLICT (stripe_subscription_id) DO UPDATE SET plan = ..., status = ..., current_period_end = ..., updated_at = NOW()` — driven entirely by the event's own subscription data. Because this upsert is a pure function of the current event's `status`/`plan`/`current_period_end`, delivering the exact same event payload twice writes the same `status`, `plan`, `current_period_end`, and therefore derives the same `users.tier` both times: no duplicate `user_subscriptions` row is created (the `UNIQUE` constraint guarantees this), and no tier change is ever "applied twice" in the sense of compounding or toggling — the second write is simply a no-op re-assertion of the same values.

**Known limitation, documented rather than concealed:** `updated_at` will advance to a new timestamp on the second delivery, since it is not itself part of the business state the idempotency requirement protects (subscription record identity, `status`/`plan`/`current_period_end`, and `users.tier`). AC 12's "same DB state" is satisfied with respect to all business-meaningful fields; it is not satisfied bit-for-bit including `updated_at`. This distinction must be reflected in the Task 8-B verification step for AC 12 (§11.2 idempotency test step 7): the assertion must compare `status`, `plan`, `current_period_end`, and `users.tier` before/after the duplicate delivery, not `updated_at`. This is a schema-compatible resolution, not a schema escalation — no human decision is required to proceed on this basis, but a reviewer should confirm the `updated_at` nuance is acceptable during Task 8-B verification.

**Critical distinction — event-type testing vs. duplicate-delivery testing:**

- **Event-type testing** (e.g., `stripe trigger customer.subscription.created`) verifies that the handler correctly processes a given event type. Each `stripe trigger` invocation creates a **new Stripe Event with a distinct `event.id`**. Running `stripe trigger` twice does not constitute an idempotency test; it creates two separate events of the same type, each with a different `event.id`.
- **Duplicate-delivery / idempotency testing** requires delivering the **exact same event payload** — preserving the **exact same `event.id`** — twice to the webhook endpoint. The second delivery must be recognized as a duplicate and must not re-apply side effects.

**Idempotency test fixture requirement (Task 8-B verification):**

The idempotency verification step must use a deterministic mechanism that:

1. Obtains or constructs one valid Stripe webhook event payload (the Stripe CLI may assist in establishing a realistic event structure and a valid signature);
2. Preserves the exact `event.id` from that payload;
3. Delivers that exact same signed event payload twice to `POST /api/billing/webhook`;
4. Verifies that the server returns 200 on both deliveries;
5. Verifies that `users.tier` and `user_subscriptions` reflect the outcome of exactly one processing — not double-applied.

The specific mechanism (e.g., a `curl` replay script using a captured forwarded event, a local fixture file re-signed with the test `STRIPE_WEBHOOK_SECRET`) must be determined during implementation after inspecting the repository architecture. This plan does not prescribe an implementation file or helper location; that is confirmed at implementation time. The requirement is that idempotency is verified against the **same `event.id`**, not merely two events of the same type.

**Webhook test user-mapping requirement:**

A generic `stripe trigger` invocation creates a Stripe event that may not contain a valid mapping to any Flavour Find user in the local database. The webhook handler's ability to update `users.tier` depends on successfully resolving a Stripe Customer or subscription to a local Flavour Find user record.

The implementation and verification must establish a **deterministic traceable path**:

```
Stripe event → Stripe Customer / subscription metadata → known Flavour Find user → users.tier assertion
```

Before Task 8-B verification, the implementation must define:

1. Which specific Flavour Find user (seeded in the local database) is used for webhook testing;
2. How that user's `stripe_customer_id` is associated with the Stripe Customer referenced in the test event;
3. Which field(s) in the Stripe event the application uses to resolve the corresponding Flavour Find user (e.g., `event.data.object.customer` matched against `users.stripe_customer_id`, or `metadata.userId` matched against the Clerk user ID);
4. That the test event fixture contains the necessary identity/mapping information (Stripe Customer ID and/or `metadata.userId`) to resolve to a known seeded Flavour Find user;
5. That the local database assertions (`users.tier`, `user_subscriptions`) are performed against that specific known seeded user.

Do not assume that a generic Stripe CLI fixture automatically contains a Clerk `userId` or a Stripe Customer ID matching any local Flavour Find user record. The implementation must set up the mapping explicitly before running event-type or idempotency tests.

### 3.5 Stripe Customer Lifecycle Invariant

**One Flavour Find user → one Stripe Customer → one persisted `stripe_customer_id`.**

This invariant must hold even under concurrent requests. The implementation must enforce it throughout:

1. Authenticated user calls `POST /api/billing/checkout`.
2. Server retrieves the user's record using the established Clerk-to-user mapping.
3. If `users.stripe_customer_id` is null: create exactly one Stripe Customer (test mode) and persist the returned ID using a concurrency-safe strategy (see Concurrency Protection below).
4. If `users.stripe_customer_id` is set: reuse it — never create a second Stripe Customer for the same user.
5. The Checkout Session is created against that Stripe Customer, with `metadata.userId` (Clerk user ID) on both the session and `subscription_data`.
6. Webhook events carry `event.data.object.customer` (Stripe Customer ID) and `metadata.userId`. Both are available for user mapping.
7. Webhook processing uses these identifiers to update `user_subscriptions` and `users.tier`.
8. `POST /api/billing/portal` evaluates the user's subscription/entitlement state. See §3.7 for the three distinct states and their required responses.

**Concurrency Protection — `stripe_customer_id` assignment:**

The one-user/one-Stripe-Customer invariant faces two distinct concerns that the implementation must address separately:

**Concern A — Concurrent Request Race (local persistence):**

Simply checking `stripe_customer_id IS NULL` and then creating a Stripe Customer does not guarantee the invariant under concurrent requests. A race condition exists: two concurrent checkout requests may simultaneously observe `stripe_customer_id IS NULL` and each independently create a Stripe Customer for the same user, resulting in two Stripe Customers in Stripe and an inconsistent local state.

The implementation must explicitly protect against this race. Requirements:

1. **Inspect** the existing database schema and constraints (unique indexes, primary keys, column nullability, any existing unique constraint on `stripe_customer_id`) on the `users` table before writing the checkout handler;
2. **Identify** the authoritative user row and the constraint(s) available to enforce uniqueness;
3. **Use a concurrency-safe persistence strategy** compatible with the verified existing PostgreSQL architecture (e.g., a row-level lock acquired before the read-then-create sequence, an optimistic write with a unique constraint violation caught and retried, or another mechanism demonstrably safe with the existing schema). Do not prescribe a specific SQL technique here — the appropriate technique is determined after inspecting the current schema;
4. **Enforce** the invariant at the database/application boundary such that concurrent checkout requests cannot each independently write a `stripe_customer_id`;
5. **Verify** during Task 8-B verification — at minimum through code review and `repository-reviewer` inspection — that the concurrency strategy is correct given the verified schema. Concurrent load testing is not required in Phase 8, but the design must be demonstrably correct.

**Concern B — External Side-Effect / Persistence Failure Boundary:**

A database lock or transaction alone cannot make the broader one-user/one-Stripe-Customer invariant absolute when Stripe is an external system. The implementation must explicitly account for the following failure sequence:

1. Application obtains the appropriate database lock or transaction protection.
2. Application calls Stripe and successfully creates a Stripe Customer.
3. Stripe returns a Customer ID.
4. The application fails (crash, timeout, unhandled exception) before that Customer ID is durably persisted to `users.stripe_customer_id`.
5. A later request observes `stripe_customer_id IS NULL`.
6. Without an explicit mitigation, a second Stripe Customer could be created for the same Flavour Find user.

The implementation must design and verify a strategy that explicitly accounts for this external side-effect/persistence boundary. This does not require a distributed transaction or a redesign of the checkout flow. Possible approaches include: using Stripe idempotency keys on the Customer create call so that a retry of the same logical request returns the existing Customer; searching Stripe for an existing Customer by the user's identifying metadata before creating a new one; or another explicit reconciliation approach compatible with the repository's architecture.

The chosen mitigation strategy must be documented during Task 8-B implementation and confirmed by code review and `repository-reviewer`. The acceptance criterion (AC 26) must not falsely assert that database-level concurrency protection alone guarantees the global one-user/one-Stripe-Customer invariant.

**Implementation-time inspection required:** Before writing any DB queries for the billing routes, the implementation must inspect the current `users` table schema and the existing Clerk-to-user mapping conventions in `database.js` to ensure consistency with the established pattern.

### 3.6 Subscription Entitlement Policy

The webhook handler's tier-update logic is governed by the human-approved entitlement policy recorded in Decision 7. Task 8-B must implement this policy exactly. Claude CLI must not invent, infer, broaden, or otherwise modify this policy during implementation.

**Phase 8 authoritative entitlement policy (Decision 7 — RESOLVED, human-approved):**

| Stripe Subscription Status | Flavour Find Entitlement | `users.tier` |
|---|---|---|
| `trialing` | Premium | `'premium'` |
| `active` | Premium | `'premium'` |
| `past_due` | Premium | `'premium'` |
| `unpaid` | Free / non-Premium | `'free'` |
| `paused` | Free / non-Premium | `'free'` |
| `incomplete` | Free / non-Premium | `'free'` |
| `incomplete_expired` | Free / non-Premium | `'free'` |
| `canceled` | Free / non-Premium | `'free'` |
| `customer.subscription.deleted` event | Free / non-Premium | `'free'` |

**Unknown or future Stripe subscription statuses must default to Free / non-Premium.** They must never grant Premium entitlement unless this Phase 8 policy is explicitly amended through the established human governance process.

**Rationale (human-provided, must not be reinterpreted during implementation):**

- `trialing` represents an authorized Premium trial.
- `active` represents a subscription in good standing.
- `past_due` provides a reasonable short-term payment-recovery grace period while Stripe may still recover the payment and return the subscription to `active`.
- Once a subscription reaches `unpaid`, Premium entitlement ends.
- `paused`, `incomplete`, and `incomplete_expired` do not represent an active, successfully established Premium entitlement under this Phase 8 policy.
- `canceled` is a terminal non-Premium state.
- The `past_due` treatment is an intentional Flavour Find product decision and must not be reinterpreted during implementation.

**Scope of this policy:** This policy intentionally does not introduce configurable grace periods, separate `past_due` tiers, temporary Premium states, access-expiration timestamps, dunning state machines, manual billing overrides, multiple subscription entitlements, or invoice-level entitlement calculations. The existing Phase 8 architecture of a simple `users.tier` (`'free'` / `'premium'`) and `user_subscriptions` is sufficient.

**Requirements for the `customer.subscription.updated` handler:**

- Must evaluate the subscription's `status` field against the authoritative policy above — not assume all `updated` events result in Premium.
- A subscription transitioning from `active` to a non-entitling status (e.g., `unpaid`, `canceled`) is delivered as a `customer.subscription.updated` event and must trigger the appropriate tier downgrade per this policy.
- A subscription recovering from a non-entitling status back to `trialing`, `active`, or `past_due` must trigger the appropriate tier upgrade per this policy.
- The handler must apply this policy consistently for all delivered subscription statuses; any status not in the table above must default to `'free'`.

**Stripe documentation verification prerequisite:** The exact events by which status transitions are delivered must be verified against Stripe's current API documentation by the implementation session before writing the webhook handler.

**Acceptance criteria:** §14 AC 10, 11, and 25 test this entitlement policy.

---

### 3.7 Stripe Customer Portal Entitlement States

The `POST /api/billing/portal` route must distinguish three distinct user states. The existence of a `stripe_customer_id` does not itself prove that the user currently has an active Premium entitlement. These states must be explicitly handled:

**State A — No Stripe Customer (`stripe_customer_id IS NULL`)**

The user has no persisted `stripe_customer_id`. The user has never initiated a checkout flow.

Planned response: `400 { error: 'No billing account found' }` (or equivalent — exact error message is an implementation detail).

Rationale: No Stripe Customer exists; a portal session cannot be created.

**State B — Stripe Customer exists; no active Premium entitlement**

The user has a `stripe_customer_id`, but their subscription state does not satisfy the Premium entitlement policy defined in §3.6 (e.g., subscription is `canceled`, a non-entitling status per Decision 7, or no subscription record exists in `user_subscriptions`).

Planned response: `400 { error: 'No active subscription' }` (or equivalent — exact error message is an implementation detail).

Rationale: Phase 8 policy is that the Customer Portal is for managing an active subscription. A user without active entitlement is returned 400 rather than redirected to a portal showing a terminated subscription.

**State C — Stripe Customer exists; active Premium entitlement**

The user has a `stripe_customer_id` and their subscription state satisfies the Premium entitlement policy (i.e., subscription status is `trialing`, `active`, or `past_due` per §3.6 / Decision 7).

Planned response: Create a Stripe Billing Portal Session and return `200 { url }` where `url` begins with `https://billing.stripe.com/`.

**Implementation-time determination:** The authoritative subscription/entitlement state for States B and C must be derived from the verified existing database schema (inspected during Task 8-A). Do not assume a specific schema structure for subscription state before inspection; do not create new tables unless the schema inspection demonstrates they are necessary and they are separately authorized within Task 8-A scope.

**Acceptance criteria:** §14 must test all three portal states, not only the null-`stripe_customer_id` case and the happy path. See AC 6 and AC 24.


---

### 3.8 Clerk → Local `users` Row Mapping

This section defines the authoritative mapping between the Clerk authentication identity and the application's local billing/entitlement persistence layer. This mapping must be understood and respected by Task 8-B implementation. **No implementation is authorized by this documentation section.**

#### 3.8.1 Identity Architecture

Clerk is and remains the **authentication identity source**. The local `users` table is the **application's billing/entitlement persistence layer**. These two roles are distinct and complementary; this section does not change the role of either.

```
Clerk userId
      ↓
users.id (TEXT PRIMARY KEY)
```

The Clerk user ID is the application's local user identifier. `users.id` is `TEXT PRIMARY KEY` and equals the Clerk user ID for every local user record.

#### 3.8.2 Lazy Local User-Row Creation

The local `users` row is created **lazily** — when an authenticated user first reaches a billing operation that requires a local billing record. There is no eager user provisioning, no Clerk webhook for user creation, no separate identity service, and no new user-management subsystem. The existing Clerk authentication architecture is unchanged.

**Intended behavior when a billing operation is reached:**

1. Authenticate the request using the existing Clerk authentication architecture (`getAuth(req)` via `@clerk/express`).
2. Obtain the authenticated Clerk `userId`.
3. Determine whether a corresponding local `users` row exists where `users.id = Clerk userId`.
4. **If the row already exists:** reuse it. Do not overwrite an existing `stripe_customer_id`. Do not reset `tier`. Do not reset subscription state. Do not replace established billing data merely because the billing operation is occurring again.
5. **If the row does not yet exist:** create it (subject to the verified-email requirement in §3.8.3 and the concurrency requirement in §3.8.4).
6. The local `users` row is the application's local billing record for that Clerk user.

**When creating a new local `users` row, use:**

| Column | Value |
|---|---|
| `users.id` | Clerk userId |
| `users.email` | Verified Clerk email (see §3.8.3) |
| `users.tier` | `'free'` |
| `users.stripe_customer_id` | `NULL` |

#### 3.8.3 Verified Email Requirement

`users.email TEXT UNIQUE NOT NULL` requires a real, verified email address. The authoritative policy is:

**A billing operation requiring creation of a new local `users` row MUST NOT proceed if the authenticated Clerk user has no usable verified email address available through the supported server-side Clerk mechanism.**

If no verified email is available:
- Do not create a local `users` row.
- Do not create a Stripe Customer.
- Do not create a Checkout Session.
- Do not persist incomplete billing identity data.
- Return an appropriate client-visible error.
- Do not invent, synthesize, or fall back to an unverified email address.

**Explicit prohibitions:**
- Do not make `users.email` nullable.
- Do not add a fake or default email address.
- Do not use the Clerk user ID as an email.
- Do not silently use an unverified email.
- Do not invent a fallback identity.

The exact HTTP status and response wording for this error case may be determined at implementation time unless the plan already specifies them. This is not a new email-verification feature; the requirement is only that billing cannot create a local billing identity without a verified email.

#### 3.8.4 Clerk Server-Side Email Mechanism

The verified Clerk email is obtained using the **existing** `@clerk/express` dependency. No new npm package is required.

**Mechanism:** `clerkClient.users.getUser(userId)`

- `@clerk/express` version `1.7.82` is already installed at the monorepo root. No new dependency is required.
- This call uses the same Clerk `userId` already obtained by `getAuth(req)`.
- The call retrieves the Clerk User object.
- The implementation must select a **verified** email address from the returned Clerk User object.
- This does not constitute a new authentication architecture.
- This is an implementation-time server-side call; it must not be executed during this documentation-only correction.

#### 3.8.5 Local User-Row Creation Concurrency

Initial local `users`-row creation is itself a **concurrency-sensitive operation**, separate from but related to the Stripe Customer concurrency requirements in §3.5.

Two simultaneous billing requests for the same previously unseen Clerk user MUST NOT result in:
- Two local `users` rows for the same Clerk user.
- Inconsistent local identity records.
- Lost `stripe_customer_id` state.
- `tier` regression.
- Downstream duplicate Stripe Customers arising from a duplicate-row race.

The implementation must make local `users`-row creation/retrieval race-safe. The specific implementation technique (e.g., `INSERT ... ON CONFLICT DO NOTHING`, a unique constraint on `users.id`, a DB-level upsert, or another PostgreSQL-compatible mechanism) is determined during Task 8-B implementation after inspecting the verified schema.

**This is a distinct concurrency concern from §3.5.** The §3.5 concurrency requirements (Concern A — concurrent `stripe_customer_id` assignment; Concern B — external side-effect / persistence failure boundary) remain fully intact and are not weakened by this section. Both §3.5 concerns must be independently satisfied alongside the local-row creation race requirement stated here.

#### 3.8.6 Authoritative Billing Flow (High-Level)

The following high-level flow makes the intended billing sequence unambiguous for implementation. This is not code and does not prescribe a specific route structure beyond what Task 8-B already defines.

1. Authenticate using the existing Clerk architecture; obtain Clerk `userId`.
2. Ensure the local `users` row exists for this Clerk user (§3.8.2) in a race-safe manner (§3.8.5). If creation is required:
   a. Obtain the verified Clerk email via `clerkClient.users.getUser(userId)` (§3.8.4).
   b. If no verified email is available, return an error without creating the row or proceeding (§3.8.3).
3. Load the local user's billing state (`users.stripe_customer_id`, `users.tier`).
4. If `users.stripe_customer_id` is set: reuse it — never create a second Stripe Customer (§3.5).
5. If `users.stripe_customer_id` is null: create exactly one Stripe Customer, applying the §3.5 concurrency (Concern A) and idempotency (Concern B) requirements; persist `users.stripe_customer_id` safely.
6. Create the Stripe Checkout Session as specified by Task 8-B:
   - Set `metadata.userId` to the Clerk user ID (Decision 5).
   - Set `subscription_data.metadata.userId` to the Clerk user ID (Decision 5).
7. Return `{ url }` to the client.

**This section does NOT:**
- Expand Task 8-B scope beyond §6 Task 8-B.
- Authorize Task 8-C or Task 8-D.
- Introduce a new authentication architecture.
- Change the role of Clerk as the authentication authority.
- Change the Stripe Hosted Checkout architecture (§3.2).
- Weaken §3.5 Concern A or Concern B.
- Authorize any implementation action.


---

## §4 — Out of Scope

| Item | Rationale |
|---|---|
| Production Stripe webhook endpoint (live) | Phase 10 — requires live DNS + HTTPS/Caddy |
| DNS configuration (`api.flavourfind.com`) | Phase 10 |
| Caddy / TLS / HTTPS infrastructure | Phase 10 |
| DigitalOcean Droplet provisioning | Phase 10 |
| GitHub Actions CI/CD pipeline | Phase 10 |
| Sentry error tracking integration | Phase 10 |
| PostHog product analytics | Phase 10 |
| UptimeRobot monitoring | Phase 10 |
| Live-mode Stripe secret keys (`sk_live_...`) | Phase 10 — prohibited during Phase 8 |
| Live Stripe webhook secret | Phase 10 |
| Live Stripe Dashboard webhook registration | Phase 10 |
| Production Stripe Customer Portal configuration | Phase 10 |
| Production Stripe product/price IDs | Phase 10 |
| Production redirect URLs (`success_url`, `cancel_url`, `return_url`) | Phase 10 |
| Stripe publishable key / client-side Stripe.js | Not required for Hosted Checkout architecture |
| `stripe` npm package in `apps/web` | Not required for Hosted Checkout architecture |
| Express Router / `apiRouter` refactoring | Not authorized — routes remain inline in `server.js` |
| `src/routes/` directory | Does not exist — must not be created during Phase 8 |
| `src/db/` directory | Does not exist — must not be created during Phase 8 |
| Prisma ORM | Not in the project; must not be introduced during Phase 8 |
| Premium+ tier ($9.99/month) | Future phase |
| Affiliate revenue links (Amazon Associates, Instacart) | Future phase |
| iOS App Store submission | Future phase |
| React Native / Expo | Not in project strategy |
| Android Studio APK signing / Play Store submission | Phase 10 / Post-Phase 10 |
| AI-generated custom recipes (Sonnet model) | Future phase |
| Nutritional analysis | Future phase |
| Family meal planning (multiple profiles) | Future phase |
| Redis caching | Future phase |
| Fastify migration | Future phase |
| `better-sqlite3` cleanup from root `package.json` | Deferred — do not clean up during Phase 8 |
| CORS narrowing | Unauthorized — not Phase 8 scope |
| Modifications to `ChatClient.tsx` | Phase 5 frozen |
| Modifications to `FloatingChatWidget.tsx` | Phase 7 frozen |
| Modifications to `floating-widget.spec.ts` | Phase 7 frozen |
| Modifications to `chat.spec.ts` | Phase 7 frozen |
| `/api/v1/chat` changes beyond the narrow rate-limit exception (§3.3) | Frozen except as specified in §3.3 |
| Any Phase 10 work | Explicitly deferred |

---

## §5 — Starting Baseline

Phase 8 implementation begins from:

**`phase-7-capacitor-checkpoint-1`**
SHA: `e116e8f300aec9774a15f2f9e9a6cb9aaa60180e`

`origin/main` is confirmed at this commit. All Phase 8 work is on `main` from this baseline.

---

## §6 — Deliverables

Phase 8 is organized into four sequentially deliverable tasks. Each task requires **separate, explicit human authorization** before implementation begins. Completion of one task does not authorize the next.

---

### Task 8-A: Backend — Stripe Package + DB Schema

**Scope:**

- Install `stripe` npm package at the monorepo **root** (`package.json`). Do not install in `apps/web`.
- **Inspect** the current `database.js` initialization block and existing `users` table schema **before** making any modifications. Do not assume column names, types, or constraints; verify current state first.
- Confirm (or create) the `user_subscriptions` PostgreSQL table. Conceptual data model (exact column names, types, and constraints confirmed at inspection time):
  - Subscription record identifier (primary key)
  - Flavour Find user reference (foreign key to `users`)
  - Stripe Customer ID
  - Stripe Subscription ID
  - Subscription status (e.g., `active`, `canceled`, `past_due`, `trialing`)
  - Price/plan identifier
  - Relevant timestamps (created, updated, current period start/end)
- Confirm (or add) `tier` column on `users` with Phase 8 values `'free'` and `'premium'`, default `'free'`. Premium+ is future scope and MUST NOT be introduced or implemented in Phase 8.
- Confirm (or add) `stripe_customer_id` column on `users` (nullable, unique — null until a Stripe Customer is created for the user).
- Add to `.env.example` (placeholder values only — no real credentials):
  ```
  STRIPE_SECRET_KEY=sk_test_REPLACE_ME
  STRIPE_WEBHOOK_SECRET=whsec_REPLACE_ME
  STRIPE_PREMIUM_PRICE_ID=price_REPLACE_ME
  STRIPE_SUCCESS_URL=http://localhost:3001/billing?result=success
  STRIPE_CANCEL_URL=http://localhost:3001/billing?result=cancel
  STRIPE_PORTAL_RETURN_URL=http://localhost:3001/billing
  ```
- No billing routes created in this task.

**Stripe test mode only:** `STRIPE_SECRET_KEY` must begin with `sk_test_`. Live-mode keys are prohibited during Phase 8.

**Authorized modification boundaries:**
- Root `package.json`
- `package-lock.json`
- `.env.example`
- PostgreSQL initialization code — scope and specific file confirmed after inspection of the current `database.js` pattern

**Verification:**
- `npm install` exits 0
- `node -e "require('stripe')"` resolves without error
- `stripe` is in root `package.json` dependencies; it is NOT in `apps/web/package.json`
- `user_subscriptions` table exists in PostgreSQL
- `users.tier` column exists with correct type and default `'free'`
- `users.stripe_customer_id` column exists (nullable, unique)
- `.env.example` contains all six new keys with placeholder values and no real credentials

**Checkpoint:** None — Task 8-A is a prerequisite for 8-B and does not warrant its own checkpoint commit.

---

#### Task 8-A Execution Status

> **Task 8-A Status: COMPLETE — HUMAN REVIEW APPROVED WITH FOLLOW-UP REQUIREMENTS. No Task 8-A checkpoint exists.**
>
> Task 8-A has been implemented, human-reviewed, and approved (with follow-up requirements noted during review). No commit, tag, or push was performed for Task 8-A; no Phase 8 checkpoint has been reached.
>
> **Authoritative Task 8-A implementation scope** (the only Phase 8 files modified so far):
> - Root `package.json` — `stripe@^22.6.1` added
> - `package-lock.json` — updated
> - `.env.example` — six Stripe placeholder keys added
> - `database.js` — `users` and `user_subscriptions` schema additions (see §3.8 and Appendix B below)
>
> **Appendix B — Authoritative Task 8-A Schema (governing for Task 8-B)**
>
> The following schema was actually implemented in `database.js` during Task 8-A and is the authoritative definition for Task 8-B. This supersedes any conceptual field descriptions appearing elsewhere in earlier planning text.
>
> `users` table additions:
> ```
> id                TEXT PRIMARY KEY
> email             TEXT UNIQUE NOT NULL
> tier              TEXT NOT NULL DEFAULT 'free'
> stripe_customer_id TEXT UNIQUE
> created_at        TIMESTAMPTZ DEFAULT NOW()
> ```
>
> `user_subscriptions` table:
> ```
> id                    SERIAL PRIMARY KEY
> user_id               TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE
> stripe_subscription_id TEXT UNIQUE
> plan                  TEXT NOT NULL
> status                TEXT NOT NULL
> current_period_end    TIMESTAMPTZ
> updated_at            TIMESTAMPTZ DEFAULT NOW()
> ```
>
> **Schema governance note:** The actual Task 8-A schema implemented in `database.js` (Appendix B above) is authoritative for Task 8-B. Conceptual or historical field descriptions in earlier planning text must not be interpreted as authorization to add columns or alter the schema. Any future schema change requires its own explicit architectural/governance authorization.
>
> **File-boundary governance note (v1.1.7):** Task 8-B is separately authorized (see §6 Task 8-B "Authorized modification boundaries," corrected v1.1.7, and §10) to add a narrow set of new exported query functions to `database.js` — this is a file-boundary authorization only and does not expand, and must not be read as expanding, the schema boundary stated immediately above. The Appendix B table remains the exhaustive and authoritative schema; new `database.js` functions may only read/write the columns already listed there.
>
> In particular, Task 8-B must NOT infer that the following conceptual fields require addition:
> - `stripe_customer_id` on `user_subscriptions` (absent from implemented schema — not required)
> - `current_period_start` (absent from implemented schema — not required)
> - Any other field absent from Appendix B
>
> **Task 8-B schema escalation requirement:** If Task 8-B implementation encounters a condition where a database column appears to be required but is absent from the authoritative Appendix B schema, the implementing session MUST:
> 1. STOP immediately;
> 2. identify the specific missing column and explain why it appears necessary;
> 3. make NO schema change, NO migration, and NO silent workaround;
> 4. request separate explicit human authorization before any schema modification proceeds.
>
> This requirement applies to ALL `user_subscriptions` columns not listed in Appendix B and to any other schema modification not already present in the Task 8-A implemented schema.

---

> **Task 8-B Status: NOT IMPLEMENTED — AWAITING EXPLICIT HUMAN AUTHORIZATION.**
>
> Completion of Task 8-A and human review does NOT constitute authorization for Task 8-B. Explicit separate human authorization is required before Task 8-B implementation begins. See §12 Governance Gates.

---

### Task 8-B: Backend — Billing Routes + Tier Enforcement

**Scope:**

All billing route handlers are implemented **inline in `server.js`**. No new files. No new directories. No Express Router.

#### Billing Routes

**`POST /api/billing/checkout`** — Authentication required (Clerk `getAuth`).
- Query the DB for the authenticated user's `stripe_customer_id`.
- If null: create a Stripe Customer (test mode) with appropriate metadata; persist `stripe_customer_id` to `users`.
- If set: reuse the existing customer — never create a second.
- Create a Stripe Checkout Session:
  - `mode: 'subscription'`
  - `line_items` with `STRIPE_PREMIUM_PRICE_ID`
  - `customer` set to the Stripe Customer ID
  - `success_url` from `process.env.STRIPE_SUCCESS_URL`
  - `cancel_url` from `process.env.STRIPE_CANCEL_URL`
  - `metadata.userId` (Clerk user ID) on the session
  - `subscription_data.metadata.userId` (Clerk user ID) on the subscription
- Return 200 `{ url }` where `url` is the Stripe-hosted checkout URL.
- Return 401 if not authenticated.

**`POST /api/billing/portal`** — Authentication required (Clerk `getAuth`).

Three distinct states must be handled per §3.7:

- **State A — No Stripe Customer** (`stripe_customer_id IS NULL`): Return 400 `{ error: 'No billing account found' }` (or equivalent). Never create a portal session for a user without a Stripe Customer.
- **State B — Stripe Customer exists; no active Premium entitlement**: Query the user's subscription/entitlement state from the DB per §3.6. If the subscription state is non-entitling (e.g., `canceled`, or a status resolved as non-entitling by Decision 7): return 400 `{ error: 'No active subscription' }` (or equivalent).
- **State C — Stripe Customer exists; active Premium entitlement** (subscription status `trialing`, `active`, or `past_due` per §3.6): Create a Stripe Billing Portal Session:
  - `customer` set to the Stripe Customer ID
  - `return_url` from `process.env.STRIPE_PORTAL_RETURN_URL`
  - Return 200 `{ url }` where `url` begins with `https://billing.stripe.com/`
- Return 401 if not authenticated.

The authoritative subscription/entitlement state is determined from the verified existing database schema (inspected during Task 8-A). See §3.7 for the complete portal state specification.

**Prerequisite for verification:** Stripe Customer Portal must be configured in the Stripe test-mode Dashboard (see §8, Blocker 4).

**`POST /api/billing/webhook`** — No Clerk authentication. `express.raw({ type: 'application/json' })` body parser.
- Retrieve the `stripe-signature` header.
- Call `stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)`.
- If verification fails (missing header, invalid signature, tampered body): return 400.
- Handle events idempotently (see §3.4) per the entitlement policy in §3.6:
  - `customer.subscription.created` → upsert `user_subscriptions`; set `users.tier` based on subscription `status` per §3.6 policy (`trialing`/`active`/`past_due` → `'premium'`; all others → `'free'`)
  - `customer.subscription.updated` → upsert `user_subscriptions`; update `users.tier` based on subscription `status` per §3.6 policy; must not assume all `updated` events grant Premium
  - `customer.subscription.deleted` → update `user_subscriptions`; set `users.tier = 'free'`
  - Any unknown or future subscription status → set `users.tier = 'free'`
- Return 200 on success.

#### Middleware Ordering

The webhook route must be the **first route registered** in `server.js`, placed before the existing `app.use(express.json())` at line 75. All existing middleware and routes are **unchanged**:

```js
// ─── INSERT BEFORE the existing app.use(express.json()) ──────────────────────
app.post('/api/billing/webhook',
  express.raw({ type: 'application/json' }),
  handleBillingWebhook          // inline function defined in server.js
);

// ─── EXISTING middleware — position and content UNCHANGED ─────────────────────
app.use(express.json());        // existing line — position unchanged
// ... all existing inline routes follow unchanged ...
```

No `apiRouter`. No Express Router. No refactoring of existing code.

#### Narrow `/api/v1/chat` Rate-Limit Modification

Per §3.3, Task 8-B includes modifying **only** the rate-limit lookup in the `/api/v1/chat` handler. The flat `AI_CHAT_LIMIT_FREE` env-var limit is replaced with a tier-aware query of `users.tier`. No other change to that handler is made or authorized.

#### Backend API Verification (Automated — curl or HTTP Client — NOT Playwright)

These checks are part of Task 8-B verification and do not require a browser:

- `POST /api/billing/checkout` without auth → 401
- `POST /api/billing/portal` without auth → 401
- `POST /api/billing/webhook` with no `stripe-signature` header → 400
- `POST /api/billing/webhook` with tampered body → 400
- `POST /api/billing/checkout` with valid Clerk auth → 200 `{ url }` where `url` begins with `https://checkout.stripe.com/`
- `POST /api/billing/portal` with valid Clerk auth and seeded `stripe_customer_id` → 200 `{ url }` where `url` begins with `https://billing.stripe.com/`
- `POST /api/billing/portal` with valid Clerk auth and no `stripe_customer_id` in DB → 400

#### Stripe CLI Manual Verification (Developer-Run — NOT Automated — NOT Playwright)

**Prerequisite — user-mapping fixture:** Before running any event-type tests that assert against `users.tier` or `user_subscriptions`, the implementation must establish a deterministic test fixture connecting a known seeded Flavour Find user to the Stripe Customer referenced in the test event. See §3.4 (Webhook Test User-Mapping Requirement). Without this fixture, `users.tier` assertions cannot be meaningfully verified.

The following steps are executed manually by the human developer:

1. Start the server: `npm start` (or `node server.js`)
2. `stripe listen --forward-to localhost:3000/api/billing/webhook`

**Event-type tests** (each `stripe trigger` invocation creates a distinct event with a unique `event.id`):

3. `stripe trigger customer.subscription.created` — with the test fixture mapping the Stripe Customer to the known seeded Flavour Find user → server returns 200; assert `users.tier = 'premium'` for that specific user in DB
4. `stripe trigger customer.subscription.deleted` — with the test fixture → server returns 200; assert `users.tier = 'free'` for that specific user in DB
5. `stripe trigger customer.subscription.updated` — with the test fixture; assert `user_subscriptions` updated correctly per the defined entitlement policy (§3.6 / Decision 7)

**Idempotency test** (duplicate-delivery of the **exact same `event.id`** — NOT a second `stripe trigger`):

6. Obtain one signed webhook event payload (the Stripe CLI or `stripe listen` may be used to capture a realistic initial event with a valid structure and `event.id`).
7. Deliver that exact payload to `POST /api/billing/webhook` → server returns 200; assert `users.tier` and `user_subscriptions` updated.
8. Deliver the **exact same payload** (same `event.id`, same signed body) a second time to `POST /api/billing/webhook` → server returns 200; assert `users.tier` and `user_subscriptions` are **unchanged** compared to after step 7.

Note: Steps 6–8 are the idempotency test. The event fixture in step 6 may be obtained via `stripe trigger` or `stripe listen` capture, but the critical requirement in steps 7–8 is replaying the **same payload** — not triggering a new Stripe event.

**Authorized modification boundaries — Task 8-B (corrected v1.1.7):**
- `server.js`:
  - Webhook route registration inserted before `app.use(express.json())`
  - Inline billing handler functions (`handleBillingWebhook`, checkout handler, portal handler)
  - Narrow rate-limit modification to the `/api/v1/chat` section per §3.3
  - New imports only (`stripe` client init, `clerkClient` from the already-installed `@clerk/express`)
- `database.js` — **narrowly authorized (v1.1.7 governance correction):**
  - New exported functions only, limited to the minimum required for: local `users` row lookup/creation (§3.8.2, §3.8.5), `stripe_customer_id` persistence with the concurrency-safe strategy required by §3.5, `user_subscriptions` upsert/retrieval (including the idempotency approach in §3.4), and `users.tier` retrieval (for both the billing routes and the §3.3 chat rate-limit lookup)
  - Existing `database.js` functions and the existing `pool` initialization must not be rewritten or behaviorally changed
  - **A second, independent `pg.Pool` MUST NOT be instantiated in `server.js`.** The existing single-pool `database.js` pattern remains the sole database-access path for all of Task 8-B.
  - **No new tables, columns, or indexes are authorized by this correction.** The `users` and `user_subscriptions` schemas remain exactly as defined in Task 8-A Appendix B; see the schema-escalation requirement (p. Task 8-A Execution Status) for what to do if a column not in Appendix B appears necessary.
- No other files may be modified by this task

**Checkpoint:** Task 8-B qualifies for the **Phase 8 backend checkpoint** (`phase-8-backend-checkpoint-1`) upon successful verification. The checkpoint requires: all Task 8-B verification passing, `repository-reviewer` agent reporting CHECKPOINT READY, and **separate explicit human authorization** for commit, tag, and push. See §12.

---

### Task 8-C: Frontend — Upgrade UI & Tier Display

**Scope:**

1. **Billing page** — `apps/web/app/billing/page.tsx` (dedicated billing page, per resolved Decision 4).

2. **Upgrade CTA** — "Upgrade to Premium" button visible to authenticated free-tier users. Calls `POST /api/billing/checkout`. On success, redirects browser to the returned `url`. Not visible to premium-tier users.

3. **Portal link** — "Manage Subscription" link visible to authenticated premium-tier users. Calls `POST /api/billing/portal`. On success, redirects browser to the returned `url`. Not visible to free-tier users.

4. **Tier display** — User's current tier ("Free" / "Premium") shown on the billing page and/or as a badge in the global layout.

5. **Chat 429 upgrade prompt** — When `/api/v1/chat` returns 429, render a styled upgrade prompt instead of raw JSON. Must be implemented outside the frozen `ChatClient.tsx` and `FloatingChatWidget.tsx`. If no implementation path exists that avoids frozen components, escalate to the human before proceeding.

6. **API client additions** — New functions in `apps/web/lib/api.ts`: `createCheckoutSession()` and `createPortalSession()` calling `/api/billing/checkout` and `/api/billing/portal` respectively.

**What Task 8-C does NOT include:**
- Modification of `ChatClient.tsx` or `FloatingChatWidget.tsx` — **frozen**
- Modification of the `/chat` page — **frozen**
- Full account/settings page
- Payment method management UI (handled by Stripe Customer Portal)
- Any client-side Stripe.js or payment form

**Authorized modification boundaries — Task 8-C:**
- New: `apps/web/app/billing/page.tsx` (and any required subdirectory)
- New: `apps/web/components/UpgradeButton.tsx`, `TierBadge.tsx`, or equivalent new component files
- `apps/web/app/layout.tsx` — tier badge only; no other changes
- `apps/web/lib/api.ts` — new billing API functions only

**Verification:**
- Playwright: "Upgrade to Premium" button visible to authenticated free-tier user
- Playwright: clicking button triggers navigation to a `checkout.stripe.com` URL (Stripe test mode)
- Playwright: "Manage Subscription" link visible to authenticated premium-tier user (requires pre-seeded DB fixture for `users.tier = 'premium'` and `stripe_customer_id`)
- Playwright: 429 from chat endpoint renders as styled upgrade prompt, not raw JSON
- `ChatClient.tsx` SHA is identical to its Phase 5 committed version
- `FloatingChatWidget.tsx` SHA is identical to its Phase 7 committed version

**Checkpoint:** Task 8-C is included in the **Phase 8 final checkpoint** (`phase-8-checkpoint-1`) together with Task 8-D.

---

### Task 8-D: Playwright E2E — Frontend Billing Test Suite

**Scope:**

Create `apps/web/e2e/billing.spec.ts`. Tests cover deterministic HTTP and UI behavior that does **not** require the Stripe CLI to be running as an external process.

**Automated Playwright tests (in `billing.spec.ts`):**
- `POST /api/billing/checkout` without auth → 401
- `POST /api/billing/portal` without auth → 401
- `POST /api/billing/webhook` with no `stripe-signature` → 400
- `POST /api/billing/webhook` with invalid/tampered signature → 400
- "Upgrade to Premium" button visible to authenticated free-tier user
- "Manage Subscription" link visible to authenticated premium-tier user (pre-seeded DB fixture)
- `POST /api/billing/checkout` with valid Clerk auth → 200 `{ url }` beginning `https://checkout.stripe.com/`
- `POST /api/billing/portal` with valid Clerk auth and `stripe_customer_id IS NULL` → 400 (State A — no Stripe Customer)
- `POST /api/billing/portal` with valid Clerk auth and `stripe_customer_id` set but subscription non-entitling → 400 (State B — no active entitlement)
- `POST /api/billing/portal` with valid Clerk auth and active Premium entitlement (subscription status `trialing`, `active`, or `past_due` per §3.6) → 200 `{ url }` beginning `https://billing.stripe.com/` (State C)

**Not in `billing.spec.ts` (manual verification only):**
- Full Stripe CLI end-to-end webhook lifecycle (covered in Task 8-B manual verification)
- Idempotency test — duplicate-delivery of the same `event.id` (see §3.4; requires a signed-payload replay mechanism, developer-run per Task 8-B)

The Stripe CLI manual verification steps are part of Task 8-B documentation and are developer-run. Playwright tests do not spawn or depend on an external Stripe CLI process.

**Authorized modification boundaries — Task 8-D:**
- New file: `apps/web/e2e/billing.spec.ts`
- `apps/web/playwright.config.ts` — only if strictly necessary for billing test configuration; no other changes

**Verification:**
- `npx playwright test billing.spec.ts` — all written tests pass
- `npx playwright test home.spec.ts chat.spec.ts floating-widget.spec.ts` — no regressions

**Checkpoint:** Task 8-D is included in the **Phase 8 final checkpoint** (`phase-8-checkpoint-1`). This checkpoint requires: Tasks 8-C and 8-D both complete and verified, all tests passing, `repository-reviewer` reporting CHECKPOINT READY, and **separate explicit human authorization** for commit, tag, and push. See §12.

---

## §7 — Open Decisions

### Decision 1 — Stripe Test-Mode Account and Price Configuration

**Status: RESOLVED / SATISFIED — NO LONGER BLOCKING Task 8-B**

All Stripe test-mode prerequisites have been established by the human:

| Prerequisite | State |
|---|---|
| Stripe Sandbox/Test account | ESTABLISHED |
| `Flavour Find Premium` product | CREATED |
| Premium recurring price | CA$9.99/month |
| Stripe Price ID | ESTABLISHED (configured in local `.env` as `STRIPE_PREMIUM_PRICE_ID`) |
| Stripe test-mode secret key | CONFIGURED in local `.env` only — secret value is NOT documented here |

**Explicit prohibition (unchanged):** Live-mode Stripe keys (`sk_live_...`) must not be used during Phase 8. No live Stripe credentials should appear in or be passed to this planning document.

Decision 1 no longer blocks Task 8-B. Task 8-B authorization is a separate governance gate requiring explicit human approval; resolution of this decision does not constitute that authorization.

---

### Decision 2 — DB Migration Strategy

**Status: RESOLVED — Option A**

PostgreSQL schema migrations use **inline `CREATE TABLE IF NOT EXISTS` / `ALTER TABLE IF NOT EXISTS` SQL** in the existing server startup initialization block, consistent with the current `database.js` pattern. Prisma is not installed in this project and must not be introduced. Raw `pg` queries are the established pattern. Decision closed.

Before implementation, Task 8-A must inspect the current `database.js` initialization block and existing `users` table schema to confirm the exact migration approach.

---

### Decision 3 — Stripe Package Installation Location

**Status: RESOLVED — Root `package.json` only**

Phase 8 uses Stripe Hosted Checkout. No client-side Stripe.js is required. No Stripe publishable key is required in `apps/web`. The `stripe` package belongs only in the root `package.json`. Decision closed.

---

### Decision 4 — Frontend Billing Page Structure

**Status: RESOLVED — Dedicated page**

A dedicated `apps/web/app/billing/page.tsx` is the billing UI home. Tier badge may appear in the global layout. Decision closed.

---

### Decision 5 — `userId` in Stripe Subscription Metadata

**Status: RESOLVED — HUMAN-APPROVED — AUTHORITATIVE FOR PHASE 8**

The Clerk user ID is used as the primary application-user mapping key throughout the Stripe billing flow. The authoritative human-approved decision is:

> **Use the Clerk user ID as `metadata.userId` on both the Stripe Checkout Session and the resulting Stripe Subscription. The webhook uses `metadata.userId` as the primary application-user mapping key. `users.stripe_customer_id` is retained as the secondary Stripe Customer lookup/reconciliation key.**

**Authoritative identity mapping:**

| Element | Value |
|---|---|
| `users.id` | Clerk user ID |
| Checkout Session `metadata.userId` | Clerk user ID |
| `subscription_data.metadata.userId` | Clerk user ID |
| Webhook primary mapping key | `metadata.userId` (Clerk user ID) |
| Webhook secondary mapping/reconciliation key | `event.data.object.customer` matched against `users.stripe_customer_id` |

**Explicit prohibitions (must not be introduced during Task 8-B implementation):**
- Do not replace Clerk userId with email as the primary mapping key.
- Do not make `stripe_customer_id` the primary application-user mapping key.
- Do not introduce a new identity provider.
- Do not deviate from this mapping without a separate human governance decision.

This decision no longer blocks Task 8-B. Task 8-B must implement this mapping exactly.

---

### Decision 6 — Stripe Customer Portal Test-Mode Dashboard Configuration

**Status: OPEN — PREREQUISITE for Task 8-B portal verification**

Before the Customer Portal route can be verified, the Stripe Customer Portal must be configured in the Stripe test-mode Dashboard (allowed features, cancellation settings). This is a **one-time human administrative action** in the Stripe Dashboard. It is not a code change and must not be performed by Claude.

This is a prerequisite for Task 8-B verification. It does not block Task 8-B implementation, only Task 8-B portal-verification.

---

### Decision 7 — Subscription Entitlement Policy

**Status: RESOLVED — HUMAN-APPROVED POLICY — AUTHORITATIVE FOR PHASE 8**

The following entitlement policy has been explicitly approved by the human and is the authoritative Phase 8 business rule. Task 8-B must implement exactly this policy. Claude CLI must not invent, infer, broaden, or otherwise modify this policy during implementation.

**Authoritative Phase 8 Subscription Entitlement Policy:**

| Stripe Subscription Status | Flavour Find Entitlement | `users.tier` |
|---|---|---|
| `trialing` | Premium | `'premium'` |
| `active` | Premium | `'premium'` |
| `past_due` | Premium | `'premium'` |
| `unpaid` | Free / non-Premium | `'free'` |
| `paused` | Free / non-Premium | `'free'` |
| `incomplete` | Free / non-Premium | `'free'` |
| `incomplete_expired` | Free / non-Premium | `'free'` |
| `canceled` | Free / non-Premium | `'free'` |
| `customer.subscription.deleted` event | Free / non-Premium | `'free'` |

**Unknown or future Stripe subscription statuses must default to Free / non-Premium.** They must never grant Premium entitlement unless this Phase 8 policy is explicitly amended through the established human governance process.

**Human-provided rationale (must not be reinterpreted during implementation):**

- `trialing` represents an authorized Premium trial.
- `active` represents a subscription in good standing.
- `past_due` provides a reasonable short-term payment-recovery grace period while Stripe may still recover the payment and return the subscription to `active`.
- Once a subscription reaches `unpaid`, Premium entitlement ends.
- `paused`, `incomplete`, and `incomplete_expired` do not represent an active, successfully established Premium entitlement under this Phase 8 policy.
- `canceled` is a terminal non-Premium state.
- The `past_due` treatment is an intentional Flavour Find product decision. It must not be reinterpreted by Claude CLI during implementation.

**Scope of this policy:** This policy intentionally does not introduce configurable grace periods, separate `past_due` tiers, temporary Premium states, access-expiration timestamps, dunning state machines, manual billing overrides, multiple subscription entitlements, or invoice-level entitlement calculations. The existing Phase 8 architecture of a simple `users.tier` (`'free'` / `'premium'`) and `user_subscriptions` is sufficient.

This decision no longer blocks Task 8-A or Task 8-B.

---

## §8 — Blockers

### Blocker 1 — Stripe Test-Mode Account and Keys

**Status: CLEARED / RESOLVED**

The Stripe Sandbox/Test account, `Flavour Find Premium` product, CA$9.99/month Premium price, Stripe Price ID, and Stripe test-mode secret have all been established. Credentials are in the local `.env` file. See Decision 1.

This blocker no longer blocks Tasks 8-B through 8-D on the basis of Stripe account/price/credential setup.

---

### Blocker 2 — Shell Availability During Implementation

The planning session was conducted without `device_bash`. Implementation must be performed using Claude CLI (or a session with shell access). If shell access remains unavailable at implementation time, this blocks `npm install`, test execution, and server verification.

This is an implementation-environment concern, not a project architecture concern.

---

### Blocker 3 — PostgreSQL Connection During Development

Phase 8 requires a live PostgreSQL connection for schema migrations, DB state verification, and authenticated Playwright tests with pre-seeded fixtures. Confirm DB connectivity before Task 8-B implementation.

---

### Blocker 4 — Stripe Customer Portal Test-Mode Dashboard Configuration

Before `POST /api/billing/portal` can be verified, the Stripe Customer Portal must be configured in the Stripe test-mode Dashboard by the human. See Decision 6.

---

## §9 — Protected Files

The following files MUST NOT be modified during Phase 8 unless a **separate explicit authorization** is granted for each file:

| File | Reason |
|---|---|
| `apps/web/components/ChatClient.tsx` | Phase 5 frozen |
| `apps/web/components/FloatingChatWidget.tsx` | Phase 7 frozen |
| `apps/web/e2e/chat.spec.ts` | Phase 5/7 E2E harness — must not regress |
| `apps/web/e2e/floating-widget.spec.ts` | Phase 7 E2E harness — must not regress |
| `apps/web/e2e/home.spec.ts` | Phase baseline E2E — must not regress |
| `phase7_plan_5.md` | Phase 7 authoritative planning doc — Phase 7 is closed |
| `phase8_plan_1.md` | This planning document — treat as record during implementation |
| `SAAS_ROADMAP.md` | Authoritative roadmap — no unsanctioned changes |
| `apps/web/capacitor.config.ts` | Phase 7 Capacitor config — frozen |
| `apps/web/android/` (entire directory) | Phase 7 Android project — frozen unless Phase 10 authorized |
| `apps/web/next.config.ts` | Static export config required by Capacitor — do not change |
| `apps/web/app/chat/` | Phase 5 chat page — frozen |
| All `phase*_plan_*.md` files | Historical planning record |
| `.env` (actual secrets file) | Never committed; contains live credentials |
| All prior checkpoint tags | Immutable git history |

**`/api/v1/chat` handler narrow exception:** Only the rate-limit calculation within the `/api/v1/chat` handler in `server.js` may be modified during Task 8-B, per §3.3. All other aspects of that handler remain frozen.

---

## §10 — Authorized Modification Boundaries

| Task | Files That May Be Modified / Created |
|---|---|
| 8-A | Root `package.json`, `package-lock.json`, `.env.example`, PostgreSQL initialization code (scope confirmed after inspection of `database.js`) |
| 8-B | `server.js`: webhook route insertion before `express.json()`, inline billing handler functions, narrow chat rate-limit modification per §3.3, new imports only. `database.js` (narrowly authorized, v1.1.7): new exported query functions only, limited to local `users` lookup/creation, `stripe_customer_id` persistence, `user_subscriptions` upsert/retrieval, and `users.tier` retrieval — no rewrite of existing functions, no second `pg.Pool`, no new tables/columns/indexes. |
| 8-C | New `apps/web/app/billing/page.tsx` (and subdirectory), new `apps/web/components/` billing component(s), `apps/web/app/layout.tsx` (tier badge only), `apps/web/lib/api.ts` (new billing functions only) |
| 8-D | New `apps/web/e2e/billing.spec.ts`, `apps/web/playwright.config.ts` (only if strictly necessary) |

**Global constraints applying to all tasks:**
- No file outside the above boundaries may be modified without separate authorization.
- No new top-level backend directories (`src/`, `src/routes/`, `src/db/`) may be created.
- No Express Router extraction from `server.js` is authorized.
- No `stripe` package may be added to `apps/web/package.json`.
- No real secrets may be committed to any file.
- No Prisma files, schema, or configuration may be created or modified.

---

## §11 — Verification Requirements

### §11.1 Task 8-A Verification
- `npm install` exits 0
- `node -e "require('stripe')"` resolves without error
- `stripe` is in root `package.json` dependencies; NOT in `apps/web/package.json`
- `user_subscriptions` table exists in PostgreSQL using the authoritative Task 8-A Appendix B schema: `id`, `user_id`, `stripe_subscription_id`, `plan`, `status`, `current_period_end`, and `updated_at`. The Task 8-A implemented Appendix B schema is authoritative for Task 8-B; conceptual or historical field descriptions must not be used to add columns that are not present in that schema without separate human authorization.
- `users.tier` column exists with default `'free'`
- `users.stripe_customer_id` column exists (nullable, unique)
- `.env.example` contains all six Stripe config keys with placeholder values; no real credentials

### §11.2 Task 8-B Verification

**API verification (curl or HTTP client — NOT Playwright):**
- `POST /api/billing/checkout` without auth → 401
- `POST /api/billing/portal` without auth → 401
- `POST /api/billing/webhook` with no `stripe-signature` → 400
- `POST /api/billing/webhook` with tampered body → 400
- `POST /api/billing/checkout` with valid Clerk auth → 200 `{ url }` where `url` begins `https://checkout.stripe.com/`
- `POST /api/billing/portal` with valid Clerk auth and `stripe_customer_id IS NULL` → 400 (State A: no Stripe Customer)
- `POST /api/billing/portal` with valid Clerk auth and `stripe_customer_id` set but subscription non-entitling → 400 (State B: no active entitlement)
- `POST /api/billing/portal` with valid Clerk auth and active Premium entitlement (subscription status `trialing`, `active`, or `past_due` per §3.6) → 200 `{ url }` where `url` begins `https://billing.stripe.com/` (State C)

**Stripe CLI manual verification (developer-run — NOT automated):**

Prerequisite: Test fixture established — known seeded Flavour Find user mapped to Stripe Customer in test event (see §3.4).

Event-type tests (each `stripe trigger` creates a distinct event with a unique `event.id`):
1. Start server: `npm start`
2. `stripe listen --forward-to localhost:3000/api/billing/webhook`
3. `stripe trigger customer.subscription.created` (with fixture mapping) → 200; assert `users.tier = 'premium'` for the known seeded user in DB
4. `stripe trigger customer.subscription.deleted` (with fixture mapping) → 200; assert `users.tier = 'free'` for the known seeded user in DB
5. `stripe trigger customer.subscription.updated` (with fixture mapping) → assert `user_subscriptions` updated correctly per entitlement policy (§3.6 / Decision 7)

Idempotency test (same `event.id` delivered twice — NOT a second `stripe trigger`):
6. Obtain one signed event payload (via Stripe CLI capture or fixture); deliver to `POST /api/billing/webhook` → 200; assert DB updated
7. Deliver the **exact same payload** (same `event.id`, same signed body) a second time → 200; assert `users.tier` and `user_subscriptions` are **unchanged** vs. after step 6

**Middleware ordering verification:**
- Code review confirms the webhook route appears in `server.js` before `app.use(express.json())`
- `repository-reviewer` agent must verify this specifically as part of the backend checkpoint review

**Chat rate-limit tier verification:**
- With a seeded `users.tier = 'free'`, the `/api/v1/chat` handler applies the free-tier limit
- With a seeded `users.tier = 'premium'`, the handler applies the premium limit
- A diff review confirms no other aspect of the `/api/v1/chat` handler has changed

### §11.3 Task 8-C Verification
- Playwright: "Upgrade to Premium" button visible to authenticated free-tier user
- Playwright: clicking button triggers navigation to `https://checkout.stripe.com/...`
- Playwright: "Manage Subscription" link visible to authenticated premium-tier user (pre-seeded DB fixture)
- Playwright: 429 chat error renders as styled upgrade prompt, not raw JSON
- `ChatClient.tsx` SHA identical to Phase 5 committed version
- `FloatingChatWidget.tsx` SHA identical to Phase 7 committed version

### §11.4 Task 8-D Verification
- `npx playwright test billing.spec.ts` — all written tests pass
- `npx playwright test home.spec.ts chat.spec.ts floating-widget.spec.ts` — no regressions

### §11.5 repository-reviewer Agent

The `repository-reviewer` agent MUST be invoked before each Phase 8 checkpoint commit. It must report **CHECKPOINT READY** before the commit proceeds. For the backend checkpoint, it must specifically verify that the webhook route is registered before `app.use(express.json())`.

---

## §12 — Governance Gates

Every transition between the following stages requires **explicit human authorization**. Completion of one stage does not implicitly authorize the next. Commit, tag, and push are **never** authorized by task completion or verification alone.

**Push governance:** All `git push` operations must use **explicit refspecs**. Broad commands such as `git push --tags` or `git push` without named refs are prohibited. Each ref must be individually named and individually authorized.

```
§12 — GOVERNANCE GATES

Planning (this document — v1.1.6)
        │
        ▼
Human review and approval of this plan
        │
        ▼ [EXPLICIT AUTHORIZATION REQUIRED]
Explicit authorization: Task 8-A only
        │
        ▼
Task 8-A implementation
        │
        ▼
Task 8-A verification (human confirms)
        │
        ▼ [EXPLICIT AUTHORIZATION REQUIRED]
Explicit authorization: Task 8-B only
        │
        ▼
Task 8-B implementation
        │
        ▼
Task 8-B verification (human confirms: API checks + Stripe CLI manual verification)
        │
        ▼ [EXPLICIT AUTHORIZATION REQUIRED]
repository-reviewer invocation → must report CHECKPOINT READY
  (must verify webhook route precedes express.json())
        │
        ▼ [EXPLICIT AUTHORIZATION REQUIRED]
Commit authorization (separate explicit authorization)
  git add [specific files only]
  git commit -m "..."
        │
        ▼ [EXPLICIT AUTHORIZATION REQUIRED]
Tag authorization (separate explicit authorization)
  git tag phase-8-backend-checkpoint-1
  Verify exact tag SHA
        │
        ▼ [EXPLICIT AUTHORIZATION REQUIRED]
Push authorization (separate explicit authorization — explicit refspecs only)
  git push origin main
  git push origin refs/tags/phase-8-backend-checkpoint-1
  Verify exact remote refs after push
        │
        ▼ ═══════ PHASE 8 BACKEND CHECKPOINT COMPLETE ═══════
        │
        ▼ [EXPLICIT AUTHORIZATION REQUIRED]
Explicit authorization: Task 8-C only
        │
        ▼
Task 8-C implementation
        │
        ▼
Task 8-C verification (human confirms)
        │
        ▼ [EXPLICIT AUTHORIZATION REQUIRED]
Explicit authorization: Task 8-D only
        │
        ▼
Task 8-D implementation
        │
        ▼
Task 8-D verification (human confirms: Playwright tests pass, no regressions)
        │
        ▼ [EXPLICIT AUTHORIZATION REQUIRED]
repository-reviewer invocation → must report CHECKPOINT READY
        │
        ▼ [EXPLICIT AUTHORIZATION REQUIRED]
Commit authorization (separate explicit authorization)
  git add [specific files only]
  git commit -m "..."
        │
        ▼ [EXPLICIT AUTHORIZATION REQUIRED]
Tag authorization (separate explicit authorization)
  git tag phase-8-checkpoint-1
  Verify exact tag SHA
        │
        ▼ [EXPLICIT AUTHORIZATION REQUIRED]
Push authorization (separate explicit authorization — explicit refspecs only)
  git push origin main
  git push origin refs/tags/phase-8-checkpoint-1
  Verify exact remote refs after push
        │
        ▼ ═══════ PHASE 8 FINAL CHECKPOINT COMPLETE ═══════
```

**No stage is implicitly authorized by completion of the previous stage.**

---

## §13 — Phase 10 Boundary

The following is **DEFERRED — PENDING PHASE 10 PRODUCTION DEPLOYMENT** and is NOT Phase 8 scope under any circumstance:

- Live Stripe webhook endpoint (requires `https://api.flavourfind.com` to be live)
- Stripe Dashboard live webhook registration
- `STRIPE_WEBHOOK_SECRET` for the live production endpoint
- Live-mode Stripe credentials of any kind
- Production Stripe Customer Portal configuration
- Production `success_url`, `cancel_url`, `return_url` values
- Android runtime billing flow testing (Capacitor WebView)
- Any production DNS, Caddy, or HTTPS work
- Any DigitalOcean Droplet provisioning or Docker deployment
- GitHub Actions CI/CD pipeline
- Sentry, PostHog, UptimeRobot

**Phase 8 Stripe testing uses exclusively:**
- Stripe test-mode keys (`sk_test_...`)
- Stripe CLI for local webhook forwarding (`stripe listen`)
- Test card numbers (e.g., `4242 4242 4242 4242`)
- Local or dev-environment PostgreSQL
- Local redirect URLs (`localhost:3001`)

---

## §14 — Acceptance Criteria

Phase 8 is complete when ALL of the following are true:

1. `stripe` is in root `package.json` and importable; it is NOT in `apps/web/package.json`.
2. `user_subscriptions` exists in PostgreSQL using the authoritative Task 8-A Appendix B schema: `id`, `user_id`, `stripe_subscription_id`, `plan`, `status`, `current_period_end`, and `updated_at`. No additional `user_subscriptions` columns may be introduced during Task 8-B unless separately authorized.
3. `users.tier` column exists with default `'free'`; `users.stripe_customer_id` exists (nullable, unique).
4. `POST /api/billing/checkout` with valid Clerk auth returns 200 `{ url }` where `url` begins with `https://checkout.stripe.com/`.
5. `POST /api/billing/portal` with valid Clerk auth and an active Premium entitlement (State C per §3.7 — subscription status `trialing`, `active`, or `past_due` per §3.6) returns 200 `{ url }` where `url` begins with `https://billing.stripe.com/`.
6. `POST /api/billing/portal` with valid Clerk auth and `stripe_customer_id IS NULL` returns 400 (State A — no Stripe Customer; see §3.7 and AC 24 for all three portal states).
7. `POST /api/billing/webhook` with no `stripe-signature` header returns 400.
8. `POST /api/billing/webhook` with a tampered body returns 400.
9. Webhook route is registered in `server.js` **before** `app.use(express.json())` — verified by code review and `repository-reviewer`.
10. The webhook handler applies the entitlement policy from §3.6 / Decision 7: `customer.subscription.created` or `customer.subscription.updated` with status `trialing`, `active`, or `past_due` sets `users.tier = 'premium'`; with status `unpaid`, `paused`, `incomplete`, `incomplete_expired`, or `canceled` sets `users.tier = 'free'`. `customer.subscription.deleted` sets `users.tier = 'free'`. The handler does not assume all `created` or `updated` events result in Premium.
11. `customer.subscription.deleted` events set `users.tier = 'free'`.
12. Webhook handler is idempotent: delivering the **exact same signed event payload** (same `event.id`) twice produces the same DB state as delivering it once. Verified by replaying one event payload twice — not by triggering two separate `stripe trigger` invocations.
13. The `/api/v1/chat` rate-limit section uses `users.tier` to determine the limit; a diff review confirms no other aspect of the handler has changed.
14. A free-tier user sees an "Upgrade to Premium" CTA in the web UI.
15. A premium-tier user sees a "Manage Subscription" link in the web UI.
16. The AI chat 429 error renders as a styled upgrade prompt, not raw JSON.
17. `billing.spec.ts` Playwright tests all pass.
18. `home.spec.ts`, `chat.spec.ts`, `floating-widget.spec.ts` all continue to pass (no regressions).
19. `ChatClient.tsx` and `FloatingChatWidget.tsx` are byte-identical to their Phase 5/7 committed versions.
20. `.env.example` contains all six Stripe config keys with placeholder values and no real credentials.
21. Phase 8 backend checkpoint commit created, tagged `phase-8-backend-checkpoint-1`, pushed to `origin/main` — **each step separately authorized**.
22. Phase 8 final checkpoint commit created, tagged `phase-8-checkpoint-1`, pushed to `origin/main` — **each step separately authorized**.
23. `repository-reviewer` reported CHECKPOINT READY for both checkpoints.
24. `POST /api/billing/portal` returns 400 when the authenticated user has no `stripe_customer_id` (State A — no Stripe Customer); returns 400 when the user has a `stripe_customer_id` but no active Premium entitlement (State B — no active subscription); returns 200 `{ url }` beginning `https://billing.stripe.com/` when the user has an active Premium entitlement (subscription status `trialing`, `active`, or `past_due` per §3.6; State C). All three states are verified per §3.7.
25. The webhook handler implements the human-approved entitlement policy from §3.6 / Decision 7 exactly: `trialing`, `active`, and `past_due` grant `users.tier = 'premium'`; `unpaid`, `paused`, `incomplete`, `incomplete_expired`, and `canceled` result in `users.tier = 'free'`; `customer.subscription.deleted` results in `users.tier = 'free'`; all unknown/future statuses default to `'free'`. No Stripe status is implicitly treated as Premium unless explicitly listed in the documented policy. No undocumented entitlement behavior may be introduced during implementation.
26. The `stripe_customer_id` assignment addresses both concerns from §3.5: (A) concurrent-request race protection — a verified PostgreSQL-compatible strategy prevents two simultaneous requests from each creating a Stripe Customer when observing `stripe_customer_id IS NULL`; AND (B) external side-effect failure boundary — an explicit strategy accounts for the failure sequence where a Stripe Customer is successfully created but the Customer ID is not durably persisted before an application failure, preventing a later request from inadvertently creating a second Stripe Customer. Code review and `repository-reviewer` verify both Concern A and Concern B have been addressed. This criterion does not claim that a database lock alone guarantees the global one-user → one-Stripe-Customer invariant.
27. Webhook test assertions (`users.tier`, `user_subscriptions`) are performed against a specific, deterministically seeded Flavour Find user whose Stripe Customer is verifiably mapped to the Stripe event fixture. The traceability chain Stripe event → Stripe Customer → Flavour Find user → `users.tier` is demonstrable from the Task 8-B verification record.

---

## §15 — Checkpoint Strategy

**Two checkpoints — both mandatory — neither implied by task completion.**

| Checkpoint | Scope | Tag | Gate |
|---|---|---|---|
| Phase 8 Backend Checkpoint | Tasks 8-A + 8-B verified | `phase-8-backend-checkpoint-1` | repository-reviewer CHECKPOINT READY + separate explicit human authorization for commit, tag, and push |
| Phase 8 Final Checkpoint | Tasks 8-C + 8-D verified | `phase-8-checkpoint-1` | repository-reviewer CHECKPOINT READY + separate explicit human authorization for commit, tag, and push |

All push operations use explicit refspecs per §12. `git push --tags` is prohibited.

---

## §16 — Documentation Status

| Document | Status |
|---|---|
| `phase7_plan_5.md` v2.1.4 | Authoritative Phase 7 record — do not modify |
| `SAAS_ROADMAP.md` | Authoritative roadmap — Phase 8 content draws from §Phase 9 (Appendix C) |
| `phase8_plan_1.md` v1.0.0 | Superseded by v1.1.0 — retained as historical record |
| `phase8_plan_1.md` v1.1.0 | Superseded by v1.1.1 — retained as historical record |
| `phase8_plan_1.md` v1.1.1 | Superseded by v1.1.2 — retained as historical record |
| `phase8_plan_1.md` v1.1.2 | Superseded by v1.1.3 — retained as historical record |
| `phase8_plan_1_4.md` v1.1.3 | Superseded by v1.1.4 — retained as historical record |
| `phase8_plan_1_4.md` v1.1.4 | Superseded by v1.1.5 — retained as historical record |
| `phase8_plan_1_4.md` v1.1.5 | Superseded by v1.1.6 — retained as historical record |
| `phase8_plan_1_4.md` v1.1.6 | Superseded by v1.1.7 — retained as historical record |
| `phase8_plan_1_4.md` v1.1.7 (this document) | PROPOSED — awaiting human review and explicit implementation authorization |

Phase 8 does not require any modification to `SAAS_ROADMAP.md`.

---

## §17 — Required Governance Conclusions for This Session

1. **Phase 7 is FORMALLY COMPLETE.** All Phase 7 work is committed, tagged, and pushed. No Phase 7 action remains.

2. **Production-dependent runtime acceptance is FORMALLY DEFERRED — PENDING PHASE 10.**

3. **Phase 8 planning v1.1.7 is the current proposed documentation correction baseline**, superseding v1.1.6, v1.1.5, v1.1.4, v1.1.3, v1.1.2, v1.1.1, v1.1.0, and v1.0.0. This document is subject to human review and revision before any implementation authorization.

4. **Task 8-A has been implemented and human-reviewed (approved with follow-up requirements).** Task 8-A modified: root `package.json`, `package-lock.json`, `.env.example`, and `database.js` (schema additions for `users` and `user_subscriptions`; root `stripe@^22.6.1` dependency). Task 8-A has no checkpoint; no commit, tag, or push has been performed for any Phase 8 task. No Phase 8 backend checkpoint has been reached. **No Task 8-B implementation has been performed.** **No Task 8-C implementation has been performed.** **No Task 8-D implementation has been performed.** Task 8-B's authorized modification boundary now includes narrowly-scoped `database.js` additions in addition to `server.js` (v1.1.7 governance correction); this is a documentation change only and does not itself authorize Task 8-B implementation.

5. **No Phase 10 work has been performed.**

6. **This document STOPS HERE and awaits human review and explicit implementation authorization.**

---

*Document: `phase8_plan_1_4.md` v1.1.7*
*Initial planning session: 2026-09-08 (v1.0.0)*
*First correction session: 2026-09-09 (v1.1.0)*
*Second correction session: 2026-09-09 (v1.1.1)*
*Third correction session: 2026-09-09 (v1.1.2)*
*Fourth correction session: 2026-09-09 (v1.1.3)*
*Fifth correction session (governance/documentation): 2026-09-10 (v1.1.4)*
*Sixth correction session (state/documentation): 2026-09-10 (v1.1.5)*
*Seventh correction session (schema/AC documentation): 2026-09-10 (v1.1.6)*
*Eighth correction session (Task 8-B file-boundary governance): 2026-09-10 (v1.1.7)*
*Baseline: `phase-7-capacitor-checkpoint-1` / `e116e8f300aec9774a15f2f9e9a6cb9aaa60180e`*
*Status: PROPOSED — AWAITING HUMAN REVIEW AND EXPLICIT IMPLEMENTATION AUTHORIZATION*
