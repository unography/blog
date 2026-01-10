import type { CollectionEntry } from 'astro:content';

export interface PaginationResult {
  posts: CollectionEntry<'posts'>[];
  prevUrl: string | undefined;
  nextUrl: string | undefined;
}

function getPrevUrl(page: number, baseUrl: string): string | undefined {
  if (page <= 1) return undefined;
  if (page === 2) return baseUrl || '/';
  return `${baseUrl}/page/${page - 1}`;
}

export function paginatePosts(
  posts: CollectionEntry<'posts'>[],
  page: number,
  postsPerPage: number,
  baseUrl: string = ''
): PaginationResult {
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (page - 1) * postsPerPage;

  return {
    posts: posts.slice(startIndex, startIndex + postsPerPage),
    prevUrl: getPrevUrl(page, baseUrl),
    nextUrl: page < totalPages ? `${baseUrl}/page/${page + 1}` : undefined
  };
}
