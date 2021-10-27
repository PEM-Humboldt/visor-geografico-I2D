import $ from "jquery";

import {FeatSelect} from '../../pageComponent/side-options/tab-layers/layersSelected'
import {AllLayerss} from './tree-layers'
import {wmsGetProps} from '../../server/geoserver/wmsGetProps';
import {openSideOptions} from '../../pageComponent/side-options/side-options'

// chart tab
import {hightlightRemove,highlightStadisticsAdd,highlightStadisticsRemove} from '../layers'

import {pythonGetRequest} from '../../server/pythonserver/pythonRequest'
import {chartData,chartDangerData} from "../../pageComponent/side-options/tab-charts/chart"
import {gbifData} from "../../pageComponent/side-options/tab-charts/gbif-info"

import { set_title_mupio,set_title_dpto,set_cod_mupio,set_cod_dpto } from '../../globalVars';

// =========================================================================
let existingSidebar,dptoFeature
// get wms layers if turn on
export var layerSelection=(coordinate)=>{
    // select the wms layers
    $('#contenedorg').html('');
    $('#nav-layers').attr("style", "display:none");
    // wms layers          
    
    for (var i = 0; i < AllLayerss.length; i++) {
        // if turn on
        if (i==1 && AllLayerss[i].values_.visible === true) {
            // get mupio features data
            wmsGetProps(AllLayerss,1,coordinate,Selection);
            wmsGetProps(AllLayerss,0,coordinate,featDpto);
            function featDpto(features,i) {
                dptoFeature=features[0]
            }    
    
        }else if (AllLayerss[i].values_.visible === true) {
            // get dpto features data
            wmsGetProps(AllLayerss,i,coordinate,Selection);
        }else if(AllLayerss[i].values_.visible === false){
            // mupios is not active
            $('#layers-data-tab').tab('show');
            $('#nav-layers').attr("style", "display:block"); 
            if(i==1 && i==0){
                highlightStadisticsRemove();
                $('#nav-chart').attr("style", "display:none"); 
            }
        }
    }
}

var Selection=(features,i)=>{
    var feature=features[0];
    let cod_dpto=''
  
    openSideOptions();
    $('#nav-layers').attr("style", "display:block"); 

    // if layer different to mupio and dpto
    hightlightRemove();

    // municipios stadistics i=1 // dpto stadistics i=0
    if(i==1 || i==0){
        if(i==0){dptoFeature=feature}
        createDropdownStadistics(feature,i)
        cod_dpto= set_cod_dpto(feature.values_.codigo.substring(0, 2))

        // get data from python and create chart
        openData(feature,cod_dpto)
    }

    // layers on click coordinate create group table
    FeatSelect(features,i);
}

var createDropdownStadistics=(feature,id)=>{
    $("#stadisticstype").empty(); //To reset dropdown
    let title_dpto='';
    // if mupio layer is on 
    if(id==1){
        title_dpto =set_title_dpto(feature.values_.dpto_nombre)
        let title_mupio =set_title_mupio(feature.values_.nombre)

        $("#stadisticstype").append("<option value='mpio_politico' selected id='titleMpio'> Municipio " + title_mupio + "</option>")
        $("#stadisticstype").append("<option value='dpto_politico' id='titleDpto'>Departamento "+title_dpto+"</option>")
    
        existingSidebar = $('#titleMpio');
    // if dpto layer is on 
    }else if(id==0){
        title_dpto =set_title_dpto(feature.values_.nombre)
        $("#stadisticstype").append("<option value='dpto_politico' selected id='titleDpto'>Departamento "+title_dpto+"</option>")
    
        existingSidebar = $('#titleDpto');
    }
}


var openData=(feature,cod_depto)=>{
    // get species data from python
    var selectedStadistics =$('#stadisticstype').children("option:selected").val()
    
    let cod_mupio=set_cod_mupio(feature.values_.codigo)

    $("#stadisticstype").on('change',function(){
        selectedStadistics = $(this).children("option:selected").val();
        changeDataChart(selectedStadistics,cod_mupio)
    })

    changeDataChart(selectedStadistics,cod_mupio)



    function changeDataChart (selectedStadistics,cod_mupio){

        // open chart div on click
        for ( let i = 0; i < $('.collapseChart').length; i++ ){
            if ( $($('.collapseChart')[i]).hasClass('show')==false ){
                $($('.collapseChart')[i]).addClass('show');
                $($('.tabChart')[i]).removeClass('collapsed');
            }
        }


        var errorCallback=()=>{
            $('#layers-data-tab').tab('show');
            $('#nav-chart').hide();
            $('#resumeData').hide();
            
            $('#loading-chart').attr("style", "display:none");
        }

        highlightStadisticsRemove();
       

        if(selectedStadistics=='mpio_politico'){
            highlightStadisticsAdd(feature);

            let urlMpioReq='mpio/charts/'+cod_mupio;
            pythonGetRequest(chartData,urlMpioReq,'No fue posible cargar las estadisticas, intente nuevamente',errorCallback);
    
            let urlMpioDangReq='mpio/dangerCharts/'+cod_mupio;
            pythonGetRequest(chartDangerData,urlMpioDangReq);

        }else if(selectedStadistics=='dpto_politico'){
            highlightStadisticsAdd(dptoFeature);
            
            let urlDptoReq='dpto/charts/'+cod_depto;
            pythonGetRequest(chartData,urlDptoReq,'No fue posible cargar las estadisticas, intente nuevamente',errorCallback);
    
            let urlDptoDangReq='dpto/dangerCharts/'+cod_depto;
            pythonGetRequest(chartDangerData,urlDptoDangReq);

        }
    }


    // if mupio or depto changes
    if((selectedStadistics=='mpio_politico' && existingSidebar[0].innerText!="Municipio " + feature.values_.nombre) || (selectedStadistics=='dpto_politico' && existingSidebar[0].innerText!="Departamento " + feature.values_.nombre)){

        $('#resume-data-tab').tab('show');

        // obtener fecha de descarga solo una vez
        if($('.gbifInfo')[0].innerText==''){
            let urlReq='gbif/gbifinfo';
            pythonGetRequest(gbifData,urlReq,'No fue posible cargar la información de gbif')
        }
        $('#loading-chart').attr("style", "display:block");

        if($('#nav-chart').css('display') == 'none'){
            $('#nav-chart').attr("style", "display:block"); 
        }
       
    }else if($('#nav-chart').css('display') == 'none'){
        $('#resume-data-tab').tab('show');
        $('#nav-chart').attr("style", "display:block");
    }

}