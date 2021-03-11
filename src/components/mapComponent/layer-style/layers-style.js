import {polygonStyle} from '../layer-style/polygon-style'

// style by layers

export var styleMpio=polygonStyle({
    "strokeColor": "orange",
    "strokeWidth":1.5,
    "fillColor": "rgba(247, 212, 197, 0.2)",
    "textFillColor":"orange",
    "textStrokeColor":"#fff",
    "textStrokeWidth":3,
    "fontSize":"10px"
});

export var styleHighlight=polygonStyle({
    "strokeColor": "rgba(42, 71, 80, 1)",
    "strokeWidth":1,
    "fillColor": "rgba(42, 71, 80, 0.2)",
    "textFillColor":"#FFF",
    "textStrokeColor":"rgba(42, 71, 80, 1)",
    "textStrokeWidth":5,
    "fontSize":"14px"
});

export var styleHighlightClickMpio=polygonStyle({
    "strokeColor": "orange",
    "strokeWidth":5,
    "fillColor": "rgba(104, 75, 42, 0.3)",
    "textFillColor":"#FFF",
    "textStrokeColor":"rgb(104, 75, 42)",
    "textStrokeWidth":5,
    "fontSize":"14px"
});