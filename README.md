# Frontends

The web frontends for the Geekway to the West Rules Lawyer convention system. This repo contains three [React](https://react.dev/) single-page apps, each bundled with [webpack](https://webpack.js.org/) and served behind nginx in production. They talk to the [`ruleslawyer-backend`](https://github.com/geekwaytothewest/ruleslawyer-backend) API and authenticate via Auth0.

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

Builds output to `dist/`. The production Docker image (`node:20-slim` build stage) compiles the app, then copies `dist/` into an `nginx:stable-alpine` image that serves it on port 80. Auth0 and API configuration are passed at build time via Docker `ARG`s (`API_URL`, `AUTH_DOMAIN`, `AUTH_CLIENT_ID`, `AUTH_CALLBACK`, `API_IDENTIFIER`, `LOGOUT_RETURN_URL`, `WEBPACK_MODE`).

## Deployment

Deployed to AWS ECS via the **Deploy Frontends to ECS** GitHub Action (manual `workflow_dispatch`; choose `nonprod` or `prod`), which fans out to all three apps. Each builds a Docker image, pushes it to its ECR repo, and updates its ECS service on the `geekway-{env}` cluster:

| App                | ECR repo / ECS service   |
| ------------------ | ------------------------ |
| `board-game-admin` | `frontends-admin`        |
| `librarian`        | `frontends-librarian`    |
| `play-prize-entry` | `frontends-play-and-win` |

Auth0 callback/logout URLs and the API URL are baked into each bundle at build time. See the full guide in the backend repo: [ruleslawyer-backend/DEPLOYMENT.md](https://github.com/geekwaytothewest/ruleslawyer-backend/blob/main/DEPLOYMENT.md).

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
