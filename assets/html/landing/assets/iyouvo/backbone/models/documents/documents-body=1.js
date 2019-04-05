iY.Document = Backbone.Model.extend({
  collection: iY.Documents,
  toJSON : function() {
    return { "document" : _.clone(this.attributes) };
  }
});

iY.Documents = Backbone.Collection.extend({
  url: '/documents',
  initialize: function() {
    this.model = iY.Document;
  }
});
