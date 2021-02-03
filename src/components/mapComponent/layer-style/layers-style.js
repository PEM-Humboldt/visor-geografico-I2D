import {polygonStyle} from '../layer-style/polygon-style'

// style by layers
export var styleDepto=polygonStyle({
    "strokeColor": "orange",
    "strokeWidth":2,
    "fillColor": "transparent",
    "textFillColor":"orange",
    "textStrokeColor":"#fff",
    "textStrokeWidth":3,
    "fontSize":"10px"
});

export var styleMpio=polygonStyle({
    "strokeColor": "orange",
    "strokeWidth":1.5,
    "fillColor": "rgba(247, 212, 197, 0.1)",
    "textFillColor":"orange",
    "textStrokeColor":"#fff",
    "textStrokeWidth":3,
    "fontSize":"10px"
});

export var styleHighlight=polygonStyle({
    "strokeColor": "#00FFFF",
    "strokeWidth":5,
    "fillColor": "null",
    "textFillColor":"null",
    "textStrokeColor":"null",
    "textStrokeWidth":"null"
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