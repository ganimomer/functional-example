function getData() {
  var pages = window.data;
  var events = [];
  pages.forEach(function(page) {
    page.forEach(function(event) {
      events.push(event);
    })
  });
  var eventTypeCount = {};
  events.forEach(function(event) {
    eventTypeCount[event.type] = (eventTypeCount[event.type] || 0) + 1;
  });
  var eventTypes = Object.keys(eventTypeCount);
  var eventValues = [];
  eventTypes.forEach(function(eventType) {
    eventValues.push(eventTypeCount[eventType]);
  });
  return {types: eventTypes, values: eventValues}
}
