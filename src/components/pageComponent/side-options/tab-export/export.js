import $ from "jquery";

// import {wfsSearchArray} from '../geoserverComponent/wfs'
import {geojsonLayer} from '../../../server/geoserver/geojson'
import {createDropdown} from './dropdown'

export const exportData =()=>{
    try{
        var deptosWFS = geojsonLayer('Capas_Base','dpto_politico');
        var mpioWFS = geojsonLayer('Capas_Base','mpio_politico'); 
        console.log(deptosWFS);
        // document.addEventListener("DOMContentLoaded",function(){
            createDropdown('depto','departamento',deptosWFS);
            createDropdown('mpio','municipio',mpioWFS);
        // })    
    }catch{
        console.log('no fue posible cargar la información')
    }
    
}
