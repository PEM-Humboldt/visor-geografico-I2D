#!/bin/sh

set -e

echo "Creando config.json..."

envsubst < /usr/local/apache2/htdocs/config.json.template \
         > /usr/local/apache2/htdocs/config.json

echo "Archivo config.json generado:"

cat /usr/local/apache2/htdocs/config.json

exec "$@"
