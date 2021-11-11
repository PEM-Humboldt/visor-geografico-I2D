import $ from "jquery";

import {PYTHONSERVER} from '../url'
// python request 
// connects with ajax the django backend with the frontend

// get request
export const pythonGetRequest=(handleData,param,error,errorCallback)=>{
    $.ajax({
        url: PYTHONSERVER+param,
        type: "GET",
        crossDomain : true,
        success: function (data, status, xhr) {
            handleData(data);
        },
        error: function (jqXHR, exception) {
            $('.toast').toast('show');
            $('#toastBody').html(error)
            errorCallback&&errorCallback()
        }
    });
}
// post request
export var pythonPostRequest=(param,dataJson,handleData,handleError)=>{
    $.ajax({
        type: "POST",
        url: PYTHONSERVER+param,
        data: dataJson,
        success: function (res) {
          handleData(res)
        },
        error: function(err){
            handleError(err)
        }
    });
}