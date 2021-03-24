import $ from "jquery";
import './sideoptions.scss';

import {updateSize} from '../../mapComponent/map-control'
import {hightlightRemove,highlightMupioRemove} from '../../mapComponent/layers'

$('#closeSideOptions').on( "click", function() {
    closeSideOptions()
})

// open side options
export const openSideOptions=()=>{
    // resize map
    if($('#sideOptions').hasClass('nonactive')){
        $('#mapSection').removeClass('nonactive').addClass('active');
        updateSize();
        // show side Options
        $('#sideOptions').removeClass('nonactive');

        $('#tutorialstep4').addClass('activeSide');
    }

}

// close side options
export const closeSideOptions=()=>{
    $('#mapSection').removeClass('active').addClass('nonactive');
    $('#sideOptions').addClass('nonactive');

    $('#tutorialstep4').removeClass('activeSide')
    updateSize();
    hightlightRemove();
    highlightMupioRemove();

    $('#chartdiv').html('');
    $('#titleResume').html('');
}