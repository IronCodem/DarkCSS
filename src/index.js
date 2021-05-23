var parse = require('./parser/parser.js')
function getFile(file) {
  file = "" + file;
  data = file.split(/\n/);
  var returndata = parse(data);
  return returndata;
}
module.exports = getFile;