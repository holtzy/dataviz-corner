// Import the filesystem module
const fs = require('fs');
let Parser = require('rss-parser');
let parser = new Parser();

(async () => {

  let feed = await parser.parseURL('https://www.reddit.com/.rss');
  console.log(feed.title);

  feed.items.forEach(item => {
    console.log(item.link)
  });

  var json = JSON.stringify(feed);

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


})();



