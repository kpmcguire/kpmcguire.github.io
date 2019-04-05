iY.SurveyQuestion = Backbone.Model.extend({
  urlRoot: '/survey_questions'
});

iY.SurveyQuestions = Backbone.Collection.extend({
  model: iY.SurveyQuestion
});
