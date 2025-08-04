import $ from "jquery";
import { hightlightRemove, highlightStadisticsRemove, proyecto } from '../layers';
import { closeTutorialOnStep4 } from '../../tutorialComponent/tutorial';
import logoi2d from '../../../assets/legend/ecoreservas.png'

var AllLayers = [];
var k = 0;
var numcap = proyecto === 'general' ? 3 : 18;

export function buildLayerTree(layer) {
    //var name = layer.get('name') || "Group";
    var layers = layer.getLayers().getArray();
    var len = layers.length;
    for (var i = 0; i < len - numcap; i++) {
        var accordion = document.getElementById('accordion');
        var group = layers[i];
        var groupName = group.get('name');
        var groupElements = createGroupElements(accordion, i, groupName);
        var collapseOne = groupElements.collapseOne;
        var lay = group.getLayers().getArray();
        var leng = lay.length;
        for (var j = 0; j < leng; j++) {
            var subname = lay[j].get('name');
            var cardbody = document.createElement('div');
            cardbody.className = "card-body-layers";
            collapseOne.appendChild(cardbody);

            var fcheck = document.createElement('div');
            fcheck.className = "form-check";
            cardbody.appendChild(fcheck);

            var check = document.createElement('input');
            check.className = "form-check-input layers-input";
            if( j == 0 && subname == "dpto_politico"){
                check.disabled = true; // Desactiva el checkbox
            }
            check.setAttribute('type', 'checkbox');
            check.id = subname;
            check.onclick = function (ev) {
                cleanHighlights(ev)
            }
            if (lay[j].values_.visible === true) {
                check.checked = true;
            }
            fcheck.appendChild(check);
            var lab = document.createElement('label');
            lab.className = "form-check-label";
            lab.setAttribute('for', 'defaultCheck1');
            lab.innerHTML = lay[j].values_.title;
            fcheck.appendChild(lab);
            if (lay[j].values_.urldownload && lay[j].values_.urldownload != '') {
                var down = document.createElement('div');
                down.innerHTML = '<i class="fas fa-link"></i>';
                down.className = "card-link float-right";
                down.setAttribute('onclick', 'window.open("' + lay[j].values_.urldownload + '")');
                fcheck.appendChild(down);
            }
            if (i !== 0) {
                AllLayers[k] = lay[j];
                k = k + 1;
            }

        }
    }
    if (proyecto === 'ecoreservas') {
        // Define the group names
        var ggrupo = ['Compensación', 'Inversión 1%', 'Inversión Voluntaria'];
        var gggrupo = ['Inversión 1%', 'Inversión Voluntaria'];
        // Display the accordion
        accordion.className = 'd-block';

        // Create an element for Cundinamarca
        var combinedCardsCundi = createCombinedCards('Ecoregión relacionada a las Ecoreservas Mancilla y Tocancipá', 'combinedCapas_Cundi', 'bg-info');
        var combinedCollapsesCundi = combinedCardsCundi;
        // Create an element for San Antero
        var combinedCardsSan = createCombinedCards('Ecoregión relacionada a la Ecoreserva San Antero', 'combinedCapas_San', 'bg-warning');
        var combinedCollapsesSan = combinedCardsSan;
        // Extract the last three groups
        var lastThreeGroups = layers.slice(2, 14);
        var lastThreeGroupss = layers.slice(len - 9);

        // Create combined cards for each group
        createCombinedCardsForGroups(ggrupo, combinedCardsCundi, combinedCollapsesCundi, lastThreeGroups, 0);
        createCombinedCardsForGroups(gggrupo, combinedCardsSan, combinedCollapsesSan, lastThreeGroupss, 1);
    }
}

