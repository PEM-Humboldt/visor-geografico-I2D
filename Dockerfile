# --- Etapa de Construcción (Build stage) ---
FROM node:18.3.0 AS builder

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package.json package-lock.json /home/node/app/

RUN npm ci

COPY src/ src

RUN npm run build

# --- Etapa de Producción (Production stage) ---
FROM httpd:alpine AS production

RUN apk add --no-cache gettext dos2unix

# 1. Copiamos los archivos generados desde el builder al directorio que sirve Apache
COPY --from=builder /home/node/app/build/ /usr/local/apache2/htdocs/

# 2. Copiamos el template de la configuración a la misma carpeta
COPY config.json.template /usr/local/apache2/htdocs/config.json.template

# 3. Copiamos el entrypoint a la raíz y le damos permisos de ejecución
COPY docker-entrypoint.sh /docker-entrypoint.sh

# APLICAMOS LA MAGIA AQUÍ: Convertimos los saltos de línea a LF y damos permisos
RUN dos2unix /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh

# 4. Exponemos el puerto 80 (por defecto de httpd)
EXPOSE 80

# 5. Definimos el Entrypoint y el comando de arranque
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["httpd-foreground"]