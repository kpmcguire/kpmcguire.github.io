// This is a Google maps plugin for Leaflet from https://gist.github.com/4504864
/*
 * L.TileLayer is used for standard xyz-numbered tile layers.
 */

L.Google = L.Class.extend({
  includes: L.Mixin.Events,

  options: {
    minZoom: 0,
    maxZoom: 18,
    tileSize: 256,
    subdomains: 'abc',
    errorTileUrl: '',
    opacity: 1,
    continuousWorld: false,
    noWrap: false
  },

  // Possible types: SATELLITE, ROADMAP, HYBRID
  initialize: function(type, options) {
    L.Util.setOptions(this, options);

    this._type = google.maps.MapTypeId[type || 'SATELLITE'];
  },

  onAdd: function(map, insertAtTheBottom) {
    this._map = map;
    this._insertAtTheBottom = insertAtTheBottom;

    // create a container div for tiles
    this._initContainer();
    this._initMapObject();

    // set up events
    map.on('viewreset', this._resetCallback, this);

    this._limitedUpdate = L.Util.limitExecByInterval(this._update, 150, this);
    map.on('move', this._update, this);

    this._reset();
    this._update();
  },

  onRemove: function(map) {
    this._map._container.removeChild(this._container);
    //this._container = null;

    this._map.off('viewreset', this._resetCallback, this);

    this._map.off('move', this._update, this);
    //this._map.off('moveend', this._update, this);
  },

  getAttribution: function() {
    return this.options.attribution;
  },

  setOpacity: function(opacity) {
    this.options.opacity = opacity;
    if (opacity < 1) {
      L.DomUtil.setOpacity(this._container, opacity);
    }
  },

  _initContainer: function() {
    var tilePane = this._map._container
    first = tilePane.firstChild;

    if (!this._container) {
      this._container = L.DomUtil.create('div', 'leaflet-google-layer leaflet-top leaflet-left');
      this._container.id = "_GMapContainer";
    }

    if (true) {
      tilePane.insertBefore(this._container, first);

      this.setOpacity(this.options.opacity);
      var size = this._map.getSize();
      this._container.style.width = size.x + 'px';
      this._container.style.height = size.y + 'px';
      this._container.style.zIndex = 0;
    }
  },

  _initMapObject: function() {
    this._google_center = new google.maps.LatLng(0, 0);
    var map = new google.maps.Map(this._container, {
      center: this._google_center,
      zoom: 0,
      mapTypeId: this._type,
      disableDefaultUI: true,
      keyboardShortcuts: false,
      draggable: false,
      disableDoubleClickZoom: true,
      scrollwheel: false,
      streetViewControl: false
    });

    var _this = this;
    this._reposition = google.maps.event.addListenerOnce(map, "center_changed",
        function() { _this.onReposition(); });

    map.backgroundColor = '#ff0000';
    this._google = map;
  },

  _resetCallback: function(e) {
    this._reset(e.hard);
  },

  _reset: function(clearOldContainer) {
    this._initContainer();
  },

  _update: function() {
    this._resize();

    var bounds = this._map.getBounds();
    var ne = bounds.getNorthEast();
    var sw = bounds.getSouthWest();
    var google_bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(sw.lat, sw.lng),
        new google.maps.LatLng(ne.lat, ne.lng)
    );
    var center = this._map.getCenter();
    var _center = new google.maps.LatLng(center.lat, center.lng);

    this._google.setCenter(_center);
    this._google.setZoom(this._map.getZoom());
  },

  _resize: function() {
    var size = this._map.getSize();
    if (this._container.style.width == size.x &&
        this._container.style.height == size.y)
      return;
    this._container.style.width = size.x + 'px';
    this._container.style.height = size.y + 'px';
    google.maps.event.trigger(this._google, "resize");
  },

  onReposition: function() {}
});

iYouVo.leaflet = {
  defaultZoom: 13,

  initializeLeafletMap: function(lat, lng) {
    var zoom = (arguments.length === 3 ? arguments[2] : this.defaultZoom);
    var map = L.map('map_canvas', {scrollWheelZoom: false, attributionControl: false}).setView([lat, lng], zoom);
    map.addLayer(new L.Google('ROADMAP'));
    L.control.attribution({position: 'topright'}).addTo(map);
    return map;
  },

  initializeMapForOppFinder: function() {
    var latLng = $('#search_location').val().split(' ');
    return this.initializeLeafletMap(latLng[0], latLng[1], $('#map_zoom').val());
  },

  addMarker: function(lat, lng, map, popupContent) {
    var marker = L.marker([lat, lng]).addTo(map);
    if (popupContent) {
      marker.bindPopup(popupContent);
    }
    return marker;
  },

  geocodeAddress: function(address, callback) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var location = results[0].geometry.location;
        callback(location.lat(), location.lng());
      } else {
        console.log("Geocode was not successful for the following reason: " + status);
      }
    });
  },

  addOpportunityMarker: function(opp, map) {
    if (opp.get('latitude') && opp.get('longitude')) {
      this.addOpportunityMarkerWithLatLng(opp, map);
    } else if (opp.get('location')) {
      this.geocodeAddress(opp.get('location'), function(lat, lng) {
        opp.set({ latitude: lat, longitude: lng });
        iY.leaflet.addOpportunityMarkerWithLatLng(opp, map);
      });
    }
  },

  addOpportunityMarkerWithLatLng: function(opp, map) {
    var popup = iY.template('programs/map_popup', opp.attributes);
    this.addMarker(opp.get('latitude'), opp.get('longitude'), map, popup);
  },

  addGroupMarker: function(group, map) {
    var lat = group.attributes.address.latitude;
    var lng = group.attributes.address.longitude;

    if (lat !== null && lat !== "" && lng !== null && lng !== "") {
      this.addGroupMarkerWithLatLng(lat, lng, map, group.attributes.id);
    }
  },

  addGroupMarkerWithLatLng: function(lat, lng, map, groupId) {
    var marker = this.addMarker(lat, lng, map, null);
    marker.on('click', function() {
      $.get('/nonprofits/' + groupId + '/group_info', function(content) {
        marker.bindPopup(content).openPopup();
      });
    });
  }
};
