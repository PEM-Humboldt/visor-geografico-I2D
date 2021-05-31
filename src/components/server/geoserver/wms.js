import 'ol/ol.css';
import {Tile as TileLayer} from 'ol/layer';
import {TileWMS} from 'ol/source';
import {GEOSERVER_URL,GEONETWORK_URL} from '../url'
//FUNCION WMS LOAD LAYER
export function wmsLayer(geoserverStore,geoserverLayer,geoserverName,visibility,idGeoNetwork){
    var geonetwork=(idGeoNetwork=!'' && idGeoNetwork)?GEONETWORK_URL+idGeoNetwork:'';
    var wms = new TileLayer({
        visible: visibility,
        title: geoserverName,
        source: new TileWMS({
            url: GEOSERVER_URL+geoserverStore+'/wms',
            params: {'LAYERS':  geoserverStore+':'+geoserverLayer, 'STYLES': '','TILED':true}
        }), name: geoserverLayer,
        urldownload:geonetwork
    });
    return wms
}