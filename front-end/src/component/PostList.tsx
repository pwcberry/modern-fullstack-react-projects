import { Fragment } from "react";
import PostView from "./Post";
import type { Post } from "../types";

interface ListPropTypes {
  posts: Post[];
}

export default function PostList({ posts = [] }: ListPropTypes) {
  return (
    <div>
      {posts.map(post => (
        <Fragment key={post._id}>
          <PostView {...post} />
          <hr />
        </Fragment>
      ))}
    </div>
  );
}
