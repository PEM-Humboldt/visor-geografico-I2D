import $ from "jquery";
import './sideoptions.scss';

import { openSideOptions } from "./open-sideoptions";
import { closeSideOptions } from "./close-sideoptions";

// onclick interactivity
$('#exportDataBtn').on( "click", function() {
    openSideOptions()
})


$('#closeSideOptions').on( "click", function() {
    closeSideOptions()
})
