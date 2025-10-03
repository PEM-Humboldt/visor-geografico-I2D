/**
 * URL Parameter Handler for Dynamic Layer Loading
 * Handles URL parameters like ?capa=aicas to automatically load specific layers
 */

// Note: Avoiding circular imports by accessing map instance through global reference

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

    console.log(`Attempting to activate layer: ${layerName}`);

    // First try to find by geoserver name
    let layer = findLayerByGeoserverName(layerName);

    // If not found, try by display name
    if (!layer) {
        layer = findLayerByDisplayName(layerName);
    }

    if (layer) {
        console.log(`Found layer: ${layer.get('title') || layer.get('name')}`);

        // Set layer visible
        layer.setVisible(true);

        // Force refresh the layer source to ensure it renders
        const source = layer.getSource();
        if (source && typeof source.refresh === 'function') {
            console.log(`Refreshing source for layer: ${layerName}`);
            source.refresh();
        }

        // Force map to update size and render
        if (window.mapInstance) {
            window.mapInstance.updateSize();
            window.mapInstance.render();
            console.log(`Forced map render for layer: ${layerName}`);
        }

        // Also check the corresponding checkbox if it exists
        const layerId = layer.get('geoserverName') || layer.get('name');
        const checkbox = document.getElementById(layerId);
        if (checkbox) {
            checkbox.checked = true;
            console.log(`Checked checkbox for layer: ${layerId}`);
        }

        // Update URL parameter to reflect current state
        setURLParam('capa', layerName);

        console.log(`Layer ${layerName} activated successfully - visible: ${layer.getVisible()}, opacity: ${layer.getOpacity()}`);
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

    console.log(`Attempting to deactivate layer: ${layerName}`);

    // Try to find by geoserver name first
    let layer = findLayerByGeoserverName(layerName);

    // If not found, try by display name
    if (!layer) {
        layer = findLayerByDisplayName(layerName);
    }

    if (layer) {
        console.log(`Found layer: ${layer.get('title') || layer.get('name')}`);
        layer.setVisible(false);

        // Also uncheck the corresponding checkbox if it exists
        const layerId = layer.get('geoserverName') || layer.get('name');
        const checkbox = document.getElementById(layerId);
        if (checkbox) {
            checkbox.checked = false;
        }

        // Remove URL parameter
        removeURLParam('capa');

        console.log(`Layer ${layerName} deactivated successfully`);
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
        console.log('Project switch already in progress, skipping...');
        return;
    }

    // Handle project switching first - but only if it's different from current
    if (proyectoParam) {
        console.log(`URL parameter 'proyecto' found: ${proyectoParam}`);

        // Check if this is actually a different project
        import('../services/projectService.js').then(({ default: projectService }) => {
            const currentProject = projectService.getCurrentProject();
            const currentProjectName = currentProject ? currentProject.nombre_corto : 'general';

            if (proyectoParam !== currentProjectName) {
                console.log(`Switching from ${currentProjectName} to ${proyectoParam}`);
                switchProject(proyectoParam);
            } else {
                console.log(`Already on project ${proyectoParam}, no switch needed`);
            }
        });
    }

    // Handle layer activation with retry mechanism
    if (capaParam) {
        console.log(`URL parameter 'capa' found: ${capaParam}`);

        // Try to activate layer with retries if layer tree isn't ready yet
        const tryActivateLayer = (retries = 5, delay = 300) => {
            const success = activateLayer(capaParam);
            if (success) {
                console.log(`Successfully processed URL parameter: capa=${capaParam}`);
                if (onLayerTreeReady) onLayerTreeReady();
            } else if (retries > 0) {
                console.log(`Layer not found yet, retrying in ${delay}ms... (${retries} retries left)`);
                setTimeout(() => tryActivateLayer(retries - 1, delay), delay);
            } else {
                console.error(`Failed to activate layer from URL parameter after all retries: ${capaParam}`);
                if (onLayerTreeReady) onLayerTreeReady();
            }
        };

        // Start activation attempts after a short initial delay
        setTimeout(() => tryActivateLayer(), 500);
    } else if (onLayerTreeReady) {
        // No layer to activate, call callback immediately
        onLayerTreeReady();
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
            console.log('Project switch already in progress, ignoring...');
            return;
        }

        window.processingProjectSwitch = true;
        console.log(`Switching to project: ${projectName}`);

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
