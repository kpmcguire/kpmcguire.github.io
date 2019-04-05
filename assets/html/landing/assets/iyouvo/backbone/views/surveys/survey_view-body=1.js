iY.SurveyView = Backbone.View.extend({

  el: '#survey-container',

  events: {
    'click .add-question': 'addQuestion'
  },

  initialize: function (options) {
    _.bindAll(this, 'render', 'renderQuestionForm', 'resetCollection', 'updateOrdinals');
    this.surveyId = options.surveyId;
    this.choices = options.choices;
    this.$list = this.$('#survey-questions-list');
    this.sortable = iY.sortable(this.$list, {
      axis: 'y',
      handle: '.step-wrapper',
      update: this.updateOrdinals
    });
    this.sortable.initialize();
    this.listenTo(this.collection, 'add', this.renderQuestionForm);
    this.listenTo(this.collection, 'reload', this.resetCollection);
    this.listenTo(this.collection, 'sync', this.showAddButtonAndEnableSorting);
    this.listenTo(this.collection, 'cancelledQuestion', this.cancelledQuestion);
  },

  render: function () {
    var frag = document.createDocumentFragment();
    this.collection.each(function (q) {
      if (q.get('question_type') != 'Open Ended') {
        frag.appendChild(new iY.SurveyMultipleChoiceQuestionView({ model: q }).render().el);
      } else {
        frag.appendChild(new iY.SurveyOpenEndedQuestionView({ model: q }).render().el);
      }
    }, this);
    this.$list.html(frag);
    this.showAddButtonAndEnableSorting();
    this.$('[rel=tooltip]').tooltip({placement:'right'});
    return this;
  },

  addQuestion: function () {
    this.collection.add({
      survey_id: this.surveyId,
      question_type: $(event.target).closest('.add-question').data('value'),
      ordinal: this.nextOrdinal(),
      choices: this.choices
    });
    this.$('.save-survey').addClass('hidden');
    this.$('.publish-survey').addClass('hidden');
    this.$('.add-question').addClass('hidden');
  },

  cancelledQuestion: function (model) {
    this.collection.remove(model);
    this.showAddButtonAndEnableSorting();
  },

  nextOrdinal: function () {
    var c = this.collection;
    return c.length > 0 ? _.parseInt(c.last().get('ordinal')) + 1 : 1;
  },

  renderQuestionForm: function (q) { // choose type here
    this.sortable.disable();
    var view;
    if (q.get('question_type') != 'Open Ended') {
      view = new iY.SurveyMultipleChoiceQuestionView({ model: q }); //choose model here
    } else {
      view = new iY.SurveyOpenEndedQuestionView({ model: q }); //choose model here
    }
    this.$('#survey-questions-list').append(view.showForm().$el);
  },

  resetCollection: function (models) {
    this.collection.reset(models);
    this.render();
  },

  showAddButtonAndEnableSorting: function () {
    this.$('.add-question').removeClass('hidden');
    this.$('.save-survey').removeClass('hidden');
    this.$('.publish-survey').removeClass('hidden');
    this.sortable.enable();
  },

  updateOrdinals: function () {
    $.ajax({
      data: this.$list.sortable('serialize', { key: 'question_ids[]' }),
      method: 'put',
      success: this.resetCollection,
      url: '/surveys/' + this.surveyId
    });
  }
});
