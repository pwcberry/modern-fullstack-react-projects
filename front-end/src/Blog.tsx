import { useQuery } from "@tanstack/react-query";
import PostList from "./component/PostList";
import CreatePost from "./component/CreatePost";
import PostFilter from "./component/PostFilter";
import PostSorting from "./component/PostSorting";
import { getPosts } from "./api/posts.ts";

function Blog() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });
  const posts = postsQuery.data ?? [];

  return (
    <>
      <CreatePost />
      <hr />
      <p>Filter by:</p>
      <PostFilter field="author" />
      <hr />
      <PostSorting fields={["createdAt", "updatedAt"]} />
      <hr />
      <PostList posts={posts} />
    </>
  );
}

export default Blog;
