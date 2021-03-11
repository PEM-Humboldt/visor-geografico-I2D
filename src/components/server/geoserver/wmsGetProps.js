import $ from "jquery";
import {GEOSERVER_URL} from '../url'

import WFS from 'ol/format/WFS';
import {TileWMS} from 'ol/source';

var featureNS = 'http://humboldt.co';
var infoFormat = 'application/json';

import {getProjection,getResolution} from '../../mapComponent/map-control'

var format = [], wmsSource = [];

// select wms layers if turn on
export var wmsGetProps=(AllLayers,i,coordinate,FeatSelect)=>{
    
    var featureType = AllLayers[i].values_.source.params_.LAYERS;
    format[i] = new WFS({featureNS: featureNS, featureType: featureType.split(':')[1]});
    wmsSource[i] = new TileWMS({
        url: GEOSERVER_URL+'ows?',
        params: {
            'LAYERS': featureType,
            'TILED': true
        },
        serverType: 'geoserver'
    });
    
    var sel = 'NewSelection';

    var url = wmsSource[i].getFeatureInfoUrl(
        coordinate, getResolution(), getProjection(),
        {'INFO_FORMAT': infoFormat}
    );
    console.log(url);

    $.ajax({
        url: url,
        success: function (data) {
                
            if (sel === 'NewSelection') {
                var sele = FeatSelect(i,data, sel)
                if (sele === 'AddSelection') {
                    sel = 'AddSelection';
                }
            } else {
                FeatSelect(i,data);
            }
            

            // console.log(sele,data,sel);
        }
    });

}


