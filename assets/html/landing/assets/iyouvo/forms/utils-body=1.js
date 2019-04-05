iY.forms.utils = {

  changeTooltip: function(el, text) {
    $(el).attr('title', text).tooltip('fixTitle');
  },

  isPresent: function(el) {
    return $.trim($(el).val()) !== '';
  },

  isValidEmail: function(el) {
    return iY.Wizard.invalidEmailRegex.test($(el).val());
  },

  isValidImage: function(filename) {
    return filename && this.isValidImageExtension(filename);
  },

  isValidImageExtension: function(filename) {
    var validExtensions = ['gif', 'png', 'jpg', 'jpeg'];
    var imageExtension = filename.split('.').pop().toLowerCase();
    return _(validExtensions).contains(imageExtension);
  },

  hasChronologicalDates: function(startTime, endTime) {
    var end_without_start = !startTime && endTime;
    var end_before_start = endTime && startTime && startTime > endTime;
    return !(end_without_start || end_before_start);
  }
};
