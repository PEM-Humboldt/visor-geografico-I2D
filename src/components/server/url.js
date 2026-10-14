import { getConfig } from '../../configStore.js';

// all external links and URL's
export const GEOSERVER_URL = getConfig().GEOSERVER_URL || 'https://geoservicios.humboldt.org.co/geoserver/';
export const GEOGRAFICO_URL = getConfig().GEONETWORK_URL || 'https://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/';
export const BIOCULTURAL_URL = getConfig().DATAVERSE_URL || 'https://doi.org/10.21068/';
export const BIOLOGICO_URL = getConfig().BIOLOGICO_URL || 'https://i2d.humboldt.org.co/resource?r=';
export const PYTHONSERVER = getConfig().PYTHONSERVER || 'https://api-v1s0r.humboldt.org.co/';

// UI links to be used in index.html via JS
export const I2D_HOME_URL = getConfig().I2D_HOME_URL || 'http://datos.humboldt.org.co/';
export const CEIBA_URL = getConfig().CEIBA_URL || 'http://i2d.humboldt.org.co/ceiba/';
export const GEONETWORK_HOME_URL = getConfig().GEONETWORK_HOME_URL || 'http://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/home';
export const GUIDES_URL = getConfig().GUIDES_URL || 'https://sites.google.com/humboldt.org.co/i2dwiki/inicio';
export const CONTACT_EMAIL = getConfig().CONTACT_EMAIL || 'i2d@humboldt.org.co';
export const HUMBOLDT_SITE_URL = getConfig().HUMBOLDT_SITE_URL || 'http://www.humboldt.org.co';

// Base map and tile servers
export const CARTODB_POSITRON_URL = getConfig().CARTODB_POSITRON_URL || 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';
export const OTM_TILE_URL = getConfig().OTM_TILE_URL || 'https://tile.opentopomap.org/{z}/{x}/{y}.png';
export const WMFLABS_BW_URL = getConfig().WMFLABS_BW_URL || 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png';
export const STAMEN_TERRAIN_URL = getConfig().STAMEN_TERRAIN_URL || 'https://{a-c}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png';
export const ESRI_WORLD_PHYSICAL_URL = getConfig().ESRI_WORLD_PHYSICAL_URL || 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}';
export const ESRI_WORLD_IMAGERY_URL = getConfig().ESRI_WORLD_IMAGERY_URL || 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

// Public base URL used to resolve asset URLs in generated PDFs
// Example: https://i2d.humboldt.org.co/visor-I2D/
export const PDF_ASSET_BASE_URL = getConfig().PDF_ASSET_BASE_URL || window.location.origin;
