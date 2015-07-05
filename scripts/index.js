function getData() {
  const dataLocation = 'data/';

  function json(res) {
    return res.json();
  }
  function toDataLocation(n) {
    return dataLocation + n + '.json';
  }
  'use strict';
  var promises = _.range(1, 11)
    .map(toDataLocation)
    .map(function(url) {
      return fetch(url).then(json);
    });
  return Promise.all(promises)
    .then(function (pages) {
      var events = _.flatten(pages);
      var eventTypeCount = _.countBy(events, 'type');
      return {types: _.keys(eventTypeCount), values: _.values(eventTypeCount)}
    });
}
