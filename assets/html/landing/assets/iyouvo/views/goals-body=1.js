$(function() {
  'strict';

  initDatePicker($('#new_goal #goal_end_time'));
  animateProgressMeter($('.goal-show .progress-bar.bar'));

  $('.goal-section').on("click", "input.datetime", function(){
    if (!$(this).hasClass("hasDatepicker")) {
      initDatePicker($(this));
      $(this).datepicker("show");
    }
  });

  $('body').on('ajax:success', '#new_goal', function(xhr, response, status) {
    $(this).closest('.goal-create').replaceWith(response);
//  Display modal for congratulations users here
    animateProgressMeter($('.progress-bar.bar'));
    $('#goal-creation-modal').modal('show');
    iY.initSocialShare($('#goal-creation-modal'), iY.fb.shareGoals);
  });

  $('body').on('ajax:success', '.goal-delete', function(xhr, response, status) {
    iY.flashNotice("Your goal has been deleted.");
    var showCreateFormUrl = '/users/' + response.user_id + '/goals/new';
    $(this).closest('.goal-section').load(showCreateFormUrl);
  });

  function animateProgressMeter($el) {
    var percent = $el.attr('aria-valuenow');
    var width = Math.min(100, percent) +'%';
    $el.css('width', width);
  }

  function initDatePicker($el) {
    $el.datepicker(
      { minDate: new Date() }
    );
  }
});
