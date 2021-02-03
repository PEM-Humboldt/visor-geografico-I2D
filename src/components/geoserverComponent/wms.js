import 'ol/ol.css';
import {Tile as TileLayer} from 'ol/layer';
import {TileWMS} from 'ol/source';
import {GEOSERVER_URL,GEONETWORK_URL} from './url'
//FUNCION WMS LOAD LAYER
export function wmsLayer(geoserverStore,geoserverLayer,geoserverName,visibility,idGeoNetwork){
    var wms = new TileLayer({
        visible: visibility,
        title: geoserverName,
        source: new TileWMS({
            url: GEOSERVER_URL+geoserverStore+'/wms',
            params: {LAYERS:  geoserverStore+':'+geoserverLayer, STYLES: ''}
        }), name: geoserverLayer,
        urldownload:GEONETWORK_URL+idGeoNetwork
    });
    return wms
}