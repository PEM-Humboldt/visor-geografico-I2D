import 'ol/ol.css';
import '../../scss/map.scss';
import $ from "jquery";

import Map from 'ol/Map';
import View from 'ol/View'
import { ScaleLine, ZoomToExtent, defaults as defaultControls } from 'ol/control';
import { getCenter } from 'ol/extent';

// Importa todas las capas por defecto
import * as layers from './layers';
import { proyecto } from './layers';

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
  targetmill: layers.targetmill,
  viveros: layers.viveros,
  comp_preservacion: layers.comp_preservacion,
  comp_restauracion: layers.comp_restauracion,
  comp_uso_sostenible: layers.comp_uso_sostenible,
  inv1_preservacion: layers.inv1_preservacion,
  inv1_restauracion: layers.inv1_restauracion,
  inv1_uso_sostenible: layers.inv1_uso_sostenible,
  invv_preservacion: layers.invv_preservacion,
  invv_restauracion: layers.invv_restauracion,
  invv_uso_sostenible: layers.invv_uso_sostenible,
  highlightStadistics: layers.highlightStadistics,
  highlightPoint: layers.highlightPoint,
  highlight: layers.highlight
};

// Selecciona las capas dependiendo del valor de 'proyecto'
let selectedLayers;
let nzoom;
let ncenter;
if (proyecto === 'general') {
  nzoom = 6;
  ncenter = [-8113332, 464737];
  selectedLayers = {
    layer_base: allLayers.layer_base,
    division_base: allLayers.division_base,
    historicos: allLayers.historicos,
    fondo_adaptacion: allLayers.fondo_adaptacion,
    proyecto_oleoducto_bicentenario: allLayers.proyecto_oleoducto_bicentenario,
    conservacion_biodiversidad: allLayers.conservacion_biodiversidad,
    gobernanza: allLayers.gobernanza,
    targetmill: allLayers.targetmill,
    viveros: allLayers.viveros,
    highlightStadistics: allLayers.highlightStadistics,
    highlightPoint: allLayers.highlightPoint,
    highlight: allLayers.highlight
  };
} else if (proyecto === 'ecoreservas') {
  nzoom = 9.2;
  ncenter = [-8249332, 544737];
  selectedLayers = {
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
    highlightStadistics: allLayers.highlightStadistics,
    highlightPoint: allLayers.highlightPoint,
    highlight: allLayers.highlight
  };
}

// map definition
export const map = new Map({
  controls: defaultControls({ attributionOptions: { collapsible: true } }).extend([new ScaleLine(), new ZoomToExtent({
    extent: [-7430902, -479413, -8795762, 1408887],
    label: zoom,
    tipLabel: 'Zoom Colombia'
  })
  ]),
  target: document.getElementById('map'),
  renderer: 'canvas',
  layers: Object.values(selectedLayers), // Convierte el objeto a un array de capas
  view: new View({
    center: ncenter,
    zoom: nzoom
  })
});

////////////////// map events, all map events are here

// getView function
export const view = () => { return map.getView() }

// zoom to layer with extent
export const fitView = (ext) => {
  let zoom = getZoom() > 8 ? getZoom : 8;
  map.getView().animate({ center: getCenter(ext), zoom: zoom })

}
// zoom to layer with center
export const fitCenter = (ext) => {
  let zoom = getZoom() > 8.5 ? getZoom : 8.5;
  map.getView().animate({ center: ext, zoom: zoom })

}
// add layer to the map
export const addLayer = (layer) => { map.addLayer(layer); }
// remove layer to the map
export const removeLayer = (layer) => { map.removeLayer(layer); }

export const mapZoomEnd = (callback) => { map.on("moveend", function (e) { callback(); }) };
// get map resolution function
export const getResolution = () => { return map.getView().getResolution() }
// get map projection function
export const getProjection = () => { return map.getView().getProjection() }
// get current zoom function
export const getZoom = () => { return map.getView().getZoom() }
// update map 
export const updateSize = () => { map.updateSize() }
// get layer group function 
export const getLayerGroup = () => { return map.getLayerGroup() }

map.on('singleclick', function (evt) {
  onClickMap(evt);
});

// build control layer
document.addEventListener("DOMContentLoaded", function () {
  let layerGroup = getLayerGroup()
  buildLayerTree(layerGroup);
  //Prender o apagar capas
  $('.layers-input').on('click', function () {
    var layername = this.id;
    var layer = findBy(layerGroup, 'name', layername);
    layer.setVisible(!layer.getVisible());
  });
});
