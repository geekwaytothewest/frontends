# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

FROM node:20 as build

WORKDIR /usr/src/app

# Copy the rest of the source files into the image.
COPY . .

RUN npm install

# Build the app
RUN npm run build:prod

# Run the application.
FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/prod /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

