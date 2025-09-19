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
    
    // Sanitize layer name to handle special characters and long names
    const sanitizedLayerName = geoserverLayer.trim();
    
    // URL encode the layer name to handle special characters (ó, í, etc.)
    const encodedLayerName = encodeURIComponent(sanitizedLayerName);
    
    console.log(`Creating WMS layer: store=${geoserverStore}, original layer=${sanitizedLayerName}, encoded=${encodedLayerName}, name=${geoserverName}`);
    
    // Check if this layer might cause issues
    if (sanitizedLayerName.length > 100) {
        console.warn(`Layer name is very long (${sanitizedLayerName.length} chars): ${sanitizedLayerName}`);
    }
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
            urldownload: geonetwork,
            extent: [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244]
        });
        
        // Add error handling for the WMS source
        const source = wms.getSource();
        source.on('tileloaderror', function(event) {
            console.error(`Tile load error for layer ${geoserverName}:`, event);
            console.error(`Failed URL: ${event.tile.src_}`);
        });
        
        console.log(`✅ Successfully created WMS layer: ${geoserverName}`);
        return wms;
        
    } catch (error) {
        console.error(`❌ Error creating WMS layer ${geoserverName}:`, error);
        return null;
    }
}
