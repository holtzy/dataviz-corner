import { Post } from "@/utils/types";
import { GetStaticPaths } from "next";
import content from "data/data-full.json";
import { slugify } from "@/utils/slugify";
import sanitizeHtml from "sanitize-html";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

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
  const cleanHTML = sanitizeHtml(page.content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: {
      a: ["href"],
    },
    allowedIframeHostnames: ["www.youtube.com"],
  });
  return (
    <>
      <div className="wrapperNarrow">
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: cleanHTML }}></div>
      </div>

      <Contact />
      <div className="wrapper">
        <Footer />
      </div>
    </>
  );
}
