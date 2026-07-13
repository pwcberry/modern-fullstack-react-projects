import { useQuery } from "@tanstack/react-query";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import PostFilter from "./components/PostFilter";
import PostSorting from "./components/PostSorting";
import { getPosts } from "./api/posts";

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
