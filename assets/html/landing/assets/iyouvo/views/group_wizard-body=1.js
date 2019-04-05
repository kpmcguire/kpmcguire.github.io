iY.groupWizard = {

  validatorsFor: function(step) {
    if (step === 'info') {
      return [
        iY.forms.validators.imageValidator('#logo-uploader'),
        iY.forms.validators.requiredField('#temp_group_name'),
        iY.forms.validators.requiredField('#temp_group_who_we_are')
      ];
    } else {
      return [
        iY.forms.validators.emailValidator('#contactable_email'),
        iY.forms.validators.requiredField('#contactable_name'),
        iY.forms.validators.requiredField('#temp_group_address_attributes_postal_code')
      ];
    }
  },

  initialize: function(step) {
    var options = {
      form: '#temp_group_' + step,
      validators: this.validatorsFor(step)
    };
    $('#wizard-submit').on('click', function() {
      $(options.form).submit();
    });
    iY.forms.validations.initialize(options);
  }

};
