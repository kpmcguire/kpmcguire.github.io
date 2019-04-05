$(function() {
  iY.GroupScopedStatsView = iY.Reports.AbstractReportView.extend({
    initialize: function(opts) {
      this.options = opts;
      _.bindAll(this, 'render', 'update');
      iY.ReportDefaults.setupAjax(this);
      iY.ReportDefaults.scopeToDates(this);
      this.options.hours_types = this.options.hours_types || "indirect"
      this.render();
    },

    render: function() {
      var view = this;
      var members_data_url = iY.analyticsBaseURL + '/groups/' +
        this.options.group_id + '/members';
      var hours_data_url = iY.analyticsBaseURL + '/groups/' +
        this.options.group_id + '/hours';

      var ajaxOptions = {
        'start': moment(view.options.start_date).format('YYYY-M-D'),
        'end': moment(view.options.end_date).format('YYYY-M-D'),
        'hours_types': view.options.hours_types,
        'active': true
      };

      var svcAjaxOptions = _.extend({}, ajaxOptions, { 'svc': true });
      var probonoAjaxOptions = _.extend({}, ajaxOptions, { 'probono': true });
      var allTypeAjaxOptions = _.extend({}, svcAjaxOptions, { 'probono': true });


      var activeMembersAjax = $.ajax({
        url: members_data_url,
        data: this.options.group_type == 'school' ? svcAjaxOptions : allTypeAjaxOptions
      });

      var hoursAjax = $.ajax({
        url: hours_data_url,
        data: ajaxOptions
      });

      var svcAjax;
      if(view.options.group_type == 'school') {
        svcAjax = $.ajax({
          url: hours_data_url,
          data: svcAjaxOptions
        });
      } else {
        svcAjax = true;
      }

      var probonoAjax;
      probonoAjax = $.ajax({
        url: hours_data_url,
        data: probonoAjaxOptions
      });

      var renderValues = function(hoursRes, svcRes, probonoRes, memRes) {
        var hours = hoursRes[0].content.total || 0;
        var activeMembers = parseInt(memRes[0].active, 10);
        var activeLearners = parseInt(memRes[0].active_service, 10);
        hours = parseInt(hours, 10);

        $(view.el).empty().append(iY.reportsSection('hours_per_section'))
          .find('#hours_per_section').html(iY.hoursPerTemplate(hours, activeMembers, 'member'));

        if(typeof svcRes == 'object') {
          var svchours = svcRes[0].content.total;
          svchours = parseInt(svchours, 10) || 0;
          if (svchours > 0) {
            $(view.el).append(iY.reportsSection('svchours_per_section'))
              .find('#svchours_per_section').html(iY.hoursPerTemplate(svchours, activeLearners, 'service learning'));
          }
        }

        if(typeof probonoRes == 'object') {
          var probonohours = probonoRes[0].content.total;
          probonohours = parseInt(probonohours, 10) || 0;
          if (probonohours > 0) {
            $(view.el).append(iY.reportsSection('probonohours_per_section'))
            .find('#probonohours_per_section').html(iY.hoursPerTemplate(probonohours, activeLearners, 'pro bono'));
          }
        }

        $(document).trigger('document:resize');
      };

      $(view.el).empty().html($('.loading-indicator').html());
      $.when(hoursAjax, svcAjax, probonoAjax, activeMembersAjax)
        .then(renderValues)
        .fail(function(){
          iY.ReportDefaults.handleChartAjaxErrorFor(view);
        });
    },

    update: function(event, data) {
      this.options.start_date = moment(data.start_date).toDate();
      this.options.end_date = moment(data.end_date).toDate();
      this.render();
    }
  });

  iY.hoursPerTemplate = function(hours, active, type) {
    var activeText = 'active ';
    var totalHoursClasses;
    switch(type)
    {
      case 'service learning':
        activeText += 'service learner';
        totalHoursClasses ='sprite-chart-svc'
        break;
      case 'pro bono':
        activeText += 'pro bono volunteer';
        totalHoursClasses = 'sprite-pro-bono-icon'
        break;
      default:
        activeText += type;
        totalHoursClasses = 'sprite-chart-hours'
    }
//    activeText += (type === 'service learning' ? 'service learner' : type)
    activeText += (active == 1 ? '' : 's');

    var hoursPerMemberNumber = 0;
    var hoursPerMemberText = 'hours per member';
    if(hours > 0 && active > 0) {
      var toBeRounded = 10 * (parseFloat(hours) / active);
      hoursPerMemberNumber = (Math.round(toBeRounded) / 10).toFixed(1);
      hoursPerMemberText += (hours == 1 ? '' : 's');
    }

    return iY.template('reports/hours_per', {
      totalHoursClasses: totalHoursClasses,
      totalHoursNumber: (Math.round(10 * hours) / 10).toFixed(1),
      totalHoursText: type + ' hour' + (hours == 1.0 ? '' : 's'),
      activeNumber: active,
      activeText: activeText,
      hoursPerMemberNumber: hoursPerMemberNumber,
      hoursPerMemberText: hoursPerMemberText
    });
  };
});
