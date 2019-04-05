iY.AttributePickerModal = Backbone.View.extend({
  el: '#attribute-modal',

  events: {
    'click .rank-button': 'setRank',
    'click .deselect': 'deselect'
  },

  render: function (model) {
    this.model = model;
    var modalContent = $(iY.template('recommendation_attributes/rec_modal', this.model.attributes));
    var selector = '.rank-button[data-rank=' + this.model.get('rank') + ']';
    modalContent.find(selector).addClass('btn-primary');
    if (this.model.get('rank') !== null) {
      modalContent.find('.deselect').removeClass('hidden');
    }
    this.$el.html(modalContent).modal('show');
  },

  setRank: function (e) {
    var selectedRank = $(e.target).data('rank');
    this._moveDisplacedModel(selectedRank);
    this.model.set('rank', selectedRank);
    this.$el.modal('hide');
  },

  deselect: function () {
    this.model.set('rank', null);
    this.$el.modal('hide');
  },

  _firstEmptySpot: function () {
    var i;
    for (i = 1; i <= this.recAttributesView.limit; i++) {
      if (!this._modelAtRank(i)) {
        return i;
      }
    }
    return null;
  },

  _full: function () {
    return this._firstEmptySpot() === null;
  },

  _modelAtRank: function (rank) {
    return this.recAttributesView._modelAtRank(rank);
  },

  _moveDisplacedModel: function (rank) {
    var displacedModel = this._modelAtRank(rank);
    if (displacedModel) {
      var currentRank = this.model.get('rank');
      if (currentRank !== null || this._full()) {
        displacedModel.set('rank', currentRank);
      } else {
        displacedModel.set('rank', this._firstEmptySpot());
      }
    }
  }
});
