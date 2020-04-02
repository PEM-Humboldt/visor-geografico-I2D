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
var aicas = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Historicos/wms',
        params: {LAYERS: 'Historicos:aicas', STYLES: ''}
    }), name: 'AICAS'
});
var bosque_seco_tropical = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Historicos/wms',
        params: {LAYERS: 'Historicos:bosque_seco_tropical', STYLES: ''}
    }), name: 'Bosque Seco Tropical'
});
var complejos_paramos_escala100k = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Historicos/wms',
        params: {LAYERS: 'Historicos:complejos_paramos_escala100k', STYLES: ''}
    }), name: 'Complejos Páramos Escala 100k'
});
var ecosistemas_cuenca_rio_orinoco = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Historicos/wms',
        params: {LAYERS: 'Historicos:ecosistemas_cuenca_rio_orinoco', STYLES: ''}
    }), name: 'Ecosistemas Cuenca Río Orinoco'
});
var ecosistemas_generales_etter = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Historicos/wms',
        params: {LAYERS: 'Historicos:ecosistemas_generales_etter', STYLES: ''}
    }), name: 'Ecosistemas Generales Etter'
});
var grado_transformacion_humedales_m10k = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Historicos/wms',
        params: {LAYERS: 'Historicos:grado_transformacion_humedales_m10k', STYLES: ''}
    }), name: 'Grado Transformación Humedales 10k'
});
var Humedales = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_fondo_adaptacion/wms',
        params: {LAYERS: 'Proyecto_fondo_adaptacion:Humedales', STYLES: ''}
    }), name: 'Humedales versión 2012'
});
var Humedales_Continentales_Insulares_2015 = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_fondo_adaptacion/wms',
        params: {LAYERS: 'Proyecto_fondo_adaptacion:Humedales_Continentales_Insulares_2015_Vector', STYLES: ''}
    }), name: 'Humedales Continentales e Insulares 2015'
});
var Limites21Paramos_25K_2015 = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_fondo_adaptacion/wms',
        params: {LAYERS: 'Proyecto_fondo_adaptacion:Limites21Paramos_25K_2015', STYLES: ''}
    }), name: 'Límite 21 Complejos de Páramo 2015'
});
var Limites24Paramos_25K_2016 = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_fondo_adaptacion/wms',
        params: {LAYERS: 'Proyecto_fondo_adaptacion:Limites24Paramos_25K_2016', STYLES: ''}
    }), name: 'Límite 24 Complejos de Páramo 2016'
});
var coberturas_bo_2009_2010 = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_oleoducto_bicentenario/wms',
        params: {LAYERS: 'Proyecto_oleoducto_bicentenario:coberturas_bo_2009_2010', STYLES: ''}
    }), name: 'Cobertura Bo'
});
var Biomas = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:Biomas', STYLES: ''}
    }), name: 'Biomas'
});
var colapso_acuatico = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:colapso_acuatico', STYLES: ''}
    }), name: 'Colapso Acuático'
});
var colapso_terrestre = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:colapso_terrestre', STYLES: ''}
    }), name: 'Colapso Terrestre'
});
var colapso_total = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:colapso_total', STYLES: ''}
    }), name: 'Colapso Total'
});
var distritos_biogeograficos = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:distritos_biogeograficos', STYLES: ''}
    }), name: 'Distritos Biogeográficos'
});
var hidrobiologia = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:hidrobiologia', STYLES: ''}
    }), name: 'Hidrobiología'
});
var lineamientos = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:lineamientos', STYLES: ''}
    }), name: 'Lineamientos'
});
var meta_conservacion = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:meta_conservacion', STYLES: ''}
    }), name: 'Meta Conservación'
});
var unicidad = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:unicidad', STYLES: ''}
    }), name: 'Unicidad'
});
var unidades_analisis = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:unidades_analisis', STYLES: ''}
    }), name: 'Unidades de Análisis'
});
var Registros_Ceiba = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Registros_Ceiba/wms',
        params: {LAYERS: 'Registros_Ceiba:Registros_Ceiba', STYLES: ''}
    }), name: 'Registros CEIBA'
});
//
//Grupos de capas
//
var layerBase = new ol.layer.Group({
    layers: [streetmap, Deptos, Mpios, highlight],
    name: 'Capas Base'
});
var Historicos = new ol.layer.Group({
    layers: [aicas, bosque_seco_tropical, complejos_paramos_escala100k, ecosistemas_cuenca_rio_orinoco, ecosistemas_generales_etter, grado_transformacion_humedales_m10k, highlight],
    name: 'Historicos',
    visible: false
});
var Fondo_Adaptacion = new ol.layer.Group({
    layers: [Humedales, Humedales_Continentales_Insulares_2015, Limites21Paramos_25K_2015, Limites24Paramos_25K_2016],
    name: 'Fondo de adaptación',
    visible: false
});
var Proyecto_Oleoducto_Bicentenario = new ol.layer.Group({
    layers: [coberturas_bo_2009_2010],
    name: 'Proyecto Oleoducto Bicentenario',
    visible: false
});
var Conservacion_Biodiversidad = new ol.layer.Group({
    layers: [Biomas, colapso_acuatico, colapso_terrestre, colapso_total, distritos_biogeograficos, hidrobiologia, lineamientos, meta_conservacion, unicidad, unidades_analisis],
    name: 'Conservación de la Biodiversidad',
    visible: false
});
var ceiba = new ol.layer.Group({
    layers: [Registros_Ceiba],
    name: 'Registros CEIBA',
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
    layers: [layerBase, Historicos, Fondo_Adaptacion, Proyecto_Oleoducto_Bicentenario, Conservacion_Biodiversidad, ceiba],
    view: new ol.View({
        center: [-8113332, 464737],
        zoom: 5.373
    })
});
//console.log(ol.control.Control());

/*function buildLayerTree(layer) {
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
 });*/