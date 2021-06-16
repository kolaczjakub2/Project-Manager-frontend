FROM node:15.9.0-alpine3.13 as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:1.19.7-alpine
COPY --from=build-step /app/dist/front /usr/share/nginx/html


