import $ from "jquery";

import {openSideOptions} from '../../pageComponent/side-options/side-options'
import {layerSelection} from './layersSelect'

// chart tab
import {pythonGetRequest} from '../../server/pythonserver/pythonGetRequest'
import {resumeData} from "../../pageComponent/side-options/tab-resume/resume"

import {getFeaturesAtPixel,fitView} from '../map-control';

export var onClickMap=(evt)=>{
        // select the wms layers
        $('#contenedorg').html('');

        layerSelection(evt.coordinate);

        var features = getFeaturesAtPixel(evt.pixel);
        if (features.length != 0) {
            // console.log('hh',features);
            // select geojson for opening stadistics
            var ext=features[0].getGeometry().getExtent();
            fitView(ext);

            var layerSelect=features[0].values_;
            openMupioData(layerSelect);
        }else{
            $('#nav-chart').attr("style", "display:none");
            $('#layers-data-tab').tab('show');
        };
}

var openMupioData=(layerSelect)=>{
    // get species data from python
    var selectName=layerSelect.mpio_cnmbr;
    if(selectName){
        $('#nav-chart').attr("style", "display:block");        
        $('#resume-data-tab').tab('show');
        pythonGetRequest(resumeData,layerSelect.mpio_ccnct,selectName);
        openSideOptions();
    }
}