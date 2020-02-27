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
            width: 3
        })
    }),
    source: new ol.source.Vector()
});
//
//Grupos de capas
//
var layerBase = new ol.layer.Group({
    layers: [streetmap, highlight],
    name: 'Capas Base'
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
    layers: [layerBase, /*new ol.layer.Tile({ source: new ol.source.OSM()})/*, highlight*/],
    view: new ol.View({
        center: [-8113332, 464737],
        zoom: 5.373
    })
});
function buildLayerTree(layer) {
    console.log(layer);
    console.log(layer.getLayers);
    var elem;
    var name = layer.get('name') ? layer.get('name') : "Group";
    //console.log(name);
    //if (name !== 'Group') {
        //console.log(1);
        if (layer.values_.visible === true && layer.get('name') !== 'CAPAS') {
            console.log(name);
            var div = "<li data-layerid='" + name + "'>" + "<span><img src='iconos/" + layer.get('name') + ".jpg' alt='Smiley face' height='20' width='20' >" + layer.get('name') + "</span>" + "<i class='glyphicon glyphicon-check'></i> ";
        } else if (layer.get('name') === 'CAPAS') {
            console.log(3);
            var div = "<li data-layerid='" + name + "'>" + "<span><img src='image/" + layer.get('name') + ".png' alt='Smiley face' height='30' width='100'>" + layer.get('name') + "</span>";
        } else {
            console.log(4);
            var div = "<li data-layerid='" + name + "'>" + "<span><img src='image/" + layer.get('name') + ".jpg' alt='Smiley face' height='20' width='20'>" + layer.get('name') + "</span>" + "<i class='glyphicon glyphicon-unchecked'></i> ";
        }
        if (layer.getLayers) {
            
            var sublayersElem = '';
            var layers = layer.getLayers().getArray();
            console.log(layers);
            var len = layers.length;
            for (var i = len - 2; i >= 0; i--) {
                console.log("for");
                sublayersElem += buildLayerTree(layers[i]);
            }
            elem = div + " <ul>" + sublayersElem + "</ul></li>";
        } else {
            elem = div + " </li>";
        }
        return elem;
    //}
}
function initializeTree() {
    //console.log("inicio tree");
    //console.log(ol.map);
    //console.log(map);
    var elem = buildLayerTree(map.getLayerGroup());
    console.log(elem);
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
    //console.log("inicio");
    initializeTree();
    // Handle opacity slider control
    $('input.opacity').slideDown().on('slide', function (ev) {
        var layername = $(this).closest('li').data('layerid');
        var layer = findBy(map.getLayerGroup(), 'name', layername);
        layer.setOpacity(ev.value);
    });
    // Handle visibility control
    $('i').on('click', function () {
        var layername = $(this).closest('li').data('layerid');
        var layer = findBy(map.getLayerGroup(), 'name', layername);
        layer.setVisible(!layer.getVisible());
        if (layer.getVisible()) {
            $(this).removeClass('glyphicon-unchecked').addClass('glyphicon-check');
        } else {
            $(this).removeClass('glyphicon-check').addClass('glyphicon-unchecked');
        }
    });
});