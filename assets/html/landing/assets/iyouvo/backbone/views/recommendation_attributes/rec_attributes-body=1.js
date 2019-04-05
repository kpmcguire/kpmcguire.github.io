iY.RecAttributesView = Backbone.View.extend({
  initialize: function (options) {
    this.attrType = options.attrType;
    this.limit = options.limit;
    this.pickerModal = options.pickerModal || new iY.AttributePickerModal();
    _.bindAll(this, 'fillHiddenFields');
    $('#rec_attribute_form').on('submit', this.fillHiddenFields);
  },

  render: function () {
    var frag = document.createDocumentFragment();

    this.collection.each(function(model) {
      var view = new iY.RecAttributeView({ model: model, parentView: this });
      frag.appendChild(view.render().el);
    }, this);
    this.$el.append(frag);

    return this;
  },

  fillHiddenFields: function () {
    var i, model;
    for (i = 1; i <= this.limit; i++) {
      model = this._modelAtRank(i);
      this._fieldForRank(i).val(model ? model.get('id') : null);
    }
  },

  _fieldForRank: function (rank) {
    return $('#' + this.attrType + '_choice_' + rank);
  },

  _modelAtRank: function (rank) {
    return this.collection.findWhere({ rank: rank });
  }
});

iY.RecAttributeView = Backbone.View.extend({
  className: 'rec-attribute',

  events: {
    'click': 'showModal'
  },

  initialize: function (options) {
    this.parentView = options.parentView;
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    this.$el.html(iY.template('recommendation_attributes/rec_attribute', this.model.attributes));
    return this;
  },

  showModal: function () {
    this.parentView.pickerModal.recAttributesView = this.parentView;
    this.parentView.pickerModal.render(this.model);
  }
});
