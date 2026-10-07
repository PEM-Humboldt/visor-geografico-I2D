import './chart.scss'

import $ from "jquery";
import {charCreate} from "./create-chart/pie-chart"

import './create-chart/exportReport/export-modal'

export var chartReg,chartSp,chartEndemicSp,chartExoticSp,chartDangerSp;

// Declare variables to keep track of any previous existing charts
let activeChartReg = null;
let activeChartSp = null;
let activeChartEndemic = null;
let activeChartExotic = null;

// this is the main chart, where is creating all the charts
// the data comes from an api
export const chartData =(data)=>{
    try{
        const chartDiv = document.getElementById('chartdivRg');
        
        // Destroys previous charts, if any
        if (activeChartReg) { activeChartReg.dispose(); }
        if (activeChartSp) { activeChartSp.dispose(); }
        if (activeChartEndemic) { activeChartEndemic.dispose(); }
        if (activeChartExotic) { activeChartExotic.dispose(); }

        // create chart and replace data
        chartReg= charCreate(data,'chartdivRg','registers');    
        chartSp= charCreate(data,'chartdivSp','species');    
        chartEndemicSp= charCreate(data,'chartdivSpEnd','endemicas');    
        chartExoticSp= charCreate(data,'chartdivSpEx','exoticas'); 
        
        activeChartReg = chartReg;   
        activeChartSp = chartSp;
        activeChartEndemic = chartEndemicSp; 
        activeChartExotic = chartExoticSp;
        
        $('#loading-chart').attr("style", "display:none");   
    }catch(err){
        console.log('no se puede cargar');
    }
};

// the data comes from an api
export const chartDangerData =(data)=>{
    try{
        chartDangerSp= charCreate(data,'chartdivDangerSp','amenazadas','danger');    
        $('#loading-chart').attr("style", "display:none");  
    }catch(err){
        console.log('no se puede cargar');
    }
};