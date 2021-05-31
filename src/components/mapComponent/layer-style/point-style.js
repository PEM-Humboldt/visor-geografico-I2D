import {Circle as CircleStyle,Stroke, Fill, Style} from 'ol/style';

export var pointStyle =(style)=> {
    return new Style({
      image: new CircleStyle({
        radius: style.radius,
        fill: new Fill({color: style.fillColor}),
        stroke: new Stroke({color: style.strokeColor, width: style.strokeWidth}),
      }),
    })
}