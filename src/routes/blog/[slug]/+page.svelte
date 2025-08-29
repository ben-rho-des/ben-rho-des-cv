<script lang="ts">
  import { page } from '$app/stores';
  import { getBlogPost } from '$lib/blog';
  
  const slug = $page.params.slug || '';
  const post = getBlogPost(slug);
</script>

{#if post}
  <article class="blog-post">
    <header class="post-header">
      <h1 class="post-title w-800">{post.title}</h1>
      <time class="post-date w-400" datetime={post.date}>
        {new Date(post.date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </time>
      <div class="post-tags">
        {#each post.tags as tag}
          <span class="tag w-500">{tag}</span>
        {/each}
      </div>
    </header>
    
    <div class="post-content">
      {@html post.content}
    </div>
    
    <footer class="post-footer">
      <a href="/blog" class="back-link w-500">← Back to Blog</a>
    </footer>
  </article>
{:else}
  <div class="not-found">
    <h1 class="w-800">Post Not Found</h1>
    <p class="w-400">The blog post you're looking for doesn't exist.</p>
    <a href="/blog" class="back-link w-500">← Back to Blog</a>
  </div>
{/if}

<style>
  .blog-post {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .post-header {
    margin-bottom: 3rem;
    text-align: center;
  }
  
  .post-title {
    font-size: clamp(2rem, 5vw, 3rem);
    margin: 0 0 1rem 0;
    line-height: 1.2;
  }
  
  .post-date {
    display: block;
    color: var(--primary-muted);
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
  
  .post-tags {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .tag {
    background: var(--primary);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    font-size: 0.9rem;
  }
  
  .post-content {
    line-height: 1.7;
    font-size: 1.1rem;
  }
  
  .post-content :global(h2) {
    font-size: 1.8rem;
    margin: 2rem 0 1rem 0;
    color: var(--primary);
  }
  
  .post-content :global(h3) {
    font-size: 1.4rem;
    margin: 1.5rem 0 0.75rem 0;
  }
  
  .post-content :global(p) {
    margin: 1rem 0;
  }
  
  .post-content :global(ul) {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }
  
  .post-content :global(li) {
    margin: 0.5rem 0;
  }
  
  .post-content :global(strong) {
    color: var(--primary);
  }
  
  .post-footer {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid var(--primary);
    text-align: center;
  }
  
  .back-link {
    color: var(--primary);
    text-decoration: none;
    font-size: 1.1rem;
  }
  
  .back-link:hover {
    text-decoration: underline;
  }
  
  .not-found {
    text-align: center;
    padding: 3rem 0;
  }
</style>
