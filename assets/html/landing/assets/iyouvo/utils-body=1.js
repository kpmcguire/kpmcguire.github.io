$(function() {

  iY = iY || {};

  /* iY.Utils is deprecated.  Use iY.utils.  Upper camel case
  should only be used for constructor functions. -Jared 2014-05-20 */
  iY.Utils = iY.Utils || {};
  iY.utils = iY.Utils;

  iY.utils.assertPositiveNonzeroInteger = function(obj) {
    'use strict';
    if (!iY.utils.isPositiveNonzeroInteger(obj)) {
      throw 'Expected positive nonzero integer, got: ' + obj;
    }
  };

  iY.utils.centsToDollars = function(cents, addDollarSign) {
    'use strict';
    var dollars = (parseFloat(cents) / 100).toFixed(2);
    return addDollarSign ? '$' + dollars : dollars;
  };

  iY.utils.isPositiveNonzeroInteger = function(obj) {
    'use strict';
    return _.isNumber(obj) && obj > 0;
  };

  iY.utils.parseIntWithDefault = function(str, dflt) {
    'use strict';
    var x = parseInt(str, 10);
    if (_.isNaN(x)) { x = dflt; }
    return x;
  };

  iY.utils.formattedDateString = function(date) {
    return (date !== null) ? new Date(date).toDateString() : '';
  };

  /* ----------------------------
  Everything below this line is deprecated.  See note above
  re: `Utils` vs. `utils`. -Jared 2014-05-20
  ------------------------------- */

  iY.Utils.maxlengthFor = function(input) {

    input.on('keypress', function(event) {
      var maxlength = input.attr('maxlength');
      if(input.val().length >= maxlength) {
        event.preventDefault();
      }
    });

    input.on('paste', function(event) {
      var maxlength = input.attr('maxlength');
      var pastedText = iY.Utils.getClipboardText();

      if(pastedText.length >= maxlength) {
        var newInputText = pastedText.substring(0, maxlength);
        input.val(newInputText);
        event.preventDefault();
      }
    });
  };

  iY.Utils.getClipboardText = function(event) {
    var pastedText;
    if (window.clipboardData && window.clipboardData.getData) { // IE
      pastedText = window.clipboardData.getData('Text');
    } else if (event.clipboardData && event.clipboardData.getData) { // Other browsers
      pastedText = event.clipboardData.getData('text/plain');
    }
    return pastedText
  };
});
