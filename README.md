# Visor-I2D
El visor geografico I2D es un proyecto que permite interactuar con un visor de información geográfica que contiene información de registros biologicos.

Este proyecto ha sido desarrollado por el [Instituto Humboldt](http://www.humboldt.org.co). El proyecto usa [Node.js](https://nodejs.org/) versión 15.3.0 y tecnologías web tales como HTML, Javascript y SCSS, junto a paquetes como [Jquery 3.5.1](https://jquery.com/), [Bootstrap 4.5.3](https://getbootstrap.com/), [fontawesome 5.15.1](https://fontawesome.com/), [OpenLayers 6.5.0](https://openlayers.org/) y [geoserver 2.11.2](http://geoserver.org/)

Esta es una version preliminar para actualizar el actual visor de la I2D.

Se implementarán nuevas funcionalidades y capas.

---

## Configuración inicial

### Instalación y ejecución

Debe tener instalado npm o yarn en su equipo local, para la instalación de paquetes y ejecución del proyecto. Clone el proyecto en su equipo e ingrese por línea de comandos al directorio del proyecto.

### 1.1. Clone el repositorio:

```
$ git clone https://github.com/PEM-Humboldt/visor-geografico-I2D.git
```

### 1.2. Instalación de paquetes:
Ejecute la siguiente sentencia para instalar las dependencias del proyecto:

    npm install

### 1.3. Configuración de entorno:
Antes de ejecutar el proyecto, configure las variables de entorno:

1. **Para desarrollo local**, cree un archivo `.env` basado en `.env.example`:
   ```bash
   cp .env.example .env
   ```

2. **Configure las URLs locales** en su archivo `.env`:
   ```bash
   NODE_ENV=development
   GEOSERVER_URL=http://localhost:8081/geoserver/
   PYTHONSERVER=http://localhost:8001/
   ```

### 1.4. Ejecución:
Ejecute una de las siguientes instrucciones:

- **Entorno de desarrollo** (usa .env personalizado):
    ```bash
    npm run dev
    ```

- **Entorno de pruebas** (usa .env.test):
    ```bash
    npm run dev:test
    ```

- **Entorno por defecto**:
    ```bash
    npm start
    ```

La instrucción iniciará el proyecto en su entorno local y se abrirá en el navegador en http://localhost:1234.

---

## Desarrollo con Docker

### 🐳 Configuración Docker

Este proyecto incluye soporte completo para desarrollo con Docker a través del repositorio principal `humboldt`. El contenedor Docker maneja automáticamente la configuración del entorno y las dependencias.

#### Archivos Docker:
- **`DockerfileDev`**: Contenedor de desarrollo con hot-reload
- **`.env`**: Variables de entorno personalizadas para desarrollo local
- **`.env.test`**: Variables de entorno para pruebas
- **`.env.example`**: Plantilla de configuración

#### Variables de entorno importantes:
```bash
# Configuración para desarrollo local
NODE_ENV=development
GEOSERVER_URL=http://localhost:8081/geoserver/
PYTHONSERVER=http://localhost:8001/

# URLs de servicios externos
GEONETWORK_URL=https://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/
DATAVERSE_URL=https://doi.org/10.21068/
```

### 🔧 Comandos Docker

Desde el directorio principal `humboldt/`:

```bash
# Construir el contenedor frontend
docker-compose build frontend

# Iniciar todos los servicios (incluye frontend)
docker-compose up -d

# Ver logs del frontend
docker-compose logs -f frontend

# Reiniciar solo el frontend
docker-compose restart frontend

# Entrar al contenedor frontend
docker exec -it visor_i2d_frontend bash
```

### 🌐 Puertos y URLs

| Servicio | Puerto | URL | Descripción |
|----------|--------|-----|-------------|
| **Frontend Dev** | 1234 | http://localhost:1234 | Servidor de desarrollo con hot-reload |
| **Frontend HMR** | 1235 | - | Hot Module Replacement |
| **Frontend Prod** | 8080 | http://localhost:8080 | Servidor de producción |

### ⚠️ Troubleshooting Docker

#### Error: Frontend conecta a servidores de prueba
Si ves errores `ERR_NAME_NOT_RESOLVED` con URLs como `test-geoserver.humboldt.org.co`:

**Causa**: El `DockerfileDev` estaba configurado para usar siempre `.env.test`

**Solución**: Ya corregido en la versión actual
- `DockerfileDev` ahora usa `COPY .env /home/node/app/.env`
- Comando cambiado de `npm run dev:test` a `npm run dev`

**Verificación**:
```bash
# Verificar que usa el comando correcto
docker logs visor_i2d_frontend --tail 5
# Debe mostrar: "npm run dev" (no "npm run dev:test")
```

#### Reconstruir después de cambios en .env
```bash
# Reconstruir y reiniciar
docker-compose build frontend
docker-compose down && docker-compose up -d
```

---

## Despliegue

### 2.1. Compilación del proyecto
Para desplegar el proyecto, ejecute la siguiente instrucción:
    
    npm run build

### 2.2. Despliegue

Para el caso de apache-tomcat:

- Copie la carpeta *build* en el directorio de despliegue según el servidor web seleccionado. Posteriormente inicie el servidor
```
/DIRECTORIO-APACHE-TOMCAT/webapps/
```
- Inicie el servicio de tomcat
```
/DIRECTORIO-APACHE-TOMCAT/bin/startup.sh
```

### 2.3. Precondición

- Es necesario tener funcional tanto el [backend](https://github.com/PEM-Humboldt/visor-geografico-I2D-backend) para las funcionalidades, como el [geoserver](http://34.231.25.67:8080/geoserver/web/) en el servicio de capas. 

Para la correcta ejecución de las funcionalidades del frontend, la siguiente ruta contiene dichas conexiones externas
```
 src/components/server/url
```

---

## Despliegue usando docker

Alternativamente puede desplegar usando contenedores de docker. Primero construya la imagen:

`docker build -t visor:i2d:1.0.0 .`

Detenga el contenedor:

`docker stop visor_i2d`

Borre el contenedor antiguo:

`docker rm visor_i2d`

Después levante el contenedor:

`docker run --name=visor_i2d --network=i2d.net -d visor-i2d:1.0.0`

---

## Configuración de variables y entorno

A partir de ahora, las URLs se pueden configurar mediante variables de entorno. Hay un archivo de ejemplo (.env.example) y un archivo para pruebas (.env.test).

- Variables disponibles:
  - GEOSERVER_URL
  - GEONETWORK_URL
  - DATAVERSE_URL
  - PYTHONSERVER
  - CARTODB_POSITRON_URL
  - OTM_TILE_URL
  - WMFLABS_BW_URL
  - STAMEN_TERRAIN_URL
  - ESRI_WORLD_PHYSICAL_URL
  - ESRI_WORLD_IMAGERY_URL
  - PDF_ASSET_BASE_URL (opcional; URL base pública para resolver imágenes en PDFs)

- Ubicación central de configuración en código:
  ```
  src/components/server/url.js
  ```

### Entornos
- Desarrollo local (por defecto):
  - Ejecuta:
    ```
    npm run dev
    ```
- Pruebas (usa .env.test):
  - Ejecuta:
    ```
    npm run dev:test
    ```
- Compilación para despliegue:
  - Producción por defecto:
    ```
    npm run build
    ```
  - Pruebas (inyecta .env.test):
    ```
    npm run build:test
    ```

Nota: Parcel resuelve process.env.* en tiempo de compilación. Los scripts :test usan dotenv-cli para cargar .env.test.

---

## Endpoints principales del backend

El visor consume los siguientes endpoints del backend:

- **Descarga masiva de datos en ZIP:**  
  `GET /api/gbif/descargar-zip/?codigo_mpio=<codigo>&nombre=<nombre>`  
  `GET /api/gbif/descargar-zip/?codigo_dpto=<codigo>&nombre=<nombre>`  
  Devuelve un archivo ZIP con los registros y el listado de especies filtrados por municipio o departamento.

- **Consulta de información GBIF:**  
  `GET /api/gbif/gbifinfo`  
  Devuelve información general de registros biológicos.

Para más detalles sobre los endpoints y parámetros, consulta la documentación del backend:  
[visor-geografico-I2D-backend](https://github.com/PEM-Humboldt/visor-geografico-I2D-backend)

---

## Buenas prácticas implementadas

- Separación de lógica entre frontend y backend.
- El backend genera los archivos ZIP y el frontend solo los solicita.
- Nombres de archivos personalizados en las descargas.
- Uso de variables de entorno/configuración para URLs.
- Validación básica de parámetros en el backend.
- Código limpio y dependencias innecesarias eliminadas.

---

## Recomendaciones de seguridad

- No subas archivos sensibles (contraseñas, claves, .env) al repositorio.
- Usa `.gitignore` para excluir carpetas como `node_modules`, archivos temporales y configuraciones locales.
- Revisa y documenta los endpoints expuestos por el backend.

---

## Autores

* **Julián David Torres Caicedo** - *Creación del sitio* - [juliant8805](https://github.com/juliant8805)
* **Liceth Barandica Diaz** - *Creación del sitio* - [licethbarandicadiaz](https://github.com/licethbarandicadiaz)

Ingeniería de Datos y Desarrollo, Programa de Evaluación y Monitoreo de la Biodiversidad, Instituto Alexander von Humboldt Colombia

---

## Licencia

Este proyecto es licenciado bajo licencia MIT - consulte [LICENSE.md](LICENSE.md) para mas detalles
