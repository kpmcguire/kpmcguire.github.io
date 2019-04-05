iY.forms.validators.requiredField = function(el) {

  return iY.forms.validators.base({
    el: $(el),
    isValid: function() {
      return iY.forms.utils.isPresent(el);
    },
    tooltipText: 'this field is required'
  });
};
