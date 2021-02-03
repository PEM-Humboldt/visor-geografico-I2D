import $ from "jquery";
import {updateSize} from '../../mapComponent/map-control'

export function closeSideBar(){
    $('#sideBar').removeClass('active');
    $('#sideBar').addClass('nonactive');
    $('#closebtn').removeClass('active');
    $('.sideBarSpanActive').addClass('sideBarSpanNoActive').removeClass('sideBarSpanActive');
    // document.getElementById("closebtn").style.display = "none"; 
    setTimeout(function(){updateSize()}, 100);
  }