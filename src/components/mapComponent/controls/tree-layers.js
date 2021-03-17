import $ from "jquery";
import {hightlightRemove,highlightMupioRemove} from '../layers'

var AllLayers = [];
var k = 0;

//Construye el control de capas
export function buildLayerTree(layer) {
    var name = layer.get('name') ? layer.get('name') : "Group";
    var layers = layer.getLayers().getArray();
    var len = layers.length;

    // recorre la cantidad de grupos de layers
    for (var i = 0; i < len - 2; i++) {
        var name = layers[i].get('name');

        var accordion = document.getElementById('accordion');
        var card = document.createElement('div');
        card.className = "card overflow-auto";
        card.id = "capas";
        accordion.appendChild(card);

        var cardh = document.createElement('div');
        cardh.className = "card-header";
        card.appendChild(cardh);

        if(i===0){
            var close = document.createElement('a');
            close.className = "card-link float-right";
            close.setAttribute('data-toggle', 'collapse');
            close.setAttribute('style', 'position:absolute; right:8px; color: rgb(42, 71, 80)');
            close.setAttribute('href', '#');
            close.onclick = ControlLayerClose;
            close.innerHTML = '<i class="fas fa-times"></i>';
            cardh.appendChild(close);
        }

        var cardlink = document.createElement('a');
        cardlink.className = "btn btn-link";
        cardlink.setAttribute('data-toggle', 'collapse');
        cardlink.setAttribute('aria-expanded', 'true');
        cardlink.setAttribute('data-target', '#collapse' + i);
        cardlink.innerHTML = name;
        cardh.appendChild(cardlink);

        var collapseOne = document.createElement('div');
        collapseOne.id = "collapse" + i;
        collapseOne.className = "collapse ";
        collapseOne.setAttribute('aria-labelledby', '#collapse' + i);
        collapseOne.setAttribute('data-parent', '#accordion');
        card.appendChild(collapseOne);
        
        var lay = layers[i].getLayers().getArray();
        var leng = lay.length;
        for (var j = 0; j < leng; j++) {
            var subname = lay[j].get('name');
            var cardbody = document.createElement('div');
            cardbody.className = "card-body";
            collapseOne.appendChild(cardbody);

            var fcheck = document.createElement('div');
            fcheck.className = "form-check";

            var check = document.createElement('input');
            check.className = "form-check-input layers-input";
            // check.onclick = cleanHighlights("'"+subname+"'");
            // check.onclick=cleanHighlights;            
            check.setAttribute('type', 'checkbox');
            check.id = subname;
            check.onclick = function(ev){    
                cleanHighlights(ev)
                // console.log(ev.toElement)
            }

            // console.log(subname,lay[j].values_.visible);
    
            if (lay[j].values_.visible === true) {
                check.checked = true;
            }
            cardbody.appendChild(check);
            var lab = document.createElement('label');
            lab.className = "form-check-label";
            lab.setAttribute('for', 'defaultCheck1');
            lab.innerHTML = lay[j].values_.title;
            cardbody.appendChild(lab);
            if (lay[j].values_.urldownload && lay[j].values_.urldownload!='') {
                var down= document.createElement('div');
                down.innerHTML='<i class="fas fa-info"></i>';
                down.className = "card-link float-right";
                close.setAttribute('style', 'position:absolute; right:8px; color: rgb(42, 71, 80)');
                down.setAttribute('onclick', 'window.open("' + lay[j].values_.urldownload + '")');
                cardbody.appendChild(down);
            }
            
            if (i !== 0) {
                AllLayers[k] = lay[j];
                k = k + 1;
            }
        }
    }
}

export var AllLayerss=AllLayers; 
//Busca si es capa o grupo de capas
export function findBy(layer, key, value) {
    if (layer.get(key) === value) {
        return layer;
    }
    if (layer.getLayers) {
        var layers = layer.getLayers().getArray(),
                len = layers.length, result;
        for (var i = 0; i < len; i++) {
            result = findBy(layers[i], key, value);
            if (result) {
                return result;
            }
        }
    }
    return null;
}

//visible el control de capas
// function ControlLayer() {
//     document.getElementById('accordion').className = 'd-block';
// }
//oculta el control de capas
$('#ControlCapas').on('click',function(){
    document.getElementById('accordion').className = 'd-block';
});

var ControlLayerClose=()=> {
    document.getElementById('accordion').className = 'd-none';
}

var cleanHighlights=(ev)=>{
    if(ev.toElement.id=='mpio_politico'){
        $('#nav-chart').attr("style", "display:none");
        $('#layers-data-tab').tab('show');
        $('#nav-layers').attr("style", "display:block"); 
        
        hightlightRemove();
        highlightMupioRemove();
    }

}

