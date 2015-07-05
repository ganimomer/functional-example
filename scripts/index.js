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
      for (i = 0; i < pages.length; i++) {
        for (var j = 0; j < pages[i].length; j++) {
          events.push(pages[i][j]);
        }
      }
      var eventTypeCount = {};
      for (var k = 0; k < events.length; k++) {
        if (eventTypeCount[events[k].type]) {
          eventTypeCount[events[k].type]++
        } else {
          eventTypeCount[events[k].type] = 1;
        }
      }
      var eventTypes = Object.keys(eventTypeCount);
      var eventValues = [];
      for (var n = 0; n < eventTypes.length; n++) {
        eventValues.push(eventTypeCount[eventTypes[n]]);
      }
      return {types: eventTypes, values: eventValues}
    });
}
