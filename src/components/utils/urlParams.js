/**
 * URL Parameter Handler for Dynamic Layer Loading
 * Handles URL parameters like ?capa=aicas to automatically load specific layers
 */

// Note: Avoiding circular imports by accessing map instance through global reference

/**
 * Fit map view to layer extent with animation
 * Fetches actual extent from GeoServer for WMS layers
 * @param {Object} layer - OpenLayers layer
 */
async function fitMapToLayerExtent(layer) {
  if (!layer || !window.mapInstance) {
    console.warn('⚠️ Cannot fit to extent: layer or map not available');
    return;
  }

  try {

    const source = layer.getSource();
    if (!source) {
      console.warn('⚠️ Layer has no source');
      return;
    }


    let extent = null;

    // For WMS/TileWMS layers, fetch extent from GeoServer
    if (source.constructor.name === 'TileWMS' || source.getParams) {
      const params = source.getParams();
      const layerName = params.LAYERS;

      if (layerName) {
        extent = await fetchWMSLayerExtent(source.getUrls()[0], layerName);
      }
    }

    // For vector layers, use source extent
    if (!extent && typeof source.getExtent === 'function') {
      extent = source.getExtent();
    }

    // Fallback to layer property extent (but check if it's not the max extent)
    if (!extent || !isFinite(extent[0])) {
      const layerExtent = layer.get('extent');
      // Only use if it's not the maximum EPSG:3857 extent
      if (layerExtent && layerExtent[0] !== -20037508.342789244) {
        extent = layerExtent;
      }
    }

    // Check if extent is valid
    if (!extent || !isFinite(extent[0]) || !isFinite(extent[1]) ||
        !isFinite(extent[2]) || !isFinite(extent[3])) {
      console.warn('Layer extent is not valid or could not be fetched:', layer.get('name'));
      return;
    }

    // Check if extent is not the maximum extent (indicates no real extent available)
    if (extent[0] === -20037508.342789244 && extent[2] === 20037508.342789244) {
      console.warn('Layer has maximum extent, cannot zoom to specific area:', layer.get('name'));
      return;
    }

    // Check if extent is not empty (all zeros or very small)
    const width = extent[2] - extent[0];
    const height = extent[3] - extent[1];
    if (width < 1 || height < 1) {
      console.warn('Layer extent is too small or empty:', layer.get('name'));
      return;
    }

    // Fit the view to the extent with padding and animation
    window.mapInstance.getView().fit(extent, {
      padding: [50, 50, 50, 50], // Add padding around the extent
      duration: 1000, // Animation duration in milliseconds
      maxZoom: 16, // Don't zoom in too much for small features
      callback: function(complete) {
        // no-op
      }
    });

  } catch (error) {
    console.error('Error fitting to layer extent:', error);
  }
}

/**
 * Fetch WMS layer extent from GeoServer GetCapabilities
 * @param {string} wmsUrl - WMS service URL
 * @param {string} layerName - Full layer name (workspace:layer)
 * @returns {Promise<Array|null>} Extent array [minx, miny, maxx, maxy] or null
 */
async function fetchWMSLayerExtent(wmsUrl, layerName) {
  try {
    // Build GetCapabilities URL
    const capabilitiesUrl = `${wmsUrl}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities`;


    // Extract layer name without workspace prefix (e.g., "ecoreservas:layer_name" -> "layer_name")
    const layerNameWithoutWorkspace = layerName.includes(':') ? layerName.split(':')[1] : layerName;

    const response = await fetch(capabilitiesUrl);
    if (!response.ok) {
      console.error(`❌ GetCapabilities request failed: ${response.status} ${response.statusText}`);
      return null;
    }

    const text = await response.text();

    // Parse XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'text/xml');

    // Check for XML parsing errors
    const parserError = xmlDoc.getElementsByTagName('parsererror');
    if (parserError.length > 0) {
      console.error('❌ XML parsing error:', parserError[0].textContent);
      return null;
    }

    // Find the layer in capabilities
    const layers = xmlDoc.getElementsByTagName('Layer');

    // Collect available layer names
    const availableLayerNames = [];
    for (let i = 0; i < layers.length; i++) {
      const nameNode = layers[i].getElementsByTagName('Name')[0];
      if (nameNode) {
        availableLayerNames.push(nameNode.textContent);
      }
    }
    // no console output in production

    for (let i = 0; i < layers.length; i++) {
      const layerNode = layers[i];
      const nameNode = layerNode.getElementsByTagName('Name')[0];

      // Check both full layer name and name without workspace prefix
      const nodeLayerName = nameNode ? nameNode.textContent : '';
      const matches = nodeLayerName === layerName ||
                     nodeLayerName === layerNameWithoutWorkspace ||
                     (layerName.includes(':') && nodeLayerName === layerName.split(':')[1]);

      if (nameNode && matches) {
        // matching layer found

        // Try to get EX_GeographicBoundingBox first (WGS84)
        const geoBBox = layerNode.getElementsByTagName('EX_GeographicBoundingBox')[0];
        if (geoBBox) {
          const westBound = parseFloat(geoBBox.getElementsByTagName('westBoundLongitude')[0].textContent);
          const eastBound = parseFloat(geoBBox.getElementsByTagName('eastBoundLongitude')[0].textContent);
          const southBound = parseFloat(geoBBox.getElementsByTagName('southBoundLatitude')[0].textContent);
          const northBound = parseFloat(geoBBox.getElementsByTagName('northBoundLatitude')[0].textContent);

          // Transform from WGS84 to EPSG:3857
          const extent = transformExtent([westBound, southBound, eastBound, northBound]);
          return extent;
        }

        // Fallback to BoundingBox with CRS
        const bboxNodes = layerNode.getElementsByTagName('BoundingBox');

        for (let j = 0; j < bboxNodes.length; j++) {
          const bbox = bboxNodes[j];
          const crs = bbox.getAttribute('CRS') || bbox.getAttribute('SRS');

          if (crs === 'EPSG:3857' || crs === 'EPSG:900913') {
            const minx = parseFloat(bbox.getAttribute('minx'));
            const miny = parseFloat(bbox.getAttribute('miny'));
            const maxx = parseFloat(bbox.getAttribute('maxx'));
            const maxy = parseFloat(bbox.getAttribute('maxy'));

            const extent = [minx, miny, maxx, maxy];
            return extent;
          }
        }

        console.warn(`⚠️ Layer found but no suitable bounding box`);
      }
    }

    // Could not find extent for layer in capabilities
    return null;
  } catch (error) {
    console.error(`❌ Error fetching WMS capabilities:`, error);
    console.error(`Stack trace:`, error.stack);
    return null;
  }
}

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

        // Fit map to layer extent
        fitMapToLayerExtent(layer);

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
        import('../services/projectService.js').then(({ default: projectService }) => {
            const currentProject = projectService.getCurrentProject();
            const currentProjectName = currentProject ? currentProject.nombre_corto : 'general';

            if (proyectoParam !== currentProjectName) {
                switchProject(proyectoParam);
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
