import {openSideOptions} from '../../pageComponent/side-options/open-sideoptions'
import {showInteraction} from './interact-map'

export var onClickMap=(map)=>{
    map.on('singleclick', function (evt) {
        // var coordinate = evt.coordinate;
        // alert ('<p>You clicked here:</p><code>' + coordinate + '</code>');

        var features = map.getFeaturesAtPixel(evt.pixel,(feature) =>{return feature; });
        if (features.length == 0) {
            console.log('none')
        }else{
            showInteraction(map);
   
            var ext=features[0].getGeometry().getExtent();
            map.getView().fit(ext);

            openSideOptions(features[0].values_)
        }
    });
}