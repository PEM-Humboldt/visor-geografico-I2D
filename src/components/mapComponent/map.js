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
    
    console.log(`Initializing map with ${layersArray.length} layer groups`);
    layersArray.forEach((layer, index) => {
      console.log(`Layer ${index}: ${layer.get('title') || layer.get('name') || 'unnamed'} (visible: ${layer.getVisible()})`);
    });
    
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
    
    // Force map render after initialization and debug layer states
    setTimeout(() => {
      if (map) {
        map.render();
        console.log('Map render forced');
        
        // Debug: Check if layers are actually added to the map
        const mapLayers = map.getLayers().getArray();
        console.log(`Map has ${mapLayers.length} layers after initialization`);
        
        let hasVisibleWMSLayers = false;
        mapLayers.forEach((layer, index) => {
          console.log(`Map Layer ${index}: ${layer.get('title') || layer.get('name') || 'unnamed'} - visible: ${layer.getVisible()}`);
          
          // Check sublayers for GroupLayers
          if (layer.getLayers) {
            const sublayers = layer.getLayers().getArray();
            sublayers.forEach((sublayer, subIndex) => {
              const isVisible = sublayer.getVisible();
              const layerName = sublayer.get('title') || sublayer.get('name');
              console.log(`  Sublayer ${subIndex}: ${layerName} - visible: ${isVisible}, opacity: ${sublayer.getOpacity()}`);
              
              // Check if this is a visible WMS layer (not base layers)
              if (isVisible && layerName && !layerName.includes('CartoDB') && !layerName.includes('Departamentos') && !layerName.includes('Municipios')) {
                hasVisibleWMSLayers = true;
                console.log(`Found visible WMS layer: ${layerName}`);
              }
            });
          }
        });
        
        // Debug visible WMS layers without changing viewport
        if (hasVisibleWMSLayers) {
          console.log('Found visible WMS layers - keeping current viewport');
        }
      }
    }, 1000);

    console.log(`Map initialized with ${Object.keys(selectedLayers).length} layer groups`);
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

    // Build layer tree
    const layerGroup = getLayerGroup();
    if (layerGroup) {
      buildLayerTree(layerGroup);
    }

    // Layer toggle functionality with URL parameter sync
    $('.layers-input').on('click', function () {
      var layername = this.id;
      var layer = findBy(layerGroup, 'name', layername);
      if (layer) {
        const newVisibility = !layer.getVisible();
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
      
      // Debug: Log available layer names for reference
      setTimeout(() => {
        const availableLayers = getAvailableLayerNames();
        console.log('Available layers for URL parameters:', availableLayers);
      }, 2000);
    }).catch(error => {
      console.error('Error loading URL parameter utilities:', error);
    });
    
    console.log('Map initialization completed');
  } catch (error) {
    console.error('Error during map initialization:', error);
  }
});
