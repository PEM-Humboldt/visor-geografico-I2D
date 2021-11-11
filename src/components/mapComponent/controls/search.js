import $ from "jquery";
import {pythonGetRequest} from '../../server/pythonserver/pythonRequest'

import {createDropdown} from './dropdown'

// search toggle the input
$('#basic-search').on('click',()=>{
    if(!$('#search-input').is(':visible') && !$('#dropdown-menu-mupio').is(':visible')){
        $('#dropdown-menu-mupio').slideToggle('fast', function () {
            $(this).is(':visible') ? 'Hide' : 'Show';
        });
    }else if($('#dropdown-menu-mupio').is(':visible')){
        $('#dropdown-menu-mupio').slideToggle('fast', function () {
            $(this).is(':visible') && 'Hide';
        });
    }
    $('#search-input').slideToggle('fast', function () {
        $(this).is(':visible') ? 'Hide' : 'Show';
    });
})

let timeout = null;
// search on typing
$('#search-input').on('input',(e)=>{
    clearTimeout(timeout);
    timeout = setTimeout(()=> {
        let urlReq='mpio/search/'+e.target.value;
        pythonGetRequest(searchCallback,urlReq,'No fue posible buscar la información')
    }, 10);
})

$('#search-input').on('keyup', (e) => {
    if($('#search-input').val().length>0){
        $('#dropdown-menu-mupio').show()
    }else{
        $('#dropdown-menu-mupio').hide() 
    } 
});

var searchCallback=(data)=>{
    createDropdown('mpio','municipio',data);
}

