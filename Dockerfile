FROM node:16-alpine as build

WORKDIR /app

COPY / .

RUN npm install

RUN npm run build

## copy to nginx
FROM nginx:latest

COPY --from=build /app/build /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000