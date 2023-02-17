import { Post } from "@/Utils/types";

type PostOverviewProps = {
  post: Post;
};

export const PostOverview = ({ post }: PostOverviewProps) => {
  return (
    <div className="border border-white rounded-md my-8 px-4 py-2">
      <h1 className="text-2xl font-medium text-purple-400">{post.title}</h1>

      <p className="font-light">{post.contentSnippet}</p>
    </div>
  );
};
