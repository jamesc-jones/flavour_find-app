# Flavour Find — SaaS Transformation Roadmap

**Solo Developer Guide | Practical, Phased, Profitable**

---

## Part 1 — Codebase Analysis

### What You Have

The current app is a clean, minimal proof-of-concept:

| Layer | Technology | Notes |
|---|---|---|
| Backend | Node.js + Express | 3 read-only API routes, no auth, no middleware |
| Database | SQLite (better-sqlite3) | Synchronous, file-based, single process only |
| Frontend | Vanilla JS + HTML | No framework, Tailwind via CDN |
| Data | Hardcoded JS object | ~980 lines in database.js, seed-once pattern |
| Dev tooling | None | No linter, no tests, no watch mode, no build step |

### Technical Debt & Bottlenecks

**Critical issues for production:**

1. **Hardcoded API base** — `API_BASE = 'http://localhost:3000/api'` in `app.js` means the frontend breaks the moment you deploy anywhere. This is the single most urgent fix.

2. **SQLite is single-file and single-writer** — Fine for local dev. Under any real concurrent load, SQLite will serialize writes and cause lock contention. You cannot horizontally scale a Node process when SQLite owns the file.

3. **No authentication or sessions** — No user identity means no personalization, no saved recipes, no subscription gates. Everything the business model depends on is impossible without this.

4. **Seed data is the application** — All content lives in a hardcoded JS object. Adding a recipe requires a code change, a DB delete, and a server restart. This is not manageable at scale and impossible for non-developers.

5. **N+1 query pattern** — `getRecipesByMood()` runs one query per recipe for ingredients and one for instructions. With 10 recipes per mood × 2 = 20 queries per request. Harmless now, but this pattern breaks under load.

6. **No error boundaries in the UI** — A failed fetch produces `alert()`. No loading states, no retry logic, no graceful degradation.

7. **No environment configuration** — `PORT` is the only env var. No secret management, no config per environment (dev/staging/prod).

8. **CORS is wide open** — `app.use(cors())` allows all origins. This is fine for local dev, dangerous in production.

9. **No rate limiting or validation** — The `:mood` route parameter is passed directly to a DB query with no validation. Low risk now, significant risk once the DB handles user data.

10. **No logging** — No structured logs, no request tracing, no error reporting.

### Production Readiness Score: 2/10

The app is a solid prototype. It is not production-ready. The good news: the architecture is simple enough that modernizing it is fast.

---

## Part 2 — Competitive Analysis

### The Landscape in 2026

**Yummly** (acquired by Whirlpool, shut down Dec 2024) — Was the category leader at $3.99/month. Its shutdown creates a real gap in the personalized recipe recommendation market.

**Mealime** — Free tier covers weekly meal plans, dietary filters, and grocery list generation. Strong UX benchmark. Weakness: no AI conversation layer, no mood/emotion dimension.

**Whisk** (Samsung) — Acquired, now baked into Samsung smart devices. Effectively off-limits as a standalone competitor.

**DishGen / Plant Jammer / ChatGPT** — AI recipe generation players. Strong at generating novel recipes on demand but weak on curation, personalization history, and mood-driven UX.

**FoodiePrep, Nutrola** — Newer entrants in 2025–2026 with AI meal planning. Focused on nutrition and calories, not emotional context.

### Market Numbers

- AI-driven meal planning apps market: **$1.03B in 2026**, growing at **24.6% CAGR**
- Projected to reach **$2.45B by 2030**
- Yummly's shutdown leaves a meaningful share of ~5M MAU looking for alternatives

### What Competitors Are Missing

| Gap | Opportunity for Flavour Find |
|---|---|
| No mood/emotion-based entry point | Your core concept. Unique positioning. |
| Rigid meal planners (pick a diet, follow it) | Fluid, how-do-I-feel-today flow |
| No conversational AI layer on recipe apps | Claude-powered food assistant |
| Complex onboarding | Flavour Find can be zero-friction (pick a mood, get a recipe) |
| No emotional connection to food | "Food as self-care" is an underserved angle |

### Differentiation Opportunity

Flavour Find's unique angle is **emotional intelligence + food**. No major player owns this space. The hook — "How are you feeling? Here's what to cook" — is immediately understandable, low-friction, and emotionally resonant. Layer in AI conversation, dietary preferences, and a weekly planner and you have a defensible niche.

---

## Part 3 — SaaS Transformation Roadmap

---

### Phase 1 — Modernization (Week 1–2)

**Goal:** Make the app deployable and maintainable without changing any features.

#### 1.1 Fix the hardcoded API base

In `public/app.js`, replace:

```js
const API_BASE = 'http://localhost:3000/api';
```

With:

```js
const API_BASE = '/api';
```

Using a relative path means the frontend works on any domain — localhost, staging, production — with zero config. This is the highest-ROI single-line change in the project.

#### 1.2 Add environment configuration

Install `dotenv`:

```bash
npm install dotenv
```

Create `.env`:

```
PORT=3000
NODE_ENV=development
DATABASE_URL=./recipes.db
CORS_ORIGIN=http://localhost:3000
```

Add to `.gitignore`:

```
.env
*.db
node_modules/
```

At the top of `server.js`:

```js
require('dotenv').config();
```

Update CORS to read from env:

```js
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));
```

#### 1.3 Add proper project structure

```
flavour-find/
├── src/
│   ├── routes/
│   │   └── recipes.js       # move API routes here
│   ├── db/
│   │   ├── index.js         # DB connection (was database.js)
│   │   ├── queries.js       # getMoods, getRecipes, etc.
│   │   └── seed.js          # seed data in its own file
│   └── middleware/
│       └── validate.js      # input validation
├── public/
│   ├── index.html
│   └── app.js
├── server.js                # app entrypoint, thin
├── .env
├── .env.example
└── package.json
```

#### 1.4 Fix the N+1 query pattern

Replace the current `getRecipesByMood` with a single JOIN query:

```js
function getRecipesByMood(moodName) {
  const rows = db.prepare(`
    SELECT 
      r.id, r.name, r.emoji, r.description,
      i.ingredient, i.order_index,
      ins.instruction, ins.step_number
    FROM recipes r
    JOIN moods m ON r.mood_id = m.id
    LEFT JOIN ingredients i ON i.recipe_id = r.id
    LEFT JOIN instructions ins ON ins.recipe_id = r.id
    WHERE m.name = ?
    ORDER BY r.id, i.order_index, ins.step_number
  `).all(moodName);

  // group rows into recipe objects
  return groupRecipeRows(rows);
}
```

#### 1.5 Add input validation

```js
const VALID_MOODS = ['happy','sad','stressed','energetic','cozy','adventurous','romantic','lazy'];

function validateMood(req, res, next) {
  if (!VALID_MOODS.includes(req.params.mood)) {
    return res.status(400).json({ error: 'Invalid mood' });
  }
  next();
}
```

#### 1.6 Add nodemon for development

```bash
npm install --save-dev nodemon
```

Add to `package.json`:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

**Verification checklist:**
- [ ] `npm run dev` starts the server with auto-reload
- [ ] App works at `http://localhost:3000` with no CORS errors
- [ ] Mood buttons render recipes correctly
- [ ] Invalid mood URL returns 400, not 500

---

### Phase 2 — UX/UI Upgrade (Week 3–4)

**Goal:** Turn a prototype into something users enjoy and trust.

#### Recommended Frontend Stack

For a solo developer, the best path is **Next.js** (React framework). Reasons:
- File-based routing maps cleanly to your current page structure
- API routes let you keep backend logic co-located for now
- Built-in image optimization, SEO meta tags
- Vercel deploys it for free at a CDN edge
- Tailwind works natively

If React feels too heavy right now, **keep vanilla JS** but modularize it with ES modules and add a proper build step (Vite, ~5 min setup). Don't rewrite what isn't broken.

#### UX Improvements (applicable to either stack)

**Loading states** — Replace the absent loading feedback with a skeleton card while recipes fetch:

```js
function showLoading() {
  recipeDisplay.innerHTML = `
    <div class="animate-pulse space-y-4">
      <div class="h-8 bg-gray-200 rounded w-3/4"></div>
      <div class="h-48 bg-gray-200 rounded"></div>
      <div class="h-4 bg-gray-200 rounded"></div>
      <div class="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  `;
  recipeDisplay.classList.remove('hidden');
}
```

**Toast notifications** instead of `alert()`.

**Recipe card improvements:**
- Add cook time, difficulty level, serving size to the data model
- Add a "Save this recipe" button (disabled with tooltip if not logged in)
- Add a share button (native Web Share API)

**Mobile-first design audit:**
- Current grid: `grid-cols-2 md:grid-cols-4` — good start
- Add `touch-action: manipulation` to mood buttons for snappier tap response
- Minimum tap target size: 48x48px (current buttons are fine, verify on real device)

**Mood expansion:**
- Add more granular moods: Nostalgic, Celebratory, Post-workout, Under the weather, Indulgent
- Consider a mood slider or multi-select ("I'm feeling cozy AND lazy")

**Design system:**
- Extract the purple/pink gradient into CSS variables
- Create a consistent card component style
- Add a brand logo / wordmark for "Flavour Find"
- Consider a food-photography image per recipe (Unsplash API, free)

**Verification checklist:**
- [ ] Loading state appears during fetch
- [ ] No `alert()` calls remain
- [ ] App is usable on a 375px mobile viewport
- [ ] Page score ≥ 90 on Lighthouse performance

---

### Phase 3 — Core Product Features (Week 5–8)

**Goal:** Build the features that turn a tool into a product people return to.

#### 3.1 User Accounts & Authentication

Use **Clerk** (free up to 10K MAU, excellent DX) or **Auth.js** (open source, self-hosted).

Clerk is the faster path:

```bash
npm install @clerk/clerk-sdk-node
```

This gives you: sign up/in with email or Google, session management, user ID for all downstream features, a pre-built UI, and a dashboard to manage users.

Add to `server.js`:

```js
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');
app.use(ClerkExpressWithAuth());
```

Now every request has `req.auth.userId` available.

#### 3.2 Saved / Favourite Recipes

Add a `user_saved_recipes` table:

```sql
CREATE TABLE user_saved_recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  recipe_id INTEGER NOT NULL,
  saved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, recipe_id),
  FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);
```

New API routes:

```
POST   /api/user/saved          — save a recipe
DELETE /api/user/saved/:id      — unsave
GET    /api/user/saved          — list saved recipes
```

#### 3.3 Personalized Recommendations

Track mood history:

```sql
CREATE TABLE mood_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  mood TEXT NOT NULL,
  recipe_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

Use this to: avoid showing the same recipe twice in a row, surface "your top mood this week was Cozy — here's a new recipe", weight recommendations toward moods the user engages with most.

#### 3.4 Weekly Meal Planner

```sql
CREATE TABLE meal_plan (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  recipe_id INTEGER NOT NULL,
  planned_date DATE NOT NULL,
  meal_slot TEXT CHECK(meal_slot IN ('breakfast','lunch','dinner','snack')),
  FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);
```

UI: a 7-day calendar grid. Drag recipes onto days. Export as a shareable link.

#### 3.5 Grocery List Generation

From a meal plan, aggregate all ingredients across all planned recipes, deduplicate and merge quantities, and present a categorized shopping list (Produce, Dairy, Pantry, etc.).

```
GET /api/user/grocery-list?week=2026-08-04
```

Response:

```json
{
  "produce": ["2 cups cherry tomatoes", "1 bunch basil"],
  "dairy": ["8 oz fresh mozzarella"],
  "pantry": ["3 tbsp olive oil", "1 tbsp balsamic vinegar"]
}
```

**Verification checklist:**
- [ ] User can sign up, sign in, sign out
- [ ] Saved recipes persist across sessions
- [ ] Meal planner saves correctly
- [ ] Grocery list aggregates from plan without duplicates

---

### Phase 4 — AI Assistant Integration (Week 9–11)

**Goal:** Add a Claude-powered food assistant that turns the app from a recipe browser into a personal food companion.

#### Architecture Overview

```
Browser
  │
  │  POST /api/chat  { messages: [...], userId, context: { mood, savedRecipes } }
  │
  ▼
Express Server (server.js)
  │
  ├── Auth middleware (verify Clerk session)
  ├── Rate limit middleware (per userId)
  │
  ▼
Chat Route Handler (src/routes/chat.js)
  │
  ├── Load user context from DB (preferences, saved recipes, mood history)
  ├── Build system prompt
  │
  ▼
Anthropic SDK  →  Claude API
  │
  ◄── Stream tokens back to browser
```

#### 4.1 Install the Anthropic SDK

```bash
npm install @anthropic-ai/sdk
```

Add to `.env`:

```
ANTHROPIC_API_KEY=sk-ant-...
AI_CHAT_DAILY_LIMIT=20
```

#### 4.2 Chat API endpoint

Create `src/routes/chat.js`:

```js
const Anthropic = require('@anthropic-ai/sdk');
const client = new Anthropic();

const SYSTEM_PROMPT = `You are Flavour, a warm and knowledgeable personal food assistant for the Flavour Find app.

Your personality:
- Friendly, encouraging, never judgmental about food choices
- Knowledgeable about global cuisines, cooking techniques, nutrition
- Brief and practical — users want to cook, not read essays
- You remember context within the conversation

