
iY.DonationConfirmView = iY.DonationBaseStepView.extend({

  el: '.donation-step.step-3',

  events: {
    'change #donor-covered-fees': 'setDonorCoveredFees',
    'click #cc-submit': 'submitDonation',
    'click .donation-breakdown-trigger': 'toggleDonationBreakdown'
  },

  disableSubmitButton: function () {
    this.$('#cc-submit').prop('disabled', true).addClass('disabled');
    this.$('.gab-cash').addClass('moving');
  },

  enableSubmitButton: function () {
    this.$('#cc-submit').prop('disabled', false).removeClass('disabled');
    this.$('.gab-cash').removeClass('moving');
  },

  handleResponse: function (response) {
    if (response.status_code === 201) {
      this.handleSuccessfulTokenization(response);
    } else {
      iY.flashError(this.tokenizationErrorMessage(response));
      this.enableSubmitButton();
    }
  },

  handleSuccessfulTokenization: function (response) {
    var fundingInstrument = response.cards !== null ?
      response.cards[0] : response.bank_accounts[0];

    var data = {
      uri: fundingInstrument.href,
      donation: {
        amount: this.model.amountInCents(),
        donor_covered_fees: this.model.get('donor-covered-fees'),
        group_id: this.model.get('group_id')
      }
    };

    $.ajax({
      type: 'POST',
      url: '/donations',
      data: data,
      dataType: 'json',
      success: this.handleSuccessfulTransaction,
      error: this.handleTransactionError,
      complete: this.enableSubmitButton
    });
  },

  handleSuccessfulTransaction: function () {
    $('.step-3 .btn-toolbar').parent().html('<h4 class="gblue">Thanks for your donation!</h4>');
  },

  handleTransactionError: function (response) {
    var errors = {
      400: 'Sorry, your transaction was declined. ' + response.responseText,
      422: 'Sorry, we could not process your transaction. ' + response.responseText,
      500: 'Sorry, a server error occurred.  Please try again later.'
    };
    iY.flashError(errors[response.status] || errors[500]);
  },

  onInitialize: function () {
    _.bindAll(this, 'enableSubmitButton', 'handleResponse', 'handleSuccessfulTokenization',
      'handleSuccessfulTransaction');
  },

  onRender: function () {
    this.$('#confirm-donation-amount').html(this.model.formattedAmount());
    this.$('#confirm-card-number').html(this.model.get('cc-number').substr(-4));
    this.updateTotal();
  },

  setDonorCoveredFees: function () {
    this.model.set('donor-covered-fees', $('#donor-covered-fees').prop('checked'));
    this.updateTotal();
  },

  submitDonation: function (e) {
    e.preventDefault();
    this.disableSubmitButton();
    balanced.card.create(this.model.bpTokenizationData(), this.handleResponse);
  },

  toggleDonationBreakdown: function() {
    this.$('.donation-breakdown').slideToggle(100);
  },

  /* If tokenization fails, `response.errors` will contain an array
  of error objects.  See `buildErrorObject` in balanced.js.  AFAICT,
  the errors are the same as those returned by `balanced.card.validate`.
  So, we don't need to spend too much time carefully handling these
  errors here.  The careful error handling should have already happend
  in `donation_payment_view.js` -Jared 2014-09-23 */
  tokenizationErrorMessage: function (response) {
    var errors = _.pluck(response.errors, 'description').join(', ');
    return 'Sorry, your card was not recognized. ' +
      'Please make sure you have entered it correctly. ' + errors;
  },

  updateTotal: function () {
    var total = this.model.amountInCents();
    if (this.model.get('donor-covered-fees')) {
      total += this.model.get('total_fees');
    }
    this.$('#confirm-total-donation').text(iY.utils.centsToDollars(total, true));
  }

});
