import $ from "jquery";
import './export-modal.scss'
import { createModal } from '../../../../modal/createModal'
import './export-pdf'

//import {GEOSERVER_URL} from '../../../../../server/url'
import { PYTHONSERVER } from '../../../../../server/url'; // Importa la URL del servidor Python

import { savePDF } from './export-pdf'
import { pythonPostRequest } from '../../../../../server/pythonserver/pythonRequest'
//import { downloadData } from '../../../../../server/geoserver/geoserverRequest'

import { cod_mupio, cod_dpto, title_mupio, title_depto } from "../../../../../globalVars";


//import { saveAs } from "file-saver";

// modal form json
var jsonModal = () => {
  // var selectedStadistics =$('#stadisticstype').children("option:selected").val()
  // var downloadButton='';
  // if(selectedStadistics=='mpio_politico'){
  //   downloadButton= `<button type='submit' id="downloadCSV" value="downloadCSV" class='btn btn-primary btn-block'>Descargar Datos (CSV)</button>
  //   <button type='submit' id="downloadAll" value="downloadAll" class='btn btn-primary btn-block'>Descargar Informe y datos</button>
  // `
  // }

  return {
    "title": "FORMULARIO DE DESCARGA",
    "body": [{
      "id": "formSolicitante",
      "controlType": "form",
      "class": "needs-validation",
      "html": `
            <div class="form-group" id="entidadSolicitante">
              <label for='entitySolicitante'>Entidad del Solicitante*</label>
              <input type='text'  maxlength="50" class='form-control' id='entitySolicitante' aria-describedby='entityHelp' placeholder='Ingresar el nombre de la entidad' required>
              <div class="invalid-feedback">Por favor ingrese un nombre correcto.</div>
            </div>
            <div class="form-group" id="nombreUser">
              <label for='nameSolicitante'>Nombre del Solicitante*</label>
              <input type='text'  maxlength="50" class='form-control' id='nameSolicitante' aria-describedby='nameHelp' placeholder='Ingresar el nombre del solicitante' required>
              <div class="invalid-feedback">Por favor ingrese un nombre correcto.</div>
            </div>
            <div class="form-group" id="mailUser">
              <label for='mailSolicitante'>Correo del Solicitante*</label>
              <input type='email'  maxlength="50" class='form-control' id='mailSolicitante' aria-describedby='emailHelp' placeholder='Ingresar el correo' required>
              <div class="invalid-feedback">Por favor ingrese un correo correcto.</div>
            </div>
            <div class="form-group" id="objetivoUser">
              <label for='objetivoSolicitante'>Objetivo</label>
              <textarea  maxlength="100" class='form-control' id='objetivoSolicitante' placeholder='Ingrese la razón por la que descarga la información' rows='1'></textarea>
            </div>

            <button type='submit' id="downloadPDF" value="downloadPDF" class='btn btn-primary btn-block'>Descargar Informe (PDF)</button>
            <button type='submit' id="downloadAll" value="downloadAll" class='btn btn-primary btn-block'>Descargar Informe y datos</button>
        
          `
    }]
  }
}

// cancel the modal
var onCancel = () => {
  $('#userFormModal').remove();
}

// open download modal
$('#download-resume').on('click', function () {
  let json = jsonModal()
  createModal('userForm', json, null, onCancel);
})



//  modal for export pdf
$(document).on('submit', 'form#formSolicitante', function (e) {
  let type = $(this).find("button[type=submit]:focus")[0].value
  // console.log(type)
  e.preventDefault();

  let json = {
    "entidad": $('#entitySolicitante').val(),
    "nombre": $('#nameSolicitante').val(),
    "email": $('#mailSolicitante').val(),
    "observacion": $('#objetivoSolicitante').val()
  }

  var handleCallback = () => {
    var selectedStadistics = $('#stadisticstype').children("option:selected").val();
    let codigo = '';
    let nomdownload = '';
    let cod = '';
    let textmundep = '';
    if (selectedStadistics == 'mpio_politico') {
      codigo = `codigo_mpio=%27${cod_mupio}%27`
      cod = `${codigo}`.replace(/%27/g, "'");
      nomdownload = `${title_mupio}`;
      textmundep = ' municipio ';
    } else {
      codigo = `codigo_dpto=%27${cod_dpto}%27`
      cod = `${codigo}`.replace(/%27/g, "'");
      nomdownload = `${title_depto}`;
      textmundep = ' departamento ';
    }

    // alert('Su información fue almacenada')
    $('#userFormModal').remove();

    if (type == 'downloadPDF' || type == 'downloadAll') {
      // create and export pdf
      savePDF();
    }
    if (type == 'downloadCSV' || type == 'downloadAll') {
      // Nueva lógica: descarga directa del ZIP desde el backend
      $('#download-resume').hide();
      $('#download-status').show().prepend('<span class="textoagr">¡Preparando tu archivo para descarga! Por favor espera unos segundos...<\span>');

      let selectedStadistics = $('#stadisticstype').children("option:selected").val();
      let params = '';
      let nomdownload = '';
      if (selectedStadistics == 'mpio_politico') {
        params = `codigo_mpio=${encodeURIComponent(cod_mupio)}`;
        nomdownload = title_mupio;
      } else {
        params = `codigo_dpto=${encodeURIComponent(cod_dpto)}`;
        nomdownload = title_depto;
      }
      params += `&nombre=${encodeURIComponent(nomdownload)}`;

      // Cambia la URL al endpoint de tu backend
      let url = PYTHONSERVER + 'gbif/descargar-zip/?' + params;
      window.open(url);

      $('#download-status').hide().find('.textoagr').remove();
      $('#download-resume').show();
      return; // Salir para no ejecutar la lógica de GeoServer ni JSZip
    }
  }

  var handleError = () => {
    alert('No fue posible almacenar su información')
  }
  pythonPostRequest('requestcreate/', json, handleCallback, handleError)
});