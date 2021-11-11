import $ from "jquery";
import './sideoptions.scss';

import {updateSize} from '../../mapComponent/map'
import {hightlightRemove,highlightStadisticsRemove} from '../../mapComponent/layers'

// is the right panel, interactions are showing here

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
    highlightStadisticsRemove();

    $('#chartdiv').html('');
    $('#titleResume').html('');
}