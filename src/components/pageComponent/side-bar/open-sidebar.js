import $ from "jquery";
import {updateSize} from '../../mapComponent/map-control'

export var openSideBar=()=>{
    $('#sideBar').removeClass('nonactive');
    $('#sideBar').addClass('active');
    $('#closebtn').addClass('active');
    $('.centerLiIcons').removeClass('nonactive');
    $('.sideBarSpanNoActive').addClass('sideBarSpanActive').removeClass('sideBarSpanNoActive');
    // map resize when change view
    setTimeout(function(){ updateSize()}, 100);
}