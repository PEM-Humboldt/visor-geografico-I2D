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
        // Trim whitespace and validate search term
        const searchTerm = e.target.value.trim();

        // Only make API call if search term has at least 2 characters
        if (searchTerm.length >= 2) {
            let urlReq='mpio/search/'+encodeURIComponent(searchTerm);
            pythonGetRequest(searchCallback,urlReq,'No fue posible buscar la información')
        } else {
            // Clear dropdown if search term is too short
            createDropdown('mpio','municipio',[]);
        }
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

