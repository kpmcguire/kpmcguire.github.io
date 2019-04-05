iY.GroupMembershipsView = Backbone.View.extend({
  el: $('#group_members'),

  initialize: function () {
    _.bindAll(this, 'render');
  },

  render: function () {
    var el = this.$el;
    el.empty();
    if (this.collection.length) {
      this.collection.each(function (gm) {
        var view = new iY.GroupMembershipView({model: gm});
        el.append(view.render());
      });
    }
    else {
      el.html('<li>No members found.</li>');
    }
  }
});

iY.GroupMembershipView = Backbone.View.extend({
  tagName: 'li',
  className: 'member',

  initialize: function () {
    _.bindAll(this, 'render');
  },

  render: function () {
    var memberTemplate = iY.template('groups/group_membership', this.model.attributes);
    return this.$el.html(memberTemplate);
  }
});

iY.refreshMembers = function(memberData, pageLinks) {
  var members = new iY.GroupMemberships(memberData);
  var groupMembershipView = new iY.GroupMembershipsView({ collection: members });
  groupMembershipView.render();
  $('#pagination_container').html(pageLinks);
  $('.pagination a').attr('data-remote', 'true');
};

// can be updated to show custom fields for other membership types
iY.membershipFields = function() {
  if (this.id === 'group_membership_membership_type_current_student') {
    $('#current_student_fields').removeClass('hide');
  }
  else {
    $('#current_student_fields').addClass('hide');
  }
};
