import * as service from "../services/posts.ts";
import type { Express, Request, Response } from "express";
import type { ListOptions, SortOrder } from "../types.ts";

function mountGetRoutes(app: Express): void {
  app.get("/api/v1/posts", async (req: Request, res: Response) => {
    const { sortby, orderby, author, tag } = req.query as Record<string, string>;
    const options: ListOptions = { sortBy: sortby, sortOrder: orderby as SortOrder };

    try {
      if (author && tag) {
        return res.status(400).json({ error: "Query by either author or tag, not both" });
      }
      else if (author) {
        return res.json(await service.listPostsByAuthor(author as string, options));
      }
      else if (tag) {
        return res.json(await service.listPostsByTag(tag as string, options));
      }
      else {
        return res.json(await service.listAllPosts(options));
      }
    }
    catch (error) {
      console.error("Cannot list posts", error);
      return res.status(500).end();
    }
  });

  app.get("/api/v1/posts/:id", async (req: Request, res: Response) => {
    const { id } = req.params as Record<string, string>; // Force the type analyzer to recognize this as a single value
    try {
      const post = await service.getPostById(id);
      if (post === null) {
        return res.status(404).end();
      }
      return res.json(post);
    }
    catch (error) {
      console.error("Cannot retrieve post", error);
      return res.status(500).end();
    }
  });
}

function mountPostRoutes(app: Express): void {
  app.post("/api/v1/posts", async (req: Request, res: Response) => {
    try {
      const post = await service.createPost(req.body);
      return res.json(post);
    }
    catch (error) {
      console.error("Cannot create post", error);
      return res.status(500).end();
    }
  });
}

function mountPatchRoutes(app: Express): void {
  app.patch("/api/v1/posts/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params as Record<string, string>; // Force the type analyzer to recognize this as a single value
      const post = await service.updatePost(id, req.body);
      return res.json(post);
    }
    catch (error) {
      console.error("Cannot update post", error);
      return res.status(500).end();
    }
  });
}

function mountDeleteRoutes(app: Express): void {
  app.delete("/api/v1/posts/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params as Record<string, string>; // Force the type analyzer to recognize this as a single value
      const { deletedCount } = await service.deletePost(id);
      if (deletedCount === 0) {
        return res.status(404).end();
      }
      return res.status(204).end();
    }
    catch (error) {
      console.error("Cannot delete post", error);
      return res.status(500).end();
    }
  });
}

export function mountRoutes(app: Express): void {
  mountGetRoutes(app);
  mountPostRoutes(app);
  mountPatchRoutes(app);
  mountDeleteRoutes(app);
}
