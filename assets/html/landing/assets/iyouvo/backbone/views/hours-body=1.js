// main hours view
iY.HoursView = Backbone.View.extend({
  el: "#hours",

  subgroups_clicked: false,

  events: {
    "click #save": "saveActivity",
    "keyup #user_activity_hours": "formatHoursData"
  },

  initialize: function (opts) {
    this.options = opts;
    var org = this.options.organization;
    var event = this.options.event;
    var opportunity = this.options.opportunity;
    var events = this.options.events;
    var opportunities = this.options.opportunities;
    var preloaded = this.options.preloaded;
    var editing = this.options.editing;
    var self = this;

    this.stats = this.options.stats;

    // userActivity passed - so editing
    if (this.model && this.model.get('id') !== null) {
      this.$('#user_activity_comments').val(this.model.get('comments'));
      this.$('#user_activity_hours').val(this.model.get('hours'));
      this.$("#user_activity_activity_date").datepicker("setDate", new Date(this.model.get('activity_date')));
    }
    else {
      this.model = new iY.UserActivity();
    }

    // org passed from haml
    if (org) {
      org = new iY.Group({id: org.id, name: org.name});
      this.$('#group').val(org.get('name'));
      this.$('#group_id').val(org.get('id'));
      this.model.set({'loggable_id': org.id, 'loggable_type': 'Group'});
      setTimeout(function() { $('#group').blur(); }, 100);
    }

    // event was passed from haml
    if (preloaded) {
      var eventsC = new iY.Events();
      eventsC.add(events);
      var eventView = new iY.EventView({
        model: this.model,
        collection: eventsC,
        event: new iY.Event(event),
        org: org,
        opportunities: opportunities,
        opportunity: opportunity,
        preloaded: preloaded
      });

      if (typeof event != 'undefined') {
        self.lockEvent(eventView);
      }
    }

    _.bindAll(this, "selected", "toggleComments", "hideIndicator", "clear", "notFound", "afterSave",
      "loadAccomplishments", "showAccomplishmentsAndRankings", "createUserAssignmentIfNeeded",
      "isValid", "unbind", "showFriendsHoursRelativeRanking", "saveActivity");

    // triggered from autocomplete when organization is selected
    this.$document = $(document);
    this.$document.bind("autocomplete:selected", this.selected);
    this.$document.bind("autocomplete:cleared", this.clear);
    this.$document.bind("activity:rendered", this.toggleComments);
    this.$document.bind("activity:selected", this.toggleComments);
    this.$document.bind("activity:rendered", this.hideIndicator);
    this.$document.bind('modal:closed', this.unbind);
    this.$document.on('click', '.ui-menu-notfound', this.notFound);

    var subgroups_url = '/user_activities/hours_subgroups.json';
    if(this.model.get('id')) subgroups_url += '?user_activity_id=' + this.model.get('id');
    this.sgView = new iY.SubgroupsView({
      url: subgroups_url,
      org_id: (org? org.id : undefined)
    });

    var hoursDatePickerOptions = $.extend(
      {},
      iY.datePickerOptions,
      { onClose: function() { self.validateForm(); },
        maxDate: new Date()}
    );

    this.$("#user_activity_activity_date").datepicker(hoursDatePickerOptions);

//    delegate this to body to listen to ajax loaded views
    this.$('[data-validate]:input').keyup(function() { self.validateForm() });

    this.disableSave();

    if (org && this.model.get('id') === null && this.options.events && this.options.events.length < 1) {
      $('#additional-wrapper').removeClass('hidden');
    } else if (preloaded && org && event && opportunities && opportunities.length === 0) {
      $('#additional-wrapper').removeClass('hidden');
    }

    if (editing) {
      if (org && this.model.get('loggable_type') === "Group") {
        $('#event').val('-1');
      }

      $('#additional-wrapper').removeClass('hidden');
      this.enableSave();
    }

    $('a[rel="popover"]').popover();

    $('a[rel="popover"]').bind('show', function (e) {
      e.stopPropagation();
    });

    $('a[rel="popover"]').bind('hide', function (e) {
      e.stopPropagation();
    });

    var $check_boxes = $('.types-checkbox');
    $check_boxes.click(function(e) {
      e.stopImmediatePropagation();
      var checked = $(this).prop('checked');
      $check_boxes.prop('checked', false);
      $(this).prop('checked', checked);
    });

    var $subgroup_select_menu = $("#subgroups");
    $subgroup_select_menu.click(function(e) {
      var offset = $(this).offset();
      var left = e.pageX;
      var top = e.pageY;
      var theHeight = $('.multiselect').height();
      $('.multiselect').css('left', (left + 10) + 'px');
      $('.multiselect').css('top', (top - ( theHeight / 2)) + 'px');
    });
  },

  lockEvent: function(eventView) {
    var org_name = eventView.options.org.get('name');
    var event_name = eventView.options.event.get('name');

    $(this.el).siblings('.modal-header').find('h3')
      .text('Log Hours for ' + org_name + "'s Opportunity")
      .append('<h4 class="gorange nomargin">' + event_name + '<\/h4>');

    $('#group-event-wrapper').addClass('hidden');
    $('#additional-wrapper').removeClass('hidden');
  },

  validateForm: function() {
    if(this.isValid()) {
      this.enableSave();
    } else {
      this.showErrorOnSave();
    }
  },

  disableSave: function() {
    $('#save').attr('disabled','disabled');
  },

  showErrorOnSave: function() {
    $('#save').removeAttr('disabled').unbind('click').click(this.showValidationError);
  },

  enableSave: function() {
    $('#save').removeAttr('disabled').unbind('click').click(this.saveActivity);
  },

  showValidationError: function(e) {
    e.preventDefault();
    $(document).trigger('flash:warning', { message: "Hey there are 24 hours in a day! And don't forget to pick a date.", top: $(document).scrollTop() });
  },

  selected: function (event, params) {
    if (params.el.id !== 'group') return;

    var org = new iY.Group({ id: params.item.id });

    if(this.model.isNew()) {
      this.model = new iY.UserActivity();
    }

    this.model.set({ 'loggable_id': params.item.id, 'loggable_type': 'Group' });
    this.eventView = new iY.EventView({ model: this.model, collection: org.events, org: org });

    var subgroups_url = '/user_activities/hours_subgroups.json';

    if(this.model.get('id')) {
      subgroups_url += '?user_activity_id=' + this.model.get('id');
    }

    this.sgView = new iY.SubgroupsView({
      url: subgroups_url,
      org_id: (org? org.id : undefined)
    });

    $('#group_id').val(this.model.get('loggable_id'));
    $(document).trigger('activity:selected', { id: params.item.id, type: "Group" });
    $('body').trigger('ga:logHoursGroupSelected');
  },

  toggleComments: function (e, data) {
    var id = parseInt(data.id, 10);

    if (id > 0) {
      $('#indicator').removeClass('hidden');
    } else {
      $('#indicator').addClass('hidden');
    }

    if (data.type === "Event") {
      // if Events exist, and has opps to select
      if ( !(isNaN(id) && data.size < 1 || id === -1)) {
        this.disableSave();
      }

      $('#additional-wrapper').removeClass('hidden');
    } else if (data.type === "Opportunity") {
      // Opps exist but not yet selected
      if (!(id !== 0 && !(isNaN(id) && data.size > 0))) {
        this.disableSave();
      }

      this.hideIndicator();
    }
  },

  hideIndicator: function () {
    $('#indicator').addClass('hidden');
  },

  clear: function (e) {
    if (e && e.target.id !== 'group') { return; }

    $('#additional-wrapper').addClass('hidden');
    $('#events-wrapper').addClass('hidden');
    $('#opportunities-wrapper').addClass('hidden');
    this.disableSave();

    if(this.model.isNew()) {
      this.$('textarea, input[type=text], input[type=number]').val("");
    }
  },

  formatHoursData: function () {
    var hours = $('#user_activity_hours').val();
    if(hours && hours.charAt(0) === '.') { $('#user_activity_hours').val('0' + hours); }
  },

  saveActivity: function () {
    var self = this,
        hours = $('#user_activity_hours').val(),
        form = $('#new_user_activity');

    if (this.isValid()) {
      var isNew = this.model.isNew();

      this.$('#save').attr('disabled', 'disabled').val('Saving...');
      this.$('#indicator').removeClass('hidden');
      this.model.set({
        comments: $('#user_activity_comments').val(),
        hours: hours,
        activity_date: $('#user_activity_activity_date').val()
      });

      if (isNew) {
        $.ajax({
          url: form.attr('action'),
          type: 'POST',
          beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
          },
          data: form.serialize(),
          success: function(response) {
            self.sendGA(isNew, response);
            self.afterSave(isNew,response);
          }
        });
      } else {
        $.ajax({
          url: form.attr('action') + '/' + self.model.id,
          type: 'PUT',
          beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
          },
          data: form.serialize(),
          success: function(response) {
            self.sendGA(isNew, response);
            self.afterSave(isNew,response);
          }
        });
      }
    }
  },

  // used to track when log hours completes
  // also sends event if subgroups dropdown was clicked
  sendGA: function(isNew, response) {

    if (iY.SubgroupsView.subgroups_clicked == 'true') {

      // we have to isolate the "active" classes within the dropdown
      // container, otherwise "active" classes from the entire
      // page get counted, and we get an incorrect subgroups count
      var activeNumSubgroups = $('ul.multiselect-container').children('.active').length;

      // selectAll checkbox gets counted as an active "group" if
      // selected, so subtract 1 from the activeNumSubgroups if selectAll is checked
      var check_selectAll = $('ul.multiselect-container').children('.active').find('.multiselect-all').length;

      if (check_selectAll > 0){
        activeNumSubgroups = activeNumSubgroups - 1;
      }

      //reset subgroups_clicked
      iY.SubgroupsView.subgroups_clicked = 'false';
      $('body').trigger('ga:subgroupsSelected', activeNumSubgroups);
    }

    $('body').trigger('ga:logHoursCompleted',[this.model.get('loggable_type'), this.model.get('hours')]);
  },

  isValid: function () {
    var hours = $('#user_activity_hours').val();
    var date = $('#user_activity_activity_date').val();
    return hours.length && $.isNumeric(hours) && hours > 0 && hours < 24 && date;
  },

  afterSave: function (isNew, response) {
    this.showAccomplishmentsAndRankings(isNew, response);
    this.createUserAssignmentIfNeeded();
  },

  createUserAssignmentIfNeeded: function () {
    if (this.model.get('loggable_type') == "Task") {
      var us = new iY.UserAssignment();
      var data = {
        user_id: iY.currentUser.id,
        task_id: this.model.get('loggable_id')
      };
      us.save(data);
    }
  },

  showAccomplishmentsAndRankings: function (isNew, response) {
    if (response) {
      if (response.challenges) {
        this.showAccomplishedChallenges(response.challenges);
      }

      if (response.goals.progressed) {
        this.showProgressedGoal(response.goals.progressed);
      }

      if (response.goals.achieved) {
        this.showAchievedGoal(response.goals.achieved);
      }
      return;
    }

    if (isNew === true) {
      this.showFriendsHoursRelativeRanking();
      return;
    }

    this.$('#log-hours-close-link').click();
  },

  showAccomplishedChallenges: function(challenges) {
    var challengesId = _.map(challenges, function(c) { return c.id});

    this.loadAccomplishments(
      'POST',
      '/challenges/accomplished',
      { accomplished_challenges_id: challengesId },
      $(this.el),
      iY.fb.shareHoursCallback
    );
  },

  showAchievedGoal: function(goal) {
    this.loadAccomplishments(
      'GET',
      '/users/'+goal.user_id+'/goals/achieved',
      { achieved_goal_id: goal.id },
      $(this.el),
      iY.fb.shareGoals
    );
  },

  showProgressedGoal: function(goal) {
    this.loadAccomplishments(
      'GET',
      '/users/'+goal.user_id+'/goals/progressed',
      { progressed_goal_id: goal.id },
      $(this.el),
      iY.fb.shareGoals
    );
  },

  showFriendsHoursRelativeRanking: function () {
    var self = this;
    var onImpactPage = window.location.href.indexOf('/impact') > -1;
    var options = {
      type: 'get',
      url: "/users/total_hrs_relative_ranking",
      success: function (responseText) {
        $(self.el).html(responseText);
        if (onImpactPage) $(document).bind('modal:closed', function() { window.location.reload(); });

        iY.initSocialShare($(self.el), iY.fb.shareHoursCallback);
      },
      dataType: 'html'
    };
    $.ajax(options);
  },

  loadAccomplishments: function(method, url, data, $dom, share) {
    var self = this;
    $.ajax({
      type: method,
      url: url,
      data: data,
      success: function(response) {
        var $modal = $(iY.template('modals/accomplishment'));
        $modal.find('.modal-body').replaceWith(response);

        var $hoursModal = $dom.closest('.modal');
        $hoursModal.modal('hide');

        $modal.modal('show');

        $modal.on('shown.bs.modal', function() {
          iY.initSocialShare($modal, share);
        });

        self.refreshAfterModals();
      }
    });
  },

  refreshAfterModals: function() {
    var onImpactPage = window.location.href.indexOf('/impact') > -1;

    if (onImpactPage) {
      $(document).on('hidden.bs.modal', function() {
        if($('.modal:visible').length === 0) {
          window.location.reload();
        }
      });
    }
  },

  notFound: function (e) {
    var name = $("#group").val();
    this.organization = new iY.UserActivity();

    this.organization = new iY.Group();
    this.organization.set({
      name: name,
      description: name,
      who_we_are: name
    });

    $('#group_id').val('-1');
    $('#additional-wrapper').removeClass('hidden').find('#user_activity_comments').focus();
    $(e.currentTarget).parent().addClass('hidden');
  },

  unbind: function () {
    this.$document = $(document);
    this.$document.unbind("autocomplete:selected", this.selected);
    this.$document.unbind("autocomplete:cleared", this.clear);
    this.$document.unbind("activity:selected", this.toggleComments);
    this.$document.unbind("activity:rendered", this.hideIndicator);
    this.$document.unbind('modal:closed', this.unbind);
    this.$document.unbind("activity:rendered", this.toggleComments);
    $('.ui-menu-notfound').unbind("click", this.notFound);

    if (this.eventView) {
      this.eventView.unbind();
    }

    this.remove();
  }
});

