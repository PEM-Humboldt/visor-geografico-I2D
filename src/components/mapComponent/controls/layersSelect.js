import $ from "jquery";

import { FeatSelect } from '../../pageComponent/side-options/tab-layers/layersSelected'
import { AllLayerss as TreeLayersArray } from './tree-layers'
import { getAllLayerss as getHierarchicalLayers } from './hierarchical-tree-layers'
import { wmsGetProps } from '../../server/geoserver/wmsGetProps';
import { openSideOptions } from '../../pageComponent/side-options/side-options'

// chart tab
import { hightlightRemove, highlightStadisticsAdd, highlightStadisticsRemove, proyecto } from '../layers'

import { pythonGetRequest } from '../../server/pythonserver/pythonRequest'
import { chartData, chartDangerData } from "../../pageComponent/side-options/tab-charts/chart"
import { gbifData } from "../../pageComponent/side-options/tab-charts/gbif-info"

import { set_title_mupio, set_title_dpto, set_cod_mupio, set_cod_dpto } from '../../globalVars';

// =========================================================================
let existingSidebar, dptoFeature, mpioFeature

// Get the correct AllLayerss array based on project
const getAllLayers = () => {
    // Always use hierarchical layers since buildHierarchicalLayerTree is used for all projects
    const hierarchicalLayers = getHierarchicalLayers();
    console.log('🟡 getAllLayers called - proyecto:', proyecto);
    console.log('🟡 hierarchicalLayers.length:', hierarchicalLayers.length);
    console.log('🟡 TreeLayersArray.length:', TreeLayersArray.length);
    
    // Use hierarchical layers if available, otherwise fall back to tree layers
    return hierarchicalLayers.length > 0 ? hierarchicalLayers : TreeLayersArray;
};

// get wms layers if turn on
export var layerSelection = (coordinate) => {
    const AllLayerss = getAllLayers();
    console.log('🔴 layerSelection CALLED - coordinate:', coordinate);
    console.log('🔴 proyecto:', proyecto);
    console.log('🔴 AllLayerss:', AllLayerss);
    console.log('🔴 AllLayerss.length:', AllLayerss.length);

    // select the wms layers
    $('#contenedorg').html('');
    $('#nav-layers').attr("style", "display:none");
    // wms layers
    let varMpio = null;

    for (var i = 1; i < AllLayerss.length; i++) {
        // if turn on
        console.log(`🔴 Loop i=${i}, visible=${AllLayerss[i].values_.visible}`);
        if (i == 1 && AllLayerss[i].values_.visible === true) {
            console.log('🔴 Calling wmsGetProps for mpio (i=1)');
            varMpio = true
            // get mupio features data
            wmsGetProps(AllLayerss, 1, coordinate, Selection);
            wmsGetProps(AllLayerss, 0, coordinate, featDpto);
            function featDpto(features, i) { dptoFeature = features[0]; SelectionLayers(features, i) }

        } else if (i == 1 && !varMpio && AllLayerss[i].values_.visible === false) {
            console.log('🔴 Calling wmsGetProps for dpto    (i=1)');
            // get dpto features data
            wmsGetProps(AllLayerss, 0, coordinate, Selection);

        } else if (AllLayerss[i].values_.visible === true) {
            console.log(`🔴 Calling wmsGetProps for layer i=${i}`);
            // get features data
            wmsGetProps(AllLayerss, i, coordinate, Selection);
        } else if (AllLayerss[i].values_.visible === false) {
            console.log(`🔴 Layer i=${i} is not active`);
            // mupios is not active
            $('#layers-data-tab').tab('show');
            $('#nav-layers').attr("style", "display:block");
            if (i == 1 && i == 0) {
                highlightStadisticsRemove();
                $('#nav-chart').attr("style", "display:none");
            }
        }
    }
}

var Selection = (features, i) => {
    console.log('🟢 Selection CALLED - i:', i, 'features:', features);
    var feature = features[0];
    console.log('🟢 feature:', feature);
    let cod_dpto = ''

    openSideOptions();
    $('#nav-layers').attr("style", "display:block");

    // if layer different to mupio and dpto
    hightlightRemove();
    console.log('🟢 Checking if i == 1 || i == 0:', (i == 1 || i == 0));

    // selection
    // municipios stadistics i=1 // dpto stadistics i=0
    if (i == 1 || i == 0) {
        console.log('🟢 i is 1 or 0, proceeding with selection');
        if (i == 0) {
            dptoFeature = feature
        } else if (i == 1) {
            mpioFeature = feature
        }
        createDropdownStadistics(feature, i)
        cod_dpto = set_cod_dpto(feature.values_.codigo.substring(0, 2))

        // get data from python and create chart
        openData(feature, cod_dpto)
    } else {
        console.log('🟢 NOT calling openData - i is not 0 or 1');
    }

    // layers on click coordinate create group table
    FeatSelect(features, i);
}

var SelectionLayers = (features, i) => {
    // layers on click coordinate create group table
    FeatSelect(features, i);
}

