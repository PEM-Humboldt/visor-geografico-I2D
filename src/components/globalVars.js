import {formatDate,capitalizeFirstLetter} from './formatText'

export var date_gbif_data;
export var doi_gbif_data;

export var title_mupio;
export var cod_mupio;
export var cod_dpto;

export var title_depto;

// fecha formateada
export var date_format=(date)=>{
    let parts =date.split('-');
    let date_gbif = new Date(parts[0], parts[1] - 1, parts[2]); 
    date_gbif_data=formatDate(date_gbif)
    return date_gbif_data
}
// doi var
export var set_doi_gbif_data=(name)=> {
    doi_gbif_data=name
    return doi_gbif_data
}

// fecha en la que se genera el informe
export var todayDate = formatDate(new Date());

// nombre del municipio seleccionado
export var set_title_mupio=(name)=> title_mupio=capitalizeFirstLetter(name)
export var set_cod_mupio=(cod)=> cod_mupio=cod
export var set_cod_dpto=(cod)=> cod_dpto=cod

export var set_title_dpto=(name)=> title_depto=capitalizeFirstLetter(name)