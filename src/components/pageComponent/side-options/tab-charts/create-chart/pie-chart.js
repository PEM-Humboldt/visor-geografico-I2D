/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import {isAllDataZero} from './pie-options/noData'
import {itemsExport} from './pie-options/export'

import $ from "jquery";
export var charCreate=(dataChart,idChart,count)=>{

    try{   
        am4core.ready(function() {
            // Themes begin
            am4core.options.autoDispose = true;

            am4core.useTheme(am4themes_animated);
            // Themes end
            
            // Create chart instance
            var chart = am4core.create(idChart, am4charts.PieChart);

            chart.legend = new am4charts.Legend();
            chart.legend.position = "right";
            chart.legend.valueLabels.template.text = "{value.value}";
            chart.legend.valueLabels.template.align = "right"
            chart.legend.valueLabels.template.textAlign = "end"
            chart.legend.scrollable = true;    
            // chart.legend.width = 200;
            // Add and configure Series
            var pieSeries = chart.series.push(new am4charts.PieSeries());
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
            
            // pieSeries.colors.minColors=7;
            // pieSeries.colors.baseColor=({r:100,g:100,b:100})
            // console.log(pieSeries.colors.getCurrentThemes())
            // random colors
            // pieSeries.colors.shuffle=true;

            /* Create a heat rule */
            // pieSeries.colors.list = [
            //     am4core.color("#845EC2"),
            //     am4core.color("#D65DB1"),
            //     am4core.color("#FF6F91"),
            //     am4core.color("#FF9671"),
            //     am4core.color("#FFC75F"),
            //     am4core.color("#F9F871"),
            //   ];
            let isAllZero=isAllDataZero(dataChart,count);

            let name;
            if(count=='registers'){name='Registros'}
            else if(count=='species'){name='Especies'}
            else if(count=='endemicas'){name='Especies Endémicas'}
            else if(count=='exoticas'){name='Especies Exóticas'} 
            else if(count=='amenazadas'){name='Amenazadas'} 

            if(isAllZero){
                
                // add label to let users know the chart is empty
                let label = chart.createChild(am4core.Label);
                label.text = "[bold] No hay "+name+ "\n en esta área. [/]";
                label.fontSize = 15;
                label.align = "center";
                label.isMeasured = false;
                label.x = am4core.percent(40);
                label.y = am4core.percent(50);
                label.horizontalCenter = "middle";
                label.verticalCenter="middle"
                
            }else{
                // export data define
                chart.exporting.menu = new am4core.ExportMenu();
                chart.exporting.filePrefix = "I2d-"+count;

                let jsonExport=`{"tipo": "Tipo","${count}": "${name}"}`
                chart.exporting.dataFields = JSON.parse(jsonExport)

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

                chart.exporting.menu.items = itemsExport
            }
            chart.data = dataChart;           

        });
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
    }catch{
        console.log('no se pudo crear las estadisticas')
    }
}
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