import { Post } from "../db/models/post.ts";
import type { IPost } from "../db/models/post.ts";

type SortOrder = "ascending" | "descending";

interface ListOptions {
  sortBy?: string;
  sortOrder?: SortOrder;
}

async function listPosts(query: Record<string, unknown> = {}, { sortBy = "createdAt", sortOrder = "descending" }: ListOptions = {}): Promise<IPost[]> {
  return Post.find(query).sort({ [sortBy]: sortOrder as SortOrder });
}

async function createPost({ title, author, contents, tags }: Partial<IPost> & { title?: string }): Promise<IPost> {
  const post = new Post({ title, author, contents, tags });
  return await post.save();
}

async function listAllPosts(options?: ListOptions): Promise<IPost[]> {
  return await listPosts({}, options);
}

async function listPostsByAuthor(author: string, options?: ListOptions): Promise<IPost[]> {
  return await listPosts({ author }, options);
}

async function listPostsByTag(tags: string | string[], options?: ListOptions): Promise<IPost[]> {
  return await listPosts({ tags }, options);
}

async function getPostById(id: string) {
  return Post.findById(id);
}

async function updatePost(id: string, { title, author, contents, tags }: Partial<IPost>) {
  return Post.findOneAndUpdate({ _id: id }, { $set: { title, author, contents, tags } }, { new: true });
}

async function deletePost(id: string) {
  return Post.deleteOne({ _id: id });
}

export { createPost, listAllPosts, listPostsByAuthor, listPostsByTag, getPostById, updatePost, deletePost };




