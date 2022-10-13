# Build stage
FROM node:18.3.0 AS builder

USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package.json /home/node/app
COPY src/ src
RUN npm install
RUN npm run build

# Production stage
FROM httpd:latest AS production

COPY --from=builder /home/node/app/build/ /usr/local/apache2/htdocs/
EXPOSE 80
CMD ["httpd-foreground"]
