import $ from "jquery";

import {date_format} from '../../../globalVars'

export const gbifData =(data)=>{
    $('.gbifInfo').each(function(i, obj) {
        let date_gbif
        try{
            // date format
            date_gbif=date_format(data[0].download_date);
            obj.innerText = 'Información descargada de GBIF el '+date_gbif;
        }catch{
            date_gbif='Fecha no disponible'
            obj.innerText = date_gbif;
        }
    });
}