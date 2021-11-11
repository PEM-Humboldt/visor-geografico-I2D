import $ from "jquery";

import {hightlightAdd,hightlightRemove} from '../../../mapComponent/layers'
// create dynamic click selection, it shows the list of click layers
export function FeatSelect(features,i) {
    var feature=features[0];

    if(feature.id_){

        var accordion = document.getElementById('contenedorg');
        var card = document.createElement('div');
        card.className = "card overflow-auto";
        card.id = feature.id_;

        accordion.appendChild(card);
        var cardh = document.createElement('div');
        cardh.className = "card-header";
        cardh.id='#ch' + feature.ol_uid;
        card.appendChild(cardh);

        var cardlink = document.createElement('p');
        cardlink.className = "toggle-header m-2 collapsed";
        cardlink.id='#collapse' + feature.ol_uid;
        cardlink.setAttribute('data-toggle', 'collapse');
        cardlink.setAttribute('href', '#collapse' + feature.ol_uid);
        cardlink.onclick=function(e){  
            // console.log(feature.getGeometry().getType())
            hightlightRemove();
            $('#contenedorg').on('shown.bs.collapse', function () {
                hightlightRemove();
                feature.getGeometry().getType()=='Point'?hightlightAdd(feature,'point'):hightlightAdd(feature);
            })
        }
        cardh.appendChild(cardlink);

        var cardIcon = document.createElement('i');
        cardIcon.className = "fas fa-angle-down rotate-icon mx-2";
        cardlink.appendChild(cardIcon);

        var cardTitle = document.createElement('b');
        cardTitle.className = "";
        cardTitle.innerHTML = feature.id_;
        cardlink.appendChild(cardTitle);

        var collapseOne = document.createElement('div');
        collapseOne.id = "collapse" + feature.ol_uid;
        collapseOne.className = "collapse container";
        collapseOne.setAttribute('data-parent', '#contenedorg');

        card.appendChild(collapseOne);

        var cardbody = document.createElement('div');
        cardbody.className = "card-body";
        cardbody.setAttribute('style', 'min-height: 150px');
        collapseOne.appendChild(cardbody);

        var table = document.createElement('table');
        table.className = "table table-sm";
        cardbody.appendChild(table);
        
        var j = 0;
        // atributos
        for (i in feature.values_) {
            if (i != 'geometry' && i != 'bbox') {
                var row = table.insertRow(j);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell1.innerHTML = i;
                cell2.innerHTML = feature.values_[i];
                j = j + 1;
            }
        }
    }
    
}
