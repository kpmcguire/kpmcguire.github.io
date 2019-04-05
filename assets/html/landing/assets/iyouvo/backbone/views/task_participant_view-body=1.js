iY.TaskParticipantView = Backbone.View.extend({

  tagName: 'tr',

  events: {
    'click .remove-vol': 'deleteVolunteer'
  },

  initialize: function (options) {
    _.bindAll(this, 'render', 'remove');
    this.listenTo(this.model, 'destroy', function (model) {
      _.remove(options.taskView.model.get('participants'), { id: model.id });
    });
  },

  render: function () {
    if (this.model.get('full_name')) {
      this.$el.html(iY.template('tasks/assigned_participant_row', this.model.attributes));
    } else {
      alert('That user is already signed up for this task.');
    }
    return this;
  },

  deleteVolunteer: function () {
    this.model.destroy({
      error: function() {
        iY.flashError("An error occured: the volunteer was not removed. Please try again, " +
          "or contact us using the support tab if the problem continues.");
      }
    });
    // we assume success, even though it isn't being called above
    this.remove();
  }
});
