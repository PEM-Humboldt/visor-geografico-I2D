import 'ol/ol.css';
import '../../scss/map.scss';
import $ from "jquery";

import Map from 'ol/Map';
import View from 'ol/View'
import { ScaleLine, ZoomToExtent, Zoom, defaults as defaultControls } from 'ol/control';
import { getCenter } from 'ol/extent';

// Import dynamic layer system
import { getProjectLayers, initializeLegacyExports, highlight, highlightPoint, highlightStadistics } from './layers';
import projectService from '../services/projectService';

import { onClickMap } from './controls/map-click'
import { buildLayerTree, findBy } from './controls/tree-layers';
import { buildHierarchicalLayerTree } from './controls/hierarchical-tree-layers';
// Import URL params functions dynamically to avoid circular dependencies

var zoom = document.createElement('span');
zoom.innerHTML = '<i class="fas fa-expand"></i>';

// Global variables for dynamic project management
let selectedLayers = {};
let nzoom = 6;
let ncenter = [-8113332, 464737];
let currentProject = null;

// Initialize map with dynamic project support
let map = null;

const initializeMap = async () => {
  try {
    // Initialize project and get dynamic layers
    currentProject = await projectService.initializeProject();
    if (currentProject) {
      const mapConfig = projectService.getMapConfig();
      nzoom = mapConfig.zoom;
      ncenter = mapConfig.center;
    }

    // Get dynamic layers
    selectedLayers = await getProjectLayers();

    // Initialize legacy exports for backward compatibility
    await initializeLegacyExports();

    // Create the map with dynamic layers
    const layersArray = selectedLayers._layerArray || Object.values(selectedLayers).filter(layer => layer !== null);

    map = new Map({
      controls: defaultControls({
        attributionOptions: { collapsible: true },
        zoom: true,
        rotate: false
      }).extend([
        new ScaleLine(),
        new ZoomToExtent({
          extent: [-7430902, -479413, -8795762, 1408887],
          label: zoom,
          tipLabel: 'Zoom Colombia'
        })
      ]),
      target: document.getElementById('map'),
      renderer: 'canvas',
      layers: layersArray,
      view: new View({
        center: ncenter,
        zoom: nzoom,
        projection: 'EPSG:3857',
        extent: [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244]
      })
    });

    // Expose map globally for URL parameter handling
    window.mapInstance = map;

    // Force map render after initialization
    setTimeout(() => {
      if (map) {
        map.render();

        // Debug: Check if layers are actually added to the map
        const mapLayers = map.getLayers().getArray();

        let hasVisibleWMSLayers = false;
        mapLayers.forEach((layer, index) => {

          // Check sublayers for GroupLayers
          if (layer.getLayers) {
            const sublayers = layer.getLayers().getArray();
            sublayers.forEach((sublayer, subIndex) => {
              const isVisible = sublayer.getVisible();
              const layerName = sublayer.get('title') || sublayer.get('name');

              // Check if this is a visible WMS layer (not base layers)
              if (isVisible && layerName && !layerName.includes('CartoDB') && !layerName.includes('Departamentos') && !layerName.includes('Municipios')) {
                hasVisibleWMSLayers = true;
              }
            });
          }
        });

        // Debug visible WMS layers without changing viewport
        if (hasVisibleWMSLayers) {
          // keep current viewport
        }
      }
    }, 1000);

    return map;
  } catch (error) {
    console.error('Error initializing map:', error);
    // Fallback initialization
    map = new Map({
      controls: defaultControls({
        attributionOptions: { collapsible: true },
        zoom: true,
        rotate: false
      }),
      target: document.getElementById('map'),
      renderer: 'canvas',
      layers: [highlight, highlightPoint, highlightStadistics],
      view: new View({
        center: ncenter,
        zoom: nzoom
      })
    });
    return map;
  }
};

// Export map (will be initialized asynchronously)
export { map };

////////////////// map events, all map events are here

// Utility functions with null checks
export const view = () => { return map ? map.getView() : null; }

export const fitView = (ext) => {
  if (!map) return;
  let zoom = getZoom() > 8 ? getZoom() : 8;
  map.getView().animate({ center: getCenter(ext), zoom: zoom });
}

export const fitCenter = (ext) => {
  if (!map) return;
  let zoom = getZoom() > 8.5 ? getZoom() : 8.5;
  map.getView().animate({ center: ext, zoom: zoom });
}

export const addLayer = (layer) => { if (map) map.addLayer(layer); }
export const removeLayer = (layer) => { if (map) map.removeLayer(layer); }
export const mapZoomEnd = (callback) => { if (map) map.on("moveend", function (e) { callback(); }); };
export const getResolution = () => { return map ? map.getView().getResolution() : null; }
export const getProjection = () => { return map ? map.getView().getProjection() : null; }
export const getZoom = () => { return map ? map.getView().getZoom() : 6; }
export const updateSize = () => { if (map) map.updateSize(); }
export const getLayerGroup = () => { return map ? map.getLayerGroup() : null; }

// Initialize map and set up events
const setupMapEvents = () => {
  if (!map) return;

  map.on('singleclick', function (evt) {
    onClickMap(evt);
  });
};

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Initialize map with project configuration
    await initializeMap();

    // Setup map events
    setupMapEvents();

    // Build layer tree - use hierarchical for ecoreservas, legacy for others
    const layerGroup = getLayerGroup();

    if (layerGroup) {
      if (currentProject && currentProject.layer_groups) {
        // Use hierarchical tree for all projects (respects fold_state from API)
        buildHierarchicalLayerTree(currentProject, layerGroup);
      } else {
        // Use legacy tree only as fallback
        buildLayerTree(layerGroup);
      }
    }

    // Layer toggle functionality with URL parameter sync
    // Use event delegation to handle dynamically created checkboxes
    $(document).on('click', '.layers-input', function () {
      var layername = this.id;
      var layer = findBy(layerGroup, 'name', layername);
      if (layer) {
        const newVisibility = this.checked; // Use checkbox state directly
        layer.setVisible(newVisibility);

        // Sync with URL parameters
        const geoserverName = layer.get('geoserverName') || layer.get('name');
        if (newVisibility) {
          // Import the setURLParam function dynamically to avoid circular imports
          import('../utils/urlParams').then(({ setURLParam }) => {
            setURLParam('capa', geoserverName);
          });
        } else {
          // Check if this was the active layer in URL
          import('../utils/urlParams').then(({ getURLParam, removeURLParam }) => {
            const currentCapa = getURLParam('capa');
            if (currentCapa === geoserverName) {
              removeURLParam('capa');
            }
          });
        }
      }
    });

    // Project-specific zoom controls
    $('#combinedCapas_Cundi').on('click', function () {
      fitCenter(ncenter);
    });

    // Ecoreservas specific zoom (San Antero)
    if (currentProject && currentProject.nombre_corto === 'ecoreservas') {
      $('#combinedCapas_San').on('click', function () {
        fitCenter([-8449332, 1030737]);
      });
    }

    // Process URL parameters for automatic layer loading (dynamic import to avoid circular dependency)
    import('../utils/urlParams.js').then(({ processURLParams, getAvailableLayerNames }) => {
      processURLParams();
    }).catch(error => {
      console.error('Error loading URL parameter utilities:', error);
    });
  } catch (error) {
    console.error('Error during map initialization:', error);
  }
});
