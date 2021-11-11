import $ from "jquery";

import {layerSelection} from './layersSelect'
import {tutorialChangeStep3} from '../../tutorialComponent/tutorial'

// clicking on map change the tutorial step 
export var onClickMap=(evt)=>{
    // change tutorial step
    tutorialChangeStep3();
    // layer get props and stadistics municipios
    layerSelection(evt.coordinate);
}

