import { blogs } from 'data/blogs.ts'

// This is the script run to harvest rss feeds every x hours.
// To be run by the github action, it needs to be bundled with the necessary library
// This is possible thanks to the ncc lib using:

// ncc build index.js -o dist

// Do it each time this file is modified

// Import the filesystem module
const fs = require('fs')

// List of blogs to fetch stored in an array

const Parser = require('rss-parser')
const parser = new Parser()

Promise.all(blogs.map(blog => parser.parseURL(blog.feedUrl)))
  .then(res => {
    console.log('------')
    console.log(res.map(blog => blog.feedUrl))

    const cleanRes = res.flatMap(blog => blog.items)

    const json = JSON.stringify(cleanRes)

    fs.writeFile('./data/data.json', json,
      {
        encoding: 'utf8',
        flag: 'w',
        mode: 0o666
      },
      (err) => {
        if (err) { console.log(err) } else {
          console.log('File   written  successfully\n')
          console.log(cleanRes.length + ' blogPost harvested')
        }
      })
  })
