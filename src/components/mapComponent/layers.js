// all layers are here

import { Group as GroupLayer, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource, OSM, XYZ } from 'ol/source';
import { GeoJSON } from 'ol/format'
import { wmsLayer } from '../server/geoserver/wms'
import { styleMpio, styleHighlight, styleHighlightPoint } from './layer-style/layers-style'

// Captura la URL actual
var urlActual = window.location.href;
let proyectos;
let streetma;
let CartoDB_Positro;
//Capas encendidas
let v_aicas = false;
let v_bst2014 = false;
let v_bst2018 = false;
let v_paramos_100 = false;
let v_eco_rio_orinoco = false;
let v_eco_etter = false;
let v_g_transformacion_humedal = false;
let v_clasificacion_humedal = false
let v_humedal_continental = false;
let v_21_paramos = false;
let v_24_paramos = false;
let v_cobertura_bo = false;
let v_biomas = false;
let v_colapso_terrestre = false;
let v_distrito_biogeo = false;
let v_hidrobiologia = false;
let v_lineamientos = false;
let v_meta_conservacion = false;
let v_unicidad = false;
let v_unidad_analisis = false;
let v_gobernanza = false;
let v_integridad = false;
let v_viveros = false;
let v_weplan = false;
let v_gefmun = false;
let v_gefpar = false;

