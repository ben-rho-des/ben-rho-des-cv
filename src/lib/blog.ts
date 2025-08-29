export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  slug: string;
  content?: string;
}

export interface BlogPostMetadata {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

// This will be populated at build time by Vite
export const posts = import.meta.glob('./routes/blog/posts/*.mdx', {
  eager: true,
  import: 'default'
});

export function getBlogPosts(): BlogPost[] {
  const postEntries = Object.entries(posts);
  
  return postEntries
    .map(([path, post]: [string, any]) => {
      const slug = path.split('/').pop()?.replace('.mdx', '') || '';
      const metadata = post.metadata as BlogPostMetadata;
      
      return {
        ...metadata,
        slug,
        content: post.default?.render?.()?.html || ''
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find(post => post.slug === slug);
}

export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getBlogPosts();
  return posts.filter(post => post.tags.includes(tag));
}
