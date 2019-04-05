iY.Donation = Backbone.Model.extend({

  initialize: function () {
    _.bindAll(this, 'fetchFees', 'renderFees');
    this.set('donor-covered-fees', false);
    this.on('change:cc-ex-date', this.setMonthAndYear);
  },

  amountInCents: function () {
    return parseFloat(this.get('amount')) * 100;
  },

  bpTokenizationData: function () {
    return {
      number: this.get('cc-number'),
      expiration_month: this.get('cc-ex-month'),
      expiration_year: this.get('cc-ex-year'),
      cvv: this.get('cc-cvv'),
      name: this.get('cc-name'),
      address: { postal_code: this.get('cc-postal-code') }
    };
  },

  bpValidationData: function () {
    return _.omit(this.bpTokenizationData(), ['name', 'address']);
  },

  fetchFees: function () {
    var data = {
      donor_covered_fees: true,
      group_id: this.get('group_id'),
      user_entered_amount: this.amountInCents()
    };
    $.post('/donations/fees', data, null, 'json').done(this.renderFees);
  },

  formattedAmount: function () {
    return '$' + parseFloat(this.get('amount')).toFixed(2);
  },

  renderFees: function (response) {
    var totalFees = response.fee_bp + response.fee_gg;
    this.set('total_fees', totalFees);
    $('#confirm-total-fee').text(iY.utils.centsToDollars(totalFees, true));
    $('#confirm-bank-fee').text(iY.utils.centsToDollars(response.fee_bp, true));
    $('#confirm-givegab-fee').text(iY.utils.centsToDollars(response.fee_gg, true));
  },

  setMonthAndYear: function (model, date) {
    var arr = date ? _.map(date.split('/'), $.trim) : ['', ''];
    this.set({ 'cc-ex-month': arr[0], 'cc-ex-year': arr[1] });
  }

});
