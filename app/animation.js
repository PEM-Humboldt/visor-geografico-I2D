//agrega giff de carga
function putgif() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 0);
        document.getElementById('carga2').style.display = "block";
    });
}
//quita giff de carga
function quitgif() {
    document.getElementById('carga2').style.display = "none";
}
//hace que el contedor se pueda mover por la ventana
$(document).ready(function () {
    $("#contenedorg").draggable();
    quitgif();
});
//oculta el contenedor de la tabla de atributos
function CloseTable() {
    document.getElementById("contenedorg").style.visibility = "hidden";
}