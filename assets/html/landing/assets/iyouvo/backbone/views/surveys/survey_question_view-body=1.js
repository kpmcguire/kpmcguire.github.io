iY.SurveyQuestionView = Backbone.View.extend({

  id: function () {
    return 'question-' + this.model.get('id');
  },

  initialize: function (options) {
    _.bindAll(this, 'deleteSuccess', 'remove', 'render');
    this.collection = this.model.collection;
  },

  render: function () {
    this.$el.attr('id', this.id());
    this.$el.html(iY.template(this.templatePath, this.model.attributes));
    return this;
  },

  attrsFromForm: function () {
    return {
      body: this.$('[name=body]').val(),
      required: this.$('[name=required]').prop('checked'),
      choices: this.collectChoicesIntoArray()
    }
  },

  collectChoicesIntoArray: function () {
    return [];
  },

  cancel: function () {
    if (this.model.isNew()) {
      this.model.collection.trigger('cancelledQuestion', this.model);
      this.remove();
    } else {
      this.render();
    }
  },

  delete: function () {
    if (confirm('Are you sure you want to delete question #' + this.model.get('ordinal') + '?')) {
      this.model.destroy({
        success: this.deleteSuccess,
        error: this.showErrors
      });
    }
  },

  deleteSuccess: function (model, response) {
    this.collection.trigger('reload', response);
    this.remove();
  },

  save: function () {
    this.model.save(this.attrsFromForm(), {
      wait: true,
      success: this.render,
      error: this.showErrors
    });
  },

  showErrors: function (model, response) {
    iY.flashError(response.responseJSON.error);
  },

  showForm: function () {
    if (!this.model.isNew()) {
      this.warnDestroyAnswers();
    }
    var content = $(iY.template(this.formTemplatePath, this.model.attributes));
    _.each(this.model.get('choices'), function (choice) {
      content.find('.choices').append(this.choiceHtml(choice));
    }, this);
    this.$el.html(content);
    return this;
  }

});
