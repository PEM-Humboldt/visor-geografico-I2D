import $ from "jquery";
import {charCreate} from "./chart"

export const resumeData =(title_mupio,data)=>{
    try{

        let existingSidebar = $('#titleResume');
        existingSidebar[0].innerText = "Información " + title_mupio;
           
        charCreate(data)

    }catch{
        console.log('no fue posible cargar la información')
    }
    
}