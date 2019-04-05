$(function() {
  if (typeof ga != 'undefined' && ga) {
    var delegate_helper_event = function (category, action, type, value) {
      var deferred = $.Deferred();

      ga('send', 'event', {
        'eventCategory': category,
        'eventAction': action,
        'eventLabel': type,
        'eventValue': value || null, //let value = nil
        'hitCallback': function () {
          deferred.resolve();
        }
      });
      return deferred.promise();
    };

    var delegate_helper_pageview = function (page) {
      var deferred = $.Deferred();

      ga('send', 'pageview', {
        'page': page,
        'hitCallback': function () {
          deferred.resolve();
        }
      });
      return deferred.promise();
    };

    var sendEventWithPageView = function (catagory, event, label, pageview) {
      var analyticsWait = setTimeout(function(){},500);

      $.when(
        delegate_helper_event(catagory, event, label),
        delegate_helper_pageview(pageview)
      ).done(function () {
        clearTimeout(analyticsWait);
      });
    };

    var sendEvent = function (catagory, event, label, value) {
      var analyticsWait = setTimeout(function(){},500);
      $.when(
        delegate_helper_event(catagory, event, label, value)
      ).done(function () {
        clearTimeout(analyticsWait);
      });
    };

    // helps with ga:logHoursCompleted + Log Hours Pick Groups event chain
    $('body').on('click', '.multiselect', function(e) {
      $('#subgroups-wrapper').val('clicked?: true');
    });

    $('body')
      .on('click', '.finish-signup-event', function (e) {
        // Hack to try and get AB testing to work
        _gaq.push(['_trackEvent', 'Goals', 'AB Testing - User Signup'])
        sendEventWithPageView('Goals', 'User Signup', $(e.target).data('type'), '/signup/complete');
      })
      .on('click', '.finish-sign-up-for-task-event', function (e) {
        sendEvent('Engagement', 'Task Signup', $(e.target).data('type'));
      })
      .on('click', '.finish-add-program-participants-event', function (e) {
        sendEvent('Engagement', 'Program Signed Up', $(e.target).data('type'));
      })
      .on('click', '.finish-vm-create-event-or-program-event', function (e) {
        sendEvent('Engagement', 'Opportunity Creation', $(e.target).data('type'));
      })
      .on('click', '.finish-join-group-event', function (e) {
        sendEvent('Engagement', 'Join Group', $(e.target).data('type'));
      })
      .on('click', '.finish-close-log-hours-modal-event', function (e) {
        sendEvent('Engagement', 'Log Hours Close', $(e.target).data('type'));
      })
      .on('click', '.new_task .finish-task-creation-event', function (e) {
        sendEvent('Engagement', 'Task Creation', $(e.target).data('type'));
      })
      .on('click', '.finish-gmail-single-invite-event', function () {
        sendEvent('Referral', 'Invite Friends', 'Gmail - Single');
      })
      .on('click', '.finish-gmail-all-invite-event', function () {
        sendEvent('Referral', 'Invite Friends', 'Gmail - All');
      })
      .on('ga:finishEmailInvite', function (e, data) {
        sendEvent('Referral', 'Invite Friends', 'Email', data.count);
      })
      .on('ga:logHoursGroupSelected', function () {
        sendEvent('Engagement', 'Log Hours Choose Org', '');
      })
      .on('ga:logHoursCompleted', function (e, type, hours) {
        sendEvent('Engagement', 'Log Hours Complete', type, hours);
      })
      .on('ga:assignTaskParticipant', function(e, data) {
        sendEvent('Engagement', 'Task Assigned', data.type);
      })
      .on('click', '.social-share', function (e) {
        sendEvent('Referral', 'Social Share', $(e.target).data('type'));
      })
      .on('ga:bulkLogHoursComplete', function (e, numHrs) {
        sendEvent('Engagement', 'Bulk Log Hours', '', numHrs);
      })
      .on('ga:subgroupsSelected', function(e, numGrps){
        sendEvent('Engagement', 'Log Hours Pick Groups', numGrps);
      })
      .on('ga:importSingleMember', function(e){
        sendEvent('Referral', 'Single', 1);
      })
      .on('click', '.import-bulk-members', function(e){
        sendEvent('Referral', 'Bulk', $(e.target).data('value'));
      });

    twttr.ready(function (twttr) {
      twttr.events.bind('tweet', function(e) {
        sendEvent('Referral', 'Social Share', $(e.target).parent().data('type'));
      });
    });

    // These elements have other js listeners so need to attach ours first
    $('.finish-create-group-event').click(function (e) {
      sendEventWithPageView('Goals', 'Group Creation', $(e.target).data('type'), '/group_wizard/complete');
    });

    $('.finish-vm-create-np-job-event').click(function (e) {
      sendEvent('Engagement', 'Opportunity Creation', $(e.target).data('type'));
    });

    $('.donation').click(function (e) {
      sendEvent('Engagement', 'Donation Clicked', $(e.target).data('type'));
    });

    $('.log-hours-start').click(function (e) {
      sendEvent('Engagement', 'Log Hours Start', $(e.target).data('type'));
    });

    $('.new_reflection .finish-create-reflection-event').click(function (e) {
      sendEvent('Engagement', 'Reflection Creation', $(e.target).data('type'));
    });

    $('.finish-facebook-invite-event').click(function (e) {
      sendEvent('Referral', 'Invite Friends', 'Facebook');
    });

    $('.social-share').click(function (e) {
      sendEvent('Referral', 'Social Share', $(e.target).data('type'));
    });

  }
});
