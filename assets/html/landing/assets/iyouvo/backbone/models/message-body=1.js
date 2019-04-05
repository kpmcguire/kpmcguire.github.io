iY.Message = Backbone.Model.extend({
  url: "/messages.json",
  collection: iY.Messages,
  initialize: function () {
    this.message_recipients = new iY.MessageRecipients();
    this.message_recipients.url = '/messages/' + this.id + '/message_recipients.json';
  },

  toJSON : function() {
    var a = this.attributes;
    if (a.subject != "Invitation Instructions") {
      return { "message": {
        body: a.body,
        subject: a.subject,
        hidden_at: a.hidden_at
      }, to_user_id: a.to_user_id };
    }
  }
});

iY.Messages = Backbone.Collection.extend({
  url: '/messages',
  initialize: function() {
    this.model = iY.Message;
  }
});
