import $ from 'jquery';
import {streetmap,CartoDB_Positron} from '../layers'
import {mapZoomEnd,addLayer,removeLayer,getZoom} from '../map'

var changeBasemap=(currentbm,newbm)=>{
    currentbm.setVisible(false);
    newbm.setVisible(true);
}

var zoomChangeBasemap=()=>{
    if(getZoom() > 10){
        $('input#CartoDBPositron').prop('checked', true);
        $('input#StreetMap').prop('checked', false);
        changeBasemap(streetmap,CartoDB_Positron)
    }else{
        $('input#CartoDBPositron').prop('checked', false);
        $('input#StreetMap').prop('checked', true);
        changeBasemap(CartoDB_Positron,streetmap)
    }
}

// change the base map on zoom
mapZoomEnd(zoomChangeBasemap);

