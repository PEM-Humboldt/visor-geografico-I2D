import $ from "jquery";
import './export-modal.scss'
import { createModal } from '../../../../modal/createModal'
import './export-pdf'

import { savePDF } from './export-pdf'
import { pythonPostRequest } from '../../../../../server/pythonserver/pythonRequest'
//import { downloadData } from '../../../../../server/geoserver/geoserverRequest'

import { cod_mupio, cod_dpto, title_mupio, title_depto } from "../../../../../globalVars";

import JSZip from "jszip";

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
      // download csv gbif
      //posicionamiento del recuadro de descarga
      $('#download-resume').hide();
      //$('#download-status').show().prepend('<span class="textoagr">Descargando los datos para el' + textmundep + 'de ' + nomdownload + ' . . .<\span>');
      $('#download-status').show().prepend('<span class="textoagr">¡Prepárate para un viaje de datos por el hermoso ' + textmundep + ' de ' + nomdownload + '!<br>Por favor, ten un poco de paciencia mientras reunimos la información. 🌄✨🔍<\span>');
      let pageSize = 800000; // Tamaño de página
      let pageNum = 1;     // Número de página inicial
      let zip = new JSZip();
      //console.log(zip);
      // Función para hacer una solicitud paginada y agregar resultados al archivo ZIP
      function fetchAndAddToZip() {
        var promise2 = fetchPagePromise(pageNum); // Comenzamos en la página 1
        function fetchPagePromise(pageNumber) {
          return $.get(`http://44.195.233.148:8080/geoserver/gbif/ows`, {
            service: 'WFS',
            version: '1.0.0',
            request: 'GetFeature',
            typeName: 'gbif:registros_biologicos_consulta',
            outputFormat: 'csv',
            PropertyName: '(datasetkey,occurrenceid,kingdom,phylum,class,order_,family,genus,species,infraspecificepithet,taxonrank,scientificname,verbatimscientificname,verbatimscientificnameauthorship,countrycode,locality,stateprovince,occurrencestatus,individualcount,publishingorgkey,decimallatitude,decimallongitude,coordinateuncertaintyinmeters,coordinateprecision,elevation,elevationaccuracy,depth,depthaccuracy,eventdate,day,month,year,taxonkey,specieskey,basisofrecord,institutioncode,collectioncode,catalognumber,recordnumber,identifiedby,dateidentified,license,rightsholder,recordedby,typestatus,establishmentmeans,lastinterpreted,mediatype,issue)',
            CQL_FILTER: cod,
            startIndex: (pageNumber - 1) * pageSize, // Calcular el índice de inicio de la página
            maxFeatures: pageSize // Tamaño de la página
          });
        }
        return promise2.then(function (data2) {
          zip.file('registros_' + nomdownload + '_' + pageNum + '.csv', data2);
          // Dividir el contenido en líneas
          let lines = data2.split('\n');
          // Si hay más resultados, sigue paginando
          if (lines.length === 800002) {
            $("#alertText").text("Estamos recopilando datos para ti. Mantén la ventana abierta y deja que la descarga te sorprenda en unos minutos. ✨📁");
            $("#alert").removeClass("d-none");
            pageNum++;
            return fetchAndAddToZip();
          }
        });
      }

      let promise1 = $.get(`http://44.195.233.148:8080/geoserver/gbif/ows`,
        {
          service: 'WFS',
          version: '1.0.0',
          request: 'GetFeature',
          typeName: 'gbif:lista_especies_consulta',
          outputFormat: 'csv',
          CQL_FILTER: cod,
          PropertyName: '(reino,filo,clase,orden,familia,genero,especies,endemicas,amenazadas,exoticas)'
        });

      let species_unique = new Blob();
      promise1.then(function (data1) {
        let processedSpecies = {}; // Objeto para realizar un seguimiento de las especies procesadas
        // Filtrar y procesar registros
        var filteredRecords = data1
          .split('\n') // Dividir por líneas
          .filter(function (line, index) {
            if (index === 0) return true; // Mantener el encabezado
            let species = line.split(',')[7]; // Obtener el valor del campo 'especies'
            if (!processedSpecies[species]) {
              processedSpecies[species] = true; // Marcar la especie como procesada
              return true; // Mantener el registro
            }
            return false; // Filtrar duplicados
          })
          .join('\n'); // Unir nuevamente las líneas
        // Ahora 'filteredRecords' contiene los registros filtrados
        //console.log(filteredRecords);
        // Aquí puedes guardar 'filteredRecords' en un nuevo archivo CSV
        species_unique = new Blob([filteredRecords], { type: 'text/csv;charset=utf-8;' });
        //var link = document.createElement("a");
      });

      $.when(promise1, fetchAndAddToZip()).done(function (/*data1*/) {
        zip.file('lista_especies_' + nomdownload + '.csv', species_unique);
        //console.log(zip);
        zip.generateAsync({
          type: "blob",
          compression: "DEFLATE",
          compressionOptions: {
            level: 9
          }
        }, function updateCallback(metadata) {
          //console.log("progreso: " + metadata.percent.toFixed(2) + " %");
          $('#download-status').find('.textoagr').remove();
          $('#download-status').prepend('<span class="textoagr"> ... ¡' + metadata.percent.toFixed(2) + '% completado!' + '<\span>');
          if (metadata.currentFile) {
            //console.log("current file = " + metadata.currentFile);
            $('#download-status').prepend('<span class="textoagr"> Empacando los datos ' + metadata.currentFile + '<\span>');
          }
        }).then(function (blob) {
          //console.log("vamos a comprimir");
          saveAs(blob, nomdownload + '.zip');
          $('#download-status').hide().find('.textoagr').remove();
          $('#download-resume').show();
        });
      });
    }
  }

  var handleError = () => {
    alert('No fue posible almacenar su información')
  }
  pythonPostRequest('requestcreate/', json, handleCallback, handleError)
});