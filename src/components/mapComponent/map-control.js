import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import '../../scss/layercontrol.scss';
// import sync from 'ol-hashed';

import $ from "jquery";

import {map} from './map'


import {buildLayerTree,findBy} from './controls/tree-layers';
import {onClickMap} from './controls/map-click'
import './controls/search'
import './controls/zoom'


// sync(map);

document.addEventListener("DOMContentLoaded",function(){
  buildLayerTree(map.getLayerGroup());
  //Prender o apagar capas
  $('.layers-input').on('click', function () {
      var layername = this.id;
      // console.log(map.getLayerGroup())
      var layer = findBy(map.getLayerGroup(), 'name', layername);
      layer.setVisible(!layer.getVisible());
  });
});


map.on('singleclick', function (evt) {
  onClickMap(evt);
});