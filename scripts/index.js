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