Your capabilities:
- Recommend recipes based on mood, time available, dietary needs, and ingredients on hand
- Explain cooking techniques in plain language
- Suggest ingredient substitutions
- Help with meal planning and grocery lists
- Answer food-related questions

User context (injected per request):
- Current mood: {mood}
- Dietary restrictions: {restrictions}
- Recently viewed recipes: {recentRecipes}
- Saved recipe count: {savedCount}

Rules:
- Keep responses under 200 words unless the user asks for a full recipe
- Always end recipe suggestions with "Want me to add this to your meal plan?"
- If the user asks for something outside food/cooking, gently redirect: "I'm best with food questions — want a recipe suggestion?"
- Never make up nutritional values. If you don't know, say so.`;

router.post('/', requireAuth, rateLimitChat, async (req, res) => {
  const { messages, context } = req.body;

  const systemPrompt = SYSTEM_PROMPT
    .replace('{mood}', context.mood || 'not specified')
    .replace('{restrictions}', context.restrictions?.join(', ') || 'none')
    .replace('{recentRecipes}', context.recentRecipes?.join(', ') || 'none')
    .replace('{savedCount}', context.savedCount || 0);

  // Stream the response
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');

  const stream = await client.messages.stream({
    model: 'claude-haiku-4-5-20251001',    // fast + cheap for chat
    max_tokens: 400,
    system: systemPrompt,
    messages: messages.slice(-10),          // keep last 10 messages for context window efficiency
  });

  for await (const chunk of stream) {
    if (chunk.type === 'content_block_delta') {
      res.write(`data: ${JSON.stringify({ delta: chunk.delta.text })}\n\n`);
    }
  }

  res.write('data: [DONE]\n\n');
  res.end();
});
```

#### 4.3 Rate limiting chat (per user)

Use `express-rate-limit` with a Redis store (or in-memory for MVP):

```bash
npm install express-rate-limit
```

```js
const rateLimit = require('express-rate-limit');

const chatRateLimit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,  // 24 hours
  max: parseInt(process.env.AI_CHAT_DAILY_LIMIT) || 20,
  keyGenerator: (req) => req.auth.userId,
  message: { error: 'Daily AI chat limit reached. Upgrade to Premium for unlimited access.' }
});
```

#### 4.4 Frontend chat widget

Add to `public/index.html` (or your React component):

```html
<!-- Chat bubble button -->
<button id="chat-toggle" class="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-xl flex items-center justify-center text-white text-2xl z-50">
  💬
</button>

<!-- Chat panel -->
<div id="chat-panel" class="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col hidden z-50">
  <div class="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-t-2xl flex items-center gap-2">
    <span class="text-xl">🍳</span>
    <div>
      <p class="font-semibold">Flavour</p>
      <p class="text-xs opacity-80">Your personal food assistant</p>
    </div>
  </div>
  <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-3"></div>
  <div class="p-3 border-t flex gap-2">
    <input id="chat-input" type="text" placeholder="Ask me anything about food..." 
      class="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
    <button id="chat-send" class="bg-purple-500 text-white px-3 py-2 rounded-lg text-sm font-semibold">→</button>
  </div>
</div>
```

#### 4.5 Model selection rationale

| Use case | Model | Reason |
|---|---|---|
| Chat assistant | claude-haiku-4-5 | Fast, cheap, ~$0.00025 per message. Fine for conversational flow. |
| Recipe generation | claude-sonnet-5 | Better reasoning for complex recipes, substitutions, dietary constraints |
| Admin tasks | claude-opus-5 | Only if you build a content management layer |

**Example prompts to test:**

- "I'm feeling stressed and have chicken and pasta. What can I make in 20 minutes?"
- "What's a good substitute for eggs in baking?"
- "Add tonight's dinner to my meal plan for Thursday"
- "I'm vegetarian and adventurous — surprise me"

**Verification checklist:**
- [ ] Chat bubble appears on the page
- [ ] Messages stream in real time (not batch)
- [ ] System prompt context (mood, restrictions) is injected correctly
- [ ] Rate limit kicks in after the configured daily limit
- [ ] Rate limit error is user-friendly, not a raw 429

---

### Phase 5 — Monetization Strategy (Week 12)

**Goal:** Generate revenue without alienating your early user base.

#### Recommended Model: Freemium + Subscription

This is the right starting point for a solo developer. Ads are a distraction until you have 50K+ MAU. Affiliate works from day one.

#### Tier Structure

**Free tier** — generous enough to acquire users, limited enough to create upgrade pressure:
- Unlimited mood-based recipe browsing
- Up to 5 saved recipes
- Basic meal plan (3 days)
- 10 AI chat messages per day
- No grocery list export
- Ads shown (optional, add later)

**Premium — $4.99/month or $39.99/year:**
- Unlimited saved recipes
- Full 7-day meal planner
- Grocery list generation & export
- Unlimited AI chat
- Dietary preference profiles (vegan, gluten-free, etc.)
- Recipe collections / folders
- Ad-free

**Premium+** (future, once you have traction) **— $9.99/month:**
- Everything in Premium
- AI-generated custom recipes (not just curated)
- Nutritional analysis
- Family meal planning (multiple profiles)
- Priority AI response speed

#### Payment Infrastructure

Use **Stripe** with `stripe-js` on the frontend and `stripe` npm package on the backend. Stripe's customer portal handles plan changes, cancellations, and receipts — you don't build any of that.

```bash
npm install stripe
```

Add webhook handler for `customer.subscription.updated` and `customer.subscription.deleted` to update the user's tier in your DB.

#### Affiliate Revenue (Day 1 viable)

These work without any user count threshold:

- **Amazon Associates** — Link ingredients in recipes to Amazon Fresh / Pantry. 3–8% commission. Easy to implement: append `?tag=yourtag-20` to Amazon product URLs.
- **Instacart Affiliate** — Direct grocery delivery integration. Users click "Order these ingredients" → you earn per conversion.
- **ShareASale / Rakuten** — Cookware brands (Le Creuset, Lodge, etc.) pay 5–15% for kitchen equipment referrals.
- **Spoonacular API / Kroger API** — Some grocery APIs have affiliate programs built in.

Implementation: add an `affiliate_links` field to each ingredient in the recipe data model. Populate it for common ingredients. Show a subtle "Buy on Amazon" link next to each ingredient.

#### Revenue Projections (Conservative)

| Metric | Month 3 | Month 6 | Month 12 |
|---|---|---|---|
| MAU | 500 | 2,000 | 8,000 |
| Premium conversion (3%) | 15 | 60 | 240 |
| Subscription MRR | $75 | $300 | $1,200 |
| Affiliate (est.) | $20 | $100 | $400 |
| **Total MRR** | **$95** | **$400** | **$1,600** |

These numbers are deliberately conservative. The AI-driven meal planning market is growing at 24.6% CAGR. A well-executed niche product can outperform significantly.

---

### Phase 6 — Deployment & Scaling (Week 13–16)

**Goal:** Move from "runs on my laptop" to "runs reliably in the cloud."

#### 6.1 Migrate from SQLite to PostgreSQL

**Why:** SQLite is single-writer, single-file, not network-accessible. You cannot run multiple server instances, use a hosted DB service, or scale horizontally with SQLite.

**When:** Do this migration *before* you have real user data. It is much harder after.

Install the PostgreSQL driver:

```bash
npm install pg
```

Recreate your schema in PostgreSQL (the SQL is almost identical — `AUTOINCREMENT` becomes `SERIAL`, `TEXT` is fine). Use **Neon** (free serverless PostgreSQL) or **Supabase** (free tier, adds a REST API and Auth layer for free).

Update `.env`:

```
DATABASE_URL=postgresql://user:password@host:5432/flavourfind
```

Update your DB module to use `pg` instead of `better-sqlite3`. Note that `pg` is async — you'll need to await queries or use `pg`'s callback API.

#### 6.2 Dockerize

Create `Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

Create `docker-compose.yml` for local development:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file: .env
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: flavourfind
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  pgdata:
```

#### 6.3 Environment Variables for Production

Production `.env` additions:

```
NODE_ENV=production
DATABASE_URL=postgresql://...
ANTHROPIC_API_KEY=sk-ant-...
CLERK_SECRET_KEY=sk_live_...
CLERK_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
CORS_ORIGIN=https://flavourfind.com
```

Never commit these to git. Use your hosting provider's environment variable dashboard.

#### 6.4 Cloud Deployment

**Recommended: DigitalOcean App Platform** (best for solo developer, simple pricing)

1. Connect your GitHub repo
2. Set env vars in the dashboard
3. DigitalOcean detects Node, builds and deploys automatically
4. Add a managed PostgreSQL database ($15/month)
5. Point your domain and enable the free SSL cert

**Monthly cost estimate:**

| Service | Cost |
|---|---|
| DigitalOcean App (basic) | $5/month |
| Managed PostgreSQL | $15/month |
| Anthropic API (at 1K chats/day) | ~$7/month |
| Clerk (free up to 10K MAU) | $0 |
| Stripe (2.9% + 30¢ per transaction) | Revenue share |
| **Total** | **~$27/month** |

**Vercel alternative:** If you migrate to Next.js, Vercel is free for the frontend and you only pay for the DB and API. This can cut costs to ~$17/month early on.

#### 6.5 Monitoring

Add these before you go live — both free tiers are sufficient for early stage:

```bash
npm install pino pino-http        # structured logging
```

- **Sentry** (free tier) — catches unhandled errors, sends you an email when your app crashes
- **UptimeRobot** (free) — pings your URL every 5 minutes and alerts you if it goes down
- **Posthog** (free up to 1M events) — product analytics: which moods are most popular, where users drop off

---

## Part 4 — Claude CLI Execution Plan

This section gives you exact Claude prompts to implement each phase. Use Claude in Cowork or Claude CLI for code generation.

---

### Step 1 — Fix the API base (10 minutes)

**Prompt to give Claude:**
> "In public/app.js, the API_BASE is hardcoded to `http://localhost:3000/api`. Change it to use a relative path `/api` so the frontend works on any domain. Show me the before and after."

**Expected output:** A one-line change in `app.js`.

**Files to modify:** `public/app.js`

**Verify:** Open the browser console. There should be no CORS errors when fetching from `/api/moods`.

---

### Step 2 — Add dotenv and clean up config (20 minutes)

**Prompt:**
> "Add dotenv to this Express app. Create a .env file with PORT, NODE_ENV, DATABASE_URL, and CORS_ORIGIN. Update server.js to load dotenv and use process.env for PORT and CORS. Update .gitignore to exclude .env and *.db. Create a .env.example file with placeholder values."

**Files to create/modify:** `.env`, `.env.example`, `.gitignore`, `server.js`

**Verify:** `npm run dev` starts with no errors. Changing PORT in `.env` changes the server port.

---

### Step 3 — Add nodemon and project structure (30 minutes)

**Prompt:**
> "Refactor this Express app to have a proper folder structure: src/routes/recipes.js for the API routes, src/db/queries.js for the database query functions, src/db/seed.js for the seed data, and src/middleware/validate.js for the mood validation middleware. Keep server.js as a thin entry point. Show me all the files to create and modify."

**Files to create:** `src/routes/recipes.js`, `src/db/queries.js`, `src/db/seed.js`, `src/middleware/validate.js`
**Files to modify:** `server.js`, `database.js`

**Verify:** All three API routes still return correct JSON after the refactor.

---

### Step 4 — Fix N+1 queries (20 minutes)

**Prompt:**
> "The getRecipesByMood function in database.js runs N+1 queries (one per recipe for ingredients + one for instructions). Rewrite it to use a single JOIN query that fetches all data at once, then groups the rows into recipe objects in JavaScript. Use better-sqlite3 syntax."

**Files to modify:** `src/db/queries.js`

**Verify:** `GET /api/recipes/happy` returns the same data as before. Check the SQLite query count with `db.prepare().run()` wrapped in a counter.

---

### Step 5 — Add user authentication with Clerk (1–2 hours)

**Prompt:**
> "Add Clerk authentication to this Express.js app. Install @clerk/clerk-sdk-node. Add a requireAuth middleware that validates the Clerk session token from the Authorization header. Add two routes: POST /api/user/saved (save a recipe) and GET /api/user/saved (list saved recipes). Create the user_saved_recipes SQLite table if it doesn't exist. Use the userId from req.auth for all user-scoped queries."

**Files to create/modify:** `src/middleware/auth.js`, `src/routes/user.js`, `src/db/queries.js`, `server.js`

**Verify:** Unauthenticated requests to `/api/user/saved` return 401. Authenticated requests return an empty array.

---

### Step 6 — Add the AI chat endpoint (2–3 hours)

**Prompt:**
> "Add a POST /api/chat endpoint to this Express app using the Anthropic SDK. The endpoint should: require authentication via Clerk, stream the response using Server-Sent Events, use this system prompt: [paste the system prompt from Phase 4], accept { messages, context } in the request body, inject context (mood, restrictions, recentRecipes) into the system prompt, and limit each user to 20 requests per day using express-rate-limit with the userId as the key."

**Files to create:** `src/routes/chat.js`
**Files to modify:** `server.js`, `.env`

**Verify:** Send a POST to `/api/chat` with a valid Clerk token. You should see tokens streaming in the response. After 20 requests, you should get a 429.

---

