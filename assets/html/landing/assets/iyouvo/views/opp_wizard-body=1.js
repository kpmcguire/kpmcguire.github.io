iY.oppWizard = {

  addValidations: function () {

    var oneTimeChecked = function() {
      return $('#opp-date-one-time')[0].checked;
    };

    var multiDayChecked = function() {
      return $('#opp-date-range')[0].checked;
    };

    iY.forms.validations.initialize({
      form: $('#opp_name').closest('form'),
      validators: [
        iY.forms.validators.requiredField('#opp_name'),
        iY.forms.validators.requiredField('#opp_description'),
        iY.forms.validators.requiredField('#contactable_name'),
        iY.forms.validators.requiredField('#contactable_email'),
        iY.forms.validators.conditionallyRequiredField('.one-time-picker', oneTimeChecked, { event: 'none' }),
        iY.forms.validators.conditionallyRequiredField('.start-time-picker', multiDayChecked, { event: 'none' }),
        iY.forms.validators.conditionallyRequiredField('.end-time-picker', multiDayChecked, { event: 'none' })
      ]
    });
  },

  dateFields: function () {
    var datePickerOptions = function (selectFn) {
      return _.extend(_.clone(iY.datePickerOptions), { onSelect: selectFn });
    };

    var oneTimeDateOptions = datePickerOptions(function (datetime) {
      var start = moment(datetime).format(iY.dbDateTimeFormat);
      var end = moment(datetime).endOf('day').format(iY.dbDateTimeFormat);
      $('#opp_start_time').val(start);
      $('#opp_end_time').val(end);
    });

    var startDateOptions = datePickerOptions(function (datetime) {
      $('#opp_start_time').val(moment(datetime).format(iY.dbDateTimeFormat));
    });

    var endDateOptions = datePickerOptions(function (datetime) {
      $('#opp_end_time').val(moment(datetime).format(iY.dbDateTimeFormat));
    });

    var clearDates = function () {
      $('#opp_start_time, #opp_end_time, .one-time-picker, .start-time-picker, .end-time-picker').val('');
    };

    var displayCorrectDatepicker = function () {
      $('.one-time-picker-wrapper, .multi-day-fields-wrapper').hide();
      clearDates();
      if ($('#opp-date-one-time')[0].checked) {
        $('.one-time-picker-wrapper').show();
      } else if ($('#opp-date-range')[0].checked) {
        $('.multi-day-fields-wrapper').show();
      }
    };

    $('.one-time-picker').datetimepicker(oneTimeDateOptions);
    $('.start-time-picker').datetimepicker(startDateOptions);
    $('.end-time-picker').datetimepicker(endDateOptions);
    $('input[type=radio][name=date_type]').on('change', displayCorrectDatepicker);
  },

  initAddTaskLink: function(oppId, oppStartTime) {
    $('#opp-edit-tasks').append('<button class="add-task btn btn-primary margin-top">+ Add Task</button>');
    $('.add-task').on('click', function() {
      var model = new iY.TaskItem({
        volunteers_needed: 1,
        opp_id: oppId,
        opp_type_deprecated: 'Opp',
        start_time: oppStartTime
      });
      model.once('sync', function () {
        $('.add-task').show();
      });
      $(this).hide().before(new iY.OppTaskView({ model: model }).showEditForm().el);
    });
  },

  renderTasks: function (tasksJSON) {
    var frag = document.createDocumentFragment();
    _.each(tasksJSON, function (task) {
      task = new iY.TaskItem(task);
      frag.appendChild(new iY.OppTaskView({ model: task }).render().el);
    });
    $('#opp-edit-tasks').append(frag);
  },

  setupForm: function () {
    iY.oppWizard.addValidations();
    iY.oppWizard.dateFields();
  }
};
