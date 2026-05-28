# Board Game Admin

Administrative interface for the Geekway to the West Rules Lawyer system — manage games, collections, and attendees. Part of the [`frontends`](../README.md) repo.

- **Stack:** React 16.8 + React Router 5, bundled with webpack, served behind nginx in production
- **Local URL:** http://localhost:8081/admin
- **API:** the [`ruleslawyer-backend`](https://github.com/geekwaytothewest/ruleslawyer-backend), authenticated via Auth0

## Setup

```bash
npm install
```

Create an `.env` from `.env.template`. Variables: `API_URL`, `AUTH_DOMAIN`, `AUTH_CLIENT_ID`, `AUTH_CALLBACK`, `API_IDENTIFIER`, `LOGOUT_RETURN_URL`, `WEBPACK_MODE`. See the [frontends README](../README.md#environment-variables) for what each means.

## Run locally

```bash
npm run start
```

Starts the webpack dev server on port 8081 and opens `/admin/`.

## Build

```bash
# test build
npm run build:test

# production build
npm run build:prod
```

Output goes to `dist/`. The Docker image builds the app and serves `dist/` with nginx on port 80; Auth0/API config is passed at build time via Docker `ARG`s.
