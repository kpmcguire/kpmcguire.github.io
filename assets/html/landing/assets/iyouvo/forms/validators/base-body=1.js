iY.forms.validators.base = function(options) {
  options.event = options.event || 'blur';

  var tooltipOpts = {
    placement: 'bottom',
    title: options.tooltipText,
    trigger: 'manual'
  };

  var onValidate = function(valid) {
    options.el.tooltip(valid ? 'hide' : 'show');
  };

  var validate = function() {
    var valid = options.isValid();
    onValidate(valid);
    return valid;
  };

  options.el
    .tooltip(tooltipOpts)
    .on(options.event, validate);

  return { validate: validate };
};
