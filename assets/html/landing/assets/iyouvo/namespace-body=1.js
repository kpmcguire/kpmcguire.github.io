(function () {
  // setup iYouVo namespace
  var iYouVo;
  if (typeof iYouVo == "undefined") {
    iYouVo = this.iY = this.iYouVo = {};
  }

  iYouVo.baseUrl = window.location.protocol + "//" + window.location.host;
  iYouVo.forms = { validators: {} };
  iYouVo.hideAnimationTime = 1000;
  iY.template = function (path, data) {
    var templatePath = 'iyouvo/templates/' + path;
    return HandlebarsTemplates[templatePath](data);
  };

})();
