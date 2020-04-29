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
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:agrologico', STYLES: ''}
    }), name: 'Agrologia'
});
var avu = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:avu', STYLES: ''}
    }), name: 'avu'
});
var Bosque = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:bosque', STYLES: ''}
    }),
    //name: 'Bosque'
    name: 'Coberturas vegetales y ecosistemas'
});
var CuerposAgua = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:cuerpos_agua', STYLES: ''}
    }), name: 'Cuerpos Agua'
});
var Cultivos = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:cultivos', STYLES: ''}
    }), name: 'Cultivos'
});
var EquipamientoUrbano = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:equipamiento_urbano', STYLES: ''}
    }), name: 'Equipamiento Urbano'
});
var EspacioPublico = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:espacio_publico', STYLES: ''}
    }), name: 'Espacio Publico'
});
var EstructuraEcologica = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:estructura_ecologica_urbana_envigado', STYLES: ''}
    }), name: 'Estructura Ecologica Urbana'
});
var Humedales = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:humedales', STYLES: ''}
    }), name: 'Humedales'
});
var Nacimientos = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:nacimientos', STYLES: ''}
    }), name: 'Nacimientos'
});
var Plantaciones = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:plantaciones', STYLES: ''}
    }), name: 'Plantaciones'
});
var Predios_Priorizados = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:predios_priorizados', STYLES: ''}
    }), name: 'Predios Priorizados'
});
var Ronda_Hidrica = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:ronda_hidrica', STYLES: ''}
    }), name: 'Ronda Hidrica'
});
var Senderos = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:senderos', STYLES: ''}
    }), name: 'Senderos'
});
var Urbano = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:urbano', STYLES: ''}
    }), name: 'Urbano'
});
var Zonas_Verdes = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:zonas_verdes', STYLES: ''}
    }), name: 'Zonas Verdes'
});
var Ago_1991 = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:ago_1991', STYLES: ''}
    }), name: 'Ago 1991'
});
var Ago_2000 = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:ago_2000', STYLES: ''}
    }), name: 'Ago 2000'
});
var Ene_2015 = new ol.layer.Tile({
    visible: false,
    source: new ol.source.TileWMS({
        url: 'http://34.231.25.67:8080/geoserver/Visor/wms',
        params: {LAYERS: 'Visor:ene_2015', STYLES: ''}
    }), name: 'Ene 2015'
});
//
//Grupos de capas
//
var layerBase = new ol.layer.Group({
    layers: [streetmap, Deptos, Mpios, highlight],
    name: 'Capas Base'
});
var ECP = new ol.layer.Group({
    layers: [Agrologia, avu, Bosque, CuerposAgua, Cultivos, EquipamientoUrbano, EspacioPublico, EstructuraEcologica, Humedales, Nacimientos, Plantaciones, Predios_Priorizados, Ronda_Hidrica, Senderos, Urbano, Zonas_Verdes],
    //layers: [EstructuraEcologica],
    //name: 'Estructura Ecologica Principal',
    name: 'Soporte'//,
            //visible: true
});
var ServEco = new ol.layer.Group({
    layers: [Bosque],
    name: 'Biodiversidad y Servicios ecosistémicos',
    visible: true
});
var InfraVerde = new ol.layer.Group({
    layers: [],
    name: 'Infraestructura verde',
    visible: true
});
var CalAmbUrb = new ol.layer.Group({
    layers: [],
    name: 'Calidad ambiental urbana',
    visible: true
});
var InCiu = new ol.layer.Group({
    layers: [],
    name: 'Iniciativas ciudadanas',
    visible: true
});
var HuellaUrbana = new ol.layer.Group({
    layers: [Ene_2015, Ago_2000, Ago_1991],
    name: 'Huella Urbana',
    visible: true
});
/*var otros = new ol.layer.Group({
 layers: [Agrologia, avu, CuerposAgua, Cultivos, EquipamientoUrbano, EspacioPublico, Humedales, Nacimientos, Plantaciones, Predios_Priorizados, Ronda_Hidrica, Senderos, Urbano, Zonas_Verdes],
 //layers: [EstructuraEcologica],
 //name: 'Estructura Ecologica Principal',
 name: 'Otros',
 visible: true
 });*/
