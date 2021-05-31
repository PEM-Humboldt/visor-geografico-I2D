import $ from "jquery";
import {GEOSERVER_URL} from '../url'

import WFS from 'ol/format/WFS';
import {TileWMS} from 'ol/source';

var featureNS = 'http://humboldt.co';
var infoFormat = 'application/json';

import {getProjection,getResolution} from '../../mapComponent/map-control'

import {feats} from '../../mapComponent/layers'
import {fitView} from '../../mapComponent/map-control'


var format = [], wmsSource = [];

// select wms layers if turn on
export var wmsGetProps=(AllLayers,i,coordinate,Selection)=>{
    
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

    var url = wmsSource[i].getFeatureInfoUrl(
        coordinate, getResolution(), getProjection(),
        {'INFO_FORMAT': infoFormat}
    );

    $.ajax({
        url: url,
        success: function (data) {
            var feat = feats(data);
            var features = feat.getFeatures();
    
            if(features.length>0){
                // zoom a mupios
                if(i==1){
                    var ext=feat.getExtent();
                    fitView(ext);
                }

                Selection(features,i);
            }

            // console.log(sele,data,sel);
        }
    });
}


