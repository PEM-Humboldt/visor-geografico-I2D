/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export var charCreate=(dataChart)=>{
    // eliminar el chart anterior
    try{
        
        am4core.disposeAllCharts();   
     
        am4core.ready(function() {
            am4core.disposeAllCharts();
            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end
            
            // Create chart instance
            var chart = am4core.create("chartdiv", am4charts.XYChart);
            chart.scrollbarX = new am4core.Scrollbar();

            chart.padding(20, 20, 20, 20);

            // Create axes
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.dataFields.category = "tipo";
            categoryAxis.renderer.minGridDistance = 30;
            categoryAxis.renderer.labels.template.horizontalCenter = "right";
            categoryAxis.renderer.labels.template.verticalCenter = "middle";
            categoryAxis.renderer.labels.template.rotation = 270;
            categoryAxis.tooltip.disabled = true;
            categoryAxis.renderer.minHeight = 110;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.min = 0;
            valueAxis.max = valueAxis.maxZoomed;
            // valueAxis.title.text = 'CANTIDAD DE REGISTROS';
            // Create series
            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.categoryX = "tipo";
            series.dataFields.valueY = "count";
            series.tooltipText = "{categoryX} : [{categoryX}: bold]{valueY}[/]";
            series.columns.template.strokeOpacity = 0;

            series.columns.template.column.cornerRadiusTopRight = 5;
            series.columns.template.column.cornerRadiusTopLeft = 5;
            series.columns.template.column.fillOpacity = 0.8;
            
            // on hover, make corner radiuses bigger
            var hoverState = series.columns.template.column.states.create("hover");
            hoverState.properties.cornerRadiusTopLeft = 0;
            hoverState.properties.cornerRadiusTopRight = 0;
            hoverState.properties.fillOpacity = 1;

            chart.zoomOutButton.disabled = true;

            // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
            series.columns.template.adapter.add("fill", function (fill, target) {
                return chart.colors.getIndex(target.dataItem.index);
            });

            categoryAxis.sortBySeries = series;

            /* Create a heat rule */
            series.heatRules.push({
                "target": series.columns.template,
                "property": "fill",
                "min": am4core.color("#F5DBCB"),
                "max": am4core.color("#a86632"),
                "dataField": "valueY"
            });

            // Cursor
            chart.cursor = new am4charts.XYCursor();

            chart.data = dataChart;      
            
        });
        
    }catch{
        console.log('no se pudo crear las estadisticas')
    }
}

