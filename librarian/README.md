# Librarian (Library Attendant Interface)

The web app a library attendant uses to help patrons check games in and out of the library, and to surface other information attendants need on the floor. Part of the [`frontends`](../README.md) repo.

- **Stack:** React 16.8 + React Router 5 + Redux, bundled with webpack, served behind nginx in production
- **Local URL:** http://localhost:8082/librarian
- **API:** the [`ruleslawyer-backend`](https://github.com/geekwaytothewest/ruleslawyer-backend), authenticated via Auth0

## Setup

```bash
npm install
```

Create an `.env` from `.env.template`. Variables: `API_URL`, `AUTH_DOMAIN`, `AUTH_CLIENT_ID`, `AUTH_CALLBACK`, `API_IDENTIFIER`, `LOGOUT_RETURN_URL`, `WEBPACK_MODE`, and `ALWAYS_OVERRIDE_LIMIT`. See the [frontends README](../README.md#environment-variables) for what each means.

`ALWAYS_OVERRIDE_LIMIT` is librarian-specific: when set, the app starts with the checkout override-limit toggle enabled.

## Run locally

```bash
npm run start
```

Port (8082) and the `/librarian/` route are configured in `webpack.common.js` (`devServer`), so no CLI flags are needed.

## Build

```bash
# test build
npm run build:test

# production build
npm run build:prod

# build all variants (test + prod + mm)
npm run build:all
```

Output goes to `dist/`. The Docker image builds the app and serves `dist/` with nginx on port 80; Auth0/API config is passed at build time via Docker `ARG`s.
