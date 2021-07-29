import {PYTHONSERVER} from '../../../../../server/url'

import logoi2d from '../../../../../../assets/img/logo-humboldt.png'
import footeri2d from '../../../../../../assets/img/footer.png'
import $ from "jquery";

import pdfMake from "pdfmake/build/pdfmake.min";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import {todayDate,date_gbif_data,title_mupio,title_depto} from '../../../../../globalVars'

import {chartReg,chartDangerSp} from '../../chart'
import{table} from './table-export'

// console.log(logoi2d)


// var getBase64ImageFromURL=(url)=> { 
//     console.log(url)
//       var img = new Image();
//       img.setAttribute("crossOrigin", "anonymous");
//       img.onload = () => {
//         var canvas = document.createElement("canvas");
//         canvas.width = img.width;
//         canvas.height = img.height;
//         var ctx = canvas.getContext("2d");
//         ctx.drawImage(img, 0, 0);
//         var dataURL = canvas.toDataURL("image/png");
//         resolve(dataURL);
//       };
//       img.onerror = error => {
//         reject(error);
//       };
//       img.src = url;
//       return img
//   }


$(document).on('submit','form#formSolicitante',function(e){
  e.preventDefault();

  let json={
    "entidad": $('#entitySolicitante').val(),
    "nombre": $('#nameSolicitante').val(),
    "email": $('#mailSolicitante').val(),
    "observacion": $('#objetivoSolicitante').val()
  }
//   savePDF();
  $.ajax({
    type: "POST",
    url: `${PYTHONSERVER}requestcreate/`,
    data: json,
    success: function () {
      alert('Su información fue almacenada')
      $('#userFormModal').remove();
      savePDF();
    },
    error: function(){
      alert('No fue posible almacenar su información')
    }
  });
});


// /** Function that exports PDF*/

