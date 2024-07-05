import {date_gbif_data,doi_gbif_data,title_mupio,title_depto} from '../../../../../../globalVars'
import {milesFormat} from '../../../../../../formatText'

import{table} from './table-export'

import $ from "jquery";

// texts on pdf document

// gbifText
export var textGbif =(res)=>{
    // depends on the dropdown selection, it changes the text on the document
    let selectedStadistics =$('#stadisticstype').children("option:selected").val(), infoInteres=''

    if(selectedStadistics=='mpio_politico'){
        infoInteres='municipio de '+title_mupio+', '+title_depto
    }else{
        infoInteres='departamento de '+title_depto
    }

    // first table on document 
    let str = res.split("data:application/json;charset=utf-8,")[1]      
    str= JSON.parse(decodeURIComponent(str))
    let title= {tipo: "Grupo biológico", registers: 'Número de registros', species:'Número de especies', exoticas: 'Especies exóticas', endemicas: 'Especies endémicas'}
    
    // decimal points format and get the total data categories
    let totalRegisters = milesFormat(str.reduce((sum, value) => ( sum + value.registers ), 0));
    let totalEndemicas = milesFormat(str.reduce((sum, value) => ( sum + value.endemicas ), 0));
    let totalExoticas = milesFormat(str.reduce((sum, value) => ( sum + value.exoticas ), 0));

    let totalPlants=0,totalAnimals=0,totalSpecies=0;
    let milesstr;
    str.map((e)=>{
        // format table data
        !milesstr ?  milesstr=[{tipo: milesFormat(e.tipo), registers: milesFormat(e.registers), species:milesFormat(e.species), exoticas: milesFormat(e.exoticas), endemicas: milesFormat(e.endemicas)}]: milesstr=milesstr.concat([{tipo: milesFormat(e.tipo), registers: milesFormat(e.registers), species:milesFormat(e.species), exoticas: milesFormat(e.exoticas), endemicas: milesFormat(e.endemicas)}])
        // get totals
        totalSpecies+=e.species
        if(e.tipo=='PLANTAS'){ totalPlants=e.species }
        else{ totalAnimals+=e.species }
    })
    totalSpecies=milesFormat(totalSpecies)
    totalAnimals=milesFormat(totalAnimals)
    totalPlants=milesFormat(totalPlants)

    var totalData = {tipo: "TOTAL", registers: totalRegisters, species: totalSpecies, exoticas: totalExoticas, endemicas: totalEndemicas};
    milesstr.push(totalData);

    // final json constructor
    let json={}
    json={
        stack: [
            {
                text: [
                    {text: 'Asunto: ', bold: true},
                    {text: 'Información acerca de las especies presentes en el '+infoInteres+'.\n \n'},
                ],
                style: 'parrafo'
            },
            {
                text: [
                    'A partir de la capa geoespacial correspondiente al '+infoInteres+', se extrajeron los registros de especies biológicas que han reportado para la zona de interés. La base de datos utilizada para extraer los registros es la publicada por la Infraestructura Mundial de Información en Biodiversidad (GBIF), dicha base de datos es la fuente disponible más completa en este momento y contiene todos los registros publicados por el Instituto Humboldt, los publicados por otras instituciones colombianas e integrados en el Sistema de Información sobre Biodiversidad de Colombia (SiB Colombia, https:// www.sibcolombia.net/ ) y todos aquellos registros de especies en el territorio Colombiano publicados por instituciones y organizaciones desde el exterior. Desde el Instituto Humboldt garantizamos la calidad de nuestra información, no obstante, la información de otras instituciones debe ser evaluada con precaución. Cabe aclarar que los registros publicados en GBIF son solamente una aproximación a la riqueza y abundancia de especies que se presentan en el territorio nacional. \n \n', 
                    'En total se reportaron ', totalRegisters,' registros de especies que representan ',
                    totalAnimals , ' especies de animales y ',
                    totalPlants , ' de plantas (Tabla 1, Anexo 1) en la zona de interés, de estas cifras se puede resaltar la presencia de ',
                    {text: totalEndemicas +' especies endémicas y '+totalExoticas +' especies exóticas. \n\n'}
                ],
                style: 'parrafo'
            },
            {
                text: 'Tabla 1. Registros de especies en la zona de interés.\n\n',
                style: 'italic'
            },
            table(milesstr, Object.keys(title),title),
        ],
        id: 'gbifData'
    }
    
    return json
}

