


(function ($) {
  // precache icons
  var geoLocOnImg = new Image();
  geoLocOnImg.src = "http://localhost:3000/assets/current-location.png";
  var geoLocOffImg = new Image();
  geoLocOffImg.src = "http://localhost:3000/assets/current-location-off.png";
  var iconWidth = 25;

  var isInBound = function (e, el, iconW) {
    var offsetX = e.clientX - el.offset().left,
        w = el.outerWidth();
    return (offsetX > w - iconW);
  };

  iYouVo.geosearch = function (el) {
    var el = $(el);

    if (el.length > 0) {
      if (!el.val()) {
        el.parent().parent().find('#radius').hide();
      } else if(el.parent().parent().find('#radius').val() !== "all") {
        el.parent().parent().find('#radius').show();
      }

      // if permanent_location is set, that means geolocation is not enabled for this user
      if (el.parent().parent().find('#permanent_location').val() ||
          el.parent().parent().find('#no_geolocation').val()) {
        el.removeClass('icon-current-location-off').removeClass('icon-current-location');
        // bindings
        el.on({
          keyup: function () {
            if (el.val()) {
              el.parent().parent().find('#location_cleared').val("");

              if(el.parent().parent().find('#radius').is(":hidden")) {
                el.parent().parent().find('#radius').val("50");
                el.parent().parent().find('#radius').show();
              }
            } else {
              el.parent().parent().find('#location_cleared').val("true");
              el.parent().parent().find('#radius').hide();
              el.parent().parent().find('#radius').val("all");
            }
          },
          change: function (e) {
            var el = $(this);
            if (el.val()) {
              el.parent().parent().find('#location_cleared').val("");

              if(el.parent().parent().find('#radius').is(":hidden")) {
                el.parent().parent().find('#radius').val("50");
                el.parent().parent().find('#radius').show();
              }
            } else {
              el.parent().parent().find('#location_cleared').val("true");
              el.parent().parent().find('#radius').hide();
              el.parent().parent().find('#radius').val("all");
            }
          }
        });
      } else {  //use geolocation for this user since they've enabled it
        if (el.val()) {
          if (el.val() === "Current Location") {
            el.removeClass('icon-current-location-off').addClass('icon-current-location');
          } else {
            el.removeClass('icon-current-location').addClass('icon-current-location-off');
          }
          el.parent().parent().find('#location_cleared').val("");
        } else {
          el.removeClass('icon-current-location').addClass('icon-current-location-off');
          el.parent().parent().find('#location_cleared').val("true");
        }

        // bindings
        el.on({
          click: function (e) {
            var el = $(this);
            if (isInBound(e, el, iconWidth) && el.hasClass('icon-current-location-off')) {
              el.val("Current Location");

              if(el.parent().parent().find('#radius').is(":hidden")) {
                el.parent().parent().find('#radius').val("50");
                el.parent().parent().find('#radius').show();
              }
              el.removeClass('icon-current-location-off').addClass('icon-current-location');
              el.parent().parent().find('#location_cleared').val("");
            }
            else {
              el.val("");
              el.parent().parent().find('#radius').val("all");
              el.parent().parent().find('#radius').hide();
              el.removeClass('icon-current-location').addClass('icon-current-location-off');
              el.parent().parent().find('#location_cleared').val("true");
            }
          },
          keyup: function () {
            if (el.val()) {
              if (el.val() === "Current Location") {
                el.removeClass('icon-current-location-off').addClass('icon-current-location');
              } else {
                el.removeClass('icon-current-location').addClass('icon-current-location-off');
              }
              el.parent().parent().find('#location_cleared').val("");

              if(el.parent().parent().find('#radius').is(":hidden")) {
                el.parent().parent().find('#radius').val("50");
                el.parent().parent().find('#radius').show();
              }
            } else {
              el.removeClass('icon-current-location').addClass('icon-current-location-off');
              el.parent().parent().find('#location_cleared').val("true");
              el.parent().parent().find('#radius').val("all");
              el.parent().parent().find('#radius').hide();
            }
          },
          change: function (e) {
            var el = $(this);
            if (el.val()) {
              if (el.val() === "Current Location") {
                el.removeClass('icon-current-location-off').addClass('icon-current-location');
              } else {
                el.removeClass('icon-current-location').addClass('icon-current-location-off');
              }
              el.parent().parent().find('#location_cleared').val("");

              if(el.parent().parent().find('#radius').is(":hidden")) {
                el.parent().parent().find('#radius').val("50");
                el.parent().parent().find('#radius').show();
              }
            } else {
              el.removeClass('icon-current-location').addClass('icon-current-location-off');
              el.parent().parent().find('#location_cleared').val("true");
              el.parent().parent().find('#radius').val("all");
              el.parent().parent().find('#radius').hide();
            }
          }
        });
      }
    }
  };
})(jQuery);
