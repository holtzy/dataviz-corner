// Import the filesystem module
const fs = require('fs');

const obj = {
    toto: 2
}

var json = JSON.stringify(obj);

fs.writeFile("./data.json", json,
  {
    encoding: "utf8",
    flag: "w",
    mode: 0o666
  },
  (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
    }
});
