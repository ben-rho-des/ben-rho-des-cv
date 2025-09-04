<script lang="ts">
	import { modeStore } from '$lib/stores/mode';
	import PlayButton from '$lib/components/icons/PlayButton.svelte';
	import DisplayGrid from '$lib/components/icons/DisplayGrid.svelte';
	import Square from '$lib/components/icons/Square.svelte';
	import { trapFocus } from '$lib/utils/accessibility';
	import { THEMES } from '$lib/constants';
	import type { NavItem } from '$lib/types';

	const { isOpen, onClose, navItems, currentPath, isActive } = $props<{
		isOpen: boolean;
		onClose: () => void;
		navItems: NavItem[];
		currentPath: string;
		isActive: (path: string, current: string) => boolean;
	}>();

	let mobileMenuContent = $state<HTMLElement>();
	let focusTrapCleanup: (() => void) | null = null;

	function toggleTheme() {
		modeStore.toggleTheme();
	}

	function toggleGrid() {
		modeStore.toggleGrid();
	}

	$effect(() => {
		if (isOpen && mobileMenuContent) {
			// Focus the first focusable element in the menu
			const firstFocusable = mobileMenuContent.querySelector(
				'button, a, [tabindex]:not([tabindex="-1"])'
			) as HTMLElement;
			firstFocusable?.focus();
			// Set up focus trap
			focusTrapCleanup = trapFocus(mobileMenuContent);
		} else if (!isOpen && focusTrapCleanup) {
			focusTrapCleanup();
			focusTrapCleanup = null;
		}

		return () => {
			if (focusTrapCleanup) {
				focusTrapCleanup();
			}
		};
	});
</script>

{#if isOpen}
	<div
		class="mobile-menu-overlay"
		onclick={onClose}
		onkeydown={(e) => e.key === 'Escape' && onClose()}
		aria-hidden="true"
	>
		<div
			class="mobile-menu-content"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.key === 'Escape' && onClose()}
			role="dialog"
			aria-modal="true"
			aria-label="Mobile navigation menu"
			tabindex="-1"
			bind:this={mobileMenuContent}
		>
			<!-- Mobile action buttons -->
			<div class="mobile-actions">
				<button class="action-btn" onclick={toggleTheme} aria-label="Toggle theme">
					{$modeStore.theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK}
				</button>
				<a href="playlists" class="action-btn" aria-label="Go to playlists">
					<PlayButton size={20} />
				</a>
				<button class="action-btn" onclick={toggleGrid} aria-label="Toggle grid">
					{#if $modeStore.grid}
						<Square size={20} />
					{:else}
						<DisplayGrid size={20} />
					{/if}
				</button>
			</div>

			<!-- Mobile navigation -->
			<nav class="mobile-nav" aria-label="Mobile navigation">
				{#each navItems as item (item.href)}
					<a
						href={item.href}
						class:is-active-route={isActive(item.href, currentPath)}
						onclick={onClose}>{item.label}</a
					>
				{/each}
			</nav>
		</div>
	</div>
{/if}

<style>
	.mobile-menu-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.8);
		z-index: 99;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.mobile-menu-content {
		background: var(--bg);
		padding: 2rem;
		border-radius: 1rem;
		max-width: 90vw;
		max-height: 90vh;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.mobile-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--border);
	}

	.action-btn {
		background: none;
		border: none;
		font-size: 1.45rem;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 50%;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 3.1rem;
		min-height: 3.1rem;
		outline: none;
	}

	.action-btn:hover {
		background-color: rgba(255, 255, 255, 0.5);
	}

	.action-btn:active {
		background-color: rgba(255, 255, 255, 1);
	}

	.action-btn:focus {
		outline: none;
	}

	.mobile-nav {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		text-align: center;
	}

	.mobile-nav a {
		font-size: var(--font-size-lg);
		padding: 1rem;
		border-radius: 0.5rem;
		transition: background-color 0.2s ease;
		text-decoration: none;
		color: inherit;
	}

	.mobile-nav a:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	.mobile-nav a.is-active-route {
		background-color: var(--primary);
		color: white;
	}
</style>
