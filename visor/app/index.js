//Evento cargue de pagina principal lista
$(document).ready(function () {
    //
    //Agragar elementos principales DOM
    //
    //lista departamento
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
    //Mapa
    var map = document.createElement('div');
    map.id = 'map';
    document.querySelector('body').appendChild(map);
    //
    //Importar scripts adicionales
    //
    importarScript("app/layers.js");
});
function importarScript(nombre, callback) {
    var s = document.createElement("script");
    s.onload = callback;
    s.src = nombre;
    document.querySelector("head").appendChild(s);
}