import {openSideOptions} from '../../pageComponent/side-options/open-sideoptions'
import {interaction} from './interact-map'

export var onClickMap=(map)=>{

    map.on('singleclick', function (evt) {
        // var coordinate = evt.coordinate;
        // alert ('<p>You clicked here:</p><code>' + coordinate + '</code>');
  
        // interaction(map,select)

        var features = map.getFeaturesAtPixel(evt.pixel,(feature) =>{return feature; });
        if (features.length == 0) {
            console.log('none')
        }else{
            var selection= interaction();
            // selection.getFeatures().clear();
            map.removeInteraction(selection);
            map.addInteraction(selection);

            var ext=features[0].getGeometry().getExtent();
            map.getView().fit(ext,  {
                size: map.getSize(),
                padding: [0, 700, 0, 0],
                maxZoom: 9
            })

            openSideOptions(features[0].values_.nombre_dpt,features[0].values_.nombre_mpi)

        }

    });


}
