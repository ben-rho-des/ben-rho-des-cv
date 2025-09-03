# Blog System Documentation

## Overview

This SvelteKit site includes a blog system built with MDX (Markdown + JSX) that allows you to write posts in Markdown with frontmatter metadata.

## How to Add Blog Posts

### 1. Create a new post

Create a new `.mdx` file in `src/routes/blog/posts/` with the following structure:

```mdx
---
title: 'Your Post Title'
date: '2024-01-15'
excerpt: 'A brief description of your post'
tags: ['tag1', 'tag2', 'tag3']
---

# Your Post Content

Write your post content in Markdown here.

## You can use all standard Markdown features:

- **Bold text**
- _Italic text_
- [Links](https://example.com)
- Code blocks
- Lists
- And more!

## You can also use Svelte components

If you need interactive elements, you can import and use Svelte components directly in your MDX files.
```

### 2. File naming convention

- Use kebab-case for filenames (e.g., `my-awesome-post.mdx`)
- The filename becomes the URL slug (e.g., `/blog/my-awesome-post`)

### 3. Frontmatter fields

- **title**: The post title (required)
- **date**: Publication date in YYYY-MM-DD format (required)
- **excerpt**: Brief description shown in the blog listing (required)
- **tags**: Array of tags for categorization (optional)

## Blog Features

### Automatic Features

- Posts are automatically sorted by date (newest first)
- Tags are displayed and can be used for filtering
- Responsive design with hover effects
- SEO-friendly URLs

### Styling

- Posts use the Space Mono font for body text
- Consistent with the site's design system
- Responsive typography and spacing

## Development Workflow

1. **Write**: Create/edit `.mdx` files in `src/routes/blog/posts/`
2. **Preview**: Run `npm run dev` to see changes in real-time
3. **Build**: Run `npm run build` to generate the static site
4. **Deploy**: Upload the `build/` folder to your hosting service

## Advanced Usage

### Custom Components in Posts

You can import and use Svelte components in your MDX files:

```mdx
---
title: 'Post with Components'
date: '2024-01-15'
excerpt: 'Using Svelte components in MDX'
tags: ['advanced', 'components']
---

<script>import MyComponent from '$lib/components/MyComponent.svelte';</script>

# Post with Components

<MyComponent />

Regular markdown content continues here...
```

### Tag-based Filtering

The blog system supports filtering posts by tags. You can extend the functionality by adding tag pages or filtering UI.

## File Structure

```
src/
├── routes/
│   └── blog/
│       ├── +page.svelte          # Blog listing page
│       ├── [slug]/
│       │   └── +page.svelte      # Individual post page
│       └── posts/                # Your MDX files go here
│           ├── hello-world.mdx
│           └── another-post.mdx
└── lib/
    └── blog.ts                   # Blog utilities
```

## Tips for Writing Posts

1. **Keep frontmatter consistent** - Use the same date format and structure
2. **Use descriptive filenames** - They become your URLs
3. **Write good excerpts** - They appear in the blog listing
4. **Use tags wisely** - Don't over-tag, but be descriptive
5. **Test your posts** - Always preview before publishing

## Troubleshooting

### Post not showing up?

- Check that the frontmatter is properly formatted
- Ensure the file is in the correct directory
- Restart the dev server after adding new files

### Build errors?

- Verify all MDX files have valid frontmatter
- Check for syntax errors in your markdown
- Ensure all imported components exist

## Future Enhancements

Potential improvements you could add:

- Search functionality
- Tag-based filtering
- Related posts
- Reading time estimates
- Social sharing
- Comments system
- RSS feed generation
