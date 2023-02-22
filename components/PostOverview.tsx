import { Post } from "@/utils/types";
import { Pill } from "./Pill";

type PostOverviewProps = {
  post: Post;
};

export const PostOverview = ({ post }: PostOverviewProps) => {
  return (
    <div className="border-white rounded-md mb-8 px-4 py-2 bg-gray-900">
      <Pill label="react" color="#69b3a9" />
      <h1 className="text-2xl font-medium text-purple-200">{post.title}</h1>

      <p className="font-light">{post.contentSnippet}</p>
      <p className="font-extralight text-sm text-gray-200">posted in datawrapper blogs</p>
    </div>
  );
};
