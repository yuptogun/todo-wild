# b uild
FROM node:alpine AS b
WORKDIR /app
COPY . .
RUN npm i && npm run build

# a pplication
FROM nginx:alpine AS a
COPY --from=b /app/dist /usr/share/nginx/html