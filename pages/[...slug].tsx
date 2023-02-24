import { Post } from "@/utils/types";
import fsPromises from "fs/promises";
import path from "path";
import { GetStaticPaths } from "next";
import content from "data/data-first-20.json";
import { slugify } from "@/utils/slugify";

type ComponentProps = {
  posts: Post[];
};

export async function getStaticPaths() {
  const paths = content.map((page) => {
    const slug = slugify(page.title);
    return { params: { slug: [slug] } };
  });
  return { paths, fallback: true };
}

export async function getStaticProps({ params }: any) {
  const page = content.find((page) => slugify(page.title) === params.slug[0]) || { notfound: true };
  return { props: { page } };
}

export default function Page({ page }) {
  return (
    <>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.contentSnippet }}></div>
    </>
  );
}
