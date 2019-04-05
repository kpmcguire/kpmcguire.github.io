iY.Program = Backbone.Model.extend({
  collection: iY.Programs,
  initialize: function () {
    this.opportunities = new iY.Opportunities();
    this.opportunities.url = '/opportunities/' + this.id + '/tasks.json';
    this.opportunities.model = iY.TaskItem;

    if(this.id) {
      this.url = '/opportunities/' + this.id + '.json';
    }
  }
});

iY.Programs = Backbone.Collection.extend({
  initialize: function() {
    this.model = iY.Program;
  }
});
