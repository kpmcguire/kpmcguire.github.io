// a little jquery plugin for flash messages
(function ($) {
  $.fn.flash = function () {
    var link = '<a class="close" data-dismiss="alert"> &times;</a>';

    return this.each(function (index, item) {
      setTimeout(function () { $(item).fadeOut(); }, 5000);
      $(document).on('flash:info flash:notice flash:error flash:warning', function (e, options) {
        var type = e.type.split(':').pop(),
            flashEl = $(item);
            opts = options || {};

        if (!flashEl.length) {
          flashEl = $('<div class="flash"></div>');
          $('body').prepend(flashEl);
        }

        flashEl
          .css({top: opts.top || '10px'})
          .html('<div class="alert alert-' + type + '">' + link + opts.message + '</div>')
          .show();

        if (opts.left) {
          flashEl.css({left: opts.left});
        }

        if (opts.persistent) {
          flashEl.addClass('persistent');
        } else {
          flashEl.removeClass('persistent');
          setTimeout(function () { flashEl.fadeOut(); }, 5000);
        }

      });
    });
  };
})(jQuery);

