//
//Capa base
//
var streetmap = new ol.layer.Tile({
    source: new ol.source.OSM(),
    minResolution: 2,
    name: 'Street Map'
});
var otm = new ol.layer.Tile({
    visible: false,
    //opacity: 0,
    source: new ol.source.XYZ({
        url: "https://tile.opentopomap.org/{z}/{x}/{y}.png"
    }), name: 'OTM'
});
var bw = new ol.layer.Tile({
    visible: false,
    //opacity: 0,
    source: new ol.source.XYZ({
        url: "http://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
    }), name: 'B & W'
});
var terrain = new ol.layer.Tile({
    visible: false,
    //opacity: 0,
    source: new ol.source.XYZ({
        url: "http://a.tile.stamen.com/terrain/{z}/{x}/{y}.png"
    }), name: 'Terrain'
});
//capa para seleccion
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
    }), name: 'AICAS',
    urldownload: 'http://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/09ee583d-d397-4eb8-99df-92bb6f0d0c4c'
});
var bosque_seco_tropical = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Historicos/wms',
        params: {LAYERS: 'Historicos:bosque_seco_tropical'}
    }), name: 'Bosque Seco Tropical',
    urldownload: 'http://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/eca845f9-dea1-4e86-b562-27338b79ef29'
});
var complejos_paramos_escala100k = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Historicos/wms',
        params: {LAYERS: 'Historicos:complejos_paramos_escala100k'}
    }), name: 'Complejos Páramos Escala 100k',
    urldownload: 'http://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/c9a5d546-33b5-41d6-a60e-57cfae1cff82'
});
var ecosistemas_cuenca_rio_orinoco = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Historicos/wms',
        params: {LAYERS: 'Historicos:ecosistemas_cuenca_rio_orinoco'}
    }), name: 'Ecosistemas Cuenca Río Orinoco',
    urldownload: 'http://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/05281f18-d63e-469d-a2df-5796e8fd1769'
});
var ecosistemas_generales_etter = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Historicos/wms',
        params: {LAYERS: 'Historicos:ecosistemas_generales_etter'}
    }), name: 'Ecosistemas Generales Etter',
    urldownload: 'http://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/52be9cc9-a139-4568-8781-bbbda5590eab'
});
var grado_transformacion_humedales_m10k = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Historicos/wms',
        params: {LAYERS: 'Historicos:grado_transformacion_humedales_m10k'}
    }), name: 'Grado Transformación Humedales',
    urldownload: 'http://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/532e5414-8906-47ee-a298-a97735fc6cdd'
});
var Humedales = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_fondo_adaptacion/wms',
        params: {LAYERS: 'Proyecto_fondo_adaptacion:Humedales'}
    }), name: 'Humedales versión 2012',
    urldownload: 'http://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/7ff0663a-129c-43e9-a024-7718dbe59d60'
});
var Humedales_Continentales_Insulares_2015 = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_fondo_adaptacion/wms',
        params: {LAYERS: 'Proyecto_fondo_adaptacion:Humedales_Continentales_Insulares_2015_Vector'}
    }), name: 'Humedales Continentales Insulares'//,
            //urldownload: ''
});
var Limites21Paramos_25K_2015 = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_fondo_adaptacion/wms',
        params: {LAYERS: 'Proyecto_fondo_adaptacion:Limites21Paramos_25K_2015'}
    }), name: 'Límite 21 Complejos Páramo 2015',
    urldownload: 'http://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/36139b13-b15e-445e-b44d-dd7a5dbe8185'
});
var Limites24Paramos_25K_2016 = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_fondo_adaptacion/wms',
        params: {LAYERS: 'Proyecto_fondo_adaptacion:Limites24Paramos_25K_2016'}
    }), name: 'Límite 24 Complejos Páramo 2016',
    urldownload: 'http://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/36139b13-b15e-445e-b44d-dd7a5dbe8185'
});
var coberturas_bo_2009_2010 = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_oleoducto_bicentenario/wms',
        params: {LAYERS: 'Proyecto_oleoducto_bicentenario:coberturas_bo_2009_2010'}
    }), name: 'Cobertura Bo',
    urldownload: 'http://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/008150a7-4ee9-488a-9ac0-354d678b4b8e'
});
var Biomas = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:Biomas'}
    }), name: 'Biomas',
    urldownload: 'http://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/4ea0ecd2-678d-423b-a940-ee2667d6d4a2'
});
var colapso_acuatico = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:colapso_acuatico'}
    }), name: 'Colapso Acuático',
    urldownload: 'http://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/4cd64685-b856-42b7-a6ce-c4446abb36d3'
});
var colapso_terrestre = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:colapso_terrestre'}
    }), name: 'Colapso Terrestre',
    urldownload: 'http://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/11d7eb22-f60e-446f-b953-cb88817a4ca5'
});
var colapso_total = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:colapso_total'}
    }), name: 'Colapso Total'//,
            //urldownload: ''
});
var distritos_biogeograficos = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:distritos_biogeograficos'}
    }), name: 'Distritos Biogeográficos',
    urldownload: 'http://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/2dec7ad8-6677-4ee2-912c-bd39af420952'
});
var hidrobiologia = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:hidrobiologia'}
    }), name: 'Hidrobiología',
    urldownload: 'http://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/ca8b1ba9-3dea-4791-bf01-48df68d0fd41'
});
var lineamientos = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:lineamientos'}
    }), name: 'Lineamientos',
    urldownload: 'http://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/7963d97d-ba67-4c09-8f28-2807f43f9419'
});
var meta_conservacion = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:meta_conservacion'}
    }), name: 'Meta Conservación',
    urldownload: 'http://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/4cd64685-b856-42b7-a6ce-c4446abb36d3'
});
var unicidad = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:unicidad'}
    }), name: 'Unicidad',
    urldownload: 'http://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/9c0dc2c7-6919-400d-998e-265624c7e781'
});
var unidades_analisis = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Proyecto_PACBAO_Ecopetrol/wms',
        params: {LAYERS: 'Proyecto_PACBAO_Ecopetrol:unidades_analisis'}
    }), name: 'Unidades de Análisis',
    urldownload: 'http://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/f6f304bd-a5f0-450c-a836-d30b12acbaff'
});
var Registros_Ceiba = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://geoservicios.humboldt.org.co/geoserver/Registros_Ceiba/wms',
        params: {LAYERS: 'Registros_Ceiba:Registros_Ceiba'}
    }), name: 'Registros CEIBA'//,
            //urldownload: ''
});
//
//Grupos de capas
//
var layerBase = new ol.layer.Group({
    layers: [streetmap, otm, bw, terrain/*, Deptos, Mpios*/],
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
            if (lay[j].values_.urldownload) {
                var down = document.createElement('img');
                down.id = "IcoDownload";
                down.setAttribute('src', 'iconos/download.png');
                down.className = "card-link float-right";
                down.setAttribute('onclick', 'window.open("' + lay[j].values_.urldownload + '")');
                cardbody.appendChild(down);
            }

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