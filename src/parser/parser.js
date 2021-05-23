var expecthONE = false;
var isTag = false;
var write = ""
var theTag = ""
Array.prototype.remove = function(index) {
    this.splice(index, 1);
}
function parse(data) {
  for (let i = 0; i < data.length; i++) {
    var parsedata = data[i];
    var line = parsedata.split(' ');
    if (expecthONE == true) {
      if (write.includes('h1 {') == true) {

      }
      else {
        write = "h1 {\n"
      }
      console.log("WE HAVE H1 data!")
      console.log(line);
        var e = i + 1
        e = e++
        e = e++
        console.log(line[e])
        if (line[e] == "color") {
          e++
          console.log("Found color")
          if (line[e] == "=") {
            e++
            if (line[e] != undefined) {
              write = write + `color: ${line[e]}\n`
            }
          }
      }
      h = i + 1
      write = write + "}"
      expecthONE = false 
      
      
    }
    for (let f = 0; f < line.length; f++) {
      switch (line[f]) {
        case "h1":
          isTag = true;
          theTag = "h1 {"
          f = f + 1;
          switch (line[f]) {
            case "{":
              expecthONE = true
              console.log("Tag found");
          }
          break;
        case " ":
          console.log("Trailing space");
          break;
        case "}":
          expecthONE = false
          console.log("Found closing tag!");
          break;
        case "{":
          if (isTag != false) {
            console.log("This is a tag");
          }
          else {
            console.log("This is not a tag");
          }
          break;
        case "":
          break;
        default:
          console.log("UNKNOWN: " + line[f]);
          break;
      }
    }
  }
  return write;
}
module.exports = parse;