var createDropdownStadistics = (feature, id) => {
    $("#stadisticstype").empty(); //To reset dropdown
    let title_dpto = '';
    // if mupio layer is on
    if (id == 1) {
        title_dpto = set_title_dpto(feature.values_.dpto_nombre)
        let title_mupio = set_title_mupio(feature.values_.nombre)

        $("#stadisticstype").append("<option value='mpio_politico' selected id='titleMpio'> Municipio " + title_mupio + "</option>")
        $("#stadisticstype").append("<option value='dpto_politico' id='titleDpto'>Departamento " + title_dpto + "</option>")

        existingSidebar = $('#titleMpio');
        // if dpto layer is on
    } else if (id == 0) {
        title_dpto = set_title_dpto(feature.values_.nombre)
        $("#stadisticstype").append("<option value='dpto_politico' selected id='titleDpto'>Departamento " + title_dpto + "</option>")

        existingSidebar = $('#titleDpto');
    }
}

var openData = (feature, cod_depto) => {
     console.log('🔵 openData CALLED - feature:', feature, 'cod_depto:', cod_depto);

    // get species data from python
    var selectedStadistics = $('#stadisticstype').children("option:selected").val()
     console.log('🔵 selectedStadistics:', selectedStadistics);

    let cod_mupio = set_cod_mupio(feature.values_.codigo)
     console.log('🔵 cod_mupio:', cod_mupio);

    $("#stadisticstype").on('change', function () {
        selectedStadistics = $(this).children("option:selected").val();
        changeDataChart(selectedStadistics, cod_mupio)
    })

    changeDataChart(selectedStadistics, cod_mupio)

    function changeDataChart(selectedStadistics, cod_mupio) {

        // open chart div on click
        for (let i = 0; i < $('.collapseChart').length; i++) {
            if ($($('.collapseChart')[i]).hasClass('show') == false) {
                $($('.collapseChart')[i]).addClass('show');
                $($('.tabChart')[i]).removeClass('collapsed');
            }
        }

        var errorCallback = () => {
            $('#layers-data-tab').tab('show');
            $('#nav-chart').hide();
            $('#resumeData').hide();

            $('#loading-chart').attr("style", "display:none");
        }

        highlightStadisticsRemove();

        if (selectedStadistics == 'mpio_politico') {
            highlightStadisticsAdd(mpioFeature);

            let urlMpioReq = 'mpio/charts/' + cod_mupio;
            pythonGetRequest(chartData, urlMpioReq, 'No fue posible cargar las estadisticas, intente nuevamente', errorCallback);

            let urlMpioDangReq = 'mpio/dangerCharts/' + cod_mupio;
            pythonGetRequest(chartDangerData, urlMpioDangReq);
        } else if (selectedStadistics == 'dpto_politico') {
            highlightStadisticsAdd(dptoFeature);

            let urlDptoReq = 'dpto/charts/' + cod_depto;
            pythonGetRequest(chartData, urlDptoReq, 'No fue posible cargar las estadisticas, intente nuevamente', errorCallback);

            let urlDptoDangReq = 'dpto/dangerCharts/' + cod_depto;
            pythonGetRequest(chartDangerData, urlDptoDangReq);
        }
    }

    // Show UI elements for ecoreservas project
    if (proyecto === 'ecoreservas') {
        $('#layersData').attr("style", "display:block");
    }

      // Load GBIF data and show charts for all projects (including ecoreservas)
    // Check if municipality/department changed OR if it's the first time loading
    console.log('=== DEBUG openData ===');
    console.log('proyecto:', proyecto);
    console.log('selectedStadistics:', selectedStadistics);
    console.log('existingSidebar:', existingSidebar);
    console.log('existingSidebar[0]:', existingSidebar ? existingSidebar[0] : 'undefined');
    console.log('feature.values_.nombre:', feature.values_.nombre);
    console.log('#nav-chart display:', $('#nav-chart').css('display'));

    // Check if this is the first load or if location changed
    const isFirstLoad = $('#nav-chart').css('display') == 'none';
    const locationChanged = existingSidebar && existingSidebar[0] && (
        (selectedStadistics == 'mpio_politico' && existingSidebar[0].innerText != "Municipio " + feature.values_.nombre) ||
        (selectedStadistics == 'dpto_politico' && existingSidebar[0].innerText != "Departamento " + feature.values_.nombre)
    );

    console.log('isFirstLoad:', isFirstLoad);
    console.log('locationChanged:', locationChanged);

    if (isFirstLoad || locationChanged) {
        console.log('>>> Loading GBIF data and showing charts');
        $('#resume-data-tab').tab('show');
        // obtener fecha de descarga solo una vez
        if ($('.gbifInfo')[0] && $('.gbifInfo')[0].innerText == '') {
            let urlReq = 'gbif/gbifinfo';
            console.log('>>> Making GBIF request:', urlReq);
            pythonGetRequest(gbifData, urlReq, 'No fue posible cargar la información de gbif')
        }
        $('#loading-chart').attr("style", "display:block");

        if ($('#nav-chart').css('display') == 'none') {
            $('#nav-chart').attr("style", "display:block");
        }
    } else {
        console.log('>>> Skipping GBIF load - conditions not met');
    }

}
