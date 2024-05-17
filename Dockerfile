# b uild
FROM node:alpine AS b
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

# a pplication
FROM lscr.io/linuxserver/nginx:latest AS a
COPY --from=b /app/dist /config/www