export function savePDF() {
    Promise.all([
        chartReg.exporting.pdfmake,
        chartReg.exporting.getJSON("json"),
        chartDangerSp.exporting.getJSON("json")
        // chartSp.exporting.getImage("png"),
    ]).then(function(res) { 
        var pdfMake = res[0];

        // first table
        let str = res[1].split("data:application/json;charset=utf-8,")[1]      
        str= JSON.parse(decodeURIComponent(str))
        let title= {tipo: "Grupo biológico", registers: 'Número de registros', species:'Número de especies', exoticas: 'Especies exóticas', endemicas: 'Especies Endémicas'}

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

        // second table
        let strDangerSp = res[2].split("data:application/json;charset=utf-8,")[1]      
        strDangerSp= JSON.parse(decodeURIComponent(strDangerSp))

        // if have danger info
        let textDanger =()=>{
            let json={}
            if(strDangerSp.length>0){
                let titleDangerSp= {tipo: "Categoria*", amenazadas: 'Resolución MADS \n No.1912 de 2017'}
                // add total to table
                let totalDanger=0
                strDangerSp.filter((e)=>{totalDanger+=e.amenazadas})
                strDangerSp.push({tipo: "TOTAL", amenazadas: totalDanger});

                json={
                    stack: [
                        {
                            text: [
                                'A partir de los registros obtenidos se logró obtener las especies que se encuentra en alguna categoría de amenaza de la UICN (Tabla 2) y se obtuvo los siguientes resultados:\n \n',
                            ],
                            style: 'parrafo',
                            margin: [50, 60, 50, 20]
                        },
                        {
                            text: ['Tabla 2. Categorías de amenaza UICN obtenidos a partir de todos los registros para la zona de interés.\n \n'],
                            style: 'italic'
                        },
                        table(strDangerSp, Object.keys(titleDangerSp),titleDangerSp),
                        {
                            text: ['* En peligro crítico de extinción (CR), En peligro de extinción (EN), Vulnerable (VU) y Casi amenazado (NT).\n'],
                            style: 'parrafo'
                        }
                    ],
                    id: 'dangerData'
                }
            }

            return json
        }

        // Create document template
        var doc = {
            pageSize: "A4",
            pageMargins: [50, 60, 50, 130],
            pageOrientation: "portrait",
            verticalRatio: 0.4,
            content: [
                {
                    text: ['Bogotá, D.C. ',todayDate],
                    style: 'ubicacion'
                },
                {
                    text: [
                        {text: 'Asunto: ', bold: true},
                        'Información acerca de las especies presentes en el municipio de '+title_mupio+', '+title_depto+'\n \n',
                        'A partir de la capa geoespacial correspondiente al municipio de '+title_mupio+', '+title_depto+', se extrajo los registros de presencia de especies biológicas que ha reportado el Instituto para la zona. La base de datos utilizada para extraer los registros de presencia es la publicada por la Facilidad Global de Información sobre Biodiversidad (GBIF, ', 
                        {text: 'https://www.gbif.org/',style:'underline'}, 
                        ', base actualizada ', date_gbif_data,
                        ') dicha base de datos es la fuente disponible más completa en este momento y contiene todos los registros de presencia publicados por el Instituto Humboldt, los publicados por otras instituciones colombianas e integrados en el Sistema de Información sobre Biodiversidad de Colombia (SiB Colombia, ', 
                        {text: 'https://www.sibcolombia.net/',style: 'underline'}, 
                        ') y todos aquellos registros de especies en el territorio Colombiano publicados por instituciones y organizaciones desde el exterior. Desde el Instituto Humboldt garantizamos la calidad de nuestra información. No obstante, la información de otras instituciones debe ser evaluada con precaución y cabe aclarar que los registros de presencia de especies publicados en GBIF son solamente una aproximación a la riqueza y abundancia de especies que se presentan en el territorio nacional.\n \n',
                        'En total se reportaron ', totalRegisters,' registros de presencia de especies que representan ',
                        totalAnimals , ' especies de animales y ',
                        totalPlants , ' de plantas (Tabla 1, Anexo 1) en la zona de interés, de estas cifras se puede resaltar la presencia de ',
                        {text: totalEndemicas +' especies endémicas y '+totalExoticas +' especies exóticas. \n\n', italics: true, bold: true}
                        
                    ],
                    style: 'parrafo'
                },
                {
                    text: 'Tabla 1. Registros de presencia de especies en la zona de interés.\n\n',
                    style: 'italic'
                },
                table(str, Object.keys(title),title),
                       
                // {
                //     image: res[1],
                //     width: 200
                // },

                textDanger()
                
            ],
            footer: function(currentPage, pageCount) { 
                return [
                    
                        // text: 'Instituto Alexander Von Humboldt',
                       {
                        image: 'footerpdf',
                        width: 400,
                        height: 80,
                        alignment: 'center',
                        opacity:0.5,
                        margin: [0, 0, 0, 0]
                    }
                  ]
            },
            header: function(currentPage, pageCount, pageSize) {
                // you can apply any logic and return any valid pdfmake element
                return [
                    { 
                        // text: 'Instituto Alexander Von Humboldt',
                        image: 'i2d',
                        width: 100,
                        height: 100,
                        alignment: 'right',
                        opacity:0.5,
                        margin: [0, 0, 35, 0]
                    }
                        
                        // margin: [10, 10, 10, 10] },
                    // { canvas: [ { type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 } ] }
                ]
            },
            // change the static url if change the domain
            images: {
                i2d: 'http://i2d.humboldt.org.co/'+logoi2d,
                // in browser is supported loading images via url (https or http protocol) (minimal version: 0.1.67)
                footerpdf: 'http://i2d.humboldt.org.co/'+footeri2d,
            },
            pageBreakBefore: function(currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
                //check if signature part is completely on the last page, add pagebreak if not
                if (currentNode.id === 'dangerData' && strDangerSp.length > 0 ) {
                  return true;
                }
                return false;
            },
            styles: {
                fontSize: 11,
                alignment: 'justify',
                ubicacion: {
                    fontSize: 11,
                    alignment: 'left',
                    margin: [50, 60, 50, 20]
                },
                parrafo: {
                    fontSize: 11,
                    alignment: 'justify',
                    margin: [50, 0, 50, 0]
                },
                italic: {
                    fontSize: 11,
                    italics: true,
                    alignment: 'justify',
                    margin: [50, 0, 50, 0]
                },
                underline:{
                    decoration: 'underline', 
                    decorationColor: 'blue', 
                    color:'blue'
                }
            }
            
        };

      
        pdfMake.createPdf(doc).download("reporte.pdf");
      
    });
}
  