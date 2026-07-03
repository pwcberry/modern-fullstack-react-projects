import Post from "./component/Post.tsx";

function App() {
  return (
    <>
      <main>
        <h1>Modern Full-stack React Development</h1>
        <div>
          <Post title="Full-stack React Projects" contents="I'd rather write SPAs with Vue or Svelte." author="Peter Berry" />
        </div>
      </main>
    </>
  );
}

export default App;
