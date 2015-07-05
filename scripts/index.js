function getData() {
  const dataLocation = 'data/';

  function json(res) {
    return res.json();
  }
  function toDataLocation(n) {
    return dataLocation + n + '.json';
  }
  'use strict';
  var promises = [];
  for (var i = 1; i <= 10; i++) {
    var promise = fetch(toDataLocation(i)).then(json);
    promises.push(promise);
  }
  return Promise.all(promises)
    .then(function (pages) {
      var events = pages.reduce(function(soFar, page) {
        return soFar.concat(page);
      }, []);
      var eventTypeCount = events.reduce(function(byType, event){
        byType[event.type] = (byType[event.type] || 0) + 1;
        return byType;
      }, {});

      var eventTypes = Object.keys(eventTypeCount);
      var eventValues = eventTypes.map(function(type) {
        return eventTypeCount[type];
      });
      return {types: eventTypes, values: eventValues}
    });
}
