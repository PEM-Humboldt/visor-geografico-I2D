
const runtimeConfig = (typeof window !== 'undefined' && window.APP_CONFIG) || {};

let privateVars = {
    GEOSERVER_URL: runtimeConfig.GEOSERVER_URL,
    GEONETWORK_URL: runtimeConfig.GEONETWORK_URL,
    DATAVERSE_URL: runtimeConfig.DATAVERSE_URL,
    BIOLOGICO_URL: runtimeConfig.BIOLOGICO_URL,
    PYTHONSERVER: runtimeConfig.PYTHONSERVER,
    CARTODB_POSITRON_URL: runtimeConfig.CARTODB_POSITRON_URL,
    OTM_TILE_URL: runtimeConfig.OTM_TILE_URL,
    WMFLABS_BW_URL: runtimeConfig.WMFLABS_BW_URL,
    STAMEN_TERRAIN_URL: runtimeConfig.STAMEN_TERRAIN_URL,
    ESRI_WORLD_PHYSICAL_URL: runtimeConfig.ESRI_WORLD_PHYSICAL_URL,
    ESRI_WORLD_IMAGERY_URL: runtimeConfig.ESRI_WORLD_IMAGERY_URL,
    PDF_ASSET_BASE_URL: runtimeConfig.PDF_ASSET_BASE_URL,
    I2D_HOME_URL: runtimeConfig.I2D_HOME_URL,
    CEIBA_URL: runtimeConfig.CEIBA_URL,
    GEONETWORK_HOME_URL: runtimeConfig.GEONETWORK_HOME_URL,
    GUIDES_URL: runtimeConfig.GUIDES_URL,
    CONTACT_EMAIL: runtimeConfig.CONTACT_EMAIL,
    HUMBOLDT_SITE_URL: runtimeConfig.HUMBOLDT_SITE_URL,
};

export const updateConfig = (newConfig) => {
  privateVars = { ...privateVars, ...newConfig };
};

export const getConfig = () => privateVars; 
 