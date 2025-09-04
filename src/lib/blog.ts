import type { BlogPost } from './types';

import blogPosts from './blog-posts.json';

export function getBlogPosts(): BlogPost[] {
	return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | undefined {
	const posts = getBlogPosts();
	return posts.find((post) => post.slug === slug);
}

export function getPostsByTag(tag: string): BlogPost[] {
	const posts = getBlogPosts();
	return posts.filter((post) => post.tags.includes(tag));
}
