function getData() {
  const dataLocation = 'data/';

  function json(res) {
    return res.json();
  }

  function toDataLocation(n) {
    return dataLocation + n + '.json';
  }

  function fetchJson(url) {
    return fetch(url).then(json);
  }

  function toTypesAndValues(eventTypeCount) {
    return {types: _.keys(eventTypeCount), values: _.values(eventTypeCount)}
  }

  'use strict';
  return _(_.range(1, 11))
    .map(toDataLocation)
    .map(fetchJson)
    .thru(Promise.all, Promise)
    .value()
    .then(function (pages) {
      return _(pages).
        flatten()
        .countBy('type')
        .thru(toTypesAndValues)
        .value();
    });
}
