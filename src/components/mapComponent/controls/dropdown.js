import $ from "jquery";
import {layerSelection} from './layersSelect'

import {fromLonLat} from 'ol/proj';
// create dropdown with search
export function createDropdown(title,name,data){
    // create dropdown
    let menuItems = $('#dropdown-items');
    menuItems.empty();
    let lengthData = data.length;
    if(lengthData>0){
      for (let i = 0; i < lengthData; i++) {
        let coord=data[i].coord_central;
        // dropdown items
        let dropdownItems = document.createElement('option');
        dropdownItems.textContent=data[i].nombre+ ',' +data[i].dpto_nombre;
        dropdownItems.setAttribute('class','dropdown-item');
        dropdownItems.setAttribute('type', 'button');
        dropdownItems.setAttribute('value', coord);

        menuItems.append(dropdownItems);
      }
    }else{
      let dropdownFail = document.createElement('div');
      dropdownFail.setAttribute('class','dropdown-header dropdown_empty');
      dropdownFail.innerHTML ='No hay ninguna coincidencia'
      menuItems.append(dropdownFail);
    }

}
// selection of dropdown item
$('#menu-items-mupio').find('.dropdown-items').on('click', function(e) {
  $('#dropdown-menu-mupio').hide() 
  
  let coordinate = e.target.value.replace(/'/g, '"');
  coordinate = JSON.parse(coordinate);
  
  let coo1=fromLonLat(coordinate,'EPSG:3857')
  layerSelection(coo1);
})