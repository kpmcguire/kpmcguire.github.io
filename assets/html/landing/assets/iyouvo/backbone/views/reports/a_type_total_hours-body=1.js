$(function() {
  iY.ATypeTotalHoursGraphView = iY.Reports.AbstractReportView.extend({
    initialize: function(opts) {
      this.options = opts;
      _.bindAll(this, "render", "renderFailure", "renderChart", "update");

      this.options.hours_type = this.options.hours_type || 'direct';
      this.options.group_by   = this.options.group_by   || 'day';
      this.options.seriesTypes = this.options.seriesTypes  || ['hours','probono','total'];

      iY.ReportDefaults.setupAjax(this);
      iY.ReportDefaults.scopeToDates(this);

      this.hoursData = [];
      this.totalData = [];

      this.render();
    },

    render: function() {
      var view = this;
      $(view.el).empty().html($('.loading-indicator').html());

      var data_url = iY.analyticsBaseURL + '/groups/' +
        this.options.group_id + '/hours';

      var dataAjax = $.ajax({
        url: data_url,
        data: {
          'group_by': view.options.group_by,
          'start': moment(view.options.start_date).format('YYYY-M-D'),
          'end': moment(view.options.end_date).format('YYYY-M-D'),
          'hours_types': this.options.hours_type
        }
      });

      $.when(dataAjax).then(view.renderChart, function() {
        iY.ReportDefaults.handleChartAjaxErrorFor(view);
      });

      return this;
    },

    renderChart: function(response) {
      var view = this;

      view.hoursData = [];
      view.totalData = [];

      var data = response.content;
      var total = 0;
      var count = 0;

      for(var key in data) {
        if (data.hasOwnProperty(key)) {
          count += 1;
          var hrs = parseInt(data[key], 10);
          total += hrs;
          var dte = Date.parse(key.substring(0, key.length - 9)); // dumb firefox thing
          view.hoursData.push([dte, hrs]);
          view.totalData.push([dte, total]);
        }
      }

      if(count < 3) {
        view.renderFailure();
      } else {
        var chartOptions = _.extend({}, view.chartOptions, {
          plotOptions: {
            series: {
              stickyTracking: true
            }
          },
          series: [
            { name: 'volunteer', data: view.hoursData, type: 'column', yAxis: 0,
              events: { legendItemClick: function(event) { return false; }}
            },
            { name: 'total', data: view.totalData, type: 'line', yAxis: 1, lineWidth: 3,
              marker: { radius: 5, lineWidth: 2, fillColor: '#FFFFFF', lineColor: '#08cabb'},
              events: { legendItemClick: function(event) { return false; }}
            }
          ],
          title: {
            useHTML: true,
            text: _.template('<span>Volunteered Hours for <%= startDate %> - <%= endDate %></span>', {
              startDate: moment(view.options.start_date).format('MMMM D, YYYY'),
              endDate: moment(view.options.end_date).format('MMMM D, YYYY')
            })
          }
        });

        $(view.el).empty().highcharts(chartOptions);
      }
      $(document).trigger('document:resize');
    },

    renderFailure: function() {
      $(this.el).html(iY.Reports.groupTotalHoursHtml);
    },

    update: function(event, data) {
      this.options.start_date = moment(data.start_date).toDate();
      this.options.end_date = moment(data.end_date).toDate();
      this.render();
    },

    chartOptions: {
      credits: { enabled: false },
      chart: { type: 'column', zoomType: 'x' },
      colors: ['#f57f20', '#715da8'],
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%b %e'
        },
        maxZoom: 31 * 24 * 3600000,
        tickWidth: 0,
        tickPosition: 'outside',
        labels: {
          rotation: 45,
          align: 'left'
        }
      },
      yAxis: [
        { title: { text: 'Daily Hours' },
          gridLineColor: '#eaeaea'
        },
        {
          title: { text: 'Total Hours' },
          gridLineWidth: 0,
          opposite: true,
          min: 0
        }
      ],
      tooltip: {
        borderRadius: 5,
        borderWidth: 2,
        shadow: false,
        borderColor: '#ccc',
        shared: true,
        useHTML: true,
        hideDelay: 50,
        formatter: function() {
          var s = '';
          if (this.points[this.points.length - 1].series.name === "total") {
            s += '<table class="nomargin">';
            s += '<tr style="border-bottom: 1px solid #eaeaea;">' +
              '<th colspan="2" style="text-align: center; color: #08cabb; padding: 0 0 5px 0;">' +
              '<strong>' + Highcharts.dateFormat('%B %e, %Y', this.x) + '</strong>' +
              '</th>' +
              '</tr>';

            s += '<tr style="color: #777; font-size: 10pt;">' +
              '<td style="border-right: 1px dashed #ccc; padding: 10px;">' +
              '<ul style="text-align: right;">' +
              '<li style="">Today</li>' +
              '<li style="">Total</li>' +
              '</ul>' +
              '</td>';

            s+= '<td style="padding: 10px;">' +
              '<ul>' +
              '<li style="color: #F57F20">' + this.points[0].y + '</li>' +
              '<li style="color: #08cabb">' + this.points[1].y + '</li>' +
              '</ul>' +
              '</td>';
            s += '</tr></table>';
            return s;
          } else {
            return false;
          }
        },
        style: {
          paddingBottom: 0
        }
      },
      legend: {
        labelFormatter: function() {
          return this.name.charAt(0).toUpperCase() + this.name.substr(1).toLowerCase();
        },
        borderColor: '#eaeaea',
        borderRadius: 5,
        borderWidth: 0,
        align: 'center',
        verticalAlign: 'bottom'
      }
    }
  });
});
