# --- Etapa de Construcción (Build stage) ---
# Usamos alpine también aquí para descargar la imagen más rápido
FROM node:18-alpine AS builder

WORKDIR /app

# Copiamos los archivos de dependencias primero para aprovechar el caché de Docker
COPY package.json package-lock.json ./

# npm ci es excelente para instalaciones limpias en CI/CD
RUN npm ci

# Copiamos el resto del código
COPY . .

# Ejecutamos el build de Parcel. Los archivos quedarán en /app/build
RUN npm run build


# --- Etapa de Producción (Production stage) ---
# Usamos httpd:alpine (Apache HTTP). Es ligero y ya trae envsubst instalado.
FROM httpd:alpine AS production

RUN apk add --no-cache gettext

# 1. Copiamos los archivos generados desde el builder al directorio que sirve Apache
COPY --from=builder /app/build/ /usr/local/apache2/htdocs/

# 2. Copiamos el template de la configuración a la misma carpeta
COPY config.json.template /usr/local/apache2/htdocs/config.json.template

# 3. Copiamos el entrypoint a la raíz y le damos permisos de ejecución
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# 4. Exponemos el puerto 80 (por defecto de httpd)
EXPOSE 80

# 5. Definimos el Entrypoint y el comando de arranque
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["httpd-foreground"]