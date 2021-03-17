import $ from "jquery";

import {layerSelection} from './layersSelect'


export var onClickMap=(evt)=>{
    // select the wms layers
    $('#contenedorg').html('');

    // layer get props and stadistics municipios
    layerSelection(evt.coordinate);
}

