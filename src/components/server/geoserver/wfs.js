import $ from "jquery";
import {GEOSERVER_URL} from '../url'
//Funcion de consulta
// retorna el wfs en geojson
export var wfsLayer =(param, request, request1, request2, request3) =>{
    var temp = null
    try{
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
        // // generate a GetFeature request
        var wfsParams = {
            service: 'WFS',
            version: '2.0.0',
            request: 'GetFeature',
            typeName: param,
            crossOrigin: true,
            outputFormat: 'application/json',
            srsname: 'EPSG:3857',
            viewparams: viewParamsStr
        };

        temp= $.ajax({
            url: GEOSERVER_URL+'wfs',
            data: wfsParams,
            type: "GET",
            crossDomain : true,
            dataType: "json",
            async: false,
            success: function (data, status, xhr) {
                // console.log(data);
            },
            error: function (jqXHR, exception) {
                //console.log(jqXHR);
                console.log(jqXHR,exception);
                //console.log(msg);
            }
        });
    }catch{
        alert('No cargó la información requerida')
    }


    return temp;
}

// retorna el wfs en array
export var wfsSearchArray=(param, request, request1, request2)=>{
    var temp=null;
    try {
        temp= wfsLayer(param, request, request1, request2);
        var arr = [];
        for (var i = 0; i < temp.responseJSON.features.length; i++) {
            arr[i] = [];
            for (var j = 0; j < Object.keys(temp.responseJSON.features[i].properties).length; j++) {
                var a = Object.keys(temp.responseJSON.features[i].properties)[j];
                arr[i][j] = temp.responseJSON.features[i].properties[a];
            }
        }
    } catch (error) {
        console.log(error)
    }
    // console.log('wfsSearchArray',arr);
    return arr;
}

//formatear texto para ser entendido por geoserver
var viewparamsToStr=(obj) =>{
    var str = '';
    $.each(obj, function (k, v) {
        str.length && (str += ';');
        str += k + ':' + v;
    });
    return str;
}