import {FeatSelect} from '../../pageComponent/side-options/tab-layers/layersSelected'
import {AllLayerss} from './tree-layers'
import {wmsGetProps} from '../../server/geoserver/wmsGetProps';
import {openSideOptions,closeSideOptions} from '../../pageComponent/side-options/side-options'
import $ from "jquery";
// chart tab
import {hightlightAdd,hightlightRemove,hightlightMupioAdd,highlightMupioRemove} from '../layers'
import {pythonGetRequest} from '../../server/pythonserver/pythonGetRequest'
import {resumeData} from "../../pageComponent/side-options/tab-resume/resume"


// =========================================================================

// get wms layers if turn on
export var layerSelection=(coordinate)=>{
    $('#nav-layers').attr("style", "display:none");
    // $('#nav-chart').attr("style", "display:none");
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
        // $('#nav-chart').attr("style", "display:none"); 
        // highlightMupioRemove();
        // municipios stadistics i=1
        if(i==1){
            // get data from python and create chart
            openMupioData(feature)
        }else{
            // $('#layers-data-tab').tab('show');
             // if layer different to mupio

            hightlightRemove();
            hightlightAdd(feature);
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
    let title_mupio =feature.values_.mpio_cnmbr
    // if mupio change
    if(existingSidebar[0].innerText!="Información " + title_mupio){
        $('#loading-chart').attr("style", "display:block");
        $('#resume-data-tab').tab('show');
        pythonGetRequest(resumeData,feature);
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