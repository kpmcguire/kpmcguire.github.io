iY.forms.validations = {

  initialize: function(options) {
    this.validators = options.validators;
    _.bindAll(this, 'validateForm');
    $(options.form).on('submit', this.validateForm);
  },

  validateForm: function() {
    var valid = true;
    $(this.validators).each(function() {
      if (!this.validate()) { valid = false; }
    });
    return valid;
  }

};
