import { blogs } from "@/data/blogs";
import { Post } from "@/utils/types";
import { Pill } from "./Pill";

type PostOverviewProps = {
  post: Post;
};

export const PostOverview = ({ post }: PostOverviewProps) => {
  const postDescription =
    post.contentSnippet.length < 150
      ? post.contentSnippet
      : post.contentSnippet.slice(0, 150) + "...";

  const blogInfo = blogs.find((blog) => blog.title === post.blogTitle);

  if (!blogInfo) {
    return null;
  }

  const imgSrc = "/blogLogo/" + blogInfo.img;

  const date = new Date(post.isoDate);
  const formattedDate = date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      style={{ backgroundColor: "#111216" }}
      className="ease-in duration-100 hover:scale-105 border border-opacity-20 border-teal-600 rounded-md bg-gray-900 flex w-full h-full mb-4 hover:shadow-custom cursor-pointer"
    >
      <div className="w-1/5 flex justify-center items-center">
        <img src={imgSrc} className="h-20 w-20 rounded-full" />
      </div>
      <div className="w-4/5 px-4 py-4">
        <p className="text-xl font-semibold text-white">{post.title}</p>

        <p className="text-sm font-light text-white leading-6">{postDescription}</p>

        <div className="flex items-baseline">
          <p>
            <span className="font-extralight text-sm text-gray-50 italic">posted in </span>
            <span className="font-extralight text-sm text-gray-200 mr-2">
              <a>{post.blogTitle}</a>
            </span>
            <span className="font-extralight text-sm text-gray-200 mr-2">|</span>
            <span className="font-extralight text-sm text-gray-50 italic mr-2">
              {formattedDate}
            </span>
            <span className="font-extralight text-sm text-gray-200 mr-2">|</span>
          </p>
          {blogInfo.topics.map((topic) => (
            <Pill label={topic} color="#69b3a9" />
          ))}
        </div>
      </div>
    </div>
  );
};
