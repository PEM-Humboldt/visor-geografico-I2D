import $ from "jquery";
import {GEOSERVER_URL} from '../url'

import WFS from 'ol/format/WFS';
import {TileWMS} from 'ol/source';

var featureNS = 'http://humboldt.co';
var infoFormat = 'application/json';

import {getProjection} from '../../mapComponent/map'

import {feats} from '../../mapComponent/layers'
import {fitView,getResolution} from '../../mapComponent/map'


var format = [], wmsSource = [];

// select wms layers if turn on
export var wmsGetProps=(AllLayers,i,coordinate,Selection)=>{
    var featureType = AllLayers[i].values_.source.params_.LAYERS;
    var layer=featureType.split(':')[1]
    format[i] = new WFS({featureNS: featureNS, featureType: layer});
    wmsSource[i] = new TileWMS({
        url: GEOSERVER_URL+'ows?',
        params: {
            'LAYERS': featureType,
            'TILED': true
        },
        serverType: 'geoserver'
    });
    let resolution=layer=='procesos_gobernanza'?getResolution(): 1;
    var url = wmsSource[i].getFeatureInfoUrl(
        coordinate, resolution, getProjection(),
        {'INFO_FORMAT': infoFormat}
    );

    $.ajax({
        url: url,
        success: function (data) {
            var feat = feats(data);
            var features = feat.getFeatures();
    
            if(features.length>0){
                var selectedStadistics =$('#stadisticstype').children("option:selected").val()

                // zoom a mupios o depto
                if(selectedStadistics==layer){
                    var ext=feat.getExtent();
                    fitView(ext);
                }

                Selection(features,i);
            }else{
                console.log('sin features')
            }

            // console.log(sele,data,sel);
        }
    });
}


