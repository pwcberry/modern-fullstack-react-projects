import mongoose from "mongoose";
import { beforeEach, describe, expect, test } from "@jest/globals";
import {
  createPost,
  deletePost,
  getPostById,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  updatePost,
} from "../../src/services/posts.js";
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

const UNKNOWN_POST_ID = "000000000000000000000000";

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

  describe("get", () => {
    test("get post by id: it should succeed", async () => {
      const post = await getPostById(createdSamplePosts[0]._id);
      expect(post.toObject()).toEqual(createdSamplePosts[0].toObject());
    });

    test("get post by unknown id: it should fail", async () => {
      const post = await getPostById(UNKNOWN_POST_ID);
      expect(post).toBeNull();
    });
  });

  describe("update", () => {
    test("update specific property: it should succeed", async () => {
      await updatePost(createdSamplePosts[0]._id, {
        author: "Anton Chekhov",
      });

      const updatedPost = await getPostById(createdSamplePosts[0]._id);
      expect(updatedPost.author).toEqual("Anton Chekhov");
    });

    test("update specific property: it should not commit other changes", async () => {
      await updatePost(createdSamplePosts[0]._id, {
        author: "Anton Chekhov",
      });

      const updatedPost = await getPostById(createdSamplePosts[0]._id);
      expect(updatedPost.title).toEqual("Learning Redux");
    });

    test("update post: it should change the timestamp", async () => {
      await updatePost(createdSamplePosts[0]._id, {
        author: "Anton Chekhov",
      });

      const updatedPost = await getPostById(createdSamplePosts[0]._id);
      expect(updatedPost.updatedAt.getTime()).toBeGreaterThan(createdSamplePosts[0].updatedAt.getTime());
    });

    test("update post with unknown id: it should fail", async () => {
      const post = await updatePost(UNKNOWN_POST_ID, { title: "R Barthes" });
      expect(post).toBeNull();
    });
  });

  describe("delete", () => {
    test("delete post: it should succeed", async () => {
      const result = await deletePost(createdSamplePosts[0]._id);
      expect(result.deletedCount).toBe(1);
      const deletedPost = await getPostById(createdSamplePosts[0]._id);
      expect(deletedPost).toBeNull();
    });
    test("delete post with unknown id: it should fail", async () => {
      const result = await deletePost(UNKNOWN_POST_ID);
      expect(result.deletedCount).toBe(0);
    });
  });
});
