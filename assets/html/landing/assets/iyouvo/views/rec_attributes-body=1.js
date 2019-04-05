$(function() {
  iY.addTagCallback = function(e, data) {
    if (data.message) {
      $(document).trigger('flash:info', { message: data.message, top: $(document).scrollTop() });
    }
    else {
      $('#user_tags').append('<span class="tag">' + data.name + ' <a href="#" data-url="' + data.remove_url + '">&times;</a></span>');
      $('#user_tags .tag a').last().click(iY.removeTag);
      $('#new_tag_name').val('').removeClass('icon-clear').addClass('icon-search');
    }
  };

  iY.removeTag = function(e) {
    var el = $(e.target);
    $.get(el.data('url'), {}, function(data) {
      $(document).trigger('flash:info', { message: data, top: $(document).scrollTop() });
      el.parent().fadeOut();
    });
    return false;
  };

  iY.recAttrPopover = function(el, ra, placement) {
    el.popover({
      title: iY.RecAttrs.recAttrPopoverTitleTemplate({image_url: ra.picture_url, name: ra.name}),
      content: ra.description,
      placement: placement,
      animation: false,
      container: 'body',
      trigger: 'hover',
      html: true
    });
  };
});
