<script lang="ts">
	export let size: 'small' | 'medium' | 'large' = 'medium';
	export let message: string = 'Loading...';
	export let showMessage: boolean = true;

	const sizeClasses = {
		small: 'w-4 h-4',
		medium: 'w-8 h-8',
		large: 'w-12 h-12'
	};
</script>

<div class="loading-container" role="status" aria-live="polite">
	<div class="spinner {sizeClasses[size]}" aria-hidden="true"></div>
	{#if showMessage}
		<p class="loading-message">{message}</p>
	{/if}
</div>

<style>
	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 2rem;
	}

	.spinner {
		border: 2px solid var(--bg);
		border-top: 2px solid var(--primary);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	.loading-message {
		color: var(--fg);
		font-size: 0.875rem;
		margin: 0;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.spinner {
			animation: none;
			border-top-color: var(--primary);
		}
	}
</style>
