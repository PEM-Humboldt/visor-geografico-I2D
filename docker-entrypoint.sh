#!/bin/sh
set -e

HTDOCS_DIR="/usr/local/apache2/htdocs"
CONFIG_FILE="${HTDOCS_DIR}/config.js"
INDEX_FILE="${HTDOCS_DIR}/index.html"

PYTHONSERVER_VALUE="${PYTHONSERVER:-https://t4mpvisoge.humboldt.org.co/api/}"

cat > "${CONFIG_FILE}" <<EOF
window.APP_CONFIG = {
  PYTHONSERVER: "${PYTHONSERVER_VALUE}"
};
EOF

if ! grep -q 'config.js' "${INDEX_FILE}"; then
  sed -i 's|</head>|<script src="config.js"></script></head>|' "${INDEX_FILE}"
fi

exec httpd-foreground