### Step 7 — Add the chat UI widget (2 hours)

**Prompt:**
> "Add a floating chat widget to public/index.html. The widget should have: a purple/pink gradient header showing 'Flavour' and a chef emoji, a scrollable message area, a text input and send button, message bubbles (user messages right-aligned, assistant messages left-aligned), streaming text display using EventSource or fetch with ReadableStream, and the ability to pass the current mood as context. Show me the complete HTML and JavaScript for this widget."

**Files to modify:** `public/index.html`, `public/app.js`

**Verify:** The chat bubble appears in the bottom right. Sending a message shows a streaming response. The user's message appears in the chat history.

---

### Step 8 — Add Stripe subscriptions (3–4 hours)

**Prompt:**
> "Add Stripe subscription payments to this Express app. Create: a POST /api/billing/checkout route that creates a Stripe Checkout session for the Premium plan ($4.99/month), a POST /api/billing/portal route that creates a Stripe Customer Portal session, a POST /api/billing/webhook route that handles customer.subscription.created and customer.subscription.deleted events and updates the user's tier in the database. Add a user_subscriptions table to the DB. Use the Stripe Node SDK."

**Files to create:** `src/routes/billing.js`
**Files to modify:** `src/db/queries.js`, `server.js`, `.env`

**Verify:** Clicking "Upgrade" redirects to Stripe Checkout. After test payment, the webhook fires and updates the DB. The customer portal loads correctly.

---

### Step 9 — Migrate to PostgreSQL (2–3 hours)

**Prompt:**
> "Migrate this app from better-sqlite3 to PostgreSQL using the pg npm package. The app has these tables: moods, recipes, ingredients, instructions, user_saved_recipes, mood_history, meal_plan, user_subscriptions. Rewrite all queries to use pg's async/await pattern with parameterized queries. Replace the synchronous better-sqlite3 patterns with async functions. Add a DATABASE_URL env var."

**Files to modify:** `src/db/index.js`, `src/db/queries.js`

**Verify:** All API routes return correct data. Check with a PostgreSQL client (TablePlus or psql) that data was seeded correctly.

---

### Step 10 — Dockerize (30 minutes)

**Prompt:**
> "Create a Dockerfile and docker-compose.yml for this Node.js + PostgreSQL app. The Dockerfile should use node:20-alpine, copy only production dependencies, and expose port 3000. The docker-compose should define an app service and a postgres:15-alpine db service with a named volume. Add a health check to the app service."

**Files to create:** `Dockerfile`, `docker-compose.yml`, `.dockerignore`

**Verify:** `docker-compose up --build` starts both services. The app connects to the containerized PostgreSQL. `http://localhost:3000` loads the app.

---

## Part 5 — Final Roadmap Summary

### Prioritized Execution Order

| Priority | Task | Time | Impact |
|---|---|---|---|
| 🔴 P0 | Fix hardcoded API_BASE | 10 min | Unblocks deployment |
| 🔴 P0 | Add dotenv + env config | 20 min | Unblocks security |
| 🟠 P1 | Refactor project structure | 30 min | Maintainability |
| 🟠 P1 | Add nodemon + dev DX | 10 min | Developer sanity |
| 🟠 P1 | Fix N+1 queries | 20 min | Performance |
| 🟠 P1 | Add input validation | 20 min | Security |
| 🟡 P2 | Add user auth (Clerk) | 2 hrs | Enables all user features |
| 🟡 P2 | Saved recipes | 1 hr | Core retention feature |
| 🟡 P2 | UI polish + loading states | 2 hrs | UX credibility |
| 🟡 P2 | Meal planner | 3 hrs | Premium feature anchor |
| 🟢 P3 | Claude AI chat endpoint | 3 hrs | Differentiation |
| 🟢 P3 | Chat UI widget | 2 hrs | User-facing AI |
| 🟢 P3 | Stripe subscriptions | 4 hrs | Revenue |
| 🟢 P3 | Grocery list generation | 2 hrs | Premium value |
| 🔵 P4 | PostgreSQL migration | 3 hrs | Scale readiness |
| 🔵 P4 | Dockerize | 30 min | Deployment |
| 🔵 P4 | Deploy to DigitalOcean | 1 hr | Launch |
| 🔵 P4 | Monitoring (Sentry, Posthog) | 1 hr | Operational visibility |

### Total Estimated Time

- **Weeks 1–2** (Phase 1, Modernization): ~4 hours of actual coding
- **Weeks 3–4** (Phase 2, UX): ~8 hours
- **Weeks 5–8** (Phase 3, Core features): ~15 hours
- **Weeks 9–11** (Phase 4, AI): ~10 hours
- **Week 12** (Phase 5, Monetization): ~6 hours
- **Weeks 13–16** (Phase 6, Deployment): ~6 hours

**Total: ~50 hours of focused work to a launchable SaaS product.**

For a solo developer working evenings and weekends, this is a realistic 3–4 month build.

### What Makes Flavour Find Winnable

1. **The mood-first UX is unique.** No competitor owns this angle. It's intuitive, emotionally resonant, and shareable ("I'm feeling lazy — Flavour Find gave me the perfect recipe" is a natural tweet).

2. **The market has a gap.** Yummly is gone. Its users (~5M MAU) are looking for alternatives. A well-designed mood-based recommendation app could capture a meaningful slice.

3. **The AI layer is a genuine differentiator.** Most recipe apps added ChatGPT as an afterthought. Building the AI assistant as a core interaction model — not a bolted-on chatbot — creates a meaningfully different product.

4. **The cost structure is manageable.** ~$27/month to run. Break-even is 6 Premium subscribers. Everything above that is margin.

5. **The stack is right.** Node.js + Express + PostgreSQL + Claude is a proven, hireable, scalable stack. You won't need to rewrite when you grow.

---

*Last updated: August 2026*
*Generated for the Flavour Find project — flavour-find-app*

---

## Appendix C — Corrected Phase Definitions (Post-Review Updates)

The following phases supersede the equivalent sections elsewhere in this document. They incorporate all findings from the final architecture review: critical security fix (Stripe webhook), /chat scope split, mobile strategy lock-in (Capacitor), and Caddy-based deployment.

---

### Phase 1 — Foundation & Environment Setup (UPDATED)

**Tooling decisions (locked before first commit):**

- **Monorepo:** Turborepo + npm workspaces
- **ORM:** Prisma (TypeScript-first, auto-generates typed client from schema)
- **Structure:**

```
flavourfind/
├── apps/
│   ├── api/        # Express + TypeScript
│   └── web/        # Next.js (output: 'export' — required for Capacitor)
├── packages/
│   ├── db/         # Prisma schema + generated client
│   └── shared/     # Zod schemas, types shared by api + web
├── turbo.json
└── package.json
```

**Standard Phase 1 tasks:**
- Configure TypeScript (`tsconfig.base.json` shared across packages)
- ESLint + Prettier at the root
- `.env` + `.env.example` with all required keys
- PostgreSQL connection via Neon (DATABASE_URL in .env)
- `npm run dev` starts both api and web via Turborepo

---

#### 1.7 — Early Infrastructure Validation (end of Phase 1)

**Goal:** Run the full production deployment pipeline once against a skeleton app. Discover infrastructure problems now, not in Phase 10.

**Minimal Express health endpoint:**

```ts
// apps/api/src/server.ts (skeleton — no routes yet)
app.get('/health', (_req, res) => res.json({ status: 'ok', ts: Date.now() }));
```

**Dockerfile (apps/api/Dockerfile):**

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

**Caddyfile (root — production SSL, zero configuration):**

```
flavourfind.com {
    reverse_proxy /api/*  api:3000
    reverse_proxy /*      web:3000
}

www.flavourfind.com {
    redir https://flavourfind.com{uri} permanent
}
```

**docker-compose.prod.yml (root — skeleton, extended in Phase 10):**

```yaml
services:
  api:
    image: ghcr.io/${GITHUB_REPOSITORY}/api:latest
    env_file: .env.prod
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s

  caddy:
    image: caddy:2-alpine
    ports: ["80:80", "443:443", "443:443/udp"]
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy_data:/data
      - caddy_config:/config
    restart: unless-stopped

volumes:
  caddy_data:
  caddy_config:
```

**GitHub Actions — deploy.yml (run once to validate):**

```yaml
name: Build and Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Login to GHCR
        run: echo ${{ secrets.GITHUB_TOKEN }} | docker login ghcr.io -u ${{ github.actor }} --password-stdin

      - name: Build and push API image
        run: |
          docker build -t ghcr.io/${{ github.repository }}/api:latest ./apps/api
          docker push ghcr.io/${{ github.repository }}/api:latest

      - name: Deploy to Droplet
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.DROPLET_IP }}
          username: ${{ secrets.DROPLET_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /opt/flavourfind
            docker compose pull
            docker compose up -d --remove-orphans
            docker system prune -f

      - name: Verify health endpoint
        run: sleep 10 && curl -f https://flavourfind.com/health || exit 1
```

**GitHub Actions secrets required:** `DROPLET_IP`, `DROPLET_USER`, `SSH_PRIVATE_KEY`

**One-time Droplet setup (run manually after provisioning a $6/month Basic Droplet):**

```bash
apt update && apt install -y docker.io docker-compose-plugin curl
mkdir -p /opt/flavourfind
# scp Caddyfile docker-compose.prod.yml .env.prod to /opt/flavourfind
```

**Phase 1 completion criteria (including infrastructure):**
- [ ] `npm run dev` starts both api and web via Turborepo
- [ ] `https://flavourfind.com/health` returns `{ "status": "ok" }` in production
- [ ] Caddy provisioned the Let's Encrypt SSL certificate automatically
- [ ] HTTP redirects to HTTPS; www redirects to apex domain
- [ ] GitHub Actions pipeline passes end-to-end on push to main
- [ ] Infrastructure is proven — all subsequent phases deploy via the same pipeline

---

### Phase 4 — Core API Development (CORRECTED SCOPE)

**Scope boundary:**

```
Phase 4: /chat route scaffold + auth middleware + Zod validation only
Phase 5: Anthropic SDK + SSE streaming + token tracking + rate limiting
```

The `/chat` endpoint is created here as a typed, validated, authenticated stub. The Anthropic SDK does not exist yet and must NOT be referenced in Phase 4 code.

#### /chat — stub implementation

```ts
// apps/api/src/routes/chat.ts
import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth';
import { db } from '../db';

const router = Router();

export const chatSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().min(1).max(2000)
  })).min(1).max(10),
  context: z.object({
    mood: z.string().optional(),
    restrictions: z.array(z.string()).optional()
  }).optional()
});

router.post('/', requireAuth, async (req: Request, res: Response) => {
  const parsed = chatSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: parsed.error.flatten() });
  }

  // Log attempt — tokens and cost filled in by Phase 5
  await db.query(
    `INSERT INTO chat_usage (user_id, model, tokens_in, tokens_out, cost_usd)
     VALUES ($1, 'pending', 0, 0, 0)`,
    [req.auth!.userId]
  );

  // Explicit 501: tells the caller AI is not yet integrated (not a 500 crash)
  return res.status(501).json({ ok: false, error: 'AI integration pending (Phase 5)' });
});

export default router;
```

**Phase 4 /chat completion criteria:**
- [ ] `POST /api/v1/chat` returns 401 without a valid Bearer token
- [ ] Invalid request body returns 400 with structured Zod error detail
- [ ] Valid authenticated request returns 501 (explicit stub — not 500)
- [ ] A `chat_usage` row is inserted with `model = 'pending'` on every valid call
- [ ] `chatSchema` is exported from `packages/shared` so the web client reuses it

**All other Phase 4 routes (unchanged in scope):**
- `GET  /api/v1/recipes/moods`
- `GET  /api/v1/recipes/:mood`
- `GET  /api/v1/recipes/:mood/random`
- `GET  /api/v1/user/saved`
- `POST /api/v1/user/saved`
- `DELETE /api/v1/user/saved/:id`
- `GET  /api/v1/user/preferences`
- `PUT  /api/v1/user/preferences`
- `GET  /api/v1/user/meal-plan`
- `POST /api/v1/user/meal-plan`
- `GET  /api/v1/user/grocery-list`
- `DELETE /api/v1/user` (GDPR — required for Play Store)

---

### Phase 5 — AI Integration (COMPLETE IMPLEMENTATION)

Phase 5 replaces the Phase 4 stub entirely. The route file is rewritten — do not extend the stub, replace it.

#### 5.1 Install the Anthropic SDK

```bash
cd apps/api
npm install @anthropic-ai/sdk
```

Add to `.env`:

```
ANTHROPIC_API_KEY=sk-ant-...
AI_CHAT_LIMIT_FREE=20
AI_CHAT_LIMIT_PREMIUM=500
```

#### 5.2 DB-backed rate limiting and usage logging

