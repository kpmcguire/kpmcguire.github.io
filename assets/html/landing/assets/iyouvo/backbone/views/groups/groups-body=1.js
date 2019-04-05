iY.GroupView = Backbone.View.extend({
  initialize: function () {
    _.bindAll(this, 'render');
    this.render();
  },

  render: function () {
    var lat = this.model.attributes.address.latitude;
    var lng = this.model.attributes.address.longitude;

    if (lat !== null && lat !== "" && lng !== null && lng !== "") {
      var map = iYouVo.leaflet.initializeLeafletMap(lat, lng);
      iYouVo.leaflet.addMarker(lat, lng, map, null);
    }
  }
});

iY.GroupsView = Backbone.View.extend({
  initialize: function () {
    _.bindAll(this, 'render');
    this.render();
  },

  render: function () {
    var latLng = $('#search_location').val().split(' ');
    var map = iYouVo.leaflet.initializeLeafletMap(latLng[0], latLng[1], $('#map_zoom').val());
    this.collection.each(function(group) {
      var lat = group.attributes.address.latitude;
      var lng = group.attributes.address.longitude;

      if (lat !== null && lat !== "" && lng !== null && lng !== "") {
        iYouVo.leaflet.addGroupMarker(group, map)
      }
    });
  }
});
