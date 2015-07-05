'use strict';

function capitalizeWords(input) {
  var counter;
  var inputArray = input.split(' ');
  var transformed = '';
  var result = [];
  for (counter = 0; counter < inputArray.length; counter++) {
    transformed = [
      inputArray[counter].charAt(0).toUpperCase(),
      inputArray[counter].substring(1)
    ].join("");
    result.push(transformed);
  }
  return result.join(' ');
}
