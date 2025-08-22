import * as service from "../services/posts.js";

export function mountRoutes(app) {
  app.get("/api/v1/posts", async (req, res) => {
    const { sortby, sortorder, author, tag } = req.query;
    const options = { sortBy: sortby, sortOrder: sortorder };

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