```ts
// apps/api/src/db/chat.ts
import { db } from './index';

export async function checkChatLimit(userId: string, tier: string): Promise<boolean> {
  const limit = tier === 'premium'
    ? parseInt(process.env.AI_CHAT_LIMIT_PREMIUM ?? '500')
    : parseInt(process.env.AI_CHAT_LIMIT_FREE ?? '20');

  const result = await db.query(
    `SELECT COUNT(*) AS count FROM chat_usage
     WHERE user_id = $1 AND created_at > NOW() - INTERVAL '24 hours'`,
    [userId]
  );
  return parseInt(result.rows[0].count) < limit;
}

export async function logChatUsage(
  userId: string,
  model: string,
  tokensIn: number,
  tokensOut: number,
  costUsd: number
): Promise<void> {
  await db.query(
    `INSERT INTO chat_usage (user_id, model, tokens_in, tokens_out, cost_usd)
     VALUES ($1, $2, $3, $4, $5)`,
    [userId, model, tokensIn, tokensOut, costUsd]
  );
}

export async function getUserContext(userId: string) {
  const prefs = await db.query(
    `SELECT dietary_restrictions, cuisine_preferences FROM user_preferences WHERE user_id = $1`,
    [userId]
  );
  const history = await db.query(
    `SELECT r.name FROM mood_history mh
     JOIN recipes r ON mh.recipe_id = r.id
     WHERE mh.user_id = $1 ORDER BY mh.created_at DESC LIMIT 5`,
    [userId]
  );
  return {
    restrictions: prefs.rows[0]?.dietary_restrictions ?? [],
    recentRecipes: history.rows.map((r: any) => r.name)
  };
}
```

#### 5.3 Complete /chat implementation

```ts
// apps/api/src/routes/chat.ts  (replaces Phase 4 stub entirely)
import Anthropic from '@anthropic-ai/sdk';
import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth';
import { chatSchema } from '@flavourfind/shared';
import { checkChatLimit, logChatUsage, getUserContext } from '../db/chat';

const client = new Anthropic();
const router = Router();

const SYSTEM_PROMPT = `You are Flavour, a warm personal food assistant for the Flavour Find app.

Personality: friendly, practical, brief. Users want to cook, not read essays.
Capabilities: recipe recommendations, cooking techniques, substitutions, meal planning.
Rules:
- Responses under 200 words unless the user requests a full recipe
- Never fabricate nutritional values
- If asked about non-food topics, redirect: "I'm best with food questions — want a recipe?"

User context:
- Current mood: {mood}
- Dietary restrictions: {restrictions}
- Recently viewed: {recentRecipes}`;

const MODEL = 'claude-haiku-4-5-20251001';
const HAIKU_COST_IN  = 0.00000025;   // $ per input token
const HAIKU_COST_OUT = 0.00000125;   // $ per output token

router.post('/', requireAuth, async (req: Request, res: Response) => {
  const parsed = chatSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: parsed.error.flatten() });
  }

  const { messages, context } = parsed.data;
  const userId = req.auth!.userId;
  const tier   = req.user?.tier ?? 'free';

  // DB-backed rate limit — persists across restarts and deployments
  const allowed = await checkChatLimit(userId, tier);
  if (!allowed) {
    return res.status(429).json({
      ok: false,
      error: 'Daily AI limit reached. Upgrade to Premium for more messages.'
    });
  }

  // Load user context from DB for system prompt injection
  const userCtx = await getUserContext(userId);

  const systemPrompt = SYSTEM_PROMPT
    .replace('{mood}',         context?.mood ?? 'not specified')
    .replace('{restrictions}', userCtx.restrictions.join(', ') || 'none')
    .replace('{recentRecipes}',userCtx.recentRecipes.join(', ') || 'none');

  // SSE headers — must be set before any res.write()
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');  // Prevents Caddy from buffering the stream

  let tokensIn = 0;
  let tokensOut = 0;

  try {
    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: 400,
      system: [
        {
          type: 'text',
          text: systemPrompt,
          cache_control: { type: 'ephemeral' }  // ~90% cost reduction on system prompt tokens
        }
      ],
      messages: messages.slice(-6)   // 6 messages = cost-efficient context window
    });

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        res.write(`data: ${JSON.stringify({ delta: chunk.delta.text })}\n\n`);
      }
    }

    const final = await stream.finalMessage();
    tokensIn  = final.usage.input_tokens;
    tokensOut = final.usage.output_tokens;

  } catch (err) {
    res.write(`data: ${JSON.stringify({ error: 'AI unavailable — please try again' })}\n\n`);
  } finally {
    // Always log — even on error — so the rate limit counter stays accurate
    const costUsd = (tokensIn * HAIKU_COST_IN) + (tokensOut * HAIKU_COST_OUT);
    await logChatUsage(userId, MODEL, tokensIn, tokensOut, costUsd);
    res.write('data: [DONE]\n\n');
    res.end();
  }
});

export default router;
```

**Phase 5 completion criteria:**
- [ ] `POST /api/v1/chat` streams tokens in real time (visible in browser DevTools → Network → EventStream)
- [ ] `messages.slice(-6)` applied — confirmed by inspecting the Anthropic request in logs
- [ ] `cache_control: { type: 'ephemeral' }` present on the system prompt block
- [ ] `X-Accel-Buffering: no` header present — streaming works through Caddy without delay
- [ ] Free users are blocked at 20 calls / 24 hours; Premium at 500 — confirmed via curl
- [ ] `chat_usage` row written with real `tokens_in`, `tokens_out`, `cost_usd` values after each call
- [ ] Error during streaming still reaches the `finally` block — usage is logged, `[DONE]` is sent

---

### Phase 7 — Mobile Expansion (LOCKED: Next.js + Capacitor)

**Mobile strategy: Next.js + Capacitor. This decision is final.**

Capacitor wraps the Phase 6 Next.js static build directly. No second codebase. Every component built in Phase 6 ships to Android without any additional implementation. React Native is not used.

**Prerequisite check before starting Phase 7:**

Confirm `apps/web/next.config.ts` contains `output: 'export'`. This must have been set in Phase 6. If it was not, add it now and rebuild before proceeding.

```ts
// apps/web/next.config.ts
const nextConfig: NextConfig = {
  output: 'export',       // Required for Capacitor — generates /out directory
  trailingSlash: true,
};
export default nextConfig;
```

#### 7.1 Install Capacitor

```bash
cd apps/web
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "Flavour Find" "com.flavourfind.app" --web-dir=out
npx cap add android
```

#### 7.2 capacitor.config.ts

```ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.flavourfind.app',
  appName: 'Flavour Find',
  webDir: 'out',
  server: { androidScheme: 'https' },
};
export default config;
```

#### 7.3 Standard build + sync cycle

```bash
# Run on every web update before testing on Android:
npm run build          # Next.js generates /out
npx cap sync android   # copies /out into the Android project
```

#### 7.4 Optional native plugins (add only if needed)

```bash
npm install @capacitor/preferences   # secure token storage
npm install @capacitor/haptics       # mood button tap feedback
npm install @capacitor/share         # share a recipe via OS share sheet
npx cap sync android
```

#### 7.5 SSE streaming in Capacitor

Capacitor renders the app inside a WebView. The WebView supports the native Fetch API and `ReadableStream` exactly as a desktop browser does. The SSE streaming implementation from Phase 5 works without any modification — no XHR fallback required.

#### 7.6 Generate signed AAB for Play Store

```bash
cd android
./gradlew bundleRelease
# Output: android/app/build/outputs/bundle/release/app-release.aab
```

In Android Studio: **Build → Generate Signed Bundle / APK → Android App Bundle → create keystore → release**.

**Store the keystore file securely.** You need it for every future update. Losing it means you cannot update the app on the Play Store.

#### 7.7 Play Store submission checklist

- [ ] 512×512px PNG app icon (no alpha channel, no rounded corners)
- [ ] 1024×500px feature graphic (PNG or JPG)
- [ ] Minimum 2 phone screenshots at 16:9 or 9:16
- [ ] Privacy policy live at `https://flavourfind.com/privacy`
- [ ] `DELETE /api/v1/user` endpoint exists (required by Google Play policy)
- [ ] Content rating questionnaire completed — target rating: "Everyone"
- [ ] Signed AAB uploaded to Google Play Console Production track
- [ ] App tested on a physical Android device (not just an emulator)

**Phase 7 completion criteria:**
- [ ] `npx cap sync android` completes without errors
- [ ] App installs and runs on a physical Android device
- [ ] Mood selection, recipe browsing, AI chat, auth, and meal planner all work
- [ ] SSE streaming produces tokens in the Android WebView (not batched)
- [ ] Play Store listing submitted and under review

---

### Phase 9 — Billing & Monetization (SECURITY FIX APPLIED)

All other Phase 9 content is unchanged. The following section is **added** to cover the Stripe webhook security requirement.

#### 9.X — Stripe webhook — CRITICAL: signature verification

**The problem:** Without signature verification, any actor who discovers your webhook URL can POST a fabricated `customer.subscription.created` event and upgrade any account to Premium for free. This is not theoretical — it is a trivial attack on any Express webhook endpoint that uses `express.json()`.

**The fix has two hard requirements:**

**Requirement 1 — Body parser must be `express.raw()` on the webhook route.**

Stripe computes the webhook signature over the raw request bytes. If `express.json()` parses the body first, the raw bytes are lost and `constructEvent()` always throws. The webhook route must receive the raw Buffer.

**Requirement 2 — The webhook route must be registered before `app.use(express.json())`.**

```ts
// apps/api/src/server.ts — middleware registration order matters

import express from 'express';

const app = express();

// ── 1. Webhook route (raw body — MUST come before express.json()) ──────────
app.post(
  '/api/v1/billing/webhook',
  express.raw({ type: 'application/json' }),
  webhookHandler
);

// ── 2. All other routes (parsed JSON body) ─────────────────────────────────
app.use(express.json());
app.use('/api/v1', apiRouter);
```

**Webhook handler with signature verification:**

```ts
// apps/api/src/routes/billing.ts
import Stripe from 'stripe';
import { Request, Response } from 'express';
import { db } from '../db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function webhookHandler(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;
  try {
    // req.body is a raw Buffer here (express.raw() was used)
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    // Signature mismatch — reject immediately, do not process
    return res.status(400).json({ error: 'Webhook signature verification failed' });
  }

  // Only events that pass verification reach this point
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription;
      const userId = sub.metadata.userId;  // set when creating the subscription
      const isActive = sub.status === 'active';

      await db.query(
        `INSERT INTO user_subscriptions
           (user_id, stripe_subscription_id, plan, status, current_period_end)
         VALUES ($1, $2, 'premium', $3, $4)
         ON CONFLICT (stripe_subscription_id) DO UPDATE
           SET status = $3, current_period_end = $4, updated_at = NOW()`,
        [userId, sub.id, sub.status, new Date(sub.current_period_end * 1000)]
      );

      await db.query(
        `UPDATE users SET tier = $1 WHERE id = $2`,
        [isActive ? 'premium' : 'free', userId]
      );
      break;
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription;
      await db.query(
        `UPDATE users SET tier = 'free' WHERE id = $1`,
        [sub.metadata.userId]
      );
      break;
    }
  }

  res.json({ received: true });
}
```

**Local development — Stripe CLI webhook forwarding:**

```bash
# Install Stripe CLI, then:
stripe listen --forward-to localhost:3000/api/v1/billing/webhook
# Outputs a local webhook secret — add it to .env as STRIPE_WEBHOOK_SECRET
# NOTE: This is a different value from the Dashboard webhook secret used in production
```

**Webhook verification checklist:**
- [ ] Webhook route registered before `app.use(express.json())` in server.ts
- [ ] Webhook route uses `express.raw({ type: 'application/json' })` — not `express.json()`
- [ ] `stripe.webhooks.constructEvent()` called on every request before any DB operations
- [ ] Returns 400 if signature verification fails — no DB writes occur
- [ ] `stripe listen` used during local development — not a public tunnel
- [ ] `STRIPE_WEBHOOK_SECRET` in `.env` (Stripe CLI value) differs from the Dashboard value in production `.env.prod`

---

### Phase 10 — Deployment & Observability (UPDATED: Caddy replaces NGINX + Certbot)

**Change from previous plan:** NGINX + Certbot is replaced by Caddy throughout.

**Why:** NGINX + Certbot in Docker requires a certbot container, a shared certificate volume, a renewal cron job, and careful nginx.conf management. When renewal fails silently, the app goes offline at the 90-day certificate expiry. Caddy provisions and renews Let's Encrypt certificates automatically with zero additional configuration.

#### 10.1 Caddyfile (complete web server + SSL configuration)

```
# /opt/flavourfind/Caddyfile

flavourfind.com {
    # API traffic
    reverse_proxy /api/*    api:3000

    # Web app (Next.js static files)
    reverse_proxy /*        web:3000
}

www.flavourfind.com {
    redir https://flavourfind.com{uri} permanent
}
```

This is the complete configuration. Caddy handles:
- TLS certificate provisioning from Let's Encrypt
- Automatic renewal (no cron, no manual steps)
- HTTP → HTTPS redirect
- HSTS header
- HTTP/3 (QUIC) via the `443/udp` port binding

#### 10.2 Production docker-compose.yml (final)

```yaml
version: '3.8'

services:
  api:
    image: ghcr.io/${GITHUB_REPOSITORY}/api:latest
    env_file: .env.prod
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  web:
    image: ghcr.io/${GITHUB_REPOSITORY}/web:latest
    restart: unless-stopped

  caddy:
    image: caddy:2-alpine
    ports:
      - "80:80"
      - "443:443"
      - "443:443/udp"     # HTTP/3
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy_data:/data      # persists certificates across container restarts
      - caddy_config:/config
    restart: unless-stopped
    depends_on:
      - api
      - web

volumes:
  caddy_data:
  caddy_config:
```