// events view
iY.EventView = Backbone.View.extend({

  templates: {
    select: _.template('<option value="0">Choose one:</option><%= opp_options %><option value="-1">Not Listed</option>'),
    item: _.template('<option <%= selected %> value="<%=id%>">&nbsp;&nbsp;<%=name%></option>')
  },

  el: '#events-wrapper',

  initialize: function (opts) {
    this.options = opts;
    var opportunities = this.options.opportunities,
        opportunity = this.options.opportunity,
        preloaded = this.options.preloaded;

    _.bindAll(this, "render", "clear", "selected", "unbind");
    this.collection.bind("reset", this.render);

    this.org = this.options.org;
    this.event = this.options.event;

    if (preloaded) {
      this.render(this.collection);

      if (!opportunity) {
        $(document).trigger('activity:selected', { id: this.event.get('id'), type: "Event"} );
      }

      var oppCol = new iY.Opportunities(opportunities);

      if (this.event.has('id')) {
        this.model.set({'loggable_id': this.event.get('id'), 'loggable_type': 'Opp'});
      }

      this.oppView = new iY.OpportunityView({
        model: this.model,
        collection: oppCol,
        opportunity: opportunity,
        event: this.event,
        preloaded: preloaded
      });

    }
    else {
      this.collection.fetch({reset: true});
    }

    $('#event').unbind('change').bind('change', this.selected);
  },

  render: function (events) {
    var opp_options = '';
    var self = this;

    if (events.size()) {
      $(this.el).removeClass('hidden');

      events.each(function (event) {
        var selected = (typeof self.event !== "undefined" && self.event.get('id') === event.get('id')) ? "selected" : "";

        opp_options += self.templates.item({
          id: event.get('id'),
          name: event.get('name').substring(0, Math.min(40, event.get('name').length)),
          selected: selected
        });
      });

      $('#event').html(this.templates.select({ opp_options:opp_options }));

    } else if (typeof self.event == "undefined" || !self.event.id) {
      $('#event').val(-1);
      $('#additional-wrapper').removeClass('hidden');
    }

    $(document).trigger('activity:rendered', {size: events.size(), type: "Event"});
  },

  clear: function () {
    this.$('#event').html("");
    $(this.el).addClass('hidden');
  },

  // executed after event is selected
  selected: function () {
    var id = this.$('#event').val(),
        event = this.collection.get(id);

    if (id > 0) {
      this.oppView = new iY.OpportunityView({model: this.model, collection: event.opportunities, event: event});
      this.model.set({'loggable_id': id, 'loggable_type': 'Opp'});
    }
    else {
      this.model.set({'loggable_id': this.org.id, 'loggable_type': 'Group'});
    }

    $(document).trigger('activity:selected', {id: id, type: "Event"});
  },

  unbind: function () {
    $('#event').unbind('change', this.selected);
    this.collection.unbind("reset", this.render);
    if (this.oppView) {
      this.oppView.unbind();
    }
    this.remove();
  }
});

