# Multi-stage build:
#   1. builder   — full workspace install + Next.js static export
#   2. prod-deps — scoped production install (root + packages/shared only)
#   3. runtime   — final image; excludes apps/web's frontend-only dependency tree
#                  (next, react, react-dom, @capacitor/*, @clerk/react)

# ---- Stage 1: builder — builds the static export ----
FROM node:22-alpine AS builder

# Install build tools required by better-sqlite3 (native addon).
# better-sqlite3 remains in package.json; npm ci will attempt to build it.
# Alpine Linux requires these tools explicitly.
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy monorepo root configuration.
# tsconfig.json is required because apps/web/tsconfig.json has "extends": "../../tsconfig.json" —
# without it, `next build`'s TypeScript step fails with TS5083 (cannot read root tsconfig.json).
COPY package.json package-lock.json turbo.json tsconfig.json ./

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

# ---- Stage 2: prod-deps — a separate, scoped install (root + packages/shared only) ----
FROM node:22-alpine AS prod-deps

# better-sqlite3 (root dependency) is a native addon built during npm ci.
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Every workspace's package.json must be present for npm to validate the lockfile's
# workspace structure, even though only packages/shared's dependencies will actually
# be installed below.
COPY package.json package-lock.json ./
COPY packages/shared/package.json ./packages/shared/package.json
COPY packages/types/package.json ./packages/types/package.json
COPY apps/web/package.json ./apps/web/package.json

# Scoped install: root project's own dependencies + packages/shared's dependencies only.
# apps/web (next, react, react-dom, @capacitor/*, @clerk/react, ...) and packages/types
# are never installed in this stage.
RUN npm ci --omit=dev --workspace=packages/shared --include-workspace-root

# packages/shared's actual source (required at runtime via the
# node_modules/@flavour-find/shared workspace symlink).
COPY packages/shared/src ./packages/shared/src

# ---- Stage 3: runtime (final image) ----
FROM node:22-alpine

WORKDIR /app

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=prod-deps /app/packages ./packages
COPY --from=builder /app/server.js /app/database.js ./
COPY --from=builder /app/public ./public
COPY --from=prod-deps /app/package.json ./package.json

EXPOSE 3000
CMD ["node", "server.js"]
