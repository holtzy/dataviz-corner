import { blogs } from './blogs'

// This is the script run to harvest rss feeds every x hours.
// To be run by the github action, it needs to be bundled with the necessary library
// This is possible thanks to the ncc lib using:
// ncc build index.ts -o dist
// Do it each time this file is modified

// Import the filesystem module
const fs = require('fs')

// List of blogs to fetch stored in an array
const Parser = require('rss-parser')
const parser = new Parser()

const allPromises = blogs.map(blog => parser.parseURL(blog.feedUrl))
Promise.allSettled(allPromises)
  .then(res => {

    const allPosts = res
      .flatMap((blogResponse, i) => {
        if (blogResponse.status === 'fulfilled') {
          console.log(blogs[i].title, blogResponse.value.feedUrl)
          return blogResponse.value.items
        } else {
          console.log('----- FAILING:', blogs[i].title)
        }
      })
      .sort((a, b) => {
        console.log(a.isoDate)
        return (a.isoDate < b.isoDate) ? -1 : 1;
      }
      )

    //
    // Save a file with ALL posts
    //
    const json = JSON.stringify(allPosts)
    fs.writeFile('data-full.json', json,
      {
        encoding: 'utf8',
        flag: 'w',
        mode: 0o666
      },
      (err: any) => {
        if (err) { console.log(err) } else {
          console.log('File   written  successfully -- ' + allPosts.length + ' blogPost harvested')
        }
      })

    //
    // Save a file with the 20 latests post only
    //
    const firstPosts = allPosts.slice(0, 19).map(post => {
      return ({
        creator: post.creator,
        title: post.title,
        link: post.link,
        pubDate: post.pubDate,
        isoDate: post.isoDate,
        content: post.content,
        contentSnippet: post.contentSnippet
      })
    })
    const firstPostsJson = JSON.stringify(firstPosts)
    fs.writeFile('data-first-20.json', firstPostsJson,
      {
        encoding: 'utf8',
        flag: 'w',
        mode: 0o666
      },
      (err: any) => {
        if (err) { console.log(err) } else {
          console.log('first 20 posts File written  successfully\n')
        }
      })
  })

