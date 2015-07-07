function getData() {
  function toTypesAndValues(obj) {
    return {types: _.keys(obj), values: _.values(obj)};
  }
  return _(window.data).flatten().countBy('type').thru(toTypesAndValues).value();
}
