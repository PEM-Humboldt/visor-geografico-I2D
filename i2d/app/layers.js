//
//Capa base
//
var streetmap = new ol.layer.Tile({
    source: new ol.source.OSM(),
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
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:departamento'}
    }), name: 'Departamentos'
});
var Mpios = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:municipio'}
    }), name: 'Municipios'
});
//
//ECP
//
var aicas = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Historicos/wms',
        params: {LAYERS: 'Historicos:aicas'}
    }), name: 'AICAS'
});
var bosque_seco_tropical = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Historicos/wms',
        params: {LAYERS: 'Historicos:bosque_seco_tropical'}
    }), name: 'Bosque Seco Tropical'
});
var complejos_paramos_escala100k = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Historicos/wms',
        params: {LAYERS: 'Historicos:complejos_paramos_escala100k'}
    }), name: 'Complejos Páramos Escala 100k'
});
var ecosistemas_cuenca_rio_orinoco = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Historicos/wms',
        params: {LAYERS: 'Historicos:ecosistemas_cuenca_rio_orinoco'}
    }), name: 'Ecosistemas Cuenca Río Orinoco'
});
var ecosistemas_generales_etter = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Historicos/wms',
        params: {LAYERS: 'Historicos:ecosistemas_generales_etter'}
    }), name: 'Ecosistemas Generales Etter'
});
var grado_transformacion_humedales_m10k = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Historicos/wms',
        params: {LAYERS: 'Historicos:grado_transformacion_humedales_m10k'}
    }), name: 'Grado Transformación Humedales 10k'
});
var Humedales = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_fondo_adaptacion/wms',
        params: {LAYERS: 'Proyecto_fondo_adaptacion:Humedales'}
    }), name: 'Humedales versión 2012'
});
var Humedales_Continentales_Insulares_2015 = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_fondo_adaptacion/wms',
        params: {LAYERS: 'Proyecto_fondo_adaptacion:Humedales_Continentales_Insulares_2015_Vector'}
    }), name: 'Humedales Continentales e Insulares 2015'
});
var Limites21Paramos_25K_2015 = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_fondo_adaptacion/wms',
        params: {LAYERS: 'Proyecto_fondo_adaptacion:Limites21Paramos_25K_2015'}
    }), name: 'Límite 21 Complejos de Páramo 2015'
});
var Limites24Paramos_25K_2016 = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_fondo_adaptacion/wms',
        params: {LAYERS: 'Proyecto_fondo_adaptacion:Limites24Paramos_25K_2016'}
    }), name: 'Límite 24 Complejos de Páramo 2016'
});
var coberturas_bo_2009_2010 = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_oleoducto_bicentenario/wms',
        params: {LAYERS: 'Proyecto_oleoducto_bicentenario:coberturas_bo_2009_2010'}
    }), name: 'Cobertura Bo'
});
var Biomas = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:Biomas'}
    }), name: 'Biomas'
});
var colapso_acuatico = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:colapso_acuatico'}
    }), name: 'Colapso Acuático'
});
var colapso_terrestre = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:colapso_terrestre'}
    }), name: 'Colapso Terrestre'
});
var colapso_total = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:colapso_total'}
    }), name: 'Colapso Total'
});
var distritos_biogeograficos = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:distritos_biogeograficos'}
    }), name: 'Distritos Biogeográficos'
});
var hidrobiologia = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:hidrobiologia'}
    }), name: 'Hidrobiología'
});
var lineamientos = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:lineamientos'}
    }), name: 'Lineamientos'
});
var meta_conservacion = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:meta_conservacion'}
    }), name: 'Meta Conservación'
});
var unicidad = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:unicidad'}
    }), name: 'Unicidad'
});
var unidades_analisis = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:unidades_analisis'}
    }), name: 'Unidades de Análisis'
});
var Registros_Ceiba = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Registros_Ceiba/wms',
        params: {LAYERS: 'Registros_Ceiba:Registros_Ceiba'}
    }), name: 'Registros CEIBA'
});
//
//Grupos de capas
//
var layerBase = new ol.layer.Group({
    layers: [streetmap/*, Deptos, Mpios*/],
    name: 'Capas Base'
});
var Historicos = new ol.layer.Group({
    layers: [aicas, bosque_seco_tropical, complejos_paramos_escala100k, ecosistemas_cuenca_rio_orinoco, ecosistemas_generales_etter, grado_transformacion_humedales_m10k],
    name: 'Historicos'
});
var Fondo_Adaptacion = new ol.layer.Group({
    layers: [Humedales, Humedales_Continentales_Insulares_2015, Limites21Paramos_25K_2015, Limites24Paramos_25K_2016],
    name: 'Fondo de adaptación'
});
var Proyecto_Oleoducto_Bicentenario = new ol.layer.Group({
    layers: [coberturas_bo_2009_2010],
    name: 'Proyecto Oleoducto Bicentenario'
});
var Conservacion_Biodiversidad = new ol.layer.Group({
    layers: [Biomas, colapso_acuatico, colapso_terrestre, colapso_total, distritos_biogeograficos, hidrobiologia, lineamientos, meta_conservacion, unicidad, unidades_analisis],
    name: 'Conservación de la Biodiversidad'
});
var ceiba = new ol.layer.Group({
    layers: [Registros_Ceiba],
    name: 'Registros CEIBA'
});
//
//Mapa
//
map = new ol.Map({
    controls: ol.control.defaults().extend([new ol.control.ScaleLine(), new ol.control.ZoomToExtent({
            extent: [-7430902, -479413, -8795762, 1408887]
        })
    ]),
    target: document.getElementById('map'),
    // use the Canvas renderer
    renderer: 'canvas',
    layers: [layerBase, Historicos, Fondo_Adaptacion, Proyecto_Oleoducto_Bicentenario, Conservacion_Biodiversidad, ceiba, highlight],
    view: new ol.View({
        center: [-8113332, 464737],
        zoom: 5.373
    })
});
$(document).ready(function () {
    buildLayerTree(map.getLayerGroup());
    // Handle visibility control
    $('input').on('click', function () {
        var layername = this.id;
        var layer = findBy(map.getLayerGroup(), 'name', layername);
        layer.setVisible(!layer.getVisible());
    });
});
function buildLayerTree(layer) {
    var name = layer.get('name') ? layer.get('name') : "Group";
    var layers = layer.getLayers().getArray();
    var len = layers.length;
    for (var i = 0; i < len - 1; i++) {
        var name = layers[i].get('name');
        if (i === 0) {
            var accordion = document.getElementById('accordion');
            card = document.createElement('div');
            card.className = "overflow-auto card";
            card.id = "capas";
            accordion.appendChild(card);
            cardh = document.createElement('div');
            cardh.className = "card-header";
            card.appendChild(cardh);
            cardlink = document.createElement('a');
            cardlink.className = "card-link";
            cardlink.setAttribute('data-toggle', 'collapse');
            cardlink.setAttribute('href', '#collapse' + i);
            cardlink.innerHTML = name;
            cardh.appendChild(cardlink);
            close = document.createElement('a');
            close.className = "card-link float-right";
            close.setAttribute('data-toggle', 'collapse');
            close.setAttribute('href', '#');
            close.onclick = ControlLayerClose;
            close.innerHTML = 'X';
            cardh.appendChild(close);
            collapseOne = document.createElement('div');
            collapseOne.id = "collapse" + i;
            collapseOne.className = "collapse container";
            collapseOne.setAttribute('data-parent', '#accordion');
            card.appendChild(collapseOne);
        } else {
            var accordion = document.getElementById('accordion');
            card = document.createElement('div');
            card.className = "overflow-auto card";
            card.id = "capas";
            accordion.appendChild(card);
            cardh = document.createElement('div');
            cardh.className = "card-header";
            card.appendChild(cardh);
            cardlink = document.createElement('a');
            cardlink.className = "card-link";
            cardlink.setAttribute('data-toggle', 'collapse');
            cardlink.setAttribute('href', '#collapse' + i);
            cardlink.innerHTML = name;
            cardh.appendChild(cardlink);
            collapseOne = document.createElement('div');
            collapseOne.id = "collapse" + i;
            collapseOne.className = "collapse container";
            collapseOne.setAttribute('data-parent', '#accordion');
            card.appendChild(collapseOne);
        }
        var lay = layers[i].getLayers().getArray();
        var leng = lay.length;
        for (var j = 0; j < leng; j++) {
            var subname = lay[j].get('name');
            var cardbody = document.createElement('div');
            cardbody.className = "card-body";
            collapseOne.appendChild(cardbody);
            var fcheck = document.createElement('div');
            fcheck.className = "form-check";
            var check = document.createElement('input');
            check.className = "form-check-input";
            check.setAttribute('type', 'checkbox');
            check.id = subname;
            if (lay[j].values_.visible === true) {
                check.checked = true;
            }
            cardbody.appendChild(check);
            var lab = document.createElement('label');
            lab.className = "form-check-label";
            lab.setAttribute('for', 'defaultCheck1');
            lab.innerHTML = subname;
            cardbody.appendChild(lab);
        }
    }
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