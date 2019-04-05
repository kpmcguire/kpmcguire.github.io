iYouVo.geolocate = {
  geolocateCurrentUser: function () {
    // Try W3C Geolocation (Preferred)
    if (iY.currentUser && navigator && navigator.geolocation) {

      var saveGeolocation = function(model, reloadPage) {
        model.save({}, {
          success: function() {
            if (reloadPage) {
              location.href = location.pathname;
            }
          },
          error: function() {
            $('#refresh_page_modal').modal('hide');
          }
        });
      };

      var success = function(position) {
        var doReload = !!$('#permanent_location').val();
        var ug = new iY.UserGeolocation({
          id: iY.currentUser.id,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });

        if (doReload) {
          $('#refresh_page_modal').modal('show');
        }
        saveGeolocation(ug, doReload);
      };

      var error = function() {
        var ug, permanentLoc = $('#permanent_location');
        if (permanentLoc.size() > 0 && !permanentLoc.val()) {
          ug = new iY.UserGeolocation({ id: iY.currentUser.id, destroy: 'true' });
          $('#refresh_page_modal').modal('show');
          saveGeolocation(ug, true);
        }
      };

      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
};
