import {showInteraction} from './interact-map'
import {wmsOnLayers} from '../../pageComponent/side-options/tab-layers/layersSelected'

// show selection on map
export var layerSelection=(coordinate)=>{
    // select geojson municipio layer
    showInteraction();

    // select wms layers if turn on
    wmsOnLayers(coordinate);
    
}