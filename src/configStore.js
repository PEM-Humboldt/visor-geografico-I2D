
const runtimeConfig = (typeof window !== 'undefined' && window.APP_CONFIG) || {};

let privateVars = {
    GEOSERVER_URL: runtimeConfig.GEOSERVER_URL || process.env.GEOSERVER_URL,
    GEONETWORK_URL: runtimeConfig.GEONETWORK_URL || process.env.GEONETWORK_URL,
    DATAVERSE_URL: runtimeConfig.DATAVERSE_URL || process.env.DATAVERSE_URL,
    BIOLOGICO_URL: runtimeConfig.BIOLOGICO_URL || process.env.BIOLOGICO_URL,
    PYTHONSERVER: runtimeConfig.PYTHONSERVER || process.env.PYTHONSERVER,
    CARTODB_POSITRON_URL: runtimeConfig.CARTODB_POSITRON_URL || process.env.CARTODB_POSITRON_URL,
    OTM_TILE_URL: runtimeConfig.OTM_TILE_URL || process.env.OTM_TILE_URL,
    WMFLABS_BW_URL: runtimeConfig.WMFLABS_BW_URL || process.env.WMFLABS_BW_URL,
    STAMEN_TERRAIN_URL: runtimeConfig.STAMEN_TERRAIN_URL || process.env.STAMEN_TERRAIN_URL,
    ESRI_WORLD_PHYSICAL_URL: runtimeConfig.ESRI_WORLD_PHYSICAL_URL || process.env.ESRI_WORLD_PHYSICAL_URL,
    ESRI_WORLD_IMAGERY_URL: runtimeConfig.ESRI_WORLD_IMAGERY_URL || process.env.ESRI_WORLD_IMAGERY_URL,
    PDF_ASSET_BASE_URL: runtimeConfig.PDF_ASSET_BASE_URL || process.env.PDF_ASSET_BASE_URL,
    I2D_HOME_URL: runtimeConfig.I2D_HOME_URL || process.env.I2D_HOME_URL,
    CEIBA_URL: runtimeConfig.CEIBA_URL || process.env.CEIBA_URL,
    GEONETWORK_HOME_URL: runtimeConfig.GEONETWORK_HOME_URL || process.env.GEONETWORK_HOME_URL,
    GUIDES_URL: runtimeConfig.GUIDES_URL || process.env.GUIDES_URL,
    CONTACT_EMAIL: runtimeConfig.CONTACT_EMAIL || process.env.CONTACT_EMAIL,
    HUMBOLDT_SITE_URL: runtimeConfig.HUMBOLDT_SITE_URL || process.env.HUMBOLDT_SITE_URL,
};

export const updateConfig = (newConfig) => {
  privateVars = { ...privateVars, ...newConfig };
};

export const getConfig = () => privateVars; 
 