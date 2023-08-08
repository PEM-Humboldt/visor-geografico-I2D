import 'ol/ol.css';
import '../../scss/map.scss';
import $ from "jquery";

import Map from 'ol/Map';
import View from 'ol/View'
import {ScaleLine, ZoomToExtent,defaults as defaultControls} from 'ol/control';
import {getCenter} from 'ol/extent';

import {layer_base, division_base,historicos, fondo_adaptacion, proyecto_oleoducto_bicentenario, conservacion_biodiversidad, gobernanza, targetmill, viveros, highlight, highlightPoint, highlightStadistics} from './layers'

import {onClickMap} from './controls/map-click'

import {buildLayerTree,findBy} from './controls/tree-layers';


var zoom = document.createElement('span');
zoom.innerHTML = '<i class="fas fa-expand"></i>';

// map definition
export const map = new Map({
    controls: defaultControls({ attributionOptions: { collapsible: true } }).extend([new ScaleLine(), new ZoomToExtent({
      extent: [-7430902, -479413, -8795762, 1408887],
      label: zoom,
      tipLabel:'Zoom Colombia'
    })
    ]),
    target: document.getElementById('map'),
    renderer: 'canvas',
    layers: [layer_base, division_base,historicos, fondo_adaptacion, proyecto_oleoducto_bicentenario, conservacion_biodiversidad,gobernanza,targetmill, viveros, highlightStadistics, highlightPoint, highlight],
    view: new View({
      center: [-8113332, 464737],
      zoom: 6
    })
  });

////////////////// map events, all map events are here

// getView function
export const view=()=>{return map.getView()}

// zoom to layer with extent
export const fitView=(ext)=>{
  let zoom=getZoom()>8?getZoom:8;
  map.getView().animate({center: getCenter(ext), zoom: zoom})
  
}
// zoom to layer with center
export const fitCenter=(ext)=>{
  let zoom=getZoom()>8.5?getZoom:8.5;
  map.getView().animate({center: ext, zoom: zoom})
  
}
// add layer to the map
export const addLayer=(layer)=>{map.addLayer(layer);}
// remove layer to the map
export const removeLayer=(layer)=>{map.removeLayer(layer);}

export const mapZoomEnd =(callback)=>{map.on("moveend", function (e) {callback();})};
// get map resolution function
export const getResolution=()=>{return map.getView().getResolution()}
// get map projection function
export const getProjection=()=>{return map.getView().getProjection()}
// get current zoom function
export const getZoom=()=>{return map.getView().getZoom()}
// update map 
export const updateSize=()=>{map.updateSize()}
// get layer group function 
export const getLayerGroup=()=>{return map.getLayerGroup()}

map.on('singleclick', function (evt) {
  onClickMap(evt);
});

// build control layer
document.addEventListener("DOMContentLoaded",function(){
  let layerGroup=getLayerGroup()
  buildLayerTree(layerGroup);
  //Prender o apagar capas
  $('.layers-input').on('click', function () {
      var layername = this.id;
      var layer = findBy(layerGroup, 'name', layername);
      layer.setVisible(!layer.getVisible());
  });
});