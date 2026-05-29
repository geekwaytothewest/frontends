# Frontends

The web frontends for the Geekway to the West Rules Lawyer convention system. This repo contains three [React](https://react.dev/) single-page apps, each bundled with [webpack](https://webpack.js.org/). In production they are static bundles served from an S3 bucket behind CloudFront (provisioned by [`ruleslawyer-infra`](https://github.com/geekwaytothewest/ruleslawyer-infra)); locally they build into a Docker/nginx image for the Compose stack. They talk to the [`ruleslawyer-backend`](https://github.com/geekwaytothewest/ruleslawyer-backend) API and authenticate via Auth0.

## Apps

| Directory          | Package name                 | Purpose                          | Route         | Docker URL                         |
| ------------------ | ---------------------------- | -------------------------------- | ------------- | ---------------------------------- |
| `board-game-admin` | `board-game-admin`           | Admin interface                  | `/admin`      | http://localhost:8081/admin        |
| `librarian`        | `library-attendant-interface`| Library attendant interface      | `/librarian`  | http://localhost:8082/librarian    |
| `play-prize-entry` | `play-and-win-prize-entry`   | Play & Win prize entry           | `/playandwin` | http://localhost:8083/playandwin   |

(The Ruleslawyer dashboard is a separate Next.js app in the [`ruleslawyer-frontend`](https://github.com/geekwaytothewest/ruleslawyer-frontend) repo, not part of this one.)

## Requirements

- Node.js 20+
- Auth0 tenant (for auth)
- An accessible `ruleslawyer-backend` API

## Installation

```bash
git clone https://github.com/geekwaytothewest/frontends.git
```

For the full stack (backend + database + all frontends) running together, see the [`ruleslawyer-backend`](https://github.com/geekwaytothewest/ruleslawyer-backend) README — its Docker Compose setup builds and serves these apps for you.

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
| `API_URL`               | all                        | Base URL of the `ruleslawyer-backend` API                       |
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

- `board-game-admin` serves at http://localhost:8081/admin
- `librarian` serves at http://localhost:8082/librarian
- `play-prize-entry` serves at http://localhost:8083/playandwin

## Building

```bash
# test build
npm run build:test

# production build
npm run build:prod
```

Builds output to `dist/`. Auth0 and API configuration are baked into the bundle at build time from `process.env` (`API_URL`, `AUTH_DOMAIN`, `AUTH_CLIENT_ID`, `AUTH_CALLBACK`, `API_IDENTIFIER`, `LOGOUT_RETURN_URL`, `WEBPACK_MODE`) via webpack.

In production the `dist/` bundle is uploaded to S3 (see [Deployment](#deployment)). For local use there is also a Docker image (`node:20-slim` build stage compiles the app, then copies `dist/` into an `nginx:stable-alpine` image serving port 80) — this is what the backend's Docker Compose stack builds, passing the same config as build `ARG`s.

## Deployment

Deployed to AWS S3 + CloudFront via the **Deploy Frontends** GitHub Action (manual `workflow_dispatch`; choose `nonprod` or `prod`), which fans out to all three apps. The static hosting (one private S3 bucket `geekway-{env}-spa` with three prefixes, fronted by a CloudFront distribution) is provisioned by the CDK in [`ruleslawyer-infra`](https://github.com/geekwaytothewest/ruleslawyer-infra) — these apps no longer run as ECS/Fargate tasks. Each job builds the static bundle, runs `aws s3 sync dist/` into its bucket prefix, then issues a `aws cloudfront create-invalidation` for that prefix:

| App                | S3 prefix     | CloudFront behavior |
| ------------------ | ------------- | ------------------- |
| `board-game-admin` | `/admin`      | `/admin/*`          |
| `librarian`        | `/librarian`  | `/librarian/*`      |
| `play-prize-entry` | `/playandwin` | `/playandwin/*`     |

CloudFront serves the SPA prefixes from S3 and forwards `/api/*` and `/ruleslawyer/*` to the backend ALB. AWS access uses GitHub OIDC (the `geekway-{env}-github-deploy` role created by the CDK); the bucket name is deterministic but the distribution id is supplied as a secret (`CF_DISTRIBUTION_ID[_NONPROD]`). Auth0 callback/logout URLs and the API URL are baked into each bundle at build time. See the full guide in the infra repo: [ruleslawyer-infra/DEPLOYMENT.md](https://github.com/geekwaytothewest/ruleslawyer-infra/blob/main/DEPLOYMENT.md).

It is not currently possible to have the frontends access multiple running conventions from a single deployment. Each deployment of these frontends is specific to an individual convention. The base URL that points to `ruleslawyer-backend` uses path variables to assign an Organization Id and a Convention Id.

For example:
http://localhost:8080/api/legacy/org/1/con/1

## Stay in touch

- Contributors
  - [Joe Henderson](mailto:jjh456@gmail.com)
  - [Mattie Schraeder](mailto:mattie@geekway.com)
  - [Libby Swanger](mailto:libby.swanger@gmail.com)
- Website - [https://geekway.com](https://geekway.com/)

## License

Licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE).
