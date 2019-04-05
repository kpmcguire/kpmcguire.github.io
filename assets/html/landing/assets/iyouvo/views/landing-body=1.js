(function($) {
  $(function() {
    var monsters = $('[data-picture]');
    if (monsters.length) {
      monsters.on({
        click: function () {
          var monster = $(this);
          if (monster.hasClass('active')) {
            monster.removeClass('active');
            $('#user_default_picture').val("");
          }
          else {
            monsters.removeClass('active');
            monster.addClass('active');
            $('#user_default_picture').val(monster.data('picture'));
          }
        }
      });
    }

    // validate avatar and monster
    $('#finish_signup').on('click', function (e) {
      var hasDefaultPicture = !$('#user_default_picture').val();
      var hasCustomPicture = !$('.preview img.image-uploader').attr('src');

      if (monsters.length && hasDefaultPicture && hasCustomPicture) {
        $(document).trigger('flash:error', {
          message: "Please upload your profile photo or choose one of the monstrous avatars.",
          top: '80px',
          left: '20px'
        });
        e.preventDefault();
      } else if (($('#finish_signup').attr('title') == 'Image not valid') || ($('#finish_signup').attr('title') == 'Image too large')) {
        $(document).trigger('flash:error', {
          message: "Please choose a different picture. " + $(this).attr('title'),
          top: '80px',
          left: '20px'
        });
        e.preventDefault();
      } else {
        $('#creating_user_modal').modal('show');
      }
    });
  });

})(jQuery);
