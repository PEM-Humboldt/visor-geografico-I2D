//
//Capa base
//
var streetmap = new ol.layer.Tile({
    source: new ol.source.OSM(),
    //visible: false,
    minResolution: 2,
    name: 'Street Map'
});
var highlight = new ol.layer.Vector({
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#00FFFF',
            width: 5
        })
    }),
    source: new ol.source.Vector()
});
//
var Deptos = new ol.layer.Tile({
    visible: true,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:departamento', STYLES: ''}
    }), name: 'Departamentos'
});
var Mpios = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:municipio', STYLES: ''}
    }), name: 'Municipios'
});
//
//ECP
//
var Agrologia = new ol.layer.Tile({
    visible: true,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:agrologico', STYLES: ''}
    }), name: 'Agrologia'
});
var avu = new ol.layer.Tile({
    visible: true,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:avu', STYLES: ''}
    }), name: 'avu'
});
var Bosque = new ol.layer.Tile({
    visible: true,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:bosque', STYLES: ''}
    }), name: 'Bosque'
});
var CuerposAgua = new ol.layer.Tile({
    visible: true,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:cuerpos_agua', STYLES: ''}
    }), name: 'Cuerpos Agua'
});
var Cultivos = new ol.layer.Tile({
    visible: true,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:cultivos', STYLES: ''}
    }), name: 'Cultivos'
});
var EquipamientoUrbano = new ol.layer.Tile({
    visible: true,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:equipamiento_urbano', STYLES: ''}
    }), name: 'Equipamiento Urbano'
});
var EspacioPublico = new ol.layer.Tile({
    visible: true,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:espacio_publico', STYLES: ''}
    }), name: 'Espacio Publico'
});
var EstructuraEcologica = new ol.layer.Tile({
    visible: true,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:estructura_ecologica_urbana_envigado', STYLES: ''}
    }), name: 'Estructura Ecologica Urbana'
});
var Humedales = new ol.layer.Tile({
    visible: true,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:humedales', STYLES: ''}
    }), name: 'Humedales'
});
var Nacimientos = new ol.layer.Tile({
    visible: true,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:nacimientos', STYLES: ''}
    }), name: 'Nacimientos'
});
var Plantaciones = new ol.layer.Tile({
    visible: true,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:plantaciones', STYLES: ''}
    }), name: 'Plantaciones'
});
var Predios_Priorizados = new ol.layer.Tile({
    visible: true,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:predios_priorizados', STYLES: ''}
    }), name: 'Predios Priorizados'
});
var Ronda_Hidrica = new ol.layer.Tile({
    visible: true,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:ronda_hidrica', STYLES: ''}
    }), name: 'Ronda Hidrica'
});
var Senderos = new ol.layer.Tile({
    visible: true,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:senderos', STYLES: ''}
    }), name: 'Senderos'
});
var Urbano = new ol.layer.Tile({
    visible: true,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:urbano', STYLES: ''}
    }), name: 'Urbano'
});
var Zonas_Verdes = new ol.layer.Tile({
    visible: true,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:zonas_verdes', STYLES: ''}
    }), name: 'Zonas Verdes'
});
//
//Grupos de capas
//
var layerBase = new ol.layer.Group({
    layers: [streetmap, Deptos, Mpios, highlight],
    name: 'Capas Base'
});
var ECP = new ol.layer.Group({
    layers: [Agrologia, avu, Bosque, CuerposAgua, Cultivos, EquipamientoUrbano, EspacioPublico, EstructuraEcologica, Humedales, Nacimientos, Plantaciones, Predios_Priorizados, Ronda_Hidrica, Senderos, Urbano, Zonas_Verdes, highlight],
    name: 'Estructura Ecologica Principal',
    visible: false
});
//
//
//
map = new ol.Map({
    controls: ol.control.defaults().extend([new ol.control.ScaleLine(), new ol.control.ZoomToExtent({
            extent: [-7430902, -479413, -8795762, 1408887]
        })
    ])/*.extend([mousePositionControl])*/,
    // add the popup as a map overlay
    //overlays: [popup],
    // render the map in the 'map' div
    target: document.getElementById('map'),
    // use the Canvas renderer
    renderer: 'canvas',
    layers: [layerBase, ECP, highlight],
    view: new ol.View({
        center: [-8113332, 464737],
        zoom: 5.373
    })
});
function buildLayerTree(layer) {
    var elem;
    var name = layer.get('name') ? layer.get('name') : "Group";
    if (!layer.get('name')) {
        var div = "<li data-layerid='CAPAS'>" + "<span><img src='iconos/CAPAS.png' alt='Smiley face' height='50' width='50'>CAPAS</span>";
    } else if (layer.values_.visible === true) {
        var div = "<li data-layerid='" + name + "'>" + "<span><img src='iconos/" + layer.get('name') + ".jpg' alt='Smiley face' height='20' width='20' >" + layer.get('name') + "</span>" + "<input type='checkbox' checked>";
    } else {
        var div = "<li data-layerid='" + name + "'>" + "<span><img src='image/" + layer.get('name') + ".jpg' alt='Smiley face' height='20' width='20'>" + layer.get('name') + "</span>" + "<input type='checkbox'>";
    }
    if (layer.getLayers) {
        var sublayersElem = '';
        var layers = layer.getLayers().getArray();
        var len = layers.length;
        for (var i = len - 2; i >= 0; i--) {
            sublayersElem += buildLayerTree(layers[i]);
        }
        elem = div + " <ul>" + sublayersElem + "</ul></li>";
    } else {
        elem = div + " </li>";
    }
    return elem;
}
function initializeTree() {
    var elem = buildLayerTree(map.getLayerGroup());
    $('#layertree').empty().append(elem);
    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
    var longitud = $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch').length;
    for (var i = 0; i < longitud; i++) {
        var colapse = $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch')[i];
        var colap = $(colapse).parent('li.parent_li').find(' > ul > li');
        colap.hide('fast');
    }
    $('.tree li.parent_li > span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).attr('title', 'Expand this branch').find(' > i').addClass('glyphicon-plus').removeClass('glyphicon-minus');
        } else {
            children.show('fast');
            $(this).attr('title', 'Collapse this branch').find(' > i').addClass('glyphicon-minus').removeClass('glyphicon-plus');
        }
        e.stopPropagation();
    });
}
function findBy(layer, key, value) {
    if (layer.get(key) === value) {
        return layer;
    }
    // Find recursively if it is a group
    if (layer.getLayers) {
        var layers = layer.getLayers().getArray(),
                len = layers.length, result;
        for (var i = 0; i < len; i++) {
            result = findBy(layers[i], key, value);
            if (result) {
                return result;
            }
        }
    }
    return null;
}
$(document).ready(function () {
    initializeTree();
    // Handle opacity slider control
    $('input.opacity').slideDown().on('slide', function (ev) {
        var layername = $(this).closest('li').data('layerid');
        var layer = findBy(map.getLayerGroup(), 'name', layername);
        layer.setOpacity(ev.value);
    });
    // Handle visibility control
    $('input').on('click', function () {
        var layername = $(this).closest('li').data('layerid');
        var layer = findBy(map.getLayerGroup(), 'name', layername);
        layer.setVisible(!layer.getVisible());
    });
});