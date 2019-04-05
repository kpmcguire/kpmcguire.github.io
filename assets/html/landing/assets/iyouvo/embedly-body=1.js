$(function() {

  iY = iY || {};
  iY.Embedly = iY.Embedly || {};

  iY.Embedly.baseURL = 'https://i.embed.ly/1/display?key=' + '2d6c97857a944eceb3efdba1707c6fac';

  iY.Embedly.proxyImageURL = function(url) {
    return iY.Embedly.baseURL + '&url=' + encodeURIComponent(url);
  };

});
