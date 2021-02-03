import 'ol/ol.css';

import Select from 'ol/interaction/Select';
import {altKeyOnly} from 'ol/events/condition';

import {styleHighlightClickMpio} from '../layer-style/layers-style'

export const interaction=()=>{
    try{
        var select = null; // ref to currently selected interaction

        //style to be added on selected layer
        var style_selected = styleHighlightClickMpio;
      // select interaction working on "click"
        var selectClick = new Select({
            condition: function(evt) {return evt.type === "singleclick" && !altKeyOnly(evt);},
            style: function(feature) {
                style_selected.getText().setText(feature.values_.nombre_mpi)
                return style_selected;
            },
        });
        
        select = selectClick;
        return select
    }catch{
        console.log('error en interaccion con el mapa')
    }

}


//         if (select !== null) {
//             console.log(select);
//             // map.removeInteraction(select);
//             map.addInteraction(select);
//             select.on('select', function(e) {
//                 var features =e.target.getFeatures();
//                 var length =features.getLength();
//                 if(length>0){
//                     // console.log(e.target.getFeatures(),e.target.getFeatures().getLength(),e.deselected.length)
//                     features.forEach(function(feature) {
//                         // var layer = me.select.getLayer(feature);
//                         // alert('Selected ' + feature.getId());
//                         console.log(feature.values_,feature.values_.mpi,feature.values_.nombre_dpt,e.target.getFeatures().getLength())

//                     });
//                 }

               
//             });
//         }
// }
