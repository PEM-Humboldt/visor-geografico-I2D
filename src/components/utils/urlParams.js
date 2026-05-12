/**
 * URL Parameter Handler for Dynamic Layer Loading
 * Handles URL parameters like ?capa=aicas to automatically load specific layers
 */

// Note: Avoiding circular imports by accessing map instance through global reference

/**
 * Transform extent from WGS84 (EPSG:4326) to Web Mercator (EPSG:3857)
 * @param {Array} extent - [minLon, minLat, maxLon, maxLat]
 * @returns {Array} Transformed extent [minX, minY, maxX, maxY]
 */
function transformExtent(extent) {
  const [minLon, minLat, maxLon, maxLat] = extent;

  // Transform coordinates from EPSG:4326 to EPSG:3857
  const minX = minLon * 20037508.34 / 180;
  const maxX = maxLon * 20037508.34 / 180;

  let minY = Math.log(Math.tan((90 + minLat) * Math.PI / 360)) / (Math.PI / 180);
  minY = minY * 20037508.34 / 180;

  let maxY = Math.log(Math.tan((90 + maxLat) * Math.PI / 360)) / (Math.PI / 180);
  maxY = maxY * 20037508.34 / 180;

  return [minX, minY, maxX, maxY];
}

/**
 * Get URL parameters from current URL
 * @returns {URLSearchParams} URL search parameters
 */
export const getURLParams = () => {
    return new URLSearchParams(window.location.search);
};

/**
 * Get specific parameter value from URL
 * @param {string} param - Parameter name
 * @returns {string|null} Parameter value or null if not found
 */
export const getURLParam = (param) => {
    const urlParams = getURLParams();
    return urlParams.get(param);
};

/**
 * Set URL parameter without reloading the page
 * @param {string} param - Parameter name
 * @param {string} value - Parameter value
 */
export const setURLParam = (param, value) => {
    const url = new URL(window.location);
    url.searchParams.set(param, value);
    window.history.pushState({}, '', url);
};

/**
 * Remove URL parameter without reloading the page
 * @param {string} param - Parameter name
 */
export const removeURLParam = (param) => {
    const url = new URL(window.location);
    url.searchParams.delete(param);
    window.history.pushState({}, '', url);
};

/**
 * Get the layer group from the global map instance
 * @returns {Object|null} Layer group or null
 */
const getMapLayerGroup = () => {
    // Access map through window global or DOM
    if (window.mapInstance && window.mapInstance.getLayerGroup) {
        return window.mapInstance.getLayerGroup();
    }
    return null;
};

/**
 * Find layer by name in a layer group (recursive)
 * @param {Object} layerGroup - Layer group to search
 * @param {string} property - Property name to match
 * @param {string} value - Value to match
 * @returns {Object|null} Found layer or null
 */
const findLayerByProperty = (layerGroup, property, value) => {
    if (!layerGroup || !layerGroup.getLayers) return null;

    const layers = layerGroup.getLayers().getArray();
    for (const layer of layers) {
        // Check if this layer matches
        if (layer.get(property) === value) {
            return layer;
        }

        // Recursively search in sublayers if this is a group
        if (layer.getLayers) {
            const found = findLayerByProperty(layer, property, value);
            if (found) return found;
        }
    }
    return null;
};

/**
 * Find layer by geoserver name across all layer groups
 * @param {string} layerName - GeoServer layer name to find
 * @returns {Object|null} Found layer or null
 */
const findLayerByGeoserverName = (layerName) => {
    const layerGroup = getMapLayerGroup();
    if (!layerGroup) return null;

    return findLayerByProperty(layerGroup, 'geoserverName', layerName) ||
           findLayerByProperty(layerGroup, 'name', layerName);
};

/**
 * Find layer by display name across all layer groups
 * @param {string} displayName - Display name to find
 * @returns {Object|null} Found layer or null
 */
const findLayerByDisplayName = (displayName) => {
    const layerGroup = getMapLayerGroup();
    if (!layerGroup) return null;

    return findLayerByProperty(layerGroup, 'title', displayName) ||
           findLayerByProperty(layerGroup, 'displayName', displayName);
};

/**
 * Activate a layer by name (either geoserver name or display name)
 * @param {string} layerName - Layer name to activate
 * @returns {boolean} True if layer was found and activated
 */
export const activateLayer = (layerName) => {
    if (!layerName) return false;

    // Decode URL-encoded layer name (handles %C3%B3 -> ó, etc.)
    const decodedLayerName = decodeURIComponent(layerName);

    // First try to find by geoserver name (both encoded and decoded)
    let layer = findLayerByGeoserverName(layerName);
    if (!layer && decodedLayerName !== layerName) {
        layer = findLayerByGeoserverName(decodedLayerName);
    }

    // If not found, try by display name
    if (!layer) {
        layer = findLayerByDisplayName(layerName);
    }
    if (!layer && decodedLayerName !== layerName) {
        layer = findLayerByDisplayName(decodedLayerName);
    }

    if (layer) {
        // Set layer visible
        layer.setVisible(true);

        // Force refresh the layer source to ensure it renders
        const source = layer.getSource();
        if (source && typeof source.refresh === 'function') {
            source.refresh();
        }

        // Force map to update size and render
        if (window.mapInstance) {
            window.mapInstance.updateSize();
            window.mapInstance.render();
        }

        // Also check the corresponding checkbox if it exists
        const layerId = layer.get('geoserverName') || layer.get('name');
        const checkbox = document.getElementById(layerId);
        if (checkbox) {
            checkbox.checked = true;
        }

        // Update URL parameter to reflect current state
        setURLParam('capa', layerName);
        return true;
    } else {
        console.warn(`Layer ${layerName} not found`);
        return false;
    }
};

