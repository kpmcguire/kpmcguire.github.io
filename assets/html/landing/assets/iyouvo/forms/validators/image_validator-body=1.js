iY.forms.validators.imageValidator = function(el) {

  return iY.forms.validators.base({
    el: $(el),
    event: 'change:image',
    isValid: function() {
      var val = $(el).find('img.image-uploader').prop('src');
      return iY.forms.utils.isValidImage(val);
    },
    tooltipText: 'logo must be gif, png, or jpg'
  });

};
