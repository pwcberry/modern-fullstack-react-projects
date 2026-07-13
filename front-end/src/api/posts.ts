import type { Post } from "../types.ts";

interface PostQueryParams {
  author: string;
  sortBy: string;
  sortOrder: string;
}

export async function getPosts(queryParams?: PostQueryParams): Promise<Post[]> {
  const uri = new URL("./posts", import.meta.env.VITE_API_URL_STEM);

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      uri.searchParams.append(key, value);
    }
  }

  const response = await fetch(uri);
  return await response.json() as Post[];
}
