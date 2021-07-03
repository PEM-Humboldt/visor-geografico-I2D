import './modal.scss'
import 'jquery-ui-dist/jquery-ui.css';
import 'jquery-ui-dist/jquery-ui.theme.css';

import $ from "jquery";
import 'jquery-ui-dist/jquery-ui';

// move modal
$('.modal-dialog').draggable({
    handle:".modal-header"
});

$('#modalStadistics').modal('handleUpdate')

$('.modal-content').resizable({
  minWidth: 500,
  handles: 'n, e, s, w, ne, sw, se, nw'
})
