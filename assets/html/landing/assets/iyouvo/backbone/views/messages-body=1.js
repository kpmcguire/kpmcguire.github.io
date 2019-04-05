iY.MessageRecipientsView = Backbone.View.extend({
  el: $("#received_messages"),

  initialize: function (opts) {
    this.options = opts;
    _.bindAll(this, 'render');
    this.render();
  },

  render: function () {
    var el = this.$el;
    var count = this.options.count;
    var text = "Inbox";
    el.empty();
    if (this.collection.length > 0) {
      this.collection.each(function (messageRecipient) {
        var view = new iY.MessageRecipientView({model: messageRecipient});
        el.append(view.render(view.render()));
      });
    }
    else {
      var msg = ($.trim($('#message_search_term').val()) === '' ? "You have no messages." : "No messages matched your search.");
      el.append('<div class="blank_area">' + msg + '</div>');
    }

    if ($('#current_view').val() === 'inbox') {
      $('#unread_messages_count').val(count);
      if (count > 1) {
        text = "Inbox (" + count + " Unread Messages)";
      }
      else if (count === 1) {
        text = "Inbox (1 Unread Message)";
      }
      $('#restore_messages_btn').addClass('hidden');
      $('#delete_messages_btn').removeClass('hidden');
    }
    else {
      $('#delete_messages_btn, #restore_messages_btn').addClass('hidden');
      if ($('#current_view').val() === 'trash') {
        $('#restore_messages_btn').removeClass('hidden');
        $('#deleted_messages_count').val(count);
      }
      text = $('#current_view').val() + " (" + count + ")";
    }
    $('#inbox_count').text(text);
  }
});

iY.MessageRecipientView = Backbone.View.extend({
  tagName: 'li',

  className: 'message',

  events: {
    'click': 'activate',
    'click .hide_message': 'deleteOne'
  },

  initialize: function () {
    _.bindAll(this, 'render', 'hide', 'deleteIfChecked', 'restoreIfChecked');
    var view = this;
    $(document).on('messages:bulkDelete', view.deleteIfChecked)
      .on('messages:bulkRestore', view.restoreIfChecked);

    this.model.bind('change:hidden_at', this.hide);
  },

  hide: function () {
    $(this.el).fadeOut();
  },

  render: function () {
    var data = this.model.attributes;
    var content = "";
    if ($('#current_view').val() === 'inbox') {
      content = iY.template('messages/message', data);
    }
    else if ($('#current_view').val() === 'sent') {
      content = iY.template('messages/sent_message', data);
    }
    else if ($('#current_view').val() === 'trash') {
      content = iY.template('messages/deleted_message', data);
    }
    return $(this.el).html(content);
  },

  activate: function (e) {
    if ($(e.target).is('input[type="checkbox"]')) {
      return;
    }
    this.model.trigger('active', this.model);
    $('#new_message_page').addClass('hidden');

    if ($('#current_view').val() !== 'sent' && this.model.get('state') === "unread") {
      var rcvd_msg = "#received_message_" + this.model.id;
      $(rcvd_msg).removeClass("unread");
      $(rcvd_msg).addClass("read");

      var sndr_info = "#sender_info_" + this.model.id;
      $(sndr_info).removeClass("unread");
      $(sndr_info).addClass("read");

      if ($('#current_view').val() === 'inbox') {
        this.updateInboxCount();
      }

      this.model.set({state: "read"});
      this.model.save();
    }
  },

  deleteOne: function() {
    if (window.confirm("Delete this message?")) {
      this.clearMessageRecipient();
    }
    return false;
  },

  deleteIfChecked: function() {
    if (this.$('.message_checkbox input').is(':checked')) {
      this.clearMessageRecipient();
    }
  },

  clearMessageRecipient: function(e) {
    if (this.model.get('state') === 'unread') {
      this.updateInboxCount();
    }
    $('#deleted_messages_count').val(parseInt($('#deleted_messages_count').val(), 10) + 1);
    this.$('.message_checkbox input').removeAttr('checked');
    this.model.set({hidden_at: new Date()});
    this.model.save();
  },

  restoreIfChecked: function() {
    if (this.$('.message_checkbox input').is(':checked')) {
      this.moveToInbox();
    }
  },

  moveToInbox: function() {
    this.updateTrashCount();
    this.$('.message_checkbox input').removeAttr('checked');
    this.model.set({ hidden_at: null });
    this.model.save();
  },

  updateInboxCount: function() {
    var count = $('#unread_messages_count').val();
    if(count > 0) {
      var new_count = count - 1;
      $('#unread_messages_count').val(new_count);

      var label;
      if(new_count > 1) {
        label = ("Inbox (" + new_count + " Unread Messages)");
      } else if(new_count === 1) {
        label = ("Inbox (" + new_count + " Unread Message)");
      } else {
        label = ("Inbox");
      }

      $('#inbox_count').text(label);
    }
  },

  updateTrashCount: function() {
    if (this.model.get('state') === 'unread') {
      $('#unread_messages_count').val(parseInt($('#unread_messages_count').val(), 10) + 1);
    }
    var count = $('#deleted_messages_count').val();
    if (count > 0) {
      var new_count = count - 1;
      $('#deleted_messages_count').val(new_count);
      $('#inbox_count').text("Trash (" + new_count + ")");
    }
  }
});

iY.MessageRecipientBody = Backbone.View.extend({

  el: $('.full_messages'),

  events: {
    "submit #reply_form": "reply",
    "click #confirm-friend": "friendAction",
    "click #ignore-friend": "friendAction"
  },

  initialize: function () {
    _.bindAll(this, 'render', 'afterSave');
    this.collection.bind('active', this.render);
    this.collection.bind('change:hidden_at', this.hide);
  },

  hide: function () {
    $('#message_detail_page').fadeOut();
  },

  render: function (model) {
    this.model = model;
    $('#message_detail_page').removeClass('hidden');
    if($('#current_view').val() === 'sent') {
      this.$el.html(iY.template('messages/sent_message_detail', model.attributes));
    } else {
      this.$el.html(iY.template('messages/message_detail', model.attributes));
    }

    // show reply form for direct messages from other users
    var sender = model.get('sender_full_name');
    if ($('#current_view').val() === 'inbox' &&
        sender != "GiveGab Notifications" &&
        model.get('subject') != sender + " posted on your wall..." &&
        model.get('subject').indexOf(" also commented on ") === -1 &&
        model.get('subject').indexOf(" posted on the wall ") === -1) {
      this.$el.append(iY.template('messages/reply', model.attributes));
    }
  },

  friendAction: function () {
    this.model.save({hidden_at: new Date()}, {silent: true});
  },

  reply: function (e) {
    var data = this.$('#reply_form').serializeObject(),
      message = new iY.Message();
    this.$('#reply_submit').attr('disabled', 'disabled').val('Sending...');
    message.save(data, {success: this.afterSave});
    return false;
  },

  afterSave: function () {
    this.$("#reply_submit").removeAttr('disabled').val('Send');
    this.$('#reply_body').val("");
    // jquery.flash.js binds to flash:notice
    $(document).trigger('flash:info', { message: "Your message was sent!" });
  }
});
