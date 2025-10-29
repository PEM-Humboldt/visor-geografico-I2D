// all external links and URL's
export const GEOSERVER_URL = process.env.GEOSERVER_URL || 'https://geoservicios.humboldt.org.co/geoserver/';
export const GEONETWORK_URL = process.env.GEONETWORK_URL || 'https://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/';
export const DATAVERSE_URL = process.env.DATAVERSE_URL || 'https://doi.org/10.21068/';
export const PYTHONSERVER = process.env.PYTHONSERVER || 'https://api-v1s0r.humboldt.org.co/';

// UI links to be used in index.html via JS
export const I2D_HOME_URL = process.env.I2D_HOME_URL || 'http://datos.humboldt.org.co/';
export const CEIBA_URL = process.env.CEIBA_URL || 'http://i2d.humboldt.org.co/ceiba/';
export const GEONETWORK_HOME_URL = process.env.GEONETWORK_HOME_URL || 'http://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/home';
export const GUIDES_URL = process.env.GUIDES_URL || 'https://sites.google.com/humboldt.org.co/i2dwiki/inicio';
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'i2d@humboldt.org.co';
export const HUMBOLDT_SITE_URL = process.env.HUMBOLDT_SITE_URL || 'http://www.humboldt.org.co';

// Base map and tile servers
export const CARTODB_POSITRON_URL = process.env.CARTODB_POSITRON_URL || 'http://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
export const OTM_TILE_URL = process.env.OTM_TILE_URL || 'https://tile.opentopomap.org/{z}/{x}/{y}.png';
export const WMFLABS_BW_URL = process.env.WMFLABS_BW_URL || 'https://api.maptiler.com/maps/toner-v2/256 /{z}/{x}/{y}.png?key=Ky7K1wE0D0jgsipnioH8';
export const STAMEN_TERRAIN_URL = process.env.STAMEN_TERRAIN_URL || 'https://tileserver.memomaps.de/tilegen /{z}/{x}/{y}.png';
export const ESRI_WORLD_PHYSICAL_URL = process.env.ESRI_WORLD_PHYSICAL_URL || 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}';
export const ESRI_WORLD_IMAGERY_URL = process.env.ESRI_WORLD_IMAGERY_URL || 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

// Public base URL used to resolve asset URLs in generated PDFs
// Example: https://i2d.humboldt.org.co/visor-I2D/
export const PDF_ASSET_BASE_URL = process.env.PDF_ASSET_BASE_URL || '';
