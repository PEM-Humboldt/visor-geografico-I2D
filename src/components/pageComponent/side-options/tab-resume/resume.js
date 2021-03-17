import $ from "jquery";
import {charCreate} from "./chart"

export const resumeData =(feature,title_mupio,data)=>{
    let existingSidebar = $('#titleResume');
    try{
        // console.log(existingSidebar[0].innerText,feature);
        existingSidebar[0].innerText = "Información " + title_mupio;
        // create chart and replace data
        charCreate(data);
        $('#loading-chart').attr("style", "display:none");
        
    }catch{
        console.log('no se puede cargar')
    }
}