if (urlActual.includes("proyecto=ecoreservas")) {
    proyectos = 'ecoreservas';
    streetma = new TileLayer({ title: 'Streetmap', visible: false, source: new OSM({ crossOrigin: null }), maxZoom: 20, minResolution: 2, name: 'Street Map' });
    CartoDB_Positro = new TileLayer({ title: 'CartoDB Positron', visible: true, source: new XYZ({ url: 'http://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png' }), attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" rel="noopener">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" rel="noopener">CARTO</a>', subdomains: 'abcd', maxZoom: 19, name: 'CartoDB Positron' });
    
    // Seleccionar los elementos por su ID
    const logoEcoP = document.getElementById("logo_eco_p");
    const logoEcoG = document.getElementById("logo_eco_g");

    // Cambiar el estilo 'display' de 'none' a 'block'
    logoEcoP.style.display = "inline-block";
    logoEcoG.style.display = "inline-block";

} else {
    proyectos = 'general';
    streetma = new TileLayer({ title: 'Streetmap', visible: true, source: new OSM({ crossOrigin: null }), maxZoom: 20, minResolution: 2, name: 'Street Map' });
    CartoDB_Positro = new TileLayer({ title: 'CartoDB Positron', visible: false, source: new XYZ({ url: 'http://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png' }), attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" rel="noopener">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" rel="noopener">CARTO</a>', subdomains: 'abcd', maxZoom: 19, name: 'CartoDB Positron' });
    if (urlActual.includes("capa=aicas")) {
        v_aicas = true;
    }
    if (urlActual.includes("capa=bst2014")) {
        v_bst2014 = true;
    }
    if (urlActual.includes("capa=bst2018")) {
        v_bst2018 = true;
    }
    if (urlActual.includes("capa=paramo100k")) {
        v_paramos_100 = true;
    }
    if (urlActual.includes("capa=erioorinoco")) {
        v_eco_rio_orinoco = true;
    }
    if (urlActual.includes("capa=etter")) {
        v_eco_etter = true;
    }
    if (urlActual.includes("capa=gthumedal")) {
        v_g_transformacion_humedal = true;
    }
    if (urlActual.includes("capa=clashumedal")) {
        v_clasificacion_humedal = true;
    }
    if (urlActual.includes("capa=humedalcontinental")) {
        v_humedal_continental = true;
    }
    if (urlActual.includes("capa=paramo21")) {
        v_21_paramos = true;
    }
    if (urlActual.includes("capa=paramo24")) {
        v_24_paramos = true;
    }
    if (urlActual.includes("capa=coberturabosque")) {
        v_cobertura_bo = true;
    }
    if (urlActual.includes("capa=biomas")) {
        v_biomas = true;
    }
    if (urlActual.includes("capa=colapsoterrestre")) {
        v_colapso_terrestre = true;
    }
    if (urlActual.includes("capa=distritobiogeo")) {
        v_distrito_biogeo = true;
    }
    if (urlActual.includes("capa=hidrobiologia")) {
        v_hidrobiologia = true;
    }
    if (urlActual.includes("capa=lineamientos")) {
        v_lineamientos = true;
    }
    if (urlActual.includes("capa=metaconservacion")) {
        v_meta_conservacion = true;
    }
    if (urlActual.includes("capa=unicidad")) {
        v_unicidad = true;
    }
    if (urlActual.includes("capa=unidadanalisis")) {
        v_unidad_analisis = true;
    }
    if (urlActual.includes("capa=gobernanza")) {
        v_gobernanza = true;
    }
    if (urlActual.includes("capa=integridad")) {
        v_integridad = true;
    }
    if (urlActual.includes("capa=viveros")) {
        v_viveros = true;
    }
    if (urlActual.includes("capa=weplan")) {
        v_weplan = true;
    }
    if (urlActual.includes("capa=gefparamos")) {
        v_gefmun = true;
    }
    if (urlActual.includes("capa=gefparamos")) {
        v_gefpar = true;
    }
}
export var proyecto = proyectos;

//Capa base
export var streetmap = streetma;// = new TileLayer({ title: 'Streetmap', visible: true, source: new OSM({ crossOrigin: null }), maxZoom: 20, minResolution: 2, name: 'Street Map' });
var otm = new TileLayer({ title: 'OTM', visible: false, source: new XYZ({ url: "https://tile.opentopomap.org/{z}/{x}/{y}.png", attributions: ' © OpenStreetMap contributors' }), name: 'OTM' });
var bw = new TileLayer({ title: 'B & W', visible: false, source: new XYZ({ url: "http://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png", attributions: ' © OpenStreetMap contributors' }), name: 'BW' });
var terrain = new TileLayer({ title: 'Terrain', visible: false, source: new XYZ({ url: "http://a.tile.stamen.com/terrain/{z}/{x}/{y}.png", attributions: ' © OpenStreetMap contributors' }), name: 'Terrain' });
var Esri_WorldPhysical = new TileLayer({ title: 'Esri WorldPhysical', visible: false, attribution: 'Tiles &copy; Esri &mdash; Source: US National Park Service', source: new XYZ({ url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}' }), maxZoom: 8, name: 'Esri WorldPhysical' });
var Esri_WorldImagery = new TileLayer({ title: 'Esri WorldImagery', visible: false, source: new XYZ({ url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' }), attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community', name: 'Esri WorldImagery' });
export var CartoDB_Positron = CartoDB_Positro;// = new TileLayer({ title: 'CartoDB Positron', visible: false, source: new XYZ({ url: 'http://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png' }), attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" rel="noopener">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" rel="noopener">CARTO</a>', subdomains: 'abcd', maxZoom: 19, name: 'CartoDB Positron' });

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
/*
// Captura la URL actual
var urlActual = window.location.href;
let proyectos;
if (urlActual.includes("proyecto=ecoreservas")) {
    proyectos = 'ecoreservas';
} else {
    proyectos = 'general';
}
export var proyecto = proyectos;*/
//Capas control layer
//Capas Basica
export var mpios = wmsLayer('Capas_Base', 'mpio_politico', 'Municipios', true, '');
export var deptos = wmsLayer('Capas_Base', 'dpto_politico', 'Departamentos', true, '');

if (proyectos === 'general') {
    var aicas = wmsLayer('Historicos', 'aicas', 'AICAS', v_aicas, '09ee583d-d397-4eb8-99df-92bb6f0d0c4c');
    var bosque_seco_tropical = wmsLayer('Historicos', 'bosque_seco_tropical', 'Bosque Seco Tropical 2014', v_bst2014, 'eca845f9-dea1-4e86-b562-27338b79ef29');
    var bosque_seco_tropical_2018 = wmsLayer('Historicos', 'BST2018', 'Bosque Seco Tropical 2018', v_bst2018, '6ccd867c-5114-489f-9266-3e5cf657a375');

    var complejos_paramos_escala100k = wmsLayer('Historicos', 'complejos_paramos_escala100k', 'Complejos Páramos Escala 100k', v_paramos_100, 'c9a5d546-33b5-41d6-a60e-57cfae1cff82');

    var ecosistemas_cuenca_rio_orinoco = wmsLayer('Historicos', 'ecosistemas_cuenca_rio_orinoco', 'Ecosistemas Cuenca Río Orinoco', v_eco_rio_orinoco, '05281f18-d63e-469d-a2df-5796e8fd1769');
    var ecosistemas_generales_etter = wmsLayer('Historicos', 'ecosistemas_generales_etter', 'Ecosistemas Generales Etter', v_eco_etter, '52be9cc9-a139-4568-8781-bbbda5590eab');
    var grado_transformacion_humedales_m10k = wmsLayer('Historicos', 'grado_transformacion_humedales_m10k', 'Grado Transformación Humedales', v_g_transformacion_humedal, '532e5414-8906-47ee-a298-a97735fc6cdd');

    var humedales = wmsLayer('Proyecto_fondo_adaptacion', 'Humedales', 'Clasificación de humedales 2015', v_clasificacion_humedal, '7ff0663a-129c-43e9-a024-7718dbe59d60');
    var humedales_continentales_insulares_2015 = wmsLayer('Proyecto_fondo_adaptacion', 'Humedales_Continentales_Insulares_2015_Vector', 'Humedales Continentales Insulares', v_humedal_continental, 'd68f4329-0385-47a2-8319-8b56c772b4c0');
    var limites21paramos_25K_2015 = wmsLayer('Proyecto_fondo_adaptacion', 'Limites21Paramos_25K_2015', 'Límite 21 Complejos Páramo 2015', v_21_paramos, '5dbddd78-3e51-45e6-b754-ab4c8f74f1b5');
    var limites24paramos_25K_2016 = wmsLayer('Proyecto_fondo_adaptacion', 'Limites24Paramos_25K_2016', 'Límite 24 Complejos Páramo 2016', v_24_paramos, '36139b13-b15e-445e-b44d-dd7a5dbe8185');

    var coberturas_bo_2009_2010 = wmsLayer('Proyecto_oleoducto_bicentenario', 'coberturas_bo_2009_2010', 'Cobertura Bo', v_cobertura_bo, '008150a7-4ee9-488a-9ac0-354d678b4b8e');
    var biomas = wmsLayer('Proyecto_PACBAO_Ecopetrol', 'biomas', 'Biomas', v_biomas, '4ea0ecd2-678d-423b-a940-ee2667d6d4a2');
    var colapso_acuatico = wmsLayer('Proyecto_PACBAO_Ecopetrol', 'colapso_acuatico', 'Colapso Acuático', false, '11d7eb22-f60e-446f-b953-cb88817a4ca5');
    var colapso_terrestre = wmsLayer('Proyecto_PACBAO_Ecopetrol', 'colapso_terrestre', 'Colapso Terrestre', v_colapso_terrestre, '11d7eb22-f60e-446f-b953-cb88817a4ca5');
    var colapso_total = wmsLayer('Proyecto_PACBAO_Ecopetrol', 'colapso_total', 'Colapso Total', false, '11d7eb22-f60e-446f-b953-cb88817a4ca5');
    var distritos_biogeograficos = wmsLayer('Proyecto_PACBAO_Ecopetrol', 'distritos_biogeograficos', 'Distritos Biogeográficos', v_distrito_biogeo, '2dec7ad8-6677-4ee2-912c-bd39af420952');
    var hidrobiologia = wmsLayer('Proyecto_PACBAO_Ecopetrol', 'hidrobiologia', 'Hidrobiología', v_hidrobiologia, 'ca8b1ba9-3dea-4791-bf01-48df68d0fd41');
    var lineamientos = wmsLayer('Proyecto_PACBAO_Ecopetrol', 'lineamientos', 'Lineamientos', v_lineamientos, '7963d97d-ba67-4c09-8f28-2807f43f9419');
    var meta_conservacion = wmsLayer('Proyecto_PACBAO_Ecopetrol', 'meta_conservacion', 'Meta Conservación', v_meta_conservacion, '4cd64685-b856-42b7-a6ce-c4446abb36d3');
    var unicidad = wmsLayer('Proyecto_PACBAO_Ecopetrol', 'unicidad', 'Unicidad', v_unicidad, '9c0dc2c7-6919-400d-998e-265624c7e781');
    var unidades_analisis = wmsLayer('Proyecto_PACBAO_Ecopetrol', 'unidades_analisis', 'Unidades de Análisis', v_unidad_analisis, 'f6f304bd-a5f0-450c-a836-d30b12acbaff');

    var procesos_gobernanza_multiescalar = wmsLayer('Gobernanza', 'procesos_gobernanza', 'Posibles procesos de gobernanza', v_gobernanza, 'a6fcfe1b-11e8-4383-a38e-a7f0035dece5');

    var red_de_viveros = wmsLayer('visor', 'red_viveros', 'Red Viveros', v_viveros, '7UAZDX');

    var scen_mincost_target1 = wmsLayer('weplan', 'scen_mincost_target1', 'Escenario mínimo costo target 1', false, '1d6b06b6-8a57-4c87-97ef-e156cb40dc46');
    var scen_mincost_target2 = wmsLayer('weplan', 'scen_mincost_target2', 'Escenario mínimo costo target 2', false, '1d6b06b6-8a57-4c87-97ef-e156cb40dc46');
    var scen_mincost_target3 = wmsLayer('weplan', 'scen_mincost_target3', 'Escenario mínimo costo target 3', v_weplan, '1d6b06b6-8a57-4c87-97ef-e156cb40dc46');
    var scen_mincost_target4 = wmsLayer('weplan', 'scen_mincost_target4', 'Escenario mínimo costo target 4', false, '1d6b06b6-8a57-4c87-97ef-e156cb40dc46');

    var integridad = wmsLayer('restauracion', 'integr_total4326', 'Integridad', v_integridad, '55d29ef5-e419-489f-a450-3299e4bcc4d4');

    var gefparamo = wmsLayer('gefparamos', 'paramo', 'Paramos', v_gefpar, 'LPM4RE');
    var gefmunicipio = wmsLayer('gefparamos', 'municipio', 'Municipios', v_gefmun, 'LPM4RE');

} else if (proyectos === 'ecoreservas') {
    var p_best_comp = wmsLayer('ecoreservas', 'Preservación_priorizando_todos_los_enfoques_Compensación', 'Todos los enfoques de costos-Inversión en compensación', true, '4eca511b-d4db-49bc-8efa-a1f20e7c45ac');
    var p_best_comp1 = wmsLayer('ecoreservas', 'Preservación_priorizando_todos_los_enfoques_Compensación.', 'Todos los enfoques de costos-Inversión en compensación.', false, '4eca511b-d4db-49bc-8efa-a1f20e7c45ac');
    var p_best_vol = wmsLayer('ecoreservas', 'Preservación_priorizando_todos_los_enfoques_Inversión_Voluntaria', 'Todos los enfoques de costos-Inversiones voluntarias', false, '4eca511b-d4db-49bc-8efa-a1f20e7c45ac');
    var p_renta_comp = wmsLayer('ecoreservas', 'Preservación_priorizando_Costos_de_Oportunidad_Compensación', 'Costos de oportunidad-Inversión en compensación', false, '4eca511b-d4db-49bc-8efa-a1f20e7c45ac');
    var p_renta_vol = wmsLayer('ecoreservas', 'Preservación_riorizando_Costos_de_Oportunidad_Inversión_Voluntaria', 'Costos de oportunidad-Inversiones voluntarias', false, '4eca511b-d4db-49bc-8efa-a1f20e7c45ac');
    var p_res_comp = wmsLayer('ecoreservas', 'Preservación_priorizando_Costos_Abióticos_Compensación', 'Costos ecológicos-Inversión en compensación', false, '4eca511b-d4db-49bc-8efa-a1f20e7c45ac');
    var p_res_vol = wmsLayer('ecoreservas', 'Preservación_priorizando_Costos_Abióticos_Inversión_Voluntaria', 'Costos ecológicos-Inversiones voluntarias', false, '4eca511b-d4db-49bc-8efa-a1f20e7c45ac');
    var r_best_comp = wmsLayer('ecoreservas', 'Restauración_priorizando_todos_los_enfoques_Compensación', 'Todos los enfoques de costos-Inversión en compensación', false, '4eca511b-d4db-49bc-8efa-a1f20e7c45ac');
    var r_best_vol = wmsLayer('ecoreservas', 'Restauración_priorizando_todos_los_enfoques_Inversión_Voluntaria', 'Todos los enfoques de costos-Inversiones voluntarias', false, '4eca511b-d4db-49bc-8efa-a1f20e7c45ac');
    var r_renta_comp = wmsLayer('ecoreservas', 'Restauración_priorizando_Costos_de_Oportunidad_Compensación', 'Costos de oportunidad-Inversión en compensación', false, '4eca511b-d4db-49bc-8efa-a1f20e7c45ac');
    var r_renta_vol = wmsLayer('ecoreservas', 'Restauración_Costos_de_Oportunidad_Inversión_Voluntaria', 'Costos de oportunidad-Inversiones voluntarias', false, '4eca511b-d4db-49bc-8efa-a1f20e7c45ac');
    var r_res_comp = wmsLayer('ecoreservas', 'Restauración_priorizando_Costos_Abióticos_Compensación', 'Costos ecológicos-Inversión en compensación', false, '4eca511b-d4db-49bc-8efa-a1f20e7c45ac');
    var r_res_vol = wmsLayer('ecoreservas', 'Restauración_priorizando_Costos_Abióticos_Inversión_Voluntaria', 'Costos ecológicos-Inversiones voluntarias', false, '4eca511b-d4db-49bc-8efa-a1f20e7c45ac');
    var us_best_comp = wmsLayer('ecoreservas', 'Uso_Sostenible_priorizando_todos_los_enfoques_Compensación', 'Todos los enfoques de costos-Inversión en compensación', false, '4eca511b-d4db-49bc-8efa-a1f20e7c45ac');
    var us_best_vol = wmsLayer('ecoreservas', 'Uso_Sostenible_priorizando_todos_los_enfoques_Inversión_Voluntaria', 'Todos los enfoques de costos-Inversiones voluntarias', false, '4eca511b-d4db-49bc-8efa-a1f20e7c45ac');
    var us_renta_comp = wmsLayer('ecoreservas', 'Uso_Sostenible_priorizando_Costos_de_Oportunidad_Compensación', 'Costos de oportunidad-Inversión en compensación', false, '4eca511b-d4db-49bc-8efa-a1f20e7c45ac');
    var us_renta_vol = wmsLayer('ecoreservas', 'Uso_Sostenible_Costos_de_Oportunidad_Inversión_Voluntaria', 'Costos de oportunidad-Inversiones voluntarias', false, '4eca511b-d4db-49bc-8efa-a1f20e7c45ac');
    var us_res_comp = wmsLayer('ecoreservas', 'Uso_Sostenible_priorizando_Costos_Abióticos_Compensación', 'Costos ecológicos-Inversión en compensación', false, '4eca511b-d4db-49bc-8efa-a1f20e7c45ac');
    var us_res_vol = wmsLayer('ecoreservas', 'Uso_Sostenible_priorizando_Costos_Abióticos_Inversión_Voluntaria', 'Costos ecológicos-Inversiones voluntarias', false, '4eca511b-d4db-49bc-8efa-a1f20e7c45ac');

    var p_best_unopor_s = wmsLayer('ecoreservas', 'Preservación_priorizando_todos_los_enfoques_Inversión_no_menos_1_', 'Todos los enfoques de costos-Inversión no menos 1_', true, 'ddbae3f2-0a76-414f-bf76-8c0d681cd6c1');
    var p_best_vol_s = wmsLayer('ecoreservas', 'Preservación_priorizando_todos_los_enfoques_Inversión_Voluntaria_', 'Todos los enfoques de costos-Inversiones voluntarias_', false, 'ddbae3f2-0a76-414f-bf76-8c0d681cd6c1');
    var p_renta_unopor_s = wmsLayer('ecoreservas', 'Preservación_priorizando_Costos_de_Oportunidad_Inversión_no_menos_1_', 'Costos de oportunidad-Inversión no menos 1_', false, 'ddbae3f2-0a76-414f-bf76-8c0d681cd6c1');
    var p_renta_vol_s = wmsLayer('ecoreservas', 'Preservación_riorizando_Costos_de_Oportunidad_Inversión_Voluntaria_', 'Costos de oportunidad-Inversión Voluntaria_', false, 'ddbae3f2-0a76-414f-bf76-8c0d681cd6c1');
    var p_rest_unopor_s = wmsLayer('ecoreservas', 'Preservación_priorizando_Costos_Abióticos_Inversión_no_menos_1_', 'Costos ecológicos-Inversión no menos 1_', false, 'ddbae3f2-0a76-414f-bf76-8c0d681cd6c1');
    var p_rest_vol_s = wmsLayer('ecoreservas', 'Preservación_priorizando_Costos_Abióticos_Inversión_Voluntaria_', 'Costos ecológicos-Inversiones voluntarias_', false, 'ddbae3f2-0a76-414f-bf76-8c0d681cd6c1');
    var r_best_unpor_s = wmsLayer('ecoreservas', 'Restauración_priorizando_todos_los_enfoques_Inversión_no_menos_1_', 'Todos los enfoques de costos-Inversión no menos 1_', false, 'ddbae3f2-0a76-414f-bf76-8c0d681cd6c1');
    var r_best_vol_s = wmsLayer('ecoreservas', 'Restauración_priorizando_todos_los_enfoques_Inversión_Voluntaria_', 'Todos los enfoques de costos-Inversiones voluntarias_', false, 'ddbae3f2-0a76-414f-bf76-8c0d681cd6c1');
    var r_renta_unopor_s = wmsLayer('ecoreservas', 'Restauración_Costos_de_Oportunidad_Inversión_no_menos_1_', 'Costos de oportunidad-Inversión no menos 1_', false, 'ddbae3f2-0a76-414f-bf76-8c0d681cd6c1');
    var r_renta_vol_s = wmsLayer('ecoreservas', 'Restauración_Costos_de_Oportunidad_Inversión_Voluntaria_', 'Costos de oportunidad-Inversiones voluntarias_', false, 'ddbae3f2-0a76-414f-bf76-8c0d681cd6c1');
    var r_rest_unopor_s = wmsLayer('ecoreservas', 'Restauración_priorizando_Costos_Abióticos_Inversión_no_menos_1_', 'Costos ecológicos-Inversión no menos 1_', false, 'ddbae3f2-0a76-414f-bf76-8c0d681cd6c1');
    var r_rest_vol_s = wmsLayer('ecoreservas', 'Restauración_priorizando_Costos_Abióticos_Inversión_Voluntaria_', 'Costos ecológicos-Inversiones voluntarias_', false, 'ddbae3f2-0a76-414f-bf76-8c0d681cd6c1');
    var us_best_unopor_s = wmsLayer('ecoreservas', 'Uso_Sostenible_priorizando_todos_los_enfoques_Inversión_no_menos_1_', 'Todos los enfoques de costos-Inversión no menos 1_', false, 'ddbae3f2-0a76-414f-bf76-8c0d681cd6c1');
    var us_best_vol_s = wmsLayer('ecoreservas', 'Uso_Sostenible_priorizando_todos_los_enfoques_Inversión_Voluntaria_', 'Todos los enfoques de costos-Inversiones voluntarias_', false, 'ddbae3f2-0a76-414f-bf76-8c0d681cd6c1');
    var us_renta_unopor_s = wmsLayer('ecoreservas', 'Uso_Sostenible_priorizando_Costos_de_Oportunidad_Inversión_no_menos_1_', 'Costos de oportunidad-Inversión no menos 1_', false, 'ddbae3f2-0a76-414f-bf76-8c0d681cd6c1');
    var us_renta_vol_s = wmsLayer('ecoreservas', 'Uso_Sostenible_Costos_de_Oportunidad_Inversión_Voluntaria_', 'Costos de oportunidad-Inversiones voluntarias_', false, 'ddbae3f2-0a76-414f-bf76-8c0d681cd6c1');
    var us_rest_unopor_s = wmsLayer('ecoreservas', 'Uso_Sostenible_priorizando_Costos_Abióticos_Inversión_no_menos_1_', 'Costos ecológicos-Inversión no menos 1_', false, 'ddbae3f2-0a76-414f-bf76-8c0d681cd6c1');
    var us_rest_vol_s = wmsLayer('ecoreservas', 'Uso_Sostenible_priorizando_Costos_Abióticos_Inversión_Voluntaria_', 'Costos ecológicos-Inversiones voluntarias_', false, 'ddbae3f2-0a76-414f-bf76-8c0d681cd6c1');
}
//Grupos de capas
export var layer_base = new GroupLayer({
    fold: 'close',
    title: 'Capas Base',
    layers: [CartoDB_Positron, streetmap, Esri_WorldPhysical, Esri_WorldImagery, otm, bw, terrain],
    name: 'Capas Base'
});

export var division_base = new GroupLayer({
    fold: 'close',
    title: 'División político-administrativa',
    layers: [deptos, mpios],
    name: 'División político-administrativa'
});
let historicos, fondo_adaptacion, proyecto_oleoducto_bicentenario, conservacion_biodiversidad, gobernanza, restauracion, gefpar, comp_preservacion, comp_restauracion, comp_uso_sostenible, inv1_preservacion, inv1_restauracion, inv1_uso_sostenible, invv_preservacion, invv_restauracion, invv_uso_sostenible, san_antero4, san_antero5, san_antero6, san_antero7, san_antero8, san_antero9

if (proyectos === 'general') {
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
    restauracion = new GroupLayer({
        fold: 'close',
        title: 'Restauración',
        layers: [integridad, red_de_viveros, scen_mincost_target1, scen_mincost_target2, scen_mincost_target3, scen_mincost_target4],
        name: 'Restauración'
    });
    gefpar = new GroupLayer({
        fold: 'close',
        title: 'GEF Páramos',
        layers: [gefparamo, gefmunicipio],
        name: 'GEF Páramos'
    });
} else if (proyectos === 'ecoreservas') {
    comp_preservacion = new GroupLayer({
        fold: 'close',
        title: 'Preservación',
        layers: [p_best_comp, p_renta_comp, p_res_comp],
        name: 'Preservación'
    });
    comp_restauracion = new GroupLayer({
        fold: 'close',
        title: 'Restauración',
        layers: [r_best_comp, r_renta_comp, r_res_comp],
        name: 'Restauración'
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
        title: 'Restauración',
        layers: [r_best_comp, r_renta_comp, r_res_comp],
        name: 'Restauración'
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
        title: 'Restauración',
        layers: [r_best_vol, r_renta_vol, r_res_vol],
        name: 'Restauración'
    });
    invv_uso_sostenible = new GroupLayer({
        fold: 'close',
        title: 'Uso Sostenible',
        layers: [us_best_vol, us_renta_vol, us_res_vol],
        name: 'Uso Sostenible'
    });

    //san antero
    san_antero4 = new GroupLayer({
        fold: 'close',
        title: 'Preservación',
        layers: [p_best_unopor_s, p_renta_unopor_s, p_rest_unopor_s],
        name: 'Preservación'
    });
    san_antero5 = new GroupLayer({
        fold: 'close',
        title: 'Restauración',
        layers: [r_best_unpor_s, r_renta_unopor_s, r_rest_unopor_s],
        name: 'Restauración'
    });
    san_antero6 = new GroupLayer({
        fold: 'close',
        title: 'Uso Sostenible',
        layers: [us_best_unopor_s, us_renta_unopor_s, us_rest_unopor_s],
        name: 'Uso Sostenible'
    });
    san_antero7 = new GroupLayer({
        fold: 'close',
        title: 'Preservación',
        layers: [p_best_vol_s, p_renta_vol_s, p_rest_vol_s],
        name: 'Preservación'
    });
    san_antero8 = new GroupLayer({
        fold: 'close',
        title: 'Restauración',
        layers: [r_best_vol_s, r_renta_vol_s, r_rest_vol_s],
        name: 'Restauración'
    });
    san_antero9 = new GroupLayer({
        fold: 'close',
        title: 'Uso Sostenible',
        layers: [us_best_vol_s, us_renta_vol_s, us_rest_vol_s],
        name: 'Uso Sostenible'
    });

};

export { historicos, fondo_adaptacion, proyecto_oleoducto_bicentenario, conservacion_biodiversidad, gobernanza, restauracion, gefpar, comp_preservacion, comp_restauracion, comp_uso_sostenible, inv1_preservacion, inv1_restauracion, inv1_uso_sostenible, invv_preservacion, invv_restauracion, invv_uso_sostenible, san_antero4, san_antero5, san_antero6, san_antero7, san_antero8, san_antero9 };

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
