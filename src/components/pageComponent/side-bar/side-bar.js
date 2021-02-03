import './sidebar.scss';
import $ from "jquery";
import {openSideBar} from './open-sidebar'
import {closeSideBar} from './close-sidebar'

$('#sideBar').on( "mouseenter touchstart", function() {
  openSideBar();
})
$('#sideBar').on( "mouseleave touchend", function() {
  closeSideBar();
});


document.addEventListener("touchstart", function() {}, true);
