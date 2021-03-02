import 'ol/ol.css';
import {GeoJSON} from 'ol/format';
import VectorSource from 'ol/source/Vector';

import {Vector as VectorLayer} from 'ol/layer';
import {GEOSERVER_URL,GEOSERVER_URL_AMAZON} from './url'
// import {bbox as bboxStrategy} from 'ol/loadingstrategy';

export var geojsonLayer = (store,layer,color,params)=>{
  var vector;
  try {
    // geoserver 
    var url_request=`${GEOSERVER_URL}wfs?service=WFS&`;
    var url_params=`version=2.0.0&request=GetFeature&typename=${store}:${layer}&outputFormat=application/json&srsname=EPSG:3857`;
 
    // console.log(url_request + url_params +',EPSG:3857');
    var vectorSource = new VectorSource({
        format: new GeoJSON(),
        url: function (extent) {
          return (
            url_request + url_params
            // 'https://cors-anywhere.herokuapp.com/'+url_request + url_params
            // + `bbox=${extent.join(',')},EPSG:3857`
          );
        },
        // crossOrigin: 'anonymous',
        // strategy: bboxStrategy,
        strategy: function(extent, resolution) {
          if(this.resolution && this.resolution != resolution){
              this.loadedExtentsRtree_.clear();
          }
          return [extent];
        }
    });

    // style
    var style=color;

    // vector que se visualiza en el mapa
    vector = new VectorLayer({
        source: vectorSource,
        name:layer,
        title:layer,
        visible:true,
        style: function (feature) {
          style.getText().setText(feature.values_.nombre_mpi);
          return style;
        },
    });

  } catch (error) {
    console.log(error)
  }

  return vector;
}
