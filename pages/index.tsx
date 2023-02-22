import Head from "next/head";
import { blogs } from "data/blogs";
import { PostOverview } from "@/components/PostOverview";
import { Post } from "@/utils/types";
import fsPromises from "fs/promises";
import path from "path";
import { HeaderSection } from "@/components/HeaderSection";
import Contact from "@/components/Contact";
import { TopicPills } from "@/components/TopicPills";
import { SideBarTitle } from "@/components/SideBarTitle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type ComponentProps = {
  posts: Post[];
};

export default function Home(props: ComponentProps) {
  // const allBlogs = blogs.map((blog, i) => {
  //   return <p key={i}>{blog.title}</p>;
  // });

  const posts = props.posts;

  const allPosts = posts.map((post, i) => {
    return (
      <div key={i} className="">
        <PostOverview post={post} />
      </div>
    );
  });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="wrapper">
        <Navbar />
      </div>

      <HeaderSection />

      <main className="-mt-16">
        <div className="wrapper">
          <div className="flex flex-row w-full">
            {/* BLOG COLUMN */}
            <div className="w-3/4 pr-4">
              <SideBarTitle title="latest" />
              {allPosts}
            </div>

            {/* SIDEBAR */}
            <div className="w-1/4 pl-4">
              <SideBarTitle title="topics" />
              <TopicPills />
              <br />
              <SideBarTitle title="trending blogs" />
              <br />
              <SideBarTitle title="subscribe" />
              <p className="text-sm">Get a summary of the best blogs each week in your inbox.</p>
              <br />
              <SideBarTitle title="suggest a blog" />
              <br />
              <SideBarTitle title="about the viz corner" />
              <p className="text-sm">
                Tired of exploring 100s of bookmarks? Or to browse the dying bird-app? This page is
                made for you, harvesting all the best dataviz content!
              </p>
            </div>
          </div>
        </div>
      </main>

      <Contact />
      <div className="wrapper">
        <Footer />
      </div>
    </>
  );
}

// Load all the posts stored in a JSON file

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data/data-first-20.json");
  const jsonData = await fsPromises.readFile(filePath);
  const posts = JSON.parse(jsonData);

  return {
    props: {
      posts,
    },
  };
}
