<script lang="ts">
  import { getBlogPosts } from '$lib/blog';
  
  const posts = getBlogPosts();
</script>

<h1 class="w-800" style="font-size:clamp(28px,4vw,56px)">Blog</h1>

{#if posts.length > 0}
  <div class="posts-grid">
    {#each posts as post}
      <article class="post-card">
        <h2 class="post-title w-700">
          <a href="/blog/{post.slug}">{post.title}</a>
        </h2>
        <time class="post-date w-400" datetime={post.date}>
          {new Date(post.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </time>
        <p class="post-excerpt w-400">{post.excerpt}</p>
        <div class="post-tags">
          {#each post.tags as tag}
            <span class="tag w-500">{tag}</span>
          {/each}
        </div>
      </article>
    {/each}
  </div>
{:else}
  <p class="w-400">Posts coming soon.</p>
{/if}

<style>
  .posts-grid {
    display: grid;
    gap: 2rem;
    margin-top: 2rem;
  }
  
  .post-card {
    padding: 1.5rem;
    border: 1px solid var(--primary);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.5);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .post-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .post-title {
    font-size: 1.5rem;
    margin: 0 0 0.5rem 0;
  }
  
  .post-title a {
    color: var(--primary);
    text-decoration: none;
  }
  
  .post-title a:hover {
    text-decoration: underline;
  }
  
  .post-date {
    display: block;
    color: var(--primary-muted);
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  
  .post-excerpt {
    margin: 0 0 1rem 0;
    line-height: 1.6;
  }
  
  .post-tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  
  .tag {
    background: var(--primary);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
  }
</style>
