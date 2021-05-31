import { first } from "@amcharts/amcharts4/.internal/core/utils/Array";
import $ from "jquery";

export const gbifData =(data)=>{
    $('.gbifInfo').each(function(i, obj) {
        try{
            obj.innerText = 'Información descargada de GBIF el '+data[0].download_date;
        }catch{
            obj.innerText = 'Fecha no disponible';
        }
    });
}