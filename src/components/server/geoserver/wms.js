import {Tile as TileLayer} from 'ol/layer';
import TileWMS from 'ol/source/TileWMS';
import {GEOSERVER_URL,GEONETWORK_URL,DATAVERSE_URL} from '../url'
// wms geoserver- load layer function
export function wmsLayer(geoserverStore,geoserverLayer,geoserverName,visibility,idGeoNetwork){
    let repositorio;
    if (geoserverStore == 'visor' || geoserverStore == 'gefparamos') {
        repositorio = DATAVERSE_URL;
    }else{
        repositorio = GEONETWORK_URL;
    }
    var geonetwork=(idGeoNetwork=!'' && idGeoNetwork)?repositorio+idGeoNetwork:'';
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