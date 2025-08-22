import * as service from "../services/posts.js";

function mountGetRoutes(app) {
  app.get("/api/v1/posts", async (req, res) => {
    const { sortby, orderby, author, tag } = req.query;
    const options = { sortBy: sortby, sortOrder: orderby };

    try {
      if (author && tag) {
        return res.status(400).json({ error: "Query by either author or tag, not both" });
      } else if (author) {
        return res.json(await service.listPostsByAuthor(author, options));
      } else if (tag) {
        return res.json(await service.listPostsByTag(tag, options));
      } else {
        return res.json(await service.listAllPosts(options));
      }
    } catch (error) {
      console.error("Cannot list posts", error);
      return res.status(500).end();
    }
  });

  app.get("/api/v1/posts/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const post = await service.getPostById(id);
      if (post === null) {
        return res.status(404).end();
      }
      return res.json(post);
    } catch (error) {
      console.error("Cannot retrieve post", error);
      return res.status(500).end();
    }
  });
}

function mountPostRoutes(app) {
  app.post("/api/v1/posts", async (req, res) => {
    try {
      const post = await service.createPost(req.body);
      return res.json(post);
    } catch (error) {
      console.error("Cannot create post", error);
      return res.status(500).end();
    }
  });
}

function mountPatchRoutes(app) {
  app.patch("/api/v1/posts/:id", async (req, res) => {
    try {
      const post = await service.updatePost(req.params.id, req.body);
      return res.json(post);
    } catch (error) {
      console.error("Cannot update post", error);
      return res.status(500).end();
    }
  });
}

function mountDeleteRoutes(app) {
  app.delete("/api/v1/posts/:id", async (req, res) => {
    try {
      const { deletedCount } = await service.deletePost(req.params.id);
      if (deletedCount === 0) {
        return res.status(404).end();
      }
      return res.status(204).end();
    } catch (error) {
      console.error("Cannot delete post", error);
      return res.status(500).end();
    }
  });
}

export function mountRoutes(app) {
  mountGetRoutes(app);
  mountPostRoutes(app);
  mountPatchRoutes(app);
  mountDeleteRoutes(app);
}
