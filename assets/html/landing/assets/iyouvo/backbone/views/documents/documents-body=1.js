iY.DocumentsView = Backbone.View.extend({
  el: $('#documents'),

  initialize: function() {
    _.bindAll(this, 'render', 'renderDocument');
    this.collection.bind('add', this.renderDocument);
    this.render();
  },

  render: function () {
    var el = this.$el;
    el.empty();
    if (this.collection.length) {
      this.collection.each(function (doc) {
        var view = new iY.DocumentView({model: doc});
        el.append(view.render());
      });
    }
    else {
      el.html('<li>No documents found.</li>');
    }
  },

  renderDocument: function (model) {
    var view = new iY.DocumentView({model: model});
    if (this.collection.size() == 1) {
      this.$el.html(view.render());
    }
    else {
      this.$el.prepend(view.render());
    }
  }
});

iY.DocumentView = Backbone.View.extend({
  tagName: 'li',
  className: 'document',

  events: {
    'click #delete_doc': 'deleteDocument'
  },

  initialize: function () {
    _.bindAll(this, 'render');
  },

  render: function () {
    var doc = this.model;
    var attrs = doc.attributes;
    return $(this.el).html(iY.template('documents/document', attrs));
  },

  resetFileFields: function () {
    $(this.el).find('#document_description').val('');
    var replacement = "<input type='file' id='document_file' name='document[file]' required='required' type='file'>";
    $('#document_file').replaceWith(replacement);
  },

  deleteDocument: function(e) {
    this.resetFileFields();
    if(window.confirm("Are you sure you want to delete this document?")) {
      this.model.destroy({success: function(model, response) {
        $('#document_' + model.id.toString()).fadeOut();
      }});
    }
  }
});

iY.DocumentForm = Backbone.View.extend({
  el: '#new_document',

  events: {
    'submit': 'showSpinner',
    'ajax:complete': 'add',
    'change #document_file': 'checkFileSize'
  },

  add: function (evt, xhr) {
    var doc = this.strToObj(xhr.responseText);

    //a hack to determine if there were errors on upload
    if(xhr.responseText.indexOf("You are not allowed to upload") > 0 && xhr.responseText.indexOf("allowed types:") > 0) {
      this.handleFileTypeError(doc);
    } else if(xhr.responseText.indexOf("is too big") > 0) {
      this.handleFileSizeError(doc);
    } else {
      this.resetFileFields();
      this.collection.add(doc);
    }
    $('#indicator').addClass('hidden');
  },

  checkFileSize: function (evt) {
    try {
      var fileSizeBytes = evt.target.files[0].size;

      var maxSizeBytes = $('#max_file_size_bytes').val();
      var maxSizeMBs = $('#max_file_size_mbs').val();

      var replacement;
      if (fileSizeBytes > maxSizeBytes) {
        var errMsg = 'File is too large (should not exceed ' + maxSizeMBs + ' MB)';
        $('#document_file').tooltip({ title: errMsg }).tooltip('show');
        replacement = "<input type='file' id='document_file' name='document[file]' required='required'>";
        $('#document_file').replaceWith(replacement);
        $('#upload_doc').attr('disabled', 'disabled')
      } else {
        replacement = "<input type='submit' id='upload_doc' name='commit' class='btn' value='Upload'>";
        $('#upload_doc').replaceWith(replacement);
        $('#document_file').tooltip('destroy');
      }
    } catch(err) {}
  },

  resetFileFields: function () {
    $('#document_file').tooltip('destroy');
    $(this.el).find('#document_description').val('');
    var replacement = "<input type='file' id='document_file' name='document[file]' required='required'>";
    $('#document_file').replaceWith(replacement);
  },

  handleFileTypeError: function (doc) {
    $(document).trigger('flash:notice', { message: 'There was an error uploading your document.  See below for details.' });
    $('#document_file').tooltip({ title: doc.file[0] }).tooltip('show');
  },

  handleFileSizeError: function (doc) {
    $(document).trigger('flash:notice', { message: 'There was an error uploading your document.  See below for details.' });
    var maxSizeMBs = $('#max_file_size_mbs').val();
    var errMsg = 'File is too large (should not exceed ' + maxSizeMBs + ' MB)';
    $('#document_file').tooltip('destroy').tooltip({ title: errMsg }).tooltip('show');
  },

  showSpinner: function() {
    $('#document_file').tooltip('destroy');

    if($('#document_file').val() !== null && $('#document_file').val() !== "") {
      $('#indicator').removeClass('hidden');
    }
    return true;
  },

  // Removes the html wrapped around JSON string and
  // converts it to JSON object
  //
  // Note: for some weird reason the JSON responseText
  // is being wrapped with html tags
  strToObj: function (text) {
    var sindex = text.indexOf("{");

    if (sindex > -1) {
      text = text.slice(sindex);
      text = text.slice(0, text.lastIndexOf("}") + 1);
      return JSON.parse(text);
    }

    return text;
  }
});
