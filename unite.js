var fs = require('fs');
function promiseContents(path) {
  return new Promise(function (resolve, reject) {
    fs.readFile(path, function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data);
      }
    })
  });
}

var contents = Array.apply(null, { length: 10 } );
console.log(contents);
contents = contents
  .map(function (v, i) { return __dirname + '/data/' + (i + 1) + '.json'});
console.log(contents);
contents = 'window.data = [' + contents
  .map(function(pagePath) {
      return fs.readFileSync(pagePath);
    })
  .join(',') + ']';
fs.writeFileSync('./data/data.js', contents);
