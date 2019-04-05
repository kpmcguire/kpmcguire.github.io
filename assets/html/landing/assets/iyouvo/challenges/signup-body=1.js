(function($) {

  iY = iY || {};
  iY.Challenges = iY.Challenges || {};
  iY.Challenges.signup = function($signupContainer) {
    var spinner = $signupContainer.find('.spinner');
    var button = $signupContainer.find('button');

    spinner.show();
    button.hide();

    $.ajax({
      url: '/challenges/signup',
      method: 'POST',
      data: { id: button.data('id') },
      success: function(response) {
        spinner.hide();
        var label = $('<div class="subheading">Joined</div>');
        $signupContainer.html(label);
        $(document).trigger('flash:info', { message: response, top: $(document).scrollTop() })
      }
    });

  };

}(jQuery));
