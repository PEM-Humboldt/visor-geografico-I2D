import logoi2d from '../../../../../../assets/img/logo-humboldt-v2.png'
import footeri2d from '../../../../../../assets/img/footer.png'

import pdfMake from "pdfmake/build/pdfmake.min";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

import {todayDate} from '../../../../../globalVars'

import {chartReg,chartDangerSp} from '../../chart'

import {textGbif,textDanger,textReferences,dangerString} from './config/pdf-text'
import { title_mupio } from "../../../../../globalVars";
import {nomdownload} from "./export-modal"

// /** Function that exports PDF*/

export function savePDF() {
    Promise.all([
        chartReg.exporting.pdfmake,
        chartReg.exporting.getJSON("json"),
        chartDangerSp.exporting.getJSON("json")
        // chartSp.exporting.getImage("png"),
    ]).then(function(res) { 
        var pdfMake = res[0];   

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
                textGbif(res[1]),
                textDanger(res[2]),
                textReferences()
                
            ],
            footer: function(currentPage, pageCount) { 
                return [
                    {
                        image: 'footerpdf',
                        width: 410,
                        height: 80,
                        alignment: 'center',
                        opacity:0.5,
                        margin: [0, 0, 0, 0]
                    }
                  ]
            },
            header: function(currentPage, pageCount, pageSize) {
                return [
                    { 
                        image: 'i2d',
                        width: 100,
                        height: 100,
                        alignment: 'right',
                        opacity:0.5,
                        margin: [0, 0, 35, 0]
                    }
                ]
            },
            // TODO: change the static url if change the domain
            images: {
                i2d: 'http://i2d.humboldt.org.co/visor-I2D/'+logoi2d,
                // in browser is supported loading images via url (https or http protocol) (minimal version: 0.1.67)
                footerpdf: 'http://i2d.humboldt.org.co/visor-I2D/'+footeri2d,

                // i2d: 'http://localhost:1234/'+logoi2d,
                // // in browser is supported loading images via url (https or http protocol) (minimal version: 0.1.67)
                // footerpdf: 'http://localhost:1234/'+footeri2d,
            },
            pageBreakBefore: function(currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
                //check if signature part is completely on the last page, add pagebreak if not
                if (currentNode.id === 'dangerData' && dangerString > 0 ) {
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
                    margin: [40, 60, 40, 20]
                },
                parrafo: {
                    fontSize: 11,
                    alignment: 'justify',
                    margin: [40, 0, 40, 0]
                },
                hints: {
                    fontSize: 9,
                    alignment: 'center',
                    margin: [40, 0, 40, 0]
                },
                italic: {
                    fontSize: 9,
                    italics: true,
                    alignment: 'center',
                    margin: [40, 0, 40, 0]
                },
                bold: {
                    fontSize: 11,
                    bold: true,
                    alignment: 'left',
                    margin: [40, 0, 40, 0]
                },
                underline:{
                    decoration: 'underline', 
                    decorationColor: 'blue', 
                    color:'blue'
                },
                underlineBlack:{
                    alignment: 'left',
                    decoration: 'underline', 
                    decorationColor: 'black', 
                    color:'black',
                    margin: [40, 0, 40, 0]
                }
            }
            
        };

      
        pdfMake.createPdf(doc).download(`Reporte de Biodiversidad ${nomdownload}.pdf`);
      
    });
}
  