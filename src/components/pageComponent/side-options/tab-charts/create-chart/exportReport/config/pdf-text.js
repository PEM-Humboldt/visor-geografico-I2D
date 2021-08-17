import {date_gbif_data,doi_gbif_data,title_mupio,title_depto} from '../../../../../../globalVars'
import{table} from './table-export'

// gbifText
export var textGbif =(res)=>{
    // first table
    let str = res.split("data:application/json;charset=utf-8,")[1]      
    str= JSON.parse(decodeURIComponent(str))
    let title= {tipo: "Grupo biológico", registers: 'Número de registros', species:'Número de especies', exoticas: 'Especies exóticas', endemicas: 'Especies endémicas'}

    let totalRegisters = str.reduce((sum, value) => ( sum + value.registers ), 0);
    let totalEndemicas = str.reduce((sum, value) => ( sum + value.endemicas ), 0);
    let totalExoticas = str.reduce((sum, value) => ( sum + value.exoticas ), 0);

    let totalPlants=0,totalAnimals=0,totalSpecies=0;

    str.filter((e)=>{
        totalSpecies+=e.species
        if(e.tipo=='PLANTAS'){ totalPlants=e.species }
        else{ totalAnimals+=e.species }
    })
    
    var totalData = {tipo: "TOTAL", registers: totalRegisters, species: totalSpecies, exoticas: totalExoticas, endemicas: totalEndemicas};
    str.push(totalData);

    let json={}

    json={
        stack: [
            {
                text: [
                    {text: 'Asunto: ', bold: true},
                    {text: 'Información acerca de las especies presentes en el municipio de '+title_mupio+', '+title_depto+'\n \n \n'},
                ],
                style: 'parrafo'
            },
            {
                text: [
                    'A partir de la capa geoespacial correspondiente al municipio de '+title_mupio+', '+title_depto+', se extrajeron los registros de presencia de especies biológicas que han reportado para la zona de interés. La base de datos utilizada para extraer los registros de presencia es la publicada por la Infraestructura Mundial de Información en Biodiversidad (GBIF), dicha base de datos es la fuente disponible más completa en este momento y contiene todos los registros de presencia publicados por el Instituto Humboldt, los publicados por otras instituciones colombianas e integrados en el Sistema de Información sobre Biodiversidad de Colombia (SiB Colombia, https:// www.sibcolombia.net/ ) y todos aquellos registros de especies en el territorio Colombiano publicados por instituciones y organizaciones desde el exterior. Desde el Instituto Humboldt garantizamos la calidad de nuestra información, no obstante, la información de otras instituciones debe ser evaluada con precaución. Cabe aclarar que los registros de presencia de especies publicados en GBIF son solamente una aproximación a la riqueza y abundancia de especies que se presentan en el territorio nacional. \n \n', 
                    'En total se reportaron ', totalRegisters,' registros de presencia de especies que representan ',
                    totalAnimals , ' especies de animales y ',
                    totalPlants , ' de plantas (Tabla 1, Anexo 1) en la zona de interés, de estas cifras se puede resaltar la presencia de ',
                    {text: totalEndemicas +' especies endémicas y '+totalExoticas +' especies exóticas. \n\n'}
                ],
                style: 'parrafo'
            },
            {
                text: 'Tabla 1. Registros de presencia de especies en la zona de interés.\n\n',
                style: 'italic'
            },
            table(str, Object.keys(title),title),
        ],
        id: 'gbifData'
    }
    
    return json
}

export var dangerString=0
    // if have danger species info
export var textDanger =(res)=>{
    // second table
    let strDangerSp = res.split("data:application/json;charset=utf-8,")[1]      
    strDangerSp= JSON.parse(decodeURIComponent(strDangerSp))
    dangerString=strDangerSp.length
    let json={}
    if(dangerString>0){
        let titleDangerSp= {tipo: "Categoria*", amenazadas: 'Resolución MADS \n No.1912 de 2017'}
        // add total to table
        let totalDanger=0
        strDangerSp.filter((e)=>{totalDanger+=e.amenazadas})
        strDangerSp.push({tipo: "TOTAL", amenazadas: totalDanger});

        json={
            stack: [
                {
                    text: [
                        'Adicionalmente, a partir de los registros obtenidos para la zona, se identificaron las especies que se encuentran en alguna categoría de amenaza según la Resolución MADS No. 1912 de 2017 y se resumen en la tabla 2. \n \n',
                    ],
                    style: 'parrafo',
                    margin: [40, 60, 40, 0]
                },
                {
                    text: ['Tabla 2. Categorías de amenaza Resolución MADS No. 1912 de 2017 obtenidos a partir de todos los registros para la zona de interés.\n \n'],
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


    // references info
export var textReferences =()=>{
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
                text: ['DANE. «MGN2020_MPIO_POLITICO» [Shapefile]. 1:25.000. «Marco Geoestadístico Nacional Vigencia 2020. Nivel Geográfico Municipio». Vigencia 2020.\n https://geoportal.dane.gov.co/geonetwork/srv/eng/catalog.search#/metadata/b54cdcbc-e6d9-47dd-afee-1265687c8c2b. (2021). \n \n'],
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
                text: ['Instituto de Investigación de Recursos Biológicos Alexander von Humboldt (2019). Lista de especies endémicas, amenazadas e invasoras de Colombia recopilada a partir de literatura. 36385 registros. http://i2d.humboldt.org.co/ceiba/resource.do?r=sp_colombia_i2d'],
                style: 'parrafo'
            }            
        ],
        id: 'referencesData'
    }
    
    return json
}