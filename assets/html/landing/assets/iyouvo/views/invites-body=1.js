$(document).bind("application:ready", function () {
  if ($('#invite_add_email').size()) {
    $('#invite_add_email').click(function() {
      $('#emails').append(iY.Email.inviteAddEmailHtml);
      return false;
    });
    $('#emails input').on('change', function() {
      $(this).next().load('/invites/check_email_for_invite?email=' + $(this).val());
    });
    $('.email-invite-form').on('submit', function() {
      var doSubmit = false;
      var inviteCounter = 0;
      $(this).find('input[type=email]').each(function() {
        if ($.trim($(this).val()) !== '') {
          inviteCounter++;
        }
      });

      doSubmit = inviteCounter > 0;

      if (doSubmit) {
        $('body').trigger('ga:finishEmailInvite', { count: inviteCounter });
      }
      return doSubmit;
    });
  }
});
