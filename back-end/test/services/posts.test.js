import mongoose from "mongoose";
import { describe, expect, test } from "@jest/globals";
import { createPost } from "../../src/services/posts.js";
import { Post } from "../../src/db/models/post.js";

describe("Posts", () => {
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
});
