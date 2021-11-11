import $ from "jquery";
import {GEOSERVER_URL} from '../url'
// connects with ajax the geoserver with the frontend

// get request
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
// download request
export const downloadData=(params)=>{
    window.open(GEOSERVER_URL+params,'_blank')
}