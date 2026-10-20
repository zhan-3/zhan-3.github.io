import { existsSync } from 'node:fs';
import { getCollection } from 'astro:content';

export async function getPosts() {
  // The content cache can retain deleted entries. A withdrawn source must never be served.
  return (await getCollection('posts'))
    .filter(post => post.filePath && existsSync(post.filePath))
    .sort((a, b) => b.data.date.localeCompare(a.data.date) || a.id.localeCompare(b.id));
}
