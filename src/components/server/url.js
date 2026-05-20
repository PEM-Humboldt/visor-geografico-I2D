// all external links and URL's
export const getGeoserverUrl = () => window.RUNTIME_CONFIG?.GEOSERVER_URL || 'https://geoservicios.humboldt.org.co/geoserver/';
export const getGeonetworkUrl = () => window.RUNTIME_CONFIG?.GEONETWORK_URL || 'https://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/';
export const getDataverseUrl = () => window.RUNTIME_CONFIG?.DATAVERSE_URL || 'https://doi.org/10.21068/';
export const getPythonServerUrl = () => window.RUNTIME_CONFIG?.PYTHONSERVER || 'https://api-v1s0r.humboldt.org.co/';

// UI links to be used in index.html via JS
export const getI2DHomeUrl = () => window.RUNTIME_CONFIG?.I2D_HOME_URL || 'http://datos.humboldt.org.co/';
export const getCeibaUrl = () => window.RUNTIME_CONFIG?.CEIBA_URL || 'http://i2d.humboldt.org.co/ceiba/';
export const getGeonetworkHomeUrl = () => window.RUNTIME_CONFIG?.GEONETWORK_HOME_URL || 'http://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/home';
export const getGuidesUrl = () => window.RUNTIME_CONFIG?.GUIDES_URL || 'https://sites.google.com/humboldt.org.co/i2dwiki/inicio';
export const getContactEmail = () => window.RUNTIME_CONFIG?.CONTACT_EMAIL || 'i2d@humboldt.org.co';
export const getHumboldtSiteUrl = () => window.RUNTIME_CONFIG?.HUMBOLDT_SITE_URL || 'http://www.humboldt.org.co';

// Base map and tile servers
export const getCartoDbPositronUrl = () => window.RUNTIME_CONFIG?.CARTODB_POSITRON_URL || 'http://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
export const getOtmTileUrl = () => window.RUNTIME_CONFIG?.OTM_TILE_URL || 'https://tile.opentopomap.org/{z}/{x}/{y}.png';
export const getWmflabsBwUrl = () => window.RUNTIME_CONFIG?.WMFLABS_BW_URL || 'https://api.maptiler.com/maps/toner-v2/256 /{z}/{x}/{y}.png?key=Ky7K1wE0D0jgsipnioH8';
export const getStamenTerrainUrl = () => window.RUNTIME_CONFIG?.STAMEN_TERRAIN_URL || 'https://tileserver.memomaps.de/tilegen /{z}/{x}/{y}.png';
export const getEsriWorldPhysicalUrl = () => window.RUNTIME_CONFIG?.ESRI_WORLD_PHYSICAL_URL || 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}';
export const getEsriWorldImageryUrl = () => window.RUNTIME_CONFIG?.ESRI_WORLD_IMAGERY_URL || 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

// Public base URL used to resolve asset URLs in generated PDFs
// Example: https://i2d.humboldt.org.co/visor-I2D/
export const getPdfAssetBaseUrl = () => window.RUNTIME_CONFIG?.PDF_ASSET_BASE_URL || window.location.origin;
