iY.forms.validators.conditionallyRequiredField = function(field, conditionFn, opts) {
  opts = opts || {};
  _.extend(opts, {
    el: $(field),
    isValid: function() {
      return (!conditionFn()) || iY.forms.utils.isPresent(field);
    },
    tooltipText: 'this field is required'
  });

  return iY.forms.validators.base(opts);
};
