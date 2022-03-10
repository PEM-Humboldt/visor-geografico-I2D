import $ from "jquery";

import {date_format,set_doi_gbif_data} from '../../../globalVars'

// change the main gbif text: the doi and the date
export const gbifData =(data)=>{
    $('.gbifInfo').each(function(i, obj) {
        let date_gbif,doi_gbif_data;
        try{
            // doi
            doi_gbif_data=set_doi_gbif_data(data[0].doi);
            // date format
            date_gbif=date_format(data[0].download_date);
            obj.innerText = 'Información descargada de GBIF el '+date_gbif;
        }catch(err){
            date_gbif='Fecha no disponible';
            obj.innerText = date_gbif;
        }
    });
};