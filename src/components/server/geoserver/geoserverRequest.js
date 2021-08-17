import $ from "jquery";
import {GEOSERVER_URL} from '../url'

export var geoserverGet=(params,handleData,handleError)=>{
    $.ajax({
        type: "GET",
        url: `${GEOSERVER_URL}${params}`,
        success: function (res) {
          handleData(res)
        },
        error: function(err){
            handleError(err)
        }
    });
}

export const downloadData=(params)=>{
    window.open(GEOSERVER_URL+params,'_blank')
}