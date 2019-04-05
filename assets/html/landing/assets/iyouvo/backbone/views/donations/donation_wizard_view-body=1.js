iY.DonationWizardView = Backbone.View.extend({

  el: '#donation-wizard',

  initialize: function () {
    var params = { model: this.model };
    this.steps = [
      new iY.DonationAmountView(params),
      new iY.DonationPaymentView(params),
      new iY.DonationConfirmView(params)
    ];
    this.currentStepIndex = 0;
    this.addStepListeners();
    this.initCreditCardUI();
  },

  render: function () {
    this.steps[this.currentStepIndex].render();
    $('.donation-steps li').removeClass('selected')
      .eq(this.currentStepIndex).addClass('selected');
    this.scrollToTop();
    return this;
  },

  addStepListeners: function () {
    _.each(this.steps, function (step) {
      this.listenTo(step, 'advance', this.advance);
      this.listenTo(step, 'goBack', this.goBack);
    }, this);
  },

  advance: function () {
    this.currentStepIndex++;
    this.render();
  },

  goBack: function () {
    this.currentStepIndex--;
    this.render();
  },

  initCreditCardUI: function () {
    this.$('.donation-step.step-2 form').card({
      container: '.card-wrapper',
      numberInput: '#cc-number',
      expiryInput: '#cc-ex-date',
      cvcInput: '#cc-cvv',
      nameInput: '#cc-name'
    });
  },

  scrollToTop: function () {
    if ($('body').scrollTop() > 100) {
      $('body').animate({ scrollTop: 0 }, 700, 'swing');
    }
  }

});