#### 10.3 GitHub Actions CI/CD pipeline (final)

```yaml
# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Login to GHCR
        run: echo ${{ secrets.GITHUB_TOKEN }} | docker login ghcr.io -u ${{ github.actor }} --password-stdin

      - name: Build and push API image
        run: |
          docker build -t ghcr.io/${{ github.repository }}/api:latest ./apps/api
          docker push ghcr.io/${{ github.repository }}/api:latest

      - name: Build and push Web image
        run: |
          docker build -t ghcr.io/${{ github.repository }}/web:latest ./apps/web
          docker push ghcr.io/${{ github.repository }}/web:latest

      - name: Deploy to Droplet
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.DROPLET_IP }}
          username: ${{ secrets.DROPLET_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /opt/flavourfind
            docker compose pull
            docker compose up -d --remove-orphans
            docker system prune -f

      - name: Verify deployment
        run: sleep 10 && curl -f https://flavourfind.com/health || exit 1
```

**GitHub Actions secrets required:**

| Secret | Value |
|---|---|
| `DROPLET_IP` | DigitalOcean Droplet IP address |
| `DROPLET_USER` | `root` or a deploy user |
| `SSH_PRIVATE_KEY` | Private key matching the public key on the Droplet |
| `GITHUB_TOKEN` | Automatic — provided by GitHub Actions, used for GHCR |

#### 10.4 Observability stack

**Error tracking — Sentry:**

```bash
cd apps/api && npm install @sentry/node @sentry/profiling-node
```

```ts
// apps/api/src/server.ts — add before route registration
import * as Sentry from '@sentry/node';
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
app.use(Sentry.Handlers.requestHandler());
// After all routes:
app.use(Sentry.Handlers.errorHandler());
```

**Uptime monitoring:** UptimeRobot (free tier). Monitor `https://flavourfind.com/health`. 5-minute ping interval. Email + SMS alert on downtime.

**Log access:**

```bash
# On the Droplet:
docker compose logs -f api           # live API logs
docker compose logs --since 1h api   # last hour
docker compose logs --tail 100 api   # last 100 lines
```

Logs are structured JSON via pino — pipe through `docker compose logs api | jq` for readable output.

#### 10.5 Production environment variables

Store these in `/opt/flavourfind/.env.prod` on the Droplet. Never commit to git.

```
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://...@neon.tech/flavourfind
ANTHROPIC_API_KEY=sk-ant-...
CLERK_SECRET_KEY=sk_live_...
CLERK_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...      # from Stripe Dashboard (not CLI)
CORS_ORIGIN=https://flavourfind.com
SENTRY_DSN=https://...@sentry.io/...
REDIS_URL=redis://...@upstash.io:6379
```

**Phase 10 completion criteria:**
- [ ] `https://flavourfind.com/health` returns 200 with valid HTTPS
- [ ] Caddy issued a Let's Encrypt certificate — visible in browser padlock
- [ ] HTTP automatically redirects to HTTPS
- [ ] `www.flavourfind.com` permanently redirects to apex domain
- [ ] GitHub Actions deployment pipeline succeeds on push to main
- [ ] Health check step in GitHub Actions fails the deployment if the API is down
- [ ] Sentry receives a test error event
- [ ] UptimeRobot alerts fire when the API container is manually stopped
- [ ] `docker compose logs api` shows structured JSON pino output

---

### Post-Correction Roadmap Status

**Security:** ✅ Stripe webhook signature verification added to Phase 9 with `express.raw()` + `constructEvent()`. Webhook route registered before `express.json()`.

**Sequencing:** ✅ `/chat` correctly split — Phase 4 is structure + validation only (returns 501), Phase 5 is the complete Anthropic SDK implementation. No placeholder streaming code exists in Phase 4.

**Mobile strategy:** ✅ Locked as Next.js + Capacitor. React Native is not used. Phase 6 must set `output: 'export'` in next.config.ts. Phase 7 implements Capacitor only.

**Deployment:** ✅ NGINX + Certbot replaced by Caddy throughout. Caddyfile is 7 lines for full SSL + routing. Certificate renewal is automatic.

**Infrastructure validation:** ✅ Phase 1 ends with a skeleton deploy to DigitalOcean. The full GitHub Actions pipeline runs once against a health endpoint before any application code exists. Production problems are discovered in Phase 1, not Phase 10.

**This roadmap is secure, correctly sequenced, and execution-ready.**

---

## Appendix B — Final Target Architecture + Database Schema

### System Architecture

```
╔══════════════════════════════════════════════════════════════════╗
║  CLIENTS                                                         ║
║                                                                  ║
║  ┌─────────────────────────┐   ┌──────────────────────────────┐  ║
║  │  Next.js (Static Export) │   │  Capacitor Shell (Android)   │  ║
║  │  flavourfind.com         │   │  Google Play Store           │  ║
║  │  Vercel CDN              │   │  APK / AAB build             │  ║
║  └────────────┬────────────┘   └──────────────┬───────────────┘  ║
╚═══════════════╪════════════════════════════════╪════════════════╝
                │         HTTPS                  │
                │   Authorization: Bearer JWT    │
                │         JSON / SSE             │
                ▼                                ▼
╔══════════════════════════════════════════════════════════════════╗
║  EDGE (optional)                                                 ║
║  Cloudflare — DDoS protection, CDN for static assets, SSL       ║
╚══════════════════════════════════════════════════════════════════╝
                │
                ▼
╔══════════════════════════════════════════════════════════════════╗
║  BACKEND API                                                     ║
║                                                                  ║
║  Node.js + Express  →  /api/v1/                                  ║
║                                                                  ║
║  Middleware stack (in order):                                    ║
║    helmet → compression → pino-http → cors → express.json()     ║
║    → ClerkExpressWithAuth → rateLimitChat → zod validation       ║
║                                                                  ║
║  Routes:                                                         ║
║    /api/v1/recipes   — moods, recipe lists, random               ║
║    /api/v1/user      — saved recipes, preferences, meal plan     ║
║    /api/v1/chat      — AI assistant (SSE stream)                 ║
║    /api/v1/billing   — checkout, portal, Stripe webhook          ║
║                                                                  ║
║  DigitalOcean App Platform ($5–15/mo)                            ║
╚════════════════╤════════════════════════╤════════════════════════╝
                 │                        │
        ┌────────┴────────┐    ┌──────────┴──────────┐
        ▼                 ▼    ▼                      ▼
╔══════════════╗  ╔══════════════╗  ╔══════════════════════════════╗
║  PostgreSQL  ║  ║    Redis     ║  ║  External Services           ║
║  (Neon)      ║  ║  (Upstash)  ║  ║                              ║
║              ║  ║             ║  ║  Anthropic API               ║
║  12 tables   ║  ║  Rate limit ║  ║   ├─ Haiku  (chat)           ║
║  pg-pool     ║  ║  Query cache║  ║   └─ Sonnet (generation)     ║
║  Indexes on  ║  ║  TTL: 5 min ║  ║                              ║
║  all FK cols ║  ║             ║  ║  Clerk   (auth / JWT)        ║
╚══════════════╝  ╚══════════════╝  ║  Stripe  (subscriptions)     ║
                                    ║  Cloudflare R2 (images)      ║
                                    ╚══════════════════════════════╝
                                               │
                                    ╔══════════════════════════════╗
                                    ║  Observability               ║
                                    ║  Sentry · PostHog · UptimeRobot ║
                                    ╚══════════════════════════════╝
```

---

### Database Schema (PostgreSQL — 12 tables)

#### Core content tables

```sql
-- ─────────────────────────────────────────
-- CORE CONTENT
-- ─────────────────────────────────────────

CREATE TABLE moods (
  id            SERIAL PRIMARY KEY,
  name          TEXT UNIQUE NOT NULL,        -- 'happy', 'sad', etc.
  emoji         TEXT,
  display_order INT DEFAULT 0
);

CREATE TABLE recipes (
  id               SERIAL PRIMARY KEY,
  mood_id          INT NOT NULL REFERENCES moods(id),
  name             TEXT NOT NULL,
  emoji            TEXT,
  description      TEXT,
  cook_time_mins   INT,
  difficulty       TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  serves           INT,
  image_url        TEXT,                     -- Cloudflare R2 URL
  is_ai_generated  BOOLEAN DEFAULT FALSE,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_recipes_mood_id ON recipes(mood_id);

CREATE TABLE ingredients (
  id            SERIAL PRIMARY KEY,
  recipe_id     INT NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  ingredient    TEXT NOT NULL,
  order_index   INT,
  affiliate_url TEXT                          -- Amazon Associates link
);
CREATE INDEX idx_ingredients_recipe_id ON ingredients(recipe_id);

CREATE TABLE instructions (
  id           SERIAL PRIMARY KEY,
  recipe_id    INT NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  instruction  TEXT NOT NULL,
  step_number  INT
);
CREATE INDEX idx_instructions_recipe_id ON instructions(recipe_id);
```

#### User tables

```sql
-- ─────────────────────────────────────────
-- USER IDENTITY & PREFERENCES
-- ─────────────────────────────────────────

CREATE TABLE users (
  id                 TEXT PRIMARY KEY,        -- Clerk user_id (e.g. user_2abc...)
  email              TEXT UNIQUE NOT NULL,
  tier               TEXT NOT NULL DEFAULT 'free',  -- 'free' | 'premium' | 'premium_plus'
  stripe_customer_id TEXT UNIQUE,
  created_at         TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_users_tier ON users(tier);

CREATE TABLE user_preferences (
  id                    SERIAL PRIMARY KEY,
  user_id               TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  dietary_restrictions  TEXT[] DEFAULT '{}',  -- ['vegetarian','gluten-free']
  cuisine_preferences   TEXT[] DEFAULT '{}',  -- ['italian','mexican']
  disliked_ingredients  TEXT[] DEFAULT '{}',
  max_cook_time_mins    INT,
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);
CREATE UNIQUE INDEX idx_prefs_user_id ON user_preferences(user_id);

CREATE TABLE user_saved_recipes (
  id         SERIAL PRIMARY KEY,
  user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipe_id  INT  NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  saved_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, recipe_id)
);
CREATE INDEX idx_saved_user_id ON user_saved_recipes(user_id);

CREATE TABLE mood_history (
  id         SERIAL PRIMARY KEY,
  user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mood       TEXT NOT NULL,
  recipe_id  INT REFERENCES recipes(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_mood_history_user_id    ON mood_history(user_id);
CREATE INDEX idx_mood_history_created_at ON mood_history(created_at);

CREATE TABLE meal_plan (
  id           SERIAL PRIMARY KEY,
  user_id      TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipe_id    INT  NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  planned_date DATE NOT NULL,
  meal_slot    TEXT CHECK (meal_slot IN ('breakfast','lunch','dinner','snack'))
);
CREATE INDEX idx_meal_plan_user_date ON meal_plan(user_id, planned_date);

CREATE TABLE grocery_list (
  id           SERIAL PRIMARY KEY,
  user_id      TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  week_start   DATE NOT NULL,
  items        JSONB NOT NULL,               -- { produce: [...], dairy: [...], pantry: [...] }
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, week_start)
);
CREATE INDEX idx_grocery_user_week ON grocery_list(user_id, week_start);
```

#### AI usage tables

```sql
-- ─────────────────────────────────────────
-- AI USAGE TRACKING
-- ─────────────────────────────────────────

CREATE TABLE chat_usage (
  id         SERIAL PRIMARY KEY,
  user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  model      TEXT NOT NULL,                  -- 'claude-haiku-4-5' etc.
  tokens_in  INT,
  tokens_out INT,
  cost_usd   NUMERIC(10,6),                  -- stored for billing audits
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_chat_usage_user_id    ON chat_usage(user_id);
CREATE INDEX idx_chat_usage_created_at ON chat_usage(created_at);
```

#### Billing tables

```sql
-- ─────────────────────────────────────────
-- BILLING
-- ─────────────────────────────────────────

CREATE TABLE user_subscriptions (
  id                     SERIAL PRIMARY KEY,
  user_id                TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE,
  plan                   TEXT NOT NULL,      -- 'free' | 'premium' | 'premium_plus'
  status                 TEXT NOT NULL,      -- 'active' | 'past_due' | 'cancelled'
  current_period_end     TIMESTAMPTZ,
  updated_at             TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_subs_user_id ON user_subscriptions(user_id);
CREATE INDEX idx_subs_status  ON user_subscriptions(status);
```

---

### Required Indexes Summary

All indexes are listed inline above. The critical ones for query performance:

| Index | Table | Why |
|---|---|---|
| `idx_recipes_mood_id` | recipes | Every recipe fetch filters by mood_id |
| `idx_ingredients_recipe_id` | ingredients | JOIN in getRecipesByMood |
| `idx_instructions_recipe_id` | instructions | JOIN in getRecipesByMood |
| `idx_saved_user_id` | user_saved_recipes | Every saved-recipe list fetch |
| `idx_chat_usage_user_id` | chat_usage | Daily rate limit check (hot path) |
| `idx_chat_usage_created_at` | chat_usage | 24-hour window filter |
| `idx_meal_plan_user_date` | meal_plan | Weekly plan fetch |
| `idx_mood_history_user_id` | mood_history | Personalisation queries |

