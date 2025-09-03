<script lang="ts">
	import { getBlogPosts } from '$lib/blog';

	const posts = getBlogPosts();
</script>

<div class="mx-auto grid max-w-6xl grid-cols-6 gap-8 p-8">
	<h1 class="col-span-6 mb-8 text-5xl font-bold">Blog</h1>

	{#if posts.length > 0}
		{#each posts as post (post.slug)}
			<article class="col-span-3 mb-8">
				<h2 class="mb-3 text-2xl font-semibold">
					<a href="/blog/{post.slug}" class="text-primary hover:underline">{post.title}</a>
				</h2>
				<time class="mb-3 block text-sm text-gray-600" datetime={post.date}>
					{new Date(post.date).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</time>
				<p class="mb-4 leading-relaxed text-gray-700">{post.excerpt}</p>
				<div class="flex flex-wrap gap-2">
					{#each post.tags as tag (tag)}
						<span class="bg-primary rounded-full px-3 py-1 text-sm text-white">{tag}</span>
					{/each}
				</div>
			</article>
		{/each}
	{:else}
		<p class="col-span-6 text-gray-600">Posts coming soon.</p>
	{/if}
</div>

<!-- Responsive styles -->
<style>
	@media (max-width: 860px) {
		.grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.col-span-3 {
			grid-column: 1 / -1;
		}

		.col-span-6 {
			grid-column: 1 / -1;
		}
	}
</style>
