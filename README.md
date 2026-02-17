# Frontend Visor-I2D

[![Node.js](https://img.shields.io/badge/Node.js-15.3.0-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![OpenLayers](https://img.shields.io/badge/OpenLayers-6.5.0-1F6B75?style=flat&logo=openlayers&logoColor=white)](https://openlayers.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-4.5.3-7952B3?style=flat&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![jQuery](https://img.shields.io/badge/jQuery-3.5.1-0769AD?style=flat&logo=jquery&logoColor=white)](https://jquery.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker&logoColor=white)](https://docs.docker.com/)

El Frontend del Visor Geográfico I2D es una aplicación web interactiva que proporciona una interfaz moderna y funcional para la visualización de datos de biodiversidad. Desarrollado con tecnologías web estándar y OpenLayers, ofrece mapas interactivos, búsqueda geográfica y gestión dinámica de proyectos.

**Desarrollado por el [Instituto Alexander von Humboldt Colombia](http://www.humboldt.org.co)**
*Programa de Evaluación y Monitoreo de la Biodiversidad*

## 🚀 Estado Actual del Sistema

### ✅ **COMPLETAMENTE FUNCIONAL**
- **Mapas Interactivos**: OpenLayers 6.5.0 con controles de zoom y navegación completos
- **Búsqueda Geográfica**: Sistema de búsqueda de municipios con dropdown interactivo
- **Proyectos Dinámicos**: Cambio de proyecto vía URL sin recarga de página
- **Controles de Mapa**: Botones de zoom in, zoom out y extensión completa operativos
- **Integración Backend**: Conectividad completa con APIs REST
- **Variables de Entorno**: Configuración flexible para desarrollo y producción
- **Docker Support**: Contenedorización completa con hot-reload

## 📋 Características Principales

- **🗺️ Mapas Interactivos**: OpenLayers con controles completos de navegación y zoom
- **🔍 Búsqueda Inteligente**: Sistema de búsqueda de municipios con navegación automática
- **📊 Proyectos Dinámicos**: Gestión de proyectos configurable sin cambios de código
- **📱 Diseño Responsivo**: Bootstrap 4.5.3 con soporte para múltiples dispositivos
- **🎨 UI Moderna**: FontAwesome 5.15.1 e interfaz intuitiva
- **🔧 Hot Reload**: Desarrollo con recarga automática usando Parcel
- **🌐 Multi-entorno**: Configuración flexible para desarrollo, pruebas y producción

## 🛠️ Stack Tecnológico

### Frontend Core
- **Node.js**: 15.3.0
- **Build Tool**: Parcel 1.12.4 con hot-reload
- **JavaScript**: Vanilla JS + jQuery 3.5.1
- **CSS Framework**: Bootstrap 4.5.3 + SCSS personalizado

### Mapas y Visualización
- **OpenLayers**: 6.5.0 para mapas interactivos
- **GeoServer**: Integración con capas WMS
- **Proyecciones**: Soporte EPSG:3857 y EPSG:4326

### UI/UX
- **Icons**: FontAwesome 5.15.1
- **Responsive**: Bootstrap grid system
- **Components**: 45+ componentes modulares en `src/components/`

---

## 📋 Configuración Inicial

### Prerrequisitos
- **Node.js**: 15.3.0+ (recomendado usar nvm)
- **npm**: 6.0+ o yarn
- **Docker**: Para desarrollo con contenedores (opcional)

### Instalación y Ejecución

Clone el proyecto e instale las dependencias:

### 1.1. Clone el repositorio:

```
$ git clone https://github.com/PEM-Humboldt/visor-geografico-I2D.git
```

### 1.2. Instalación de paquetes:
Ejecute la siguiente sentencia para instalar las dependencias del proyecto:

    npm install

### 1.3. Configuración de Entorno

**Variables de entorno críticas para funcionamiento:**

1. **Crear archivo de configuración**:
   ```bash
   cp .env.example .env
   ```

2. **Configurar URLs de servicios locales**:
   ```bash
   NODE_ENV=development
   GEOSERVER_URL=http://localhost:8081/geoserver/
   PYTHONSERVER=http://localhost:8001/api/
   
   # URLs de mapas base
   CARTODB_POSITRON_URL=https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png
   OTM_TILE_URL=https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png
   
   # URLs de servicios externos
   GEONETWORK_URL=https://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/
   DATAVERSE_URL=https://doi.org/10.21068/
   ```

3. **Variables importantes**:
   - `GEOSERVER_URL`: Servidor de mapas (capas WMS)
   - `PYTHONSERVER`: Backend Django con APIs REST
   - `PDF_ASSET_BASE_URL`: Base URL para recursos en PDFs (opcional)

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

#### ✅ Error Resuelto: Frontend conecta a servidores de prueba
**Problema**: Errores `ERR_NAME_NOT_RESOLVED` con URLs como `test-geoserver.humboldt.org.co`

**Solución Implementada**:
- `DockerfileDev` corregido para usar `COPY .env /home/node/app/.env`
- Comando cambiado de `npm run dev:test` a `npm run dev`
- Frontend ahora usa configuración local correctamente

**Verificación**:
```bash
# Verificar comando correcto
docker logs visor_i2d_frontend --tail 5
# Debe mostrar: "npm run dev"

# Verificar conectividad local
curl http://localhost:1234/
```

#### ✅ Error Resuelto: Protobuf serialization
**Problema**: Error "invalid uint 32: -13" en parent_injection.js

**Solución Implementada**:
- Archivo `.env` restaurado con variables requeridas
- Procesos Parcel reiniciados correctamente
- Variables de entorno validadas

#### Reconstruir después de cambios
```bash
# Reconstruir y reiniciar
docker-compose build frontend
docker-compose down && docker-compose up -d

# Verificar logs
docker-compose logs -f frontend
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

`docker build -t visor-i2d:1.1.0 .`

Detenga el contenedor:

`docker stop visor_i2d`

Borre el contenedor antiguo:

`docker rm visor_i2d`

Después levante el contenedor:

`docker run --name=visor_i2d --network=i2d.net -p 3000:80 -d visor-i2d:1.1.0`

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

## 🌐 Integración con Backend

### 📡 APIs Consumidas

El frontend consume las siguientes APIs del backend Django:

#### 🔍 Búsqueda Geográfica
```javascript
// Búsqueda de municipios implementada
GET /api/mpio/search/<término>/
// Ejemplo: /api/mpio/search/medellin
// Retorna: [{codigo, nombre, coordenadas}]
```

#### 📊 Gestión de Proyectos
```javascript
// Sistema dinámico de proyectos
GET /api/projects/                    // Lista todos los proyectos
GET /api/projects/HU-VisorI2D-0001/   // Proyecto específico

// Cambio de proyecto vía URL
window.location = '/?proyecto=HU-VisorI2D-0001'
```

#### 🗺️ Datos Geográficos
```javascript
GET /api/dpto/          // Lista departamentos con geometrías
GET /api/mpio/          // Lista municipios con geometrías
```

#### 🐛 Datos GBIF
```javascript
GET /api/gbif/gbifinfo                           // Información general
GET /api/gbif/descargar-zip/?codigo_mpio=<code>  // Descarga por municipio
GET /api/gbif/descargar-zip/?codigo_dpto=<code>  // Descarga por departamento
```

### 🔧 Configuración de Conectividad

La configuración de URLs se centraliza en:
```
src/components/server/url.js
```

**Variables de entorno críticas**:
- `PYTHONSERVER`: Backend Django (http://localhost:8001/api/)
- `GEOSERVER_URL`: Servidor de mapas (http://localhost:8081/geoserver/)

Para más detalles: [Backend Documentation](https://github.com/maccevedor/visor-geografico-I2D-backend)

---

## 🎯 Funcionalidades Implementadas

### ✅ **Características Completamente Funcionales**

#### 🗺️ **Controles de Mapa Restaurados**
- **Zoom In (+)**: Botón funcional con posicionamiento correcto
- **Zoom Out (-)**: Botón funcional con posicionamiento correcto  
- **Full Extent (⛶)**: Botón de extensión completa operativo
- **CSS Optimizado**: Posicionamiento `left: 0.5em` con `display: block !important`

#### 🔍 **Sistema de Búsqueda Completo**
- **Dropdown Interactivo**: Elementos `<a>` clickeables con `data-coord`
- **Navegación Automática**: Click en resultado navega automáticamente al municipio
- **Manejo de Eventos**: Event delegation con `$('#dropdown-items').on('click', '.dropdown-item')`
- **Prevención de Duplicados**: Inicialización con guard para evitar múltiples handlers

#### 📊 **Gestión Dinámica de Proyectos**
- **Carga Sin Código**: Nuevos proyectos configurables vía base de datos
- **Cambio de Contexto**: URL parameter `?proyecto=` para switching
- **Inicialización Asíncrona**: `waitForMap()` polling para timing correcto
- **Manejo de Errores**: Null checks y fallbacks robustos

#### 🔧 **Correcciones JavaScript Críticas**
- **Referencias Nulas**: Eliminadas con null checks comprehensivos
- **Conflictos de Funciones**: Resueltos (attachMapEvents, getCenter)
- **Timing de DOM**: DOMContentLoaded handling mejorado
- **Imports/Exports**: Compatibilidad CommonJS para OpenLayers

### 🛠️ **Arquitectura de Componentes**

Estructura modular en `src/components/`:
```
src/components/
├── mapComponent/
│   ├── map.js              # Inicialización estática
│   └── dynamicMap.js       # Carga dinámica de proyectos
├── services/
│   └── projectService.js   # Servicios de API
└── server/
    └── url.js              # Configuración de URLs
```

---

## 🔒 Seguridad y Mejores Prácticas

### ✅ **Implementadas**
- **Separación de Responsabilidades**: Frontend/Backend claramente definidos
- **Variables de Entorno**: Configuración sensible externalizada
- **Validación de Entrada**: Parámetros validados en backend
- **CORS Configurado**: Headers apropiados para cross-origin requests
- **Gitignore Completo**: Archivos sensibles excluidos (`.env`, `node_modules`)

### 🔐 **Recomendaciones de Seguridad**
- ✅ Archivo `.env` en `.gitignore`
- ✅ URLs de servicios configurables
- ✅ Sin credenciales hardcodeadas
- ✅ Validación de parámetros en backend
- ✅ HTTPS en producción (configurado en variables)

### 📋 **Estándares de Código**
- **JavaScript**: ESLint compatible
- **CSS/SCSS**: BEM methodology en componentes
- **Commits**: Conventional commits
- **Documentación**: JSDoc en funciones críticas

---

## 🔄 Changelog Reciente

### ✅ Versión Actual (2025-08-28)

#### 🎯 **Funcionalidades Críticas Restauradas**:
- **Controles de Mapa**: Zoom in/out y full extent completamente funcionales
- **Búsqueda Geográfica**: Sistema completo con navegación automática
- **Proyectos Dinámicos**: Gestión sin cambios de código implementada
- **Integración Backend**: APIs REST completamente funcionales

#### 🐛 **Errores JavaScript Eliminados**:
- **Null References**: Checks comprehensivos implementados
- **Function Conflicts**: Naming collisions resueltos
- **DOM Timing**: DOMContentLoaded handling optimizado
- **Event Delegation**: Click handlers corregidos

#### 🔧 **Mejoras de Desarrollo**:
- **Docker Environment**: Variables de entorno corregidas
- **Hot Reload**: Parcel funcionando correctamente
- **Error Handling**: Fallbacks robustos implementados
- **Code Organization**: Estructura modular mejorada

#### 🌐 **Integración Completa**:
- **GeoServer**: Conectividad WMS restaurada
- **Backend APIs**: Todos los endpoints funcionales
- **Map Layers**: Carga correcta de capas geográficas
- **Search System**: Búsqueda con coordenadas operativa

---

## 🤝 Contribución

### 👥 Equipo de Desarrollo

- **Julián David Torres Caicedo** - *Desarrollo Frontend* - [juliant8805](https://github.com/juliant8805)
- **Liceth Barandica Diaz** - *Desarrollo Frontend* - [licethbarandicadiaz](https://github.com/licethbarandicadiaz)
- **Daniel López** - *DevOps y Despliegue* - [danflop](https://github.com/danflop)

### 📝 Cómo Contribuir

1. Fork el repositorio
2. Crear rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Desarrollar con hot-reload: `npm run dev`
4. Probar en múltiples entornos
5. Commit siguiendo Conventional Commits
6. Push y crear Pull Request

### 🧪 Testing y Verificación

```bash
# Desarrollo local
npm run dev
# Verificar: http://localhost:1234

# Build de producción
npm run build

# Verificar funcionalidades críticas
# ✅ Controles de mapa visibles y funcionales
# ✅ Búsqueda de municipios operativa
# ✅ Cambio de proyectos vía URL
# ✅ Carga de capas desde GeoServer
```

---

## 📞 Soporte

### 🏢 Instituto Alexander von Humboldt Colombia
- **Programa**: Evaluación y Monitoreo de la Biodiversidad
- **Área**: Ingeniería de Datos y Desarrollo
- **Website**: [http://www.humboldt.org.co](http://www.humboldt.org.co)

### 🐛 Reportar Issues
- **GitHub**: [Reportar problema](https://github.com/maccevedor/visor-geografico-I2D/issues)
- **Funcionalidades**: Verificar con `npm run dev` antes de reportar

### 📚 Recursos Técnicos
- [OpenLayers Documentation](https://openlayers.org/en/latest/doc/)
- [Bootstrap 4 Documentation](https://getbootstrap.com/docs/4.5/)
- [Parcel Documentation](https://parceljs.org/)

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulte [LICENSE.md](LICENSE.md) para más detalles.

---

<div align="center">

**🌱 Desarrollado con ❤️ para la conservación de la biodiversidad colombiana**

[![Instituto Humboldt](https://img.shields.io/badge/Instituto-Humboldt-green?style=for-the-badge)](http://www.humboldt.org.co)

</div>
