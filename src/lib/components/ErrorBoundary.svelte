<script lang="ts">
	import { onMount } from 'svelte';
	import { logError, createUserFriendlyError } from '$lib/utils/error-handling';
	import PageTitle from '$lib/components/PageTitle.svelte';

	export let showDetails: boolean = false;

	let hasError = false;
	let error: Error | null = null;

	onMount(() => {
		const handleError = (event: ErrorEvent) => {
			hasError = true;
			error = event.error;
			logError(event.error, 'ErrorBoundary');
		};

		const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
			hasError = true;
			error = event.reason;
			logError(event.reason, 'ErrorBoundary - Unhandled Promise Rejection');
		};

		window.addEventListener('error', handleError);
		window.addEventListener('unhandledrejection', handleUnhandledRejection);

		return () => {
			window.removeEventListener('error', handleError);
			window.removeEventListener('unhandledrejection', handleUnhandledRejection);
		};
	});

	function handleRetry(): void {
		hasError = false;
		error = null;
		window.location.reload();
	}
</script>

{#if hasError}
	<main class="mx-auto min-h-[80vh] w-full max-w-[1400px] pt-20">
		<div class="grid grid-cols-6 gap-x-5" role="alert">
			<PageTitle title="Oops! Something went wrong" />
			<div class="col-span-6">
				<p class="mb-6 leading-relaxed">
					{error
						? createUserFriendlyError(error)
						: 'Something went wrong. Please refresh the page.'}
				</p>

				{#if showDetails && error}
					<details class="mb-6 text-left">
						<summary class="cursor-pointer font-medium text-primary hover:text-primary/80"
							>Technical Details</summary
						>
						<pre
							class="mt-2 overflow-x-auto rounded bg-fg/5 p-4 font-mono text-sm text-fg">{error.stack}</pre>
					</details>
				{/if}

				<div class="flex gap-4">
					<button
						on:click={handleRetry}
						class="cursor-pointer rounded bg-primary px-6 py-3 font-medium text-white transition-all hover:opacity-90"
					>
						Try Again
					</button>
					<button
						on:click={() => (window.location.href = '.')}
						class="cursor-pointer rounded border border-primary bg-transparent px-6 py-3 font-medium transition-all hover:bg-primary hover:text-white"
					>
						Go Home
					</button>
				</div>
			</div>
		</div>
	</main>
{:else}
	<slot />
{/if}
