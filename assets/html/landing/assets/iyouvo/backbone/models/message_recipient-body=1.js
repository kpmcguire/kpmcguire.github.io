iY.MessageRecipient = Backbone.Model.extend({
  collection: iY.MessageRecipients,
  toJSON : function() {
    return { "message_recipient" : {"hidden_at" : this.attributes.hidden_at, "state" : this.attributes.state} };
  }
});

iY.MessageRecipients = Backbone.Collection.extend({
  url: '/message_recipients',
  initialize: function() {
    this.model = iY.MessageRecipient;
  }
});
