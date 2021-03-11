import 'ol/ol.css';

import Select from 'ol/interaction/Select';
import {altKeyOnly} from 'ol/events/condition';

import {styleHighlightClickMpio} from '../layer-style/layers-style'

import {addInteraction} from '../map-control';

export const interaction=()=>{
    try{
        var select = null; // ref to currently selected interaction

        //style to be added on selected layer
        var style_selected = styleHighlightClickMpio;
        // select geojson interaction working on "click"
        var selectClick = new Select({
            condition: function(evt) {return evt.type === "singleclick" && !altKeyOnly(evt);},
            style: function(feature) {
                // console.log(feature.values_.mpio_cnmbr)
                style_selected.getText().setText(feature.values_.mpio_cnmbr)
                return style_selected;
            },
        });
        
        select = selectClick;
        return select
    }catch{
        console.log('error en interaccion geojson con el mapa')
    }

}

export var showInteraction=()=>{
    let selection= interaction();
    addInteraction(selection);
}
