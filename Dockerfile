# Build stage
FROM public.ecr.aws/docker/library/node:18.3.0-alpine3.15 AS builder

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
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# PYTHONSERVER se inyecta en runtime via docker-entrypoint.sh (genera config.js
# desde la variable de entorno PYTHONSERVER del contenedor).
ENV PYTHONSERVER=https://t4mpvisoge.humboldt.org.co/api/

EXPOSE 80
CMD ["/usr/local/bin/docker-entrypoint.sh"]
