import $ from "jquery";

import {PYTHONSERVER} from '../url'

export const pythonGetRequest=(handleData,param,title,divHtml)=>{
    $.ajax({
        url: PYTHONSERVER+param,
        type: "GET",
        crossDomain : true,
        success: function (data, status, xhr) {
            handleData(data,title,divHtml);
        },
        error: function (jqXHR, exception) {
            console.log(jqXHR,exception);
        }
    });
}
