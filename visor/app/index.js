//Evento cargue de pagina principal lista
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
    //lista departamento
    var dropdown = document.createElement('div');
    dropdown.className = 'dropdown';
    dropdown.id = 'ListMunDepto';
    var button = document.createElement('button');
    button.type = 'button';
    button.id = 'BuListDepto';
    button.className = 'btn btn-secondary btn-sm dropdown-toggle';
    button.setAttribute('data-toggle', 'dropdown');
    button.onclick = AgregarListDepto;
    button.innerHTML = 'Seleccione Departamento';
    dropdown.appendChild(button);

    var dropdownMenu = document.createElement('div');
    dropdownMenu.className = 'dropdown-menu scrollable-menu';
    dropdownMenu.id = 'ListDepto';
    dropdown.appendChild(dropdownMenu);

    var button1 = document.createElement('button');
    button1.type = 'button';
    button1.id = 'BuListMpio';
    button1.className = 'btn btn-secondary btn-sm dropdown-toggle';
    button1.setAttribute('data-toggle', 'dropdown');
    button1.onclick = AgregarListMpio;
    button1.innerHTML = 'Seleccione Municipio';
    dropdown.appendChild(button1);
    document.querySelector('body').appendChild(dropdown);
    //document.getElementById('map').appendChild(dropdown);
    //document.getElementsByTagName("body")[0]

    //Mapa
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
                var vectorSource = new ol.source.Vector({
                    features: (new ol.format.GeoJSON()).readFeatures(data)
                });
                highlight.getSource().clear();
                highlight.getSource().addFeature(vectorSource.getFeatures()[0]);
                var view = map.getView()
                view.fit(vectorSource.getExtent());
            }
        });
        if (tempname === 'Visor:SelGeomDepto') {
            document.getElementById('BuListDepto').innerHTML = event.target.text;
            var filtro = '"nombre_dpt=' + "'" + event.target.text + "'" + '"';
            Mpios.getSource().updateParams({'STYLES': 'Mpio', 'CQL_FILTER': eval(filtro)});
            Mpios.setVisible(true);
            document.getElementById('Municipios').checked = true;
            document.getElementById('BuListMpio').innerHTML = 'Seleccione Municipio';
            document.getElementById('BuListMpio').disabled = false;
        } else {
            //console.log(EstructuraEcologica);
            EstructuraEcologica.setVisible(true);
            document.getElementById('Estructura Ecologica Urbana').checked = true;
            document.getElementById('BuListMpio').innerHTML = event.target.text;
            document.getElementById('BuListMpio').disabled = true;
        }
    });
});
function importarScript(nombre, callback) {
    var s = document.createElement("script");
    s.onload = callback;
    s.src = nombre;
    document.querySelector("head").appendChild(s);
}
function AgregarListDepto() {
    var obj = document.getElementById("ListDepto");
    if (document.getElementById('BuListDepto').innerHTML === 'Seleccione Departamento') {
        var depto = buscar("Visor:SelNomDepto");
        for (i = 0; i < depto.length; i++) {
            var a = document.createElement('a');
            a.className = 'dropdown-item';
            a.setAttribute('value', depto[i][0]);
            a.innerHTML = depto[i][0];
            obj.appendChild(a);
        }
    } else if (document.getElementById('BuListDepto').innerHTML !== 'Seleccione Municipio') {
        var obj1 = document.getElementById("ListDepto");
        var len = obj1.getElementsByTagName('a').length;
        for (i = 0; i < len; i++) {
            obj1.removeChild(obj1.getElementsByTagName('a')[0]);
        }
        var depto = buscar("Visor:SelNomDepto");
        for (i = 0; i < depto.length; i++) {
            var a = document.createElement('a');
            a.className = 'dropdown-item';
            a.setAttribute('value', depto[i][0]);
            a.innerHTML = depto[i][0];
            obj.appendChild(a);
        }
    }
}
function AgregarListMpio() {
    var obj = document.getElementById("ListDepto");
    if (document.getElementById('BuListDepto').innerHTML === 'Seleccione Departamento') {
        alert("Primero seleccione un departamento");
    } else {
        var obj1 = document.getElementById("ListDepto");
        var len = obj1.getElementsByTagName('a').length;
        for (i = 0; i < len; i++) {
            obj1.removeChild(obj1.getElementsByTagName('a')[0]);
        }
        var mpio = buscar("Visor:SelNomMpio", document.getElementById('BuListDepto').innerHTML);
        for (i = 0; i < mpio.length; i++) {
            var a = document.createElement('a');
            a.className = 'dropdown-item';
            a.setAttribute('value', mpio[i][0]);
            a.innerHTML = mpio[i][0];
            obj1.appendChild(a);
        }
    }
}
//dropdown-item
function viewparamsToStr(obj) {
    var str = '';
    $.each(obj, function (k, v) {
        str.length && (str += ';');
        str += k + ':' + v;
    });
    return str;
}
//
function ControlLayer() {
    document.getElementById('accordion').className = 'd-block';
}
function ControlLayerClose(){
    document.getElementById('accordion').className = 'd-none';
}