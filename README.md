# Frontends

The web frontends for the Geekway to the West Rules Lawyer convention system. This repo contains three [React](https://react.dev/) single-page apps, each bundled with [webpack](https://webpack.js.org/). In production they are static bundles served from an S3 bucket behind CloudFront (provisioned by [`ruleslawyer-infra`](https://github.com/geekwaytothewest/ruleslawyer-infra)); locally they build into a Docker/nginx image for the Compose stack. They talk to the [`ruleslawyer-backend`](https://github.com/geekwaytothewest/ruleslawyer-backend) API and authenticate via Auth0.

## Apps

| Directory          | Package name                 | Purpose                          | Route              | Docker URL                              |
| ------------------ | ---------------------------- | -------------------------------- | ------------------ | --------------------------------------- |
| `board-game-admin` | `board-game-admin`           | Admin interface **(deprecated)** | `/legacy/admin`      | http://localhost:8081/legacy/admin        |
| `librarian`        | `library-attendant-interface`| Library attendant interface      | `/legacy/librarian`  | http://localhost:8082/legacy/librarian    |
| `play-prize-entry` | `play-and-win-prize-entry`   | Play & Win prize entry           | `/legacy/playandwin` | http://localhost:8083/legacy/playandwin   |

(The Ruleslawyer dashboard is a separate Next.js app in the [`ruleslawyer-frontend`](https://github.com/rules-lawyer/ruleslawyer-frontend) repo, not part of this one.)

> **`board-game-admin` is deprecated** in favor of the [`ruleslawyer-frontend`](https://github.com/rules-lawyer/ruleslawyer-frontend) Next.js dashboard, which is at parity with all of its features. It stays here for reference until fully retired — new work should target the dashboard. `librarian` and `play-prize-entry` remain active.

## Requirements

- Node.js 24 (pinned via [`.nvmrc`](.nvmrc); CI and the Docker build images both use Node 24)
- Auth0 tenant (for auth)
- An accessible `ruleslawyer-backend` API

## Installation

```bash
git clone https://github.com/geekwaytothewest/frontends.git
```

For the full stack (backend + database + all frontends) running together, see the [`ruleslawyer-backend`](https://github.com/rules-lawyer/ruleslawyer-backend) README — its Docker Compose setup builds and serves these apps for you.

Each app is installed and configured independently. In each app directory:

```bash
cd board-game-admin   # or librarian, or play-prize-entry
npm install
```

Create an `.env` file from the `.env.template` in each app before running. See [Environment variables](#environment-variables) for what each one means.

## Environment variables

All three apps share a common set of Auth0/API variables; a couple are app-specific.

| Variable                | Apps                       | Description                                                      |
| ----------------------- | -------------------------- | --------------------------------------------------------------- |
| `API_HOST`              | all                        | Origin of the `ruleslawyer-backend` API (scheme + host, no path). The `org/{id}/con/{id}` path is added at runtime from the page URL — see [Multiple conventions](#multiple-conventions) |
| `AUTH_DOMAIN`           | all                        | Auth0 tenant domain                                             |
| `AUTH_CLIENT_ID`        | all                        | Auth0 application (SPA) client ID                               |
| `AUTH_CALLBACK`         | all                        | Auth0 redirect URL after login                                  |
| `API_IDENTIFIER`        | all                        | Auth0 API identifier (audience)                                 |
| `WEBPACK_MODE`          | all                        | webpack build mode (`development` / `production`)               |
| `LOGOUT_RETURN_URL`     | admin, librarian           | URL to return to after Auth0 logout                             |
| `ALWAYS_OVERRIDE_LIMIT` | librarian                  | When set, the app starts with the checkout override-limit toggle enabled |

## Running locally

Each app runs its own webpack dev server:

```bash
npm run start
```

- `board-game-admin` serves at http://localhost:8081/legacy/admin
- `librarian` serves at http://localhost:8082/legacy/librarian
- `play-prize-entry` serves at http://localhost:8083/legacy/playandwin

## Building

```bash
# test build
npm run build:test

# production build
npm run build:prod
```

Builds output to `dist/`. Auth0 and API configuration are baked into the bundle at build time from `process.env` (`API_HOST`, `AUTH_DOMAIN`, `AUTH_CLIENT_ID`, `AUTH_CALLBACK`, `API_IDENTIFIER`, `LOGOUT_RETURN_URL`, `WEBPACK_MODE`) via webpack. Note that only the API **origin** (`API_HOST`) is baked — the convention-specific `org/{id}/con/{id}` path is resolved at runtime (see [Multiple conventions](#multiple-conventions)).

In production the `dist/` bundle is uploaded to S3 (see [Deployment](#deployment)). For local use there is also a Docker image (`node:lts-alpine` build stage compiles the app, then copies `dist/` into an `nginx:stable-alpine` image serving port 80) — this is what the backend's Docker Compose stack builds, passing the same config as build `ARG`s.

## Deployment

Deployed to AWS S3 + CloudFront via the **Deploy Frontends** GitHub Action (manual `workflow_dispatch`; choose `nonprod` or `prod`), which fans out to all three apps. The static hosting (one private, account-scoped S3 bucket `geekway-{env}-spa-{account}` with three prefixes, fronted by a CloudFront distribution) is provisioned by the CDK in [`ruleslawyer-infra`](https://github.com/rules-lawyer/ruleslawyer-infra) — these apps no longer run as ECS/Fargate tasks. Each job resolves the bucket name from the network stack's `SpaBucketName` output, builds the static bundle, runs `aws s3 sync dist/` into its bucket prefix, then issues a `aws cloudfront create-invalidation` for that prefix:

| App                | S3 prefix          | CloudFront behaviors                 |
| ------------------ | ------------------ | ------------------------------------ |
| `board-game-admin` | `legacy/admin`      | `/legacy/admin`, `/legacy/admin/*`      |
| `librarian`        | `legacy/librarian`  | `/legacy/librarian`, `/legacy/librarian/*` |
| `play-prize-entry` | `legacy/playandwin` | `/legacy/playandwin`, `/legacy/playandwin/*` |

CloudFront serves the `/legacy/<app>` prefixes from S3 and forwards `/api/*` to the backend ALB; the apex `/` and everything else go to the **ruleslawyer-frontend** dashboard (also via the ALB). AWS access uses GitHub OIDC (the `ruleslawyer-{env}-github-deploy` role created by the CDK); the bucket name is deterministic but the distribution id is supplied as a secret (`CF_DISTRIBUTION_ID[_NONPROD]`). Auth0 callback/logout URLs and the API URL are baked into each bundle at build time. See the full guide in the infra repo: [ruleslawyer-infra/DEPLOYMENT.md](https://github.com/rules-lawyer/ruleslawyer-infra/blob/main/DEPLOYMENT.md).

## Multiple conventions

A single deployment serves **every** convention. The convention's Organization Id and Convention Id live in the page URL, and the app derives its backend base URL from them at runtime:

```
https://<host>/legacy/admin/org/{orgId}/con/{conId}        -> API: <API_HOST>/api/legacy/org/{orgId}/con/{conId}
https://<host>/legacy/librarian/org/{orgId}/con/{conId}
https://<host>/legacy/playandwin/org/{orgId}/con/{conId}
```

How it works:

- Only the API **origin** is baked into the bundle (the `API_HOST` env var). The `org/{id}/con/{id}` segment is parsed from `window.location.pathname` at runtime in each app's webpack `DefinePlugin` shim (wherever the source references `API_URL`).
- Each app's React Router `basename` is likewise computed from the URL (`/legacy/<app>/org/{id}/con/{id}`), so client-side routing works under any convention prefix. If no `org/con` is present in the path (e.g. local dev), it falls back to `org 1 / con 1` under the bare `/legacy/<app>` basename.
- Static assets are served from the single S3 prefix per app (`/legacy/admin`, `/legacy/librarian`, `/legacy/playandwin`) with an absolute `publicPath`, so **nothing is duplicated in S3** — adding a convention requires no rebuild or redeploy.

For this to work, two things outside this repo must be configured:

1. **CloudFront** must rewrite SPA navigations under a `/legacy/<app>/` prefix to that app's single `index.html` — i.e. any extensionless request under `/legacy/<app>/` (bare, convention-scoped `/legacy/<app>/org/{n}/con/{m}`, or a deep link) returns `/legacy/<app>/index.html` (a CloudFront Function on the viewer-request event). Requests carrying a file extension serve the real asset directly from S3. Because org/con is just part of the path under the prefix, no special convention parsing is needed. See [ruleslawyer-infra/DEPLOYMENT.md](https://github.com/rules-lawyer/ruleslawyer-infra/blob/main/DEPLOYMENT.md).
2. **Auth0** needs only a **single** allowed callback and logout URL **per app** — they are convention-independent (`AUTH_CALLBACK` / `LOGOUT_RETURN_URL`, e.g. `https://<host>/legacy/admin/callback` and `https://<host>/legacy/admin`), so they do **not** multiply with conventions. The convention the user was on is carried through the login round-trip via Auth0 `appState` and restored with a full-page redirect afterward, so they land back under the right `/legacy/<app>/org/{id}/con/{id}` prefix.

The `API_HOST` secret is the API origin only — e.g. `https://nonprod.library.ruleslawyer.com` (or `http://localhost:8080` locally).

## Stay in touch

- Contributors
  - [Joe Henderson](mailto:jjh456@gmail.com)
  - [Mattie Schraeder](mailto:mattie@geekway.com)
  - [Libby Swanger](mailto:libby.swanger@gmail.com)
- Website - [https://geekway.com](https://geekway.com/)

## License

Licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE).
