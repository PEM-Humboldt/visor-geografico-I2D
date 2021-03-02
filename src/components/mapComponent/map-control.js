import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import '../../scss/map.scss';
import '../../scss/layercontrol.scss';
// import sync from 'ol-hashed';

import $ from "jquery";

import {Map, View} from 'ol';
import {ScaleLine, ZoomToExtent,defaults as defaultControls} from 'ol/control';

import {buildLayerTree,findBy} from './controls/tree-layers';

import {layer_base, historicos, fondo_adaptacion, proyecto_oleoducto_bicentenario, conservacion_biodiversidad, ceiba, gobernanza, highlight} from './control-layers'
import {onClickMap} from './controls/map-click'

var zoom = document.createElement('span');
zoom.innerHTML = '<i class="fas fa-expand"></i>';


const map = new Map({
  controls: defaultControls().extend([new ScaleLine(), new ZoomToExtent({
    extent: [-7430902, -479413, -8795762, 1408887],
    label: zoom,
    tipLabel:'Zoom Colombia'
  })
  ]),
  target: document.getElementById('map'),
  renderer: 'canvas',
  layers: [layer_base, historicos, fondo_adaptacion, proyecto_oleoducto_bicentenario, conservacion_biodiversidad, ceiba,gobernanza, highlight,],
  view: new View({
    center: [-8113332, 464737],
    zoom: 5.373
  })
});

// sync(map);

document.addEventListener("DOMContentLoaded",function(){
  buildLayerTree(map.getLayerGroup());
  //Prender o apagar capas
  $('.layers-input').on('click', function () {
      var layername = this.id;
      var layer = findBy(map.getLayerGroup(), 'name', layername);
      layer.setVisible(!layer.getVisible());
  });
});

export const removeInteraction=()=>{map.removeInteraction()}

export const updateSize=()=>{map.updateSize()}

onClickMap(map);

export {map}