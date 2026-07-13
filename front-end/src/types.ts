export type Post = {
  _id?: string;
  title: string;
  author: string;
  contents: string;
};

// eslint-disable-next-line
export type EventValueHandler<T> = (data: T) => void;
