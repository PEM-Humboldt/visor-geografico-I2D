/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export var charCreate=(dataChart,idChart)=>{

    try{   
        // eliminar el chart anterior
        idChart=='chartdiv'&& am4core.disposeAllCharts();   
     
        am4core.ready(function() {
            // am4core.disposeAllCharts();
            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end
            
            // Create chart instance
            var chart = am4core.create(idChart, am4charts.PieChart);

            // Add and configure Series
            var pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "count";
            pieSeries.dataFields.category = "tipo";
            pieSeries.labels.template.disabled = true;

            chart.radius = am4core.percent(80);
            chart.legend = new am4charts.Legend();
            chart.legend.position = "right";
            chart.legend.valueLabels.template.text = "{value.value}";
            chart.legend.valueLabels.template.align = "right"
            chart.legend.valueLabels.template.textAlign = "end"
            chart.legend.scrollable = true;
            
            // console.log(chart.legend.htmlContainer)
            pieSeries.tooltip.getFillFromObject = false;
            pieSeries.tooltip.background.fill = am4core.color("#000");
            pieSeries.tooltip.label.fill = am4core.color("#fff");
            /* Create a heat rule */
            // pieSeries.colors.list = [
            //     am4core.color("#845EC2"),
            //     am4core.color("#D65DB1"),
            //     am4core.color("#FF6F91"),
            //     am4core.color("#FF9671"),
            //     am4core.color("#FFC75F"),
            //     am4core.color("#F9F871"),
            //   ];

            chart.data = dataChart;  
            
        });
        
    }catch{
        console.log('no se pudo crear las estadisticas')
    }
}
export function toggleSlice(item) {
    var slice = pieSeries.dataItems.getIndex(item);
    if (slice.visible) {
    slice.hide();
    }
    else {
    slice.show();
    }
}

export function hoverSlice(item) {
    var slice = pieSeries.slices.getIndex(item);
    slice.isHover = true;
}

export function blurSlice(item) {
    var slice = pieSeries.slices.getIndex(item);
    slice.isHover = false;
}    