//Funcion de consulta
function buscar(param, request, request1, request2, request3) {
    var url = 'http://34.231.25.67:8080/geoserver/ows?';
    if (request === undefined && request1 === undefined && request2 === undefined && request3 === undefined) {
        var viewParamsStr = viewparamsToStr({});
    }
    else if (request1 === undefined && request2 === undefined && request3 === undefined) {
        var viewParamsStr = viewparamsToStr({
            query: request
        });
    } else if (request2 === undefined && request3 === undefined) {
        var viewParamsStr = viewparamsToStr({
            query: request,
            query1: request1
        });
    } else if (request3 === undefined ) {
        var viewParamsStr = viewparamsToStr({
            query: request,
            query1: request1,
            query2: request2
        });      
    } else {
        var viewParamsStr = viewparamsToStr({
            query: request,
            query1: request1,
            query2: request2,
            query3: request3
            
        });
    }
    var wfsParams = {
        service: 'WFS',
        version: '2.0.0',
        request: 'GetFeature',
        typeName: param,
        outputFormat: 'application/json',
        srsname: 'EPSG:3857',
        viewparams: viewParamsStr
    };
    var temp = $.ajax({
        url: url,
        data: wfsParams,
        type: "GET",
        dataType: "json",
        async: false,
        success: function (data, status, xhr) {},
        error: function (jqXHR, exception) {
            //console.log(jqXHR);
            console.log(exception);
            //console.log(msg);
        }
    });
    var arr = [];
    for (i = 0; i < temp.responseJSON.features.length; i++) {
        arr[i] = [];
        for (j = 0; j < Object.keys(temp.responseJSON.features[i].properties).length; j++) {
            var a = Object.keys(temp.responseJSON.features[i].properties)[j];
            arr[i][j] = temp.responseJSON.features[i].properties[a];
        }
    }
    return arr;
}
//formatear texto para ser entendido por geoserver
function viewparamsToStr(obj) {
    var str = '';
    $.each(obj, function (k, v) {
        str.length && (str += ';');
        str += k + ':' + v;
    });
    return str;
}
