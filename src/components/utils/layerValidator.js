/**
 * Layer Validation Utilities
 * Check if layers exist on GeoServer before creating them
 */

import { GEOSERVER_URL } from '../server/url.js';

/**
 * Cache for layer existence checks
 */
const layerExistenceCache = new Map();

/**
 * Check if a layer exists on GeoServer
 * @param {string} store - GeoServer store name
 * @param {string} layerName - Layer name
 * @returns {Promise<boolean>} True if layer exists
 */
export const checkLayerExists = async (store, layerName) => {
    const cacheKey = `${store}:${layerName}`;
    
    // Check cache first
    if (layerExistenceCache.has(cacheKey)) {
        return layerExistenceCache.get(cacheKey);
    }
    
    try {
        // Try a simple GetCapabilities request to check if layer exists
        const capabilitiesUrl = `${GEOSERVER_URL}${store}/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities`;
        
        const response = await fetch(capabilitiesUrl);
        if (!response.ok) {
            console.warn(`GetCapabilities failed for store ${store}: ${response.status}`);
            layerExistenceCache.set(cacheKey, false);
            return false;
        }
        
        const capabilitiesText = await response.text();
        const layerExists = capabilitiesText.includes(`<Name>${store}:${layerName}</Name>`) || 
                           capabilitiesText.includes(`<Name>${layerName}</Name>`);
        
        layerExistenceCache.set(cacheKey, layerExists);
        
        if (!layerExists) {
            console.warn(`Layer ${layerName} not found in store ${store}`);
        }
        
        return layerExists;
        
    } catch (error) {
        console.error(`Error checking layer existence for ${store}:${layerName}:`, error);
        layerExistenceCache.set(cacheKey, false);
        return false;
    }
};

/**
 * Validate a batch of layers
 * @param {Array} layerConfigs - Array of layer configurations
 * @returns {Promise<Array>} Array of valid layer configurations
 */
export const validateLayers = async (layerConfigs) => {
    const validLayers = [];
    
    for (const config of layerConfigs) {
        const exists = await checkLayerExists(config.store_geoserver, config.nombre_geoserver);
        if (exists) {
            validLayers.push(config);
        } else {
            console.warn(`Skipping invalid layer: ${config.nombre_display} (${config.store_geoserver}:${config.nombre_geoserver})`);
        }
    }
    
    return validLayers;
};

/**
 * Clear the layer existence cache
 */
export const clearLayerCache = () => {
    layerExistenceCache.clear();
    console.log('Layer existence cache cleared');
};