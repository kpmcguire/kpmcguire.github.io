iYouVo.datePickerOptions = {
  dateFormat: 'm/d/yy',
  beforeShow: function (input, inst) {
    setTimeout(function () {
      var input_index = parseInt($(input).css('z-index'), 10);
      if (!isNaN(input_index)) {
        $('#ui-datepicker-div').css('z-index', input_index + 1);
      }
    }, 500);
  },
  controlType: 'select',
  stepMinute: 15,
	timeFormat: 'h:mm tt'
};

// for use with moment.js
iY.dbDateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

iY.initDatePickers = function () {
  var dateInputs = $('input.date');
  var datetimeInputs = $('input.datetime');

  if (dateInputs.length) {
    dateInputs.datepicker(iYouVo.datePickerOptions);
  }
  if (datetimeInputs.length) {
    datetimeInputs.datetimepicker(iYouVo.datePickerOptions);
  }
};
