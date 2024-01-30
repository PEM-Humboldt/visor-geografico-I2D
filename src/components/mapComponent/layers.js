// all layers are here

import { Group as GroupLayer, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource, OSM, XYZ } from 'ol/source';
import { GeoJSON } from 'ol/format'
import { wmsLayer } from '../server/geoserver/wms'
import { styleMpio, styleHighlight, styleHighlightPoint } from './layer-style/layers-style'

//Capa base
export var streetmap = new TileLayer({ title: 'Streetmap', visible: true, source: new OSM({ crossOrigin: null }), maxZoom: 20, minResolution: 2, name: 'Street Map' });
var otm = new TileLayer({ title: 'OTM', visible: false, source: new XYZ({ url: "https://tile.opentopomap.org/{z}/{x}/{y}.png", attributions: ' © OpenStreetMap contributors' }), name: 'OTM' });
var bw = new TileLayer({ title: 'B & W', visible: false, source: new XYZ({ url: "http://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png", attributions: ' © OpenStreetMap contributors' }), name: 'BW' });
var terrain = new TileLayer({ title: 'Terrain', visible: false, source: new XYZ({ url: "http://a.tile.stamen.com/terrain/{z}/{x}/{y}.png", attributions: ' © OpenStreetMap contributors' }), name: 'Terrain' });
var Esri_WorldPhysical = new TileLayer({ title: 'Esri WorldPhysical', visible: false, attribution: 'Tiles &copy; Esri &mdash; Source: US National Park Service', source: new XYZ({ url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}' }), maxZoom: 8, name: 'Esri WorldPhysical' });
var Esri_WorldImagery = new TileLayer({ title: 'Esri WorldImagery', visible: false, source: new XYZ({ url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' }), attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community', name: 'Esri WorldImagery' });
export var CartoDB_Positron = new TileLayer({ title: 'CartoDB Positron', visible: false, source: new XYZ({ url: 'http://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png' }), attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" rel="noopener">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" rel="noopener">CARTO</a>', subdomains: 'abcd', maxZoom: 19, name: 'CartoDB Positron' });

//capa para seleccion
export var highlight = new VectorLayer({ style: styleHighlight, source: new VectorSource() });
export var highlightPoint = new VectorLayer({ style: styleHighlightPoint, source: new VectorSource() });

var highlightStyle = styleMpio;
export var highlightStadistics = new VectorLayer({
    style: function (feature) {
        highlightStyle.getText().setText(feature.values_.mpio_cnmbr);
        return highlightStyle;
    },
    source: new VectorSource()
});

// Captura la URL actual
var urlActual = window.location.href;

if (urlActual.includes("proyecto=ecoreservas")) {
    var proyecto = 'ecoreservas';
} else {
    var proyecto = 'general';
}
export var proyecto;
//Capas control layer
//Capas Basica
export var mpios = wmsLayer('Capas_Base', 'mpio_politico', 'Municipios', true, '');
export var deptos = wmsLayer('Capas_Base', 'dpto_politico', 'Departamentos', true, '');

if (proyecto === 'general') {
    var aicas = wmsLayer('Historicos', 'aicas', 'AICAS', false, '09ee583d-d397-4eb8-99df-92bb6f0d0c4c');
    var bosque_seco_tropical = wmsLayer('Historicos', 'bosque_seco_tropical', 'Bosque Seco Tropical 2014', false, 'eca845f9-dea1-4e86-b562-27338b79ef29');
    var bosque_seco_tropical_2018 = wmsLayer('Historicos', 'BST2018', 'Bosque Seco Tropical 2018', false, '6ccd867c-5114-489f-9266-3e5cf657a375');

    var complejos_paramos_escala100k = wmsLayer('Historicos', 'complejos_paramos_escala100k', 'Complejos Páramos Escala 100k', false, 'c9a5d546-33b5-41d6-a60e-57cfae1cff82');

    var ecosistemas_cuenca_rio_orinoco = wmsLayer('Historicos', 'ecosistemas_cuenca_rio_orinoco', 'Ecosistemas Cuenca Río Orinoco', false, '05281f18-d63e-469d-a2df-5796e8fd1769');
    var ecosistemas_generales_etter = wmsLayer('Historicos', 'ecosistemas_generales_etter', 'Ecosistemas Generales Etter', false, '52be9cc9-a139-4568-8781-bbbda5590eab');
    var grado_transformacion_humedales_m10k = wmsLayer('Historicos', 'grado_transformacion_humedales_m10k', 'Grado Transformación Humedales', false, '532e5414-8906-47ee-a298-a97735fc6cdd');

    var humedales = wmsLayer('Proyecto_fondo_adaptacion', 'Humedales', 'Clasificación de humedales 2015', false, '7ff0663a-129c-43e9-a024-7718dbe59d60');
    var humedales_continentales_insulares_2015 = wmsLayer('Proyecto_fondo_adaptacion', 'Humedales_Continentales_Insulares_2015_Vector', 'Humedales Continentales Insulares', false, 'd68f4329-0385-47a2-8319-8b56c772b4c0');
    var limites21paramos_25K_2015 = wmsLayer('Proyecto_fondo_adaptacion', 'Limites21Paramos_25K_2015', 'Límite 21 Complejos Páramo 2015', false, '5dbddd78-3e51-45e6-b754-ab4c8f74f1b5');
    var limites24paramos_25K_2016 = wmsLayer('Proyecto_fondo_adaptacion', 'Limites24Paramos_25K_2016', 'Límite 24 Complejos Páramo 2016', false, '');

    var coberturas_bo_2009_2010 = wmsLayer('Proyecto_oleoducto_bicentenario', 'coberturas_bo_2009_2010', 'Cobertura Bo', false, '008150a7-4ee9-488a-9ac0-354d678b4b8e');
    var biomas = wmsLayer('Proyecto_PACBAO_Ecopetrol', 'biomas', 'Biomas', false, '4ea0ecd2-678d-423b-a940-ee2667d6d4a2');
    var colapso_acuatico = wmsLayer('Proyecto_PACBAO_Ecopetrol', 'colapso_acuatico', 'Colapso Acuático', false, '');
    var colapso_terrestre = wmsLayer('Proyecto_PACBAO_Ecopetrol', 'colapso_terrestre', 'Colapso Terrestre', false, '11d7eb22-f60e-446f-b953-cb88817a4ca5');
    var colapso_total = wmsLayer('Proyecto_PACBAO_Ecopetrol', 'colapso_total', 'Colapso Total', false, '');
    var distritos_biogeograficos = wmsLayer('Proyecto_PACBAO_Ecopetrol', 'distritos_biogeograficos', 'Distritos Biogeográficos', false, '2dec7ad8-6677-4ee2-912c-bd39af420952');
    var hidrobiologia = wmsLayer('Proyecto_PACBAO_Ecopetrol', 'hidrobiologia', 'Hidrobiología', false, 'ca8b1ba9-3dea-4791-bf01-48df68d0fd41');
    var lineamientos = wmsLayer('Proyecto_PACBAO_Ecopetrol', 'lineamientos', 'Lineamientos', false, '7963d97d-ba67-4c09-8f28-2807f43f9419');
    var meta_conservacion = wmsLayer('Proyecto_PACBAO_Ecopetrol', 'meta_conservacion', 'Meta Conservación', false, '4cd64685-b856-42b7-a6ce-c4446abb36d3');
    var unicidad = wmsLayer('Proyecto_PACBAO_Ecopetrol', 'unicidad', 'Unicidad', false, '9c0dc2c7-6919-400d-998e-265624c7e781');
    var unidades_analisis = wmsLayer('Proyecto_PACBAO_Ecopetrol', 'unidades_analisis', 'Unidades de Análisis', false, 'f6f304bd-a5f0-450c-a836-d30b12acbaff');

    var procesos_gobernanza_multiescalar = wmsLayer('Gobernanza', 'procesos_gobernanza', 'Posibles procesos de gobernanza', false, 'a6fcfe1b-11e8-4383-a38e-a7f0035dece5');

    var red_de_viveros = wmsLayer('visor', 'red_viveros', 'Red Viveros', false, '');

    var mincost_target4 = wmsLayer('weplan', 'mincost_target4', 'mincost target 4', false, '1d6b06b6-8a57-4c87-97ef-e156cb40dc46');
    var target1_1millon_ce = wmsLayer('weplan', 'target1_1millon_ce', 'target1 1 millon ce', false, '1d6b06b6-8a57-4c87-97ef-e156cb40dc46');
    var target4_6millon_ce = wmsLayer('weplan', 'target4_6millon_ce', 'target4 6 millon ce', false, '1d6b06b6-8a57-4c87-97ef-e156cb40dc46');
} else if (proyecto === 'ecoreservas') {
    var p_best_comp = wmsLayer('ecoreservas', 'p_best_comp', 'p best comp', true, '');
    var p_best_comp1 = wmsLayer('ecoreservas', 'p_best_comp1', 'p best comp.', false, '');
    var p_best_vol = wmsLayer('ecoreservas', 'p_best_vol', 'p best vol', false, '');
    var p_renta_comp = wmsLayer('ecoreservas', 'p_renta_comp', 'p renta comp', false, '');
    var p_renta_vol = wmsLayer('ecoreservas', 'p_renta_vol', 'p renta vol', false, '');
    var p_res_comp = wmsLayer('ecoreservas', 'p_res_comp', 'p res comp', false, '');
    var p_res_vol = wmsLayer('ecoreservas', 'p_res_vol', 'p res vol', false, '');
    var r_best_comp = wmsLayer('ecoreservas', 'r_best_comp', 'r best comp', false, '');
    var r_best_vol = wmsLayer('ecoreservas', 'r_best_vol', 'r best vol', false, '');
    var r_renta_comp = wmsLayer('ecoreservas', 'r_renta_comp', 'r renta comp', false, '');
    var r_renta_vol = wmsLayer('ecoreservas', 'r_renta_vol', 'r renta vol', false, '');
    var r_res_comp = wmsLayer('ecoreservas', 'r_res_comp', 'r res comp', false, '');
    var r_res_vol = wmsLayer('ecoreservas', 'r_res_vol', 'r res vol', false, '');
    var us_best_comp = wmsLayer('ecoreservas', 'us_best_comp', 'us best comp', false, '');
    var us_best_vol = wmsLayer('ecoreservas', 'us_best_vol', 'us best vol', false, '');
    var us_renta_comp = wmsLayer('ecoreservas', 'us_renta_comp', 'us renta comp', false, '');
    var us_renta_vol = wmsLayer('ecoreservas', 'us_renta_vol', 'us renta vol', false, '');
    var us_res_comp = wmsLayer('ecoreservas', 'us_res_comp', 'us res comp', false, '');
    var us_res_vol = wmsLayer('ecoreservas', 'us_res_vol', 'us res vol', false, '');
}
//Grupos de capas
export var layer_base = new GroupLayer({
    fold: 'close',
    title: 'Capas Base',
    layers: [CartoDB_Positron, streetmap, Esri_WorldPhysical, Esri_WorldImagery, otm, bw, terrain /*, Deptos, Mpios*/],
    name: 'Capas Base'
});

export var division_base = new GroupLayer({
    fold: 'close',
    title: 'División político-administrativa',
    layers: [deptos, mpios],
    name: 'División político-administrativa'
});
let historicos, fondo_adaptacion, proyecto_oleoducto_bicentenario, conservacion_biodiversidad, gobernanza, viveros, targetmill, comp_preservacion, comp_restauracion, comp_uso_sostenible, inv1_preservacion, inv1_restauracion, inv1_uso_sostenible, invv_preservacion, invv_restauracion, invv_uso_sostenible

if (proyecto === 'general') {
    historicos = new GroupLayer({
        fold: 'close',
        title: 'Historicos',
        layers: [aicas, bosque_seco_tropical, bosque_seco_tropical_2018, complejos_paramos_escala100k, ecosistemas_cuenca_rio_orinoco, ecosistemas_generales_etter, grado_transformacion_humedales_m10k],
        name: 'Historicos'
    });
    fondo_adaptacion = new GroupLayer({
        fold: 'close',
        title: 'Fondo de adaptación',
        layers: [humedales, humedales_continentales_insulares_2015, limites21paramos_25K_2015, limites24paramos_25K_2016],
        name: 'Fondo de adaptación'
    });
    proyecto_oleoducto_bicentenario = new GroupLayer({
        fold: 'close',
        title: 'Proyecto Oleoducto Bicentenario',
        layers: [coberturas_bo_2009_2010],
        name: 'Proyecto Oleoducto Bicentenario'
    });
    conservacion_biodiversidad = new GroupLayer({
        fold: 'close',
        title: 'Conservación de la Biodiversidad',
        layers: [biomas, colapso_acuatico, colapso_terrestre, colapso_total, distritos_biogeograficos, hidrobiologia, lineamientos, meta_conservacion, unicidad, unidades_analisis],
        name: 'Conservación de la Biodiversidad'
    });
    gobernanza = new GroupLayer({
        fold: 'close',
        title: 'Gobernanza',
        layers: [procesos_gobernanza_multiescalar],
        name: 'Gobernanza'
    });
    viveros = new GroupLayer({
        fold: 'close',
        title: 'Red viveros de Colombia',
        layers: [red_de_viveros],
        name: 'Red viveros de Colombia'
    });
    targetmill = new GroupLayer({
        fold: 'close',
        title: 'We Plan',
        layers: [mincost_target4, target1_1millon_ce, target4_6millon_ce],
        name: 'We Plan'
    });
} else if (proyecto === 'ecoreservas') {
    comp_preservacion = new GroupLayer({
        fold: 'close',
        title: 'Preservación',
        layers: [p_best_comp, p_renta_comp, p_res_comp],
        name: 'Preservación'
    });
    comp_restauracion = new GroupLayer({
        fold: 'close',
        title: 'Restauracion',
        layers: [r_best_comp, r_renta_comp, r_res_comp],
        name: 'Restauracion'
    });
    comp_uso_sostenible = new GroupLayer({
        fold: 'close',
        title: 'Uso Sostenible',
        layers: [us_best_comp, us_renta_comp, us_res_comp],
        name: 'Uso Sostenible'
    });
    inv1_preservacion = new GroupLayer({
        fold: 'close',
        title: 'Preservación',
        layers: [p_best_comp1, p_renta_comp, p_res_comp],
        name: 'Preservación'
    });
    inv1_restauracion = new GroupLayer({
        fold: 'close',
        title: 'Restauracion',
        layers: [r_best_comp, r_renta_comp, r_res_comp],
        name: 'Restauracion'
    });
    inv1_uso_sostenible = new GroupLayer({
        fold: 'close',
        title: 'Uso Sostenible',
        layers: [us_best_comp, us_renta_comp, us_res_comp],
        name: 'Uso Sostenible'
    });
    invv_preservacion = new GroupLayer({
        fold: 'close',
        title: 'Preservación',
        layers: [p_best_vol, p_renta_vol, p_res_vol],
        name: 'Preservación'
    });
    invv_restauracion = new GroupLayer({
        fold: 'close',
        title: 'Restauracion',
        layers: [r_best_vol, r_renta_vol, r_res_vol],
        name: 'Restauracion'
    });
    invv_uso_sostenible = new GroupLayer({
        fold: 'close',
        title: 'Uso Sostenible',
        layers: [us_best_vol, us_renta_vol, us_res_vol],
        name: 'Uso Sostenible'
    });
};

export { historicos, fondo_adaptacion, proyecto_oleoducto_bicentenario, conservacion_biodiversidad, gobernanza, viveros, targetmill, comp_preservacion, comp_restauracion, comp_uso_sostenible, inv1_preservacion, inv1_restauracion, inv1_uso_sostenible, invv_preservacion, invv_restauracion, invv_uso_sostenible };

export var feats = (data) => {
    return new VectorSource({
        features: (new GeoJSON()).readFeatures(data)
    });
}
// hightlight the selection
export const hightlightAdd = (feature, type) => {
    type == 'point' ? highlightPoint.getSource().addFeature(feature) : highlight.getSource().addFeature(feature);
}
// remove the selection
export const hightlightRemove = () => {
    highlightPoint.getSource().clear();
    highlight.getSource().clear();
}
// hightlight the feat selection
export const highlightStadisticsAdd = (feature) => { highlightStadistics.getSource().addFeature(feature); }
// remove the feat selection
export const highlightStadisticsRemove = () => { highlightStadistics.getSource().clear(); }
