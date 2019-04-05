iY.SurveyChoiceView = Backbone.View.extend({

  events: {
    'click .remove-choice': 'remove'
  },

  initialize: function (options) {
    _.bindAll(this, 'showForm');
  },

  showForm: function () {
    this.$el.html(iY.template('surveys/survey_choice_form', this.model.attributes));
    return this;
  }
});
