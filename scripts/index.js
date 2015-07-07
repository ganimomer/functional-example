function getData() {
  var pages = window.data;
  var events = _.flatten(pages);
  var eventTypeCount = _.countBy(events, 'type');
  return {types: _.keys(eventTypeCount), values: _.values(eventTypeCount)};
}