// danger species text
export var dangerString=0
export var textDanger =(res)=>{
    // second table on document 
    let strDangerSp = res.split("data:application/json;charset=utf-8,")[1]      
    strDangerSp= JSON.parse(decodeURIComponent(strDangerSp))
    dangerString=strDangerSp.length

    let json={}
    // if have danger species 
    if(dangerString>0){
        let titleDangerSp= {tipo: "Categoria*", amenazadas: 'Resolución MADS \n No.1912 de 2017'}
        // add total to table
        let totalDanger=0
        strDangerSp.filter((e)=>{totalDanger+=e.amenazadas})
        totalDanger=milesFormat(totalDanger)
        strDangerSp.push({tipo: "TOTAL", amenazadas: totalDanger});

        // final json constructor
        json={
            stack: [
                {
                    text: [
                        'Adicionalmente, a partir de los registros obtenidos para la zona, se identificaron las especies que se encuentran en alguna categoría de amenaza según la Resolución MinAmbiente No. 1912 de 2017 y se resumen en la tabla 2. \n \n',
                    ],
                    style: 'parrafo',
                    margin: [40, 60, 40, 0]
                },
                {
                    text: ['Tabla 2. Categorías de amenaza Resolución MinAmbiente No. 1912 de 2017 obtenidos a partir de todos los registros para la zona de interés.\n \n'],
                    style: 'italic'
                },
                table(strDangerSp, Object.keys(titleDangerSp),titleDangerSp),
                {
                    text: ['* En peligro crítico de extinción (CR), En peligro de extinción (EN), Vulnerable (VU).\n'],
                    style: 'hints'
                }
            ],
            id: 'dangerData'
        }
    }

    return json
}


// references document text
export var textReferences =()=>{

    // depends on the dropdown selection, it changes the reference text on the document
    var selectedStadistics =$('#stadisticstype').children("option:selected").val(), infoRef=''
    if(selectedStadistics=='mpio_politico'){
        infoRef='DANE. «MGN2023_MPIO_POLITICO» [Shapefile]. 1:25.000. «Marco Geoestadístico Nacional Vigencia 2023. Nivel Geográfico Municipio». Vigencia 2023.\n https://geoportal.dane.gov.co/descargas/mgn_2023/MGN2023_ManualDeUso.pdf. (2023).'
    }else{
        infoRef='DANE. «MGN2023_DPTO_POLITICO» [Shapefile]. 1:25.000. «Marco Geoestadístico Nacional Vigencia 2023. Nivel Geográfico Departamento. Vigencia 2023.\n https://geoportal.dane.gov.co/descargas/mgn_2023/MGN2023_ManualDeUso.pdf. (2023).'
    }

    // final json constructor
    let json={}
    json={
        stack: [
            {
                text: ['REFERENCIAS.\n \n'],
                margin: [40, 40, 40, 0],
                style: 'bold'
            },
            {
                text: ['Información y datos espaciales. \n'],
                style: 'underlineBlack'
            },
            {
                text: [infoRef+' \n \n'],
                style: 'parrafo'
            },
            {
                text: ['Información y datos sobre especies y especímenes.\n'],
                style: 'underlineBlack'
            },
            {
                text: ['GBIF.org ('+date_gbif_data+') GBIF Occurrence Download '+doi_gbif_data+' \n \n'],
                style: 'parrafo'
            },
            {
                text: ['Instituto de Investigación de Recursos Biológicos Alexander von Humboldt (2019). Lista de especies endémicas, amenazadas y exóticas de Colombia recopilada a partir de literatura. 36.385 registros. http://i2d.humboldt.org.co/ceiba/resource.do?r=sp_colombia_i2d'],
                style: 'parrafo'
            }            
        ],
        id: 'referencesData'
    }
    
    return json
}