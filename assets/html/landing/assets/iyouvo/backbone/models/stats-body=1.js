iY.Stats = Backbone.Model.extend({
  initialize: function () {
    this.set({'total_hours': 0});
  }
});

iY.stats = new iY.Stats();