export var AllLayerss = AllLayers;
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
$('#ControlCapas').on('click', function () {
    document.getElementById('accordion').className = 'd-block';
    closeTutorialOnStep4();
});
// Función para crear elementos de grupo
function createGroupElements(accordion, index, groupName) {
    var card = document.createElement('div');
    card.className = "card overflow-auto";
    card.id = "capas" + index;
    accordion.appendChild(card);

    var cardh = document.createElement('div');
    cardh.className = "card-header";
    card.appendChild(cardh);

    if (index === 0) {
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
    cardlink.setAttribute('href', '#');
    cardlink.setAttribute('data-toggle', 'collapse');
    cardlink.setAttribute('aria-expanded', 'true');
    cardlink.setAttribute('data-target', '#collapse' + index);
    cardlink.innerHTML = groupName;
    cardh.appendChild(cardlink);

    var collapseOne = document.createElement('div');
    collapseOne.id = "collapse" + index;
    collapseOne.className = "collapse ";
    collapseOne.setAttribute('aria-labelledby', '#collapse' + index);
    collapseOne.setAttribute('data-parent', '#accordion');
    card.appendChild(collapseOne);
    return { card, cardh, cardlink, collapseOne };
}
// Function to create combined cards for Cundinamarca and San Antero
function createCombinedCards(name, id, headerClass) {
    var combinedCards = document.createElement('div');
    combinedCards.className = "card overflow-auto";
    combinedCards.id = id;
    accordion.appendChild(combinedCards);

    var combinedCardHeader = document.createElement('div');
    combinedCardHeader.className = "card-header " + headerClass;
    combinedCards.appendChild(combinedCardHeader);

    var combinedCardLink = document.createElement('a');
    combinedCardLink.className = "btn btn-link";
    combinedCardLink.setAttribute('href', '#');
    combinedCardLink.setAttribute('data-toggle', 'collapse');
    combinedCardLink.setAttribute('aria-expanded', 'true');
    combinedCardLink.setAttribute('data-target', '#combinedCollapse_' + id);
    combinedCardLink.innerHTML = name;
    combinedCardLink.style.fontWeight = 'bold';
    combinedCardLink.style.textDecoration = 'underline';
    combinedCardLink.style.fontStyle = 'italic';
    combinedCardHeader.appendChild(combinedCardLink);

    var combinedCollapse = document.createElement('div');
    combinedCollapse.id = "combinedCollapse_" + id;
    combinedCollapse.className = "collapse";
    combinedCollapse.setAttribute('aria-labelledby', '#combinedCollapse_' + id);
    combinedCollapse.setAttribute('data-parent', '#accordion');
    combinedCards.appendChild(combinedCollapse);

    return combinedCollapse;
}

// Function to create combined cards for groups
function createCombinedCardsForGroups(groupNames, combinedCards, parentElement, groups, aa) {
    for (var i = 0; i < groupNames.length; i++) {
        var combinedCard = document.createElement('div');
        combinedCard.className = "card overflow-auto";
        combinedCard.id = "combinedCapas" + i + aa;
        combinedCards.appendChild(combinedCard);

        var combinedCardHeader = document.createElement('div');
        combinedCardHeader.className = "card-header bg-success";
        combinedCard.appendChild(combinedCardHeader);

        var combinedCardLink = document.createElement('a');
        combinedCardLink.className = "btn btn-link";
        combinedCardLink.setAttribute('href', '#');
        combinedCardLink.setAttribute('data-toggle', 'collapse');
        combinedCardLink.setAttribute('aria-expanded', 'true');
        combinedCardLink.setAttribute('data-target', '#combinedCollapse' + i + aa);
        combinedCardLink.innerHTML = groupNames[i];
        combinedCardHeader.appendChild(combinedCardLink);

        var combinedCollapse = document.createElement('div');
        combinedCollapse.id = "combinedCollapse" + i + aa;
        combinedCollapse.className = "collapse";
        combinedCollapse.setAttribute('aria-labelledby', '#combinedCollapse' + i + aa);
        combinedCollapse.setAttribute('data-parent', '#' + combinedCards.id);
        combinedCard.appendChild(combinedCollapse);

        createGroupLayers(groups, i, combinedCollapse);
    }
}

// Function to create layers for a group
function createGroupLayers(groups, index, parentElement) {
    for (var i = index * 3; i < (index + 1) * 3; i++) {
        var group = groups[i];
        var groupCard = document.createElement('div');
        groupCard.className = "card";
        parentElement.appendChild(groupCard);

        var groupCardHeader = document.createElement('div');
        groupCardHeader.className = "card-header overflow-auto";
        groupCard.appendChild(groupCardHeader);

        var groupCardLink = document.createElement('a');
        groupCardLink.className = "btn btn-link";
        groupCardLink.setAttribute('href', '#');
        groupCardLink.setAttribute('data-toggle', 'collapse');
        groupCardLink.setAttribute('aria-expanded', 'true');
        groupCardLink.setAttribute('data-target', '#collapseGroup' + i);
        groupCardLink.innerHTML = group.get('name');
        groupCardHeader.appendChild(groupCardLink);

        var collapseGroup = document.createElement('div');
        collapseGroup.id = "collapseGroup" + i;
        collapseGroup.className = "collapse";
        collapseGroup.setAttribute('aria-labelledby', '#collapseGroup' + i);
        collapseGroup.setAttribute('data-parent', '#' + parentElement.id);
        groupCard.appendChild(collapseGroup);

        createGroupLayersContent(group.getLayers().getArray(), collapseGroup);
    }
}

// Function to create layers content for a group
function createGroupLayersContent(groupLayers, parentElement) {
    for (var j = 0; j < groupLayers.length; j++) {
        var subname = groupLayers[j].get('name');
        var cardbody = document.createElement('div');
        cardbody.className = "card-body-layers";
        parentElement.appendChild(cardbody);

        var fcheck = document.createElement('div');
        fcheck.className = "form-check";
        cardbody.appendChild(fcheck);

        var check = document.createElement('input');
        check.className = "form-check-input layers-input";
        check.setAttribute('type', 'checkbox');
        check.id = subname;
        check.onclick = function (ev) {
            cleanHighlights(ev);
        }

        if (groupLayers[j].values_.visible === true) {
            check.checked = true;
        }
        fcheck.appendChild(check);

        var lab = document.createElement('label');
        lab.className = "form-check-label";
        lab.setAttribute('for', 'defaultCheck1');
        lab.innerHTML = groupLayers[j].values_.title;
        fcheck.appendChild(lab);

        if (groupLayers[j].values_.urldownload && groupLayers[j].values_.urldownload !== '') {
            var down = document.createElement('div');
            down.innerHTML = '<i class="fas fa-link"></i>';
            down.className = "card-link float-right";
            down.setAttribute('onclick', 'window.open("' + groupLayers[j].values_.urldownload + '")');
            fcheck.appendChild(down);
        }
        AllLayers[k] = groupLayers[j];
        k = k + 1;

        var down = document.createElement('div');
        // Crear elemento de imagen
        var image = document.createElement('img');
        image.src = logoi2d; // Establecer la ruta de la imagen
        // Agregar la imagen al elemento div
        down.appendChild(image);
        fcheck.appendChild(down);
    }
}

var ControlLayerClose = () => {
    document.getElementById('accordion').className = 'd-none';
}
var cleanHighlights = (ev) => {
    if (ev.target.id == 'mpio_politico') {
        $('#nav-chart').attr("style", "display:none");
        $('#layers-data-tab').tab('show');
        $('#nav-layers').attr("style", "display:block");

        hightlightRemove();
        highlightStadisticsRemove();
    }
}