iY.DonationBaseStepView = Backbone.View.extend({

  initialize: function () {
    this.events = this.events || {};
    this.events['click .next-step'] = 'advance';
    this.events['click .prev-step'] = 'goBack';
    this.onInitialize();
  },

  render: function () {
    this.onRender();
    this.$el.removeClass('hidden');
    return this;
  },

  advance: function () {
    if (this.validate()) {
      this.hide();
      this.trigger('advance');
    } else {
      this.showErrors();
    }
  },

  goBack: function () {
    this.hide();
    this.trigger('goBack');
  },

  hide: function () {
    this.$el.addClass('hidden');
  },

  onInitialize: function () {},

  onRender: function () {},

  showErrors: function () {},

  validate: function () {
    return true;
  }

});
