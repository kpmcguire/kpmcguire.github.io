
iY.SurveyOpenEndedQuestionView = iY.SurveyQuestionView.extend({

  events: {
    'click .save': 'save',
    'click .cancel': 'cancel',
    'click .edit': 'showForm',
    'click .delete': 'delete'
  },

  templatePath: 'surveys/survey_open_ended_question',

  formTemplatePath: 'surveys/survey_open_ended_question_form',

  warnDestroyAnswers: function() {}
});
