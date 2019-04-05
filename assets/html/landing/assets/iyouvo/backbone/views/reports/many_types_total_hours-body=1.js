$(function() {
  iY.ManyTypesTotalHoursGraphView = iY.ATypeTotalHoursGraphView.extend({

    render: function() {
      var view = this;
      view.svcData = [];
      view.probonoData = [];
      view.hoursData = [];
      view.totalData = [];

      this.options.hours_type = this.options.hours_types || 'indirect';
      var data_url = iY.analyticsBaseURL + '/groups/' +
        this.options.group_id + '/hours';

      var allDataAjax = $.ajax({
        url: data_url,
        data: {
          'group_by': view.options.group_by,
          'start': moment(view.options.start_date).format('YYYY-M-D'),
          'end': moment(view.options.end_date).format('YYYY-M-D'),
          'hours_types': this.options.hours_type
        }
      });

      var normalDataAjax = $.ajax({
        url: data_url,
        data: {
          'group_by': view.options.group_by,
          'start': moment(view.options.start_date).format('YYYY-M-D'),
          'end': moment(view.options.end_date).format('YYYY-M-D'),
          'hours_types': this.options.hours_type,
          'normal': true
        }
      });

      var svcDataAjax = $.ajax({
        url: data_url,
        data: {
          'group_by': view.options.group_by,
          'start': moment(view.options.start_date).format('YYYY-M-D'),
          'end': moment(view.options.end_date).format('YYYY-M-D'),
          'hours_types': this.options.hours_type,
          'svc': true
        }
      });

      var probonoDataAjax = $.ajax({
        url: data_url,
        data: {
          'group_by': view.options.group_by,
          'start': moment(view.options.start_date).format('YYYY-M-D'),
          'end': moment(view.options.end_date).format('YYYY-M-D'),
          'hours_types': this.options.hours_type,
          'probono': true
        }
      });

      var renderChart = function(res0, res1, res2, res3) {
        $(view.el).empty().siblings('h3').show();

        var all  = res0[0].content;
        var normal  = res1[0].content;
        var svc     = res2[0].content;
        var probono = res3[0].content;

        var total = 0;
        var count = 0;

        for(var key in all) {
          if (all.hasOwnProperty(key)) {
            count += 1;
            var shown_special_hours = 0;

            var dte = Date.parse(key.substring(0, key.length - 9)); // dumb firefox thing

            if ($.inArray('svc', view.options.seriesTypes) >= 0) {
              var svcHrs;
              if (svc.hasOwnProperty(key)) {
                svcHrs = parseInt(svc[key], 10);
              } else {
                svcHrs = 0;
              }
              view.svcData.push([dte, svcHrs]);
              shown_special_hours += svcHrs;
            }

            if ($.inArray('probono', view.options.seriesTypes) >= 0) {
              var probonoHrs;
              if (probono.hasOwnProperty(key)) {
                probonoHrs = parseInt(probono[key], 10);
              } else {
                probonoHrs = 0;
              }
              view.probonoData.push([dte, probonoHrs]);
              shown_special_hours += probonoHrs;
            }

            var day_total = parseInt(all[key], 10);

            if ($.inArray('hours', view.options.seriesTypes) >= 0) {
              view.hoursData.push([dte, day_total - shown_special_hours]);
            }

            if ($.inArray('total', view.options.seriesTypes) >= 0) {
              total += day_total;
              view.totalData.push([dte, total]);
            }

          }
        }

        if(count < 3) {
          view.renderFailure();
        } else {

          var chartData = {
            hours : {
              name: 'volunteer',
              color: '#715da8',
              serie: {
                name: 'volunteer',
                data: view.hoursData,
                type: 'column',
                yAxis: 0,
                events: { legendItemClick: function(event) { return false; }}
              }
            },
            svc : {
              name: 'service learning',
              color: '#f57f20',
              serie: {
                name: 'service learning',
                data: view.svcData,
                type: 'column',
                yAxis: 0,
                events: { legendItemClick: function(event) { return false; }}
              }
            },
            probono : {
              name: 'pro bono',
              color: '#f57f20',
              serie: {
                name: 'pro bono',
                data: view.probonoData,
                type: 'column',
                yAxis: 0,
                events: { legendItemClick: function(event) { return false; }}
              }
            },
            total : {
              name: 'total',
              color: '#08cabb',
              serie: {
                name: 'total',
                data: view.totalData,
                type: 'line',
                yAxis: 1,
                lineWidth: 3,
                marker: {
                  radius: 5,
                  lineWidth: 2,
                  fillColor: '#FFFFFF',
                  lineColor: '#08cabb'
                },
                events: { legendItemClick: function(event) { return false; }}
              }
            }
          };

          var names = [];
          var colors = [];
          var series = [];

          $.each(view.options.seriesTypes, function(index, item) {
            names.push (chartData[item].name);
            colors.push (chartData[item].color);
            series.push (chartData[item].serie);
          });

          var tooltip = view.buildTooltipObject(names, colors);

          var compositeChartOptions = _.extend({}, view.chartOptions, {
            tooltip: tooltip,
            plotOptions: {
              column: { stacking: 'normal' },
              series: { stickyTracking: true }
            },
            colors: colors,
            series: series,
            title: {
              useHTML: true,
              text: _.template('<span>Volunteered Hours for <%= startDate %> - <%= endDate%></span>', {
                startDate: moment(view.options.start_date).format('MMMM D, YYYY'),
                endDate: moment(view.options.end_date).format('MMMM D, YYYY')
              })
            }
          });
          $(view.el).highcharts(compositeChartOptions);
        }
      };

      // Passes the JSON objects necessary to render the chart.
      $.when(allDataAjax, normalDataAjax, svcDataAjax, probonoDataAjax)
        .then(renderChart)
        .fail(function(){
          iY.ReportDefaults.handleChartAjaxErrorFor(view);
        });

      return this;
    },

    buildTooltipObject: function(names, colors) {

      // Build tooltip object.
      return {
        borderRadius: 5,
        borderWidth: 2,
        shadow: false,
        borderColor: '#ccc',
        shared: true,
        useHTML: true,
        hideDelay: 50,
        formatter: function() {
          var s = '';
          var data = this;

          s += '<table class="nomargin">';
          s += '<tr style="border-bottom: 1px solid #eaeaea;">' +
            '<th colspan="2" style="text-align: center; color: #08cabb; padding: 0 0 5px 0;">' +
            '<strong>' + Highcharts.dateFormat('%B %e, %Y', this.x) + '</strong>' +
            '</th>' +
            '</tr>';

          s += '<tr style="color: #777; font-size: 10pt;">' +
            '<td style="border-right: 1px dashed #ccc; padding: 10px;">' +
            '<ul style="text-align: right;">'

          $.each(names, function(index, name) {
            if (data.points[index].y !== 0) {
              s += '<li>';
              s += name;
              s += '</li>';
            }
          });

          s += '</ul>' +
          '</td>';

          s+= '<td style="padding: 10px;">' +
            '<ul>';

          $.each(colors, function(index, color) {
            if (data.points[index].y !== 0) {
              s += '<li style="color: ' + color + '">';
              s += data.points[index].y;
              s += '</li>';
            }
          });

          s += '</ul>' +
          '</td>';
          s += '</tr></table>';
          return s;
        }
      }
    }
  });
});
