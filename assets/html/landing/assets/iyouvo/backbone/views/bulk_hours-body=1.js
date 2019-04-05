iY.BulkHoursView = Backbone.View.extend({
  el: ".bulk-log-hours",

  events: {
    "click #apply_hours_btn": "applyHoursToVols",
    "click #clear_hours_btn": "clearHoursForm",
    "click #add_volunteer_btn": "addVolunteer",
    "click .remove_user": "removeVolunteer",
    "submit #bulk_hours_form": "disableSubmitButton"
  },

  initialize: function (opts) {
    this.options = opts;
    this.hoursView = new iY.HoursView(this.options);
    this.updateLogHoursButtonStatus();
  },

  applyHoursToVols: function() {
    if (this.hoursView.$('#group').val()) {
      var vols = this.$('#volunteers');
      vols.find('.user_loggable_id').val(this.hoursView.model.get('loggable_id'));
      vols.find('.user_loggable_type').val(this.hoursView.model.get('loggable_type'));
      vols.find('.user_comments').val(this.hoursView.$('#user_activity_comments').val());
      vols.find('.user_service_learning').val(this.hoursView.$('#service_learning').is(":checked"));
      vols.find('.user_context').text($.trim(this.activityContext()));
      var hours = $('#user_activity_hours').val();
      if(hours !== '') {
        vols.find('.user_hours').val(hours);
      }
      var activity_date = $('#user_activity_activity_date').val();
      if(activity_date !== '') {
        vols.find('.user_date').val(activity_date);
      }
    }
    else {
      $(document).trigger('flash:warning', { message: 'Please enter a nonprofit to log hours for.', top: $(document).scrollTop() });
    }
  },

  activityContext: function() {
    var type = this.hoursView.model.get('loggable_type');
    if (type === 'Group') {
      return this.hoursView.$('#group').val();
    } else if (type === 'Opp') {
      return this.hoursView.$('#event option:selected').text();
    } else if (type === 'Task') {
      return this.hoursView.$('#opportunity option:selected').text();
    } else {
      // TODO: Would it be more appropriate to `throw('Unexpected loggable_type')`?
      return '';
    }
  },

  clearHoursForm: function() {
    this.hoursView.clear();
    this.hoursView.$('#group').removeClass('icon-clear').addClass('icon-search');
  },

  addVolunteer: function() {
    if (this.$('#user_id').val()) {
      var loggable_id, loggable_type, user_context, comments, hours, activity_date, service_learning = '', pro_bono = '';

      if (this.hoursView.$('#group').val()) {
        loggable_id = this.hoursView.model.get('loggable_id');
        loggable_type = this.hoursView.model.get('loggable_type');
        user_context = $.trim(this.activityContext());
        comments = this.hoursView.$('#user_activity_comments').val();
        hours = $('#user_activity_hours').val();
        activity_date = $('#user_activity_activity_date').val();
        service_learning = $('#service_learning').is(":checked");
        pro_bono = $('#pro_bono').is(":checked");
      }

      var row = iY.template('user_activities/user_hours_row', {
        first_name: this.$('#first_name').val(),
        last_name: this.$('#last_name').val(),
        user_id: this.$('#user_id').val(),
        loggable_id: loggable_id,
        loggable_type: loggable_type,
        user_context: user_context,
        comments: comments,
        hours: hours,
        activity_date: activity_date,
        service_learning: service_learning,
        pro_bono: pro_bono
      });

      var $row = $(row);
      $row.find('input.user_date').datepicker();
      $row.appendTo('#volunteers');
      this.$('#add_volunteer').val('').removeClass('icon-clear').addClass('icon-search');
      this.$('#first_name, #last_name, #user_id').val('');
      this.updateLogHoursButtonStatus();
    }
    return false;
  },

  removeVolunteer: function(e) {
    if (window.confirm("Are you sure you want to remove this volunteer?")) {

      $(e.target).closest('tr').remove();
      this.updateLogHoursButtonStatus();
    }
    return false;
  },

  disableSubmitButton: function() {
    this.$('#log_hours_button').prop('disabled', true);
  },

  updateLogHoursButtonStatus: function() {
    this.$('#log_hours_button').prop('disabled', $('#volunteers tr').size() <= 1);
  }
});

// update the data value (sum of all hours) when submitting the table
// triggers a ga event when finished updating
$(function(){
  $('#log_hours_button').click(function (e) {
    var user_col = $('.user_hours');
    var user_hrs = user_col.map( function () {
      return parseInt($(this).val(),10) || 0;
    });

    var expect_hrs = _.reduce(user_hrs, function(sum, hr) { return sum + hr; }, 0);

    $('#log_hours_button').data('value', expect_hrs);

    $('body').trigger('ga:bulkLogHoursComplete', $('#log_hours_button').data('value') );
  });
});
