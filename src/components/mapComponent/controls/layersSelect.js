import {FeatSelect} from '../../pageComponent/side-options/tab-layers/layersSelected'
import {AllLayerss} from './tree-layers'
import {wmsGetProps} from '../../server/geoserver/wmsGetProps';
import {openSideOptions} from '../../pageComponent/side-options/side-options'
import $ from "jquery";
// chart tab
import {hightlightRemove,hightlightMupioAdd,highlightMupioRemove} from '../layers'
import {mpios,deptos} from '../layers'
import {pythonGetRequest} from '../../server/pythonserver/pythonGetRequest'
import {chartData} from "../../pageComponent/side-options/tab-charts/chart"
import {gbifData} from "../../pageComponent/side-options/tab-charts/gbif-info"

import {GEOSERVER_URL} from '../../server/url'
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
        }else if(AllLayerss[i].values_.visible === false && i==1){
            // mupios is not active
            $('#layers-data-tab').tab('show');
            $('#nav-layers').attr("style", "display:block"); 
            highlightMupioRemove();
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
            // var payload =  '<wfs:GetFeature xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs" xmlns:gml="http://www.opengis.net/gml" xmlns:wfs="http://www.opengis.net/wfs" xmlns:ogc="http://www.opengis.net/ogc" service="WFS" version="1.0.0"> <wfs:Query typeName="Capas_Base:dpto_politico"> <ogc:Filter> <ogc:Intersects> <ogc:PropertyName>geom</ogc:PropertyName> <gml:Polygon srsName="http://www.opengis.net/gml/srs/epsg.xml#4326"><gml:outerBoundaryIs><gml:LinearRing><gml:coordinates>-106.86953585585587,42.627785135135127 -107.47663975975976,38.803030540540533 -105.29106570570572,35.342538288288281 -99.280737057057067,36.01035258258257 -98.4307915915916,41.413577327327317 -106.86953585585587,42.627785135135127</gml:coordinates></gml:LinearRing></gml:outerBoundaryIs></gml:Polygon> </ogc:Intersects> </ogc:Filter></wfs:Query></wfs:GetFeature>';    
            // $.ajax(GEOSERVER_URL+'ows', {
            //         type: 'POST',
            //         dataType: 'xml',
            //         processData: false,
            //         contentType: 'text/xml',
            //         data: payload,
            //         success: function (xml) {
            //             console.log(xml)
            //         },
            //         error: function (xml) {
            //             console.log('error');
            //         }
            //   }).done(function() {
            //     console.log('done')
            //   });

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
    let existingSidebar = $('#titleResume');
    let title_mupio =feature.values_.nombre
    // if mupio change
    if(existingSidebar[0].innerText!="Municipio " + title_mupio){
        // title mupio sidebar
        existingSidebar[0].innerText = "Municipio " + title_mupio;

        $('#resume-data-tab').tab('show');

        // obtener fecha de descarga solo una vez
        if($('.gbifInfo')[0].innerText==''){
            let urlReq='gbif/gbifinfo';
            pythonGetRequest(gbifData,urlReq)
        }
        $('#loading-chart').attr("style", "display:block");
        let urlRegReq='mpio/registers/'+feature.values_.codigo;
        let urlSpecReq='mpio/species/'+feature.values_.codigo;
        
        pythonGetRequest(chartData,urlRegReq,title_mupio,"chartdiv");
        pythonGetRequest(chartData,urlSpecReq,title_mupio,"chartdiv1");

        highlightMupioRemove();
        hightlightMupioAdd(feature);
        if($('#nav-chart').css('display') == 'none'){
            $('#nav-chart').attr("style", "display:block"); 
        }
       
    }else if($('#nav-chart').css('display') == 'none'){
        $('#resume-data-tab').tab('show');
        $('#nav-chart').attr("style", "display:block");
        highlightMupioRemove()
        hightlightMupioAdd(feature);
    }

}