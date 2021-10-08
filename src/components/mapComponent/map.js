import 'ol/ol.css';
import '../../scss/map.scss';

import {Map, View} from 'ol';
import {ScaleLine, ZoomToExtent,defaults as defaultControls} from 'ol/control';
import {getCenter} from 'ol/extent';

import {layer_base, division_base,historicos, fondo_adaptacion, proyecto_oleoducto_bicentenario, conservacion_biodiversidad, gobernanza, highlight, highlightPoint, highlightStadistics} from './layers'

var zoom = document.createElement('span');
zoom.innerHTML = '<i class="fas fa-expand"></i>';

export const map = new Map({
    controls: defaultControls({ attributionOptions: { collapsible: true } }).extend([new ScaleLine(), new ZoomToExtent({
      extent: [-7430902, -479413, -8795762, 1408887],
      label: zoom,
      tipLabel:'Zoom Colombia'
    })
    ]),
    target: document.getElementById('map'),
    renderer: 'canvas',
    layers: [layer_base, division_base,historicos, fondo_adaptacion, proyecto_oleoducto_bicentenario, conservacion_biodiversidad,gobernanza,highlightStadistics, highlightPoint, highlight],
    view: new View({
      center: [-8113332, 464737],
      zoom: 6
    })
  });

  
export const view=()=>{return map.getView()}
export const fitView=(ext)=>{
  let zoom=getZoom()>8?getZoom:8;
  map.getView().animate({center: getCenter(ext), zoom: zoom})
  
}
export const addLayer=(layer)=>{map.addLayer(layer);}
export const removeLayer=(layer)=>{map.removeLayer(layer);}
// export const addInteraction=(selection)=>{map.addInteraction(selection)}
// export const removeInteraction=()=>{map.removeInteraction()}

// geojson data get
// export const getFeaturesAtPixel=(pixel)=>{return map.getFeaturesAtPixel(pixel,(feature) =>{return feature })}

export const mapZoomEnd =(callback)=>{map.on("moveend", function (e) {callback();})};

export const getResolution=()=>{return map.getView().getResolution()}
export const getProjection=()=>{return map.getView().getProjection()}
export const getZoom=()=>{return map.getView().getZoom()}

export const updateSize=()=>{map.updateSize()}
