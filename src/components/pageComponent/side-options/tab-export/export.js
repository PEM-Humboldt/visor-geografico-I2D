import $ from "jquery";

// import {wfsSearchArray} from '../geoserverComponent/wfs'
import {geojsonLayer} from '../../../geoserverComponent/geojson'
import {createDropdown} from './dropdown'

export const exportData =()=>{
    try{
        const createOptionsVar=()=>{
            let existingSidebar = $('#exportData');
            let sidebar = document.createElement('h5');
            sidebar.id = "titleSideOptions";
            sidebar.innerHTML = "Exportar información";
            existingSidebar.append(sidebar)
        }
        // var deptosWFS =wfsSearchArray('i2d:dpto_politico');
        // var mpioWFS =wfsSearchArray('i2d:mpio_politico');
        var deptosWFS = geojsonLayer('i2d','dpto_politico');
        var mpioWFS = geojsonLayer('i2d','mpio_politico'); 
        
        // document.addEventListener("DOMContentLoaded",function(){
            createOptionsVar();
            createDropdown('depto','departamento',deptosWFS);
            createDropdown('mpio','municipio',mpioWFS);
        // })    
    }catch{
        console.log('no fue posible cargar la información')
    }
    
}
