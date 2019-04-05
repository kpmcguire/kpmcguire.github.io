
iY.DonationPaymentView = iY.DonationBaseStepView.extend({

  el: '.donation-step.step-2',

  events: {
    'change #cc-name, #cc-number, #cc-ex-date, #cc-cvv, #cc-postal-code': 'updateModel'
  },

  cardErrStrs: function() {
    var bpCardErrs = balanced.card.validate(this.model.bpValidationData());
    return _.flatten(_.map(bpCardErrs, function(e){ return _.keys(e.extras); }));
  },

  errFormGroups: function() {
    var invFlds = _.keys(this.errors);
    var inputIds = _.values(_.pick(this.flds, invFlds));
    return $(inputIds.join(',')).closest('.form-group');
  },

  onInitialize: function() {
    this.flds = {
      "cc-cvv": '#cc-cvv',
      "cc-name": '#cc-name',
      "cc-postal-code": '#cc-postal-code',
      number: '#cc-number',
      expiration_month: '#cc-ex-date',
      expiration_year: '#cc-ex-date'
    };
  },

  onRender: function () {
    this.$('#summary-amount').html(this.model.formattedAmount());
  },

  resetForm: function () {
    $('.form-group').removeClass('has-error');
  },

  showErrors: function () {
    var msg = 'Please make sure all of your payment info is correct.';
    if (_.size(this.errors) > 0) {
      msg += '  Invalid fields: ' + _.keys(this.errors).join(', ');
    }
    iY.flashError(msg, { persistent: true });
    this.errFormGroups().addClass('has-error');
  },

  updateModel: function (e) {
    var el = e.target;
    this.model.set(el.id, el.value);
  },

  validate: function () {
    var view = this;
    this.resetForm();

    view.errors = _.reduce(view.cardErrStrs(), function(memo, err) {
      memo[err] = 'invalid';
      return memo;
    }, {});

    _.each(['cc-cvv', 'cc-name', 'cc-postal-code'], function(f) {
      if (!iY.forms.utils.isPresent('#' + f)) { view.errors[f] = 'required'; }
    });

    return _.size(view.errors) === 0;
  }
});
