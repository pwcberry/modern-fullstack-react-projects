import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import PostFilter from "./components/PostFilter";
import PostSorting from "./components/PostSorting";
import { getPosts } from "./api/posts";

function Blog() {
  const [author, setAuthor] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("descending");

  const postsQuery = useQuery({
    queryKey: ["posts", { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  });
  const posts = postsQuery.data ?? [];

  return (
    <>
      <CreatePost />
      <hr />
      <PostFilter label="Author" value={author} onChange={(value: string) => setAuthor(value)} />
      <hr />
      <PostSorting
        fields={["createdAt", "updatedAt"]}
        labels={["Created On", "Updated On"]}
        sortField={sortBy}
        onFieldChanged={(value: string) => setSortBy(value)}
        sortOrder={sortOrder}
        onOrderChanged={(value: string) => setSortOrder(value)}
      />
      <hr />
      <PostList posts={posts} />
    </>
  );
}

export default Blog;
