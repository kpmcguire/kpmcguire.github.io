iY.addOppMapPins = function (opps) {
  if (iY.google_map_enabled) {
    var map = iY.leaflet.initializeMapForOppFinder();
    opps.each(function (opp) {
      iY.leaflet.addOpportunityMarker(opp, map);
    });
  }
};
