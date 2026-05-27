import { getConfig } from '../../configStore.js';

// all external links and URL's
export const getGeoserverUrl = () => getConfig().GEOSERVER_URL || 'https://geoservicios.humboldt.org.co/geoserver/';
export const getGeonetworkUrl = () => getConfig().GEONETWORK_URL || 'https://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/';
export const getDataverseUrl = () => getConfig().DATAVERSE_URL || 'https://doi.org/10.21068/';
export const getPythonServerUrl = () => getConfig().PYTHONSERVER || 'https://api-v1s0r.humboldt.org.co/';

// UI links to be used in index.html via JS
export const getI2DHomeUrl = () => getConfig().I2D_HOME_URL || 'http://datos.humboldt.org.co/';
export const getCeibaUrl = () => getConfig().CEIBA_URL || 'http://i2d.humboldt.org.co/ceiba/';
export const getGeonetworkHomeUrl = () => getConfig().GEONETWORK_HOME_URL || 'http://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/home';
export const getGuidesUrl = () => getConfig().GUIDES_URL || 'https://sites.google.com/humboldt.org.co/i2dwiki/inicio';
export const getContactEmail = () => getConfig().CONTACT_EMAIL || 'i2d@humboldt.org.co';
export const getHumboldtSiteUrl = () => getConfig().HUMBOLDT_SITE_URL || 'http://www.humboldt.org.co';

// Base map and tile servers
export const getCartoDbPositronUrl = () => getConfig().CARTODB_POSITRON_URL || 'http://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
export const getOtmTileUrl = () => getConfig().OTM_TILE_URL || 'https://tile.opentopomap.org/{z}/{x}/{y}.png';
export const getWmflabsBwUrl = () => getConfig().WMFLABS_BW_URL || 'https://api.maptiler.com/maps/toner-v2/256 /{z}/{x}/{y}.png?key=Ky7K1wE0D0jgsipnioH8';
export const getStamenTerrainUrl = () => getConfig().STAMEN_TERRAIN_URL || 'https://tileserver.memomaps.de/tilegen /{z}/{x}/{y}.png';
export const getEsriWorldPhysicalUrl = () => getConfig().ESRI_WORLD_PHYSICAL_URL || 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}';
export const getEsriWorldImageryUrl = () => getConfig().ESRI_WORLD_IMAGERY_URL || 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

// Public base URL used to resolve asset URLs in generated PDFs
// Example: https://i2d.humboldt.org.co/visor-I2D/
export const getPdfAssetBaseUrl = () => getConfig().PDF_ASSET_BASE_URL || window.location.origin;
