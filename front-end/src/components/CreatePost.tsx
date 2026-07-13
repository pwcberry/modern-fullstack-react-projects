import { Button, TextField } from "@mui/material";

export default function CreatePost() {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <div>
        <TextField id="create-title" name="title" label="Title:" variant="outlined" />
      </div>
      <div>
        <TextField id="create-author" name="author" label="Author:" variant="outlined" />
      </div>
      <div>
        <TextField id="create-content" name="content" label="Post content:" variant="outlined" multiline rows={4} />
      </div>
      <footer>
        <Button variant="contained" type="submit">Create</Button>
      </footer>
    </form>
  );
}
