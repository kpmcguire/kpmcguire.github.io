
iY.SurveyMultipleChoiceQuestionView = iY.SurveyQuestionView.extend({

  events: {
    'click .save': 'save',
    'click .cancel': 'cancel',
    'click .edit': 'showForm',
    'click .delete': 'delete',
    'click .add-choice': 'addChoice'
  },

  templatePath: 'surveys/survey_multiple_choice_question',

  formTemplatePath: 'surveys/survey_multiple_choice_question_form',

  addChoice: function () {
    this.$('.choices').append(this.choiceHtml({ body: '' }));
  },

  choiceHtml: function (attrs) {
    var view = new iY.SurveyChoiceView({ model: new Backbone.Model(attrs) });
    return view.showForm().$el;
  },

  collectChoicesIntoArray: function () {
    var valueIfPresent = function() {
      if (iY.forms.utils.isPresent(this)) {
        return this.value;
      }
    };

    return this.$('.choice-body').map(valueIfPresent).get();
  },

  warnDestroyAnswers: function() {
    warning_message = 'Warning! Editing this question will result in a loss of data. If ' +
      'volunteers have already answered this question, then clicking "Save" will delete existing ' +
      'answers for this question ONLY. To keep existing answers and change nothing, press ' +
      '"Cancel" in the edit form.'
    alert(warning_message);
  }

});
