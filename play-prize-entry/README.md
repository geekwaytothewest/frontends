# Play & Win Prize Entry

The guided flow for entering Play & Win plays: enter a badge number, choose the checkout, enter play info, review, and submit. Part of the [`frontends`](../README.md) repo.

- **Stack:** React 18 + React Router 6, bundled with webpack, served behind nginx in production
- **Local URL:** http://localhost:8083/legacy/playandwin
- **API:** the [`ruleslawyer-backend`](https://github.com/geekwaytothewest/ruleslawyer-backend), authenticated via Auth0

## Setup

```bash
npm install
```

Create an `.env` from `.env.template`. Variables: `API_URL`, `AUTH_DOMAIN`, `AUTH_CLIENT_ID`, `AUTH_CALLBACK`, `API_IDENTIFIER`, `WEBPACK_MODE`. See the [frontends README](../README.md#environment-variables) for what each means. (Unlike the admin and librarian apps, this one has no `LOGOUT_RETURN_URL`.)

## Run locally

```bash
npm run start
```

Starts the webpack dev server on port 8083 and opens `/legacy/playandwin/`.

## Build

```bash
# test build
npm run build:test

# production build
npm run build:prod
```

Output goes to `dist/`. The Docker image builds the app and serves `dist/` with nginx on port 80; Auth0/API config is passed at build time via Docker `ARG`s.
