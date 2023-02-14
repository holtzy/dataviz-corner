// Import the filesystem module
const fs = require('fs');
import { blogs } from 'data/blogs.ts'

let Parser = require('rss-parser');
let parser = new Parser();

// const getFeed = async(url) => {
//     return(
//         await parser.parseURL(url)
//     )
// }

// const feeds = blogs.map(blog => {
//     console.log(blog.feedUrl)
//     let feed = getFeed(blog.feedUrl);
//     console.log(feed.title);
// })




Promise.all(blogs.map(blog => parser.parseURL(blog.feedUrl)))
    .then(res => {
        console.log('------')
        console.log(res.map(blog => blog.feedUrl))

        const cleanRes = res.flatMap(blog => blog.items)

        var json = JSON.stringify(cleanRes);

        fs.writeFile("./data/data.json", json,
        {
            encoding: "utf8",
            flag: "w",
            mode: 0o666
        },
        (err) => {
            if (err)
            console.log(err);
            else {
            console.log("File   written  successfully\n");
            console.log(cleanRes.length + ' blogPost harvested')
            }
        });
    })





