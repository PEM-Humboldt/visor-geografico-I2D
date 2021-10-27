import $ from "jquery";

import {createModal} from '../../../../modal/createModal'
import './export-pdf'

import{savePDF} from './export-pdf'
import {pythonPostRequest} from '../../../../../server/pythonserver/pythonRequest'
import {downloadData} from '../../../../../server/geoserver/geoserverRequest'

import { cod_mupio,cod_dpto } from "../../../../../globalVars";

// modal form json
var jsonModal=()=>{
  // var selectedStadistics =$('#stadisticstype').children("option:selected").val()
  // var downloadButton='';
  // if(selectedStadistics=='mpio_politico'){
  //   downloadButton= `<button type='submit' id="downloadCSV" value="downloadCSV" class='btn btn-primary btn-block'>Descargar Datos (CSV)</button>
  //   <button type='submit' id="downloadAll" value="downloadAll" class='btn btn-primary btn-block'>Descargar Informe y datos</button>
  // `
  // }

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

            <button type='submit' id="downloadPDF" value="downloadPDF" class='btn btn-primary btn-block'>Descargar Informe (PDF)</button>
            <button type='submit' id="downloadCSV" value="downloadCSV" class='btn btn-primary btn-block'>Descargar Datos (CSV)</button>
            <button type='submit' id="downloadAll" value="downloadAll" class='btn btn-primary btn-block'>Descargar Informe y datos</button>
        
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



//  modal for export pdf
$(document).on('submit','form#formSolicitante',function(e){
  let type=$(this).find("button[type=submit]:focus")[0].value
  // console.log(type)
  e.preventDefault();

  let json={
    "entidad": $('#entitySolicitante').val(),
    "nombre": $('#nameSolicitante').val(),
    "email": $('#mailSolicitante').val(),
    "observacion": $('#objetivoSolicitante').val()
  }

  var handleCallback=()=>{
    var selectedStadistics =$('#stadisticstype').children("option:selected").val()
    let codigo=''
    if(selectedStadistics=='mpio_politico'){
      codigo=`codigo_mpio=%27${cod_mupio}%27`
    }else{
      codigo=`codigo_dpto=%27${cod_dpto}%27`
    }

    // alert('Su información fue almacenada')
    $('#userFormModal').remove();

    if(type=='downloadPDF' || type=='downloadAll'){
      // create and export pdf
      savePDF();
    }
    if(type=='downloadCSV' || type=='downloadAll'){
      // download csv gbif
      let urlGbif=`gbif/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=gbif%3Aregistros_biologicos_consulta&outputFormat=csv&PropertyName=(gbifid,datasetkey,occurrenceid,kingdom,phylum,class,order_,family,genus,species,infraspecificepithet,taxonrank,scientificname,verbatimscientificname,verbatimscientificnameauthorship,countrycode,locality,stateprovince,occurrencestatus,individualcount,publishingorgkey,decimallatitude,decimallongitude,coordinateuncertaintyinmeters,coordinateprecision,elevation,elevationaccuracy,depth,depthaccuracy,eventdate,day,month,year,taxonkey,specieskey,basisofrecord,institutioncode,collectioncode,catalognumber,recordnumber,identifiedby,dateidentified,license,rightsholder,recordedby,typestatus,establishmentmeans,lastinterpreted,mediatype,issue)&CQL_FILTER=${codigo}`
      downloadData(urlGbif)

      let urlAmenazadas=`gbif/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=gbif%3Alista_especies_consulta&outputFormat=csv&CQL_FILTER=${codigo}&PropertyName=(reino,filo,clase,orden,familia,genero,especies,endemicas,amenazadas,exoticas)`
      downloadData(urlAmenazadas)
    }
  }

  var handleError=()=>{
    alert('No fue posible almacenar su información')
  }

  pythonPostRequest('requestcreate/',json,handleCallback,handleError)

});
