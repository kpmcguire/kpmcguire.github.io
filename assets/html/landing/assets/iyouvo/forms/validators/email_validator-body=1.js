iY.forms.validators.emailValidator = function(el) {

  return iY.forms.validators.base({
    el: $(el),
    isValid: function() {
      if (!iY.forms.utils.isPresent(el)) {
        iY.forms.utils.changeTooltip(el, 'this field is required');
        return false;
      } else if (!iY.forms.utils.isValidEmail(el)) {
        iY.forms.utils.changeTooltip(el, 'must be a valid email');
        return false;
      } else { return true; }
    },
    tooltipText: 'this field is required'
  });

};
