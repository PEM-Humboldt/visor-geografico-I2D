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
        opacity: 1.0,
        source: new TileWMS({
            url: GEOSERVER_URL+geoserverStore+'/wms',
            params: {
                'LAYERS': geoserverStore+':'+geoserverLayer, 
                'STYLES': '',
                'TILED': true,
                'FORMAT': 'image/png',
                'TRANSPARENT': true,
                'VERSION': '1.3.0'
            },
            projection: 'EPSG:3857',
            crossOrigin: 'anonymous',
            serverType: 'geoserver'
        }), 
        name: geoserverLayer,
        urldownload: geonetwork,
        extent: [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244]
    });
    return wms
}