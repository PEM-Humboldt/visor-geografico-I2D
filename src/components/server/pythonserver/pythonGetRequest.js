import $ from "jquery";

import {PYTHONSERVER} from '../url'

export const pythonGetRequest=(handleData,param)=>{
    $.ajax({
        url: PYTHONSERVER+param,
        type: "GET",
        crossDomain : true,
        success: function (data, status, xhr) {
            handleData(data);
        },
        error: function (jqXHR, exception) {
            $('#layers-data-tab').tab('show');
            $('#nav-chart').hide()
            $('.toast').toast('show');
            $('#toastBody').html('No fue posible cargar las estadisticas, intente nuevamente')
            
            // console.log(jqXHR,exception);
            // alert('Se presentó un error, favor intente nuevamente')
            $('#loading-chart').attr("style", "display:none");
        }
    });
}
