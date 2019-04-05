iY.validateSignupWizard = function() {
  var isPresent = function(e) { return $(e).val() !== ''; };
  var isValidPasswordLength = function (e) { return $(e).val().length >= 6 && $(e).val().length < 128 };
  var isValidEmail = function(e) { var pattern = iY.Wizard.invalidEmailRegex; return pattern.test($(e).val()); };

  var checkPresent = function(e) {
    if (!isPresent(e)) $(e).attr('title','this field is required').tooltip('fixTitle').tooltip('show');
    else $(e).tooltip('hide');
  };

  var checkPassword = function(e) {
    if (!(isPresent(e))) $(e).attr('title','this field is required').tooltip('fixTitle').tooltip('show');
    else if (!isValidPasswordLength(e)) $(e).attr('title', 'must be at least 6 characters').tooltip('fixTitle').tooltip('show');
    else $(e).tooltip('hide');
  };

  var checkEmail = function(e) {
    if (!(isPresent(e))) $(e).attr('title','this field is required').tooltip('fixTitle').tooltip('show');
    else if (!isValidEmail($(e))) $(e).attr('title','must be valid').tooltip('fixTitle').tooltip('show');
    else $(e).tooltip('hide');
  };

  var validSignupInfo = function() {
    var email = $('#user_email');
    var pass = $('#user_password');
    var vfname = isPresent($('#user_first_name'));
    var vlname = isPresent($('#user_last_name'));
    var vzip = isPresent($('#user_address_attributes_postal_code'));
    var vemail = isPresent(email) && isValidEmail(email);
    var vpass = isPresent(pass) && isValidPasswordLength(pass);
    return (vfname && vlname && vzip && vemail && vpass);
  };

  var validateSignupInfo = function() {
    if (validSignupInfo()) {
      $('#finish_signup').prop("disabled", false).attr('title', "That's it!").tooltip('fixTitle').tooltip({container:'body'},'show').removeClass('disabled');
    } else {
      var email = $('#user_email');
      var pass = $('#user_password');
      var missing = [];
      if(!isPresent($('#user_first_name'))) {
        missing.push("your first name");
      }
      if(!isPresent($('#user_last_name'))) {
        missing.push("your last name");
      }
      if(!isPresent(email) || !isValidEmail(email)) {
        missing.push("your email");
      }
      if(!isPresent($('#user_address_attributes_postal_code'))) {
        missing.push("your ZIP/postal code");
      }
      if(!isPresent(pass) || !isValidPasswordLength(pass)) {
        missing.push("a valid password");
      }
      if (missing.length > 1) missing[missing.length-1] = "and " + missing[missing.length-1];
      $('#finish_signup').tooltip({container:'body'},'hide').attr('title', "We still need " + missing.join(', ') + "!")
        .tooltip('fixTitle').addClass('disabled');
    }
  };

  var opts = { placement: "right", trigger: "manual" };
  $('#user_first_name').tooltip(opts).tooltip('hide').blur(function() { checkPresent($(this)); });
  $('#user_last_name').tooltip(opts).tooltip('hide').blur(function() { checkPresent($(this)); });
  $('#user_address_attributes_postal_code').tooltip(opts).tooltip('hide').blur(function() { checkPresent($(this)); });
  $('#user_email').tooltip(opts).tooltip('hide').blur(function() { checkEmail($(this)); });
  $('#user_password').tooltip(opts).tooltip('hide').blur(function() { checkPassword($(this)); });

  if ($('#user_new #user_first_name').length > 0) {
    validateSignupInfo();
    $('#user_new').submit(function() {
      if (validSignupInfo()) { $(document).trigger('signup:valid'); return true; }
      else return false;
    });
    $('#user_first_name, #user_last_name, #user_address_attributes_postal_code, #user_email, #user_password').blur(function() {
      validateSignupInfo();
      $('#user_new').submit(function() {
        if (validSignupInfo()) { $(document).trigger('signup:valid'); return true; }
        else return false;
      });
    });
  }
};
