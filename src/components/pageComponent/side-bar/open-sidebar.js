import $ from "jquery";
import {updateSize} from '../../mapComponent/map'
import {closeDropdown} from './close-sidebar'

// open side bar events
export var openSideBar=()=>{
    $('#sideBar').removeClass('nonactive');
    $('#sideBar').addClass('active');
    $('#closebtn').addClass('active');
    $('.centerLiIcons').removeClass('nonactive');
    $('.sideBarSpanNoActive').addClass('sideBarSpanActive').removeClass('sideBarSpanNoActive');
    
    $('#tutorialstep2').addClass('active');
    // map resize when change view
    setTimeout(function(){ updateSize()}, 100);
}

// open side bar dropdown items
const sideBarDropdown=(div)=>{
    if ($(div).hasClass('active')) {
      closeDropdown(div)
    } else {
      $(div).removeClass('nonactive');
      $(div).addClass('active');
    }
}

$('#catalogs-nav').on('click', function(){
    sideBarDropdown('#dropdown-catalogs')
});