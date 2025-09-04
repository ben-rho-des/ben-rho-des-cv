import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Mode, ModeState, Theme } from '../types';
import { THEMES, DEFAULTS, CSS_CLASSES } from '../constants';

const initialState: ModeState = {
	theme: DEFAULTS.THEME,
	grid: DEFAULTS.GRID_ENABLED
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
				theme: (savedTheme as Theme) || DEFAULTS.THEME,
				grid: savedGrid || DEFAULTS.GRID_ENABLED
			};

			set(state);
			applyToBody(state);
		},

		toggleTheme: () => {
			update((state) => {
				const newTheme: Mode = state.theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
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

	body.classList.remove(CSS_CLASSES.LIGHT_MODE, CSS_CLASSES.DARK_MODE, CSS_CLASSES.GRID_MODE);
	body.classList.add(`${CSS_CLASSES.MODE_PREFIX}${state.theme}`);

	if (state.theme === THEMES.DARK) {
		body.classList.add(CSS_CLASSES.DARK_MODE);
	}

	if (state.grid) {
		body.classList.add(CSS_CLASSES.GRID_MODE);
	}
}

export const modeStore = createModeStore();
