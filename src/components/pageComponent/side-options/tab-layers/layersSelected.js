import $ from "jquery";

import {hightlightAdd,hightlightRemove} from '../../../mapComponent/layers'
// create dynamic click selection, it shows the list of click layers

const orderJson = (json) => {
    return Object.fromEntries(
        Object.entries(json).map(([category, list]) => [
            category,
            list.map(item =>
                Object.fromEntries(
                    Object.entries(item).sort(([a], [b]) => a.localeCompare(b))
                )
            )
        ])
    );
}

const isJson = (value) => {
    try{
        const parsed = JSON.parse(value)
        if (parsed && typeof parsed === 'object') {
            return orderJson(parsed)
        }
    } catch {
        return null;
    }
}


const buildHtmlTable = (data) => {
    var table = document.createElement('table');
    table.className = "table table-sm";
    table.setAttribute('style', 'border: 1px solid #dee2e6; margin: 1rem; text-align:center; border-collapse: collapse; font-size: 11px;');

    let html = '';
    
    for (const [category, list] of Object.entries(data)){
        let key = category.toUpperCase();
        let columns = '';

        // Calculates how many columns the header should take and adds column names
        const firstJson = list[0];
        const headers = Object.keys(firstJson);

        for (const key of headers) {
            const title = (key.charAt(0).toUpperCase() + key.slice(1)).replaceAll("_", " ")
            columns+= `<th style="font-weight: bold; vertical-align: middle; border:1px solid #dee2e6;"> ${title} </th>`
        }
        html += `<tr> ${columns} </tr>`;

        for (const json of list){
            let values = '';

            for (const value of Object.values(json)){
                const cellValue = Array.isArray(value) ? value.join(", ") : value;
                
                values+= `<td style="border:1px solid #dee2e6;"> ${cellValue} </td>`
            }

            html += `<tr> ${values} </tr>`
        }
    }
    
    table.innerHTML = html;
    return table;
}

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
        if (feature.values_.nombre) {
            cardTitle.innerHTML = feature.values_.nombre;
        } else {
            cardTitle.innerHTML = feature.id_;
        }
        cardlink.appendChild(cardTitle);

        var collapseOne = document.createElement('div');
        collapseOne.id = "collapse" + feature.ol_uid;
        collapseOne.className = "collapse container";
        collapseOne.setAttribute('data-parent', '#contenedorg');

        card.appendChild(collapseOne);

        var cardbody = document.createElement('div');
        cardbody.className = "card-body";
        cardbody.setAttribute('style', 'min-height: 150px; max-height: 350px; height: auto; overflo: auto');
        collapseOne.appendChild(cardbody);

        var table = document.createElement('table');
        table.className = "table table-sm";
        cardbody.appendChild(table);
        
        var j = 0;
        // atributos
        for (i in feature.values_) {
            if (i != 'geometry' && i != 'bbox') {
                const value = feature.values_[i];
                var row = table.insertRow(j);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                let label = i;
                let url;
                let dataTable;
                switch(i) {
                    case 'dpto_nombre':
                        label = 'Departamento';
                        break;
                    case 'nombre':
                        label = 'Nombre';
                        break;
                    case 'codigo':
                        label = 'Código';
                        break;
                    case 'area_ha':
                        label = 'Área (ha)';
                        break;
                }
                
                if (typeof value === 'string' && /^https?:\/\//i.test(value)){
                    url = `<a href=${value}>${value}</a>`;
                }

                const parsedJson = isJson(value)
                if (parsedJson) {
                    dataTable = buildHtmlTable(parsedJson);
                }
                
                cell1.innerHTML = label;
                if (dataTable){
                    cell2.appendChild(dataTable);
                } else {
                    cell2.innerHTML = url || value;
                }
                j = j + 1;
            }
        }
    }
}
