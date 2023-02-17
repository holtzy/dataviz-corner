import { Post } from "@/Utils/types";

type PostOverviewProps = {
  post: Post;
};

export const PostOverview = ({ post }: PostOverviewProps) => {
  return (
    <div className="border-white rounded-md mb-8 px-4 py-2 bg-gray-900">
      <h1 className="text-2xl font-medium text-purple-200">{post.title}</h1>

      <p className="font-light">{post.contentSnippet}</p>
    </div>
  );
};
