iY.Event = Backbone.Model.extend({
  collection: iY.Events,
  initialize: function () {
    this.opportunities = new iY.Opportunities();
    this.opportunities.url = '/opportunities/' + this.id + '/tasks.json';
    this.opportunities.model = iY.TaskItem;
  }
});

iY.Events = Backbone.Collection.extend({
  url: '/opportunities',
  initialize: function() {
    this.model = iY.Event;
  }
});