iY.OpportunityView = Backbone.View.extend({

  templates: {
    select: _.template('<option value="0">Choose one:</option><%= options %><option value="-1">Not listed</option>'),
    item: _.template('<option <%= selected %> value="<%=id%>"><%=name%></option>')
  },

  el: '#opportunities-wrapper',

  initialize: function (opts) {
    this.options = opts;
    var preloaded = this.options.preloaded,
        self = this;

    this.event = this.options.event;

    if(this.event) {
      this.collection.url = '/opportunities/' + this.event.id + '/tasks.json';
      this.collection.model = iY.TaskItem;
    }

    this.opportunity = this.options.opportunity;

    _.bindAll(this, "render", "clear", "selected", "toggle", "unbind");
    this.collection.bind("reset", this.render);

    if (preloaded) {
      this.render(this.collection);
      setTimeout(function () {
        if (self.opportunity) {
          self.model.set({'loggable_id': self.opportunity.id, 'loggable_type': 'Task'});
          $(document).trigger('activity:selected', {id: self.opportunity.id, type: "Opportunity"});
        }
        $('#opportunity').focus();
      }, 100);
    }
    else {
      this.collection.fetch({reset: true});
    }

    $(document).bind("autocomplete:cleared", this.clear);
    $(document).bind("activity:selected", this.toggle);

    this.$('#opportunity').unbind('change').bind('change', this.selected);
  },

  render: function (opportunities) {
    if (opportunities.size()) {
      var options = "";
      var self = this;
      $(this.el).removeClass('hidden');

      opportunities.each(function (opp) {
        var selected = (typeof self.opportunity !== "undefined" && self.opportunity.id === opp.get('id')) ? "selected" : "";
        options += self.templates.item({
          id: opp.get('id'),
          name: opp.get('name').substring(0, Math.min(40, opp.get('name').length)),
          selected: selected
        });
      });

      $('#opportunity').html(this.templates.select({options: options}));
    }

    $(document).trigger('activity:rendered', {size: opportunities.size(), type: "Opportunity"});
  },

  // executed after opportunity is selected
  selected: function () {
    var id = parseInt(this.$('#opportunity').val(), 10);
    if (id > 0) {
      this.model.set({'loggable_id': id, 'loggable_type': 'Task'});
    }
    else {

      /* TODO: Setting the `loggable_type` is something that belongs
      in the model layer of the rails app, not in JS! At the very
      least, can we move this into the backbone model, instead of
      this view? -Jared 2014-06-11 */
      this.model.set({
        'loggable_id': this.event.id,
        'loggable_type': 'Opp'
      });
    }

    $(document).trigger('activity:selected', {id: id, type: "Opportunity"});
  },

  clear: function (e) {
    if (e && e.target.id !== 'group') {
      return;
    }
    this.$('#opportunity').html("");
    $(this.el).addClass('hidden');
  },

  toggle: function (e, data) {
    if (data.type == "Event") {
      this.clear();
    }
  },

  unbind: function () {
    $(document).unbind("autocomplete:cleared", this.clear);
    $(document).unbind("activity:selected", this.toggle);
    this.collection.unbind("reset", this.render);
    this.remove();
  }
});

