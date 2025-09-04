<script lang="ts">
	import { page } from '$app/stores';
	import { getBlogPost } from '$lib/blog';

	const slug = $page.params.slug || '';
	const post = getBlogPost(slug);
</script>

{#if post}
	<article class="mx-auto max-w-4xl p-8">
		<header class="mb-12 text-center">
			<h1 class="mb-4 text-5xl font-bold">{post.title}</h1>
			<time class="mb-6 block text-lg text-gray-600" datetime={post.date}>
				{new Date(post.date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</time>
			<div class="mb-6 flex flex-wrap justify-center gap-3">
				{#each post.tags as tag (tag)}
					<span class="rounded-full bg-primary px-4 py-2 text-sm text-white">{tag}</span>
				{/each}
			</div>
		</header>

		<div class="prose prose-lg max-w-none">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html post.content}
		</div>

		<footer class="mt-12 border-t border-primary pt-8 text-center">
			<a href="/blog" class="text-lg text-primary hover:underline">← Back to Blog</a>
		</footer>
	</article>
{:else}
	<div class="py-12 text-center">
		<h1 class="mb-4 text-4xl font-bold">Post Not Found</h1>
		<p class="mb-6 text-gray-600">The blog post you're looking for doesn't exist.</p>
		<a href="/blog" class="text-lg text-primary hover:underline">← Back to Blog</a>
	</div>
{/if}
