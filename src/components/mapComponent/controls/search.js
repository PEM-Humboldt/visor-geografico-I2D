import $ from "jquery";
import {pythonGetRequest} from '../../server/pythonserver/pythonGetRequest'

import {createDropdown} from './dropdown'

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

$('#search-input').on('input',(e)=>{
    clearTimeout(timeout);
    timeout = setTimeout(()=> {
        let urlReq='mpio/search/'+e.target.value;
        pythonGetRequest(searchCallback,urlReq)
    }, 1000);
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