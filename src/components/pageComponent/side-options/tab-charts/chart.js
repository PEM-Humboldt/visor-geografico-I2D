import './chart.scss'

import $ from "jquery";
import {charCreate} from "./create-chart/pie-chart"

import './create-chart/exportReport/export-modal'

export var chartReg,chartSp,chartEndemicSp,chartExoticSp,chartDangerSp;

// this is the main chart, where is creating all the charts
// the data comes from an api
export const chartData =(data)=>{
    try{
        // create chart and replace data
        chartReg= charCreate(data,'chartdivRg','registers');    
        chartSp= charCreate(data,'chartdivSp','species');    
        chartEndemicSp= charCreate(data,'chartdivSpEnd','endemicas');    
        chartExoticSp= charCreate(data,'chartdivSpEx','exoticas');      
        $('#loading-chart').attr("style", "display:none");   
    }catch{
        console.log('no se puede cargar')
    }
}

// the data comes from an api
export const chartDangerData =(data)=>{
    try{
        chartDangerSp= charCreate(data,'chartdivDangerSp','amenazadas','danger');    
        $('#loading-chart').attr("style", "display:none");  
    }catch{
        console.log('no se puede cargar')
    }
}