---

### Key Infrastructure Cost Targets

| Scale | MAU | Infra cost | Break-even subscribers |
|---|---|---|---|
| Launch | 0–500 | ~$5/mo | 1 |
| Early growth | 1,000 | ~$35/mo | 7 |
| Growth | 10,000 | ~$179/mo | 36 |
| Scale | 50,000 | ~$400/mo | 80 |

The Anthropic API is the primary scaling cost. At 10K MAU with 20 free messages/day each and 3% Premium conversion (300 users × 500 msgs/day at premium rates), estimated AI spend is $120–150/month — covered by ~30 Premium subscribers.

---

## Appendix A — Backend Technology Evaluation

**Question:** Should Flavour Find stay on Node.js + Express, or would a migration provide meaningful advantages?

**Short answer: Stay on Node.js + Express.** No migration is warranted. The rest of this section explains why, and documents the cases where that conclusion would change.

---

### The Candidates

Four options are worth serious consideration for a solo developer building a Node-based SaaS in 2026:

1. **Node.js + Express** — current stack
2. **Next.js full-stack** — collapse web frontend and backend API into one project
3. **Node.js + Fastify** — drop-in Express replacement, faster and more structured
4. **NestJS** — opinionated enterprise framework built on Node

Exotic alternatives (Hono + Bun, Deno, Go, Rust) are excluded. They offer real performance gains but impose ecosystem risk and hiring friction that are not appropriate for a solo developer at MVP stage.

---

### Evaluation Matrix

| Criterion | Express (current) | Next.js full-stack | Fastify | NestJS |
|---|---|---|---|---|
| **Migration cost** | None | High — full refactor | Low — mostly drop-in | Very high — complete rewrite |
| **Solo dev productivity** | Good | Good for web-only | Good | Poor — too much ceremony |
| **AI SDK support** | Excellent | Conditional* | Excellent | Excellent |
| **Mobile API compatibility** | Excellent | Problematic* | Excellent | Excellent |
| **SSE / streaming** | Native, simple | Edge runtime conflicts* | Native, simple | Requires config |
| **Hosting flexibility** | Any Node host | Vercel-optimised | Any Node host | Any Node host |
| **Hosting cost** | $5–15/month | $0–20/month | $5–15/month | $5–15/month |
| **Performance** | Good | Good (varies by runtime) | 20–35% faster than Express | Good |
| **Ecosystem maturity** | Largest | Large | Large | Large |
| **Learning curve** | Low | Medium | Low | High |
| **Career portfolio value** | High | High | Medium | High |
| **Recommended** | ✅ Stay | ❌ Don't migrate | ⚠️ Consider later | ❌ Don't migrate |

*The asterisks on Next.js are not minor caveats — they are architectural conflicts. Explained below.

---

### Why Not Next.js Full-Stack

This is the most tempting option because you are already using Next.js for the frontend. Collapsing everything into one project sounds clean. In practice it creates three concrete problems for Flavour Find.

**Problem 1 — Static export breaks API routes.**

Capacitor (your mobile strategy) requires a static export of Next.js (`output: 'export'` in `next.config.js`). Static exports do not include API routes — they are stripped from the build. This means you cannot use Next.js API routes as your backend if you want the Capacitor mobile build. You would be maintaining two separate backends: Next.js API routes for web, and a separate Express server for mobile. That is strictly worse than keeping Express for both.

**Problem 2 — The Anthropic SDK conflicts with the Edge runtime.**

Next.js API routes on Vercel run in one of two runtimes: Node.js (full compatibility) or Edge (lightweight, faster cold starts, global distribution). The Edge runtime does not support all Node.js APIs. The Anthropic SDK — specifically SSE streaming — relies on Node.js streams and the `net` module. If you deploy to Vercel's Edge runtime, the SDK breaks. You can force `runtime = 'nodejs'` per route, which works, but now you have lost the primary advantage of running on Vercel (edge distribution) and you are paying Vercel prices for a standard Node.js server.

**Problem 3 — You are coupling your frontend deployment to your backend deployment.**

When your Next.js app deploys, your API deploys with it. This sounds convenient but means: a frontend bug can take down your API, you cannot scale the API independently of the frontend, and rolling back a frontend change rolls back an API change too. These are not hypothetical — they bite real products. Keeping the backend separate lets you deploy each independently.

**The one case where Next.js full-stack makes sense:** If you decided not to pursue the Capacitor mobile path, abandoned SSE streaming in favour of polling, and your primary hosting target was Vercel. None of those conditions hold for Flavour Find.

---

### Why Not NestJS

NestJS is an excellent framework for teams. It enforces consistent structure through decorators, modules, dependency injection, and auto-generated Swagger docs. For a team of four engineers, that consistency pays dividends.

For a solo developer it is pure overhead. Every feature requires: a module file, a controller file, a service file, a DTO class, and a decorator. Writing a new API route takes four files in NestJS. It takes twelve lines in Express. The framework's discipline solves coordination problems between engineers — you have no coordination problem, because you are the only engineer. Do not adopt NestJS until you have at least two backend developers on the project.

---

### Why Not Fastify

Fastify is the most interesting alternative. It is a genuine drop-in replacement for Express with measurable advantages: 20–35% higher throughput in benchmarks, built-in JSON schema validation (replacing your need for Zod on routes), structured logging out of the box via Pino, TypeScript support that actually works, and a plugin architecture that is cleaner than Express middleware.

The migration cost is also real but low. Your routes look nearly identical. Most Express middleware has a Fastify equivalent. The Anthropic SDK, Clerk SDK, and Stripe SDK are all framework-agnostic — they work identically.

**The verdict on Fastify:** It is the right upgrade path when Express becomes a bottleneck. At the scale Flavour Find will operate for the next 12 months — hundreds to low thousands of concurrent users — Express is not a bottleneck. The performance difference is not perceptible at this scale. Migrate to Fastify when you see Express struggling under load in your monitoring dashboards, not before.

---

### The Actual Risks of Staying on Express

Being honest about the weaknesses of the current stack:

**Express has no built-in request validation.** You are mitigating this with Zod (added in Phase 1). Keep it.

**Express has no built-in structured logging.** Add Pino now — it is framework-agnostic and takes 15 minutes:

```bash
npm install pino pino-http
```

```js
const pino = require('pino');
const pinoHttp = require('pino-http');

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
app.use(pinoHttp({ logger }));
```

Every request now logs method, URL, status code, and response time as structured JSON. This is what you need in production.

**Express middleware order is silent and manual.** Bugs from wrong middleware order (CORS before auth, body parser after route handler) produce confusing errors. Mitigate by keeping `server.js` to under 50 lines with comments marking each middleware group.

**Express has no built-in TypeScript support.** You can add it with `ts-node` and `@types/express`, but it is optional at this stage. Add TypeScript when the codebase grows large enough that type errors become a real debugging cost — typically when you have more than ~10 route files or multiple developers.

None of these are reasons to migrate. They are all solvable within Express.

---

### What Would Change This Recommendation

**Migrate to Fastify if:**
- Express routes become measurably slow under real load (verify with `autocannon` or `k6` benchmarks before acting)
- You want built-in schema validation without Zod as a separate dependency
- You are adopting TypeScript seriously and want better native support

**Migrate to Next.js full-stack if:**
- You abandon the Capacitor mobile strategy entirely
- You move to non-streaming AI responses (polling or webhook-based)
- Your primary deployment target becomes Vercel and you want to eliminate the separate server

**Consider NestJS if:**
- You hire a second backend engineer
- The API grows beyond ~30 routes and consistent structure becomes a genuine maintenance problem

**None of these conditions currently apply to Flavour Find.**

---

### Recommended Additions to the Current Express Setup

These are the only changes to the backend technology worth making now. None require a framework migration.

```bash
npm install pino pino-http    # structured logging (15 min)
npm install helmet            # security headers (5 min)
npm install compression       # gzip responses (5 min)
```

```js
const helmet      = require('helmet');
const compression = require('compression');
const pinoHttp    = require('pino-http');

// Add these three lines to server.js, in this order:
app.use(helmet());                  // sets 11 security headers automatically
app.use(compression());             // gzip all responses
app.use(pinoHttp({ logger }));      // structured request logging
```

That is the complete list of backend technology work worth doing before launch. Three packages. Five minutes. Everything else is shipping features.

---

### Career Portfolio Value — Honest Assessment

Since this was listed as a criterion: Express is not the most exciting technology on a CV in 2026. But it is universally recognised, and more importantly, **a launched SaaS product on any stack is worth more to your portfolio than a technically impressive app nobody uses.** The backend framework is not what employers or investors evaluate. They evaluate: did you ship? Does it work at scale? Can you explain the tradeoffs you made?

The tradeoffs you made — Express for familiarity and speed, PostgreSQL for reliability, Anthropic SDK for AI, Stripe for payments, Capacitor for mobile — are defensible, coherent, and appropriate for the problem. That is what good engineering judgment looks like, regardless of which framework you picked.

---

## Phase 7 — Cross-Platform Strategy (Web + Mobile + Play Store)

**Goal:** Ship the web SaaS first. Then release on Android without rewriting anything.

---

### Section 1 — Architecture Overview

The entire cross-platform strategy rests on one principle: **the backend is the source of truth, and both clients are thin consumers of it.** No business logic in the frontend. No platform-specific API calls. One API, two UIs.

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENTS (Frontend)                   │
│                                                         │
│  ┌──────────────────────┐   ┌────────────────────────┐  │
│  │   Web App (Next.js)  │   │  Mobile App            │  │
│  │   flavourfind.com    │   │  React Native / Expo   │  │
│  │                      │   │  Google Play Store     │  │
│  └──────────┬───────────┘   └───────────┬────────────┘  │
└─────────────┼─────────────────────────────────────────── │
              │  HTTPS + Bearer Token (JWT / Clerk)        │
              ▼                                            │
┌─────────────────────────────────────────────────────────┐
│               SHARED BACKEND API                        │
│                                                         │
│   Node.js + Express  →  /api/v1/...                     │
│   Auth middleware (Clerk or JWT)                        │
│   Rate limiting per userId                              │
│   Input validation                                      │
│                                                         │
└────────────┬──────────────────┬───────────────────────── │
             │                  │                          │
             ▼                  ▼                          │
┌────────────────────┐  ┌───────────────────────────────┐  │
│   PostgreSQL       │  │   Anthropic API (Claude)      │  │
│   (Neon/Supabase)  │  │   /api/v1/chat → SSE stream   │  │
│                    │  │                               │  │
│   Users            │  │   Haiku for chat              │  │
│   Recipes          │  │   Sonnet for generation       │  │
│   Meal plans       │  └───────────────────────────────┘  │
│   Subscriptions    │                                      │
└────────────────────┘                                      │
```

**Key rules this architecture enforces:**

- All API routes live under `/api/v1/` — versioned from day one, so you never break mobile clients when you ship API changes
- Authentication uses Bearer tokens (JWT) in the `Authorization` header — works identically from a browser `fetch()` call and a React Native `fetch()` call
- The backend streams AI responses via Server-Sent Events (SSE) — the web app consumes them natively; the mobile app uses a polyfill or chunked fetch
- Zero platform-specific backend code — the server doesn't know or care whether the request came from a browser or a phone

---

### Section 2 — Approach Comparison

| | **Next.js + React Native** | **Next.js + PWA** | **Next.js + Capacitor** |
|---|---|---|---|
| **Code sharing** | Shared API layer only; two separate UIs | Single codebase (web = PWA = app) | Single Next.js codebase wrapped in a native shell |
| **Native feel** | Excellent — true native components | Poor — browser in a frame | Moderate — web UI with native plugins |
| **Play Store** | Full native APK/AAB via Expo | Possible via TWA (Trusted Web Activity) | APK/AAB via Capacitor build |
| **Push notifications** | Native (Expo Notifications) | Unreliable on Android | Native via Capacitor plugin |
| **Offline support** | Full (React Native AsyncStorage) | Service worker (limited) | Full via Capacitor plugins |
| **Dev complexity** | High — two codebases to maintain | Low — one codebase | Medium — one codebase, two build targets |
| **Solo dev speed** | Slow — you write everything twice | Fast | Fast |
| **App Store approval** | Rarely rejected (true native) | Sometimes rejected by Google | Sometimes scrutinised |
| **Performance** | Best | Worst | Good |
| **Best for** | Well-funded teams, complex native UX | Internal tools, B2B | Solo devs, content apps, MVP |

#### Next.js + React Native — Pros and Cons

**Pros:** Best user experience, access to all native device APIs, no "this feels like a website" problem, Expo handles the build toolchain.

**Cons:** Two UI codebases to write and maintain. As a solo developer, every feature you build must be implemented twice — once in Next.js and once in React Native. This doubles your workload indefinitely.

**When to use:** When you have a co-founder or early hire who owns mobile, or when your app requires genuinely native behaviour (camera, AR, background sync, Bluetooth).

#### Next.js + PWA — Pros and Cons

**Pros:** One codebase, one deployment, zero native build tooling. Google Play accepts PWAs via Trusted Web Activity (TWA) wrappers using tools like Bubblewrap.

**Cons:** PWA on Android has limited push notification reliability, no access to deep native APIs, service worker caching is complex to get right, and Google Play TWA submissions occasionally get rejected for "not feeling native." The Flavour Find UX — scrolling, tapping, animations — will feel sluggish compared to competitors.

**When to use:** B2B tools, dashboards, admin panels, or apps where Android presence is a nice-to-have rather than a distribution priority.

#### Next.js + Capacitor — Pros and Cons

**Pros:** You write one Next.js codebase and Capacitor wraps it in a native Android (and iOS) shell. You get access to native plugins (camera, push notifications, haptics, filesystem) via Capacitor's plugin system. Build and ship to the Play Store as a real APK. This is the same model Ionic apps use.

**Cons:** Your web app must be fully responsive and mobile-optimised before Capacitor adds any value. Some advanced native UX (custom navigation gestures, platform-specific animations) is hard to replicate. The app will not feel as smooth as a React Native app.

**When to use:** Content apps, recipe apps, lifestyle apps, any solo developer who wants Play Store presence without the overhead of a second codebase.

---

### Section 3 — Final Recommendation

**Use Next.js + Capacitor.**

Here is the reasoning, specific to Flavour Find:

Flavour Find is a **content and interaction app** — browse recipes, chat with an AI, plan meals. This is not a camera app. It is not a mapping app. It does not need deep native hardware access. The UX that matters — scrolling a recipe, tapping a mood button, chatting with an AI assistant — is entirely achievable in a well-built web view.

The economics of solo development make the decision clear. React Native means writing every feature twice: the mood picker in Next.js, then the mood picker in React Native. The meal planner in Next.js, then the meal planner in React Native. The chat widget in Next.js, then the chat widget in React Native. That is a 2× tax on every hour you work, indefinitely. Capacitor eliminates that tax entirely.

The migration path is also low-risk. You build the Next.js web app as normal. When you are ready for mobile, you run three commands (`npx cap init`, `npx cap add android`, `npx cap sync`) and you have a buildable Android project. Nothing in your existing Next.js code changes.

**The execution order:**

1. Build and launch the web SaaS (Phases 1–6)
2. Polish the mobile UI (responsive design, touch targets, bottom nav)
3. Add Capacitor and generate the Android APK
4. Submit to the Play Store

You do not need to think about Capacitor at all during Phases 1–6. It is a deployment target you add at the end, not an architectural constraint from the start.

---

### Section 4 — Step-by-Step Implementation Plan

#### 4.1 Backend — API Versioning and Standardisation

**Version all routes from day one.** Change every route from `/api/...` to `/api/v1/...`. This means when you ship a breaking API change, mobile clients on v1 keep working while web clients move to v2.

Update `server.js`:

```js
const recipesRouter = require('./src/routes/recipes');
const userRouter    = require('./src/routes/user');
const chatRouter    = require('./src/routes/chat');
const billingRouter = require('./src/routes/billing');