iY.SubgroupsView = Backbone.View.extend({

  templates: {
    select: _.template('<%= options %>'),
    item: _.template('<option <%= selected %> value="<%=id%>"><%=name%></option>')
  },

  el: '#subgroups-wrapper',
  subgroups_clicked: 'false',

  initialize: function (opts) {
    this.options = opts;
    var self = this;

    _.bindAll(this, 'render');

    var hoursSubgroupAjax = $.ajax({
      url: this.options.url
    });

    $.when(hoursSubgroupAjax).then(this.render);
  },

  render: function (hoursSubgroups) {
    var groups_hash = hoursSubgroups.groups_hash;

    if (hoursSubgroups.communities.length > 0) {
      var options = "",
        self = this;
      $(this.el).removeClass("hidden");

      var checked_subgroups = hoursSubgroups.checked_groups;

      //load array of options, check subgroups already selected
      $.each(groups_hash, function (key, subgroups) {
        for (var i = 0; i < subgroups.length; i++) {
          var subgroup = subgroups[i];
          if (subgroup.id!=self.options.org_id) {
            var selected = (checked_subgroups.indexOf(subgroup.id) > -1 ) ? "selected" : "";
            options += self.templates.item({
              id: subgroup.id,
              name: subgroup.name.substring(0, Math.min(40,  subgroup.name.length)),
              selected: selected
            });
          }
        }
      });

      $('#subgroups').html(this.templates.select({options: options}));

      $("#subgroups").multiselect({
        includeSelectAllOption: true
      }).multiselect('rebuild');
    }
    $('#service_learning').prop('checked', hoursSubgroups.svc);
    $('#probono').prop('checked', hoursSubgroups.probono);
  },

  toggleSubgroupsSelect: function(e) {
    e.preventDefault();
    /**
     * Gets whether all the options are selected
     * @param {jQuery} $el
     * @returns {bool}
     */
    function multiselect_selected($el) {
      var ret = true;
      $('option', $el).each(function(element) {
        if (!!!$(this).attr('selected')) {
          ret = false;
        }
      });
      return ret;
    }

    /**
     * Selects all the options
     * @param {jQuery} $el
     * @returns {undefined}
     */
    function multiselect_selectAll($el) {
      $('option', $el).each(function(element) {
        $el.multiselect('select', $(this).val());
      });
    }
    /**
     * Deselects all the options
     * @param {jQuery} $el
     * @returns {undefined}
     */
    function multiselect_deselectAll($el) {
      $('option', $el).each(function(element) {
        $el.multiselect('deselect', $(this).val());
      });
    }

    /**
     * Clears all the selected options
     * @param {jQuery} $el
     * @returns {undefined}
     */
    function multiselect_toggle($el, $btn) {
      if (multiselect_selected($el)) {
        multiselect_deselectAll($el);
        $btn.text("Select All");
      }
      else {
        multiselect_selectAll($el);
        $btn.text("Deselect All");
      }
    }

    multiselect_toggle($("#subgroups"), $(this));
  }

});

$(function(){
  $('body').on('click', '.multiselect', function(e) {
    iY.SubgroupsView.subgroups_clicked = 'true';
  });
});
