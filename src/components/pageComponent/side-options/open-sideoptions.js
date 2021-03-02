import $ from "jquery";
import {updateSize} from '../../mapComponent/map-control'
import {exportData} from "./tab-export/export"
import {resumeData} from "./tab-resume/resume"
import {PYTHONSERVER} from '../../geoserverComponent/url'

export const openSideOptions=(layerSelect)=>{
    // console.log(layerSelect.mpio_ccnct)
    var selectName=layerSelect.mpio_cnmbr;

    // console.log(PYTHONSERVER);
    $.ajax({
        url: PYTHONSERVER+layerSelect.mpio_ccnct,
        type: "GET",
        crossDomain : true,
        success: function (data, status, xhr) {
            // console.log(data);
            if(selectName){
                $('#mapSection').removeClass('nonactive').addClass('active');
        
                updateSize();
            
                $('#sideOptions').removeClass('nonactive');
                $('#titleSideOptions').length?null:exportData()
            
                // $('h5#titleResume').length?$('h5#titleResume').html("Información " + selectName):
                resumeData(selectName,data)
             
            }
        },
        error: function (jqXHR, exception) {
            //console.log(jqXHR);
            console.log(jqXHR,exception);
            //console.log(msg);
        }
    });

}
