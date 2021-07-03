import $ from "jquery";
import {createModal} from '../../../..//modal/createModal'

var jsonModal=(onSave)=>{
  return{
      "title":"FORMULARIO DE DESCARGA",
      "body":[{
        "id":"formSolicitante",
        "controlType":"form",
        "class": "needs-validation",
        "html":`
          <div class="form-group" id="entidadSolicitante">
            <label for='entitySolicitante'>Entidad del Solicitante*</label>
            <input type='text' class='form-control' id='entitySolicitante' aria-describedby='entityHelp' placeholder='Ingresar el nombre de la entidad' required>
            <div class="invalid-feedback">Por favor ingrese un nombre correcto.</div>
          </div>
          <div class="form-group" id="nombreUser">
            <label for='nameSolicitante'>Nombre del Solicitante*</label>
            <input type='text' class='form-control' id='nameSolicitante' aria-describedby='nameHelp' placeholder='Ingresar el nombre del solicitante' required>
            <div class="invalid-feedback">Por favor ingrese un nombre correcto.</div>
          </div>
          <div class="form-group" id="mailUser">
            <label for='mailSolicitante'>Correo del Solicitante*</label>
            <input type='email' class='form-control' id='mailSolicitante' aria-describedby='emailHelp' placeholder='Ingresar el correo' required>
            <div class="invalid-feedback">Por favor ingrese un correo correcto.</div>
          </div>
          <div class="form-group" id="objetivoUser">
            <label for='objetivoSolicitante'>Objetivo</label>
            <textarea class='form-control' id='objetivoSolicitante' placeholder='Ingrese la razón por la que descarga la información' rows='3'></textarea>
          </div>
          <button type='submit' id="pdfDownload" class='btn btn-primary'>Descargar PDF</button>
        `
    }]
  }     
}

$(document).on('submit','form#formSolicitante',function(e){
  e.preventDefault();
  console.log($('#entitySolicitante').val(),$('#nameSolicitante').val(),$('#mailSolicitante').val(),$('#objetivoSolicitante').val())
  
  // code
});

$('#pdfDownload').on('click',function(){
  onSave()
})

var onSave=(feat)=>{
  console.log('shdisdo')
  // remove drawing modal
  $('#userForm').remove();
}
// cancel the modal
var onCancel=()=>{
  $('#userForm').remove();
}

$('#download-resume').on('click',function(){
  console.log('open')
  let json=jsonModal()
  createModal('userFormModal',json,null,onCancel);
})

/** Function that exports PDF*/

 function savePDF() {
  
    // Promise.all([
    //   chart.exporting.pdfmake,
    //   chart.exporting.getImage("png"),
    //   chart2.exporting.getImage("png"),
    //   chart3.exporting.getImage("png"),
    //   chart4.exporting.getImage("png")
    // ]).then(function(res) { 
      
    //     var pdfMake = res[0];
        
    //     // pdfmake is ready
    //     // Create document template
    //     var doc = {
    //         pageSize: "A4",
    //         pageOrientation: "portrait",
    //         pageMargins: [30, 30, 30, 30],
    //         content: []
    //     };
        
    //     doc.content.push({
    //         text: "In accumsan velit in orci tempor",
    //         fontSize: 20,
    //         bold: true,
    //         margin: [0, 20, 0, 15]
    //     });
    
    //     doc.content.push({
    //         text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sem quam, sodales ac volutpat sed, vestibulum id quam. Sed quis arcu non elit fringilla mattis. Sed auctor mi sed efficitur vehicula. Sed bibendum odio urna, quis lobortis dui luctus ac. Duis eu lacus sodales arcu tincidunt ultrices viverra a risus. Vivamus justo massa, malesuada quis pellentesque ut, placerat in massa. Nunc bibendum diam justo, in consequat ipsum fringilla ac. Praesent porta nibh ac arcu viverra, at scelerisque neque venenatis. Donec aliquam lorem non ultrices ultrices. Aliquam efficitur eros quis tortor condimentum, id pellentesque metus iaculis. Aenean at consequat neque, a posuere lectus. In eu libero magna. Pellentesque molestie tellus nec nisi molestie, eu dignissim lacus tristique. Sed tellus nulla, suscipit a velit non, mattis dictum metus. Curabitur mi mi, convallis nec libero quis, venenatis vestibulum ante.",
    //         fontSize: 15,
    //         margin: [0, 0, 0, 15]
    //     });
        
    //     doc.content.push({
    //         text: "Aliquam lacinia justo",
    //         fontSize: 20,
    //         bold: true,
    //         margin: [0, 20, 0, 15]
    //     });
        
    //     doc.content.push({
    //         image: res[1],
    //         width: 530
    //     });
        
    //     doc.content.push({
    //         text: "Phasellus suscipit in diam a interdum",
    //         fontSize: 20,
    //         bold: true,
    //         margin: [0, 20, 0, 15]
    //     });
        
    //     doc.content.push({
    //         table: {
    //         headerRows: 1,
    //         widths: [ "*", "*", "*", "*" ],
    //         body: [
    //             [
    //             { text: "USA", bold: true },
    //             { text: "Japan", bold: true },
    //             { text: "France", bold: true },
    //             { text: "Mexico", bold: true }
    //             ],
    //             [ "2500", "2500", "2200", "1200" ],
    //             [ "800", "1200", "990", "708" ],
    //             [ "2100", "2150", "900", "1260" ],
    //         ]
    //         }
    //     });
        
    //     doc.content.push({
    //         text: "Duis sed efficitur mauris",
    //         fontSize: 20,
    //         bold: true,
    //         margin: [0, 20, 0, 15]
    //     });
        
    //     doc.content.push({
    //         columns: [{
    //         image: res[2],
    //         width: 250  
    //         }, {
    //         image: res[3],
    //         width: 250  
    //         }],
    //         columnGap: 30
    //     });
        
    //     doc.content.push({
    //         text: "Aliquam semper lacinia",
    //         fontSize: 20,
    //         bold: true,
    //         margin: [0, 20, 0, 15]
    //     });
        
    //     doc.content.push({
    //         columns: [{
    //         image: res[4],
    //         width: 150  
    //         }, {
    //         stack: [{
    //         text: "Maecenas congue leo vel tortor faucibus, non semper odio viverra. In ac libero rutrum libero elementum blandit vel in orci. Donec sit amet nisl ac eros mollis molestie. Curabitur ut urna vitae turpis bibendum malesuada sit amet imperdiet orci. Etiam pulvinar quam at lorem pellentesque congue. Integer sed odio enim. Maecenas eu nulla justo. Sed quis enim in est sodales facilisis non sed erat. Aenean vel ornare urna. Praesent viverra volutpat ex a aliquet.",
    //             fontSize: 15,
    //             margin: [0, 0, 0, 15]
    //         }, {
    //         text: "Fusce sed quam pharetra, ornare ligula id, maximus risus. Integer dignissim risus in placerat mattis. Fusce malesuada dui ut lectus ultricies, et sollicitudin nisl placerat. In dignissim elit in pretium lobortis. Fusce ornare enim at metus laoreet, ut convallis elit lacinia. Maecenas pharetra aliquet mi. Nulla orci nunc, egestas id nisi ut, volutpat sollicitudin mi.",
    //             fontSize: 15,
    //             margin: [0, 0, 0, 15]
    //         }],
    //         width: "*"  
    //         }],
    //         columnGap: 30
    //     });
        
    //     pdfMake.createPdf(doc).download("report.pdf");
        
    // });
  }
  