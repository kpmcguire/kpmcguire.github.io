iY.UserAssignment = Backbone.Model.extend({
  urlRoot: '/user_assignments',
  toJSON : function() {
    return { "user_assignment" : _.clone(this.attributes) };
  }
});
