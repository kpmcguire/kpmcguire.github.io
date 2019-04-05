iY.User = Backbone.Model.extend({
  url: "/users.json",
  collection: iY.Users,

  toJSON : function () {
    return { "user" : _.clone(this.attributes) };
  },

  // creates user
  create: function (callbacks) {
    this.save(null, callbacks);
  },

  fullName: function() {
    return this.get('first_name') + ' ' + this.get('last_name');
  }
});

iY.Users = Backbone.Collection.extend({
  url: '/users',
  initialize: function() {
    this.model = iY.User;
  }
});
