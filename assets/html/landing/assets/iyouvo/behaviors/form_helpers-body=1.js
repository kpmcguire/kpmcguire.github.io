iY.formHelpers = {
  checkForm: function($form, validator) {
    var submit = 'input[type=submit]';
    var $submit_button = $form.find(submit);
    $form.find('input[type=submit]').prop('disabled', !validator);
  }
};
