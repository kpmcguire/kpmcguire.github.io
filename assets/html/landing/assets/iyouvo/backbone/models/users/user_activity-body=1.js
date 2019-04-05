iY.UserActivity = Backbone.Model.extend({
  collection: iY.UserActivities,
  url: '/user_activities.json',
  toJSON : function() {
    return { "user_activity" : _.clone(this.attributes) };
  },
  initialize: function () {
    if(this.id) {
      this.url = '/user_activities/' + this.id + '.json';
    }
  }
});

iY.UserActivities = Backbone.Collection.extend({
  initialize: function() {
    this.model = iY.UserActivity;
  }
});
