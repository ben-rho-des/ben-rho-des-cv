#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDir = path.join(__dirname, '../src/routes/blog/posts');

const args = process.argv.slice(2);
const title = args[0];
const date = args[1] || new Date().toISOString().split('T')[0];

if (!title) {
	console.error('Usage: node create-post.js "Post Title" [YYYY-MM-DD]');
	console.error('Example: node create-post.js "My Awesome Post" 2024-01-15');
	process.exit(1);
}

const slug = title
	.toLowerCase()
	.replace(/[^a-z0-9\s-]/g, '')
	.replace(/\s+/g, '-')
	.trim();

const filename = `${slug}.mdx`;
const filepath = path.join(postsDir, filename);

const content = `---
title: "${title}"
date: "${date}"
excerpt: "Write a brief description of your post here"
tags: ["tag1", "tag2"]
---

# ${title}

Write your post content here.

## Introduction

Start with an introduction to your topic.

## Main Content

Add your main content here.

## Conclusion

Wrap up your thoughts.

---

*Written with ❤️ and ☕*
`;

if (!fs.existsSync(postsDir)) {
	fs.mkdirSync(postsDir, { recursive: true });
}

if (fs.existsSync(filepath)) {
	console.error(`Error: Post "${filename}" already exists!`);
	process.exit(1);
}

try {
	fs.writeFileSync(filepath, content);
	console.log(`✅ Created new blog post: ${filename}`);
	console.log(`📝 Edit the file at: ${filepath}`);
	console.log(`🌐 View at: http://localhost:5173/blog/${slug}`);
} catch (error) {
	console.error('Error creating post:', error.message);
	process.exit(1);
}
