// ========= config section ================================================
var url = 'http://geoservicios.humboldt.org.co/geoserver/ows?';
var featureNS = 'http://humboldt.co';
var infoFormat = 'application/json';
// =========================================================================
var proj = new ol.proj.Projection({
    code: 'http://www.opengis.net/gml/srs/epsg.xml#4326',
    axis: 'enu'
});
var format = [];
var wmsSource = [];
for (var i = 0; i < AllLayers.length; i++) {
    var featureType = AllLayers[i].values_.source.params_.LAYERS;
    format[i] = new ol.format.WFS({featureNS: featureNS, featureType: featureType.split(':')[1]});
    wmsSource[i] = new ol.source.TileWMS({
        url: url,
        params: {
            'LAYERS': featureType,
            'TILED': true
        },
        serverType: 'geoserver'
    });
}
map.on('singleclick', function (evt) {
    var viewResolution = map.getView().getResolution();
    var sel = 'NewSelection';
    document.getElementById("contenedorg").innerHTML = "";
    for (var i = 0; i < AllLayers.length; i++) {
        if (AllLayers[i].values_.visible === true) {
            var url = wmsSource[i].getFeatureInfoUrl(
                    evt.coordinate, viewResolution, map.getView().getProjection(),
                    {'INFO_FORMAT': infoFormat}
            );
            $.ajax({
                async: false,
                url: url,
                beforeSend: function () {
                    putgif();
                },
                success: function (data) {
                    if (sel === 'NewSelection') {
                        var sele = FeatSelect(data, sel);
                        if (sele === 'AddSelection') {
                            sel = 'AddSelection';
                        }
                    } else {
                        FeatSelect(data);
                    }
                },
                complete: function () {
                    quitgif();
                }
            });
        }
    }
});