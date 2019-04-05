(function($) {
  $(document).bind("application:ready", function() {

    $.fn.showPreview = function() {
      this.each(function() {
        var el = $(this);
        el.html(iY.template('tasks/show_more_content', { content: el.html() }));
        var container = el.find('.jq-show-more-container');
        var toggleLink = el.find('.jq-show-more-toggle');
        var maxHeight = el.data('max-height') || 120;

        container.css('maxHeight', maxHeight);

        var toggleDisplay = function() {
          container.toggleClass('expanded');
          var expanded = container.hasClass('expanded');
          container.css('maxHeight', expanded ? 'none' : maxHeight);
          toggleLink.html(expanded ? 'show less' : 'show more');
        };

        if (el.find('.jq-show-more-content').height() > maxHeight) {
          toggleLink.show().on('click', toggleDisplay);
        }
      });
    };

    $('.jq-show-more').showPreview();
  });
})(jQuery);
