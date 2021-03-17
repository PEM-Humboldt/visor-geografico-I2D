import $ from "jquery";

import {PYTHONSERVER} from '../url'

export const pythonGetRequest=(handleData,feature)=>{
    var selection=feature.values_;
    let param=selection.mpio_ccnct;
    let title =selection.mpio_cnmbr
    $.ajax({
        url: PYTHONSERVER+param,
        type: "GET",
        crossDomain : true,
        success: function (data, status, xhr) {
            // console.log(data);
            handleData(feature,title,data);
        },
        error: function (jqXHR, exception) {
            console.log(jqXHR,exception);
        }
    });
}
