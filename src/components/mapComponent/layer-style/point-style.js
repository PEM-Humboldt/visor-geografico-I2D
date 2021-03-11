import {Circle as CircleStyle,Stroke, Fill, Style} from 'ol/style';

var PointStyle =(style)=> {
    return new Style({
      image: new CircleStyle({
        radius: 10,
        fill: new Fill({color: '#666666'}),
        stroke: new Stroke({color: '#bada55', width: 1}),
      }),
    })
}