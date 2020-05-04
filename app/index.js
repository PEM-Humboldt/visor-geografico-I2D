$(document).ready(function () {
    //
    //Importar scripts adicionales
    //
    importarScript("app/layers.js");
    importarScript("app/jsSearch.js");
    importarScript("app/mapclick.js");
    importarScript("app/animation.js");
    importarScript("app/FeaturesSelect.js");
    //
    //Agragar elementos principales DOM
    //
    //Evento seleccion de departamento y municipio (aun sin implementar)
    /*
    $(".dropdown-menu").on("click", "a", function (event) {
        if (document.getElementById('BuListDepto').innerHTML === 'Seleccione Departamento' || document.getElementById('BuListMpio').innerHTML !== 'Seleccione Municipio') {
            var viewParamsStr = viewparamsToStr({
                query: event.target.text
            });
            var tempname = "Visor:SelGeomDepto";
        } else {
            var viewParamsStr = viewparamsToStr({
                query: event.target.text,
                query1: document.getElementById('BuListDepto').innerHTML
            });
            var tempname = "Visor:SelGeomMpio";
        }
        var url = 'http://34.231.25.67:8080/geoserver/ows?';
        var wfsParams = {
            service: 'WFS',
            version: '2.0.0',
            request: 'GetFeature',
            typeName: tempname,
            outputFormat: 'application/json',
            srsname: 'EPSG:3857',
            viewparams: viewParamsStr
        };
        $.ajax({
            url: url,
            data: wfsParams,
            type: "GET",
            dataType: "json",
            success: function (data) {
                FeatSelect(data, 'NewSelection','ZoomSelect');
            }
        });
        if (tempname === 'Visor:SelGeomDepto') {
            document.getElementById('BuListDepto').innerHTML = event.target.text;
            var filtro = '"nombre_dpt=' + "'" + event.target.text + "'" + '"';
            Mpios.getSource().updateParams({'STYLES': 'Mpio', 'CQL_FILTER': eval(filtro)});
            Mpios.setVisible(true);
            document.getElementById('BuListMpio').innerHTML = 'Seleccione Municipio';
            document.getElementById('BuListMpio').disabled = false;
        } else {
            ECP.setVisible(true);
            document.getElementById('layertree').getElementsByTagName("li")[1].getElementsByTagName("input")[0].checked = true;
            document.getElementById('BuListMpio').innerHTML = event.target.text;
            document.getElementById('BuListMpio').disabled = true;
        }
    });
    */
});
//Agrega nuevos archivos al visor geografico
function importarScript(nombre, callback) {
    var s = document.createElement("script");
    s.onload = callback;
    s.src = nombre;
    document.querySelector("head").appendChild(s);
}
//visible el control de capas
function ControlLayer() {
    document.getElementById('accordion').className = 'd-block';
}
//oculta el control de capas
function ControlLayerClose() {
    document.getElementById('accordion').className = 'd-none';
}