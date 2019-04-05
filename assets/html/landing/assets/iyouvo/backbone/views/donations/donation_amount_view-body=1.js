
iY.DonationAmountView = iY.DonationBaseStepView.extend({

  el: '.donation-step.step-1',

  events: {
    'click .btn-amount': 'choosePredefinedAmount',
    'focus #custom-amount': 'chooseCustomAmount',
    'keyup #custom-amount': 'updateCustomAmount',
    'submit form': 'clickNextButton'
  },

  chooseCustomAmount: function () {
    this.$('.btn-amount').removeClass('active');
    this.updateCustomAmount();
  },

  choosePredefinedAmount: function (e) {
    $('#custom-amount').val('');
    this.setAmount($(e.target).find('input').val());
  },

  clickNextButton: function () {
    this.$('.next-step').click();
    return false;
  },

  onInitialize: function () {
    this.on('advance', this.model.fetchFees);
  },

  setAmount: function (amt) {
    this.model.set('amount', amt);
  },

  showErrors: function () {
    iY.flashError('Please enter a valid amount to donate.');
  },

  updateCustomAmount: function () {
    this.setAmount(this.$('#custom-amount').val());
  },

  validate: function () {
    var pattern = /^\d+($|\.\d{2}$)/;
    return pattern.test(this.model.get('amount'));
  }

});
