import {Stroke, Fill, Style,Text} from 'ol/style';
// geojson polygon style
export var polygonStyle=(style)=>{
    return new Style({
        stroke: new Stroke({
          color: style.strokeColor,
          width: style.strokeWidth,
          }),
        fill: new Fill({
          color: style.fillColor,
        }),
        text: new Text({
          font: style.fontSize+' Calibri,sans-serif',
          fill: new Fill({
            color: style.textFillColor,
          }),
          stroke: new Stroke({
            color: style.textStrokeColor,
            width: style.textStrokeWidth,
          }),
        }),
    });
}
