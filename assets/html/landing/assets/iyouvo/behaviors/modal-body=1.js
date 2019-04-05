iYouVo.modalHandlers = {
  applyAutocomplete: function (dialog) {
    $(dialog).find(".autocomplete").each(function(index, element) {
      iY.autocomplete(element);
    });
  },

  applyHours: function (dialog) {
    var html = iY.template('user_activities/log_hours');
    dialog.html(html);
    iYouVo.modalHandlers.applyAutocomplete(dialog);
    var hours = new iY.HoursView({stats: iY.stats});
  },

  cancelEvent: function (dialog) {
    $('.formError').show();
  },

  editLoggedHours:  function (dialog, el) {
    var html = iY.template('user_activities/log_hours');
    $(dialog).html(html);
    $(dialog).find('#indicator').removeClass("hidden");
    $(dialog).find("#user_activity_activity_date").datepicker(iYouVo.datePickerOptions);

    var uaid = $(dialog).attr("data-user-activity-id");
    var userActivityModel = new iY.UserActivity({id: uaid});

    userActivityModel.fetch({success: function () {
      var userActivityData = userActivityModel.attributes;
      var loggable_type = userActivityData.loggable_type;

      if (loggable_type === "Group") {
        var organization = new iY.Group({id: userActivityData.loggable_id});
        organization.fetch({success: function () {

          organization.events.fetch({success: function (e) {
            var events = organization.events;
            var hours;

            if (events !== null && events.size() > 0) {
              hours = new iY.HoursView({
                editing: true,
                model: userActivityModel,
                preloaded: true,
                organization: organization.attributes,
                events: events.toJSON()
              });
            } else {
              hours = new iY.HoursView({
                editing: true,
                model: userActivityModel,
                preloaded: true,
                organization: organization.attributes
              });
            }

            iYouVo.modalHandlers.applyAutocomplete(dialog);
            $(dialog).find('#indicator').addClass("hidden");
          }});
        }});
      }

      else if (loggable_type === 'Opp') {
        var program = new iY.Program({id: userActivityData.loggable_id, program_type: loggable_type});
        program.fetch({success: function () {
          var org_id = program.attributes.group_id;

          var organization = new iY.Group({id: org_id});
          organization.fetch({success: function () {
            var events = organization.events;

            events.fetch({success: function () {
              var hours = new iY.HoursView({
                editing: true,
                preloaded: true,
                model: userActivityModel,
                organization: organization.attributes,
                event: program.attributes,
                events: events.models
              });

              iYouVo.modalHandlers.applyAutocomplete(dialog);
              $(dialog).find('#indicator').addClass("hidden");
            }});
          }});
        }});
      }

      else if (loggable_type === "Task") {
        var task = new iY.TaskItem({id: userActivityData.loggable_id});

        task.fetch({success: function () {
          var program = new iY.Program({id: task.attributes.program_id, program_type: task.attributes.program_type});

          program.fetch({success: function () {
            var opps = program.opportunities; // Does `opportunities` mean "tasks"?

            opps.fetch({success: function () {
              var org_id = program.attributes.group_id;

              var organization = new iY.Group({id: org_id});
              organization.fetch({success: function () {
                var events = organization.events;

                events.fetch({success: function () {
                  var hours = new iY.HoursView({
                    editing: true,
                    preloaded: true,
                    model: userActivityModel,
                    organization: organization.attributes,
                    event: program.attributes,
                    events: events.models,
                    opportunity: task.attributes,
                    opportunities: opps.models
                  });

                  iYouVo.modalHandlers.applyAutocomplete(dialog);
                  $(dialog).find('#indicator').addClass("hidden");
                }});
              }});
            }});
          }});
        }});
      }
    }})
  }
};

(function ($) {
  $('.modal').on('show.bs.modal', function () {
    var handlerName = $(this).data('handler');
    if (handlerName) {
      var handler = iYouVo.modalHandlers[handlerName];
      if (handler) {
        handler($(this));
      }
    }
  });
  $('.modal').on('hide.bs.modal', function () {
    $('.formError').hide();
    $(document).trigger('modal:closed');
  });

  iYouVo.redisplayModal = function () {
    $('.modal.redisplay').modal('show');
  }

  iY.initSocialShare = function ($el, fb_callback) {
    twttr.widgets.load();

    var fb = $el.find('.facebook-share-dialog');
    fb.on('click', function (e) {
      e.preventDefault();
      fb_callback($(this));
    });
  }
})(jQuery);
