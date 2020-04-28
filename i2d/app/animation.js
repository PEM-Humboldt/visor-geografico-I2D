function putgif() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 0);
        document.getElementById('carga2').style.display = "block";
    });
}
function quitgif() {
    document.getElementById('carga2').style.display = "none";
}
$(document).ready(function () {
    $("#contenedorg").draggable();
    quitgif();
});

function CloseTable() {
    /*document.getElementById('contenedorg').className = 'd-none';*/
    document.getElementById("contenedorg").style.visibility = "hidden";
}