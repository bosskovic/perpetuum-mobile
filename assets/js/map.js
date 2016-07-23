function Map() {
  this.initializeMap = function (path) {

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      scrollwheel: false,
      center: {lat: 45.2671, lng: 19.8335 }
    });

    var ctaLayer = new google.maps.KmlLayer({
      url: path,
      map: map
    });

  };
}
