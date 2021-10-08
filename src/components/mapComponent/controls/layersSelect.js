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

import { set_title_mupio,set_title_dpto,set_cod_mupio } from '../../globalVars';
// import {GEOSERVER_URL} from '../../server/url'
// =========================================================================

// get wms layers if turn on
export var layerSelection=(coordinate)=>{
    // select the wms layers
    $('#contenedorg').html('');
    $('#nav-layers').attr("style", "display:none");
    // wms layers                
    for (var i = 0; i < AllLayerss.length; i++) {
        // if turn on
        if (AllLayerss[i].values_.visible === true) {
            // get features data
            wmsGetProps(AllLayerss,i,coordinate,Selection);
        }else if(AllLayerss[i].values_.visible === false){
            // mupios is not active
            $('#layers-data-tab').tab('show');
            $('#nav-layers').attr("style", "display:block"); 
            if(i==1 && i==2){
                highlightStadisticsRemove();
            }

            $('#nav-chart').attr("style", "display:none"); 
        }
    }
}

var Selection=(features,i)=>{
    var feature=features[0];
    if(features.length>0){
        openSideOptions();
        $('#nav-layers').attr("style", "display:block"); 

        // municipios stadistics i=1
        if(i==1){
            // get data from python and create chart
            openMupioData(feature)
        }else{
           // if layer different to mupio
            hightlightRemove();
        }

        // layers on click coordinate create group table
        FeatSelect(features,i);
    }else{
        console.log('sin features')
    }
}

var openMupioData=(feature)=>{
    // get species data from python

    var selectedStadistics =$('#stadisticstype').children("option:selected").val()
    let existingSidebar = $('#titleMpio');
    let existingDptoDropdown = $('#titleDpto');
    
    let title_dpto =set_title_dpto(feature.values_.dpto_nombre)
    let title_mupio =set_title_mupio(feature.values_.nombre)
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

        if(selectedStadistics=='mpio_politico'){
            let urlMpioReq='mpio/charts/'+cod_mupio;
            pythonGetRequest(chartData,urlMpioReq,'No fue posible cargar las estadisticas, intente nuevamente',errorCallback);
    
            let urlMpioDangReq='mpio/dangerCharts/'+cod_mupio;
            pythonGetRequest(chartDangerData,urlMpioDangReq);
        }else{
            let urlMpioReq='dpto/charts/'+cod_mupio;
            pythonGetRequest(chartData,urlMpioReq,'No fue posible cargar las estadisticas, intente nuevamente',errorCallback);
    
            let urlMpioDangReq='dpto/dangerCharts/'+cod_mupio;
            pythonGetRequest(chartDangerData,urlMpioDangReq);
        }
    }

 


    // if mupio change
    if(existingSidebar[0].innerText!="Municipio " + title_mupio){
        // title mupio sidebar
        existingSidebar[0].innerText = "Municipio " + title_mupio;
        existingDptoDropdown[0].innerText = "Departamento " + title_dpto;

        $('#resume-data-tab').tab('show');

        // obtener fecha de descarga solo una vez
        if($('.gbifInfo')[0].innerText==''){
            let urlReq='gbif/gbifinfo';
            pythonGetRequest(gbifData,urlReq,'No fue posible cargar la información de gbif')
        }
        $('#loading-chart').attr("style", "display:block");

        highlightStadisticsRemove();
        highlightStadisticsAdd(feature);
        if($('#nav-chart').css('display') == 'none'){
            $('#nav-chart').attr("style", "display:block"); 
        }
       
    }else if($('#nav-chart').css('display') == 'none'){
        $('#resume-data-tab').tab('show');
        $('#nav-chart').attr("style", "display:block");
        highlightStadisticsRemove()
        highlightStadisticsAdd(feature);
    }

}