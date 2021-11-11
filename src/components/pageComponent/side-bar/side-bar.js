import './sidebar.scss';
import $ from "jquery";
import {openSideBar} from './open-sidebar'
import {closeSideBar} from './close-sidebar'

// is the left panel, interactions are showing here
// open the side bar
$('#sideBar').on( "mouseenter touchstart", function() {
  openSideBar();
})
// close the side bar
$('#closebtn').on( "click", function() {
  closeSideBar();
});

document.addEventListener("touchstart", function() {}, true);
