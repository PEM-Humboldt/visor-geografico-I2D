import './chart.scss'

import $ from "jquery";
import {charCreate} from "./create-chart/pie-chart"

export const chartData =(data,title_mupio,divHtml)=>{
    try{
        // create chart and replace data
        charCreate(data,divHtml);     
        $('#loading-chart').attr("style", "display:none");   
    }catch{
        console.log('no se puede cargar')
    }
}