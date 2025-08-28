import 'ol/ol.css';
import '../../scss/map.scss';
import $ from "jquery";

import Map from 'ol/Map';
import View from 'ol/View'
import { ScaleLine, ZoomToExtent, Zoom, defaults as defaultControls } from 'ol/control';
import { getCenter } from 'ol/extent';

// Importa todas las capas por defecto
import * as layers from './layers';
//import { proyecto } from './layers';

import { onClickMap } from './controls/map-click'
import { buildLayerTree, findBy } from './controls/tree-layers';

var zoom = document.createElement('span');
zoom.innerHTML = '<i class="fas fa-expand"></i>';

// Define el objeto que contiene todas las capas
const allLayers = {
  layer_base: layers.layer_base,
  division_base: layers.division_base,
  historicos: layers.historicos,
  fondo_adaptacion: layers.fondo_adaptacion,
  proyecto_oleoducto_bicentenario: layers.proyecto_oleoducto_bicentenario,
  conservacion_biodiversidad: layers.conservacion_biodiversidad,
  gobernanza: layers.gobernanza,
  restauracion: layers.restauracion,
  gefparamos: layers.gefpar,
  comp_preservacion: layers.comp_preservacion,
  comp_restauracion: layers.comp_restauracion,
  comp_uso_sostenible: layers.comp_uso_sostenible,
  inv1_preservacion: layers.inv1_preservacion,
  inv1_restauracion: layers.inv1_restauracion,
  inv1_uso_sostenible: layers.inv1_uso_sostenible,
  invv_preservacion: layers.invv_preservacion,
  invv_restauracion: layers.invv_restauracion,
  invv_uso_sostenible: layers.invv_uso_sostenible,

  san_antero4: layers.san_antero4,
  san_antero5: layers.san_antero5,
  san_antero6: layers.san_antero6,
  san_antero7: layers.san_antero7,
  san_antero8: layers.san_antero8,
  san_antero9: layers.san_antero9,

  highlightStadistics: layers.highlightStadistics,
  highlightPoint: layers.highlightPoint,
  highlight: layers.highlight
};

// Global variables for dynamic project management
let selectedLayers;
let nzoom;
let ncenter;
let currentProject = null;

// Dynamic import for project service to avoid bundler issues
const loadProjectService = async () => {
  try {
    const { default: projectService } = await import('../services/projectService');
    return projectService;
  } catch (error) {
    console.warn('Project service not available, using static configuration');
    return null;
  }
};

// Initialize project configuration
const initializeProjectConfig = async () => {
  try {
    const projectService = await loadProjectService();
    if (!projectService) return null;

    currentProject = await projectService.initializeProject();
    const mapConfig = projectService.getMapConfig();

    nzoom = mapConfig.zoom;
    ncenter = mapConfig.center;

    console.log(`Project initialized: ${currentProject.nombre}`);
    return currentProject;
  } catch (error) {
    console.error('Error initializing project:', error);
    // Fallback to static layer selection
    return null;
  }
};

// Selecciona las capas dependiendo del valor de 'proyecto' (with dynamic project support)
const selectLayers = (project) => {
  const projectType = project ? project.nombre_corto : layers.proyecto;

  if (projectType === 'general') {
    return {
      layer_base: allLayers.layer_base,
      division_base: allLayers.division_base,
      historicos: allLayers.historicos,
      fondo_adaptacion: allLayers.fondo_adaptacion,
      proyecto_oleoducto_bicentenario: allLayers.proyecto_oleoducto_bicentenario,
      conservacion_biodiversidad: allLayers.conservacion_biodiversidad,
      gobernanza: allLayers.gobernanza,
      restauracion: allLayers.restauracion,
      gefparamos: allLayers.gefparamos,
      highlightStadistics: allLayers.highlightStadistics,
      highlightPoint: allLayers.highlightPoint,
      highlight: allLayers.highlight
    };
  } else if (projectType === 'ecoreservas') {
    return {
      layer_base: allLayers.layer_base,
      division_base: allLayers.division_base,
      comp_preservacion: allLayers.comp_preservacion,
      comp_restauracion: allLayers.comp_restauracion,
      comp_uso_sostenible: allLayers.comp_uso_sostenible,
      inv1_preservacion: allLayers.inv1_preservacion,
      inv1_restauracion: allLayers.inv1_restauracion,
      inv1_uso_sostenible: allLayers.inv1_uso_sostenible,
      invv_preservacion: allLayers.invv_preservacion,
      invv_restauracion: allLayers.invv_restauracion,
      invv_uso_sostenible: allLayers.invv_uso_sostenible,
      san_antero4: allLayers.san_antero4,
      san_antero5: allLayers.san_antero5,
      san_antero6: allLayers.san_antero6,
      san_antero7: allLayers.san_antero7,
      san_antero8: allLayers.san_antero8,
      san_antero9: allLayers.san_antero9,
      highlightStadistics: allLayers.highlightStadistics,
      highlightPoint: allLayers.highlightPoint,
      highlight: allLayers.highlight
    };
  }

  // Default fallback
  return {
    layer_base: allLayers.layer_base,
    division_base: allLayers.division_base,
    highlightStadistics: allLayers.highlightStadistics,
    highlightPoint: allLayers.highlightPoint,
    highlight: allLayers.highlight
  };
};

// Initialize with fallback values
nzoom = 6;
ncenter = [-8113332, 464737];
selectedLayers = selectLayers(null);

// Initialize map with dynamic project support
let map = null;

const initializeMap = async () => {
  // Try to initialize project configuration
  const project = await initializeProjectConfig();
  if (project) {
    selectedLayers = selectLayers(project);
  }

  // Create the map
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
    layers: Object.values(selectedLayers),
    view: new View({
      center: ncenter,
      zoom: nzoom
    })
  });

  return map;
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

    // Layer toggle functionality
    $('.layers-input').on('click', function () {
      var layername = this.id;
      var layer = findBy(layerGroup, 'name', layername);
      if (layer) {
        layer.setVisible(!layer.getVisible());
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

    console.log('Map initialization completed');
  } catch (error) {
    console.error('Error during map initialization:', error);
  }
});
