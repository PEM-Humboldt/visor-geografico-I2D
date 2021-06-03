import $ from "jquery";
import {updateSize} from '../../mapComponent/map'

export function closeSideBar(){
    $('#sideBar').removeClass('active');
    $('#sideBar').addClass('nonactive');
    $('#closebtn').removeClass('active');
    $('.centerLiIcons').addClass('nonactive');
    $('.sideBarSpanActive').addClass('sideBarSpanNoActive').removeClass('sideBarSpanActive');
    $('#dropdown-catalogs').removeClass('active').addClass('nonactive')
    $('#tutorialstep2').removeClass('active');
    // document.getElementById("closebtn").style.display = "none"; 
    setTimeout(function(){updateSize()}, 100);
  }

export const closeDropdown=(div)=>{
  $(div).removeClass('active');
  $(div).addClass('nonactive');
}