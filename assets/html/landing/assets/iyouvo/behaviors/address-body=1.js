(function ($) {
  iYouVo.address_postal_reset = function (el) {
    if ($(el).length > 0) {
      $(el).on({
        change: function (e) {
          if ($(this).val()) {
            var container = $(this).parent().parent();
            container.find('input[id$=city]').val("");
            container.find('input[id$=state_code]').val("");
            container.find('input[id$=state]').val("");
            container.find('input[id$=country_code]').val("");
            container.find('select[id$=country]').val("");

            // only reset if the user hasn't already changed
            var addr1 = container.find('input[id$=address1]').val();
            var addr1_old = container.find('input[id=address1_hidden]').val();
            if(addr1 === addr1_old) {
              container.find('input[id$=address1]').val("");
            }

            // only reset if the user hasn't already changed
            var addr2 = container.find('input[id$=address2]').val();
            var addr2_old = container.find('input[id=address2_hidden]').val();
            if(addr2 === addr2_old) {
              container.find('input[id$=address2]').val("");
            }
          }
        }
      });
    }
  }
})(jQuery);
