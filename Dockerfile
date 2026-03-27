# Build stage
FROM node:18.3.0 AS builder

USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package.json /home/node/app
COPY --chown=1000:1000 package-lock.json /home/node/app
RUN --mount=type=cache,target=/home/node/.npm,uid=1000,gid=1000 npm ci
COPY .env /home/node/app/.env
COPY src/ src
RUN npm run build

# Production stage
FROM httpd:latest AS production

COPY --from=builder /home/node/app/build/ /usr/local/apache2/htdocs/
EXPOSE 80
CMD ["httpd-foreground"]
