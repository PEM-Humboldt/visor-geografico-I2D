import $ from "jquery";
import {updateSize} from '../../mapComponent/map'

// close side bar events 
export function closeSideBar(){
    $('#sideBar').removeClass('active');
    $('#sideBar').addClass('nonactive');
    $('#closebtn').removeClass('active');
    $('.centerLiIcons').addClass('nonactive');
    $('.sideBarSpanActive').addClass('sideBarSpanNoActive').removeClass('sideBarSpanActive');
    $('#dropdown-catalogs').removeClass('active').addClass('nonactive')
    $('#tutorialstep2').removeClass('active');

    setTimeout(function(){updateSize()}, 100);
  }
// close side bar dropdown items
export const closeDropdown=(div)=>{
  $(div).removeClass('active');
  $(div).addClass('nonactive');
}