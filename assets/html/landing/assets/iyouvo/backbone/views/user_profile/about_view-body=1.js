(function () {
  'use strict';

  iY.UserProfileAboutView = Backbone.View.extend({

    el: '#user-profile-about-view',

    events: {
      'click .about-edit-link': 'showForm',
      'click .btn-cancel': 'cancel',
      'click .btn-save': 'save'
    },

    initialize: function (options) {
      _.bindAll(this, 'cancel', 'copyTextareaOverPlaceholder', 'save', 'showForm', 'url');
      iY.utils.assertPositiveNonzeroInteger(options.userId);
      this.userId = options.userId;
    },

    cancel: function (event) {
      var $btn = $(event.target);
      this.hideForm(this.panelBody($btn));
    },

    count: function ($panelBody) {
      var $textarea = this.textarea(this.form($panelBody));
      $textarea.keyup(function() {
        var textLength = $textarea.val().length;
        var textRemaining = 255 - textLength;
        $textarea.parent().find('.count').html('<strong>' + textRemaining + '</strong> Characters Left');
      });
    },

    copyTextareaOverPlaceholder: function ($panelBody) {
      var $textarea = this.textarea(this.form($panelBody));
      var $placeholderSpan = this.placeholder($panelBody).find('span.description');
      $placeholderSpan.text($textarea.val());
    },

    enableSaveButton: function ($form) {
      $form.find('.btn-save').prop('disabled', false);
    },

    hide: function (elm) {
      $(elm).addClass('hidden');
    },

    hideForm: function ($panelBody) {
      this.hide(this.form($panelBody));
      this.show(this.placeholder($panelBody));
    },

    form: function ($panelBody) {
      return $panelBody.find('.about-description-form');
    },

    panelBody: function ($elm) {
      return $elm.closest('.about_info');
    },

    placeholder: function ($panelBody) {
      return $panelBody.find('.about-placeholder');
    },

    save: function (event) {
      var $btn = $(event.target);
      $btn.prop('disabled', true);
      var $panelBody = this.panelBody($btn);
      var $form = this.form($panelBody);
      var data = { user: this.userData($btn, $form) };
      $.ajax({ url: this.url(), type: 'PUT', data: data })
        .then(this.saveSuccess($panelBody), this.saveFail($panelBody));
    },

    saveSuccess: function ($panelBody) {
      var view = this;
      return function () {
        iY.flashNotice('Changes saved.');
        view.copyTextareaOverPlaceholder($panelBody);
        view.hideForm($panelBody);
        view.enableSaveButton(view.form($panelBody));
      }
    },

    saveFail: function (jqXHR, textStatus, errorThrown) {
      var view = this;
      return function () {
        iY.flashError('Failed to save: ' + jqXHR.responseText);
        view.enableSaveButton(view.form($panelBody));
      }
    },

    show: function (elm) {
      $(elm).removeClass('hidden');
    },

    showForm: function (event) {
      var $link = $(event.target);
      var $panelBody = this.panelBody($link);
      this.hide(this.placeholder($panelBody));
      this.show(this.form($panelBody));
      this.count($panelBody);
    },

    textarea: function ($form) {
      return $form.find('textarea')
    },

    url: function () {
      return '/users/' + this.userId + '/profile/about';
    },

    userData: function ($btn, $form) {
      var $textarea = this.textarea($form);
      var field = $btn.data('field');
      var userData = {};
      userData[field] = $textarea.val();
      return userData;
    }
  });
})();
