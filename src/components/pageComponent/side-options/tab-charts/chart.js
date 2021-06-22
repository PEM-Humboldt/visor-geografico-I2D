import './chart.scss'

import $ from "jquery";
import {charCreate} from "./create-chart/pie-chart"

export const chartData =(data)=>{
    try{
        // create chart and replace data
        charCreate(data,'chartdivRg','registers');    
        charCreate(data,'chartdivSp','species');    
        charCreate(data,'chartdivSpEnd','endemicas');    
        charCreate(data,'chartdivSpEx','exoticas');      
        
        $('#loading-chart').attr("style", "display:none");   
    }catch{
        console.log('no se puede cargar')
    }
}


export const chartDangerData =(data)=>{
    try{
        charCreate(data,'chartdivDangerSp','amenazadas');    
        $('#loading-chart').attr("style", "display:none");  
    }catch{
        console.log('no se puede cargar')
    }
}