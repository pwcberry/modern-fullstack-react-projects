import { Button, FormLabel, TextField } from "@mui/material";

export default function CreatePost() {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <div>
        <FormLabel htmlFor="create-title">Title:</FormLabel>
        <TextField id="create-title" name="title" variant="outlined" />
      </div>
      <div>
        <FormLabel htmlFor="create-author">Author:</FormLabel>
        <TextField id="create-author" name="author" variant="outlined" />
      </div>
      <div>
        <FormLabel htmlFor="create-description">Blog content:</FormLabel>
        <TextField id="create-description" name="description" variant="outlined" multiline rows={4} />
      </div>
      <footer>
        <Button variant="contained" type="submit">Create</Button>
      </footer>
    </form>
  );
}