/**
 * Deactivate a layer by name
 * @param {string} layerName - Layer name to deactivate
 * @returns {boolean} True if layer was found and deactivated
 */
export const deactivateLayer = (layerName) => {
    if (!layerName) return false;


    // Try to find by geoserver name first
    let layer = findLayerByGeoserverName(layerName);

    // If not found, try by display name
    if (!layer) {
        layer = findLayerByDisplayName(layerName);
    }

    if (layer) {
        layer.setVisible(false);

        // Also uncheck the corresponding checkbox if it exists
        const layerId = layer.get('geoserverName') || layer.get('name');
        const checkbox = document.getElementById(layerId);
        if (checkbox) {
            checkbox.checked = false;
        }

        // Remove URL parameter
        removeURLParam('capa');

        return true;
    } else {
        console.warn(`Layer ${layerName} not found`);
        return false;
    }
};

/**
 * Process URL parameters for project and layer loading
 * Should be called after map and layers are fully initialized
 * @param {Function} onLayerTreeReady - Optional callback when layer tree is ready
 */
export const processURLParams = (onLayerTreeReady) => {
    const proyectoParam = getURLParam('proyecto');
    const capaParam = getURLParam('capa');

    // Check if we're already processing a project switch to avoid loops
    if (window.processingProjectSwitch) {
        return;
    }

    // Handle project switching first - but only if it's different from current
    if (proyectoParam) {

        // Check if this is actually a different project
        import('../services/projectService.js').then(async ({ default: projectService }) => {
            const currentProject = projectService.getCurrentProject();
            const currentProjectName = currentProject ? currentProject.nombre_corto : 'general';

            if (proyectoParam !== currentProjectName) {
              const requestedProject = await projectService.loadProject(proyectoParam);

              if (requestedProject.nombre_corto === proyectoParam){
                switchProject(proyectoParam);
              } else {
                // it must be in fallback
              }
            } else {
                // already on requested project
            }
        });
    }

    // Handle layer activation with retry mechanism
    if (capaParam) {

        // Try to activate layer with retries if layer tree isn't ready yet
        const tryActivateLayer = (retries = 5, delay = 300) => {
            const success = activateLayer(capaParam);
            if (success) {
                if (onLayerTreeReady) onLayerTreeReady();
            } else if (retries > 0) {
                setTimeout(() => tryActivateLayer(retries - 1, delay), delay);
            } else {
                console.error(`❌ Failed to activate layer from URL parameter after all retries: ${capaParam}`);
                if (onLayerTreeReady) onLayerTreeReady();
            }
        };

        // Start activation attempts after a short initial delay
        setTimeout(() => tryActivateLayer(), 500);
    } else {
        if (onLayerTreeReady) onLayerTreeReady();
    }
};

/**
 * Switch to a different project and reload the map
 * @param {string} projectName - Project short name (e.g., 'ecoreservas', 'general')
 */
export const switchProject = async (projectName) => {
    try {
        // Prevent multiple simultaneous switches
        if (window.processingProjectSwitch) {
            return;
        }

        window.processingProjectSwitch = true;

        // For now, simply reload the page with the new project parameter
        // This ensures all layers and UI elements are properly reinitialized
        const url = new URL(window.location);
        url.searchParams.set('proyecto', projectName);

        // Preserve other parameters like 'capa' if they exist
        const capaParam = getURLParam('capa');
        if (capaParam) {
            url.searchParams.set('capa', capaParam);
        }

        // Navigate to the new URL (this will reload the page)
        window.location.href = url.toString();

    } catch (error) {
        console.error('Error switching project:', error);
        window.processingProjectSwitch = false;
    }
};

/**
 * Listen for layer visibility changes and update URL accordingly
 * @param {Object} layer - OpenLayers layer object
 */
export const setupLayerURLSync = (layer) => {
    if (!layer) return;

    layer.on('propertychange', (event) => {
        if (event.key === 'visible') {
            const layerName = layer.get('geoserverName') || layer.get('name');
            const isVisible = event.target.getVisible();

            if (isVisible) {
                setURLParam('capa', layerName);
            } else {
                // Only remove if this layer was the active one
                const currentCapa = getURLParam('capa');
                if (currentCapa === layerName) {
                    removeURLParam('capa');
                }
            }
        }
    });
};

/**
 * Get all available layer names for debugging
 * @returns {Array} Array of layer names
 */
export const getAvailableLayerNames = () => {
    const layerGroup = getMapLayerGroup();
    if (!layerGroup) return [];

    const layerNames = [];

    const extractLayers = (group) => {
        if (!group || !group.getLayers) return;

        const layers = group.getLayers().getArray();
        for (const layer of layers) {
            if (layer.getLayers) {
                // This is a group, recurse
                extractLayers(layer);
            } else {
                // This is an actual layer
                const geoserverName = layer.get('geoserverName') || layer.get('name');
                const displayName = layer.get('title') || layer.get('displayName');
                if (geoserverName && displayName) {
                    layerNames.push({
                        geoserverName,
                        displayName,
                        visible: layer.getVisible()
                    });
                }
            }
        }
    };

    extractLayers(layerGroup);
    return layerNames;
};