app.use('/api/v1/recipes',  recipesRouter);
app.use('/api/v1/user',     userRouter);
app.use('/api/v1/chat',     chatRouter);
app.use('/api/v1/billing',  billingRouter);
```

Update `public/app.js` (and later your Next.js API layer):

```js
const API_BASE = '/api/v1';
```

**Standardise all JSON responses.** Every response from the API should follow the same shape — success or error. This is critical for mobile, where inconsistent response shapes cause crashes.

Create `src/utils/response.js`:

```js
const success = (res, data, statusCode = 200) => {
  res.status(statusCode).json({ ok: true, data });
};

const error = (res, message, statusCode = 400) => {
  res.status(statusCode).json({ ok: false, error: message });
};

module.exports = { success, error };
```

Use it everywhere:

```js
// Before
res.json(moods);

// After
const { success } = require('../utils/response');
success(res, { moods });
```

**Standardise error handling** with a global Express error handler at the bottom of `server.js`:

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    ok: false,
    error: process.env.NODE_ENV === 'production'
      ? 'Something went wrong'
      : err.message
  });
});
```

**Add structured request validation** for POST endpoints using `zod`:

```bash
npm install zod
```

```js
const { z } = require('zod');

const chatSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().max(2000)
  })).max(10),
  context: z.object({
    mood: z.string().optional(),
    restrictions: z.array(z.string()).optional()
  }).optional()
});

router.post('/', requireAuth, async (req, res, next) => {
  const parsed = chatSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: parsed.error.flatten() });
  }
  // proceed with parsed.data
});
```

#### 4.2 Authentication — Web + Mobile Unified

The core challenge: web apps typically use cookies for auth (handled automatically by the browser), but mobile apps must manually attach tokens to every request. The solution is to use **Bearer tokens for everything** — it works identically in both environments.

**With Clerk (recommended):**

Clerk issues JWTs that you verify on the backend. The pattern is the same on web and mobile:

```
Authorization: Bearer <clerk_session_token>
```

On the backend, one middleware handles both:

```js
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

// Protects any route
router.use(ClerkExpressRequireAuth());

// After this middleware, req.auth.userId is always available
```

On the **web frontend** (Next.js):

```js
import { useAuth } from '@clerk/nextjs';

const { getToken } = useAuth();

const token = await getToken();
const res = await fetch('/api/v1/user/saved', {
  headers: { Authorization: `Bearer ${token}` }
});
```

On the **mobile frontend** (React Native / Expo):

```js
import { useAuth } from '@clerk/clerk-expo';

const { getToken } = useAuth();

const token = await getToken();
const res = await fetch(`${API_BASE}/user/saved`, {
  headers: { Authorization: `Bearer ${token}` }
});
```

The backend code is identical. Only the Clerk SDK package changes between platforms (`@clerk/nextjs` vs `@clerk/clerk-expo`).

**If you prefer plain JWT** (no third-party):

```bash
npm install jsonwebtoken bcryptjs
```

```js
// On login:
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '30d' }
);

// Middleware:
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ ok: false, error: 'Unauthorised' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ ok: false, error: 'Invalid or expired token' });
  }
}
```

Both clients store the token (web: `localStorage` or an in-memory store; mobile: `expo-secure-store`) and attach it to every request. The backend is identical.

#### 4.3 Shared API Layer

Create a single `api.js` module that every UI consumes. On web this lives in `lib/api.js`. On mobile this lives in `src/api/index.js`. The code is nearly identical — only the base URL differs.

```js
// lib/api.js (web) OR src/api/index.js (mobile)

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api/v1';
// For mobile: const API_BASE = process.env.EXPO_PUBLIC_API_URL;

async function apiRequest(path, options = {}) {
  const token = await getToken();   // from Clerk or your JWT store
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers
    }
  });

  const json = await res.json();
  if (!json.ok) throw new Error(json.error || 'Request failed');
  return json.data;
}

// Named functions — no raw fetch() calls in components
export const getMoods        = ()         => apiRequest('/recipes/moods');
export const getRecipes      = (mood)     => apiRequest(`/recipes/${mood}`);
export const getSaved        = ()         => apiRequest('/user/saved');
export const saveRecipe      = (id)       => apiRequest('/user/saved', { method: 'POST', body: JSON.stringify({ recipeId: id }) });
export const getMealPlan     = (week)     => apiRequest(`/user/meal-plan?week=${week}`);
export const getGroceryList  = (week)     => apiRequest(`/user/grocery-list?week=${week}`);
```

**Rule:** No component or screen ever calls `fetch()` directly. Everything goes through this module. When you add mobile, you copy this file and change the base URL. No other changes.

#### 4.4 Environment Management

**Web (Next.js) `.env.local`:**

```
NEXT_PUBLIC_API_URL=                     # empty = use relative /api/v1
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
ANTHROPIC_API_KEY=sk-ant-...
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_live_...
```

`NEXT_PUBLIC_` prefix makes a variable available in the browser bundle. Variables without it are server-only.

**Mobile (Expo) `.env`:**

```
EXPO_PUBLIC_API_URL=https://api.flavourfind.com/api/v1
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
```

`EXPO_PUBLIC_` prefix makes a variable available in the app bundle. Never put secrets in Expo env vars — they are visible in the compiled app.

**Production backend `.env`:**

```
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://...
ANTHROPIC_API_KEY=sk-ant-...
CLERK_SECRET_KEY=sk_...
JWT_SECRET=<256-bit random string>
CORS_ORIGIN=https://flavourfind.com,exp://...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
AI_CHAT_DAILY_LIMIT_FREE=20
AI_CHAT_DAILY_LIMIT_PREMIUM=500
```

**CORS for mobile:** React Native apps do not send an `Origin` header during development, so your standard CORS configuration works. In production, restrict CORS to your web domain. Mobile apps bypass CORS entirely because they are not browsers.

---

### Section 5 — Play Store Deployment Guide

#### Step 1 — Prerequisites (do this while building the web app)

