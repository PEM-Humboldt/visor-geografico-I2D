import $ from "jquery";
import {updateSize} from '../../mapComponent/map-control'

export function openSideBar(){
    $('#sideBar').removeClass('nonactive');
    $('#sideBar').addClass('active');
    $('#closebtn').addClass('active');
  
    $('.sideBarSpanNoActive').addClass('sideBarSpanActive').removeClass('sideBarSpanNoActive');
    // map resize when change view
    setTimeout(function(){ updateSize()}, 100);
  }
  