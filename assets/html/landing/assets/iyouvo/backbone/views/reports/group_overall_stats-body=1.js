$(function() {
  iY.GroupOverallStatsView = iY.Reports.AbstractReportView.extend({

    initialize: function(opts) {
      this.options = opts;
      _.bindAll(this, 'render');
      iY.ReportDefaults.setupAjax(this);
      var view = this;

      this.options.hours_types = this.options.hours_types || 'indirect';

      this.members_data_url = iY.analyticsBaseURL + '/groups/' +
        this.options.group_id + '/members';
      this.hours_data_url = iY.analyticsBaseURL + '/groups/' +
        this.options.group_id + '/hours';
      this.activities_data_url = iY.analyticsBaseURL + '/groups/' +
        this.options.group_id + '/active_opps';

      this.ajaxOptions = {
        'hours_types': view.options.hours_types,
        'active': true
      };

      this.render();
    },

    renderValues : function(hoursRes, svcRes, probonoRes, memRes, oppsRes, view) {
      var hours = parseInt(hoursRes[0].content.total, 10) || 0;
      var activeMembers = parseInt(memRes[0].active, 10);
      var inactiveMembers = parseInt(memRes[0].total, 10) - activeMembers;

      var membersData = [
        {
          name:'Active',
          y: activeMembers
        },
        {
          name:'Inactive',
          y: inactiveMembers
        }
      ];

      var highcartsOptions = _.extend({}, iY.ReportDefaults.donutChartOptions,
        {
          plotOptions: {
            pie: {
              colors: ['#8BC540', '#72983E'],
              innerSize:'75%',
              dataLabels:{enabled:false}
            }
          },
          series: [{
            name:'Members',
            data: membersData
          }]
        }
      );

      $(view.el).empty()
        .append(iY.reportsSection('members_stats_section'))
        .find('#members_stats_section').html(iY.membersStatsTemplate(activeMembers, inactiveMembers))
        .find('#members_stats_graph')
        .highcharts(highcartsOptions);

      $(view.el).append(iY.reportsSection('hours_stats'));
      $(view.el).find('#hours_stats').append(iY.hoursSection('hours_stats_section'))
        .find('#hours_stats_section').html(iY.hoursStatsTemplate(hours));

      if(typeof svcRes == 'object') {
        var svchours = svcRes[0].content.total;
        svchours = svchours || 0;
        if (svchours > 0) {
          $(view.el).find('#hours_stats').append(iY.hoursValueSection('service_hours_stats_section'))
            .find('#service_hours_stats_section').html(iY.hoursSvcStatsTemplate(svchours));
        }
      }

      if(typeof probonoRes == 'object') {
        var probonohours = probonoRes[0].content.total;
        probonohours = probonohours || 0;
        if (probonohours > 0) {
          $(view.el).find('#hours_stats').append(iY.hoursValueSection('probono_hours_stats_section'))
            .find('#probono_hours_stats_section').html(iY.hoursProbonoStatsTemplate(probonohours));
        }
      }

      var uniqueOpps = $.parseJSON(oppsRes[2].responseText).programs.length;

      var words = [];
      if(memRes[0].active == 1) {
        words[0] = ' member';
        words[1] = ' has ';
      } else {
        words[0] = ' members';
        words[1] = ' have ';
      }

      words[2] = uniqueOpps == 1 ? ' opportunity' : ' opportunities';

      $(view.el).append(iY.GroupOverallStats.fullReportSectionTemplate({
        active: memRes[0].active + ' active' + words[0],
        words:  words[1],
        uniqueOpps: uniqueOpps + words[2]
      }));
    },

    render: function() {
      var view = this;
      var members_data_url = this.members_data_url;
      var hours_data_url = this.hours_data_url;
      var activities_data_url = this.activities_data_url;

      var svcAjaxOptions = _.extend({}, this.ajaxOptions, { 'svc': true });
      var probonoAjaxOptions = _.extend({}, this.ajaxOptions, { 'probono': true });
      var allTypeAjaxOptions = _.extend({}, svcAjaxOptions, { 'probono': true });

      var activeMembersAjax = $.ajax({
        url: members_data_url,
        data: this.options.group_type == 'school' ? svcAjaxOptions : this.ajaxOptions
      });

      var hoursAjax = $.ajax({
        url: hours_data_url,
        data: view.ajaxOptions
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

      var activeOppsAjax = $.ajax({
        url: activities_data_url,
        data: view.ajaxOptions
      });

      $(view.el).empty().html($('.loading-indicator').html());
      $.when(hoursAjax, svcAjax, probonoAjax, activeMembersAjax, activeOppsAjax, view)
        .then(view.renderValues)
        .fail(function() {
          iY.ReportDefaults.handleChartAjaxErrorFor(view);
        });
    }
  });

  iY.reportsSection = function(id) {
    var html = '<div class="col-md-6"><div class="reports_section" id="' + id + '"></div></div>';

    return _.template(html);
  };

  iY.hoursSection = function(id) {
    var html = '<div id="' + id + '"></div>';

    return _.template(html);
  };

  iY.hoursValueSection = function(id) {
    var html = '<div id="' + id + '"></div>';

    return _.template(html);
  };

  iY.membersStatsTemplate = function(active, inactive) {
    return iY.template('reports/members_stats', {
        active: active,
        inactive: inactive,
        total: active + inactive
      });
  };

  iY.hoursStatsTemplate = function(hours) {
    return iY.template('reports/hours_stats', {
      totalHoursNumber:  (Math.round(10 * hours) / 10).toFixed(1),
      totalHoursValue:  Math.round(hours * iY.hourlyMonetaryValue),
      totalHoursText: 'total hours',
      totalValueText: 'value of total hours'
    });
  };

  iY.hoursSvcStatsTemplate = function(svchours) {
    return iY.template('reports/hours_stats', {
      totalHoursNumber: (Math.round(10 * svchours) / 10).toFixed(1),
      totalHoursValue: Math.round(svchours * iY.hourlyMonetaryValue),
      totalHoursText: 'service learning hours',
      totalValueText: 'value of service learning hours'
    });
  };

  iY.hoursProbonoStatsTemplate = function(probonohours) {
    return iY.template('reports/hours_stats', {
      totalHoursNumber: (Math.round(10 * probonohours) / 10).toFixed(1),
      totalHoursValue: Math.round(probonohours * iY.hourlyMonetaryValue),
      totalHoursText: 'pro bono hours',
      totalValueText: 'value of pro bono hours'
    });
  };
});
