import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Mode, ModeState, Theme } from '../types';

const initialState: ModeState = {
	theme: '🌞',
	grid: false
};

function createModeStore() {
	const { subscribe, set, update } = writable<ModeState>(initialState);

	return {
		subscribe,

		init: () => {
			if (!browser) return;

			const savedTheme = localStorage.getItem('theme') as Mode;
			const savedGrid = localStorage.getItem('grid') === 'true';

			const state: ModeState = {
				theme: (savedTheme as Theme) || '🌞',
				grid: savedGrid || false
			};

			set(state);
			applyToBody(state);
		},

		toggleTheme: () => {
			update((state) => {
				const newTheme: Mode = state.theme === '🌞' ? '🌚' : '🌞';
				const newState = { ...state, theme: newTheme };

				if (browser) {
					localStorage.setItem('theme', newTheme);
					applyToBody(newState);
				}

				return newState;
			});
		},

		toggleGrid: () => {
			update((state) => {
				const newGrid = !state.grid;
				const newState = { ...state, grid: newGrid };

				if (browser) {
					localStorage.setItem('grid', newGrid.toString());
					applyToBody(newState);
				}

				return newState;
			});
		},

		setGrid: (enabled: boolean) => {
			update((state) => {
				const newState = { ...state, grid: enabled };

				if (browser) {
					applyToBody(newState);
				}

				return newState;
			});
		},

		applyCurrent: () => {
			if (!browser) return;

			subscribe((state) => {
				applyToBody(state);
			})();
		}
	};
}

function applyToBody(state: ModeState) {
	if (!browser) return;

	const body = document.body;

	body.classList.remove('mode-🌞', 'mode-🌚', 'mode-🫥', 'dark');
	body.classList.add(`mode-${state.theme}`);

	if (state.theme === '🌚') {
		body.classList.add('mode-🌚');
	}

	if (state.grid) {
		body.classList.add('mode-🫥');
	}
}

export const modeStore = createModeStore();
