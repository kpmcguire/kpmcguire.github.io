iY.GroupMembership = Backbone.Model.extend({
  collection: iY.GroupMemberships,
  toJSON : function() {
    return { "group_membership" : _.clone(this.attributes) };
  }
});

iY.GroupMemberships = Backbone.Collection.extend({
  url: '/group_memberships',
  initialize: function() {
    this.model = iY.GroupMembership;
  }
});
