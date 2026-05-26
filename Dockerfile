# --- Etapa de Construcción ---
FROM node:18.3.0 AS builder

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package.json package-lock.json /home/node/app/

RUN npm ci

COPY src/ src

RUN npm run build

# --- Etapa de Producción ---
FROM httpd:alpine AS production

RUN apk add --no-cache gettext

COPY --from=builder /home/node/app/build/ /usr/local/apache2/htdocs/

COPY config.json.template /usr/local/apache2/htdocs/config.json.template

COPY docker-entrypoint.sh /docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["httpd-foreground"]