- Google Play Console developer account: one-time $25 fee at [play.google.com/console](https://play.google.com/console)
- Android Studio: free, [developer.android.com/studio](https://developer.android.com/studio). Install it. Run it once. Let it download the Android SDK. You do not need to use it beyond that.
- Java JDK 17+: Android Studio installs this automatically.

#### Step 2 — Make the web app mobile-ready

Before adding Capacitor, your Next.js app must feel good on a phone. This is the real work.

**UI checklist before Capacitor:**
- [ ] All tap targets are ≥ 48px × 48px
- [ ] No hover states as the only interactive feedback (add `:active` states)
- [ ] No fixed-width elements that overflow on 375px screens
- [ ] Scrollable lists use `-webkit-overflow-scrolling: touch` or `overflow-y: scroll`
- [ ] Add a bottom navigation bar (Home, Saved, Meal Plan, Chat) — mobile users expect bottom nav, not hamburger menus
- [ ] Test on a real Android device or Chrome DevTools mobile emulation at 375px width

**Add a bottom nav component** (Next.js):

```jsx
// components/BottomNav.jsx
const navItems = [
  { href: '/',          icon: '🏠', label: 'Home'      },
  { href: '/saved',     icon: '❤️',  label: 'Saved'     },
  { href: '/meal-plan', icon: '📅', label: 'Plan'      },
  { href: '/chat',      icon: '💬', label: 'Assistant' },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex md:hidden z-50">
      {navItems.map(item => (
        <a key={item.href} href={item.href}
           className="flex-1 flex flex-col items-center py-3 text-gray-500 hover:text-purple-500">
          <span className="text-xl">{item.icon}</span>
          <span className="text-xs mt-1">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
```

Hide it on desktop with `md:hidden`. Add `pb-20` to your main content wrapper to prevent the nav from covering content.

#### Step 3 — Add Capacitor

```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android

# Initialise Capacitor
npx cap init "Flavour Find" "com.flavourfind.app" --web-dir=out
```

This creates `capacitor.config.ts` in your project root.

Update `capacitor.config.ts`:

```ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.flavourfind.app',
  appName: 'Flavour Find',
  webDir: 'out',                         // Next.js static export directory
  server: {
    androidScheme: 'https'
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  }
};

export default config;
```

Update `next.config.js` to enable static export:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',       // generates the /out directory Capacitor needs
  trailingSlash: true,
};

module.exports = nextConfig;
```

**Important:** Static export means no Next.js API routes in the mobile app. All API calls must go to your hosted backend (`https://api.flavourfind.com`). This is why the shared API layer with `EXPO_PUBLIC_API_URL` matters.

#### Step 4 — Build and sync

```bash
# Build Next.js static output
npm run build

# Add Android platform
npx cap add android

# Copy web assets into the Android project
npx cap sync android

# Open in Android Studio (optional, for signing/debugging)
npx cap open android
```

You now have a complete Android project in the `/android` folder. Every time you update your Next.js app, the deploy cycle is:

```bash
npm run build && npx cap sync android
```

#### Step 5 — Add native plugins (optional, add as needed)

```bash
# Push notifications
npm install @capacitor/push-notifications

# Secure storage (for auth tokens)
npm install @capacitor/preferences

# Share sheet (for sharing recipes)
npm install @capacitor/share

# Haptic feedback (for mood button taps)
npm install @capacitor/haptics

npx cap sync android
```

Use them in your Next.js code with platform detection:

```js
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

async function onMoodSelect(mood) {
  if (Capacitor.isNativePlatform()) {
    await Haptics.impact({ style: ImpactStyle.Light });
  }
  selectMood(mood);
}
```

#### Step 6 — Generate a signed APK / AAB

In Android Studio:

1. **Build → Generate Signed Bundle / APK**
2. Choose **Android App Bundle (AAB)** — this is what Google Play requires
3. Create a new keystore (save it somewhere safe — you need it for every future update)
4. Select release build variant
5. Click Finish — your `.aab` file appears in `android/app/release/`

Or via command line:

```bash
cd android
./gradlew bundleRelease
# Output: android/app/build/outputs/bundle/release/app-release.aab
```

#### Step 7 — Required assets for Play Store submission

| Asset | Size/Format | Notes |
|---|---|---|
| App icon | 512×512px PNG | No alpha channel, no rounded corners (Play Store applies its own shape) |
| Feature graphic | 1024×500px PNG/JPG | Shown at top of Play Store listing |
| Phone screenshots | 2+ screenshots, 16:9 or 9:16 | Show the mood selector, a recipe, and the chat assistant |
| Short description | Max 80 characters | "Find recipes that match how you feel, powered by AI" |
| Full description | Max 4000 characters | Cover key features, moods supported, AI assistant, free vs premium |
| Privacy policy URL | Any public URL | Required. Host a simple one on your website. |
| Content rating | Answer the questionnaire | Flavour Find will get "Everyone" rating |
| Category | Food & Drink | |

**Privacy policy minimum content** (host at `flavourfind.com/privacy`):
- What data you collect (email, saved recipes, mood history)
- How you use it (personalisation, billing)
- Third-party services (Clerk, Stripe, Anthropic)
- How users can delete their data (email you)
- Contact email

#### Step 8 — Submit to Play Store

1. Go to [Google Play Console](https://play.google.com/console)
2. Create a new app → enter app name, choose language, app or game, free or paid
3. Complete the **Store listing** (description, screenshots, feature graphic)
4. Complete **Content rating** questionnaire
5. Complete **App content** declarations (ads? yes/no, target audience, etc.)
6. Under **Production → Releases**, create a new release and upload your `.aab` file
7. Submit for review

**First review** takes 1–3 days. Subsequent updates are faster (hours to 1 day) once the app is established.

**Common rejection reasons and how to avoid them:**
- Broken functionality → test on a real Android device before submitting
- Missing privacy policy → host it before submitting
- Misleading description → don't claim AI features you haven't built yet
- Crashes on launch → test with a release build, not a debug build

---

### Section 6 — Scaling Strategy

Keep this in mind: **you will not have scaling problems before you have revenue problems.** Premature scaling is the most expensive mistake a solo founder makes. Build lean, measure, scale what actually breaks.

#### PostgreSQL

Use **Neon** (free tier: 0.5 GB storage, 1 compute unit, auto-suspend). When you outgrow the free tier, Neon's paid plans start at $19/month and scale without migration. Neon is serverless — connections are pooled automatically, which is critical for a Node.js app that opens many concurrent DB connections.

If you want a built-in admin UI and auto-generated REST API (useful for content management), use **Supabase** instead. Same PostgreSQL, different developer experience.

**Connection pooling:** Add `?pgbouncer=true&connection_limit=1` to your Neon DATABASE_URL for serverless environments, or use `pg-pool` directly:

```js
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,                // max concurrent connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

#### Stateless Backend Design

Your backend must be stateless — no in-memory session data, no local file writes. This means:

- Auth state lives in the JWT / Clerk token (verified per-request)
- Uploaded files (if you add recipe images) go to S3 or Cloudflare R2, not the local filesystem
- Rate limiting state lives in Redis or the DB, not in-memory (in-memory limits reset on every deploy)

A stateless backend can be scaled horizontally by running multiple instances behind a load balancer. You likely won't need this until thousands of concurrent users, but designing for it from the start costs nothing.

#### Redis — When and Why

**You do not need Redis at launch.** Add it when one of these becomes a real problem:

- **Rate limiting in a multi-instance setup** — in-memory rate limits don't work across multiple server instances. Redis gives you a shared counter.
- **Caching popular recipe queries** — if `/api/v1/recipes/happy` is called 10,000 times per hour, cache the result in Redis for 5 minutes.
- **Session storage** — if you move away from JWTs to server-side sessions.

When you do need it, **Upstash** offers a serverless Redis with a free tier and $0.2/100K commands beyond that. It requires zero infrastructure management.

```bash
npm install ioredis
```

```js
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

// Cache example
async function getMoodsWithCache() {
  const cached = await redis.get('moods');
  if (cached) return JSON.parse(cached);

  const moods = await db.getMoods();
  await redis.setex('moods', 300, JSON.stringify(moods)); // 5 min TTL
  return moods;
}
```

#### Handling AI API Costs

This is the most important scaling consideration for Flavour Find. Claude API calls cost real money and scale directly with usage. If you get a surge of users chatting with the AI assistant, your API bill can spike overnight.

**Cost controls — implement all of these before launch:**

**1. Hard daily limits per user tier (enforced in the DB, not just in-memory):**

```js
async function checkChatLimit(userId, tier) {
  const limit = tier === 'premium' 
    ? parseInt(process.env.AI_CHAT_DAILY_LIMIT_PREMIUM) || 500
    : parseInt(process.env.AI_CHAT_DAILY_LIMIT_FREE) || 20;

  const result = await db.query(
    `SELECT COUNT(*) as count FROM chat_usage 
     WHERE user_id = $1 AND created_at > NOW() - INTERVAL '24 hours'`,
    [userId]
  );

  if (parseInt(result.rows[0].count) >= limit) {
    throw new Error(`Daily limit reached. Upgrade to Premium for ${limit_premium} messages/day.`);
  }

  await db.query(
    'INSERT INTO chat_usage (user_id) VALUES ($1)',
    [userId]
  );
}
```

**2. Keep context windows tight:**

```js
// Send only the last 6 messages, not the full history
const messages = req.body.messages.slice(-6);
```

**3. Use Haiku for chat, Sonnet only for generation:**

| Task | Model | Est. cost per call |
|---|---|---|
| Chat response (400 tokens out) | claude-haiku-4-5 | ~$0.0002 |
| Recipe generation (1000 tokens out) | claude-sonnet-5 | ~$0.003 |
| Admin/complex reasoning | claude-opus-5 | ~$0.015 |

At 20 free chat messages/day × 1,000 free users = 20,000 Haiku calls/day ≈ **$4/day** ($120/month). This is manageable and well within what 10 Premium subscribers cover.

**4. Set an Anthropic spend limit** in your Anthropic console dashboard. Hard cap at $200/month while you're in early growth. You'd rather have the AI go down temporarily than get a $2,000 bill.

**5. Cache deterministic responses** — if a user asks "what mood is best for pasta?", the answer doesn't change. Cache common food questions in Redis with a 24-hour TTL.

#### Avoiding N+1 Queries

The existing N+1 pattern (`getRecipesByMood` running N queries for ingredients + N for instructions) must be fixed before you add user-scale traffic. The fix is a single JOIN with grouping:

```sql
-- Single query replaces N+1 pattern
SELECT 
  r.id          AS recipe_id,
  r.name        AS recipe_name,
  r.emoji       AS recipe_emoji,
  r.description AS recipe_description,
  i.ingredient,
  i.order_index,
  ins.instruction,
  ins.step_number
FROM recipes r
JOIN moods m        ON r.mood_id = m.id
LEFT JOIN ingredients  i   ON i.recipe_id = r.id
LEFT JOIN instructions ins ON ins.recipe_id = r.id
WHERE m.name = $1
ORDER BY r.id, i.order_index, ins.step_number;
```

Then group in JavaScript:

```js
function groupRecipeRows(rows) {
  const map = new Map();
  for (const row of rows) {
    if (!map.has(row.recipe_id)) {
      map.set(row.recipe_id, {
        id: row.recipe_id,
        name: row.recipe_name,
        emoji: row.recipe_emoji,
        description: row.recipe_description,
        ingredients: [],
        instructions: []
      });
    }
    const recipe = map.get(row.recipe_id);
    if (row.ingredient  && !recipe.ingredients.includes(row.ingredient))
      recipe.ingredients.push(row.ingredient);
    if (row.instruction && !recipe.instructions.includes(row.instruction))
      recipe.instructions.push(row.instruction);
  }
  return Array.from(map.values());
}
```

**Add database indexes** for every column you query by:

```sql
CREATE INDEX idx_recipes_mood_id    ON recipes(mood_id);
CREATE INDEX idx_ingredients_recipe ON ingredients(recipe_id);
CREATE INDEX idx_instructions_recipe ON instructions(recipe_id);
CREATE INDEX idx_saved_user_id      ON user_saved_recipes(user_id);
CREATE INDEX idx_chat_usage_user    ON chat_usage(user_id);
CREATE INDEX idx_meal_plan_user     ON meal_plan(user_id, planned_date);
```

---

### Section 7 — AI Integration Design (Cross-Platform)

#### Single Endpoint, Two Clients

The `/api/v1/chat` endpoint is platform-agnostic. It receives JSON, returns a stream. Both web and mobile consume it the same way.

```
Web (Next.js)                    Mobile (React Native / Expo)
     │                                      │
     │  POST /api/v1/chat                   │  POST /api/v1/chat
     │  Authorization: Bearer <token>       │  Authorization: Bearer <token>
     │  { messages, context }               │  { messages, context }
     │                                      │
     ▼                                      ▼
          ┌──────────────────────────────────┐
          │      Express Chat Route          │
          │                                  │
          │  1. Verify Clerk/JWT token        │
          │  2. Check daily rate limit        │
          │  3. Load user context from DB     │
          │  4. Build system prompt           │
          │  5. Call Anthropic SDK            │
          │  6. Stream tokens via SSE         │
          └──────────────────────────────────┘
```

#### Request Structure

Every chat request from both clients follows this shape:

```json
{
  "messages": [
    { "role": "user", "content": "I'm feeling stressed. What should I cook?" },
    { "role": "assistant", "content": "For stress, I'd suggest something..." },
    { "role": "user", "content": "Something with pasta?" }
  ],
  "context": {
    "mood": "stressed",
    "restrictions": ["vegetarian"],
    "recentRecipes": ["Creamy Mushroom Pasta", "Tomato Soup"]
  }
}
```

**Rules:**
- `messages` array is limited to the last 6 exchanges (12 messages) — enforced server-side to control token costs
- `context` is injected fresh from the DB on each request — the client never stores or sends preference data directly
- The client never sends the system prompt — it lives on the server only
- Message content is capped at 2000 characters per message server-side via Zod validation

#### Streaming — Web

On the web, use the native `ReadableStream` from the Fetch API:

```js
// lib/chat.js
export async function sendChatMessage(messages, context, onChunk) {
  const token = await getToken();

  const res = await fetch('/api/v1/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ messages, context })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Chat failed');
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const lines = decoder.decode(value).split('\n');
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') return;
        try {
          const { delta } = JSON.parse(data);
          onChunk(delta);          // call with each token as it arrives
        } catch {}
      }
    }
  }
}
```

Usage in a React component:

```jsx
const [response, setResponse] = useState('');

await sendChatMessage(messages, context, (chunk) => {
  setResponse(prev => prev + chunk);
});
```

#### Streaming — Mobile (React Native / Expo)

React Native's `fetch` does not support `ReadableStream` in the same way. Use chunked response reading:

```js
// src/api/chat.js (mobile)
export async function sendChatMessage(messages, context, onChunk) {
  const token = await getToken();

  const xhr = new XMLHttpRequest();
  xhr.open('POST', `${API_BASE}/chat`);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', `Bearer ${token}`);

  let lastIndex = 0;

  xhr.onprogress = () => {
    const newData = xhr.responseText.slice(lastIndex);
    lastIndex = xhr.responseText.length;

    const lines = newData.split('\n');
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') return;
        try {
          const { delta } = JSON.parse(data);
          onChunk(delta);
        } catch {}
      }
    }
  };

  xhr.send(JSON.stringify({ messages, context }));
}
```

This XHR approach is the standard pattern for SSE streaming in React Native and works reliably on both Android and iOS.

**Fallback for low-connectivity mobile:** If streaming proves unreliable on poor mobile networks, add a non-streaming mode:

```js
// On the backend, detect via query param
if (req.query.stream === 'false') {
  // Wait for full completion, return as single JSON response
  const message = await client.messages.create({ ... });
  return success(res, { content: message.content[0].text });
}
```

The mobile app can switch to non-streaming mode on poor connections, detected via `NetInfo` from `@react-native-community/netinfo`.

#### Token Cost Optimisation

| Technique | Saving | Implementation effort |
|---|---|---|
| Use Haiku for chat | ~15× cheaper than Sonnet | Choose model per route |
| Limit context to 6 messages | ~40–60% fewer input tokens | Slice array server-side |
| Cap `max_tokens` at 400 | Hard limit on output cost | Set in SDK call |
| Cache common answers in Redis | Eliminate API call entirely | Redis TTL per question hash |
| System prompt caching | ~90% discount on system prompt tokens (Anthropic prompt caching) | Add `cache_control` to system |

**Anthropic prompt caching** is the highest-value optimisation. Since the system prompt is long and static, marking it for caching means you only pay full price for it once per 5-minute window:

```js
const stream = await client.messages.stream({
  model: 'claude-haiku-4-5-20251001',
  max_tokens: 400,
  system: [
    {
      type: 'text',
      text: SYSTEM_PROMPT,
      cache_control: { type: 'ephemeral' }   // cache this block
    }
  ],
  messages: messages.slice(-6)
});
```

This alone reduces the cost of the system prompt tokens by ~90% for repeated calls within the 5-minute cache window.

---

### Cross-Platform Execution Timeline

Integrate Phase 7 into the overall roadmap at this point:

| Phase | When | Time estimate |
|---|---|---|
| Phases 1–6 (web SaaS) | Months 1–4 | ~50 hours |
| Mobile UI polish (responsive, bottom nav) | Month 4 | ~6 hours |
| Capacitor setup + Android build | Month 4 | ~3 hours |
| Play Store submission + asset creation | Month 4 | ~4 hours |
| Play Store review and approval | Month 4–5 | 1–3 days (waiting) |
| **Total to Android launch** | **4–5 months** | **~13 additional hours** |

The entire cross-platform expansion — from "web only" to "live on the Play Store" — requires approximately 13 hours of additional work on top of the web SaaS build, assuming the web app is already mobile-responsive.
