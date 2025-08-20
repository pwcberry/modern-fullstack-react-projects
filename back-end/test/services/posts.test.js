import mongoose from "mongoose";
import { describe, expect, test, beforeEach } from "@jest/globals";
import { createPost, listAllPosts, listPostsByAuthor, listPostsByTag } from "../../src/services/posts.js";
import { Post } from "../../src/db/models/post.js";

const samplePosts = [
  { title: "Learning Redux", author: "Daniel Bugl", tags: ["redux"] },
  { title: "Learn React Hooks", author: "Daniel Bugl", tags: ["react"] },
  {
    title: "Full-Stack React Projects",
    author: "Daniel Bugl",
    tags: ["react", "nodejs"],
  },
  { title: "Guide to TypeScript" },
];

describe("Posts", () => {
  let createdSamplePosts = [];

  beforeEach(async () => {
    await Post.deleteMany({});
    createdSamplePosts = [];
    for (const post of samplePosts) {
      const createdPost = new Post(post);
      createdSamplePosts.push(await createdPost.save());
    }
  });

  describe("create", () => {
    test("with all parameters: it should succeed", async () => {
      const post = {
        title: "Hello Mongoose!",
        author: "Grace Hopper",
        contents: "This post is stored in MongoDB",
        tags: ["mongoose", "mongodb"],
      };

      const createdPost = await createPost(post);
      expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId);

      const foundPost = await Post.findById(createdPost._id);
      expect(foundPost).toEqual(expect.objectContaining(post));
      expect(foundPost.createdAt).toBeInstanceOf(Date);
      expect(foundPost.updatedAt).toBeInstanceOf(Date);
    });

    test("without title parameter: it should fail", async () => {
      const post = {
        author: "Grace Hopper",
        contents: "This post is stored in MongoDB",
        tags: ["mongoose", "mongodb"],
      };

      try {
        await createPost(post);
      } catch (err) {
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.message).toContain("`title` is required");
      }
    });

    test("with minimal parameters: it should succeed", async () => {
      const post = {
        title: "Only a title",
      };
      const createdPost = await createPost(post);
      expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId);
    });
  });

  describe("list", () => {
    test("list all posts: it should succeed", async () => {
      const posts = await listAllPosts();
      expect(posts.length).toEqual(createdSamplePosts.length);
    });
    test("list all posts by default sorted by 'createdAt' descending: it should succeed", async () => {
      const posts = await listAllPosts();
      const sortedSamplePosts = createdSamplePosts.sort((a, b) => b.createdAt - a.createdAt);

      // We cannot directly compare lists of documents returned by Mongoose because the documents will have hidden metadata
      // that Jest will attempt to compare
      expect(posts.map((p) => p.createdAt)).toEqual(sortedSamplePosts.map((p) => p.createdAt));
    });
  });
  test("list all posts by 'updatedAt' ascending: it should succeed", async () => {
    const posts = await listAllPosts({ sortBy: "updatedAt", sortOrder: "ascending" });
    const sortedSamplePosts = createdSamplePosts.sort((a, b) => a.updatedAt - b.updatedAt);
    expect(posts.map((p) => p.updatedAt)).toEqual(sortedSamplePosts.map((p) => p.updatedAt));
  });
  test("list posts filtered by author: it should succeed", async () => {
    const posts = await listPostsByAuthor("Daniel Bugl");
    expect(posts.length).toBe(3);
  });
  test("list posts filtered by tag: it should succeed", async () => {
    const posts = await listPostsByTag("nodejs");
    expect(posts.length).toBe(1);
  });
});
