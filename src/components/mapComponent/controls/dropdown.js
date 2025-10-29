import $ from "jquery";
import {layerSelection} from './layersSelect'

import {fromLonLat} from 'ol/proj';
import { fitCenter } from "../map";
// create dropdown searching
export function createDropdown(title,name,data){
    // create dropdown
    let menuItems = $('#dropdown-items');
    menuItems.empty();
    let lengthData = data.length;
    if(lengthData>0){
      for (let i = 0; i < lengthData; i++) {
        let coord=data[i].coord_central;
        // dropdown items - use <a> instead of <option> for clickable items
        let dropdownItems = document.createElement('a');
        dropdownItems.textContent=data[i].nombre+ ',' +data[i].dpto_nombre;
        dropdownItems.setAttribute('class','dropdown-item');
        dropdownItems.setAttribute('href', '#');
        dropdownItems.setAttribute('data-coord', coord);

        menuItems.append(dropdownItems);
      }
    }else{
      // no coincidence
      let dropdownFail = document.createElement('div');
      dropdownFail.setAttribute('class','dropdown-header dropdown_empty');
      dropdownFail.innerHTML ='No hay ninguna coincidencia'
      menuItems.append(dropdownFail);
    }

}
// selection of dropdown item - use event delegation for dynamically created elements
$(document).on('click', '#dropdown-items .dropdown-item', function(e) {
  e.preventDefault();
  $('#dropdown-menu-mupio').hide();
  
  let coordinate = $(this).attr('data-coord').replace(/'/g, '"');
  coordinate = JSON.parse(coordinate);
  // zoom to the center coordinate
  let coo1=fromLonLat(coordinate,'EPSG:3857');
  fitCenter(coo1);
  
  layerSelection(coo1);
});