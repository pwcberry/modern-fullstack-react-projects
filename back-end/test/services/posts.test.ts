import mongoose from "mongoose";
import {beforeAll, beforeEach, describe, expect, inject, test} from "vitest";
import * as service from "../../src/services/posts.ts";
import type {IPost} from "../../src/db/models/post.ts";
import {Post} from "../../src/db/models/post.ts";
import {initDatabase} from "../../src/db/init.ts";
import type {Nullable} from "../../src/types.ts";

const samplePosts = [
  {title: "Learning Redux", author: "Daniel Bugl", tags: ["redux"]},
  {title: "Learn React Hooks", author: "Daniel Bugl", tags: ["react"]},
  {
    title: "Full-Stack React Projects",
    author: "Daniel Bugl",
    tags: ["react", "nodejs"],
  },
  {title: "Guide to TypeScript"},
];

const UNKNOWN_POST_ID = "000000000000000000000000";

beforeAll(async () => {
  const MONGO_URI = inject("MONGO_URI");
  await initDatabase(MONGO_URI);
  return () => mongoose.disconnect();
});

describe("Posts", () => {
  let createdSamplePosts: IPost[] = [];

  beforeEach(async () => {
    // Reinitialize the database before each test to ensure a clean state
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

      const createdPost = await service.createPost(post as Partial<IPost>);
      expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId);

      const foundPost = await Post.findById(createdPost._id) as Nullable<IPost>;
      expect(foundPost).toEqual(expect.objectContaining(post as Partial<IPost>));
      expect(foundPost!.createdAt).toBeInstanceOf(Date);
      expect(foundPost!.updatedAt).toBeInstanceOf(Date);
    });

    test("without title parameter: it should fail", async () => {
      const post = {
        author: "Grace Hopper",
        contents: "This post is stored in MongoDB",
        tags: ["mongoose", "mongodb"],
      };

      try {
        await service.createPost(post);
      } catch (err) {
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect((err as Error).message).toContain("`title` is required");
      }
    });

    test("with minimal parameters: it should succeed", async () => {
      const post = {
        title: "Only a title",
      };
      const createdPost = await service.createPost(post);
      expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId);
    });
  });

  describe("list", () => {
    test("list all posts: it should succeed", async () => {
      const posts = await service.listAllPosts() as IPost[];
      expect(posts.length).toEqual(createdSamplePosts.length);
    });
    test("list all posts by default sorted by 'createdAt' descending: it should succeed", async () => {
      const posts = await service.listAllPosts() as IPost[];
      const sortedSamplePosts = createdSamplePosts.sort((a, b) => (b.createdAt!.valueOf()) - (a.createdAt!.valueOf()));

      // We cannot directly compare lists of documents returned by Mongoose because the documents will have hidden metadata
      // that Jest will attempt to compare
      expect(posts.map(p => p.createdAt)).toEqual(sortedSamplePosts.map(p => p.createdAt));
    });

    test("list all posts by 'updatedAt' ascending: it should succeed", async () => {
      const posts = await service.listAllPosts({sortBy: "updatedAt", sortOrder: "ascending"}) as IPost[];
      const sortedSamplePosts = createdSamplePosts.sort((a, b) => (a.updatedAt!.valueOf()) - (b.updatedAt!.valueOf()));
      expect(posts.map(p => p.updatedAt)).toEqual(sortedSamplePosts.map(p => p.updatedAt));
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
      expect(post!.author).toEqual(createdSamplePosts[0].author);
      expect(post!.title).toEqual(createdSamplePosts[0].title);
      expect(post!.contents).toEqual(createdSamplePosts[0].contents);
      expect(post!.createdAt?.valueOf()).toEqual(createdSamplePosts[0].createdAt?.valueOf());
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
      } as IPost);

      const updatedPost = await service.getPostById(createdSamplePosts[0]._id);
      expect(updatedPost!.author).toEqual("Anton Chekhov");
    });

    test("update specific property: it should not commit other changes", async () => {
      await service.updatePost(createdSamplePosts[0]._id, {
        author: "Anton Chekhov",
      });

      const updatedPost = await service.getPostById(createdSamplePosts[0]._id);
      expect(updatedPost!.title).toEqual("Learning Redux");
    });

    test("update post: it should change the timestamp", async () => {
      // Delay update
      await new Promise(resolve => setTimeout(resolve, 50));

      await service.updatePost(createdSamplePosts[0]._id, {
        author: "Anton Chekhov",
      });

      const updatedPost = await service.getPostById(createdSamplePosts[0]._id);
      expect(updatedPost!.updatedAt!.getTime()).toBeGreaterThan(createdSamplePosts[0].updatedAt!.getTime());
    });

    test("update post with unknown id: it should fail", async () => {
      const post = await service.updatePost(UNKNOWN_POST_ID, {title: "R Barthes"});
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
