iY.Group = Backbone.Model.extend({
  url: "/nonprofits.json",

  initialize: function () {
    if (iY.Programs) {
      this.events = new iY.Programs();
      this.events.url = '/nonprofits/programs.json?id=' + this.id;
    }

    if (this.id) {
      this.url = '/nonprofits/' + this.id + '.json';
    }
  },

  toJSON : function() {
    return { "group" : _.clone(this.attributes) };
  }
});

iY.Groups = Backbone.Collection.extend({
  initialize: function() {
    this.model = iY.Group;
  }
});
