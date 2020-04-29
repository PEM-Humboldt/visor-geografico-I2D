function FeatSelect(data, typeSel, Zoom) {
    var feat = new ol.source.Vector({
        features: (new ol.format.GeoJSON()).readFeatures(data)
    });
    if (typeSel === 'NewSelection') {
        highlight.getSource().clear();
    }
    if (feat.getFeatures()[0]) {
        highlight.getSource().addFeature(feat.getFeatures()[0]);
        if (Zoom === 'ZoomSelect') {
            var view = map.getView();
            view.fit(feat.getExtent());
        }
        document.getElementById("contenedorg").style.display = "initial";
        document.getElementById("contenedorg").style.visibility = "visible";
        document.getElementById("contenedorg").style.height = "auto";
        //document.getElementById('contenedorg').className = 'd-block';
        var feature = feat.getFeatures()[0];
        var accordion = document.getElementById('contenedorg');
        var card = document.createElement('div');
        card.className = "overflow-auto card";
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
        if (typeSel === 'NewSelection') {
            var close = document.createElement('a');
            close.className = "card-link float-right";
            close.setAttribute('data-toggle', 'collapse');
            close.setAttribute('href', '#');
            close.onclick = CloseTable;
            close.innerHTML = 'X';
            cardh.appendChild(close);
        }
        var collapseOne = document.createElement('div');
        collapseOne.id = "collapse" + feature.ol_uid;
        collapseOne.className = "collapse container";
        collapseOne.setAttribute('data-parent', '#accordion');

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
    return 'NewSelection';
}
