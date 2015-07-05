function getData() {
  var pages = window.data;
  var events = [];
  for (var i = 0; i < pages.length; i++) {
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
}
