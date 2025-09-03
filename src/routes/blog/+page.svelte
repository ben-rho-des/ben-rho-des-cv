<script lang="ts">
  import { getBlogPosts } from '$lib/blog';
  
  const posts = getBlogPosts();
</script>

<div class="grid grid-cols-6 gap-8 max-w-6xl mx-auto p-8">
  <h1 class="col-span-6 text-5xl font-bold mb-8">Blog</h1>

  {#if posts.length > 0}
    {#each posts as post}
      <article class="col-span-3 mb-8">
        <h2 class="text-2xl font-semibold mb-3">
          <a href="/blog/{post.slug}" class="text-primary hover:underline">{post.title}</a>
        </h2>
        <time class="block text-gray-600 text-sm mb-3" datetime={post.date}>
          {new Date(post.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </time>
        <p class="text-gray-700 mb-4 leading-relaxed">{post.excerpt}</p>
        <div class="flex gap-2 flex-wrap">
          {#each post.tags as tag}
            <span class="bg-primary text-white px-3 py-1 rounded-full text-sm">{tag}</span>
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
