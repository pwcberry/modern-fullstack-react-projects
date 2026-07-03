export default function CreatePost() {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <div>
        <label htmlFor="create-title">Title: </label>
        <input type="text" name="title" id="create-title" />
      </div>
      <div>
        <label htmlFor="create-author">Author: </label>
        <input type="text" name="author" id="create-author" />
      </div>
      <div>
        <textarea name="content" id="create-content"></textarea>
      </div>
      <footer>
        <button type="submit">Create</button>
      </footer>
    </form>
  );
}
