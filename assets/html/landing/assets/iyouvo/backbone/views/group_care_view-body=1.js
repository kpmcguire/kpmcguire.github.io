iY.GroupCareView = Backbone.View.extend({

  className: 'group_care',

  events: {
    'click': 'save'
  },

  initialize: function (opts) {
    _.bindAll(this, 'enableButton', 'updateClass', 'save', 'saveSuccess',
      'saveError', 'destroySuccess', 'destroyError');
    this.updateClass();
  },

  enableButton: function () {
    this.$el.removeAttr("disabled");
  },

  save: function () {
    this.$el.attr("disabled", "disabled");
    if (this.model.isNew()) {
      this.model.save({}, {
        success: this.saveSuccess,
        error: this.saveError
      });
    } else {
      this.model.destroy({
        success: this.destroySuccess,
        error: this.destroyError
      });
    }
  },

  saveSuccess: function() {
    iY.flashNotice("You're now following this organization, refresh the page to see more info.");
    this.updateClass();
    this.enableButton();
  },

  saveError: function() {
    iY.flashError('Sorry, there was a problem!');
    this.enableButton();
  },

  destroySuccess: function() {
    iY.flashNotice('We\'ll stop notifying you about this nonprofit!  Sorry to see you go.');
    this.model.set({ id: null });
    this.updateClass();
    this.enableButton();
  },

  destroyError: function() {
    iY.flashError('Sorry, there was a problem!');
    this.enableButton();
  },

  updateClass: function() {
    var klass = this.model.isNew() ? 'uncaring' : 'caring';
    this.$el.text(this.model.isNew() ? 'Follow' : 'Following');
    this.$el.removeClass('uncaring caring');
    this.$el.addClass(klass);

  }

});
