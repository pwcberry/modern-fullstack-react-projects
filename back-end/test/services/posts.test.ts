import mongoose from "mongoose";
import { beforeEach, describe, expect, test } from "vitest";
import * as service from "../../src/services/posts.ts";
import { Post } from "../../src/db/models/post.ts";

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
  let createdSamplePosts: any[] = [];

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

      const createdPost = await service.createPost(post as any);
      expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId);

      const foundPost = await Post.findById(createdPost._id) as any;
      expect(foundPost).toEqual(expect.objectContaining(post as any));
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
        await service.createPost(post as any);
      }
      catch (err) {
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect((err as Error).message).toContain("`title` is required");
      }
    });

    test("with minimal parameters: it should succeed", async () => {
      const post = {
        title: "Only a title",
      };
      const createdPost = await service.createPost(post as any);
      expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId);
    });
  });

  describe("list", () => {
    test("list all posts: it should succeed", async () => {
      const posts = await service.listAllPosts() as any[];
      expect(posts.length).toEqual(createdSamplePosts.length);
    });
    test("list all posts by default sorted by 'createdAt' descending: it should succeed", async () => {
      const posts = await service.listAllPosts() as any[];
      const sortedSamplePosts = createdSamplePosts.sort((a, b) => (b.createdAt as any) - (a.createdAt as any));

      // We cannot directly compare lists of documents returned by Mongoose because the documents will have hidden metadata
      // that Jest will attempt to compare
      expect(posts.map((p: any) => p.createdAt)).toEqual(sortedSamplePosts.map((p: any) => p.createdAt));
    });

    test("list all posts by 'updatedAt' ascending: it should succeed", async () => {
      const posts = await service.listAllPosts({ sortBy: "updatedAt", sortOrder: "ascending" }) as any[];
      const sortedSamplePosts = createdSamplePosts.sort((a, b) => (a.updatedAt as any) - (b.updatedAt as any));
      expect(posts.map((p: any) => p.updatedAt)).toEqual(sortedSamplePosts.map((p: any) => p.updatedAt));
    });

    test("list posts filtered by author: it should succeed", async () => {
      const posts = await service.listPostsByAuthor("Daniel Bugl");
      expect(posts.length).toBe(3);
    });

    test("list posts filtered by tag: it should succeed", async () => {
      const posts = await service.listPostsByTag("nodejs");
      expect(posts.length).toBe(1);
    });
  });

  describe("get", () => {
    test("get post by id: it should succeed", async () => {
      const post = await service.getPostById(createdSamplePosts[0]._id);
      expect(post!.toObject()).toEqual(createdSamplePosts[0].toObject());
    });

    test("get post by unknown id: it should fail", async () => {
      const post = await service.getPostById(UNKNOWN_POST_ID);
      expect(post).toBeNull();
    });
  });

  describe("update", () => {
    test("update specific property: it should succeed", async () => {
      await service.updatePost(createdSamplePosts[0]._id, {
        author: "Anton Chekhov",
      } as any);

      const updatedPost = await service.getPostById(createdSamplePosts[0]._id);
      expect(updatedPost!.author).toEqual("Anton Chekhov");
    });

    test("update specific property: it should not commit other changes", async () => {
      await service.updatePost(createdSamplePosts[0]._id, {
        author: "Anton Chekhov",
      } as any);

      const updatedPost = await service.getPostById(createdSamplePosts[0]._id);
      expect(updatedPost!.title).toEqual("Learning Redux");
    });

    test("update post: it should change the timestamp", async () => {
      await service.updatePost(createdSamplePosts[0]._id, {
        author: "Anton Chekhov",
      } as any);

      const updatedPost = await service.getPostById(createdSamplePosts[0]._id);
      expect(updatedPost!.updatedAt?.getTime()).toBeGreaterThan(createdSamplePosts[0].updatedAt.getTime());
    });

    test("update post with unknown id: it should fail", async () => {
      const post = await service.updatePost(UNKNOWN_POST_ID, { title: "R Barthes" } as any);
      expect(post).toBeNull();
    });
  });

  describe("delete", () => {
    test("delete post: it should succeed", async () => {
      const result = await service.deletePost(createdSamplePosts[0]._id);
      expect(result.deletedCount).toBe(1);
      const deletedPost = await service.getPostById(createdSamplePosts[0]._id);
      expect(deletedPost).toBeNull();
    });
    test("delete post with unknown id: it should fail", async () => {
      const result = await service.deletePost(UNKNOWN_POST_ID);
      expect(result.deletedCount).toBe(0);
    });
  });
});

