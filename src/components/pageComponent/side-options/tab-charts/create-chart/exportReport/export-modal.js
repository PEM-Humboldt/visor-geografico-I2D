import $ from "jquery";

import {createModal} from '../../../../modal/createModal'
import './export-pdf'

// modal form json
var jsonModal=()=>{
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
              <textarea class='form-control' id='objetivoSolicitante' placeholder='Ingrese la razón por la que descarga la información' rows='1'></textarea>
            </div>

            <button type='submit' id="pdfDownload" class='btn btn-primary'>Descargar PDF</button>
          `
      }]
    }     
}

// cancel the modal
var onCancel=()=>{
  $('#userFormModal').remove();
}
  
  // open download modal
$('#download-resume').on('click',function(){
    let json=jsonModal()
    createModal('userForm',json,null,onCancel);
})
