export type Post = {
  _id: string;
  title: string;
  contents?: string;
  author?: string;
};

// eslint-disable-next-line
export type EventValueHandler<T> = (data: T) => void;
