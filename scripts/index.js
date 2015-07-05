function getData() {
  function json(res) {
    return res.json();
  }
  'use strict';
  var promises = [];
  const dataLocation = 'data/';
  for (var i = 1; i <= 10; i++) {
    var url = dataLocation + i + '.json';
    var promise = fetch(url).then(json);
    promises.push(promise);
  }
  return Promise.all(promises)
    .then(function (pages) {
      var events = [];
      pages.forEach(function(eventsPage) {
        eventsPage.forEach(function(event) {
          events.push(event);
        })
      });
      var eventTypeCount = {};
      events.forEach(function(event) {
        eventTypeCount[event.type] = (eventsTypeCount[event.type] || 0) + 1;
      });
      var eventTypes = Object.keys(eventTypeCount);
      var eventValues = [];
      eventTypes.forEach(function(eventType) {
        eventValues.push(eventTypeCount[eventType]);
      });
      return {types: eventTypes, values: eventValues}
    });
}
