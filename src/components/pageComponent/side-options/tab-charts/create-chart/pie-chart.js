/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import {PieChart,PieSeries,Legend} from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import {isAllDataZero} from './pie-options/noData'
import {itemsExport} from './pie-options/export'
import {table} from './exportReport/config/table-export'

import $ from "jquery";

// use this function for creating pie chart, it contains data, id, name of var and color
export var charCreate=(dataChart,idChart,count,ccolor)=>{
    var chart= undefined;

    try{   
        am4core.ready(function() {
            // Themes begin
            am4core.options.autoDispose = true;

            am4core.useTheme(am4themes_animated);
            // Themes end
            
            // Create chart instance
            chart = am4core.create(idChart, PieChart);

            chart.legend = new Legend();
            chart.legend.position = "right";
            chart.legend.valueLabels.template.text = "{value.value}";
            chart.legend.valueLabels.template.align = "right"
            chart.legend.valueLabels.template.textAlign = "end"
            chart.legend.scrollable = true;    

            chart.responsive.enabled = true;
            // chart.legend.width = 200;
            // Add and configure Series
            var pieSeries = chart.series.push(new PieSeries());
            pieSeries.dataFields.value = count;
            pieSeries.dataFields.category = "tipo";

            // pre disable legend with zero data
            pieSeries.events.on("datavalidated", function(ev) {
                ev.target.slices.each(function(slice) {
                  if (slice.dataItem.values.value.value ==0) {
                    slice.dataItem.hide();
                  }
                });
            });

            pieSeries.labels.template.disabled = true;
            chart.radius = am4core.percent(80);

            pieSeries.tooltip.getFillFromObject = false;
            pieSeries.tooltip.background.fill = am4core.color("#000");
            pieSeries.tooltip.label.color = am4core.color("#fff");
            
            /* Create a heat rule on especies amenazadas */

            if(ccolor=='danger'){
                pieSeries.slices.template.adapter.add('fill', (value, target, key) => {
                    if (target.dataItem.dataContext.tipo == 'VU') {
                        return am4core.color('#f9ba1b');
                    }else if (target.dataItem.dataContext.tipo == 'EN') {
                        return am4core.color('#f47d20');
                    }else if (target.dataItem.dataContext.tipo == 'CR') {
                        return am4core.color('#d51920');
                    }
                    return value;
                });
            }

            let isAllZero=isAllDataZero(dataChart,count);

            // define titles names depend on the chart type 
            let name;
            if(count=='registers'){name='Registros'}
            else if(count=='species'){name='Especies'}
            else if(count=='endemicas'){name='Especies Endémicas'}
            else if(count=='exoticas'){name='Especies Exóticas'} 
            else if(count=='amenazadas'){name='Especies Amenazadas'} 

            // if is not getting data 
            if(isAllZero){
                
                // add label to let users know the chart is empty
                let label = chart.createChild(am4core.Label);
                label.text = "[bold] Conforme a la información de referencia, no se tiene reporte,\n registro  o  información  de "+name+ " reportadas \npara esta área. [/]";
                label.fontSize = 15;
                label.align = "center";
                label.isMeasured = false;
                label.x = am4core.percent(40);
                label.y = am4core.percent(50);
                label.horizontalCenter = "middle";
                label.verticalCenter="middle"
                
            }else{
                let mpio=$('#titleResume').html()
                // export data define
                chart.exporting.menu = new am4core.ExportMenu();
                chart.exporting.menu.items = itemsExport
                
                chart.exporting.events.on("exportstarted", function(ev) {
                    let jsonExport=`{"tipo": "Tipo","${count}": "${name}"}`
                    chart.exporting.dataFields = JSON.parse(jsonExport)
                    chart.exporting.filePrefix = "I2d-"+count;
                    chart.exporting.useWebFonts = false;
                    chart.exporting.title=mpio+' - Estadística de '+name
                });

  
                chart.exporting.adapter.add("pdfmakeDocument", function(pdf, target) {
                    
                    let data=target.data
                    let title=target.dataFields

                    var content= [
                        // { text: 'Información en tabla', style: 'header' },
                        table(data, Object.keys(title),title)
                    ]

                    pdf.doc.content.push(content);
                  
                    return pdf;
                });
                // chart.exporting.adapter.add("pdfmakeDocument", function(pdf, target) {

                //     // Add title to the beginning
                //     pdf.doc.content.unshift({
                //       text: "Informe Biológico de "+name,
                //       margin: [0, 30],
                //       style: {
                //         fontSize: 14,
                //         bold: true,
                //       }
                //     });
                  
                //     return pdf;
                // });

                
            }
            chart.data = dataChart;           

            if(count=='exoticas'){
                // hide stadistics
                setTimeout(function () {
                    for ( let i = 0; i < $('.collapseChart').length; i++ ){
                        if ( $($('.collapseChart')[i]).hasClass('show')==true ){
                            $($('.collapseChart')[i]).removeClass('show');
                            $($('.tabChart')[i]).addClass('collapsed');
                        }
                    }
                }, 1000);
            }
        });

    }catch(err){
        console.log('no se pudo crear las estadisticas');
    }
    return chart;
};
export function toggleSlice(item) {
    var slice = pieSeries.dataItems.getIndex(item);
    if (slice.visible) {slice.hide();}
    else {slice.show();}
}

export function hoverSlice(item) {
    var slice = pieSeries.slices.getIndex(item);
    slice.isHover = true;
}

export function blurSlice(item) {
    var slice = pieSeries.slices.getIndex(item);
    slice.isHover = false;
}    