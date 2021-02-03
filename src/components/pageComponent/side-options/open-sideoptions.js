import $ from "jquery";

import {exportData} from "./tab-export/export"
import {resumeData} from "./tab-resume/resume"
export const openSideOptions=(depto,mupio)=>{
    console.log(depto,mupio)
    $('#sideOptions').removeClass('nonactive');
    $('#titleSideOptions').length?null:exportData()
    $('h5#titleResume').length?$('h5#titleResume').html("Información " + mupio):resumeData(mupio)
}
