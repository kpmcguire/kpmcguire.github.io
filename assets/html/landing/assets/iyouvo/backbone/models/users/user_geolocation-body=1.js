iY.UserGeolocation = Backbone.Model.extend({
  initialize: function () {
    this.url = '/users/' + this.id + '/geolocate.json';
  },

  toJSON : function() {
    return { "user_geolocation" : _.clone(this.attributes) };
  }
});
