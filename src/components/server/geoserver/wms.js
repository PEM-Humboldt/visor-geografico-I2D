import $ from "jquery";

import {Tile as TileLayer} from 'ol/layer';
import TileWMS from 'ol/source/TileWMS';
import {GEOSERVER_URL,GEOGRAFICO_URL,BIOCULTURAL_URL, BIOLOGICO_URL} from '../url'
// wms geoserver- load layer function
export function wmsLayer(geoserverStore,geoserverLayer,geoserverName,visibility,metadataId,metadataSelector){
    // Sanitize layer name to handle special characters and long names
    const sanitizedLayerName = geoserverLayer.trim();
    
    // URL encode the layer name to handle special characters (ó, í, etc.)
    const encodedLayerName = encodeURIComponent(sanitizedLayerName);
    try {
        var wms = new TileLayer({
            visible: visibility,
            title: geoserverName,
            opacity: 1.0,
            source: new TileWMS({
                url: GEOSERVER_URL+geoserverStore+'/wms',
                params: {
                    'LAYERS': geoserverStore+':'+sanitizedLayerName, 
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
            geoserverName: geoserverLayer, // Store geoserver layer name for URL parameter matching
            displayName: geoserverName,    // Store display name
            extent: [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244]
        });
        
        // Add error handling for the WMS source
        const source = wms.getSource();
        source.on('tileloaderror', function(event) {
            $('#errorToastBody').html(`<div>Ocurrió un error cargando la siguiente capa: <strong>${geoserverLayer}</strong></div>`);
            $('#errorToast').toast({ 
            autohide: true, 
            delay: 10000
            }).toast('show');
            // Silently handle tile load errors
        });
        
        return wms;
        
    } catch (error) {
        // Silently handle WMS layer creation errors
        return null;
    }
}
