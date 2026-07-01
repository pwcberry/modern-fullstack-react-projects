import { Post } from "../db/models/post.ts";
import type { IPost } from "../db/models/post.ts";
import type { DeleteResult, UpdateResult } from "mongodb";
import type { ListOptions, SortOrder, Nullable } from "../types.ts";

async function listPosts(query: Record<string, unknown> = {}, {
  sortBy = "createdAt",
  sortOrder = "descending",
}: ListOptions = {}): Promise<IPost[]> {
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

async function getPostById(id: string): Promise<Nullable<IPost>> {
  return Post.findById(id);
}

async function updatePost(id: string, {
  title,
  author,
  contents,
  tags,
}: Partial<IPost>): Promise<Nullable<UpdateResult>> {
  return Post.findOneAndUpdate({ _id: id }, { $set: { title, author, contents, tags } }, { new: true });
}

async function deletePost(id: string): Promise<DeleteResult> {
  return Post.deleteOne({ _id: id });
}

export { createPost, listAllPosts, listPostsByAuthor, listPostsByTag, getPostById, updatePost, deletePost };
