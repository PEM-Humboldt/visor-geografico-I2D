import $ from "jquery";
import './sideoptions.scss';

import {updateSize} from '../../mapComponent/map-control'
import {removeInteraction} from '../../mapComponent/map-control'

$('#closeSideOptions').on( "click", function() {
    closeSideOptions()
})

// open side options
export const openSideOptions=()=>{
    // resize map
    $('#mapSection').removeClass('nonactive').addClass('active');
    updateSize();
    // show side Options
    $('#sideOptions').removeClass('nonactive');
}

// close side options
export const closeSideOptions=()=>{
    $('#mapSection').removeClass('active').addClass('nonactive');
    $('#sideOptions').addClass('nonactive');

    updateSize();
    removeInteraction();

    $('#chartdiv').html('');
    $('#titleResume').html('');
}