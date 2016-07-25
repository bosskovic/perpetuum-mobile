function Map() {
  this.initializeMap = function (path) {

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      scrollwheel: true,
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      center: {lat: 45.2671, lng: 19.8335 }
    });

    var ctaLayer = new google.maps.KmlLayer({
      url: path,
      map: map
    });

  };
}

$(document).on('click', 'a#showGoogleMap', function (e) {
    var $map = $('#map');
    $map.css('height', window.innerHeight - 90);
    $map.css('width', window.innerWidth - 90);
    if (gMap == undefined) {
      gMap = new Map();
      gMap.initializeMap($map.data('track'));
    }
});