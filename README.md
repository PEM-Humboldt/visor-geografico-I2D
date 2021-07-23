# Visor-I2D
El visor geografico I2D es un proyecto que permite interactuar con un visor de información geográfica que contiene información de registros biologicos.

Este proyecto ha sido desarrollado por el [Instituto Humboldt](http://www.humboldt.org.co). El proyecto usa [Node.js](https://nodejs.org/) versión 15.3.0 y tecnologías web tales como HTML, Javascript y SCSS, junto a paquetes como [Jquery 3.5.1](https://jquery.com/), [Bootstrap 4.5.3](https://getbootstrap.com/), [fontawesome 5.15.1](https://fontawesome.com/), [OpenLayers 6.5.0](https://openlayers.org/) y [geoserver 2.11.2](http://geoserver.org/)

Esta es una version preliminar para actualizar el actual visor de la I2D.

Se implementarán nuevas funcionalidades y capas.

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

### 1.3. Ejecución:
Ejecute la siguiente instrucción:

    npm start

La instrucción iniciará el proyecto en su entorno local y se abrirá en el navegador.


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

## Autores

* **Julián David Torres Caicedo** - *Creación del sitio* - [juliant8805](https://github.com/juliant8805)
* **Liceth Barandica Diaz** - *Creación del sitio* - [licethbarandicadiaz](https://github.com/licethbarandicadiaz)

Ingeniería de Datos y Desarrollo, Programa de Evaluación y Monitoreo de la Biodiversidad, Instituto Alexander von Humboldt Colombia

## Licencia

Este proyecto es licenciado bajo licencia MIT - consulte [LICENSE.md](LICENSE.md) para mas detalles