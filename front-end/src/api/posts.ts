import type { Post } from "../types.ts";

export async function getPosts(queryParams?: string[][]): Promise<Post[]> {
  const uri = new URL("/posts", import.meta.env.VITE_API_URL_STEM);
  if (Array.isArray(queryParams)) {
    for (const param of queryParams) {
      uri.searchParams.append(param[0], param[1]);
    }
  }
  const response = await fetch(uri);
  return await response.json() as Post[];
}
