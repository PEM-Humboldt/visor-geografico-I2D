import $ from 'jquery';
import {streetmap,CartoDB_Positron} from '../layers'
import {mapZoomEnd,getZoom} from '../map'

var changeBasemap=(currentbm,newbm)=>{
    currentbm.setVisible(false);
    newbm.setVisible(true);
}

var zoomChangeBasemap=()=>{
    if(getZoom() > 10){
        if($('input#StreetMap').is(':checked')==true){
            $('input#CartoDBPositron').prop('checked', true);
            $('input#StreetMap').prop('checked', false);
            changeBasemap(streetmap,CartoDB_Positron)
        }
    }else{
        if($('input#CartoDBPositron').is(':checked')==true){
            $('input#CartoDBPositron').prop('checked', false);
            $('input#StreetMap').prop('checked', true);
            changeBasemap(CartoDB_Positron,streetmap)
        }
    }
}

// change the base map on zoom
mapZoomEnd(zoomChangeBasemap);

