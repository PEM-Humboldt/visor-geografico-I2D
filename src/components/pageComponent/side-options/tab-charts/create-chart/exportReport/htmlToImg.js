import html2canvas from 'html2canvas/dist/html2canvas'

import pdfMake from "pdfmake/build/pdfmake.min";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export var html2canvas=(img)=>{
    html2canvas(document.getElementById(img), {
        onrendered: function (canvas) {
            console.log(canvas)
            // var data = canvas.toDataURL();
            // var docDefinition = {
            //     content: [{
            //         image: data,
            //         width: 500,
            //     }]
            // };
            // pdfMake.createPdf(docDefinition).download("Score_Details.pdf");
        }
    });
}
