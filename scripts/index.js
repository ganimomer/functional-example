function getData() {
  var pages = window.data;
  var events = pages.reduce(function(soFar, page) {
    return soFar.concat(page);
  }, []);

  var eventTypeCount = events.reduce(function(soFar, event) {
    soFar[event.type] = (soFar[event.type] || 0) + 1;
    return soFar;
  }, {});
  var eventTypes = Object.keys(eventTypeCount);
  var eventValues = eventTypes.map(function(type) {
    return eventTypeCount[type];
  });
  return {types: eventTypes, values: eventValues}
}
