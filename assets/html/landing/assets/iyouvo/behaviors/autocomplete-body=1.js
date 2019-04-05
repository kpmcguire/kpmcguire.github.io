

iYouVo.autocompleteFormatters = {
  contactFormatter: function (data) {
    _.forEach(data, function (item) {
      item.value = item.first_name + " " + item.last_name;
    });

    return data;
  },

  tagFormatter: function(data) {
    _.forEach(data, function (item) {
      item.value = item.name;
    });
    return data;
  }
};


// after select autocomplete handlers
iYouVo.autocompleteHandlers = {

  /**
   * @param {object} item - selected item
   */
  to: function (item) {
    $('#to_user_id').val(item.id);
  },

  cc: function (item) {
    $('#cc_user_id').val(item.id);
  },

  bcc: function (item) {
    $('#bcc_user_id').val(item.id);
  },

  tagAutocomplete: function(item) {
    if (item !== null) {
      $('#new_tag_name').val(item.name);
      $('#add_tag_form').submit();
    }
  },

  groupAdmin: function (item) {
    var val = (item === null) ? null : '/group_memberships/' + item.id;
    $('#add_admin_form').attr('action', val);

    var $form = $('#add_admin_form');

    iY.formHelpers.checkForm($form, val);
  },

  recruitedBy: function (item, e, el) {
    if (e && e.target) {
      $('#user_invited_by_id').val(item === null ? null : item.id);
    }
  },

  assignParticipant: function (item, e, el) {
    var userField = $(el).parent().parent().find('#user_assignment_user_id');
    if (item === null) {
      userField.val(null);
    } else {
      userField.val(item.id);
    }
  },

  assignTask: function (item) {
    if (item === null) {
      $('#user_assignment_user_id').val(null);
    } else {
      item.value = item.first_name + ' ' + item.last_name;
      $('#user_assignment_user_id').val(item.id);
      $('#user_email').val(item.email);

      $('#assign_member_form').submit();
    }
  },

  searchAutocomplete: function(item) {
    if (item !== null) {
      window.location = item.url;
    }
  },

  searchUsersAutocomplete: function(item) {
    if (item !== null) {

      $('#query').val(item.id);
      var user_id = item.id;
      if (item.slug && item.slug !== "nil" && item.slug !== "") {
        user_id = item.slug;
      }

      window.location.pathname = "users/" + user_id;
    }
  },

  searchGroupsAutocomplete: function(item) {
    if (item !== null && item.url) {
      $('#find').hide();
      $('#indicator').removeClass('hidden');
      window.location.pathname = item.url;
    }
  },

  addMemberAutocomplete: function(item) {
    if (item !== null) {
      item.value = item.first_name + ' ' + item.last_name;
      $('#existing_member_id').val(item.id);
      $('#user_email').val(item.email);

      $('#add_member_form').submit();
    }
  },

  fillContact: function (item, e) {
    if (item) {
      $('#contactable_email').val(item.email);
      $('#contactable_user_id').val(item.id);
    }
    else {
      $('#contactable_user_id').val("");
    }
  },

  bulkHoursAdd: function(item) {
    if (item !== null) {
      $('.bulk-log-hours #first_name').val(item.first_name);
      $('.bulk-log-hours #last_name').val(item.last_name);
      $('.bulk-log-hours #user_id').val(item.id);
    }
  },

  promoteGroup: function(item) {
    if (item !== null) {
      $('#promoted_group_term').val(item.value);
      $('#group_promotion_promoted_group_id').val(item.id);
      $('#new_group_promotion input[type=submit]').removeAttr('disabled');
    }
  }
};

