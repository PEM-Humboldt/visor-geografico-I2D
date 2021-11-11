import {polygonStyle} from '../layer-style/polygon-style'
import {pointStyle} from '../layer-style/point-style'

// geojson layers style

export var styleHighlight=polygonStyle({
    "strokeColor": "orange",
    "strokeWidth":5,
    "fillColor": "rgba(247, 212, 200, 0.3)",
    "textFillColor":"orange",
    "textStrokeColor":"#fff",
    "textStrokeWidth":3,
    "fontSize":"10px"
});

export var styleMpio=polygonStyle({
    "strokeColor": "rgba(42, 71, 80, 1)",
    "strokeWidth":4,
    "fillColor": "rgba(42, 71, 80, 0.2)",
    "textFillColor":"#FFF",
    "textStrokeColor":"rgba(42, 71, 80, 1)",
    "textStrokeWidth":3,
    "fontSize":"14px"
});

export var styleHighlightPoint=pointStyle({
    "strokeColor": "orange",
    "strokeWidth":3,
    "fillColor": "rgba(247, 212, 200, 0.3)",
    "radius":10
});
