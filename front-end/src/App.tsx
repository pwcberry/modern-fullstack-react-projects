import PostList from "./component/PostList";
import type { Post } from "./types";

const posts: Post[] = [
  {
    _id: "1",
    title: "The joy of full-stack development",
    contents: "Stretch yourself and learn all about the software stack for the web",
    author: "Peter Berry",
  },
  { _id: "2", title: "Hello world" },
];

function App() {
  return (
    <PostList posts={posts} />
  );
}

export default App;
