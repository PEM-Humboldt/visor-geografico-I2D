import $ from "jquery";
import {GEOSERVER_URL} from '../url'

import WFS from 'ol/format/WFS';
import TileWMS from 'ol/source/TileWMS';

var featureNS = 'http://humboldt.co';
var infoFormat = 'application/json';

import {getProjection} from '../../mapComponent/map'

import {feats} from '../../mapComponent/layers'
import {fitView,getResolution} from '../../mapComponent/map'

const circleLayers = ['red_viveros', 'procesos_gobernanza'];
var format = [], wmsSource = [];

function getDynamicBuffer(resolution) {
    // scaleDenominator = resolution x 3571 (OGC standar (1/0.00028))
    if (resolution > 1900) return 4;
    if (resolution > 560) return 7;
    if (resolution > 280) return 9;
    return 10;
}
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
    // if is a point or if not 
    //let resolution=layer=='procesos_gobernanza'?getResolution(): 1;
    let resolution=layer==layer?getResolution(): 1;

    const params = {
        'INFO_FORMAT': infoFormat,
    }

    if (circleLayers.includes(layer)) {
        params['BUFFER'] = getDynamicBuffer(resolution);
    } else {
        if (resolution > 200){
            resolution=200;
        }
    }
    
    var url = wmsSource[i].getFeatureInfoUrl(
        coordinate, resolution, getProjection(),
        params
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


