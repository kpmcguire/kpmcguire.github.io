iY.TaskItem = Backbone.Model.extend({
  urlRoot: '/tasks',

  parse: function(response) {
    if (response.start_time) {
      response.start_time = moment(response.start_time).format('M/DD/YYYY hh:mm a');
    }
    if (response.end_time) {
      response.end_time = moment(response.end_time).format('M/DD/YYYY hh:mm a');
    }
    return response;
  }
});
