iY.OppTaskView = Backbone.View.extend({

  className: 'task',

  events: {
    'click .edit': 'showEditForm',
    'click .copy': 'copy',
    'click .delete': 'delete',
    'click .cancel': 'cancel',
    'click .save-task': 'save',
    'click .volunteers': 'showAddVolunteersForm',
    'click #user_assignment_button': 'assignVolunteer',
    'click #user_assignment_close': 'render'
  },

  initialize: function () {
    _.bindAll(this, 'render', 'remove');
    var view = this;
    this.model.parse(this.model.attributes);
    $(document).on('autocomplete:selected', function (event, data) {
      if (data.el === view.$('.autocomplete')[0]) {
        view.assignTask(data.item);
      }
    });
  },

  render: function () {
    this.$el.html(iY.template('tasks/opp_task', this.model.attributes));
    return this;
  },

  delete: function () {
    if (confirm('Are you sure you want to delete ' + this.model.get('name') + '?')) {
      this.model.destroy({
        success: this.remove,
        error: this.showErrors
      });
    }
  },

  save: function () {
    this.model.save(this.$('form').serializeObject(), {
      success: this.render,
      error: this.showErrors
    });
    if (this.valid()) {
      this.model.set('participants', []);
      this.render();
    }
  },

  assignTask: function (item) {
    if (item === null) {
      this.$('#user_assignment_user_id').val(null);
    } else {
      item.value = item.first_name + ' ' + item.last_name;
      this.$('#user_assignment_user_id').val(item.id);
      this.$('#user_email').val(item.email);
    }
  },

  showEditForm: function () {
    this.$el.html(iY.template('tasks/form', this.model.attributes));
    this.$('#task_start_time').datetimepicker(iY.datePickerOptions);
    this.$('#task_end_time').datetimepicker(iY.datePickerOptions);

    return this;
  },

  showAddVolunteersForm: function () {
    var user;
    var view = this;
    this.$el.html(iY.template('tasks/assign', this.model.attributes))
      .append(iY.template('tasks/user_assignments_table', this.model.attributes));
    participants = this.model.get('participants');

    var frag = document.createDocumentFragment();
    _.each(participants, function (p) {
      user = new iY.UserAssignment(p);
      frag.appendChild(new iY.TaskParticipantView({ model: user, taskView: view }).render().el);
    });
    view.$('table.participants').append(frag);

    var autocompleteFields = view.$(".autocomplete");
    autocompleteFields.each(function (index, element) {
      iY.autocomplete(element);
    });
    return this;
  },

  assignVolunteer: function () {
    var view = this;
    var data = {
      user_id: view.$("#user_assignment_user_id").val(),
      task_id: this.model.id,
      email: view.$('#user_email').val(),
      full_name: view.$('.autocomplete').val()
    };

    var userAssignment = new iY.UserAssignment(data);
    var participantView = new iY.TaskParticipantView({ model: userAssignment, taskView: this });
    view.$('.participants').append(participantView.render().el);
    view.model.get('participants').push(userAssignment.attributes);
    $('#new_user_assignment input[type=text]').val(''); //clear assign members form if successfully added
    userAssignment.save();
  },

  cancel: function () {
    if (this.model.isNew()) {
      this.remove();
      $('.add-task').show();
    } else {
      this.render();
    }
  },

  copy: function() {
    var newModel = this.model.clone();
    newModel.set('id', null);
    var newTaskView = new iY.OppTaskView({model: newModel}).render();
    newTaskView.$el.insertAfter(this.el);
    newTaskView.showEditForm();
  },

  valid: function () {
    var startTime = $('#task_start_time').datepicker('getDate');
    var endTime = $('#task_end_time').datepicker('getDate');

    return (iY.forms.utils.isPresent(this.$('#task_name')) &&
      iY.forms.utils.isPresent(this.$('#task_volunteers_needed')) &&
      iY.forms.utils.hasChronologicalDates(startTime, endTime));
  },

  showErrors: function (model, response) {
    iY.flashError(response.responseJSON.error);
  }

});