(function ($) {

  // precache icon
  var syncImg = new Image();
  syncImg.src = "http://localhost:3000/assets/load.gif";
  var iconWidth = 25;

  var isInBound = function (e, el, iconW) {
    var offsetX = e.clientX - el.offset().left,
        w = el.outerWidth();
    return (offsetX > w - iconW);
  };

  iY.autocomplete = function (elm) {
    var el = $(elm);
    var url, handlerName, formatName, handler, formatter, noDataLabel, options, showMore, start;

    if (el.length > 0) {
      url = el.data('url');
      handlerName = el.data('handler');
      formatName = el.data('formatter');

      showMore = el.data('more');
      noDataLabel = el.data('nodatalabel');
      var minLength = iY.utils.parseIntWithDefault(el.data('start'), 3);

      handler = iYouVo.autocompleteHandlers[handlerName];
      formatter = iYouVo.autocompleteFormatters[formatName];

      el.addClass('icon-search');

      options = {
        showMore: showMore,
        maxPerCategory: 5,
        noDataLabel: noDataLabel,
        minLength: minLength,

        source: function (req, add) {
          el.removeClass('icon-search').addClass('icon-sync');
          $.getJSON(url, req, function (data) {
            if (data.length > 0) {
              if (formatter) {
                data = formatter(data);
              }
              add(data);
            } else {
              add(null);
            }
            el.removeClass('icon-sync').addClass('icon-clear');
          });
        },

        select: function (e, ui) {
          if (handler) {
            handler(ui.item, e, this);
          }

          $(document).trigger('autocomplete:selected', {item: ui.item, event: e, el: this});
        }
      };

      el.gabcomplete(options);

      // bindings
      el.on({
        click: function (e) {
          var el = $(this);
          if (isInBound(e, el, iconWidth) && el.hasClass('icon-clear')) {
            el.val("");
            el.removeClass('icon-clear').addClass('icon-search');
            el.trigger('autocomplete:cleared', {el: el, event: e});
            el.autocomplete('close');
            var auto_complete_data = el.autocomplete().data('autocomplete');
            if (auto_complete_data) {
                auto_complete_data.term = "";
            }
            if (handler) {
              handler(null, e, el);
            }
          }
        },
        keyup: function () {
          if (!el.val()) {
            el.removeClass('icon-clear').addClass('icon-search');
            if (handler) {
              handler(null, null);
            }
          }
        },
        mousemove: function (e) {
          var cursor = (isInBound(e, el, iconWidth) && el.val()) ? 'pointer' : 'default';
          el.css('cursor', cursor);
        }
      });

      // show clear if value set
      setTimeout(function () {
        if (el.val()) {
          el.removeClass('icon-search').addClass('icon-clear');
        }
      }, 300);
    }
  };
})(jQuery);

(function ($) {

  $.widget("custom.gabcomplete", $.ui.autocomplete, {
      _renderMenu: function(ul, items) {
        var self = this,
          category = "",
          showMore = this.options.showMore,
          max = this.options.maxPerCategory,
          counter = 0,
          footer = $('<li class="ui-menu-footer"></li>');

        if (!items) {
          var label = this.options.noDataLabel;
          if (label === "BLANK") {
            return;
          } else if (!label) {
            label = "No results found.";
          }
          ul.append('<li class="ui-menu-header ui-menu-notfound">' + label + '</li>');
          return;
        }

        if (showMore) {
          ul.append('<li class="ui-menu-header">Search Results</li>');
        }

        $.each(items, function (index, item) {
          if (item.category) {
            if (item.category != category) {
              ul.append("<li class='ui-menu-category'>" + item.category + "</li>");
              category = item.category;
              counter = 0;
            }

            if (counter < max) {
              self._renderItemData(ul, item);
              counter++;
            }
          }
          else {
            self._renderItemData(ul, item);
          }
        });

        if (showMore) {
          footer.append('<a class="ui-menu-footer-item" href="#">More results</a>');
          ul.append(footer);
        }

        // handle more results
        ul.find('.ui-menu-footer-item').on('click', function (e) {
          window.location.href = "/search?term=" + self.term;
          return false;
        });

      }
    });

  /**
   * extend autocomplete
   * to support search with categories
   */
  $.extend($.ui.autocomplete.prototype, {

    __response: function( content ) {
      // monkey-patched so that it passes even empty content through to _suggest and subsequently _renderMenu
      if (!this.options.disabled /*&& content && content.length*/) {
        if (content && content.length) {
          content = this._normalize( content );
        }
        this._suggest(content);
        this._trigger("open");
      } else {
        this.close();
      }
      this.pending--;
      if (!this.pending) {
        this.element.removeClass("ui-autocomplete-loading");
      }
    }
  });
})(jQuery);
