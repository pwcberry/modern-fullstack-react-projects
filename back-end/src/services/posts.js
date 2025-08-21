import { Post } from "../db/models/post.js";

async function listPosts(query = {}, { sortBy = "createdAt", sortOrder = "descending" } = {}) {
  return Post.find(query).sort({ [sortBy]: sortOrder });
}

export async function createPost({ title, author, contents, tags }) {
  const post = new Post({ title, author, contents, tags });
  return await post.save();
}
export async function listAllPosts(options) {
  return await listPosts({}, options);
}

export async function listPostsByAuthor(author, options) {
  return await listPosts({ author }, options);
}

export async function listPostsByTag(tags, options) {
  return await listPosts({ tags }, options);
}

export async function getPostById(id) {
  return Post.findById(id);
}

export async function updatePost(id, { title, author, contents, tags }) {
  return Post.findOneAndUpdate({ _id: id }, { $set: { title, author, contents, tags } }, { new: true });
}

export async function deletePost(id) {
  return Post.deleteOne({ _id: id });
}
