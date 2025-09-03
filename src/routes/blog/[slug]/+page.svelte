<script lang="ts">
  import { page } from '$app/stores';
  import { getBlogPost } from '$lib/blog';
  
  const slug = $page.params.slug || '';
  const post = getBlogPost(slug);
</script>

{#if post}
  <article class="max-w-4xl mx-auto p-8">
    <header class="text-center mb-12">
      <h1 class="text-5xl font-bold mb-4">{post.title}</h1>
      <time class="block text-gray-600 text-lg mb-6" datetime={post.date}>
        {new Date(post.date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </time>
      <div class="flex gap-3 justify-center flex-wrap mb-6">
        {#each post.tags as tag}
          <span class="bg-primary text-white px-4 py-2 rounded-full text-sm">{tag}</span>
        {/each}
      </div>
    </header>
    
    <div class="prose prose-lg max-w-none">
      {@html post.content}
    </div>
    
    <footer class="mt-12 pt-8 border-t border-primary text-center">
      <a href="/blog" class="text-primary hover:underline text-lg">← Back to Blog</a>
    </footer>
  </article>
{:else}
  <div class="text-center py-12">
    <h1 class="text-4xl font-bold mb-4">Post Not Found</h1>
    <p class="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
    <a href="/blog" class="text-primary hover:underline text-lg">← Back to Blog</a>
  </div>
{/if}
