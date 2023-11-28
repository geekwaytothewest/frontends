# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

FROM node:20-slim as build

ARG API_URL
ARG AUTH_DOMAIN
ARG AUTH_CLIENT_ID
ARG AUTH_CALLBACK
ARG API_IDENTIFIER
ARG LOGOUT_RETURN_URL
ARG WEBPACK_MODE
ARG ALWAYS_OVERRIDE_LIMIT

WORKDIR /usr/src/app

COPY . .

RUN npm install

# Build the app
RUN npm run build:prod

# Run the application.
FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/prod/bundle.js /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

