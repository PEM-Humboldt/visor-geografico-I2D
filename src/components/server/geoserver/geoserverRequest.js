import $ from "jquery";
import {getGeoserverUrl} from '../url'
// connects with ajax the geoserver with the frontend

// get request
export var geoserverGet=(params,handleData,handleError)=>{
    $.ajax({
        type: "GET",
        url: `${getGeoserverUrl()}${params}`,
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
    window.open(getGeoserverUrl()+params,'_blank')
}