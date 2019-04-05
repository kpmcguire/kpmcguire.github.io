
iYouVo.analyticsBaseURL     = 'http://localhost:4444';
iYouVo.analyticsCheckURL    = iYouVo.analyticsBaseURL;
iYouVo.hourlyMonetaryValue  = '22.14';
iYouVo.analyticsDateOptions = {
  ranges: {
      'Last 7 Days': [moment().subtract('days', 6), moment()],
      'Last 30 Days': [moment().subtract('days', 29), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract('months', 1).startOf('month'), moment().subtract('months', 1).endOf('month')],
      'Last 3 Months': [moment().subtract('months', 3), moment()],
      'Last 12 Months': [moment().subtract('months', 12), moment()]
  }
};
iYouVo.schoolTotalHoursGraphOptions  = ['hours','svc','probono','total']
iYouVo.TotalHoursGraphOptions  = ['hours','probono','total']
iYouVo.infoPopoverURL = "http://localhost:3000/assets/info-icon.png";
