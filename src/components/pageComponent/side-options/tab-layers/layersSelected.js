import {AllLayerss} from '../../../mapComponent/controls/tree-layers'
import {wmsGetProps} from '../../../server/geoserver/wmsGetProps';
import {hightlightAdd,feats,hightlightRemove} from '../../../mapComponent/layers'
import {fitView} from '../../../mapComponent/map-control'

import {openSideOptions} from '../side-options'

import $ from "jquery";
// =========================================================================

// get wms layers if turn on
export var wmsOnLayers=(coordinate)=>{
    $('#nav-layers').attr("style", "display:none");
    // wms layers                
    for (var i = 0; i < AllLayerss.length; i++) {
        // console.log(AllLayerss[i].values_);
        // if turn on
        if (AllLayerss[i].values_.visible === true) {
            $('#nav-layers').attr("style", "display:block"); 
            openSideOptions();
            // $('#layers-data-tab').tab('show');
            console.log(AllLayerss[i]);
            wmsGetProps(AllLayerss,i,coordinate,FeatSelect);
        }
    }
}

function FeatSelect(i,data, typeSel, Zoom) {
    var feat = feats(data);

    hightlightRemove();

    var feature = feat.getFeatures()[0];
    console.log(feature);
    if (feature) {
        hightlightAdd(feature);
        if (Zoom === 'ZoomSelect') {
            fitView(feat.getExtent());
        }

        if(feature.id_){

            var accordion = document.getElementById('contenedorg');
            var card = document.createElement('div');
            card.className = "card overflow-auto";
            card.id = feature.id_;
    
            accordion.appendChild(card);
            var cardh = document.createElement('div');
            cardh.className = "card-header";
            card.appendChild(cardh);
    
            var cardlink = document.createElement('a');
            cardlink.className = "card-link";
            cardlink.setAttribute('data-toggle', 'collapse');
            cardlink.setAttribute('href', '#collapse' + feature.ol_uid);
            cardlink.innerHTML = feature.id_;
            cardh.appendChild(cardlink);
    
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
            return 'AddSelection';
        }
        
    }
    return 'NewSelection';
}
