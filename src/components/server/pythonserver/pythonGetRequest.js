import $ from "jquery";

import {PYTHONSERVER} from '../url'

export const pythonGetRequest=(handleData,param,title)=>{
    $.ajax({
        url: PYTHONSERVER+param,
        type: "GET",
        crossDomain : true,
        success: function (data, status, xhr) {
            // console.log(data);
            handleData(title,data);
        },
        error: function (jqXHR, exception) {
            console.log(jqXHR,exception);
        }
    });
}
