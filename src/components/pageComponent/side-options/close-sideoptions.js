import $ from "jquery";
import {updateSize} from '../../mapComponent/map-control'
import {removeInteraction} from '../../mapComponent/map-control'

export const closeSideOptions=()=>{
    $('#mapSection').removeClass('active').addClass('nonactive');
    $('#sideOptions').addClass('nonactive');

    updateSize();
    removeInteraction();
}