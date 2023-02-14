import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { blogs } from 'data/blogs.ts'

export default function Home() {

  const allPosts = blogs.map((blog, i) => {
    return (
      <p key={i}>{blog.title}</p>
    )
  })



  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className={styles.main}>
        <h1>The Dataviz Corner</h1>
        {allPosts}
      </main>


    </>
  )
}