//
//
//
map = new ol.Map({
    controls: ol.control.defaults().extend([new ol.control.ScaleLine(), new ol.control.ZoomToExtent({
            extent: [-7430902, -479413, -8795762, 1408887]
        })
    ]),
    target: document.getElementById('map'),
    // use the Canvas renderer
    renderer: 'canvas',
    layers: [layerBase, ECP, ServEco, InfraVerde, CalAmbUrb, InCiu, HuellaUrbana/*, otros*/],
    view: new ol.View({
        center: [-8113332, 464737],
        zoom: 5.373
    })
});
AllLayers = [];
var k = 0;
function buildLayerTree(layer) {
    var name = layer.get('name') ? layer.get('name') : "Group";
    var layers = layer.getLayers().getArray();
    var len = layers.length;
    for (var i = 0; i < len; i++) {
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
        if (i === 1) {
            for (var j = 0; j <= leng; j++) {
                if (lay[j]) {

                    if (j === 0) {
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
                        //check.checked = true;
                        cardbody.appendChild(check);
                        var lab = document.createElement('label');
                        lab.className = "form-check-label";
                        lab.setAttribute('for', 'defaultCheck1');
                        lab.innerHTML = subname;
                        cardbody.appendChild(lab);
                        AllLayers[k] = lay[j];
                        k = k + 1;

                        var cardbody = document.createElement('div');
                        cardbody.className = "card-body";
                        collapseOne.appendChild(cardbody);
                        var fcheck = document.createElement('div');
                        fcheck.className = "form-check";
                        var check = document.createElement('input');
                        check.className = "form-check-input";
                        check.setAttribute('type', 'checkbox');
                        check.id = 'Conectividad';
                        //check.checked = true;
                        check.disabled = true;
                        cardbody.appendChild(check);
                        var lab = document.createElement('label');
                        lab.className = "form-check-label";
                        lab.setAttribute('for', 'defaultCheck1');
                        lab.innerHTML = 'Conectividad';
                        cardbody.appendChild(lab);
                    } else {
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
                        //check.checked = true;
                        cardbody.appendChild(check);
                        var lab = document.createElement('label');
                        lab.className = "form-check-label";
                        lab.setAttribute('for', 'defaultCheck1');
                        lab.innerHTML = subname;
                        cardbody.appendChild(lab);
                        AllLayers[k] = lay[j];
                        k = k + 1;
                    }
                }
            }
        } else if (i === 2) {
            for (var j = 0; j <= leng + 1; j++) {
                if (lay[j]) {
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
                    //check.checked = true;
                    cardbody.appendChild(check);
                    var lab = document.createElement('label');
                    lab.className = "form-check-label";
                    lab.setAttribute('for', 'defaultCheck1');
                    lab.innerHTML = subname;
                    cardbody.appendChild(lab);
                    AllLayers[k] = lay[j];
                    k = k + 1;
                } else if (j === 1) {
                    var cardbody = document.createElement('div');
                    cardbody.className = "card-body";
                    collapseOne.appendChild(cardbody);
                    var fcheck = document.createElement('div');
                    fcheck.className = "form-check";
                    var check = document.createElement('input');
                    check.className = "form-check-input";
                    check.setAttribute('type', 'checkbox');
                    check.id = 'Oferta de Servicios ecosistémicos';
                    check.disabled = true;
                    cardbody.appendChild(check);
                    var lab = document.createElement('label');
                    lab.className = "form-check-label";
                    lab.setAttribute('for', 'defaultCheck1');
                    lab.innerHTML = 'Oferta de Servicios ecosistémicos';
                    cardbody.appendChild(lab);
                } else if (j === 2) {
                    var cardbody = document.createElement('div');
                    cardbody.className = "card-body";
                    collapseOne.appendChild(cardbody);
                    var fcheck = document.createElement('div');
                    fcheck.className = "form-check";
                    var check = document.createElement('input');
                    check.className = "form-check-input";
                    check.setAttribute('type', 'checkbox');
                    check.id = 'Inventarios oficiales de especies';
                    check.disabled = true;
                    cardbody.appendChild(check);
                    var lab = document.createElement('label');
                    lab.className = "form-check-label";
                    lab.setAttribute('for', 'defaultCheck1');
                    lab.innerHTML = 'Inventarios oficiales de especies';
                    cardbody.appendChild(lab);
                }
            }
        } else if (i === 3) {
            for (var j = 0; j <= leng + 3; j++) {
                if (j === 0) {
                    var cardbody = document.createElement('div');
                    cardbody.className = "card-body";
                    collapseOne.appendChild(cardbody);
                    var fcheck = document.createElement('div');
                    fcheck.className = "form-check";
                    var check = document.createElement('input');
                    check.className = "form-check-input";
                    check.setAttribute('type', 'checkbox');
                    check.id = 'Inventario arbolado urbano';
                    check.disabled = true;
                    cardbody.appendChild(check);
                    var lab = document.createElement('label');
                    lab.className = "form-check-label";
                    lab.setAttribute('for', 'defaultCheck1');
                    lab.innerHTML = 'Inventario arbolado urbano';
                    cardbody.appendChild(lab);
                } else if (j === 1) {
                    var cardbody = document.createElement('div');
                    cardbody.className = "card-body";
                    collapseOne.appendChild(cardbody);
                    var fcheck = document.createElement('div');
                    fcheck.className = "form-check";
                    var check = document.createElement('input');
                    check.className = "form-check-input";
                    check.setAttribute('type', 'checkbox');
                    check.id = 'Parques';
                    check.disabled = true;
                    cardbody.appendChild(check);
                    var lab = document.createElement('label');
                    lab.className = "form-check-label";
                    lab.setAttribute('for', 'defaultCheck1');
                    lab.innerHTML = 'Parques';
                    cardbody.appendChild(lab);
                } else if (j === 2) {
                    var cardbody = document.createElement('div');
                    cardbody.className = "card-body";
                    collapseOne.appendChild(cardbody);
                    var fcheck = document.createElement('div');
                    fcheck.className = "form-check";
                    var check = document.createElement('input');
                    check.className = "form-check-input";
                    check.setAttribute('type', 'checkbox');
                    check.id = 'Terrazas y techos verdes';
                    check.disabled = true;
                    cardbody.appendChild(check);
                    var lab = document.createElement('label');
                    lab.className = "form-check-label";
                    lab.setAttribute('for', 'defaultCheck1');
                    lab.innerHTML = 'Terrazas y techos verdes';
                    cardbody.appendChild(lab);
                } else if (j === 3) {
                    var cardbody = document.createElement('div');
                    cardbody.className = "card-body";
                    collapseOne.appendChild(cardbody);
                    var fcheck = document.createElement('div');
                    fcheck.className = "form-check";
                    var check = document.createElement('input');
                    check.className = "form-check-input";
                    check.setAttribute('type', 'checkbox');
                    check.id = 'Catálogo de especies y recomendaciones de diseño';
                    check.disabled = true;
                    cardbody.appendChild(check);
                    var lab = document.createElement('label');
                    lab.className = "form-check-label";
                    lab.setAttribute('for', 'defaultCheck1');
                    lab.innerHTML = 'Catálogo de especies y recomendaciones de diseño';
                    cardbody.appendChild(lab);
                }
                if (check.disabled !== true) {
                    console.log(lay[j])
                    AllLayers[k] = lay[j];
                    k = k + 1;
                }
            }
        } else if (i === 4) {
            for (var j = 0; j <= leng + 2; j++) {
                if (j === 0) {
                    var cardbody = document.createElement('div');
                    cardbody.className = "card-body";
                    collapseOne.appendChild(cardbody);
                    var fcheck = document.createElement('div');
                    fcheck.className = "form-check";
                    var check = document.createElement('input');
                    check.className = "form-check-input";
                    check.setAttribute('type', 'checkbox');
                    check.id = 'Calidad del aire';
                    check.disabled = true;
                    cardbody.appendChild(check);
                    var lab = document.createElement('label');
                    lab.className = "form-check-label";
                    lab.setAttribute('for', 'defaultCheck1');
                    lab.innerHTML = 'Calidad del aire';
                    cardbody.appendChild(lab);
                } else if (j === 1) {
                    var cardbody = document.createElement('div');
                    cardbody.className = "card-body";
                    collapseOne.appendChild(cardbody);
                    var fcheck = document.createElement('div');
                    fcheck.className = "form-check";
                    var check = document.createElement('input');
                    check.className = "form-check-input";
                    check.setAttribute('type', 'checkbox');
                    check.id = 'Islas de calor';
                    check.disabled = true;
                    cardbody.appendChild(check);
                    var lab = document.createElement('label');
                    lab.className = "form-check-label";
                    lab.setAttribute('for', 'defaultCheck1');
                    lab.innerHTML = 'Islas de calor';
                    cardbody.appendChild(lab);
                } else if (j === 2) {
                    var cardbody = document.createElement('div');
                    cardbody.className = "card-body";
                    collapseOne.appendChild(cardbody);
                    var fcheck = document.createElement('div');
                    fcheck.className = "form-check";
                    var check = document.createElement('input');
                    check.className = "form-check-input";
                    check.setAttribute('type', 'checkbox');
                    check.id = 'Ruido';
                    check.disabled = true;
                    cardbody.appendChild(check);
                    var lab = document.createElement('label');
                    lab.className = "form-check-label";
                    lab.setAttribute('for', 'defaultCheck1');
                    lab.innerHTML = 'Ruido';
                    cardbody.appendChild(lab);
                }
                if (check.disabled !== true) {
                    console.log(lay[j])
                    AllLayers[k] = lay[j];
                    k = k + 1;
                }
            }
        } else if (i === 5) {
            for (var j = 0; j <= leng + 2; j++) {
                if (j === 0) {
                    var cardbody = document.createElement('div');
                    cardbody.className = "card-body";
                    collapseOne.appendChild(cardbody);
                    var fcheck = document.createElement('div');
                    fcheck.className = "form-check";
                    var check = document.createElement('input');
                    check.className = "form-check-input";
                    check.setAttribute('type', 'checkbox');
                    check.id = 'Huertas privadas y comunitarias/bancos de semillas';
                    check.disabled = true;
                    cardbody.appendChild(check);
                    var lab = document.createElement('label');
                    lab.className = "form-check-label";
                    lab.setAttribute('for', 'defaultCheck1');
                    lab.innerHTML = 'Huertas privadas y comunitarias/bancos de semillas';
                    cardbody.appendChild(lab);
                } else if (j === 1) {
                    var cardbody = document.createElement('div');
                    cardbody.className = "card-body";
                    collapseOne.appendChild(cardbody);
                    var fcheck = document.createElement('div');
                    fcheck.className = "form-check";
                    var check = document.createElement('input');
                    check.className = "form-check-input";
                    check.setAttribute('type', 'checkbox');
                    check.id = 'Compostaje';
                    check.disabled = true;
                    cardbody.appendChild(check);
                    var lab = document.createElement('label');
                    lab.className = "form-check-label";
                    lab.setAttribute('for', 'defaultCheck1');
                    lab.innerHTML = 'Compostaje';
                    cardbody.appendChild(lab);
                } else if (j === 2) {
                    var cardbody = document.createElement('div');
                    cardbody.className = "card-body";
                    collapseOne.appendChild(cardbody);
                    var fcheck = document.createElement('div');
                    fcheck.className = "form-check";
                    var check = document.createElement('input');
                    check.className = "form-check-input";
                    check.setAttribute('type', 'checkbox');
                    check.id = 'Organizaciones de la sociedad civil';
                    check.disabled = true;
                    cardbody.appendChild(check);
                    var lab = document.createElement('label');
                    lab.className = "form-check-label";
                    lab.setAttribute('for', 'defaultCheck1');
                    lab.innerHTML = 'Organizaciones de la sociedad civil';
                    cardbody.appendChild(lab);
                }
                if (check.disabled !== true) {
                    console.log(lay[j])
                    AllLayers[k] = lay[j];
                    k = k + 1;
                }
            }
        } else {
            for (var j = 0; j <= leng; j++) {
                if (lay[j] && j !== 3) {
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
                    if (subname !== 'Street Map') {
                        AllLayers[k] = lay[j];
                        k = k + 1;
                    }
                }
                /*console.log(check.disabled);
                 if (check.disabled !== true) {
                 console.log(lay[j]);
                 AllLayers[k] = lay[j];
                 k = k + 1;
                 }*/
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
buildLayerTree(map.getLayerGroup());
$(document).ready(function () {

    // Handle visibility control
    $('input').on('click', function () {
        var layername = this.id;
        var layer = findBy(map.getLayerGroup(), 'name', layername);
        layer.setVisible(!layer.getVisible());
    });
});