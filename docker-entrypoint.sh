#!/bin/sh
set -e

HTDOCS_DIR="/usr/local/apache2/htdocs"
TEMPLATE_FILE="${HTDOCS_DIR}/config.js.template"
CONFIG_FILE="${HTDOCS_DIR}/config.js"
INDEX_FILE="${HTDOCS_DIR}/index.html"

envsubst < "${TEMPLATE_FILE}" > "${CONFIG_FILE}"

if ! grep -q 'config.js' "${INDEX_FILE}"; then
  sed -i 's|</head>|<script src="config.js"></script></head>|' "${INDEX_FILE}"
fi

exec httpd-foreground
