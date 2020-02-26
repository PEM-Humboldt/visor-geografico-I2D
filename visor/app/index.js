//Evento cargue de pagina principal lista
$(document).ready(function() {
    //console.log("1");
    //
    //Agragar elementos principales DOM
    //
    var dropdown = document.createElement('div');
    dropdown.className = 'dropdown';
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-primary dropdown-toggle';
    button.setAttribute('data-toggle', 'dropdown');
    button.innerHTML = 'Seleccione Departamento';
    dropdown.appendChild(button);
    document.querySelector('body').appendChild(dropdown);
    var dropdownMenu = document.createElement('div');
    dropdownMenu.className = 'dropdown-menu';
    dropdown.appendChild(dropdownMenu);
});