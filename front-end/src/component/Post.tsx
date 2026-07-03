interface PostPropTypes {
  title: string;
  contents?: string;
  author?: string;
}

function Post({ title, contents, author }: PostPropTypes) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{contents}</p>
      {author && (
        <p className="author">
          Written by&nbsp;
          <strong>{author}</strong>
        </p>
      )}
    </article>
  );
}

export default Post;
