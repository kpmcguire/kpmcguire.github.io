// activates form button after on of the choices is made
(function ($) {
  $.fn.radioCollection = function () {

    var enable = function (button) {
      button.removeClass('disabled');
      button.removeAttr('disabled');
    }

    this.each(function (index, item) {
      var button = $(item).find('input[type=submit]');
      button.attr('disabled', 'disabled');

      if ($(item).find('[type=radio]:checked').size() > 0) {
        enable(button);
      }
      else {
        $(item).find('[type=radio]').on('click', function () {
          enable(button);
        });
      }
    });
  };

  $(function () {
    $('[data-role="radio_collection"]').radioCollection();
  });
})(jQuery);


