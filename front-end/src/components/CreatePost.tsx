import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, FormLabel, TextField } from "@mui/material";
import { createPost } from "../api/posts";

const notEmpty = (s: string) => typeof s === "string" && s.trim().length > 0;

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [contents, setContents] = useState("");
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: () => createPost({ title, author, contents }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const canSubmit: boolean = notEmpty(title) && notEmpty(author) && notEmpty(contents);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      createPostMutation.mutate();
    }}
    >
      <div>
        <FormLabel htmlFor="create-title">Title:</FormLabel>
        <TextField
          id="create-title"
          name="title"
          variant="outlined"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div>
        <FormLabel htmlFor="create-author">Author:</FormLabel>
        <TextField
          id="create-author"
          name="author"
          variant="outlined"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <FormLabel htmlFor="create-contents">Blog content:</FormLabel>
        <TextField
          id="create-contents"
          name="contents"
          variant="outlined"
          multiline
          rows={4}
          value={contents}
          onChange={e => setContents(e.target.value)}
        />
      </div>
      <footer>
        <Button variant="contained" type="submit" disabled={!canSubmit || createPostMutation.isPending}>
          {createPostMutation.isPending ? "Creating..." : "Create"}
        </Button>
        {createPostMutation.isSuccess
          ? (<p>Post created successfully!</p>)
          : null}
      </footer>
    </form>
  );
}
